# NanoFarm Public API Contract

Этот документ фиксирует контракт публичного сайта с backend после перехода на DB-слой.

## Public Endpoints (compatibility lock)

- `GET /api/catalog?lang=ru|en|kz`
  - Ответ: `{ categories, partners, products, news }`
  - Все массивы содержат legacy-совместимые поля, которые ожидает `frontend/app.js`.
- `GET /api/categories`
- `GET /api/partners`
- `GET /api/products`
- `GET /api/news`
- `GET /api/i18n?lang=ru|en|kz`
- `POST /api/requests`

## Compatibility rules

- URL-пути публичного фронта остаются прежними:
  - `/catalog/:slug`
  - `/categories/:slug`
  - `/partners/:slug`
  - `/news/:slug`
- `products` отдаются с полями `image`, `images[]`, `popular`, `isPopular`, `isHidden`, `seo`.
- `news` отдаются с legacy `content[]` даже если внутри админки используется `contentBlocks[]`.
- `slug` поддерживается на верхнем уровне и в `seo.slug`.

## Publication semantics

- В публичные ответы попадают только записи со `status = published`.
- `draft`, `hidden`, `archived` не выводятся в public API.

## Migration policy

- Источник данных — SQLite (`backend/data/nanofarm.sqlite`).
- JSON-файлы в `backend/data/*.json` используются как seed для первичной миграции.
