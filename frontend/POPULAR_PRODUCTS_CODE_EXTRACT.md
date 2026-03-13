# Popular Products — Exact Code for Manual Fix

## 1. HTML / TEMPLATE MARKUP

**File:** `frontend/pages/home.html`  
**Lines:** 56–84

```html
<section class="nf-popular" aria-label="Популярное оборудование">
  <div class="container">
    <div class="section-head nf-popular__head">
      <h2 data-i18n="home.popular.title">Популярное оборудование</h2>
      <a
        href="#catalog"
        data-route="catalog"
        class="nf-popular__all-link"
        data-i18n="home.popular.all"
      >
        Весь каталог →
      </a>
    </div>

    <div class="nf-popular__carousel-wrap">
      <div class="nf-popular__viewport" aria-hidden="false">
        <div id="popularTrack" class="nf-popular__track" aria-live="polite"></div>
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
```

---

## 2. CSS — ALL RELEVANT RULES

**File:** `frontend/styles.css`

### Base (lines 1344–1574)

```css
/* POPULAR PRODUCTS – PREMIUM HERO CAROUSEL */

.nf-popular {
  padding: 52px 0 40px;
}

.nf-popular__head {
  align-items: center;
}

.nf-popular__all-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--nf-color-primary-dark);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  transition: all 0.2s ease;
}

.nf-popular__all-link:hover {
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.12);
  transform: translateY(-1px);
}

/* Популярное: только flex, никогда grid. Отдельная секция от каталога. */
.nf-popular__carousel-wrap {
  position: relative;
}
.nf-popular__nav {
  display: none;
}
.nf-popular__viewport {
  overflow: hidden;
  position: relative;
  width: 100%;
  margin-top: 22px;
  border-radius: 22px;
  background: linear-gradient(135deg, #f6faf9, #eef4f4);
  padding: 10px 0 14px;
  touch-action: pan-y;
}

.nf-popular__track {
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  padding-inline: 18px;
  width: max-content;
  min-width: 100%;
  will-change: transform;
  box-sizing: border-box;
}

.nf-popular .nf-product-card--popular {
  flex: 0 0 auto;
  width: 260px;
  border-radius: 18px;
  padding: 0 18px 16px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow:
    0 10px 26px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(148, 163, 184, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.nf-popular .nf-product-card--popular:hover {
  transform: translateY(-6px);
  box-shadow:
    0 22px 60px rgba(15, 23, 42, 0.22),
    0 0 0 1px rgba(112, 169, 162, 0.16);
}

.nf-product-thumb--popular {
  height: 210px;
  border-radius: 18px 18px 0 0;
  background: transparent;
  /* растягиваем превью на полную ширину карточки */
  margin: 0 -18px 16px;
  padding: 0;
  aspect-ratio: auto;
  overflow: hidden;
}

.nf-product-thumb--popular .nf-product-thumb-inner {
  border-radius: inherit;
}

.nf-product-thumb--popular .nf-product-thumb-inner img {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  transform-origin: center;
  transition: transform 0.25s ease;
}

@media (max-width: 768px) {
  .nf-popular__viewport {
    padding-bottom: 8px;
    margin-inline: calc(-1 * 20px);
    width: calc(100% + 2 * 20px);
    max-width: none;
    border-radius: 0;
  }

  .nf-popular__track {
    padding-inline: 20px;
    gap: 14px;
  }

  .nf-popular .nf-product-card--popular {
    flex: 0 0 clamp(260px, 78vw, 320px);
    width: clamp(260px, 78vw, 320px);
    min-width: 0;
    padding: 12px;
    border-radius: 16px;
  }
}

.nf-product-card--popular:hover .nf-product-thumb-inner img {
  transform: scale(1.03);
}

.nf-product-body--popular {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nf-popular-title-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nf-product-title--popular {
  font-size: 15px;
  line-height: 1.45;
}

.nf-product-meta-row--topline {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
  font-size: 12px;
}

.nf-popular-badge-wrap {
  margin-bottom: 6px;
}

.nf-popular-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(112, 169, 162, 0.12);
  color: #4f8c86;
}

.nf-product-meta-row--stacked {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 8px;
}

.nf-product-meta--brand {
  font-weight: 500;
}

.nf-product-meta--category {
  font-size: 12px;
}

.nf-popular-actions {
  margin-top: 10px;
}

.nf-popular-actions .nf-btn {
  height: 36px;
  min-height: 36px;
  border-radius: 10px;
  font-size: 13px;
}

.nf-popular-actions .nf-btn-primary {
  background: #70a9a2;
  color: #ffffff;
}

.nf-popular-actions .nf-btn-ghost,
.nf-popular-actions .nf-btn-secondary {
  background: #ffffff;
  border-color: #dfe7e6;
}

.nf-product-footer--popular {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nf-popular-price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nf-price--popular {
  font-size: 15px;
}

@media (max-width: 1024px) {
  .nf-popular__track {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .nf-popular {
    padding-top: 40px;
  }

  .nf-popular__head {
    align-items: flex-start;
  }

  .nf-popular__all-link {
    padding-inline: 8px 6px;
  }
}
```

### Global product card base (lines 1909–1974)

```css
.nf-product-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.nf-product-footer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
  border-top: 1px solid rgba(229, 231, 235, 0.6);
}

.nf-product-footer .nf-price,
.nf-product-footer .nf-price-muted {
  flex-shrink: 0;
  order: 1;
}
```

### Animation (lines 2310–2398)

```css
.nf-popular .nf-popular__track > *,
.nf-news-layout > *,
...
{
  opacity: 0;
  transform: translateY(10px) scale(0.98);
  animation: nf-partner-card-in 420ms var(--nf-transition-fast) forwards;
}

.nf-popular .nf-popular__track > *:nth-child(1), ... { animation-delay: 40ms; }
.nf-popular .nf-popular__track > *:nth-child(2), ... { animation-delay: 80ms; }
.nf-popular .nf-popular__track > *:nth-child(3), ... { animation-delay: 120ms; }
.nf-popular .nf-popular__track > *:nth-child(4), ... { animation-delay: 160ms; }
.nf-popular .nf-popular__track > *:nth-child(5), ... { animation-delay: 200ms; }
.nf-popular .nf-popular__track > *:nth-child(6), ... { animation-delay: 240ms; }
.nf-popular .nf-popular__track > *:nth-child(7), ... { animation-delay: 280ms; }
.nf-popular .nf-popular__track > *:nth-child(8), ... { animation-delay: 320ms; }
```

### Tablet 768px (lines 8952–9017)

```css
  .nf-popular__track .nf-product-card--popular {
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }

  .nf-popular {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  .nf-popular__viewport {
    overflow: hidden;
    padding: 0 0 8px;
    margin-inline: calc(-1 * 20px);
    width: calc(100% + 2 * 20px);
    max-width: none;
    border-radius: 0;
  }

  .nf-popular__track {
    display: flex;
    flex-wrap: nowrap;
    gap: 14px;
    width: max-content;
    min-width: 100%;
    padding-inline: 20px;
    will-change: transform;
  }

  .nf-popular__track .nf-product-card--popular {
    flex: 0 0 clamp(220px, 65vw, 260px);
    width: clamp(220px, 65vw, 260px);
    min-width: 220px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }

  .nf-popular__track .nf-product-thumb,
  .nf-popular__track .nf-product-thumb--popular {
    aspect-ratio: 1 / 1;
    height: auto;
    margin: 0 -12px 8px;
    border-radius: 12px;
    overflow: hidden;
  }

  .nf-popular__track .nf-product-thumb-inner,
  .nf-popular__track .nf-product-thumb-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nf-popular__track .nf-popular-actions .nf-btn {
    width: 100%;
    height: 44px;
    border-radius: 12px;
  }

  .nf-popular__viewport.nf-carousel-dragging .nf-popular__track {
    transition: none;
  }
```

### Safety 1024px (lines 9352–9395)

```css
  .nf-popular > .container,
  ...
  .nf-popular__carousel-wrap,
  .nf-popular__viewport,
  .nf-popular__track,
  ...
  .nf-product-card--popular {
    max-width: 100%;
    box-sizing: border-box;
  }

  .nf-product-card--popular * {
    min-width: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
```

### Tablet popular (lines 9795–9902)

```css
  .nf-popular {
    padding: 8px 0 28px;
  }

  .nf-popular__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .nf-popular__head h2 {
    margin: 0;
    font-size: 24px;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .nf-popular__all-link {
    flex: 0 0 auto;
    font-size: 14px;
    white-space: nowrap;
  }

  .nf-popular__carousel-wrap {
    overflow: visible;
  }

  .nf-popular__viewport {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0;
    margin: 0;
    background: transparent;
    border-radius: 0;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .nf-popular__viewport::-webkit-scrollbar {
    display: none;
  }

  .nf-popular__track {
    display: flex;
    gap: 14px;
    padding: 2px 0 6px;
    width: max-content;
    min-width: 100%;
    transform: none !important;
  }

  .nf-popular__nav {
    display: none !important;
  }

  .nf-popular .nf-product-card--popular {
    width: 280px;
    min-width: 280px;
    max-width: 280px;
    border-radius: 18px;
    border: var(--nf-phone-border);
    box-shadow: var(--nf-phone-shadow);
    padding: 12px;
    scroll-snap-align: start;
  }

  .nf-popular .nf-product-thumb--popular,
  .nf-popular .nf-product-thumb {
    aspect-ratio: 1 / 1;
    border-radius: 14px;
    overflow: hidden;
  }

  .nf-popular .nf-product-body {
    padding-top: 12px;
  }

  .nf-popular .nf-popular-title-block {
    gap: 8px;
  }

  .nf-popular .nf-popular-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .nf-popular .nf-popular-actions .nf-btn,
  .nf-popular .nf-popular-actions button,
  .nf-popular .nf-popular-actions a {
    min-height: 44px;
    width: 100%;
    border-radius: 14px;
  }
```

### Mobile 767px — full block (lines 9905–10150)

```css
/* =========================================================
   MOBILE POPULAR — premium horizontal swipe + side arrows
   (max-width 767px). Native scroll + scroll-snap. Desktop unchanged.
   ========================================================= */
@media (max-width: 767px) {
  .nf-popular__carousel-wrap {
    position: relative;
    overflow: visible;
  }

  .nf-popular__viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x pan-y;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: none;
    min-width: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .nf-popular__viewport::-webkit-scrollbar {
    display: none;
  }

  .nf-popular__track {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    width: max-content;
    min-width: min-content;
    padding: 4px 8px 8px;
    transform: none !important;
    will-change: auto;
    box-sizing: border-box;
  }

  .nf-popular .nf-product-card--popular {
    flex: 0 0 auto;
    width: min(72vw, 268px);
    min-width: min(72vw, 268px);
    max-width: min(72vw, 268px);
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.06);
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
    overflow: hidden;
  }

  .nf-popular .nf-product-thumb--popular,
  .nf-popular .nf-product-thumb {
    width: 100%;
    aspect-ratio: 1 / 1;
    margin: 0;
    padding: 0;
    border-radius: 0;
    flex-shrink: 0;
    overflow: hidden;
  }

  .nf-popular .nf-product-thumb-inner {
    width: 100%;
    height: 100%;
    border-radius: 0;
    overflow: hidden;
  }

  .nf-popular .nf-product-thumb-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nf-popular .nf-product-body--popular,
  .nf-popular .nf-product-body {
    padding: 8px 10px 0;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nf-popular .nf-popular-title-block {
    gap: 4px;
    min-width: 0;
  }

  .nf-popular .nf-popular-badge-wrap {
    margin-bottom: 0;
  }

  .nf-popular .nf-popular-badge {
    font-size: 10px;
    padding: 2px 6px;
  }

  .nf-popular .nf-product-title--popular {
    font-size: 13px;
    line-height: 1.3;
    font-weight: 600;
    letter-spacing: -0.02em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  .nf-popular .nf-product-meta-row--topline,
  .nf-popular .nf-product-meta {
    font-size: 11px;
    color: #64748b;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nf-popular .nf-product-footer--popular,
  .nf-popular .nf-product-footer {
    padding: 6px 10px 10px;
    margin-top: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-shrink: 0;
  }

  .nf-popular .nf-popular-price-block {
    margin: 0;
  }

  .nf-popular .nf-price--popular,
  .nf-popular .nf-price-muted {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }

  .nf-popular .nf-price-muted.nf-price--popular {
    font-weight: 600;
    color: #64748b;
  }

  .nf-popular .nf-popular-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 0;
  }

  .nf-popular .nf-popular-actions .nf-btn,
  .nf-popular .nf-popular-actions button {
    width: 100%;
    min-height: 40px;
    border-radius: 10px;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
  }

  .nf-popular .nf-popular-actions .nf-popular-more {
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.12);
    color: #0f172a;
  }

  .nf-popular .nf-popular-actions .nf-popular-add {
    background: var(--nf-color-primary, #70a9a2);
    color: #fff;
    border: none;
  }

  /* Side arrow controls — overlaid on slider */
  .nf-popular__nav {
    display: flex !important;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
    z-index: 2;
  }

  .nf-popular__nav-btn {
    pointer-events: auto;
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    color: #0f172a;
    box-shadow: 0 2px 12px rgba(15, 23, 42, 0.12);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .nf-popular__nav-btn:hover:not(:disabled) {
    background: #ffffff;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.14);
  }

  .nf-popular__nav-btn:active:not(:disabled) {
    transform: scale(0.95);
  }

  .nf-popular__nav-btn:disabled {
    opacity: 0.35;
    cursor: default;
    pointer-events: none;
  }

  .nf-popular__nav-btn svg {
    width: 20px;
    height: 20px;
  }
}
```

### Override 767px (lines 10145–10150)

```css
/* Override safety max-width so viewport can extend and scroll on mobile */
@media (max-width: 767px) {
  .nf-popular__viewport {
    max-width: none;
  }
}
```

### Phone 480px (lines 10265–10282)

```css
  .nf-popular {
    padding-top: 4px;
  }

  .nf-popular__head {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
  }

  .nf-popular__head h2 {
    font-size: 20px;
    line-height: 1.15;
  }

  .nf-popular__all-link {
    font-size: 13px;
  }
```

---

## 3. JS — ALL RELEVANT FUNCTIONS

**File:** `frontend/app.js`

### NF_POPULAR_MARQUEE (lines 546–561)

```javascript
const NF_POPULAR_MARQUEE = {
  rafId: null,
  offset: 0,
  speedDesktop: 22,
  speedMobile: 12,
  get speed() {
    if (typeof window === "undefined" || !window.matchMedia) return 18;
    return window.matchMedia("(max-width: 768px)").matches ? this.speedMobile : this.speedDesktop;
  },
  paused: false,
  initialized: false,
  isDragging: false,
  dragStartX: 0,
  dragStartOffset: 0,
  lastTs: 0,
};
```

### nfEl (lines 564–566)

```javascript
function nfEl(id) {
  return document.getElementById(id);
}
```

### nfRenderPopularCarousel (lines 1339–1467)

```javascript
function nfRenderPopularCarousel() {
  const track = nfEl("popularTrack");
  if (!track) return;

  if (NF_POPULAR_MARQUEE.rafId) {
    cancelAnimationFrame(NF_POPULAR_MARQUEE.rafId);
  }
  if (typeof NF_POPULAR_MARQUEE._resizeCleanup === "function") {
    NF_POPULAR_MARQUEE._resizeCleanup();
  }
  if (typeof NF_POPULAR_MARQUEE._navResizeCleanup === "function") {
    NF_POPULAR_MARQUEE._navResizeCleanup();
  }
  NF_POPULAR_MARQUEE.rafId = null;
  NF_POPULAR_MARQUEE.offset = 0;
  NF_POPULAR_MARQUEE.paused = false;
  NF_POPULAR_MARQUEE.initialized = false;
  NF_POPULAR_MARQUEE.isDragging = false;
  NF_POPULAR_MARQUEE.dragStartX = 0;
  NF_POPULAR_MARQUEE.dragStartOffset = 0;
  NF_POPULAR_MARQUEE.lastTs = 0;
  NF_POPULAR_MARQUEE._resizeCleanup = null;

  let popular = (NF_DATA.products || []).filter((p) => p.popular);
  if (!popular.length && Array.isArray(NF_DATA.products)) {
    popular = [...NF_DATA.products].slice(0, 8);
  }
  track.innerHTML = "";

  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  popular.forEach((p) => track.appendChild(nfPopularCard(p)));
  if (!isMobile) {
    popular.forEach((p) => track.appendChild(nfPopularCard(p, true)));
  }

  track.style.transform = "";
  state.offset = 0;

  const prev = nfEl("popularPrev");
  const next = nfEl("popularNext");
  const viewport = track.closest(".nf-popular__viewport");

  if (isMobile && viewport) {
    viewport.scrollLeft = 0;
  }

  track.onclick = (e) => {
    const card = e.target.closest?.(".nf-product-card");
    const add = e.target.closest?.(".nf-popular-add");
    if (!card) return;

    const id = card.dataset.productId;
    if (!id) return;

    if (add) {
      e.preventDefault();
      e.stopPropagation();
      nfAddToCart(id, 1);
      return;
    }

    nfNavigateToCatalogProduct(id);
  };

  track.onkeydown = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest?.(".nf-product-card");
    if (!card) return;
    e.preventDefault();
    nfNavigateToCatalogProduct(card.dataset.productId);
  };

  nfStartPopularMarquee();

  const updateNavButtons = () => {
    if (!prev || !next) return;
    if (isMobile && viewport) {
      const sl = viewport.scrollLeft;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const canScroll = maxScroll > 2;
      prev.disabled = !canScroll || sl <= 2;
      next.disabled = !canScroll || sl >= maxScroll - 2;
      return;
    }
    const maxOffset = -(track.scrollWidth - viewport.offsetWidth);
    const canScroll = track.scrollWidth > viewport.offsetWidth;
    prev.disabled = !canScroll || state.offset >= 0;
    next.disabled = !canScroll || state.offset <= maxOffset;
  };

  const shift = (direction) => {
    const firstCard = track.querySelector(".nf-product-card");
    if (!firstCard) return;

    const cardRect = firstCard.getBoundingClientRect();
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = cardRect.width + gap;

    if (isMobile && viewport) {
      viewport.scrollBy({ left: direction * step, behavior: "smooth" });
      return;
    }

    state.offset += direction * step;
    const halfWidth = track.scrollWidth / 2 || 1;
    if (state.offset <= -halfWidth) state.offset += halfWidth;
    else if (state.offset >= 0) state.offset -= halfWidth;
    track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
    updateNavButtons();
  };

  if (prev) prev.onclick = () => (isMobile && viewport ? shift(-1) : shift(1));
  if (next) next.onclick = () => (isMobile && viewport ? shift(1) : shift(-1));

  if (isMobile && viewport) {
    updateNavButtons();
    viewport.addEventListener("scroll", updateNavButtons, { passive: true });
    const onResize = () => updateNavButtons();
    window.addEventListener("resize", onResize);
    NF_POPULAR_MARQUEE._navResizeCleanup = () => {
      viewport.removeEventListener("scroll", updateNavButtons);
      window.removeEventListener("resize", onResize);
    };
  } else {
    updateNavButtons();
    NF_POPULAR_MARQUEE._navResizeCleanup = () => window.removeEventListener("resize", updateNavButtons);
    window.addEventListener("resize", updateNavButtons);
  }
}
```

### nfStartPopularMarquee (lines 1469–1618)

```javascript
function nfStartPopularMarquee() {
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return;
  const track = nfEl("popularTrack");
  const viewport = track && (track.closest(".nf-popular__viewport") || track.closest(".carousel-viewport"));
  if (!track || !viewport) return;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = NF_POPULAR_MARQUEE;

  if (state.initialized) return;
  state.initialized = true;

  if (prefersReducedMotion) {
    // Без автопрокрутки и анимации — остаётся только естественный горизонтальный скролл
    state.paused = true;
    state.rafId = null;
    track.style.transform = "";
    return;
  }

  const applyTransform = () => {
    const halfWidth = track.scrollWidth / 2 || 1;
    if (state.offset <= -halfWidth) state.offset += halfWidth;
    else if (state.offset >= 0) state.offset -= halfWidth;
    track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
  };

  const startDrag = (clientX) => {
    state.isDragging = true;
    state.dragStartX = clientX;
    state.dragStartOffset = state.offset;
    viewport.classList.add("nf-carousel-dragging");
    state.paused = true;
  };

  const moveDrag = (clientX) => {
    if (!state.isDragging) return;
    const delta = clientX - state.dragStartX;
    state.offset = state.dragStartOffset + delta;
    applyTransform();
  };

  const endDrag = () => {
    if (!state.isDragging) return;
    state.isDragging = false;
    viewport.classList.remove("nf-carousel-dragging");
    state.paused = false;
  };

  const step = (ts) => {
    if (!state.lastTs) state.lastTs = ts;
    const dt = ts - state.lastTs;
    state.lastTs = ts;

    if (!state.paused && !state.isDragging) {
      const delta = (state.speed * dt) / 1000;
      state.offset -= delta;
      applyTransform();
    }

    state.rafId = requestAnimationFrame(step);
  };

  if (state.rafId) {
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }

  state.offset = 0;
  state.lastTs = 0;
  applyTransform();

  /* Старт анимации после завершения layout (track.scrollWidth уже корректный) */
  function startLoop() {
    if (state.rafId) return;
    state.rafId = requestAnimationFrame(step);
  }
  requestAnimationFrame(function () {
    requestAnimationFrame(startLoop);
  });

  viewport.addEventListener("mouseenter", () => {
    state.paused = true;
  });

  viewport.addEventListener("mouseleave", () => {
    if (state.isDragging) return;
    state.paused = false;
  });

  viewport.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    startDrag(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!state.isDragging) return;
    moveDrag(e.clientX);
  });

  window.addEventListener("mouseup", endDrag);

  viewport.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      if (!t) return;
      startDrag(t.clientX);
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      if (!t) return;
      if (state.isDragging) e.preventDefault();
      moveDrag(t.clientX);
    },
    { passive: false }
  );

  viewport.addEventListener("touchend", endDrag);
  viewport.addEventListener("touchcancel", endDrag);

  viewport.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX || 0;
      state.offset -= delta * 0.6;
      applyTransform();
    },
    { passive: false }
  );

  const onResize = () => {
    const halfWidth = track.scrollWidth / 2 || 1;
    while (state.offset <= -halfWidth) state.offset += halfWidth;
    while (state.offset >= 0) state.offset -= halfWidth;
    applyTransform();
  };
  window.addEventListener("resize", onResize);
  state._resizeCleanup = () => window.removeEventListener("resize", onResize);

  /* rafId задаётся в startLoop() после двух rAF */
}
```

### nfPopularCard (lines 1620–1736)

```javascript
function nfPopularCard(p, isClone = false) {
  const card = nfCreateEl("article", "nf-product-card nf-product-card--popular");
  card.dataset.productId = p.id;
  if (isClone) card.dataset.clone = "1";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${p.name}. Открыть в каталоге`);

  const thumb = nfCreateEl("div", "nf-product-thumb nf-product-thumb--popular");
  thumb.classList.add("nf-product-thumb-loading");
  const thumbInner = nfCreateEl("div", "nf-product-thumb-inner");
  const img = document.createElement("img");
  img.alt = p.name;

  const images = nfGetProductImages(p);
  const placeholderSrc = nfProductPlaceholderSvg();
  const primarySrc = images.length ? images[0] : "";

  img.src = primarySrc || placeholderSrc;
  nfConfigureImageElement(img, {
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
    width: 600,
    height: 450,
  });
  img.onerror = () => {
    if (img.src !== placeholderSrc) {
      img.src = placeholderSrc;
    }
  };

  img.addEventListener("load", () => {
    thumb.classList.remove("nf-product-thumb-loading");
  });
  img.addEventListener("error", () => {
    thumb.classList.remove("nf-product-thumb-loading");
  });

  thumbInner.appendChild(img);
  thumb.appendChild(thumbInner);

  const body = nfCreateEl("div", "nf-product-body nf-product-body--popular");

  const titleBlock = nfCreateEl("div", "nf-popular-title-block");

  if (p.popular) {
    const badgeWrap = nfCreateEl("div", "nf-popular-badge-wrap");
    const badge = nfCreateEl("span", "nf-popular-badge", "Популярный");
    badgeWrap.appendChild(badge);
    titleBlock.appendChild(badgeWrap);
  }

  titleBlock.appendChild(nfCreateEl("div", "nf-product-title nf-product-title--popular", p.name));

  const metaTop = nfCreateEl("div", "nf-product-meta-row nf-product-meta-row--topline");
  const partnerName = nfGetPartnerName(p.partnerId);
  if (partnerName) {
    metaTop.appendChild(nfCreateEl("div", "nf-product-meta nf-product-meta--brand", partnerName));
  }
  const cat = NF_DATA.categories.find((c) => c.id === p.categoryId);
  if (cat) {
    metaTop.appendChild(
      nfCreateEl("div", "nf-product-meta nf-product-meta--muted nf-product-meta--category", cat.name)
    );
  }
  if (metaTop.childNodes.length) {
    titleBlock.appendChild(metaTop);
  }

  body.appendChild(titleBlock);

  const footer = nfCreateEl("div", "nf-product-footer nf-product-footer--popular");

  const priceBlock = nfCreateEl(
    "div",
    "nf-popular-price-block",
    ""
  );
  const priceEl = nfCreateEl("div", p.price ? "nf-price nf-price--popular" : "nf-price-muted nf-price--popular", nfFormatPrice(p.price));
  priceBlock.appendChild(priceEl);
  footer.appendChild(priceBlock);

  const actions = nfCreateEl("div", "nf-product-actions nf-popular-actions");
  const moreBtn = nfCreateEl("button", "nf-btn nf-btn-ghost nf-btn-sm nf-popular-more", "Подробнее");
  moreBtn.type = "button";
  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nfNavigateToCatalogProduct(p.id);
  });
  const addBtn = nfCreateEl(
    "button",
    "nf-btn nf-btn-primary nf-btn-sm nf-popular-add nf-btn-checkable",
    `<span class="nf-btn-icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5h2l1.2 8.4A1.5 1.5 0 0 0 9.7 15h7.1a1.5 1.5 0 0 0 1.47-1.19L19.8 9H8.3" stroke="#0b1f1c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="18" r="1.3" fill="#0b1f1c" />
        <circle cx="17" cy="18" r="1.3" fill="#0b1f1c" />
      </svg>
    </span><span class="nf-btn-label">В запрос</span>`
  );
  addBtn.type = "button";
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nfAddToCart(p.id, 1);
    nfAnimateAddToCartButton(addBtn);
  });
  actions.appendChild(moreBtn);
  actions.appendChild(addBtn);
  footer.appendChild(actions);

  card.append(thumb, body, footer);
  return card;
}
```

---

## 4. FILE PATHS AND LINE RANGES

| Block | File | Line range |
|-------|------|------------|
| HTML Popular section | frontend/pages/home.html | 56–84 |
| Base popular CSS | frontend/styles.css | 1344–1574 |
| .nf-product-body / .nf-product-footer | frontend/styles.css | 1909–1974 |
| Popular track animation | frontend/styles.css | 2310–2398 |
| Tablet 768 popular | frontend/styles.css | 8952–9017 |
| Safety 1024 | frontend/styles.css | 9352–9395 |
| Tablet popular | frontend/styles.css | 9795–9902 |
| Mobile 767 popular | frontend/styles.css | 9905–10143 |
| Override 767 viewport | frontend/styles.css | 10145–10150 |
| Phone 480 popular | frontend/styles.css | 10265–10282 |
| NF_POPULAR_MARQUEE | frontend/app.js | 546–561 |
| nfEl | frontend/app.js | 564–566 |
| nfRenderPopularCarousel | frontend/app.js | 1339–1467 |
| nfStartPopularMarquee | frontend/app.js | 1469–1618 |
| nfPopularCard | frontend/app.js | 1620–1736 |

Note: In `nfRenderPopularCarousel`, `state` is used (e.g. `state.offset`) but not declared in the function; desktop logic expects a shared state object (same as `NF_POPULAR_MARQUEE`). Consider adding `const state = NF_POPULAR_MARQUEE;` at the start of the function if `state` is not defined elsewhere in scope.
