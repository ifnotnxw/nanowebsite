const { ADMIN_STATUSES, PUBLIC_ENTITY_TYPES } = require("./constants");
const { normalizeEntityPayload } = require("./db");
const { nowIso, parseJson, slugify, toId } = require("./utils");

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

async function writeAudit(db, { entityType, entityId, action, payload, changedBy }) {
  await db.run(
    "INSERT INTO audit_log(id, entity_type, entity_id, action, payload_json, changed_by, changed_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    toId("log"),
    entityType,
    entityId,
    action,
    JSON.stringify(payload || {}),
    changedBy || "system",
    nowIso()
  );
}

async function listEntities(db, entityType, options = {}) {
  assertEntityType(entityType);
  const page = Math.max(1, Number.parseInt(options.page || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(options.limit || "20", 10) || 20));
  const offset = (page - 1) * limit;
  const sortBy = ["sort_order", "updated_at", "title", "status"].includes(options.sortBy)
    ? options.sortBy
    : "sort_order";
  const sortDir = String(options.sortDir || "asc").toLowerCase() === "desc" ? "DESC" : "ASC";
  const q = String(options.q || "").trim().toLowerCase();
  const status = String(options.status || "").trim().toLowerCase();

  const where = ["entity_type = ?"];
  const params = [entityType];
  if (status && ADMIN_STATUSES.has(status)) {
    where.push("status = ?");
    params.push(status);
  }
  if (q) {
    where.push("(LOWER(title) LIKE ? OR LOWER(slug) LIKE ? OR LOWER(excerpt) LIKE ?)");
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  const whereSql = `WHERE ${where.join(" AND ")}`;
  const totalRow = await db.get(
    `SELECT COUNT(*) as total FROM content_entities ${whereSql}`,
    ...params
  );
  const rows = await db.all(
    `SELECT * FROM content_entities ${whereSql}
     ORDER BY ${sortBy} ${sortDir}, updated_at DESC
     LIMIT ? OFFSET ?`,
    ...params,
    limit,
    offset
  );
  return {
    items: rows.map(rowToEntity),
    total: totalRow ? totalRow.total : 0,
    page,
    limit,
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

async function ensureUniqueSlug(db, entityType, slug, excludeId = "") {
  const normalized = slugify(slug);
  if (!normalized) return "";
  const row = await db.get(
    "SELECT id FROM content_entities WHERE entity_type = ? AND slug = ?",
    entityType,
    normalized
  );
  if (!row) return normalized;
  if (excludeId && row.id === excludeId) return normalized;
  let counter = 2;
  let candidate = `${normalized}-${counter}`;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const dup = await db.get(
      "SELECT id FROM content_entities WHERE entity_type = ? AND slug = ?",
      entityType,
      candidate
    );
    if (!dup || (excludeId && dup.id === excludeId)) return candidate;
    counter += 1;
    candidate = `${normalized}-${counter}`;
  }
}

async function saveEntity(db, entityType, payloadInput, userLogin = "system", existingId = "") {
  assertEntityType(entityType);
  const normalized = normalizeEntityPayload(entityType, payloadInput);
  if (existingId) normalized.id = existingId;
  normalized.slug = await ensureUniqueSlug(db, entityType, normalized.slug, existingId || normalized.id);
  normalized.payload.slug = normalized.slug;
  normalized.payload.seo = normalized.payload.seo || {};
  normalized.payload.seo.slug = normalized.slug;

  const prev = existingId
    ? await db.get("SELECT slug, payload_json FROM content_entities WHERE entity_type = ? AND id = ?", entityType, existingId)
    : null;
  const updatedAt = nowIso();
  const createdAt = prev ? parseJson(prev.payload_json, {}).createdAt || updatedAt : updatedAt;

  await db.run(
    `INSERT INTO content_entities
    (id, entity_type, slug, status, sort_order, featured, title, excerpt,
     seo_title, seo_description, seo_keywords, seo_canonical, seo_robots, seo_og_image,
     payload_json, created_at, updated_at, updated_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
      slug=excluded.slug,
      status=excluded.status,
      sort_order=excluded.sort_order,
      featured=excluded.featured,
      title=excluded.title,
      excerpt=excluded.excerpt,
      seo_title=excluded.seo_title,
      seo_description=excluded.seo_description,
      seo_keywords=excluded.seo_keywords,
      seo_canonical=excluded.seo_canonical,
      seo_robots=excluded.seo_robots,
      seo_og_image=excluded.seo_og_image,
      payload_json=excluded.payload_json,
      updated_at=excluded.updated_at,
      updated_by=excluded.updated_by`,
    normalized.id,
    entityType,
    normalized.slug,
    normalized.status,
    normalized.sortOrder,
    normalized.featured ? 1 : 0,
    normalized.title,
    normalized.excerpt,
    normalized.seo.metaTitle || "",
    normalized.seo.metaDescription || "",
    normalized.seo.keywords || "",
    normalized.seo.canonical || "",
    normalized.seo.robots || "",
    normalized.seo.ogImage || "",
    JSON.stringify({
      ...normalized.payload,
      id: normalized.id,
      slug: normalized.slug,
      createdAt,
      updatedAt,
      updatedBy: userLogin,
    }),
    createdAt,
    updatedAt,
    userLogin
  );

  if (prev && prev.slug && prev.slug !== normalized.slug) {
    await db.run(
      "INSERT OR IGNORE INTO slug_aliases(id, entity_type, old_slug, entity_id, created_at) VALUES (?, ?, ?, ?, ?)",
      toId("sga"),
      entityType,
      prev.slug,
      normalized.id,
      nowIso()
    );
  }

  await writeAudit(db, {
    entityType,
    entityId: normalized.id,
    action: prev ? "update" : "create",
    payload: {
      slug: normalized.slug,
      status: normalized.status,
      sortOrder: normalized.sortOrder,
    },
    changedBy: userLogin,
  });
  return getEntityById(db, entityType, normalized.id);
}

async function deleteEntity(db, entityType, id, changedBy = "system") {
  assertEntityType(entityType);
  const existing = await db.get(
    "SELECT id, payload_json FROM content_entities WHERE entity_type = ? AND id = ?",
    entityType,
    id
  );
  if (!existing) return false;
  await db.run("DELETE FROM content_entities WHERE entity_type = ? AND id = ?", entityType, id);
  await writeAudit(db, {
    entityType,
    entityId: id,
    action: "delete",
    payload: parseJson(existing.payload_json, {}),
    changedBy,
  });
  return true;
}

async function replaceList(db, entityType, list, changedBy = "system") {
  assertEntityType(entityType);
  if (!Array.isArray(list)) {
    const error = new Error("Expected array");
    error.status = 400;
    throw error;
  }
  await db.exec("BEGIN");
  try {
    const existingRows = await db.all(
      "SELECT id FROM content_entities WHERE entity_type = ?",
      entityType
    );
    const keep = new Set();
    const savedItems = [];
    for (const item of list) {
      const saved = await saveEntity(db, entityType, item, changedBy, item.id ? String(item.id) : "");
      keep.add(saved.id);
      savedItems.push(saved);
    }
    const removedIds = [];
    for (const row of existingRows) {
      if (!keep.has(row.id)) {
        await deleteEntity(db, entityType, row.id, changedBy);
        removedIds.push(row.id);
      }
    }
    await db.exec("COMMIT");
    return { savedItems, removedIds };
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }
}

async function bulkAction(db, entityType, body, changedBy = "system") {
  assertEntityType(entityType);
  const action = String(body.action || "");
  const ids = Array.isArray(body.ids) ? body.ids.map((v) => String(v)) : [];
  if (!action || !ids.length) {
    const error = new Error("Invalid bulk payload");
    error.status = 400;
    throw error;
  }
  const placeholders = ids.map(() => "?").join(",");
  if (action === "delete") {
    await db.run(
      `DELETE FROM content_entities WHERE entity_type = ? AND id IN (${placeholders})`,
      entityType,
      ...ids
    );
    await writeAudit(db, {
      entityType,
      entityId: "bulk",
      action: "bulk-delete",
      payload: { ids },
      changedBy,
    });
    return { ok: true };
  }
  if (action === "publish" || action === "hide" || action === "archive" || action === "draft") {
    const statusMap = {
      publish: "published",
      hide: "hidden",
      archive: "archived",
      draft: "draft",
    };
    await db.run(
      `UPDATE content_entities
       SET status = ?, updated_at = ?, updated_by = ?
       WHERE entity_type = ? AND id IN (${placeholders})`,
      statusMap[action],
      nowIso(),
      changedBy,
      entityType,
      ...ids
    );
    await writeAudit(db, {
      entityType,
      entityId: "bulk",
      action: `bulk-${action}`,
      payload: { ids, status: statusMap[action] },
      changedBy,
    });
    return { ok: true };
  }
  if (action === "reassign-category" && entityType === "products") {
    const categoryId = String(body.categoryId || "");
    for (const id of ids) {
      const entity = await getEntityById(db, entityType, id);
      if (!entity) continue;
      entity.categoryId = categoryId;
      await saveEntity(db, entityType, entity, changedBy, id);
    }
    return { ok: true };
  }
  if (action === "reassign-partner" && entityType === "products") {
    const partnerId = String(body.partnerId || "");
    for (const id of ids) {
      const entity = await getEntityById(db, entityType, id);
      if (!entity) continue;
      entity.partnerId = partnerId;
      await saveEntity(db, entityType, entity, changedBy, id);
    }
    return { ok: true };
  }
  const error = new Error("Unsupported bulk action");
  error.status = 400;
  throw error;
}

async function slugCheck(db, entityType, slug, excludeId = "") {
  assertEntityType(entityType);
  const candidate = slugify(slug);
  if (!candidate) return { candidate: "", unique: false };
  const row = await db.get(
    "SELECT id FROM content_entities WHERE entity_type = ? AND slug = ?",
    entityType,
    candidate
  );
  const unique = !row || (excludeId && row.id === excludeId);
  return { candidate, unique };
}

async function getDashboardData(db) {
  const types = ["products", "partners", "news", "categories", "pages"];
  const totals = {};
  const statuses = { published: 0, draft: 0, hidden: 0, archived: 0 };
  for (const type of types) {
    const row = await db.get(
      "SELECT COUNT(*) as total FROM content_entities WHERE entity_type = ?",
      type
    );
    totals[type] = row ? row.total : 0;
    const statusRows = await db.all(
      "SELECT status, COUNT(*) as total FROM content_entities WHERE entity_type = ? GROUP BY status",
      type
    );
    statusRows.forEach((s) => {
      if (statuses[s.status] == null) statuses[s.status] = 0;
      statuses[s.status] += s.total;
    });
  }
  const latestChanges = await db.all(
    `SELECT * FROM audit_log ORDER BY changed_at DESC LIMIT 10`
  );
  const latestEntities = await db.all(
    `SELECT id, entity_type, title, status, updated_at
     FROM content_entities
     ORDER BY updated_at DESC
     LIMIT 12`
  );
  const metrics = await db.get(
    "SELECT * FROM site_metrics ORDER BY metric_date DESC LIMIT 1"
  );
  return {
    totals,
    statuses,
    latestChanges,
    latestEntities,
    metrics: metrics || {
      visits_day: 0,
      visits_week: 0,
      visits_month: 0,
      popular_pages_json: "[]",
      popular_products_json: "[]",
      traffic_sources_json: "[]",
    },
  };
}

module.exports = {
  listEntities,
  listPublicEntities,
  getEntityById,
  saveEntity,
  deleteEntity,
  replaceList,
  bulkAction,
  slugCheck,
  getDashboardData,
};
