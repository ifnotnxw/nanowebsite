const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "nf-dev-access-secret-change-me";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "nf-dev-refresh-secret-change-me";
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "24h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 20;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function parseCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return "";
  const parts = header.split(";").map((v) => v.trim());
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) return decodeURIComponent(part.slice(name.length + 1));
  }
  return "";
}

function getBearer(req) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);
  return parseCookie(req, "nf_admin_access");
}

function verifyAccessToken(req) {
  const token = getBearer(req);
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (_e) {
    return null;
  }
}

function signTokens(payload) {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ ...payload, type: "refresh", jti: crypto.randomUUID() }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
}

function clearAuthCookies(res) {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PRODUCTION,
    path: "/",
  };
  res.clearCookie("nf_admin_rt", cookieOptions);
  res.clearCookie("nf_admin_access", cookieOptions);
}

function authRequired(req, res, next) {
  const user = verifyAccessToken(req);
  if (!user) return res.status(401).json({ error: "Требуется авторизация" });
  req.user = user;
  return next();
}

function roleRequired(role) {
  return (req, res, next) => {
    const user = verifyAccessToken(req);
    if (!user) return res.status(401).json({ error: "Требуется авторизация" });
    if (user.role !== role && user.role !== "admin") {
      return res.status(403).json({ error: "Недостаточно прав" });
    }
    req.user = user;
    return next();
  };
}

function isRateLimited(ip) {
  const now = Date.now();
  const rec = loginAttempts.get(ip) || { count: 0, first: now };
  if (now - rec.first > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  loginAttempts.set(ip, rec);
  return rec.count > MAX_LOGIN_ATTEMPTS;
}

async function loginHandler(req, res, db) {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Слишком много попыток входа. Попробуйте позже." });
  }
  const login = String(req.body?.login || "").trim();
  const password = String(req.body?.password || "");
  const user = await db.get("SELECT * FROM users WHERE login = ?", login);
  if (!user) return res.status(401).json({ error: "Неверный логин или пароль" });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Неверный логин или пароль" });
  const payload = { sub: user.login, role: user.role || "admin" };
  const { accessToken, refreshToken } = signTokens(payload);
  res.cookie("nf_admin_rt", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PRODUCTION,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ ok: true, token: accessToken, role: payload.role });
}

function refreshHandler(req, res) {
  const token = req.body?.refreshToken || parseCookie(req, "nf_admin_rt");
  if (!token) return res.status(401).json({ error: "Refresh token отсутствует" });
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    if (payload.type !== "refresh") {
      return res.status(401).json({ error: "Некорректный refresh token" });
    }
    const nextPayload = { sub: payload.sub, role: payload.role || "admin" };
    const { accessToken, refreshToken } = signTokens(nextPayload);
    res.cookie("nf_admin_rt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: IS_PRODUCTION,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("nf_admin_access", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: IS_PRODUCTION,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ ok: true, token: accessToken, role: nextPayload.role });
  } catch (_e) {
    return res.status(401).json({ error: "Невалидный refresh token" });
  }
}

module.exports = {
  authRequired,
  roleRequired,
  loginHandler,
  refreshHandler,
  clearAuthCookies,
  verifyAccessToken,
};
