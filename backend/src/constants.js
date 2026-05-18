const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const PROJECT_ROOT = path.join(ROOT_DIR, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");
const FRONTEND_DIR = path.join(PROJECT_ROOT, "frontend");
const DB_PATH = path.join(DATA_DIR, "nanofarm.sqlite");

const UPLOAD_DIRS = {
  products: path.join(FRONTEND_DIR, "uploads", "products"),
  docs: path.join(FRONTEND_DIR, "uploads", "docs"),
  partners: path.join(FRONTEND_DIR, "uploads", "partners"),
  news: path.join(FRONTEND_DIR, "uploads", "news"),
  media: path.join(FRONTEND_DIR, "uploads", "media"),
};

const PUBLIC_ENTITY_TYPES = ["categories", "partners", "products", "news", "pages"];
const PUBLIC_STATUSES = new Set(["published"]);
const ADMIN_STATUSES = new Set(["draft", "published", "hidden", "archived"]);
const NEWS_TYPES = new Set(["news", "project", "site-update", "other"]);

module.exports = {
  ROOT_DIR,
  PROJECT_ROOT,
  DATA_DIR,
  FRONTEND_DIR,
  DB_PATH,
  UPLOAD_DIRS,
  PUBLIC_ENTITY_TYPES,
  PUBLIC_STATUSES,
  ADMIN_STATUSES,
  NEWS_TYPES,
};
