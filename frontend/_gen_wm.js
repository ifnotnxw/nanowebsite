const fs = require("fs");
const path = require("path");
const flies = ["a", "b", "c", "d", "e", "f"];
const durs = [52, 40, 32, 28, 24, 18, 36, 44, 26, 34, 22, 30];
const bl = new Set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]);
const layers = ["back", "far", "mid", "near"];
let idx = 1;
let html = "";
for (let L = 0; L < 4; L++) {
  html += `            <div class="nf-hero-wm-drift nf-hero-wm-drift--${layers[L]}">\n              <div class="nf-hero-wm-parallax nf-hero-wm-parallax--${layers[L]}">\n`;
  for (let j = 0; j < 13; j++) {
    const i = idx++;
    const f = flies[(i - 1) % 6];
    const dur = durs[(i - 1) % durs.length];
    const del = (-((i * 1.41 + j * 0.33) % 22)).toFixed(2);
    const blur = bl.has(i) ? " nf-hero-wm-wrap--blur" : "";
    const mob = i > 28 ? " nf-hero-wm-mob-hide" : "";
    html += `                <span class="nf-hero-wm-wrap nf-hero-wm--${i} nf-hero-wm-fly-${f}${blur}${mob}" style="--wm-float-dur:${dur}s;--wm-float-del:${del}s;"><img src="img/logo-footer.png" alt="" width="56" height="56" decoding="async" /></span>\n`;
  }
  html += `              </div>\n            </div>\n`;
}
const outPath = path.join(__dirname, "_wm_fragment.txt");
fs.writeFileSync(outPath, html, "utf8");
console.log(html);
