/**
 * One-off extraction: reads frontend/app.js and writes frontend/i18n/ui.*.json
 * Run: node scripts/dump-ui-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const appPath = path.join(root, "frontend", "app.js");
const app = fs.readFileSync(appPath, "utf8");

function sliceConst(name, stopMarker) {
  const startRe = new RegExp(`const ${name} = \\{`);
  const start = app.search(startRe);
  if (start < 0) throw new Error(`Missing ${name}`);
  let i = app.indexOf("{", start);
  let depth = 0;
  for (; i < app.length; i += 1) {
    const ch = app[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        const block = app.slice(app.indexOf("{", start), i + 1);
        if (stopMarker && app.slice(i + 1, i + 1 + stopMarker.length).includes(stopMarker)) return block;
        if (!stopMarker) return block;
      }
    }
  }
  throw new Error(`Unclosed ${name}`);
}

const ruBlock = sliceConst("NF_UI_EXTRA_RU");
const NF_UI_EXTRA_RU = new Function(`return (${ruBlock})`)();

const i18nStart = app.indexOf("const NF_I18N = {");
if (i18nStart < 0) throw new Error("NF_I18N missing");
let depth = 0;
let objStart = -1;
for (let i = i18nStart; i < app.length; i += 1) {
  if (app[i] === "{") {
    if (depth === 0) objStart = i;
    depth += 1;
  } else if (app[i] === "}") {
    depth -= 1;
    if (depth === 0 && objStart >= 0) {
      const full = app.slice(objStart, i + 1);
      const NF_I18N = new Function(`return (${full})`)();
      const outDir = path.join(root, "frontend", "i18n");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "ui.ru.json"), JSON.stringify(NF_UI_EXTRA_RU, null, 2), "utf8");
      fs.writeFileSync(path.join(outDir, "ui.en.json"), JSON.stringify(NF_I18N.en || {}, null, 2), "utf8");
      fs.writeFileSync(path.join(outDir, "ui.kz.json"), JSON.stringify(NF_I18N.kz || {}, null, 2), "utf8");
      console.log("Wrote ui.ru.json, ui.en.json, ui.kz.json");
      break;
    }
  }
}
