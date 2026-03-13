/**
 * НаноФарм — API сервер
 * Запуск: npm start (порт по умолчанию 3000)
 * Автоперевод: при сохранении категорий/партнёров/товаров русский текст переводится на EN и KZ через MyMemory API.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const https = require("https");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
const UPLOAD_PRODUCTS_DIR = path.join(FRONTEND_DIR, "uploads", "products");
const UPLOAD_DOCS_DIR = path.join(FRONTEND_DIR, "uploads", "docs");
const UPLOAD_PARTNERS_DIR = path.join(FRONTEND_DIR, "uploads", "partners");
const UPLOAD_NEWS_DIR = path.join(FRONTEND_DIR, "uploads", "news");

fs.mkdirSync(UPLOAD_PRODUCTS_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DOCS_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_PARTNERS_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_NEWS_DIR, { recursive: true });

const CORS_ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!CORS_ALLOWED_ORIGINS.length) return callback(null, true);
      const ok = CORS_ALLOWED_ORIGINS.includes(origin);
      return callback(ok ? null : new Error("Not allowed by CORS"), ok);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Хеш CSP под конкретный фронт потребует отдельной настройки, поэтому здесь минимальная политика.
  next();
});

// ——— Админ: логин и сессии ———
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";
const ADMIN_PASSWORD_BCRYPT = process.env.ADMIN_PASSWORD_BCRYPT || "";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "nf-dev-access-secret-change-me";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "nf-dev-refresh-secret-change-me";
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "24h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

function getAdminRole(login) {
  const trimmed = String(login || "").trim();
  if (!trimmed) return "admin";
  const managerLogins = (process.env.MANAGER_LOGINS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  if (managerLogins.includes(trimmed)) return "manager";
  return process.env.ADMIN_ROLE || "admin";
}

function sha256(pwd) {
  return crypto.createHash("sha256").update(String(pwd)).digest("hex");
}

function checkAdminPassword(password) {
  const pwd = String(password || "");
  if (ADMIN_PASSWORD_BCRYPT) {
    try {
      return bcrypt.compareSync(pwd, ADMIN_PASSWORD_BCRYPT);
    } catch (_e) {
      return false;
    }
  }
  if (ADMIN_PASSWORD_HASH) return sha256(pwd) === ADMIN_PASSWORD_HASH;
  if (ADMIN_PASSWORD) return pwd === ADMIN_PASSWORD;
  return pwd === "admin";
}

function parseCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return "";
  const parts = header.split(";").map((v) => v.trim());
  for (const part of parts) {
    if (part.startsWith(name + "=")) {
      return decodeURIComponent(part.slice(name.length + 1));
    }
  }
  return "";
}

function checkAdminToken(req) {
  let token = "";
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.slice(7);
  } else {
    token = parseCookie(req, "nf_admin_access");
  }
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    return payload;
  } catch (_e) {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const payload = checkAdminToken(req);
  if (!payload) {
    return res.status(401).json({ error: "Требуется авторизация" });
  }
  req.user = payload;
  return next();
}

function requireAdminRole(requiredRole) {
  return (req, res, next) => {
    const payload = checkAdminToken(req);
    if (!payload) {
      return res.status(401).json({ error: "Требуется авторизация" });
    }
    const role = payload.role || "admin";
    if (role !== requiredRole && role !== "admin") {
      return res.status(403).json({ error: "Недостаточно прав" });
    }
    req.user = payload;
    return next();
  };
}

// Простая защита от перебора пароля по IP
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 20;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function isLoginRateLimited(ip) {
  const now = Date.now();
  const rec = loginAttempts.get(ip) || { count: 0, first: now };
  if (now - rec.first > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 0, first: now });
    return false;
  }
  if (rec.count >= MAX_LOGIN_ATTEMPTS) return true;
  rec.count += 1;
  loginAttempts.set(ip, rec);
  return false;
}

app.post("/api/admin/login", (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  if (isLoginRateLimited(ip)) {
    return res.status(429).json({ error: "Слишком много попыток входа. Попробуйте позже." });
  }
  const { login, password } = req.body || {};

  const isDev = (process.env.NODE_ENV || "development") !== "production";
  const devFallbackOk = isDev && login === "admin" && String(password || "") === "admin";

  const envCredentialsOk = login === ADMIN_LOGIN && checkAdminPassword(password);

  if (!devFallbackOk && !envCredentialsOk) {
    return res.status(401).json({ error: "Неверный логин или пароль" });
  }

  const role = getAdminRole(login);

  const accessToken = jwt.sign(
    { sub: login, role },
    JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRES_IN }
  );
  const refreshToken = jwt.sign(
    { sub: login, role, type: "refresh" },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );

  res.cookie("nf_admin_rt", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ ok: true, token: accessToken, refreshToken, role });
});

app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("nf_admin_rt");
  res.clearCookie("nf_admin_access");
  res.json({ ok: true });
});

app.get("/api/admin/check", requireAdmin, (req, res) => {
  res.json({ ok: true, role: (req.user && req.user.role) || "admin" });
});

app.post("/api/admin/refresh", (req, res) => {
  const fromBody = req.body && req.body.refreshToken;
  const fromCookie = parseCookie(req, "nf_admin_rt");
  const token = fromBody || fromCookie;
  if (!token) {
    return res.status(401).json({ error: "Refresh token отсутствует" });
  }
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    if (payload.type !== "refresh") {
      return res.status(401).json({ error: "Некорректный refresh token" });
    }
    const role = payload.role || getAdminRole(payload.sub);
    const accessToken = jwt.sign(
      { sub: payload.sub, role },
      JWT_ACCESS_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRES_IN }
    );
    res.cookie("nf_admin_access", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ ok: true, token: accessToken, role });
  } catch (_e) {
    return res.status(401).json({ error: "Невалидный refresh token" });
  }
});

function readJson(name) {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, `${name}.json`), "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`data/${name}.json:`, e.message);
    return name === "requests" ? [] : [];
  }
}

function writeJson(name, data) {
  const file = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

// ——— Автоматический перевод (MyMemory API, без ключа, лимит по символам/день) ———
const LANGPAIR = { en: "ru|en", kz: "ru|kk" };

function translateText(text) {
  if (!text || typeof text !== "string" || !text.trim()) return Promise.resolve({ en: text, kz: text });
  const trimmed = text.trim();
  const results = { en: trimmed, kz: trimmed };

  function fetchLang(target) {
    const pair = LANGPAIR[target];
    if (!pair) return Promise.resolve();
    return new Promise((resolve) => {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${pair}`;
      https.get(url, (res) => {
        let body = "";
        res.on("data", (ch) => (body += ch));
        res.on("end", () => {
          try {
            const j = JSON.parse(body);
            const t = j.responseData?.translatedText;
            if (t) results[target] = t;
          } catch (_) {}
          resolve();
        });
      }).on("error", () => resolve());
    });
  }

  return Promise.all([fetchLang("en"), fetchLang("kz")]).then(() => results);
}

async function ensureTranslations(item, textKeys) {
  const out = { ...item };
  for (const key of textKeys) {
    const ru = out[key];
    if (!ru || typeof ru !== "string") continue;
    const needEn = !out[key + "_en"];
    const needKz = !out[key + "_kz"];
    if (!needEn && !needKz) continue;
    const { en, kz } = await translateText(ru);
    if (needEn) out[key + "_en"] = en;
    if (needKz) out[key + "_kz"] = kz;
  }
  return out;
}

async function translateArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return { en: arr, kz: arr };
  const en = [];
  const kz = [];
  for (const s of arr) {
    const t = typeof s === "string" ? await translateText(s) : { en: s, kz: s };
    en.push(t.en);
    kz.push(t.kz);
  }
  return { en, kz };
}

function applyLang(entity, lang, textKeys) {
  if (lang === "ru") return entity;
  const suffix = lang === "en" ? "_en" : "_kz";
  const out = { ...entity };
  for (const key of textKeys) {
    const val = entity[key + suffix];
    if (val != null) out[key] = val;
  }
  return out;
}

// ——— API: справочники и контент ———

app.get("/api/categories", (req, res) => {
  res.json(readJson("categories"));
});

app.get("/api/partners", (req, res) => {
  res.json(readJson("partners"));
});

app.get("/api/products", (req, res) => {
  res.json(readJson("products"));
});

app.get("/api/news", (req, res) => {
  res.json(readJson("news"));
});

// ——— API: админка (CRUD + автоперевод при сохранении) ———

async function adminPutCategories(req, res) {
  const list = req.body;
  if (!Array.isArray(list)) return res.status(400).json({ error: "Expected array" });
  try {
    const translated = [];
    for (const item of list) {
      const t = await ensureTranslations(item, ["name", "description"]);
      translated.push(t);
    }
    writeJson("categories", translated);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function adminPutPartners(req, res) {
  const list = req.body;
  if (!Array.isArray(list)) return res.status(400).json({ error: "Expected array" });
  try {
    const translated = [];
    for (const item of list) {
      const t = await ensureTranslations(item, ["name", "description", "equipment"]);
      translated.push(t);
    }
    writeJson("partners", translated);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function normalizeProductPhotos(product) {
  const out = { ...product };

  const photos = [];
  if (Array.isArray(out.photos)) {
    out.photos.forEach((p, index) => {
      if (!p) return;
      if (typeof p === "string") {
        const url = p.trim();
        if (!url) return;
        photos.push({
          id: `ph-${crypto.randomBytes(6).toString("hex")}`,
          url,
          order: photos.length,
          isMain: photos.length === 0,
        });
        return;
      }
      const url = String(p.url || "").trim();
      if (!url) return;
      photos.push({
        id: String(p.id || `ph-${crypto.randomBytes(6).toString("hex")}`),
        url,
        order: typeof p.order === "number" ? p.order : index,
        isMain: Boolean(p.isMain),
      });
    });
  }

  const images = Array.isArray(out.images) ? out.images : [];
  const legacyMain = String(out.image || "").trim();
  const legacyList = [];
  if (legacyMain) legacyList.push(legacyMain);
  images.forEach((src) => {
    const v = String(src || "").trim();
    if (v && !legacyList.includes(v)) legacyList.push(v);
  });

  if (!photos.length && legacyList.length) {
    legacyList.forEach((url, index) => {
      photos.push({
        id: `ph-${crypto.randomBytes(6).toString("hex")}`,
        url,
        order: index,
        isMain: index === 0,
      });
    });
  }

  photos.sort((a, b) => {
    if (a.isMain && !b.isMain) return -1;
    if (!a.isMain && b.isMain) return 1;
    return (a.order || 0) - (b.order || 0);
  });

  if (photos.length) {
    out.photos = photos;
    out.image = photos[0].url;
    out.images = photos.map((p) => p.url);
  } else {
    out.photos = [];
  }

  return out;
}

function normalizeProduct(item) {
  let out = { ...item };
  out = normalizeProductPhotos(out);

  if (!out.currency) out.currency = "KZT";
  if (!out.status) out.status = "in_stock";
  if (!out.sortOrder && out.sortOrder !== 0) out.sortOrder = 0;
  if (typeof out.isPopular !== "boolean") out.isPopular = Boolean(out.popular);
  if (typeof out.popular !== "boolean") out.popular = Boolean(out.isPopular);
  if (typeof out.isNew !== "boolean") out.isNew = false;
  if (typeof out.isHidden !== "boolean") out.isHidden = false;

  if (!out.seo || typeof out.seo !== "object") {
    out.seo = {};
  }
  if (!out.seo.metaTitle) out.seo.metaTitle = out.name || "";
  if (!out.seo.metaDescription) out.seo.metaDescription = out.shortDesc || "";
  if (!out.seo.slug) {
    const base = String(out.id || out.name || "").toLowerCase();
    out.seo.slug =
      base
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "") || "";
  }
  if (!out.seo.ogTitle) out.seo.ogTitle = out.seo.metaTitle;
  if (!out.seo.ogDescription) out.seo.ogDescription = out.seo.metaDescription;
  if (!out.seo.ogImage && out.image) out.seo.ogImage = out.image;

  if (Array.isArray(out.attributes)) {
    out.attributes = out.attributes
      .map((attr, index) => ({
        id: String(attr.id || `attr-${crypto.randomBytes(6).toString("hex")}`),
        key: String(attr.key || "").trim(),
        value: String(attr.value || "").trim(),
        order: typeof attr.order === "number" ? attr.order : index,
      }))
      .filter((a) => a.key || a.value);
  } else {
    out.attributes = [];
  }

  if (Array.isArray(out.docs)) {
    out.docs = out.docs
      .map((doc, index) => ({
        id: String(doc.id || `doc-${crypto.randomBytes(6).toString("hex")}`),
        type: String(doc.type || "manual"),
        title: String(doc.title || "").trim() || "Документ",
        url: String(doc.url || "").trim(),
        order: typeof doc.order === "number" ? doc.order : index,
      }))
      .filter((d) => d.url);
  } else {
    out.docs = [];
  }

  if (Array.isArray(out.relatedProductIds)) {
    out.relatedProductIds = out.relatedProductIds
      .map((id) => String(id || "").trim())
      .filter(Boolean);
  } else if (typeof out.related === "string") {
    out.relatedProductIds = out.related
      .split(/[,\s]+/)
      .map((id) => id.trim())
      .filter(Boolean);
  } else {
    out.relatedProductIds = [];
  }

  return out;
}

function autoAssignProductArticles(products) {
  const list = Array.isArray(products) ? products : [];
  const sorted = [...list].sort((a, b) => {
    const aOrder = a && typeof a.sortOrder === "number" ? a.sortOrder : 0;
    const bOrder = b && typeof b.sortOrder === "number" ? b.sortOrder : 0;
    if (aOrder !== bOrder) return aOrder - bOrder;
    const aName = String(a?.name || "").toLowerCase();
    const bName = String(b?.name || "").toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    const aId = String(a?.id || "");
    const bId = String(b?.id || "");
    if (aId < bId) return -1;
    if (aId > bId) return 1;
    return 0;
  });

  sorted.forEach((p, index) => {
    if (!p || typeof p !== "object") return;
    const num = String(index + 1).padStart(3, "0");
    p.article = `NF${num}`;
  });

  return list;
}

async function adminPutProducts(req, res) {
  const list = req.body;
  if (!Array.isArray(list)) return res.status(400).json({ error: "Expected array" });
  try {
    const next = [];
    for (const item of list) {
      // Берём товар как есть и выкидываем тяжёлые автопереводы,
      // чтобы не раздувать JSON и не дергать внешний API при каждом сохранении.
      const t = { ...item };
      Object.keys(t).forEach((key) => {
        if (
          key.endsWith("_en") ||
          key.endsWith("_kz") ||
          key === "specs_en" ||
          key === "specs_kz" ||
          key === "serviceSteps_en" ||
          key === "serviceSteps_kz"
        ) {
          delete t[key];
        }
      });
      next.push(normalizeProduct(t));
    }
    autoAssignProductArticles(next);
    writeJson("products", next);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function adminPutList(name, req, res) {
  const list = req.body;
  if (!Array.isArray(list)) return res.status(400).json({ error: "Expected array" });
  try {
    writeJson(name, list);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

function adminDeleteById(name, req, res) {
  const id = req.params.id;
  const list = readJson(name);
  if (!Array.isArray(list)) return res.status(500).json({ error: "Invalid data" });
  const next = list.filter((item) => item.id !== id);
  if (next.length === list.length) return res.status(404).json({ error: "Not found" });
  if (name === "products") {
    autoAssignProductArticles(next);
  }
  writeJson(name, next);
  res.json({ ok: true });
}

app.put("/api/categories", requireAdminRole("admin"), (req, res) => adminPutCategories(req, res));
app.put("/api/partners", requireAdminRole("admin"), (req, res) => adminPutPartners(req, res));
app.put("/api/products", requireAdminRole("admin"), (req, res) => adminPutProducts(req, res));
// Новости пока не требуют автоперевода, поэтому используем общий helper
app.put("/api/news", requireAdminRole("admin"), (req, res) => adminPutList("news", req, res));

app.delete("/api/categories/:id", requireAdminRole("admin"), (req, res) => adminDeleteById("categories", req, res));
app.delete("/api/partners/:id", requireAdminRole("admin"), (req, res) => adminDeleteById("partners", req, res));
app.delete("/api/products/:id", requireAdminRole("admin"), (req, res) => adminDeleteById("products", req, res));
app.delete("/api/news/:id", requireAdminRole("admin"), (req, res) => adminDeleteById("news", req, res));

// Однократно перевести весь каталог (только для авторизованного админа) (если в данных ещё нет _en/_kz полей)
app.post("/api/translate-catalog", requireAdminRole("admin"), async (req, res) => {
  try {
    const categories = readJson("categories");
    const partners = readJson("partners");
    const products = readJson("products");
    const catOut = [];
    for (const c of categories) {
      catOut.push(await ensureTranslations(c, ["name", "description"]));
    }
    const partOut = [];
    for (const p of partners) {
      partOut.push(await ensureTranslations(p, ["name", "description", "equipment"]));
    }
    const prodOut = [];
    for (const p of products) {
      let t = await ensureTranslations(p, ["name", "shortDesc", "description"]);
      if (Array.isArray(p.specs) && p.specs.length > 0) {
        const tr = await translateArray(p.specs);
        t.specs_en = tr.en;
        t.specs_kz = tr.kz;
      }
      if (Array.isArray(p.serviceSteps) && p.serviceSteps.length > 0) {
        const tr = await translateArray(p.serviceSteps);
        t.serviceSteps_en = tr.en;
        t.serviceSteps_kz = tr.kz;
      }
      prodOut.push(t);
    }
    writeJson("categories", catOut);
    writeJson("partners", partOut);
    writeJson("products", prodOut);
    res.json({ ok: true, message: "Каталог переведён" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Каталог с поддержкой языка: ?lang=ru|en|kz — возвращает переведённые name/description и т.д.
app.get("/api/catalog", (req, res) => {
  const lang = (req.query.lang || "ru").toLowerCase();
  const l = ["ru", "en", "kz"].includes(lang) ? lang : "ru";

  const categories = readJson("categories").map((c) =>
    applyLang(c, l, ["name", "description"])
  );
  const partners = readJson("partners").map((p) =>
    applyLang(p, l, ["name", "description", "equipment"])
  );
  const products = readJson("products").map((p) => {
    let out = applyLang(p, l, ["name", "shortDesc", "description"]);
    if (l === "en" && Array.isArray(p.specs_en)) out = { ...out, specs: p.specs_en };
    else if (l === "kz" && Array.isArray(p.specs_kz)) out = { ...out, specs: p.specs_kz };
    if (l === "en" && Array.isArray(p.serviceSteps_en)) out = { ...out, serviceSteps: p.serviceSteps_en };
    else if (l === "kz" && Array.isArray(p.serviceSteps_kz)) out = { ...out, serviceSteps: p.serviceSteps_kz };
    return out;
  });
  const news = readJson("news");

  res.json({ categories, partners, products, news });
});

// i18n (пока пустой объект, можно добавить ru/en/kz в data/i18n/)
app.get("/api/i18n", (req, res) => {
  const lang = (req.query.lang || "ru").toLowerCase();
  const fileName = ["ru", "en", "kz"].includes(lang) ? `i18n-${lang}` : "i18n-ru";
  try {
    const data = readJson(fileName);
    res.json(typeof data === "object" && data !== null ? data : {});
  } catch (_) {
    res.json({});
  }
});

// ——— API: заявки (контактная форма, быстрый запрос, запрос из корзины) ———

app.post("/api/requests", (req, res) => {
  const body = req.body || {};
  const requests = readJson("requests");
  const record = {
    id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: body.type || "contact",
    requestType: body.requestType || "",
    name: body.name || "",
    company: body.company || "",
    phone: body.phone || "",
    email: body.email || "",
    message: body.message || "",
    items: body.items || "",
    cart: Array.isArray(body.cart) ? body.cart : [],
    createdAt: new Date().toISOString(),
  };
  requests.push(record);
  writeJson("requests", requests);
  res.status(201).json({ ok: true, id: record.id });
});

// ——— Загрузка изображений и документов товаров (админ) ———

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_PRODUCTS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    const base = path.basename(file.originalname || "image", ext).replace(/[^a-z0-9_-]+/gi, "_").toLowerCase();
    const name = `${Date.now()}-${base}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post("/api/admin/upload/product-image", requireAdminRole("admin"), upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не получен" });
  const publicPath = `/uploads/products/${req.file.filename}`;
  res.json({ ok: true, path: publicPath });
});

const docsStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DOCS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".pdf";
    const base = path
      .basename(file.originalname || "document", ext)
      .replace(/[^a-z0-9_-]+/gi, "_")
      .toLowerCase();
    const name = `${Date.now()}-${base}${ext}`;
    cb(null, name);
  },
});

const uploadDocs = multer({
  storage: docsStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const mime = (file.mimetype || "").toLowerCase();
    if (mime === "application/pdf" || mime === "application/x-pdf") cb(null, true);
    else cb(new Error("Допустимы только PDF файлы"));
  },
});

app.post("/api/admin/upload/product-doc", requireAdminRole("admin"), (req, res) => {
  uploadDocs.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Ошибка загрузки файла" });
    }
    if (!req.file) return res.status(400).json({ error: "Файл не получен" });
    const publicPath = `/uploads/docs/${req.file.filename}`;
    res.json({ ok: true, path: publicPath });
  });
});

const partnersStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_PARTNERS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".png";
    const base = path
      .basename(file.originalname || "logo", ext)
      .replace(/[^a-z0-9_-]+/gi, "_")
      .toLowerCase();
    const name = `${Date.now()}-${base}${ext}`;
    cb(null, name);
  },
});

const uploadPartnerLogo = multer({
  storage: partnersStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/api/admin/upload/partner-logo", requireAdminRole("admin"), uploadPartnerLogo.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не получен" });
  const publicPath = `/uploads/partners/${req.file.filename}`;
  res.json({ ok: true, path: publicPath });
});

const newsStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_NEWS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    const base = path
      .basename(file.originalname || "news", ext)
      .replace(/[^a-z0-9_-]+/gi, "_")
      .toLowerCase();
    const name = `${Date.now()}-${base}${ext}`;
    cb(null, name);
  },
});

const uploadNewsImage = multer({
  storage: newsStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post("/api/admin/upload/news-image", requireAdminRole("admin"), uploadNewsImage.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не получен" });
  const publicPath = `/uploads/news/${req.file.filename}`;
  res.json({ ok: true, path: publicPath });
});

app.get("/api/requests", requireAdmin, (req, res) => {
  res.json(readJson("requests"));
});

// ——— Health ———

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ——— Фронтенд (после API, чтобы /api/* не отдавался как статика) ———

app.use(express.static(FRONTEND_DIR));
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

// ——— Запуск (если 3000 занят — пробуем 3001) ———

function getLocalIPs() {
  const list = [];
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) list.push({ name, address: net.address });
    }
  }
  return list;
}

function startServer(port) {
  const server = app.listen(port, "0.0.0.0", () => {
    const ips = getLocalIPs();
    console.log(`НаноФарм: http://localhost:${port}`);
    if (ips.length) {
      const prefer = ips.filter((x) => x.address.startsWith("192.168.") || x.address.startsWith("10."));
      (prefer.length ? prefer : ips).forEach((x) => console.log(`    http://${x.address}:${port}`));
    }
    console.log(`GET  /api/catalog, /api/requests, ...`);
    if (!ADMIN_PASSWORD_HASH && !ADMIN_PASSWORD) {
      console.warn(`  Админ: по умолчанию логин "admin", пароль "admin". Задайте ADMIN_LOGIN и ADMIN_PASSWORD_HASH в env для продакшена.`);
    }
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && port === PORT) {
      console.warn(`Порт ${PORT} занят, запуск на ${PORT + 1}…`);
      startServer(PORT + 1);
    } else {
      throw err;
    }
  });
}

startServer(PORT);
