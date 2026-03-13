# НаноФарм — API

Бэкенд для сайта НаноФарм: каталог, заявки, i18n.

## Запуск

```bash
cd backend
npm install
npm start
```

Сервер будет доступен по адресу **http://localhost:3000**.

- **http://localhost:3000** — отдаёт фронтенд из папки `../frontend/` (главная страница и статика).
- **http://localhost:3000/api/...** — API (каталог, заявки и т.д.).

## Переменные окружения

- `PORT` — порт (по умолчанию 3000).

## API

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/health` | Проверка работы сервера |
| GET | `/api/catalog` | Всё разом: категории, партнёры, товары, новости |
| GET | `/api/categories` | Категории каталога |
| GET | `/api/partners` | Партнёры |
| GET | `/api/products` | Товары |
| GET | `/api/news` | Новости |
| GET | `/api/i18n?lang=ru` | Переводы (ru, en, kz) |
| POST | `/api/requests` | Создание заявки (контакт, быстрый запрос, корзина) |
| GET | `/api/requests` | Список заявок (для админки) |

### POST /api/requests

Тело запроса (JSON):

- `type` — `"contact"` | `"quick_quote"` | `"cart"`
- `name`, `company`, `phone`, `email` — контакты
- `message` — текст (контактная форма)
- `items` — позиции (быстрый запрос)
- `cart` — массив `[{ productId, qty }]` (запрос из корзины)

## Данные

Файлы в папке `data/`:

- `categories.json`, `partners.json`, `products.json`, `news.json` — контент каталога
- `requests.json` — сохранённые заявки (создаётся автоматически)
- `i18n-ru.json`, `i18n-en.json`, `i18n-kz.json` — опционально, переводы для API i18n

Измените JSON-файлы и перезапустите сервер, чтобы обновить данные.
