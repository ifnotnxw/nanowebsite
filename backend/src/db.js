const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { DATA_DIR, DB_PATH } = require("./constants");
const { ensureSeo, nowIso, parseJson, slugify, toId } = require("./utils");

async function createDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let db;
  try {
    db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.error("[db] failed to open file DB, fallback to in-memory:", error.message);
    db = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });
  }
  await db.exec("PRAGMA foreign_keys = ON;");
  await db.exec("PRAGMA journal_mode = WAL;");
  return db;
}

async function applySchema(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS content_entities (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      slug TEXT NOT NULL,
      status TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      seo_title TEXT NOT NULL DEFAULT '',
      seo_description TEXT NOT NULL DEFAULT '',
      seo_keywords TEXT NOT NULL DEFAULT '',
      seo_canonical TEXT NOT NULL DEFAULT '',
      seo_robots TEXT NOT NULL DEFAULT '',
      seo_og_image TEXT NOT NULL DEFAULT '',
      payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by TEXT NOT NULL DEFAULT 'system',
      UNIQUE(entity_type, slug)
    );
    CREATE INDEX IF NOT EXISTS idx_content_entity_type_status ON content_entities(entity_type, status);
    CREATE INDEX IF NOT EXISTS idx_content_sort ON content_entities(entity_type, sort_order, updated_at DESC);

    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL UNIQUE,
      bucket TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL DEFAULT 0,
      alt_text TEXT NOT NULL DEFAULT '',
      caption TEXT NOT NULL DEFAULT '',
      owner_type TEXT NOT NULL DEFAULT '',
      owner_id TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by TEXT NOT NULL DEFAULT 'system'
    );

    CREATE TABLE IF NOT EXISTS requests (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      request_type TEXT NOT NULL DEFAULT '',
      name TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      items TEXT NOT NULL DEFAULT '',
      cart_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS site_metrics (
      id TEXT PRIMARY KEY,
      metric_date TEXT NOT NULL,
      visits_day INTEGER NOT NULL DEFAULT 0,
      visits_week INTEGER NOT NULL DEFAULT 0,
      visits_month INTEGER NOT NULL DEFAULT 0,
      popular_pages_json TEXT NOT NULL DEFAULT '[]',
      popular_products_json TEXT NOT NULL DEFAULT '[]',
      traffic_sources_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS slug_aliases (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      old_slug TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(entity_type, old_slug)
    );

    CREATE TABLE IF NOT EXISTS audit_log (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      action TEXT NOT NULL,
      payload_json TEXT NOT NULL DEFAULT '{}',
      changed_by TEXT NOT NULL DEFAULT 'system',
      changed_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_translations (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      language_code TEXT NOT NULL,
      source_hash TEXT NOT NULL,
      source_language TEXT NOT NULL DEFAULT 'ru',
      status TEXT NOT NULL DEFAULT 'pending',
      provider TEXT NOT NULL DEFAULT 'openai',
      translated_payload_json TEXT NOT NULL DEFAULT '{}',
      error_message TEXT NOT NULL DEFAULT '',
      attempts INTEGER NOT NULL DEFAULT 0,
      prompt_version TEXT NOT NULL DEFAULT 'v1',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      requested_at TEXT,
      completed_at TEXT,
      UNIQUE(product_id, language_code),
      FOREIGN KEY(product_id) REFERENCES content_entities(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_product_translations_product
      ON product_translations(product_id);
    CREATE INDEX IF NOT EXISTS idx_product_translations_lang_status
      ON product_translations(language_code, status);

    CREATE TABLE IF NOT EXISTS entity_translations (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      language_code TEXT NOT NULL,
      source_language TEXT NOT NULL DEFAULT 'ru',
      source_hash TEXT NOT NULL,
      source_version INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'pending',
      translated_payload_json TEXT NOT NULL DEFAULT '{}',
      machine_translated INTEGER NOT NULL DEFAULT 1,
      is_manual_override INTEGER NOT NULL DEFAULT 0,
      provider TEXT NOT NULL DEFAULT 'openai',
      provider_meta_json TEXT NOT NULL DEFAULT '{}',
      error_message TEXT NOT NULL DEFAULT '',
      attempts INTEGER NOT NULL DEFAULT 0,
      prompt_version TEXT NOT NULL DEFAULT 'ml-v1',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      requested_at TEXT,
      completed_at TEXT,
      UNIQUE(entity_type, entity_id, language_code)
    );
    CREATE INDEX IF NOT EXISTS idx_entity_translations_entity
      ON entity_translations(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS idx_entity_translations_lang_status
      ON entity_translations(language_code, status);

    CREATE TABLE IF NOT EXISTS ui_dictionary_entries (
      translation_key TEXT PRIMARY KEY,
      source_language TEXT NOT NULL DEFAULT 'ru',
      source_text TEXT NOT NULL,
      source_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ui_translations (
      id TEXT PRIMARY KEY,
      translation_key TEXT NOT NULL,
      language_code TEXT NOT NULL,
      source_hash TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      translated_text TEXT NOT NULL DEFAULT '',
      machine_translated INTEGER NOT NULL DEFAULT 1,
      is_manual_override INTEGER NOT NULL DEFAULT 0,
      provider TEXT NOT NULL DEFAULT 'openai',
      provider_meta_json TEXT NOT NULL DEFAULT '{}',
      error_message TEXT NOT NULL DEFAULT '',
      attempts INTEGER NOT NULL DEFAULT 0,
      prompt_version TEXT NOT NULL DEFAULT 'ml-v1',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(translation_key, language_code)
    );
    CREATE INDEX IF NOT EXISTS idx_ui_translations_lang_status
      ON ui_translations(language_code, status);

    CREATE TABLE IF NOT EXISTS search_documents (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      language_code TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      slug TEXT NOT NULL DEFAULT '',
      aliases_json TEXT NOT NULL DEFAULT '[]',
      codes_json TEXT NOT NULL DEFAULT '[]',
      tokens_blob TEXT NOT NULL DEFAULT '',
      payload_json TEXT NOT NULL DEFAULT '{}',
      updated_at TEXT NOT NULL,
      UNIQUE(entity_type, entity_id, language_code)
    );
    CREATE INDEX IF NOT EXISTS idx_search_documents_type_lang
      ON search_documents(entity_type, language_code);
  `);
}

function readSeedJson(name) {
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  return parseJson(fs.readFileSync(file, "utf8"), []);
}

function buildPartnersFallbackFromProducts(products) {
  const seen = new Set();
  const partners = [];
  products.forEach((p) => {
    const partnerId = String(p.partnerId || "").trim();
    if (!partnerId || seen.has(partnerId)) return;
    seen.add(partnerId);
    partners.push({
      id: partnerId,
      name: partnerId.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase()),
      country: "",
      equipment: "",
      years: null,
      description: "",
      logo: "",
      countProducts: 0,
      status: "published",
    });
  });
  return partners;
}

function normalizeEntityPayload(entityType, raw) {
  const item = raw && typeof raw === "object" ? { ...raw } : {};
  const id = String(item.id || toId(entityType.slice(0, 3))).trim();
  const baseTitle =
    entityType === "news" || entityType === "pages"
      ? String(item.title || "").trim()
      : String(item.name || item.title || "").trim();
  const fallbackSlug = slugify(
    String(item.slug || item.seo?.slug || item.id || baseTitle || id)
  );
  const seo = ensureSeo(item.seo, baseTitle, String(item.excerpt || item.shortDesc || ""), fallbackSlug);

  const publicationStatus = String(item.publicationStatus || item.status || "").toLowerCase();
  const hiddenFlag = Boolean(item.isHidden);
  const status = ["draft", "published", "hidden", "archived"].includes(publicationStatus)
    ? publicationStatus
    : hiddenFlag
      ? "hidden"
      : "published";

  const sortOrder = Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : 0;
  const featured = Boolean(item.featured || item.isFeatured || item.popular || item.isPopular);
  const now = nowIso();
  const payload = {
    ...item,
    id,
    slug: fallbackSlug,
    status,
    sortOrder,
    featured,
    seo: {
      ...seo,
      slug: fallbackSlug,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
    },
  };

  if (entityType === "products") {
    payload.priceType = payload.priceType || (payload.price == null ? "request" : "fixed");
    payload.availability = payload.availability || payload.status || "in_stock";
    payload.gallery = Array.isArray(payload.gallery)
      ? payload.gallery
      : Array.isArray(payload.images)
        ? payload.images
        : payload.image
          ? [payload.image]
          : [];
  }

  if (entityType === "news") {
    payload.type = ["news", "project", "site-update", "other"].includes(payload.type) ? payload.type : "news";
    payload.publicationDate = payload.publicationDate || payload.date || now.slice(0, 10);
    payload.contentBlocks = Array.isArray(payload.contentBlocks)
      ? payload.contentBlocks
      : Array.isArray(payload.content)
        ? payload.content.map((entry) => {
            if (typeof entry === "string") {
              return { id: toId("blk"), type: "paragraph", text: entry };
            }
            if (entry && typeof entry === "object" && entry.h2) {
              return { id: toId("blk"), type: "heading", text: String(entry.h2) };
            }
            return null;
          }).filter(Boolean)
        : [];
  }

  if (entityType === "pages") {
    payload.pageRole = String(payload.pageRole || payload.role || "content").slice(0, 64);
    payload.contentBlocks = Array.isArray(payload.contentBlocks)
      ? payload.contentBlocks
      : Array.isArray(payload.content)
        ? payload.content.map((entry) => {
            if (typeof entry === "string") {
              return { id: toId("blk"), type: "paragraph", text: entry };
            }
            if (entry && typeof entry === "object" && entry.h2) {
              return { id: toId("blk"), type: "heading", text: String(entry.h2) };
            }
            return null;
          }).filter(Boolean)
        : [];
    const html =
      typeof payload.contentHtml === "string"
        ? payload.contentHtml
        : typeof payload.bodyHtml === "string"
          ? payload.bodyHtml
          : "";
    if (html) payload.contentHtml = html;
  }

  return {
    id,
    entityType,
    slug: fallbackSlug,
    status,
    sortOrder,
    featured,
    title: baseTitle,
    excerpt: String(item.excerpt || item.shortDesc || item.description || "").slice(0, 900),
    seo,
    payload,
    createdAt: String(item.createdAt || now),
    updatedAt: String(item.updatedAt || now),
    updatedBy: String(item.updatedBy || "seed"),
  };
}

// Sync content from the seed JSON into the DB on every startup.
// Upsert by id: existing rows are updated and new ones inserted, but
// nothing is ever deleted — so runtime data in other tables (requests,
// translations, search index) stays untouched. This lets a plain folder
// upload + restart reflect edits to categories.json / products.json
// without having to drop the database by hand.
async function syncEntityType(db, entityType, items) {
  const now = nowIso();
  for (const rawItem of items) {
    const item = normalizeEntityPayload(entityType, rawItem);
    await db.run(
      `INSERT INTO content_entities
      (id, entity_type, slug, status, sort_order, featured, title, excerpt,
       seo_title, seo_description, seo_keywords, seo_canonical, seo_robots, seo_og_image,
       payload_json, created_at, updated_at, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         entity_type     = excluded.entity_type,
         slug            = excluded.slug,
         status          = excluded.status,
         sort_order      = excluded.sort_order,
         featured        = excluded.featured,
         title           = excluded.title,
         excerpt         = excluded.excerpt,
         seo_title       = excluded.seo_title,
         seo_description = excluded.seo_description,
         seo_keywords    = excluded.seo_keywords,
         seo_canonical   = excluded.seo_canonical,
         seo_robots      = excluded.seo_robots,
         seo_og_image    = excluded.seo_og_image,
         payload_json    = excluded.payload_json,
         updated_at      = excluded.updated_at,
         updated_by      = excluded.updated_by`,
      item.id,
      entityType,
      item.slug,
      item.status,
      item.sortOrder,
      item.featured ? 1 : 0,
      item.title,
      item.excerpt,
      item.seo.metaTitle || "",
      item.seo.metaDescription || "",
      item.seo.keywords || "",
      item.seo.canonical || "",
      item.seo.robots || "",
      item.seo.ogImage || "",
      JSON.stringify(item.payload),
      item.createdAt || now,
      item.updatedAt || now,
      item.updatedBy || "seed"
    );
  }
}


async function seedMetrics(db) {
  const row = await db.get("SELECT COUNT(*) as total FROM site_metrics");
  if (row && row.total > 0) return;
  await db.run(
    `INSERT INTO site_metrics
    (id, metric_date, visits_day, visits_week, visits_month, popular_pages_json, popular_products_json, traffic_sources_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    toId("met"),
    nowIso().slice(0, 10),
    0,
    0,
    0,
    JSON.stringify([]),
    JSON.stringify([]),
    JSON.stringify([]),
    nowIso()
  );
}

async function migrateDb(db) {
  const migrations = [
    "ALTER TABLE entity_translations ADD COLUMN needs_review INTEGER NOT NULL DEFAULT 1",
  ];
  for (const sql of migrations) {
    try {
      await db.exec(sql);
    } catch (error) {
      const msg = String(error && error.message ? error.message : error);
      if (!msg.includes("duplicate column")) {
        console.warn("[db] migrate:", msg);
      }
    }
  }
}

async function seedDatabase(db) {
  const categories = readSeedJson("categories");
  const products = readSeedJson("products");
  const news = readSeedJson("news");
  const rawPartners = readSeedJson("partners");
  const partners = rawPartners.length ? rawPartners : buildPartnersFallbackFromProducts(products);

  await syncEntityType(db, "categories", categories);
  await syncEntityType(db, "partners", partners);
  await syncEntityType(db, "products", products);
  await syncEntityType(db, "news", news);
  await seedMetrics(db);
}

async function initDb() {
  const db = await createDb();
  await applySchema(db);
  await migrateDb(db);
  await seedDatabase(db);
  return db;
}

module.exports = {
  initDb,
  normalizeEntityPayload,
};
