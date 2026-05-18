const crypto = require("crypto");
const { nowIso, parseJson, toId } = require("./utils");
const { buildProductTranslationPrompt, TRANSLATION_PROMPT_VERSION } = require("./productTranslationPrompt");

const DEFAULT_SOURCE_LANGUAGE = String(process.env.PRODUCT_SOURCE_LANGUAGE || "ru").toLowerCase();
const LANGUAGE_ALIASES = {
  kz: "kk",
};
const NON_TRANSLATABLE_KEYS = new Set([
  "id",
  "slug",
  "article",
  "sku",
  "brand",
  "model",
  "status",
  "sortOrder",
  "featured",
  "price",
  "priceType",
  "availability",
  "categoryId",
  "partnerId",
  "image",
  "images",
  "gallery",
  "galleryAssets",
  "mediaIds",
  "photos",
  "url",
  "createdAt",
  "updatedAt",
  "updatedBy",
]);

function parseTargetLanguages() {
  const raw = String(process.env.PRODUCT_TARGET_LANGUAGES || "en,kk,uz");
  return raw
    .split(",")
    .map((lang) => normalizeLanguageCode(lang))
    .filter((lang) => lang && lang !== DEFAULT_SOURCE_LANGUAGE);
}

const TARGET_LANGUAGES = parseTargetLanguages();

function normalizeLanguageCode(value) {
  const raw = String(value || "").trim().toLowerCase();
  return LANGUAGE_ALIASES[raw] || raw;
}

function toHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function stableStringify(value) {
  if (value == null) return "null";
  if (typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
}

function pickAdditionalTextFields(product) {
  const out = {};
  Object.entries(product || {}).forEach(([key, value]) => {
    if (NON_TRANSLATABLE_KEYS.has(key)) return;
    if (["title", "name", "shortDesc", "description", "specs", "seo"].includes(key)) return;
    if (typeof value === "string" && value.trim()) {
      out[key] = value;
      return;
    }
    if (Array.isArray(value) && value.every((entry) => typeof entry === "string")) {
      out[key] = value;
    }
  });
  return out;
}

function buildSourcePayload(product) {
  const seo = product?.seo && typeof product.seo === "object" ? product.seo : {};
  const attributes = {
    specs: Array.isArray(product?.specs) ? product.specs : [],
    seoTitle: String(seo.metaTitle || seo.title || ""),
    seoDescription: String(seo.metaDescription || seo.description || ""),
  };
  return {
    sourceLanguage: DEFAULT_SOURCE_LANGUAGE,
    productType: String(product?.categoryId || ""),
    brand: String(product?.brand || product?.partnerId || ""),
    title: String(product?.name || product?.title || ""),
    shortDescription: String(product?.shortDesc || ""),
    description: String(product?.description || ""),
    attributes,
    additionalFields: pickAdditionalTextFields(product),
  };
}

function buildTranslationSnapshotHash(product) {
  const snapshot = buildSourcePayload(product);
  return toHash(stableStringify(snapshot));
}

function mergeTranslatedPayload(product, payload) {
  if (!payload || typeof payload !== "object") return product;
  const next = { ...product };
  if (typeof payload.title === "string") {
    next.name = payload.title;
    next.title = payload.title;
  }
  if (typeof payload.shortDescription === "string") next.shortDesc = payload.shortDescription;
  if (typeof payload.description === "string") next.description = payload.description;
  if (payload.attributes && typeof payload.attributes === "object") {
    if (Array.isArray(payload.attributes.specs)) next.specs = payload.attributes.specs.map((v) => String(v || ""));
    const seo = { ...(next.seo && typeof next.seo === "object" ? next.seo : {}) };
    if (typeof payload.attributes.seoTitle === "string") seo.metaTitle = payload.attributes.seoTitle;
    if (typeof payload.attributes.seoDescription === "string") seo.metaDescription = payload.attributes.seoDescription;
    next.seo = seo;
  }
  if (payload.additionalFields && typeof payload.additionalFields === "object") {
    Object.entries(payload.additionalFields).forEach(([key, value]) => {
      if (NON_TRANSLATABLE_KEYS.has(key)) return;
      if (typeof value === "string" || (Array.isArray(value) && value.every((item) => typeof item === "string"))) {
        next[key] = value;
      }
    });
  }
  return next;
}

function shouldRetranslate(existingRow, sourceHash, force) {
  if (force) return true;
  if (!existingRow) return true;
  if (String(existingRow.status || "") !== "completed") return true;
  return String(existingRow.source_hash || "") !== sourceHash;
}

async function writeAuditTranslation(db, action, payload, changedBy = "system") {
  await db.run(
    "INSERT INTO audit_log(id, entity_type, entity_id, action, payload_json, changed_by, changed_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    toId("log"),
    "products",
    String(payload.productId || ""),
    action,
    JSON.stringify(payload || {}),
    changedBy,
    nowIso()
  );
}

function createProductTranslationService({ db, provider, logger = console }) {
  let queue = Promise.resolve();

  function enqueue(task) {
    queue = queue.then(task).catch((error) => {
      logger.error("[translation] queue task failed:", error);
    });
  }

  async function listTranslationStatuses(productId) {
    const rows = await db.all(
      `SELECT product_id, language_code, source_hash, source_language, status, provider,
              error_message, attempts, prompt_version, updated_at, completed_at
         FROM product_translations
        WHERE product_id = ?
        ORDER BY language_code ASC`,
      productId
    );
    return rows.map((row) => ({
      productId: row.product_id,
      language: row.language_code,
      sourceHash: row.source_hash,
      sourceLanguage: row.source_language,
      status: row.status,
      provider: row.provider,
      errorMessage: row.error_message || "",
      attempts: Number(row.attempts || 0),
      promptVersion: row.prompt_version || "",
      updatedAt: row.updated_at || "",
      completedAt: row.completed_at || "",
    }));
  }

  async function getCompletedTranslationsForProducts(productIds, lang) {
    const normalizedLang = normalizeLanguageCode(lang);
    if (!Array.isArray(productIds) || !productIds.length) return new Map();
    const placeholders = productIds.map(() => "?").join(",");
    const rows = await db.all(
      `SELECT product_id, translated_payload_json
         FROM product_translations
        WHERE status = 'completed'
          AND language_code = ?
          AND product_id IN (${placeholders})`,
      normalizedLang,
      ...productIds
    );
    const map = new Map();
    rows.forEach((row) => {
      map.set(row.product_id, parseJson(row.translated_payload_json, null));
    });
    return map;
  }

  async function loadTranslatedProduct(product, lang) {
    const normalizedLang = normalizeLanguageCode(lang);
    if (!normalizedLang || normalizedLang === DEFAULT_SOURCE_LANGUAGE) return product;
    const row = await db.get(
      `SELECT translated_payload_json
         FROM product_translations
        WHERE product_id = ? AND language_code = ? AND status = 'completed'`,
      product.id,
      normalizedLang
    );
    if (!row) return product;
    return mergeTranslatedPayload(product, parseJson(row.translated_payload_json, null));
  }

  async function markPending(productId, lang, sourceHash, changedBy) {
    const now = nowIso();
    await db.run(
      `INSERT INTO product_translations
       (id, product_id, language_code, source_hash, source_language, status, provider, translated_payload_json,
        error_message, attempts, prompt_version, created_at, updated_at, requested_at, completed_at)
       VALUES (?, ?, ?, ?, ?, 'pending', ?, '{}', '', 0, ?, ?, ?, ?, NULL)
       ON CONFLICT(product_id, language_code) DO UPDATE SET
         source_hash = excluded.source_hash,
         source_language = excluded.source_language,
         status = 'pending',
         provider = excluded.provider,
         error_message = '',
         updated_at = excluded.updated_at,
         requested_at = excluded.requested_at`,
      toId("trl"),
      productId,
      lang,
      sourceHash,
      DEFAULT_SOURCE_LANGUAGE,
      String(process.env.AI_TRANSLATION_PROVIDER || "openai"),
      TRANSLATION_PROMPT_VERSION,
      now,
      now,
      now
    );
    await writeAuditTranslation(
      db,
      "translation-pending",
      { productId, language: lang, sourceHash },
      changedBy
    );
  }

  async function markCompleted(productId, lang, sourceHash, translatedPayload, changedBy) {
    const now = nowIso();
    await db.run(
      `UPDATE product_translations
          SET status = 'completed',
              translated_payload_json = ?,
              error_message = '',
              source_hash = ?,
              source_language = ?,
              attempts = attempts + 1,
              prompt_version = ?,
              updated_at = ?,
              completed_at = ?
        WHERE product_id = ? AND language_code = ?`,
      JSON.stringify(translatedPayload || {}),
      sourceHash,
      DEFAULT_SOURCE_LANGUAGE,
      TRANSLATION_PROMPT_VERSION,
      now,
      now,
      productId,
      lang
    );
    await writeAuditTranslation(
      db,
      "translation-completed",
      { productId, language: lang, sourceHash },
      changedBy
    );
  }

  async function markFailed(productId, lang, sourceHash, error, changedBy) {
    const now = nowIso();
    const message = String(error?.message || error || "Translation failed").slice(0, 2000);
    await db.run(
      `UPDATE product_translations
          SET status = 'failed',
              error_message = ?,
              source_hash = ?,
              source_language = ?,
              attempts = attempts + 1,
              prompt_version = ?,
              updated_at = ?
        WHERE product_id = ? AND language_code = ?`,
      message,
      sourceHash,
      DEFAULT_SOURCE_LANGUAGE,
      TRANSLATION_PROMPT_VERSION,
      now,
      productId,
      lang
    );
    logger.error(`[translation] product=${productId} lang=${lang} failed:`, message);
    await writeAuditTranslation(
      db,
      "translation-failed",
      { productId, language: lang, sourceHash, error: message },
      changedBy
    );
  }

  async function processTranslation({ product, targetLanguage, sourceHash, changedBy }) {
    const sourcePayload = buildSourcePayload(product);
    const prompts = buildProductTranslationPrompt({
      ...sourcePayload,
      targetLanguage,
    });
    try {
      const translated = await provider.translateProduct({
        systemPrompt: prompts.system,
        userPrompt: prompts.user,
      });
      const translatedPayload = {
        title: String(translated.title || ""),
        shortDescription: String(translated.shortDescription || ""),
        description: String(translated.description || ""),
        attributes: translated.attributes && typeof translated.attributes === "object" ? translated.attributes : {},
        additionalFields:
          translated.additionalFields && typeof translated.additionalFields === "object"
            ? translated.additionalFields
            : {},
      };
      await markCompleted(product.id, targetLanguage, sourceHash, translatedPayload, changedBy);
    } catch (error) {
      await markFailed(product.id, targetLanguage, sourceHash, error, changedBy);
    }
  }

  async function scheduleProductTranslation(product, options = {}) {
    if (!product || !product.id) return { scheduled: [] };
    const changedBy = String(options.changedBy || "system");
    const force = Boolean(options.force);
    const requestedLanguages = Array.isArray(options.languages) && options.languages.length
      ? options.languages.map((lang) => normalizeLanguageCode(lang)).filter(Boolean)
      : TARGET_LANGUAGES.slice();
    const targetLanguages = requestedLanguages.filter((lang) => lang !== DEFAULT_SOURCE_LANGUAGE);
    if (!targetLanguages.length) return { scheduled: [] };
    const sourceHash = buildTranslationSnapshotHash(product);
    const existing = await db.all(
      `SELECT product_id, language_code, source_hash, status
         FROM product_translations
        WHERE product_id = ?`,
      product.id
    );
    const existingByLang = new Map(existing.map((row) => [row.language_code, row]));
    const scheduled = [];
    for (const lang of targetLanguages) {
      const prev = existingByLang.get(lang);
      if (!shouldRetranslate(prev, sourceHash, force)) continue;
      await markPending(product.id, lang, sourceHash, changedBy);
      scheduled.push(lang);
      enqueue(() =>
        processTranslation({
          product,
          targetLanguage: lang,
          sourceHash,
          changedBy,
        })
      );
    }
    return { scheduled, sourceHash };
  }

  return {
    normalizeLanguageCode,
    sourceLanguage: DEFAULT_SOURCE_LANGUAGE,
    targetLanguages: TARGET_LANGUAGES.slice(),
    mergeTranslatedPayload,
    loadTranslatedProduct,
    getCompletedTranslationsForProducts,
    scheduleProductTranslation,
    listTranslationStatuses,
    shouldRetranslate,
    buildTranslationSnapshotHash,
  };
}

module.exports = {
  createProductTranslationService,
  normalizeLanguageCode,
};
