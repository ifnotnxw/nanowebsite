const fs = require("fs");
const path = require("path");
let s = "";
for (let i = 1; i <= 52; i++) {
  const left = ((i * 17.31 + i * i * 0.07) % 112) - 6;
  const top = ((i * 23.17 + i * 5.3) % 102) - 3;
  const wmin = 16 + (i % 6) * 3;
  const wvw = 4.2 + (i % 8) * 1.15;
  const wmax = Math.min(78, 34 + (i % 7) * 6);
  const rot = ((i * 47) % 25) - 12;
  s += `.nf-hero-wm--${i} {\n  left: ${left.toFixed(1)}%;\n  top: ${top.toFixed(1)}%;\n  width: clamp(${wmin}px, ${wvw.toFixed(2)}vw, ${wmax}px);\n}\n`;
  s += `.nf-hero-wm--${i} img {\n  transform: rotate(${rot}deg);\n}\n`;
}
fs.writeFileSync(path.join(__dirname, "_wm_positions.css.txt"), s, "utf8");
console.log("ok");
