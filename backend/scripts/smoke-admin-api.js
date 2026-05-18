const { spawn } = require("child_process");
const path = require("path");

const PORT = process.env.SMOKE_PORT || "4060";
const base = `http://localhost:${PORT}`;

function waitForServer(proc) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Server startup timeout"));
      }
    }, 15000);
    proc.stdout.on("data", (chunk) => {
      const text = String(chunk || "");
      if (!settled && /server started/i.test(text)) {
        settled = true;
        clearTimeout(timeout);
        resolve();
      }
    });
    proc.stderr.on("data", (chunk) => {
      const text = String(chunk || "");
      if (/EADDRINUSE/i.test(text) && !settled) {
        settled = true;
        clearTimeout(timeout);
        reject(new Error("Port already in use"));
      }
    });
    proc.on("exit", (code) => {
      if (!settled) {
        settled = true;
        clearTimeout(timeout);
        reject(new Error(`Server exited early with code ${code}`));
      }
    });
  });
}

async function request(pathname, options = {}) {
  const res = await fetch(`${base}${pathname}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });
  let payload = null;
  try {
    payload = await res.json();
  } catch (_e) {}
  if (!res.ok) {
    throw new Error(payload?.error || `Request failed: ${pathname} (${res.status})`);
  }
  return payload;
}

async function run() {
  const server = spawn(process.execPath, ["server.js"], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, PORT },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);

  try {
    await waitForServer(server);

    await request("/api/health");
    const login = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: "admin", password: "admin" }),
    });
    const token = login?.token;
    if (!token) throw new Error("Login token missing");

    await request("/api/admin/check", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const itemId = `smoke-cat-${Date.now()}`;
    await request("/api/admin/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemId,
        name: "Smoke category",
        slug: itemId,
        status: "draft",
        description: "Temporary record for smoke test",
      }),
    });

    await request("/api/admin/categories/bulk", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "publish",
        ids: [itemId],
      }),
    });

    await request("/api/catalog");
    await request(`/api/admin/categories/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Smoke test passed.");
  } finally {
    server.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error("Smoke test failed:", error.message);
  process.exitCode = 1;
});
