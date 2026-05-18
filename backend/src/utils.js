const crypto = require("crypto");

function nowIso() {
  return new Date().toISOString();
}

function toId(prefix) {
  const rnd = crypto.randomBytes(6).toString("hex");
  return `${prefix}-${Date.now()}-${rnd}`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё\s_-]+/gi, "")
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toInt(value, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toNumber(value, fallback = null) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function parseJson(text, fallback) {
  try {
    return JSON.parse(text);
  } catch (_e) {
    return fallback;
  }
}

function ensureSeo(raw = {}, fallbackTitle = "", fallbackDescription = "", fallbackSlug = "") {
  const seo = raw && typeof raw === "object" ? { ...raw } : {};
  const slug = String(seo.slug || fallbackSlug || "").trim();
  return {
    title: String(seo.title || seo.metaTitle || fallbackTitle || "").trim(),
    description: String(seo.description || seo.metaDescription || fallbackDescription || "").trim(),
    keywords: String(seo.keywords || "").trim(),
    canonical: String(seo.canonical || "").trim(),
    robots: String(seo.robots || "").trim(),
    ogImage: String(seo.ogImage || "").trim(),
    slug,
    metaTitle: String(seo.metaTitle || seo.title || fallbackTitle || "").trim(),
    metaDescription: String(seo.metaDescription || seo.description || fallbackDescription || "").trim(),
  };
}

module.exports = {
  nowIso,
  toId,
  slugify,
  toInt,
  toNumber,
  asArray,
  parseJson,
  ensureSeo,
};
