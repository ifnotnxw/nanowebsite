const crypto = require("crypto");
const { nowIso, parseJson, toId } = require("./utils");
const {
  MULTILINGUAL_PROMPT_VERSION,
  buildEntityTranslationPrompt,
  buildUiDictionaryPrompt,
} = require("./multilingualPrompts");

const LANGUAGE_ALIASES = { kz: "kk" };
const GOOGLE_FREE_TRANSLATE_BASE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&dt=t";
const GOOGLE_FREE_TRANSLATE_CACHE = new Map();
const NON_TRANSLATABLE_KEYS = new Set([
  "id",
  "slug",
  "status",
  "sortOrder",
  "featured",
  "createdAt",
  "updatedAt",
  "updatedBy",
  "price",
  "priceType",
  "availability",
  "article",
  "sku",
  "model",
  "serial",
  "code",
  "codes",
  "categoryId",
  "partnerId",
  "image",
  "images",
  "gallery",
  "galleryAssets",
  "photos",
  "mediaIds",
  "url",
]);

function normalizeLanguageCode(value) {
  const raw = String(value || "").trim().toLowerCase();
  return LANGUAGE_ALIASES[raw] || raw;
}

function parseLanguageList(raw, fallback) {
  const list = String(raw || fallback || "")
    .split(",")
    .map((lang) => normalizeLanguageCode(lang))
    .filter(Boolean);
  return [...new Set(list)];
}

function stableStringify(value) {
  if (value == null) return "null";
  if (typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((x) => stableStringify(x)).join(",")}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
}

function toHash(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex");
}

function transliterateBasic(value) {
  const map = {
    а: "a", ә: "a", б: "b", в: "v", г: "g", ғ: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
    й: "y", к: "k", қ: "k", л: "l", м: "m", н: "n", ң: "n", о: "o", ө: "o", п: "p", р: "r", с: "s",
    т: "t", у: "u", ұ: "u", ү: "u", ф: "f", х: "h", һ: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sh",
    ъ: "", ы: "y", і: "i", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return String(value || "")
    .toLowerCase()
    .split("")
    .map((ch) => (Object.prototype.hasOwnProperty.call(map, ch) ? map[ch] : ch))
    .join("");
}

function normalizeForSearch(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]+/gu, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(values) {
  const out = new Set();
  (values || []).forEach((value) => {
    const text = normalizeForSearch(value);
    if (!text) return;
    text.split(" ").forEach((token) => {
      const normalized = token.trim();
      if (normalized.length < 2) return;
      out.add(normalized);
    });
    const translit = normalizeForSearch(transliterateBasic(text));
    if (translit && translit !== text) {
      translit.split(" ").forEach((token) => {
        const normalized = token.trim();
        if (normalized.length < 2) return;
        out.add(normalized);
      });
    }
  });
  return [...out];
}

function normalizeContentBlocksForTranslation(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks.map((block) => {
    if (!block || typeof block !== "object") return {};
    const copy = { ...block };
    if (typeof copy.text !== "string") copy.text = String(copy.text || "");
    if (typeof copy.caption !== "string") copy.caption = String(copy.caption || "");
    if (typeof copy.alt !== "string") copy.alt = String(copy.alt || "");
    return copy;
  });
}

function normalizeHtmlString(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function normalizeGoogleTargetLanguage(lang) {
  const normalized = normalizeLanguageCode(lang);
  if (normalized === "kk") return "kk";
  if (normalized === "en") return "en";
  return normalized || "en";
}

async function translateTextWithGoogleFree(text, targetLanguage) {
  const sourceText = String(text || "");
  const trimmed = sourceText.trim();
  if (!trimmed) return sourceText;
  if (/^[0-9\s.,:/%()\-+]+$/.test(trimmed)) return sourceText;
  const target = normalizeGoogleTargetLanguage(targetLanguage);
  const cacheKey = `${target}\u0000${sourceText}`;
  if (GOOGLE_FREE_TRANSLATE_CACHE.has(cacheKey)) {
    return GOOGLE_FREE_TRANSLATE_CACHE.get(cacheKey);
  }
  const url = `${GOOGLE_FREE_TRANSLATE_BASE}&tl=${encodeURIComponent(target)}&q=${encodeURIComponent(sourceText)}`;
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), 12000);
  let res;
  try {
    res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
  } finally {
    clearTimeout(timeoutId);
  }
  if (!res.ok) {
    throw new Error(`GoogleFree ${res.status}`);
  }
  const payload = await res.json();
  const translated = Array.isArray(payload?.[0])
    ? payload[0].map((part) => String(part?.[0] || "")).join("")
    : "";
  const output = translated || sourceText;
  GOOGLE_FREE_TRANSLATE_CACHE.set(cacheKey, output);
  return output;
}

async function translateValueWithGoogleFree(value, targetLanguage) {
  if (value == null) return value;
  if (typeof value === "string") {
    return translateTextWithGoogleFree(value, targetLanguage);
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const entry of value) {
      out.push(await translateValueWithGoogleFree(entry, targetLanguage));
    }
    return out;
  }
  if (typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      out[key] = await translateValueWithGoogleFree(entry, targetLanguage);
    }
    return out;
  }
  return value;
}

function extractTranslatableFields(entityType, entity) {
  const seo = entity?.seo && typeof entity.seo === "object" ? entity.seo : {};
  if (entityType === "products") {
    return {
      title: String(entity?.name || entity?.title || ""),
      shortDescription: String(entity?.shortDesc || ""),
      description: String(entity?.description || ""),
      specs: Array.isArray(entity?.specs) ? entity.specs.map((x) => String(x || "")) : [],
      seo: {
        metaTitle: String(seo.metaTitle || seo.title || ""),
        metaDescription: String(seo.metaDescription || seo.description || ""),
        keywords: String(seo.keywords || ""),
      },
    };
  }
  if (entityType === "categories") {
    return {
      title: String(entity?.name || entity?.title || ""),
      shortDescription: String(entity?.shortDesc || ""),
      description: String(entity?.description || ""),
      seo: {
        metaTitle: String(seo.metaTitle || seo.title || ""),
        metaDescription: String(seo.metaDescription || seo.description || ""),
        keywords: String(seo.keywords || ""),
      },
    };
  }
  if (entityType === "partners") {
    return {
      // partner.name often canonical brand-like; keep canonical by default
      title: "",
      description: String(entity?.description || ""),
      equipment: String(entity?.equipment || ""),
      country: String(entity?.country || ""),
      contactInfo: String(entity?.contactInfo || ""),
      seo: {
        metaTitle: String(seo.metaTitle || seo.title || ""),
        metaDescription: String(seo.metaDescription || seo.description || ""),
        keywords: String(seo.keywords || ""),
      },
    };
  }
  if (entityType === "news") {
    const contentHtml = normalizeHtmlString(
      entity?.contentHtml
      || (typeof entity?.content === "string" ? entity.content : "")
      || (typeof entity?.description === "string" ? entity.description : "")
    );
    return {
      title: String(entity?.title || ""),
      shortDescription: String(entity?.shortDescription || entity?.excerpt || ""),
      description: String(entity?.description || ""),
      content: contentHtml,
      contentBlocks: normalizeContentBlocksForTranslation(entity?.contentBlocks),
      seo: {
        metaTitle: String(seo.metaTitle || seo.title || ""),
        metaDescription: String(seo.metaDescription || seo.description || ""),
        keywords: String(seo.keywords || ""),
      },
    };
  }
  if (entityType === "pages") {
    const contentHtml = normalizeHtmlString(
      entity?.contentHtml
      || (typeof entity?.content === "string" ? entity.content : "")
      || (typeof entity?.description === "string" ? entity.description : "")
    );
    return {
      title: String(entity?.title || ""),
      shortDescription: String(entity?.excerpt || entity?.shortDescription || ""),
      description: String(entity?.description || ""),
      content: contentHtml,
      contentBlocks: normalizeContentBlocksForTranslation(entity?.contentBlocks),
      seo: {
        metaTitle: String(seo.metaTitle || seo.title || ""),
        metaDescription: String(seo.metaDescription || seo.description || ""),
        keywords: String(seo.keywords || ""),
      },
    };
  }
  return {};
}

function mergeLocalizedFields(entityType, entity, translated) {
  if (!translated || typeof translated !== "object") return entity;
  const out = { ...entity };
  const seo = { ...(out.seo && typeof out.seo === "object" ? out.seo : {}) };
  if (entityType === "products") {
    if (typeof translated.title === "string" && translated.title.trim()) {
      out.name = translated.title;
      out.title = translated.title;
    }
    if (typeof translated.shortDescription === "string") out.shortDesc = translated.shortDescription;
    if (typeof translated.description === "string") out.description = translated.description;
    if (Array.isArray(translated.specs)) out.specs = translated.specs.map((x) => String(x || ""));
  } else if (entityType === "categories") {
    if (typeof translated.title === "string" && translated.title.trim()) {
      out.name = translated.title;
      out.title = translated.title;
    }
    if (typeof translated.shortDescription === "string") out.shortDesc = translated.shortDescription;
    if (typeof translated.description === "string") out.description = translated.description;
  } else if (entityType === "partners") {
    if (typeof translated.description === "string") out.description = translated.description;
    if (typeof translated.equipment === "string") out.equipment = translated.equipment;
    if (typeof translated.country === "string") out.country = translated.country;
    if (typeof translated.contactInfo === "string") out.contactInfo = translated.contactInfo;
  } else if (entityType === "news") {
    if (typeof translated.title === "string" && translated.title.trim()) out.title = translated.title;
    if (typeof translated.shortDescription === "string") {
      out.shortDescription = translated.shortDescription;
      out.excerpt = translated.shortDescription;
    }
    if (typeof translated.description === "string") out.description = translated.description;
    if (typeof translated.content === "string") {
      out.content = translated.content;
      out.contentHtml = translated.content;
    }
    if (Array.isArray(translated.contentBlocks)) out.contentBlocks = translated.contentBlocks;
  } else if (entityType === "pages") {
    if (typeof translated.title === "string" && translated.title.trim()) out.title = translated.title;
    if (typeof translated.shortDescription === "string") {
      out.shortDescription = translated.shortDescription;
      out.excerpt = translated.shortDescription;
    }
    if (typeof translated.description === "string") out.description = translated.description;
    if (typeof translated.content === "string") {
      out.content = translated.content;
      out.contentHtml = translated.content;
    }
    if (Array.isArray(translated.contentBlocks)) out.contentBlocks = translated.contentBlocks;
  }
  if (translated.seo && typeof translated.seo === "object") {
    if (typeof translated.seo.metaTitle === "string") seo.metaTitle = translated.seo.metaTitle;
    if (typeof translated.seo.metaDescription === "string") seo.metaDescription = translated.seo.metaDescription;
    if (typeof translated.seo.keywords === "string") seo.keywords = translated.seo.keywords;
    out.seo = seo;
  }
  return out;
}

function translationLooksEmpty(entityType, translated, sourceFields) {
  const src = sourceFields || {};
  const tr = translated || {};
  const mustTitle = String(src.title || "").trim().length > 0;
  if (mustTitle && !String(tr.title || "").trim()) return true;
  if (entityType === "news" || entityType === "pages") {
    const hadBody =
      String(src.content || "").trim().length > 0
      || (Array.isArray(src.contentBlocks) && src.contentBlocks.length > 0);
    const gotBody =
      String(tr.content || "").trim().length > 0
      || (Array.isArray(tr.contentBlocks) && tr.contentBlocks.length > 0);
    if (hadBody && !gotBody) return true;
  }
  if (entityType === "products" || entityType === "categories") {
    const hadDesc = String(src.description || "").trim().length > 0;
    if (hadDesc && !String(tr.description || "").trim()) return true;
  }
  return false;
}

function sanitizeTranslatedResult(entityType, translated, sourceFields) {
  const src = sourceFields || {};
  const result = translated && typeof translated === "object" ? translated : {};
  if (entityType === "products") {
    return {
      title: typeof result.title === "string" ? result.title : "",
      shortDescription: typeof result.shortDescription === "string" ? result.shortDescription : "",
      description: typeof result.description === "string" ? result.description : "",
      specs: Array.isArray(result.specs) ? result.specs.map((x) => String(x || "")) : (src.specs || []),
      seo: {
        metaTitle: String(result?.seo?.metaTitle || ""),
        metaDescription: String(result?.seo?.metaDescription || ""),
        keywords: String(result?.seo?.keywords || ""),
      },
    };
  }
  if (entityType === "categories") {
    return {
      title: typeof result.title === "string" ? result.title : "",
      shortDescription: typeof result.shortDescription === "string" ? result.shortDescription : "",
      description: typeof result.description === "string" ? result.description : "",
      seo: {
        metaTitle: String(result?.seo?.metaTitle || ""),
        metaDescription: String(result?.seo?.metaDescription || ""),
        keywords: String(result?.seo?.keywords || ""),
      },
    };
  }
  if (entityType === "partners") {
    return {
      title: "",
      description: typeof result.description === "string" ? result.description : "",
      equipment: typeof result.equipment === "string" ? result.equipment : "",
      country: typeof result.country === "string" ? result.country : "",
      contactInfo: typeof result.contactInfo === "string" ? result.contactInfo : "",
      seo: {
        metaTitle: String(result?.seo?.metaTitle || ""),
        metaDescription: String(result?.seo?.metaDescription || ""),
        keywords: String(result?.seo?.keywords || ""),
      },
    };
  }
  if (entityType === "news") {
    return {
      title: typeof result.title === "string" ? result.title : "",
      shortDescription: typeof result.shortDescription === "string" ? result.shortDescription : "",
      description: typeof result.description === "string" ? result.description : "",
      content: typeof result.content === "string"
        ? normalizeHtmlString(result.content)
        : normalizeHtmlString(src.content),
      contentBlocks: Array.isArray(result.contentBlocks)
        ? normalizeContentBlocksForTranslation(result.contentBlocks)
        : normalizeContentBlocksForTranslation(src.contentBlocks),
      seo: {
        metaTitle: String(result?.seo?.metaTitle || ""),
        metaDescription: String(result?.seo?.metaDescription || ""),
        keywords: String(result?.seo?.keywords || ""),
      },
    };
  }
  if (entityType === "pages") {
    return {
      title: typeof result.title === "string" ? result.title : "",
      shortDescription: typeof result.shortDescription === "string" ? result.shortDescription : "",
      description: typeof result.description === "string" ? result.description : "",
      content: typeof result.content === "string"
        ? normalizeHtmlString(result.content)
        : normalizeHtmlString(src.content),
      contentBlocks: Array.isArray(result.contentBlocks)
        ? normalizeContentBlocksForTranslation(result.contentBlocks)
        : normalizeContentBlocksForTranslation(src.contentBlocks),
      seo: {
        metaTitle: String(result?.seo?.metaTitle || ""),
        metaDescription: String(result?.seo?.metaDescription || ""),
        keywords: String(result?.seo?.keywords || ""),
      },
    };
  }
  return {};
}

function createMultilingualService({ db, provider, logger = console, entityTypes = [] }) {
  const sourceLanguage = normalizeLanguageCode(process.env.SOURCE_LANGUAGE || process.env.PRODUCT_SOURCE_LANGUAGE || "ru");
  const targetLanguages = parseLanguageList(process.env.TARGET_LANGUAGES || process.env.PRODUCT_TARGET_LANGUAGES, "en,kk")
    .filter((lang) => lang !== sourceLanguage);
  const supportedLanguages = [sourceLanguage, ...targetLanguages];
  const queueState = { chain: Promise.resolve() };
  const enabledEntityTypes = new Set((entityTypes || []).map((type) => String(type)));
  const autoGenerateUi = String(process.env.UI_TRANSLATION_AUTO_GENERATE || "0") === "1";

  function enqueue(task) {
    queueState.chain = queueState.chain.then(task).catch((error) => {
      logger.error("[ml] queue task failed:", error);
    });
  }

  async function flushQueue() {
    await queueState.chain;
  }

  function computeSourceHash(entityType, entity) {
    const fields = extractTranslatableFields(entityType, entity);
    return toHash(stableStringify(fields));
  }

  function mapTranslationStatus(status) {
    const s = String(status || "");
    if (s === "completed") return "done";
    return s;
  }

  async function listEntityTranslationStatuses(entityType, entityId) {
    const rows = await db.all(
      `SELECT entity_type, entity_id, language_code, source_hash, source_version, source_language,
              status, machine_translated, is_manual_override, provider, provider_meta_json,
              error_message, attempts, prompt_version, updated_at, requested_at, completed_at,
              COALESCE(needs_review, 1) AS needs_review
         FROM entity_translations
        WHERE entity_type = ? AND entity_id = ?
        ORDER BY language_code ASC`,
      entityType,
      entityId
    );
    return rows.map((row) => ({
      entityType: row.entity_type,
      entityId: row.entity_id,
      language: row.language_code,
      sourceHash: row.source_hash,
      sourceVersion: Number(row.source_version || 1),
      sourceLanguage: row.source_language,
      status: row.status,
      translationStatus: mapTranslationStatus(row.status),
      machineTranslated: Boolean(row.machine_translated),
      translatedByAi: Boolean(row.machine_translated),
      needsReview: Boolean(row.needs_review),
      manualOverride: Boolean(row.is_manual_override),
      provider: row.provider || "",
      providerMeta: parseJson(row.provider_meta_json, {}),
      errorMessage: row.error_message || "",
      attempts: Number(row.attempts || 0),
      promptVersion: row.prompt_version || "",
      updatedAt: row.updated_at || "",
      requestedAt: row.requested_at || "",
      completedAt: row.completed_at || "",
    }));
  }

  function shouldRetranslate(existingRow, sourceHash, force) {
    if (force) return true;
    if (!existingRow) return true;
    if (Boolean(existingRow.is_manual_override)) return false;
    if (String(existingRow.status || "") === "processing") return false;
    if (String(existingRow.status || "") === "stale") return true;
    if (String(existingRow.status || "") !== "completed") return true;
    return String(existingRow.source_hash || "") !== sourceHash;
  }

  async function writeAudit(action, payload, changedBy = "system") {
    await db.run(
      "INSERT INTO audit_log(id, entity_type, entity_id, action, payload_json, changed_by, changed_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      toId("log"),
      String(payload.entityType || "multilingual"),
      String(payload.entityId || "system"),
      action,
      JSON.stringify(payload || {}),
      changedBy,
      nowIso()
    );
  }

  async function markEntityTranslationsStale(entityType, entityId, sourceHash, changedBy = "system") {
    const now = nowIso();
    await db.run(
      `UPDATE entity_translations
          SET status = CASE WHEN status = 'completed' THEN 'stale' ELSE status END,
              updated_at = ?
        WHERE entity_type = ? AND entity_id = ? AND source_hash <> ? AND is_manual_override = 0`,
      now,
      entityType,
      entityId,
      sourceHash
    );
    await writeAudit("translation-stale-marked", { entityType, entityId, sourceHash }, changedBy);
  }

  async function setEntityTranslationPending(entityType, entityId, lang, sourceHash, changedBy = "system") {
    const prev = await db.get(
      `SELECT source_version
         FROM entity_translations
        WHERE entity_type = ? AND entity_id = ? AND language_code = ?`,
      entityType,
      entityId,
      lang
    );
    const sourceVersion = Number(prev?.source_version || 0) + 1;
    const now = nowIso();
    await db.run(
      `INSERT INTO entity_translations
       (id, entity_type, entity_id, language_code, source_language, source_hash, source_version,
        status, translated_payload_json, machine_translated, is_manual_override, provider,
        provider_meta_json, error_message, attempts, prompt_version, created_at, updated_at, requested_at, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', '{}', 1, 0, ?, '{}', '', 0, ?, ?, ?, ?, NULL)
       ON CONFLICT(entity_type, entity_id, language_code) DO UPDATE SET
        source_language = excluded.source_language,
        source_hash = excluded.source_hash,
        source_version = excluded.source_version,
        status = 'pending',
        provider = excluded.provider,
        provider_meta_json = '{}',
        error_message = '',
        updated_at = excluded.updated_at,
        requested_at = excluded.requested_at`,
      toId("etr"),
      entityType,
      entityId,
      lang,
      sourceLanguage,
      sourceHash,
      sourceVersion,
      String(process.env.AI_TRANSLATION_PROVIDER || "openai"),
      MULTILINGUAL_PROMPT_VERSION,
      now,
      now,
      now
    );
    await writeAudit("translation-pending", { entityType, entityId, language: lang, sourceHash }, changedBy);
  }

  async function updateEntityTranslationStatus(entityType, entityId, lang, updates) {
    const now = nowIso();
    const status = String(updates.status || "pending");
    const payloadJson = JSON.stringify(updates.translatedPayload || {});
    const providerMeta = JSON.stringify(updates.providerMeta || {});
    const errorMessage = String(updates.errorMessage || "").slice(0, 2000);
    const aiNeedsReview = status === "completed" || status === "failed" ? 1 : null;
    await db.run(
      `UPDATE entity_translations
          SET status = ?,
              translated_payload_json = CASE WHEN ? = 1 THEN ? ELSE translated_payload_json END,
              provider_meta_json = ?,
              error_message = ?,
              attempts = attempts + 1,
              prompt_version = ?,
              updated_at = ?,
              completed_at = CASE WHEN ? = 'completed' THEN ? ELSE completed_at END,
              needs_review = CASE
                WHEN ? IS NOT NULL THEN ?
                ELSE needs_review
              END
        WHERE entity_type = ? AND entity_id = ? AND language_code = ?`,
      status,
      updates.translatedPayload ? 1 : 0,
      payloadJson,
      providerMeta,
      errorMessage,
      MULTILINGUAL_PROMPT_VERSION,
      now,
      status,
      now,
      aiNeedsReview,
      aiNeedsReview,
      entityType,
      entityId,
      lang
    );
  }

  async function getTranslationRow(entityType, entityId, lang) {
    return db.get(
      `SELECT *
         FROM entity_translations
        WHERE entity_type = ? AND entity_id = ? AND language_code = ?`,
      entityType,
      entityId,
      lang
    );
  }

  async function getEntityMapByType(entityType) {
    const rows = await db.all(
      "SELECT id, payload_json FROM content_entities WHERE entity_type = ? AND status = 'published'",
      entityType
    );
    const map = new Map();
    rows.forEach((row) => {
      map.set(row.id, parseJson(row.payload_json, {}));
    });
    return map;
  }

  async function localizeEntity(entityType, entity, lang) {
    const normalized = normalizeLanguageCode(lang || sourceLanguage);
    if (!entity || normalized === sourceLanguage) return entity;
    const row = await getTranslationRow(entityType, entity.id, normalized);
    if (!row || row.status !== "completed") return entity;
    const translated = parseJson(row.translated_payload_json, {});
    return mergeLocalizedFields(entityType, entity, translated);
  }

  async function localizeEntityList(entityType, entities, lang) {
    const normalized = normalizeLanguageCode(lang || sourceLanguage);
    if (normalized === sourceLanguage || !Array.isArray(entities) || !entities.length) return entities;
    const ids = entities.map((entry) => entry.id);
    const placeholders = ids.map(() => "?").join(",");
    const rows = await db.all(
      `SELECT entity_id, translated_payload_json
         FROM entity_translations
        WHERE entity_type = ?
          AND language_code = ?
          AND status = 'completed'
          AND entity_id IN (${placeholders})`,
      entityType,
      normalized,
      ...ids
    );
    const map = new Map(rows.map((row) => [row.entity_id, parseJson(row.translated_payload_json, {})]));
    return entities.map((entity) => {
      const translated = map.get(entity.id);
      if (!translated) return entity;
      return mergeLocalizedFields(entityType, entity, translated);
    });
  }

  async function collectSlugAliases(entityType, entityId) {
    const rows = await db.all(
      "SELECT old_slug FROM slug_aliases WHERE entity_type = ? AND entity_id = ? ORDER BY created_at DESC LIMIT 20",
      entityType,
      entityId
    );
    return rows.map((row) => row.old_slug).filter(Boolean);
  }

  async function upsertSearchDocument(entityType, entity, localizedEntity, languageCode) {
    const aliases = await collectSlugAliases(entityType, entity.id);
    const partnerMap = entityType === "products" ? await getEntityMapByType("partners") : null;
    const categoryMap = entityType === "products" ? await getEntityMapByType("categories") : null;
    const codes = [];
    const terms = [];
    const seo = localizedEntity?.seo && typeof localizedEntity.seo === "object" ? localizedEntity.seo : {};

    if (entityType === "products") {
      const partner = partnerMap && categoryMap ? partnerMap.get(localizedEntity.partnerId) : null;
      const category = partnerMap && categoryMap ? categoryMap.get(localizedEntity.categoryId) : null;
      terms.push(
        localizedEntity.name,
        localizedEntity.shortDesc,
        localizedEntity.description,
        ...(Array.isArray(localizedEntity.specs) ? localizedEntity.specs : []),
        partner?.name || "",
        category?.name || ""
      );
      codes.push(
        localizedEntity.article,
        localizedEntity.sku,
        localizedEntity.model,
        localizedEntity.partnerId,
        localizedEntity.categoryId
      );
    } else if (entityType === "categories") {
      terms.push(localizedEntity.name, localizedEntity.shortDesc, localizedEntity.description);
    } else if (entityType === "partners") {
      terms.push(localizedEntity.name, localizedEntity.description, localizedEntity.equipment, localizedEntity.country);
      codes.push(localizedEntity.id);
    } else if (entityType === "news") {
      const blocks = Array.isArray(localizedEntity.contentBlocks) ? localizedEntity.contentBlocks : [];
      terms.push(
        localizedEntity.title,
        localizedEntity.shortDescription,
        localizedEntity.excerpt,
        localizedEntity.description,
        localizedEntity.content
      );
      blocks.forEach((block) => {
        if (!block || typeof block !== "object") return;
        if (typeof block.text === "string") terms.push(block.text);
        if (typeof block.caption === "string") terms.push(block.caption);
      });
    } else if (entityType === "pages") {
      const blocks = Array.isArray(localizedEntity.contentBlocks) ? localizedEntity.contentBlocks : [];
      terms.push(
        localizedEntity.title,
        localizedEntity.excerpt,
        localizedEntity.description,
        localizedEntity.content
      );
      blocks.forEach((block) => {
        if (!block || typeof block !== "object") return;
        if (typeof block.text === "string") terms.push(block.text);
        if (typeof block.caption === "string") terms.push(block.caption);
      });
    }
    terms.push(seo.metaTitle || seo.title || "", seo.metaDescription || seo.description || "", seo.keywords || "");
    terms.push(localizedEntity.slug || "", ...aliases);
    const tokens = tokenize([...terms, ...codes, ...aliases]);
    const searchPayload = {
      title: String(localizedEntity.name || localizedEntity.title || ""),
      description: String(localizedEntity.shortDesc || localizedEntity.excerpt || localizedEntity.description || ""),
      slug: String(localizedEntity.slug || ""),
      aliases,
      codes: codes.filter(Boolean).map((x) => String(x)),
    };
    const now = nowIso();
    await db.run(
      `INSERT INTO search_documents
       (id, entity_type, entity_id, language_code, title, description, slug, aliases_json, codes_json, tokens_blob, payload_json, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(entity_type, entity_id, language_code) DO UPDATE SET
         title = excluded.title,
         description = excluded.description,
         slug = excluded.slug,
         aliases_json = excluded.aliases_json,
         codes_json = excluded.codes_json,
         tokens_blob = excluded.tokens_blob,
         payload_json = excluded.payload_json,
         updated_at = excluded.updated_at`,
      toId("sdoc"),
      entityType,
      entity.id,
      languageCode,
      searchPayload.title,
      searchPayload.description,
      searchPayload.slug,
      JSON.stringify(searchPayload.aliases),
      JSON.stringify(searchPayload.codes),
      tokens.join(" "),
      JSON.stringify(searchPayload),
      now
    );
  }

  async function removeSearchDocuments(entityType, entityId) {
    await db.run(
      "DELETE FROM search_documents WHERE entity_type = ? AND entity_id = ?",
      entityType,
      entityId
    );
  }

  async function rebuildSearchDocumentsForEntity(entityType, entity) {
    if (!entity || !entity.id) return;
    if (String(entity.status || "") !== "published") {
      await removeSearchDocuments(entityType, entity.id);
      return;
    }
    await upsertSearchDocument(entityType, entity, entity, sourceLanguage);
    for (const lang of targetLanguages) {
      const localized = await localizeEntity(entityType, entity, lang);
      await upsertSearchDocument(entityType, entity, localized, lang);
    }
  }

  async function rebuildSearchIndex(options = {}) {
    const types = Array.isArray(options.entityTypes) && options.entityTypes.length
      ? options.entityTypes
      : [...enabledEntityTypes];
    for (const entityType of types) {
      await db.run("DELETE FROM search_documents WHERE entity_type = ?", entityType);
      const rows = await db.all(
        "SELECT payload_json FROM content_entities WHERE entity_type = ? AND status = 'published'",
        entityType
      );
      for (const row of rows) {
        const entity = parseJson(row.payload_json, {});
        if (!entity || !entity.id) continue;
        await rebuildSearchDocumentsForEntity(entityType, entity);
      }
    }
  }

  async function getSearchBlobMap(entityType, entityIds) {
    if (!Array.isArray(entityIds) || !entityIds.length) return new Map();
    const placeholders = entityIds.map(() => "?").join(",");
    const rows = await db.all(
      `SELECT entity_id, tokens_blob
         FROM search_documents
        WHERE entity_type = ? AND entity_id IN (${placeholders})`,
      entityType,
      ...entityIds
    );
    const map = new Map();
    rows.forEach((row) => {
      const prev = map.get(row.entity_id) || "";
      const next = `${prev} ${String(row.tokens_blob || "")}`.trim();
      map.set(row.entity_id, next);
    });
    return map;
  }

  async function runEntityTranslationTask(entityType, entity, lang, sourceHash, changedBy) {
    const sourceFields = extractTranslatableFields(entityType, entity);
    await updateEntityTranslationStatus(entityType, entity.id, lang, { status: "processing" });
    const prompt = buildEntityTranslationPrompt({
      entityType,
      sourceLanguage,
      targetLanguage: lang,
      canonicalBrandNames: [String(entity?.brand || ""), String(entity?.name || "")].filter(Boolean),
      content: sourceFields,
    });
    const maxAttempts = Math.max(1, Number.parseInt(process.env.AI_TRANSLATION_RETRIES || "2", 10));
    let lastError = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const raw = await provider.translateStructured({
          systemPrompt: prompt.system,
          userPrompt: prompt.user,
        });
        const translatedPayload = sanitizeTranslatedResult(entityType, raw, sourceFields);
        if (translationLooksEmpty(entityType, translatedPayload, sourceFields)) {
          throw new Error("AI returned empty or incomplete translation");
        }
        await updateEntityTranslationStatus(entityType, entity.id, lang, {
          status: "completed",
          translatedPayload,
          providerMeta: { sourceHash, promptVersion: prompt.version, attempt },
        });
        await writeAudit("translation-completed", {
          entityType,
          entityId: entity.id,
          language: lang,
          sourceHash,
          attempt,
        }, changedBy);
        await rebuildSearchDocumentsForEntity(entityType, entity);
        return;
      } catch (error) {
        lastError = error;
        const message = String(error?.message || error || "Translation failed");
        const canUseGoogleFreeFallback =
          /AI_TRANSLATION_API_KEY is not configured/i.test(message) ||
          /translation provider is disabled/i.test(message);
        if (canUseGoogleFreeFallback) {
          try {
            const fallbackTranslated = await translateValueWithGoogleFree(sourceFields, lang);
            const fallbackPayload = sanitizeTranslatedResult(entityType, fallbackTranslated, sourceFields);
            if (translationLooksEmpty(entityType, fallbackPayload, sourceFields)) {
              throw new Error("Google fallback produced empty translation");
            }
            await updateEntityTranslationStatus(entityType, entity.id, lang, {
              status: "completed",
              translatedPayload: fallbackPayload,
              providerMeta: { sourceHash, promptVersion: prompt.version, attempt, provider: "googlefree" },
            });
            await writeAudit("translation-completed", {
              entityType,
              entityId: entity.id,
              language: lang,
              sourceHash,
              attempt,
              provider: "googlefree",
            }, changedBy);
            await rebuildSearchDocumentsForEntity(entityType, entity);
            return;
          } catch (fallbackError) {
            logger.error(
              `[ml] googlefree fallback failed ${entityType}:${entity.id}:${lang}`,
              String(fallbackError?.message || fallbackError || "")
            );
          }
        }
        if (attempt < maxAttempts) {
          const backoffMs = 300 * attempt;
          await new Promise((resolve) => setTimeout(resolve, backoffMs));
          continue;
        }
        await updateEntityTranslationStatus(entityType, entity.id, lang, {
          status: "failed",
          errorMessage: message,
        });
        await writeAudit("translation-failed", {
          entityType,
          entityId: entity.id,
          language: lang,
          sourceHash,
          error: message,
        }, changedBy);
        logger.error(`[ml] translation failed ${entityType}:${entity.id}:${lang}`, message);
      }
    }
    if (lastError) throw lastError;
  }

  async function scheduleEntityTranslation(entityType, entity, options = {}) {
    if (!enabledEntityTypes.has(entityType)) return { scheduled: [] };
    if (!entity || !entity.id) return { scheduled: [] };
    const force = Boolean(options.force);
    const changedBy = String(options.changedBy || "system");
    const requestedLanguages = Array.isArray(options.languages) && options.languages.length
      ? options.languages.map((lang) => normalizeLanguageCode(lang)).filter(Boolean)
      : targetLanguages.slice();
    const langs = requestedLanguages.filter((lang) => lang !== sourceLanguage);
    if (!langs.length) return { scheduled: [] };
    const sourceHash = computeSourceHash(entityType, entity);
    await markEntityTranslationsStale(entityType, entity.id, sourceHash, changedBy);
    const existing = await db.all(
      "SELECT * FROM entity_translations WHERE entity_type = ? AND entity_id = ?",
      entityType,
      entity.id
    );
    const byLang = new Map(existing.map((row) => [row.language_code, row]));
    const scheduled = [];
    for (const lang of langs) {
      const prev = byLang.get(lang);
      if (!shouldRetranslate(prev, sourceHash, force)) continue;
      await setEntityTranslationPending(entityType, entity.id, lang, sourceHash, changedBy);
      scheduled.push(lang);
      enqueue(() => runEntityTranslationTask(entityType, entity, lang, sourceHash, changedBy));
    }
    return { scheduled, sourceHash };
  }

  async function registerUiDictionary(baseMap, changedBy = "system") {
    const entries = baseMap && typeof baseMap === "object" ? baseMap : {};
    const now = nowIso();
    const keys = Object.keys(entries);
    for (const key of keys) {
      const text = String(entries[key] || "").trim();
      if (!key || !text) continue;
      const sourceHash = toHash(text);
      await db.run(
        `INSERT INTO ui_dictionary_entries (translation_key, source_language, source_text, source_hash, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(translation_key) DO UPDATE SET
           source_language = excluded.source_language,
           source_text = excluded.source_text,
           source_hash = excluded.source_hash,
           updated_at = excluded.updated_at`,
        key,
        sourceLanguage,
        text,
        sourceHash,
        now,
        now
      );
    }
    await writeAudit("ui-dictionary-registered", { entityType: "ui", entityId: "dictionary", count: keys.length }, changedBy);
  }

  async function scheduleUiDictionaryTranslation(lang, options = {}) {
    const normalized = normalizeLanguageCode(lang);
    if (!normalized || normalized === sourceLanguage) return { scheduled: 0 };
    const changedBy = String(options.changedBy || "system");
    const rows = await db.all(
      "SELECT translation_key, source_text, source_hash FROM ui_dictionary_entries ORDER BY translation_key ASC"
    );
    if (!rows.length) return { scheduled: 0 };
    const existingRows = await db.all(
      "SELECT translation_key, source_hash, status, is_manual_override FROM ui_translations WHERE language_code = ?",
      normalized
    );
    const existingMap = new Map(existingRows.map((row) => [row.translation_key, row]));
    const pendingBatch = {};
    rows.forEach((row) => {
      const prev = existingMap.get(row.translation_key);
      if (prev && prev.is_manual_override) return;
      if (!options.force && prev && prev.status === "completed" && prev.source_hash === row.source_hash) return;
      pendingBatch[row.translation_key] = row.source_text;
    });
    const keys = Object.keys(pendingBatch);
    if (!keys.length) return { scheduled: 0 };
    const maxBatch = Number.parseInt(process.env.UI_TRANSLATION_BATCH_SIZE || "80", 10);
    const chunkSize = Number.isFinite(maxBatch) && maxBatch > 0 ? maxBatch : 80;
    for (let i = 0; i < keys.length; i += chunkSize) {
      const chunkKeys = keys.slice(i, i + chunkSize);
      const chunkEntries = {};
      chunkKeys.forEach((key) => {
        chunkEntries[key] = pendingBatch[key];
      });
      enqueue(async () => {
        const prompt = buildUiDictionaryPrompt({
          sourceLanguage,
          targetLanguage: normalized,
          entries: chunkEntries,
        });
        try {
          const translated = await provider.translateStructured({
            systemPrompt: prompt.system,
            userPrompt: prompt.user,
          });
          const now = nowIso();
          for (const key of chunkKeys) {
            const sourceText = String(chunkEntries[key] || "");
            const sourceHash = toHash(sourceText);
            const translatedText = String(translated?.[key] || "");
            await db.run(
              `INSERT INTO ui_translations
               (id, translation_key, language_code, source_hash, status, translated_text, machine_translated, is_manual_override,
                provider, provider_meta_json, error_message, attempts, prompt_version, created_at, updated_at)
               VALUES (?, ?, ?, ?, 'completed', ?, 1, 0, ?, '{}', '', 1, ?, ?, ?)
               ON CONFLICT(translation_key, language_code) DO UPDATE SET
                source_hash = excluded.source_hash,
                status = 'completed',
                translated_text = excluded.translated_text,
                machine_translated = 1,
                provider = excluded.provider,
                provider_meta_json = '{}',
                error_message = '',
                attempts = ui_translations.attempts + 1,
                prompt_version = excluded.prompt_version,
                updated_at = excluded.updated_at`,
              toId("uit"),
              key,
              normalized,
              sourceHash,
              translatedText,
              String(process.env.AI_TRANSLATION_PROVIDER || "openai"),
              MULTILINGUAL_PROMPT_VERSION,
              now,
              now
            );
          }
          await writeAudit("ui-translation-completed", {
            entityType: "ui",
            entityId: normalized,
            count: chunkKeys.length,
          }, changedBy);
        } catch (error) {
          let message = String(error?.message || error || "UI translation failed").slice(0, 2000);
          const canUseGoogleFreeFallback =
            /AI_TRANSLATION_API_KEY is not configured/i.test(message) ||
            /translation provider is disabled/i.test(message);
          if (canUseGoogleFreeFallback) {
            try {
              const now = nowIso();
              for (const key of chunkKeys) {
                const sourceText = String(chunkEntries[key] || "");
                const sourceHash = toHash(sourceText);
                const translatedText = await translateTextWithGoogleFree(sourceText, normalized);
                await db.run(
                  `INSERT INTO ui_translations
                   (id, translation_key, language_code, source_hash, status, translated_text, machine_translated, is_manual_override,
                    provider, provider_meta_json, error_message, attempts, prompt_version, created_at, updated_at)
                   VALUES (?, ?, ?, ?, 'completed', ?, 1, 0, ?, '{}', '', 1, ?, ?, ?)
                   ON CONFLICT(translation_key, language_code) DO UPDATE SET
                    source_hash = excluded.source_hash,
                    status = 'completed',
                    translated_text = excluded.translated_text,
                    machine_translated = 1,
                    provider = excluded.provider,
                    provider_meta_json = '{}',
                    error_message = '',
                    attempts = ui_translations.attempts + 1,
                    prompt_version = excluded.prompt_version,
                    updated_at = excluded.updated_at`,
                  toId("uit"),
                  key,
                  normalized,
                  sourceHash,
                  translatedText,
                  "googlefree",
                  MULTILINGUAL_PROMPT_VERSION,
                  now,
                  now
                );
              }
              await writeAudit("ui-translation-completed", {
                entityType: "ui",
                entityId: normalized,
                count: chunkKeys.length,
                provider: "googlefree",
              }, changedBy);
              return;
            } catch (fallbackError) {
              message = `${message}; googlefree fallback: ${String(
                fallbackError?.message || fallbackError || "failed"
              )}`.slice(0, 2000);
            }
          }
          const now = nowIso();
          for (const key of chunkKeys) {
            const sourceHash = toHash(String(chunkEntries[key] || ""));
            await db.run(
              `INSERT INTO ui_translations
               (id, translation_key, language_code, source_hash, status, translated_text, machine_translated, is_manual_override,
                provider, provider_meta_json, error_message, attempts, prompt_version, created_at, updated_at)
               VALUES (?, ?, ?, ?, 'failed', '', 1, 0, ?, '{}', ?, 1, ?, ?, ?)
               ON CONFLICT(translation_key, language_code) DO UPDATE SET
                source_hash = excluded.source_hash,
                status = 'failed',
                error_message = excluded.error_message,
                attempts = ui_translations.attempts + 1,
                updated_at = excluded.updated_at`,
              toId("uit"),
              key,
              normalized,
              sourceHash,
              String(process.env.AI_TRANSLATION_PROVIDER || "openai"),
              message,
              MULTILINGUAL_PROMPT_VERSION,
              now,
              now
            );
          }
          await writeAudit("ui-translation-failed", {
            entityType: "ui",
            entityId: normalized,
            count: chunkKeys.length,
            error: message,
          }, changedBy);
        }
      });
    }
    return { scheduled: keys.length };
  }

  async function getUiDictionary(lang, fallback = {}, existing = {}) {
    const normalized = normalizeLanguageCode(lang || sourceLanguage);
    if (normalized === sourceLanguage) return { ...(fallback || {}) };
    const rows = await db.all(
      `SELECT translation_key, translated_text
         FROM ui_translations
        WHERE language_code = ? AND status = 'completed'`,
      normalized
    );
    const out = { ...(existing || {}), ...(fallback || {}) };
    rows.forEach((row) => {
      if (row.translation_key && row.translated_text) out[row.translation_key] = row.translated_text;
    });
    if (autoGenerateUi) {
      scheduleUiDictionaryTranslation(normalized).catch((error) => {
        logger.warn("[ml] auto-generate ui dictionary failed:", error.message);
      });
    }
    return out;
  }

  async function onEntityUpsert(entityType, entity, changedBy = "system") {
    if (!enabledEntityTypes.has(entityType) || !entity || !entity.id) return;
    await rebuildSearchDocumentsForEntity(entityType, entity);
    await scheduleEntityTranslation(entityType, entity, { changedBy });
  }

  async function onEntityDelete(entityType, entityId) {
    await db.run("DELETE FROM entity_translations WHERE entity_type = ? AND entity_id = ?", entityType, entityId);
    await removeSearchDocuments(entityType, entityId);
  }

  async function search(query, options = {}) {
    const q = String(query || "").trim();
    if (!q) return [];
    const normalizedLang = normalizeLanguageCode(options.lang || sourceLanguage);
    const includeAllLanguages = options.includeAllLanguages !== false;
    const typeList = Array.isArray(options.entityTypes) && options.entityTypes.length
      ? options.entityTypes.map((type) => String(type))
      : [...enabledEntityTypes];
    const limit = Math.min(100, Math.max(1, Number.parseInt(options.limit || "40", 10)));
    const tokens = tokenize([q]);
    const where = [];
    const params = [];
    if (typeList.length) {
      where.push(`entity_type IN (${typeList.map(() => "?").join(",")})`);
      params.push(...typeList);
    }
    if (includeAllLanguages) {
      where.push("1 = 1");
    } else {
      where.push("language_code = ?");
      params.push(normalizedLang);
    }
    if (tokens.length) {
      where.push(`(${tokens.map(() => "tokens_blob LIKE ?").join(" OR ")})`);
      tokens.forEach((token) => params.push(`%${token}%`));
    }
    const rows = await db.all(
      `SELECT entity_type, entity_id, language_code, title, description, slug, codes_json, aliases_json, tokens_blob
         FROM search_documents
        WHERE ${where.join(" AND ")}
        LIMIT ?`,
      ...params,
      Math.max(limit * 4, 120)
    );
    const ranked = rows.map((row) => {
      const haystack = String(row.tokens_blob || "");
      let score = 0;
      const qNorm = normalizeForSearch(q);
      if (normalizeForSearch(row.title || "").includes(qNorm)) score += 20;
      if (normalizeForSearch(row.description || "").includes(qNorm)) score += 8;
      tokens.forEach((token) => {
        if (haystack.includes(token)) score += 5;
      });
      const codes = parseJson(row.codes_json, []).map((x) => String(x || "").toLowerCase());
      if (codes.includes(qNorm)) score += 40;
      if (row.language_code === normalizedLang) score += 2;
      return {
        entityType: row.entity_type,
        entityId: row.entity_id,
        language: row.language_code,
        title: row.title || "",
        description: row.description || "",
        slug: row.slug || "",
        score,
        codes: parseJson(row.codes_json, []),
        aliases: parseJson(row.aliases_json, []),
      };
    })
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score);
    const dedup = new Map();
    ranked.forEach((row) => {
      const key = `${row.entityType}:${row.entityId}`;
      if (!dedup.has(key)) dedup.set(key, row);
    });
    return [...dedup.values()].slice(0, limit);
  }

  return {
    sourceLanguage,
    targetLanguages,
    supportedLanguages,
    normalizeLanguageCode,
    extractTranslatableFields,
    computeSourceHash,
    shouldRetranslate,
    markEntityTranslationsStale,
    scheduleEntityTranslation,
    listEntityTranslationStatuses,
    localizeEntity,
    localizeEntityList,
    mergeLocalizedFields,
    registerUiDictionary,
    scheduleUiDictionaryTranslation,
    flushQueue,
    getUiDictionary,
    rebuildSearchIndex,
    rebuildSearchDocumentsForEntity,
    getSearchBlobMap,
    search,
    onEntityUpsert,
    onEntityDelete,
  };
}

module.exports = {
  createMultilingualService,
  normalizeLanguageCode,
};
