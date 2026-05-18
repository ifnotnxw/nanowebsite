const { PUBLIC_ENTITY_TYPES } = require("./constants");
const { parseJson } = require("./utils");

const ENTITY_SET = new Set(PUBLIC_ENTITY_TYPES);

function assertEntityType(entityType) {
  if (!ENTITY_SET.has(entityType)) {
    const error = new Error("Unsupported entity type");
    error.status = 400;
    throw error;
  }
}

function rowToEntity(row) {
  const payload = parseJson(row.payload_json, {});
  const seo = {
    title: row.seo_title || "",
    description: row.seo_description || "",
    keywords: row.seo_keywords || "",
    canonical: row.seo_canonical || "",
    robots: row.seo_robots || "",
    ogImage: row.seo_og_image || "",
    slug: row.slug || "",
    metaTitle: row.seo_title || "",
    metaDescription: row.seo_description || "",
  };
  return {
    ...payload,
    id: row.id,
    slug: row.slug,
    status: row.status,
    publicationStatus: row.status,
    sortOrder: row.sort_order,
    featured: Boolean(row.featured),
    seo: {
      ...(payload.seo && typeof payload.seo === "object" ? payload.seo : {}),
      ...seo,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
}

async function listPublicEntities(db, entityType) {
  assertEntityType(entityType);
  const rows = await db.all(
    `SELECT * FROM content_entities
     WHERE entity_type = ? AND status = 'published'
     ORDER BY sort_order ASC, updated_at DESC`,
    entityType
  );
  return rows.map(rowToEntity);
}

async function getEntityById(db, entityType, id) {
  assertEntityType(entityType);
  const row = await db.get(
    "SELECT * FROM content_entities WHERE entity_type = ? AND id = ?",
    entityType,
    id
  );
  return row ? rowToEntity(row) : null;
}

module.exports = {
  listPublicEntities,
  getEntityById,
};
