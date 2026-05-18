const fs = require("fs");
const path = require("path");
const os = require("os");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const {
  FRONTEND_DIR,
  UPLOAD_DIRS,
  DATA_DIR,
  PUBLIC_ENTITY_TYPES,
} = require("./constants");
const { initDb } = require("./db");
const {
  listEntities,
  listPublicEntities,
  getEntityById,
  saveEntity,
  deleteEntity,
  replaceList,
  bulkAction,
  slugCheck,
  getDashboardData,
} = require("./contentService");
const { createTranslationProviderFromEnv } = require("./translationProvider");
const { createMultilingualService } = require("./multilingualService");
const {
  authRequired,
  roleRequired,
  loginHandler,
  refreshHandler,
  clearAuthCookies,
} = require("./auth");
const { asArray, nowIso, parseJson, slugify, toId } = require("./utils");
const { normalizeLanguageCode } = require("./multilingualService");

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";
const PORT = Number.parseInt(process.env.PORT || "4000", 10);
const CORS_ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const CORS_ALLOW_ALL = CORS_ALLOWED_ORIGINS.includes("*");

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (CORS_ALLOW_ALL) return true;
  if (!CORS_ALLOWED_ORIGINS.length) return !IS_PRODUCTION;
  return CORS_ALLOWED_ORIGINS.some((allowed) => {
    if (allowed === origin) return true;
    // Optional wildcard support: https://*.example.com
    if (allowed.includes("*")) {
      const escaped = allowed
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\\\*/g, ".*");
      return new RegExp(`^${escaped}$`).test(origin);
    }
    return false;
  });
}

Object.values(UPLOAD_DIRS).forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

function readUiLocale(lang) {
  const canonical = normalizeLanguageCode(lang || "ru");
  const fileKey = canonical === "kk" ? "kz" : canonical;
  const candidates = [
    path.join(FRONTEND_DIR, "i18n", `ui.${fileKey}.json`),
    path.join(DATA_DIR, `i18n-${fileKey}.json`),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return parseJson(fs.readFileSync(file, "utf8"), {});
    }
  }
  return {};
}

function applyLanguage(entity, lang, keys) {
  if (lang === "ru") return entity;
  const suffix = lang === "en" ? "_en" : lang === "kz" || lang === "kk" ? "_kz" : "";
  if (!suffix) return entity;
  const out = { ...entity };
  keys.forEach((key) => {
    const localized = entity[`${key}${suffix}`];
    if (localized != null) out[key] = localized;
  });
  return out;
}

function withAsync(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

function sanitizeText(value, max = 2000) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, max);
}

function mapLegacyNewsContent(blocks) {
  if (!Array.isArray(blocks)) return [];
  const legacy = [];
  blocks.forEach((block) => {
    if (!block || typeof block !== "object") return;
    if (block.type === "heading") legacy.push({ h2: String(block.text || "") });
    else if (block.type === "paragraph" || block.type === "quote" || block.type === "callout") {
      legacy.push(String(block.text || ""));
    }
  });
  return legacy;
}

function mapPublicEntity(entityType, item) {
  const out = { ...item };
  if (entityType === "products") {
    out.popular = Boolean(out.popular || out.isPopular || out.featured);
    out.isPopular = Boolean(out.isPopular || out.popular || out.featured);
    out.isHidden = out.status === "hidden";
    if (!out.image && Array.isArray(out.gallery) && out.gallery[0]) out.image = out.gallery[0];
    if (!Array.isArray(out.images)) out.images = Array.isArray(out.gallery) ? out.gallery : out.image ? [out.image] : [];
  }
  if (entityType === "news") {
    if (!out.date && out.publicationDate) out.date = out.publicationDate;
    if (!out.excerpt && out.shortDescription) out.excerpt = out.shortDescription;
    if (!out.shortDescription && out.excerpt) out.shortDescription = out.excerpt;
    if (!Array.isArray(out.content) && Array.isArray(out.contentBlocks)) {
      out.content = mapLegacyNewsContent(out.contentBlocks);
    }
  }
  if (entityType === "pages") {
    if (!out.excerpt && out.shortDescription) out.excerpt = out.shortDescription;
    if (!out.shortDescription && out.excerpt) out.shortDescription = out.excerpt;
    if (!Array.isArray(out.content) && Array.isArray(out.contentBlocks)) {
      out.content = mapLegacyNewsContent(out.contentBlocks);
    }
  }
  return out;
}

function parseEntityType(raw) {
  const type = String(raw || "");
  if (!PUBLIC_ENTITY_TYPES.includes(type)) {
    const err = new Error("Unsupported entity type");
    err.status = 404;
    throw err;
  }
  return type;
}

function createImageUpload(bucket, maxSizeMb = 10) {
  const allowedMime = new Set(["image/jpeg", "image/png", "image/webp"]);
  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp"]);
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIRS[bucket]),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
      const base = path
        .basename(file.originalname || "file", ext)
        .replace(/[^a-z0-9_-]+/gi, "_")
        .toLowerCase();
      cb(null, `${Date.now()}-${base}${ext}`);
    },
  });
  return multer({
    storage,
    limits: { fileSize: maxSizeMb * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const mime = String(file.mimetype || "").toLowerCase();
      const ext = path.extname(String(file.originalname || "")).toLowerCase();
      if (!allowedMime.has(mime) || !allowedExt.has(ext)) {
        return cb(new Error("Допустимы только JPG, JPEG, PNG или WEBP"));
      }
      return cb(null, true);
    },
  });
}

function createApp(db, services = {}) {
  const app = express();
  app.set("trust proxy", 1);
  const multilingualService = services.multilingualService || null;
  const publicTranslateCache = new Map();
  const GOOGLE_PUBLIC_TRANSLATE_BASE =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&dt=t";

  function normalizePublicTargetLanguage(lang) {
    const normalized = normalizeLanguageCode(lang || "ru");
    if (normalized === "kk" || normalized === "kz") return "kk";
    if (normalized === "en") return "en";
    return normalized;
  }

  async function translatePublicText(text, lang) {
    const sourceText = String(text || "");
    const trimmed = sourceText.trim();
    if (!trimmed) return sourceText;
    if (/^[0-9\s.,:/%()\-+]+$/.test(trimmed)) return sourceText;
    const target = normalizePublicTargetLanguage(lang);
    if (!target || target === "ru") return sourceText;
    const cacheKey = `${target}\u0000${sourceText}`;
    if (publicTranslateCache.has(cacheKey)) return publicTranslateCache.get(cacheKey);

    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 8000);
    try {
      const url = `${GOOGLE_PUBLIC_TRANSLATE_BASE}&tl=${encodeURIComponent(target)}&q=${encodeURIComponent(sourceText)}`;
      const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
      if (!res.ok) throw new Error(`google-public ${res.status}`);
      const payload = await res.json();
      const translated = Array.isArray(payload?.[0])
        ? payload[0].map((part) => String(part?.[0] || "")).join("")
        : "";
      const output = translated || sourceText;
      publicTranslateCache.set(cacheKey, output);
      return output;
    } catch (_e) {
      return sourceText;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async function fallbackTranslatePublicEntity(entityType, item, lang) {
    const target = normalizePublicTargetLanguage(lang);
    if (!target || target === "ru" || !item || typeof item !== "object") return item;
    const out = { ...item };
    const tasks = [];
    const translateField = (key) => {
      if (typeof out[key] === "string" && out[key].trim()) {
        tasks.push(
          translatePublicText(out[key], target).then((translated) => {
            out[key] = translated;
          })
        );
      }
    };
    if (entityType === "categories") {
      translateField("name");
      translateField("shortDesc");
      translateField("description");
      await Promise.all(tasks);
      return out;
    }
    if (entityType === "partners") {
      translateField("description");
      translateField("equipment");
      translateField("country");
      await Promise.all(tasks);
      return out;
    }
    if (entityType === "products") {
      translateField("name");
      translateField("shortDesc");
      translateField("description");
      if (Array.isArray(out.specs)) {
        tasks.push(
          Promise.all(out.specs.map((entry) => translatePublicText(entry, target))).then((translated) => {
            out.specs = translated;
          })
        );
      }
      await Promise.all(tasks);
      return out;
    }
    if (entityType === "news") {
      translateField("title");
      translateField("shortDescription");
      translateField("excerpt");
      translateField("description");
      if (Array.isArray(out.content)) {
        tasks.push(
          Promise.all(
            out.content.map(async (entry) => {
              if (typeof entry === "string") return translatePublicText(entry, target);
              if (entry && typeof entry === "object" && typeof entry.h2 === "string") {
                return { ...entry, h2: await translatePublicText(entry.h2, target) };
              }
              return entry;
            })
          ).then((translatedContent) => {
            out.content = translatedContent;
          })
        );
      }
      await Promise.all(tasks);
      return out;
    }
    if (entityType === "pages") {
      translateField("title");
      translateField("excerpt");
      translateField("shortDescription");
      translateField("description");
      await Promise.all(tasks);
      return out;
    }
    await Promise.all(tasks);
    return out;
  }

  function resolveProductContentLanguage(rawLang) {
    if (!multilingualService) {
      const fallback = String(rawLang || "ru");
      return ["ru", "en", "kz"].includes(fallback) ? fallback : "ru";
    }
    const normalized = multilingualService.normalizeLanguageCode(rawLang || multilingualService.sourceLanguage);
    const allowed = new Set([
      multilingualService.sourceLanguage,
      ...(multilingualService.targetLanguages || []),
    ]);
    return allowed.has(normalized) ? normalized : multilingualService.sourceLanguage;
  }

  // Prefix compatibility layer for reverse-proxy or legacy admin routes.
  app.use((req, _res, next) => {
    if (req.url.startsWith("/admin-api/")) {
      req.url = `/api/admin/${req.url.slice("/admin-api/".length)}`;
    } else if (req.url.startsWith("/admin/api/")) {
      req.url = `/api/admin/${req.url.slice("/admin/api/".length)}`;
    } else if (req.url.startsWith("/api/v1/admin/")) {
      req.url = `/api/admin/${req.url.slice("/api/v1/admin/".length)}`;
    }
    next();
  });

  app.use(
    cors({
      origin: (origin, callback) => {
        const ok = isAllowedOrigin(origin);
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
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });

  app.post("/api/admin/login", withAsync((req, res) => loginHandler(req, res, db)));
  app.post("/api/admin/logout", (req, res) => {
    clearAuthCookies(res);
    res.json({ ok: true });
  });
  app.post("/api/admin/refresh", refreshHandler);
  app.get("/api/admin/check", authRequired, (req, res) => {
    res.json({ ok: true, role: req.user?.role || "admin" });
  });

  app.get("/api/admin/dashboard", authRequired, withAsync(async (_req, res) => {
    if (!db) {
      return res.json({
        totals: { products: 0, categories: 0, partners: 0, news: 0 },
        statuses: { published: 0, draft: 0, hidden: 0, archived: 0 },
        latestChanges: [],
        latestEntities: [],
        metrics: {
          visitsDay: 0,
          visitsWeek: 0,
          visitsMonth: 0,
          popularPages: [],
          popularProducts: [],
          trafficSources: [],
        },
      });
    }
    const dashboard = await getDashboardData(db);
    res.json({
      ...dashboard,
      metrics: {
        visitsDay: dashboard.metrics.visits_day || 0,
        visitsWeek: dashboard.metrics.visits_week || 0,
        visitsMonth: dashboard.metrics.visits_month || 0,
        popularPages: parseJson(dashboard.metrics.popular_pages_json, []),
        popularProducts: parseJson(dashboard.metrics.popular_products_json, []),
        trafficSources: parseJson(dashboard.metrics.traffic_sources_json, []),
      },
    });
  }));

  app.get("/api/admin/slug/check", authRequired, withAsync(async (req, res) => {
    const entityType = parseEntityType(req.query.entityType);
    const slug = String(req.query.slug || "");
    const excludeId = String(req.query.excludeId || "");
    const result = await slugCheck(db, entityType, slug, excludeId);
    res.json(result);
  }));

  app.get("/api/admin/url-preview", authRequired, (req, res) => {
    const entityType = parseEntityType(req.query.entityType);
    const slug = slugify(String(req.query.slug || ""));
    const map = {
      products: `/catalog/${slug}`,
      categories: `/categories/${slug}`,
      partners: `/partners/${slug}`,
      news: `/news/${slug}`,
      pages: `/page/${slug}`,
    };
    res.json({ url: map[entityType] || "/" });
  });

  app.get("/api/admin/:entityType(categories|partners|products|news|pages)", authRequired, withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    if (!db) {
      return res.json({ items: [], total: 0, page: 1, limit: 20 });
    }
    const result = await listEntities(db, entityType, req.query || {});
    res.json(result);
  }));

  app.post("/api/admin/:entityType(categories|partners|products|news|pages)", roleRequired("admin"), withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    const saved = await saveEntity(db, entityType, req.body || {}, req.user?.sub || "admin");
    if (multilingualService) {
      await multilingualService.onEntityUpsert(entityType, saved, req.user?.sub || "admin");
    }
    res.status(201).json(saved);
  }));

  app.get("/api/admin/:entityType(categories|partners|products|news|pages)/:id", authRequired, withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    const item = await getEntityById(db, entityType, req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    return res.json(item);
  }));

  app.put("/api/admin/:entityType(categories|partners|products|news|pages)/:id", roleRequired("admin"), withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    const saved = await saveEntity(
      db,
      entityType,
      { ...(req.body || {}), id: req.params.id },
      req.user?.sub || "admin",
      req.params.id
    );
    if (multilingualService) {
      await multilingualService.onEntityUpsert(entityType, saved, req.user?.sub || "admin");
    }
    res.json(saved);
  }));

  app.patch("/api/admin/:entityType(categories|partners|products|news|pages)/:id/inline", roleRequired("admin"), withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    const current = await getEntityById(db, entityType, req.params.id);
    if (!current) return res.status(404).json({ error: "Not found" });
    const updatedEntity = { ...current, ...(req.body || {}) };
    const saved = await saveEntity(db, entityType, updatedEntity, req.user?.sub || "admin", req.params.id);
    if (multilingualService) {
      await multilingualService.onEntityUpsert(entityType, saved, req.user?.sub || "admin");
    }
    res.json(saved);
  }));

  app.get("/api/admin/translations/:entityType(categories|partners|products|news|pages)/:id", roleRequired("admin"), withAsync(async (req, res) => {
    if (!multilingualService) return res.json({ sourceLanguage: "ru", targetLanguages: [], items: [] });
    const entityType = parseEntityType(req.params.entityType);
    const entity = await getEntityById(db, entityType, req.params.id);
    if (!entity) return res.status(404).json({ error: "Not found" });
    const items = await multilingualService.listEntityTranslationStatuses(entityType, req.params.id);
    return res.json({
      sourceLanguage: multilingualService.sourceLanguage,
      targetLanguages: multilingualService.targetLanguages,
      items,
    });
  }));

  app.post("/api/admin/translations/:entityType(categories|partners|products|news|pages)/:id/retranslate", roleRequired("admin"), withAsync(async (req, res) => {
    if (!multilingualService) {
      return res.status(400).json({ error: "Translation service is disabled" });
    }
    const entityType = parseEntityType(req.params.entityType);
    const entity = await getEntityById(db, entityType, req.params.id);
    if (!entity) return res.status(404).json({ error: "Not found" });
    const result = await multilingualService.scheduleEntityTranslation(entityType, entity, {
      changedBy: req.user?.sub || "admin",
      force: Boolean(req.body?.force),
      languages: Array.isArray(req.body?.languages) ? req.body.languages : undefined,
    });
    return res.json({
      ok: true,
      entityType,
      entityId: req.params.id,
      sourceLanguage: multilingualService.sourceLanguage,
      targetLanguages: multilingualService.targetLanguages,
      scheduled: result.scheduled || [],
      sourceHash: result.sourceHash || "",
    });
  }));

  app.patch("/api/admin/translations/:entityType(categories|partners|products|news|pages)/:id/:lang/manual", roleRequired("admin"), withAsync(async (req, res) => {
    const entityType = parseEntityType(req.params.entityType);
    const entity = await getEntityById(db, entityType, req.params.id);
    if (!entity) return res.status(404).json({ error: "Not found" });
    if (!multilingualService) return res.status(400).json({ error: "Translation service is disabled" });
    const lang = multilingualService.normalizeLanguageCode(req.params.lang);
    const translatedPayload = req.body?.translatedPayload && typeof req.body.translatedPayload === "object"
      ? req.body.translatedPayload
      : null;
    if (!translatedPayload) return res.status(400).json({ error: "translatedPayload object is required" });
    const now = nowIso();
    await db.run(
      `INSERT INTO entity_translations
       (id, entity_type, entity_id, language_code, source_language, source_hash, source_version, status,
        translated_payload_json, machine_translated, is_manual_override, needs_review, provider, provider_meta_json,
        error_message, attempts, prompt_version, created_at, updated_at, requested_at, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, 'completed', ?, 0, 1, 0, 'manual', '{}', '', 1, 'manual', ?, ?, ?, ?)
       ON CONFLICT(entity_type, entity_id, language_code) DO UPDATE SET
        status = 'completed',
        translated_payload_json = excluded.translated_payload_json,
        machine_translated = 0,
        is_manual_override = 1,
        needs_review = 0,
        provider = 'manual',
        error_message = '',
        updated_at = excluded.updated_at,
        completed_at = excluded.completed_at`,
      toId("etr"),
      entityType,
      req.params.id,
      lang,
      multilingualService.sourceLanguage,
      multilingualService.computeSourceHash(entityType, entity),
      JSON.stringify(translatedPayload),
      now,
      now,
      now,
      now
    );
    await multilingualService.rebuildSearchDocumentsForEntity(entityType, entity);
    return res.json({ ok: true, entityType, entityId: req.params.id, language: lang });
  }));

  // Backward compatibility with existing admin integration.
  app.get("/api/admin/products/:id/translations", roleRequired("admin"), withAsync(async (req, res) => {
    req.params.entityType = "products";
    const entityType = "products";
    if (!multilingualService) return res.json({ sourceLanguage: "ru", targetLanguages: [], items: [] });
    const entity = await getEntityById(db, entityType, req.params.id);
    if (!entity) return res.status(404).json({ error: "Not found" });
    const items = await multilingualService.listEntityTranslationStatuses(entityType, req.params.id);
    return res.json({
      sourceLanguage: multilingualService.sourceLanguage,
      targetLanguages: multilingualService.targetLanguages,
      items,
    });
  }));
  app.post("/api/admin/products/:id/retranslate", roleRequired("admin"), withAsync(async (req, res) => {
    if (!multilingualService) return res.status(400).json({ error: "Translation service is disabled" });
    const entityType = "products";
    const entity = await getEntityById(db, entityType, req.params.id);
    if (!entity) return res.status(404).json({ error: "Not found" });
    const result = await multilingualService.scheduleEntityTranslation(entityType, entity, {
      changedBy: req.user?.sub || "admin",
      force: Boolean(req.body?.force),
      languages: Array.isArray(req.body?.languages) ? req.body.languages : undefined,
    });
    return res.json({
      ok: true,
      entityType,
      entityId: req.params.id,
      sourceLanguage: multilingualService.sourceLanguage,
      targetLanguages: multilingualService.targetLanguages,
      scheduled: result.scheduled || [],
      sourceHash: result.sourceHash || "",
    });
  }));

  app.post("/api/admin/translations/:entityType(categories|partners|products|news|pages)/batch-retranslate", roleRequired("admin"), withAsync(async (req, res) => {
    if (!multilingualService) return res.status(400).json({ error: "Translation service is disabled" });
    const entityType = parseEntityType(req.params.entityType);
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.map((v) => String(v)).filter(Boolean) : [];
    if (!ids.length) return res.status(400).json({ error: "ids are required" });
    const results = [];
    for (const id of ids) {
      const entity = await getEntityById(db, entityType, id);
      if (!entity) continue;
      const outcome = await multilingualService.scheduleEntityTranslation(entityType, entity, {
        changedBy: req.user?.sub || "admin",
        force: Boolean(req.body?.force),
        languages: Array.isArray(req.body?.languages) ? req.body.languages : undefined,
      });
      results.push({ id, scheduled: outcome.scheduled || [] });
    }
    return res.json({ ok: true, entityType, items: results });
  }));

  app.get("/api/admin/localized/:entityType(categories|partners|products|news|pages)/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const entityType = parseEntityType(req.params.entityType);
    const entity = await getEntityById(db, entityType, req.params.id);
    if (!entity) return res.status(404).json({ error: "Not found" });
    const lang = resolveProductContentLanguage(req.query.lang);
    if (!multilingualService) return res.json(entity);
    const localized = await multilingualService.localizeEntity(entityType, entity, lang);
    return res.json(localized);
  }));

  app.post("/api/admin/search/rebuild", roleRequired("admin"), withAsync(async (req, res) => {
    if (!multilingualService) return res.status(400).json({ error: "Search index service is disabled" });
    const requestedTypes = Array.isArray(req.body?.entityTypes) ? req.body.entityTypes : [];
    await multilingualService.rebuildSearchIndex({
      entityTypes: requestedTypes.length ? requestedTypes : PUBLIC_ENTITY_TYPES,
    });
    return res.json({ ok: true, rebuilt: requestedTypes.length ? requestedTypes : PUBLIC_ENTITY_TYPES });
  }));

  app.get("/api/admin/i18n/keys", roleRequired("admin"), withAsync(async (_req, res) => {
    const rows = await db.all(
      `SELECT translation_key, source_language, source_text, source_hash, updated_at
         FROM ui_dictionary_entries
        ORDER BY translation_key ASC`
    );
    return res.json({ items: rows });
  }));

  app.get("/api/admin/i18n/:lang", roleRequired("admin"), withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.params.lang);
    const rows = await db.all(
      `SELECT translation_key, language_code, source_hash, status, translated_text, machine_translated,
              is_manual_override, provider, error_message, attempts, updated_at
         FROM ui_translations
        WHERE language_code = ?
        ORDER BY translation_key ASC`,
      lang
    );
    return res.json({ language: lang, items: rows });
  }));

  app.post("/api/admin/i18n/:lang/retranslate", roleRequired("admin"), withAsync(async (req, res) => {
    if (!multilingualService) return res.status(400).json({ error: "Translation service is disabled" });
    const lang = resolveProductContentLanguage(req.params.lang);
    const force = Boolean(req.body?.force);
    const result = await multilingualService.scheduleUiDictionaryTranslation(lang, {
      force,
      changedBy: req.user?.sub || "admin",
    });
    return res.json({ ok: true, language: lang, scheduled: result.scheduled || 0 });
  }));

  app.post("/api/admin/:entityType(categories|partners|products|news|pages)/bulk", roleRequired("admin"), withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    const result = await bulkAction(db, entityType, req.body || {}, req.user?.sub || "admin");
    if (multilingualService) {
      await multilingualService.rebuildSearchIndex({ entityTypes: [entityType] });
    }
    res.json(result);
  }));

  app.delete("/api/admin/:entityType(categories|partners|products|news|pages)/:id", roleRequired("admin"), withAsync(async (req, res, next) => {
    if (req.params.entityType === "media") return next();
    const entityType = parseEntityType(req.params.entityType);
    const removed = await deleteEntity(db, entityType, req.params.id, req.user?.sub || "admin");
    if (!removed) return res.status(404).json({ error: "Not found" });
    if (multilingualService) {
      await multilingualService.onEntityDelete(entityType, req.params.id);
    }
    return res.json({ ok: true });
  }));

  // Legacy admin PUT/DELETE endpoints (compatibility with old admin UI).
  app.put("/api/categories", roleRequired("admin"), withAsync(async (req, res) => {
    await replaceList(db, "categories", req.body, req.user?.sub || "admin");
    if (multilingualService) await multilingualService.rebuildSearchIndex({ entityTypes: ["categories"] });
    res.json({ ok: true });
  }));
  app.put("/api/partners", roleRequired("admin"), withAsync(async (req, res) => {
    await replaceList(db, "partners", req.body, req.user?.sub || "admin");
    if (multilingualService) await multilingualService.rebuildSearchIndex({ entityTypes: ["partners"] });
    res.json({ ok: true });
  }));
  app.put("/api/products", roleRequired("admin"), withAsync(async (req, res) => {
    await replaceList(db, "products", req.body, req.user?.sub || "admin");
    if (multilingualService) await multilingualService.rebuildSearchIndex({ entityTypes: ["products"] });
    res.json({ ok: true });
  }));
  app.put("/api/news", roleRequired("admin"), withAsync(async (req, res) => {
    const changedBy = req.user?.sub || "admin";
    const result = await replaceList(db, "news", req.body, changedBy);
    if (multilingualService) {
      const savedItems = Array.isArray(result?.savedItems) ? result.savedItems : [];
      for (const item of savedItems) {
        await multilingualService.onEntityUpsert("news", item, changedBy);
      }
      const removedIds = Array.isArray(result?.removedIds) ? result.removedIds : [];
      for (const id of removedIds) {
        await multilingualService.onEntityDelete("news", id);
      }
      await multilingualService.rebuildSearchIndex({ entityTypes: ["news"] });
    }
    res.json({ ok: true });
  }));
  app.delete("/api/categories/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const ok = await deleteEntity(db, "categories", req.params.id, req.user?.sub || "admin");
    if (!ok) return res.status(404).json({ error: "Not found" });
    if (multilingualService) await multilingualService.onEntityDelete("categories", req.params.id);
    return res.json({ ok: true });
  }));
  app.delete("/api/partners/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const ok = await deleteEntity(db, "partners", req.params.id, req.user?.sub || "admin");
    if (!ok) return res.status(404).json({ error: "Not found" });
    if (multilingualService) await multilingualService.onEntityDelete("partners", req.params.id);
    return res.json({ ok: true });
  }));
  app.delete("/api/products/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const ok = await deleteEntity(db, "products", req.params.id, req.user?.sub || "admin");
    if (!ok) return res.status(404).json({ error: "Not found" });
    if (multilingualService) await multilingualService.onEntityDelete("products", req.params.id);
    return res.json({ ok: true });
  }));
  app.delete("/api/news/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const ok = await deleteEntity(db, "news", req.params.id, req.user?.sub || "admin");
    if (!ok) return res.status(404).json({ error: "Not found" });
    if (multilingualService) await multilingualService.onEntityDelete("news", req.params.id);
    return res.json({ ok: true });
  }));

  async function localizeEntitiesForPublic(entityType, items, lang) {
    if (multilingualService) {
      const localized = await multilingualService.localizeEntityList(entityType, items, lang);
      const searchBlobMap = await multilingualService.getSearchBlobMap(
        entityType,
        localized.map((item) => item.id)
      );
      const withSearch = localized.map((item) => ({
        ...item,
        searchIndexText: searchBlobMap.get(item.id) || "",
      }));
      if (multilingualService.normalizeLanguageCode(lang) !== multilingualService.sourceLanguage) {
        return Promise.all(withSearch.map((entry) => fallbackTranslatePublicEntity(entityType, entry, lang)));
      }
      return withSearch;
    }
    if (entityType === "categories") return items.map((item) => applyLanguage(item, lang, ["name", "description"]));
    if (entityType === "partners") return items.map((item) => applyLanguage(item, lang, ["name", "description", "equipment"]));
    if (entityType === "products") return items.map((item) => applyLanguage(item, lang, ["name", "shortDesc", "description"]));
    if (entityType === "news") return items.map((item) => applyLanguage(item, lang, ["title", "excerpt"]));
    if (entityType === "pages") return items.map((item) => applyLanguage(item, lang, ["title", "excerpt", "description"]));
    return items;
  }

  app.get("/api/categories", withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.query.lang);
    const items = await listPublicEntities(db, "categories");
    const localized = await localizeEntitiesForPublic("categories", items, lang);
    res.json(localized.map((item) => mapPublicEntity("categories", item)));
  }));
  app.get("/api/partners", withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.query.lang);
    const items = await listPublicEntities(db, "partners");
    const localized = await localizeEntitiesForPublic("partners", items, lang);
    res.json(localized.map((item) => mapPublicEntity("partners", item)));
  }));
  app.get("/api/products", withAsync(async (req, res) => {
    const items = await listPublicEntities(db, "products");
    const lang = resolveProductContentLanguage(req.query.lang);
    const localized = await localizeEntitiesForPublic("products", items, lang);
    res.json(localized.map((item) => mapPublicEntity("products", item)));
  }));
  app.get("/api/news", withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.query.lang);
    const items = await listPublicEntities(db, "news");
    const localized = await localizeEntitiesForPublic("news", items, lang);
    res.json(localized.map((item) => mapPublicEntity("news", item)));
  }));

  app.get("/api/pages", withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.query.lang);
    const items = await listPublicEntities(db, "pages");
    const localized = await localizeEntitiesForPublic("pages", items, lang);
    res.json(localized.map((item) => mapPublicEntity("pages", item)));
  }));

  app.get("/api/catalog", withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.query.lang);
    const [categories, partners, products, news] = await Promise.all([
      listPublicEntities(db, "categories"),
      listPublicEntities(db, "partners"),
      listPublicEntities(db, "products"),
      listPublicEntities(db, "news"),
    ]);
    const [localizedCategories, localizedPartners, localizedProducts, localizedNews] = await Promise.all([
      localizeEntitiesForPublic("categories", categories, lang),
      localizeEntitiesForPublic("partners", partners, lang),
      localizeEntitiesForPublic("products", products, lang),
      localizeEntitiesForPublic("news", news, lang),
    ]);
    res.json({
      categories: localizedCategories.map((item) => mapPublicEntity("categories", item)),
      partners: localizedPartners.map((item) => mapPublicEntity("partners", item)),
      products: localizedProducts.map((item) => mapPublicEntity("products", item)),
      news: localizedNews.map((item) => mapPublicEntity("news", item)),
    });
  }));

  app.get("/api/search", withAsync(async (req, res) => {
    const q = String(req.query.q || "").trim();
    if (!q) return res.json({ items: [] });
    if (!multilingualService) return res.json({ items: [] });
    const lang = resolveProductContentLanguage(req.query.lang);
    const types = String(req.query.types || "")
      .split(",")
      .map((type) => type.trim())
      .filter(Boolean);
    const items = await multilingualService.search(q, {
      lang,
      entityTypes: types.length ? types : undefined,
      includeAllLanguages: true,
      limit: Number.parseInt(req.query.limit || "24", 10),
    });
    res.json({ items });
  }));

  app.get("/api/i18n", withAsync(async (req, res) => {
    const resolved = resolveProductContentLanguage(req.query.lang);
    const fileDict = readUiLocale(resolved);
    const src = multilingualService ? multilingualService.sourceLanguage : "ru";
    if (!multilingualService || resolved === src) return res.json(fileDict);
    const dict = await multilingualService.getUiDictionary(resolved, fileDict, {});
    res.json(dict);
  }));
  app.post("/api/i18n", withAsync(async (req, res) => {
    const lang = resolveProductContentLanguage(req.body?.lang || req.query.lang);
    const base = req.body?.base && typeof req.body.base === "object" ? req.body.base : {};
    const existing = req.body?.existing && typeof req.body.existing === "object" ? req.body.existing : {};
    const fileDict = readUiLocale(lang);
    const baseForRegistry = Object.keys(base).length ? base : readUiLocale("ru");
    const src = multilingualService ? multilingualService.sourceLanguage : "ru";
    if (!multilingualService || lang === src) {
      return res.json({ ...existing, ...fileDict });
    }
    await multilingualService.registerUiDictionary(baseForRegistry, "ui-request");
    try {
      await multilingualService.scheduleUiDictionaryTranslation(lang, {
        force: false,
        changedBy: "ui-request",
      });
      await multilingualService.flushQueue();
    } catch (_e) {}
    const dict = await multilingualService.getUiDictionary(lang, { ...baseForRegistry, ...fileDict }, existing);
    res.json(dict);
  }));

  app.post("/api/requests", withAsync(async (req, res) => {
    const body = req.body || {};
    const item = {
      id: toId("req"),
      type: sanitizeText(body.type, 64) || "contact",
      requestType: sanitizeText(body.requestType, 64),
      name: sanitizeText(body.name, 128),
      company: sanitizeText(body.company, 256),
      phone: sanitizeText(body.phone, 64),
      email: sanitizeText(body.email, 256),
      message: sanitizeText(body.message, 4000),
      items: sanitizeText(body.items, 4000),
      cart: asArray(body.cart).slice(0, 100),
      createdAt: nowIso(),
    };
    await db.run(
      `INSERT INTO requests(id, type, request_type, name, company, phone, email, message, items, cart_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      item.id,
      item.type,
      item.requestType,
      item.name,
      item.company,
      item.phone,
      item.email,
      item.message,
      item.items,
      JSON.stringify(item.cart),
      item.createdAt
    );
    res.status(201).json({ ok: true, id: item.id });
  }));

  app.get("/api/requests", authRequired, withAsync(async (_req, res) => {
    const rows = await db.all("SELECT * FROM requests ORDER BY created_at DESC LIMIT 300");
    res.json(
      rows.map((row) => ({
        id: row.id,
        type: row.type,
        requestType: row.request_type,
        name: row.name,
        company: row.company,
        phone: row.phone,
        email: row.email,
        message: row.message,
        items: row.items,
        cart: parseJson(row.cart_json, []),
        createdAt: row.created_at,
      }))
    );
  }));

  app.get("/api/admin/media", authRequired, withAsync(async (req, res) => {
    if (!db) return res.json([]);
    const q = String(req.query.q || "").toLowerCase().trim();
    const rows = q
      ? await db.all("SELECT * FROM media_assets WHERE LOWER(path) LIKE ? ORDER BY created_at DESC LIMIT 300", `%${q}%`)
      : await db.all("SELECT * FROM media_assets ORDER BY created_at DESC LIMIT 300");
    res.json(rows);
  }));

  const uploadMedia = createImageUpload("media", 20);
  app.post("/api/admin/media/upload", roleRequired("admin"), (req, res, next) => {
    uploadMedia.single("file")(req, res, async (error) => {
      if (error) return next(error);
      if (!req.file) return res.status(400).json({ error: "Файл не получен" });
      const publicPath = `/uploads/media/${req.file.filename}`;
      const row = {
        id: toId("med"),
        path: publicPath,
        bucket: "media",
        mimeType: req.file.mimetype || "",
        sizeBytes: req.file.size || 0,
        createdAt: nowIso(),
      };
      await db.run(
        `INSERT INTO media_assets(id, path, bucket, mime_type, size_bytes, alt_text, caption, owner_type, owner_id, created_at, updated_at, updated_by)
         VALUES (?, ?, ?, ?, ?, '', '', '', '', ?, ?, ?)`,
        row.id,
        row.path,
        row.bucket,
        row.mimeType,
        row.sizeBytes,
        row.createdAt,
        row.createdAt,
        req.user?.sub || "admin"
      );
      res.json({ ok: true, media: row, path: publicPath });
    });
  });

  app.patch("/api/admin/media/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const alt = sanitizeText(req.body?.altText || "", 300);
    const caption = sanitizeText(req.body?.caption || "", 500);
    const ownerType = sanitizeText(req.body?.ownerType || "", 64);
    const ownerId = sanitizeText(req.body?.ownerId || "", 128);
    await db.run(
      `UPDATE media_assets SET alt_text=?, caption=?, owner_type=?, owner_id=?, updated_at=?, updated_by=? WHERE id=?`,
      alt,
      caption,
      ownerType,
      ownerId,
      nowIso(),
      req.user?.sub || "admin",
      req.params.id
    );
    const row = await db.get("SELECT * FROM media_assets WHERE id = ?", req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json(row);
  }));

  app.delete("/api/admin/media/:id", roleRequired("admin"), withAsync(async (req, res) => {
    const row = await db.get("SELECT * FROM media_assets WHERE id = ?", req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    await db.run("DELETE FROM media_assets WHERE id = ?", req.params.id);
    const fullPath = path.join(FRONTEND_DIR, row.path.replace(/^\//, ""));
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    return res.json({ ok: true });
  }));

  // Compatibility upload endpoints for legacy admin.
  const uploadProductImage = createImageUpload("products", 10);
  const uploadPartnerLogo = createImageUpload("partners", 5);
  const uploadNewsImage = createImageUpload("news", 10);
  const uploadDocs = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, UPLOAD_DIRS.docs),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname || "").toLowerCase() || ".pdf";
        const base = path.basename(file.originalname || "doc", ext).replace(/[^a-z0-9_-]+/gi, "_").toLowerCase();
        cb(null, `${Date.now()}-${base}${ext}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  app.post("/api/admin/upload/product-image", roleRequired("admin"), (req, res, next) => {
    uploadProductImage.single("file")(req, res, (error) => {
      if (error) return next(error);
      if (!req.file) return res.status(400).json({ error: "Файл не получен" });
      return res.json({ ok: true, path: `/uploads/products/${req.file.filename}` });
    });
  });
  app.post("/api/admin/upload/partner-logo", roleRequired("admin"), (req, res, next) => {
    uploadPartnerLogo.single("file")(req, res, (error) => {
      if (error) return next(error);
      if (!req.file) return res.status(400).json({ error: "Файл не получен" });
      return res.json({ ok: true, path: `/uploads/partners/${req.file.filename}` });
    });
  });
  app.post("/api/admin/upload/news-image", roleRequired("admin"), (req, res, next) => {
    uploadNewsImage.single("file")(req, res, (error) => {
      if (error) return next(error);
      if (!req.file) return res.status(400).json({ error: "Файл не получен" });
      return res.json({ ok: true, path: `/uploads/news/${req.file.filename}` });
    });
  });
  app.post("/api/admin/upload/product-doc", roleRequired("admin"), (req, res, next) => {
    uploadDocs.single("file")(req, res, (error) => {
      if (error) return next(error);
      if (!req.file) return res.status(400).json({ error: "Файл не получен" });
      return res.json({ ok: true, path: `/uploads/docs/${req.file.filename}` });
    });
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: nowIso() });
  });

  app.use(express.static(FRONTEND_DIR));

  app.get("/admin", (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIR, "admin", "index.html"));
  });
  app.get("/admin/*", (req, res, next) => {
    const target = path.join(FRONTEND_DIR, req.path);
    if (fs.existsSync(target) && fs.statSync(target).isFile()) {
      return res.sendFile(target);
    }
    return res.sendFile(path.join(FRONTEND_DIR, "admin", "index.html"), (error) => {
      if (error) next(error);
    });
  });

  app.get("/", (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIR, "index.html"));
  });
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path.startsWith("/api/")) return next();
    if (req.path.startsWith("/admin")) return next();
    return res.sendFile(path.join(FRONTEND_DIR, "index.html"), (error) => {
      if (error) next(error);
    });
  });

  app.use((error, req, res, next) => {
    if (!error || res.headersSent) return next(error);
    const status = Number.isFinite(Number(error.status)) ? Number(error.status) : 500;
    const message = status >= 500 && IS_PRODUCTION ? "Внутренняя ошибка сервера" : String(error.message || "Ошибка запроса");
    if (String(req.path || "").startsWith("/api/")) {
      return res.status(status).json({ error: message });
    }
    return next(error);
  });

  return app;
}

function getLocalIps() {
  const list = [];
  const nets = os.networkInterfaces();
  Object.keys(nets).forEach((name) => {
    nets[name].forEach((net) => {
      if (net.family === "IPv4" && !net.internal) {
        list.push(net.address);
      }
    });
  });
  return list;
}

async function startServer() {
  const db = await initDb();
  const translationProvider = createTranslationProviderFromEnv();
  const multilingualService = createMultilingualService({
    db,
    provider: translationProvider,
    logger: console,
    entityTypes: PUBLIC_ENTITY_TYPES,
  });
  await multilingualService.rebuildSearchIndex({ entityTypes: PUBLIC_ENTITY_TYPES });
  const app = createApp(db, { multilingualService });

  function launch(port) {
    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`NanoFarm server started: http://localhost:${port}`);
      getLocalIps().forEach((address) => console.log(`  http://${address}:${port}`));
    });
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE" && port === PORT) {
        console.warn(`Port ${PORT} in use, fallback to ${PORT + 1}`);
        launch(PORT + 1);
        return;
      }
      throw error;
    });
  }

  launch(PORT);
}

module.exports = {
  startServer,
};
