const fs = require("fs");
const path = require("path");

const homePath = path.join(__dirname, "pages", "home.html");
const wmPath = path.join(__dirname, "_wm_fragment.txt");
let s = fs.readFileSync(homePath, "utf8");
const wm = fs.readFileSync(wmPath, "utf8");

const svgStart = s.indexOf('<svg\n                    class="nf-hero-brand-svg');
const svgEnd = s.indexOf("</svg>", svgStart) + "</svg>".length;
const svgBlock = s.slice(svgStart, svgEnd).replace(
  'class="nf-hero-brand-svg pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[min(118%,920px)] w-[min(132%,1040px)] max-h-none min-h-[min(48vh,520px)] -translate-x-1/2 -translate-y-1/2 overflow-visible lg:h-[min(118%,880px)] lg:w-[min(140%,1100px)] lg:min-h-[min(58vh,720px)]"',
  'class="nf-hero-brand-svg pointer-events-none absolute left-[42%] top-1/2 z-[2] h-[min(125%,980px)] w-[min(165%,1240px)] max-h-none min-h-[min(52vh,560px)] -translate-x-1/2 -translate-y-1/2 overflow-visible lg:left-1/2 lg:h-[min(130%,1020px)] lg:w-[min(175%,1320px)] lg:min-h-[min(62vh,780px)]"'
);

const head = `<div class="nf-home-firstscreen nf-first-screen">
  <section class="nf-hero nf-hero--brand home-section fade-up" aria-label="Главный экран">
    <div id="nf-premium-hero-root" class="relative flex min-h-0 flex-1 flex-col">
      <div class="nf-hero-brand-fullbleed" aria-hidden="true">
        <div class="nf-hero-brand-fullbleed-inner">
          <div class="nf-hero-wm-wash absolute inset-0 bg-gradient-to-b from-white via-[#FAFCFB] to-[#F5FAF8]"></div>
          <div
            class="nf-hero-wm-grid absolute inset-0 opacity-[0.14]"
            style="
              background-image: linear-gradient(rgba(var(--nf-accent-rgb), 0.032) 1px, transparent 1px),
                linear-gradient(90deg, rgba(var(--nf-accent-rgb), 0.026) 1px, transparent 1px);
              background-size: 56px 56px;
            "
          ></div>
          <div class="nf-hero-wm-field">
${wm.replace(/\n$/, "")}
          </div>
        </div>
        <div class="nf-hero-brand-viz-scene">
          <div class="nf-hero-viz-drift nf-hero-brand-viz-drift">
            <div class="nf-hero-viz-parallax absolute inset-0" style="--viz-x: 0px; --viz-y: 0px">
              <div class="nf-hero-viz-glow-shift">
                <div class="nf-hero-brand-glow--outer" aria-hidden="true"></div>
                <div class="nf-hero-brand-glow" aria-hidden="true"></div>
              </div>
${svgBlock.split("\n").map((line) => "              " + line).join("\n")}
            </div>
          </div>
        </div>
      </div>
      <div
        class="nf-hero-brand-shell relative z-[2] mx-auto flex w-full flex-1 flex-col justify-center bg-transparent px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 xl:py-14"
      >
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-10 bg-gradient-to-b from-transparent to-[var(--nf-color-bg)] sm:h-12"
          aria-hidden="true"
        ></div>
        <div
          class="relative z-10 grid flex-1 grid-cols-1 items-stretch gap-12 lg:min-h-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center lg:gap-10 xl:gap-14"
        >
          <div
            class="nf-hero__content relative flex max-w-[40rem] flex-col justify-center lg:max-w-[min(36rem,100%)] xl:max-w-[38rem]"
          >
            <p
              class="nf-hero__eyebrow mb-6 text-[12px] font-semibold uppercase tracking-[0.26em] text-[#51a8b1] sm:text-[13px]"
            >
              Eco-tech · future farming
            </p>
            <h1
              class="nf-hero__title m-0 text-[clamp(2.85rem,1.15rem+5vw,4.85rem)] font-semibold leading-[1.02] tracking-[-0.048em] text-[#151515]"
            >
              <span class="block">НаноФарм</span>
              <span class="mt-2 block text-[#51a8b1] sm:mt-3">премиальный контур среды</span>
            </h1>
            <p
              class="nf-hero__desc mt-8 max-w-[38rem] text-[17px] leading-[1.68] text-[#3a4543] sm:mt-10 sm:text-[18px] sm:leading-[1.64] lg:max-w-none"
            >
              Данные, поставки и сервис в одном спокойном ритме — цельно и узнаваемо, с акцентом на среду и долгий горизонт партнёрства.
            </p>
            <div class="nf-hero__buttons mt-10 flex flex-wrap gap-4 sm:mt-12 sm:gap-4">
              <a
                href="#catalog"
                data-route="catalog"
                class="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#51a8b1] px-10 text-[16px] font-semibold tracking-tight text-white shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_22px_48px_-18px_rgba(81,168,177,0.5)] transition duration-300 ease-out hover:brightness-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51a8b1]"
              >
                Каталог
              </a>
              <a
                href="#contacts"
                data-route="contacts"
                class="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#51a8b1]/18 bg-white/95 px-10 text-[16px] font-semibold tracking-tight text-[#283330] shadow-[0_2px_12px_rgba(21,21,21,0.04)] backdrop-blur-sm transition duration-300 ease-out hover:border-[#51a8b1]/42 hover:text-[#51a8b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51a8b1]/45"
              >
                Контакты
              </a>
            </div>
          </div>
          <div
            class="relative hidden min-h-[min(44vh,440px)] w-full lg:flex lg:min-h-[min(58vh,760px)] lg:items-center lg:justify-end"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  </section>
</div>
`;

const tailStart = s.indexOf('<section class="nf-popular');
if (tailStart < 0) throw new Error("tail not found");
fs.writeFileSync(homePath, head + "\n\n" + s.slice(tailStart));
console.log("patched", homePath);
