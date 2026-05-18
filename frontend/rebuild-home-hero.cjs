const fs = require("fs");
const path = require("path");

const homePath = path.join(__dirname, "pages", "home.html");
const wmPath = path.join(__dirname, "_wm_fragment.txt");
const wm = fs.readFileSync(wmPath, "utf8").trimEnd();

let tail = `<section class="nf-popular home-section fade-up" data-nf-lazy-section="popular" aria-label="Популярное оборудование">
  <div class="container">
    <header class="nf-home-section-head">
      <div class="nf-home-section-head__text">
        <h2 class="nf-home-section-head__title" data-i18n="home.popular.title">Популярное оборудование</h2>
      </div>
      <a href="#catalog" data-route="catalog" class="nf-home-link-secondary">
        <span data-i18n="home.popular.all">Весь каталог</span>
        <span class="nf-home-link-secondary__arrow" aria-hidden="true">→</span>
      </a>
    </header>
    <div class="nf-popular__carousel-wrap">
      <div
        class="nf-popular__viewport nf-popular__viewport--carousel"
        aria-hidden="false"
        tabindex="0"
        aria-roledescription="carousel"
        aria-label="Популярные товары"
      >
        <div id="popularTrack" class="nf-popular__track nf-popular__track--carousel" aria-live="polite"></div>
      </div>
      <div class="nf-popular__nav" aria-label="Листание карусели">
        <button type="button" id="popularPrev" class="nf-popular__nav-btn" aria-label="Предыдущий">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button type="button" id="popularNext" class="nf-popular__nav-btn" aria-label="Следующий">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>

<section class="nf-categories home-section fade-up" data-nf-lazy-section="categories">
  <div class="container">
    <header class="nf-home-section-head nf-home-section-head--solo">
      <div class="nf-home-section-head__text">
        <h2 class="nf-home-section-head__title" data-i18n="home.categories.title">Категории оборудования</h2>
      </div>
    </header>
    <div id="homeCategories" class="nf-categories__grid" aria-label="Категории каталога"></div>
  </div>
</section>

<section class="nf-partners home-section fade-up" data-nf-lazy-section="partners">
  <div class="container">
    <header class="nf-home-section-head nf-home-section-head--solo">
      <div class="nf-home-section-head__text">
        <h2 class="nf-home-section-head__title" data-i18n="home.partners.title">Наши партнёры</h2>
      </div>
    </header>
    <div id="homePartnersGrid" class="nf-partners__grid" aria-label="Партнёры"></div>
  </div>
</section>

<section class="nf-news home-section fade-up" data-nf-lazy-section="news">
  <div class="container">
    <header class="nf-home-section-head">
      <div class="nf-home-section-head__text">
        <h2 class="nf-home-section-head__title" data-i18n="home.news.title">Новости компании</h2>
      </div>
      <a href="#news" data-route="news" class="nf-home-link-secondary">
        <span data-i18n="home.news.all">Все новости</span>
        <span class="nf-home-link-secondary__arrow" aria-hidden="true">→</span>
      </a>
    </header>
    <div id="homeNews" class="nf-news-layout" aria-label="Новости"></div>
  </div>
</section>
`;

const svgBlock = `              <svg
                class="nf-hero-brand-svg pointer-events-none absolute left-[36%] top-1/2 z-[2] h-[min(128%,1000px)] w-[min(172%,1280px)] max-h-none min-h-[min(52vh,560px)] -translate-x-1/2 -translate-y-1/2 overflow-visible lg:left-1/2 lg:h-[min(135%,1040px)] lg:w-[min(185%,1380px)] lg:min-h-[min(64vh,800px)]"
                viewBox="-220 -120 1160 1040"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="nfRibFillA" x1="120" y1="80" x2="820" y2="780" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#51a8b1" stop-opacity="0" />
                    <stop offset="0.35" stop-color="#51a8b1" stop-opacity="0.11" />
                    <stop offset="0.7" stop-color="#a5d8de" stop-opacity="0.05" />
                    <stop offset="1" stop-color="#51a8b1" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient id="nfRibStrokeA" x1="0%" y1="50%" x2="100%" y2="50%" gradientUnits="objectBoundingBox">
                    <stop stop-color="#51a8b1" stop-opacity="0" />
                    <stop offset="0.35" stop-color="#51a8b1" stop-opacity="0.35" />
                    <stop offset="0.65" stop-color="#a5d8de" stop-opacity="0.2" />
                    <stop offset="1" stop-color="#51a8b1" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient id="nfRibStrokeB" x1="100%" y1="0%" x2="0%" y2="100%" gradientUnits="objectBoundingBox">
                    <stop stop-color="#51a8b1" stop-opacity="0.05" />
                    <stop offset="0.5" stop-color="#51a8b1" stop-opacity="0.32" />
                    <stop offset="1" stop-color="#a5d8de" stop-opacity="0.08" />
                  </linearGradient>
                </defs>
                <g class="nf-hero-viz-rib-mouse--back">
                  <g class="nf-hero-viz-rib-idle nf-hero-viz-rib-idle--bloom">
                    <ellipse cx="520" cy="360" rx="340" ry="260" fill="url(#nfRibFillA)" transform="rotate(-12 520 360)" />
                    <ellipse cx="680" cy="520" rx="280" ry="220" fill="url(#nfRibFillA)" transform="rotate(18 680 520)" opacity="0.65" />
                  </g>
                  <g class="nf-hero-viz-rib-idle nf-hero-viz-rib-idle--back" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M -200 760 C 120 80, 420 920, 680 240 S 1040 480, 1220 320"
                      stroke="url(#nfRibStrokeA)"
                      stroke-width="92"
                      opacity="0.09"
                    />
                    <path
                      d="M -140 520 C 200 200, 480 820, 760 300 S 1080 180, 1180 420"
                      stroke="#51a8b1"
                      stroke-width="64"
                      opacity="0.06"
                    />
                  </g>
                </g>
                <g class="nf-hero-viz-rib-mouse--mid">
                  <g class="nf-hero-viz-rib-idle nf-hero-viz-rib-idle--mid" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M -160 640 C 180 260, 520 780, 800 340 S 1020 220, 1140 500"
                      stroke="url(#nfRibStrokeB)"
                      stroke-width="52"
                      opacity="0.14"
                    />
                    <path
                      d="M -80 420 C 240 120, 560 720, 840 280 S 1000 400, 1120 360"
                      stroke="#51a8b1"
                      stroke-width="38"
                      opacity="0.11"
                    />
                    <path
                      d="M 60 880 C 320 480, 580 200, 820 620 S 980 760, 1080 640"
                      stroke="url(#nfRibStrokeA)"
                      stroke-width="44"
                      opacity="0.1"
                    />
                  </g>
                </g>
                <g class="nf-hero-viz-rib-mouse--front">
                  <g class="nf-hero-viz-rib-idle nf-hero-viz-rib-idle--front" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M -100 580 C 220 200, 540 700, 780 320 S 960 260, 1080 440"
                      stroke="url(#nfRibStrokeB)"
                      stroke-width="30"
                      opacity="0.2"
                    />
                    <path
                      d="M 40 720 C 300 380, 560 820, 760 400 S 920 480, 1040 380"
                      stroke="#51a8b1"
                      stroke-width="22"
                      opacity="0.16"
                    />
                    <path
                      d="M -40 300 C 280 80, 520 520, 760 200 S 940 120, 1060 280"
                      stroke="#51a8b1"
                      stroke-width="18"
                      opacity="0.14"
                    />
                  </g>
                </g>
                <g class="nf-hero-viz-rib-mouse--accent">
                  <g class="nf-hero-viz-rib-idle nf-hero-viz-rib-idle--accent" fill="none">
                    <g fill="none" stroke-linecap="round">
                      <path d="M 120 200 Q 420 80, 720 220 T 1020 180" stroke="#51a8b1" stroke-width="2.2" opacity="0.35" />
                      <path d="M 80 640 Q 380 520, 680 680 T 1000 600" stroke="#51a8b1" stroke-width="1.8" opacity="0.28" />
                      <path d="M 200 480 Q 500 360, 780 520" stroke="#a5d8de" stroke-width="1.5" opacity="0.32" />
                    </g>
                    <g fill="#51a8b1" stroke="none">
                      <circle cx="360" cy="220" r="3.2" opacity="0.35" />
                      <circle cx="620" cy="180" r="2.4" opacity="0.3" />
                      <circle cx="740" cy="400" r="3.5" opacity="0.38" />
                      <circle cx="480" cy="560" r="2.6" opacity="0.28" />
                      <circle cx="880" cy="480" r="2.2" opacity="0.26" />
                    </g>
                  </g>
                </g>
              </svg>`;

const head = `<div class="nf-home-firstscreen nf-first-screen">
  <section class="nf-hero nf-hero--brand home-section fade-up" aria-label="Главный экран">
    <div id="nf-premium-hero-root" class="relative flex min-h-0 flex-1 flex-col">
      <div class="nf-hero-brand-fullbleed" aria-hidden="true">
        <div class="nf-hero-brand-fullbleed-inner">
          <div class="nf-hero-wm-wash absolute inset-0 bg-gradient-to-b from-white via-[#FAFCFB] to-[#F5FAF8]"></div>
          <div
            class="nf-hero-wm-grid absolute inset-0 opacity-[0.14]"
            style="
              background-image: linear-gradient(rgba(81, 168, 177, 0.032) 1px, transparent 1px),
                linear-gradient(90deg, rgba(81, 168, 177, 0.026) 1px, transparent 1px);
              background-size: 56px 56px;
            "
          ></div>
          <div class="nf-hero-wm-field">
${wm}
          </div>
        </div>
        <div class="nf-hero-brand-viz-scene">
          <div class="nf-hero-viz-drift nf-hero-brand-viz-drift">
            <div class="nf-hero-viz-parallax absolute inset-0" style="--viz-x: 0px; --viz-y: 0px">
              <div class="nf-hero-viz-glow-shift">
                <div class="nf-hero-brand-glow--outer" aria-hidden="true"></div>
                <div class="nf-hero-brand-glow" aria-hidden="true"></div>
              </div>
${svgBlock}
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

fs.writeFileSync(homePath, head + "\n" + tail, "utf8");
console.log("wrote", homePath);
