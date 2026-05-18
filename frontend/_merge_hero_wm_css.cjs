const fs = require("fs");
const path = require("path");
const dir = __dirname;
const stylesPath = path.join(dir, "styles.css");
let css = fs.readFileSync(stylesPath, "utf8");
const flight = fs.readFileSync(path.join(dir, "_wm_flight.css.txt"), "utf8");
const pos = fs.readFileSync(path.join(dir, "_wm_positions.css.txt"), "utf8");
const merged = `${flight.trimEnd()}\n\n${pos.trimEnd()}\n`;
const start = css.indexOf("/* Per-logo slow flight");
const end = css.indexOf(".nf-hero-viz-drift {", start);
if (start === -1 || end === -1) {
  console.error("markers not found", { start, end });
  process.exit(1);
}
css = css.slice(0, start) + merged + css.slice(end);
fs.writeFileSync(stylesPath, css, "utf8");
console.log("hero wm block merged", merged.length);
