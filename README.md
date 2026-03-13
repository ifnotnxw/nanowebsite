# НаноФарм

Сайт и API для каталога медицинского оборудования. Один запуск — сайт и админка работают вместе.

## Запуск (локально или на сервере)

В корне проекта:

```bash
npm install
npm start
```

---

После запуска:

- **Сайт:** [http://localhost:3000](http://localhost:3000)
- **Админка:** [http://localhost:3000/#admin](http://localhost:3000/#admin)
- **API:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

Если порт 3000 занят, сервер сам переключится на 3001 (адрес покажется в консоли). Порт можно задать вручную: `PORT=3001 npm start`.

### Продакшн-запуск (pm2)

Для продакшена можно использовать `pm2`:

```bash
pm2 start ecosystem.config.js --env production
```

Это запустит `backend/server.js` с `NODE_ENV=production`. Остановить:

```bash
pm2 stop nanopharm
```

## Структура

```
nanobananoo/
  backend/     — Node.js (Express), API и раздача фронта
  frontend/    — HTML, CSS, JS, страницы, картинки
```

Данные каталога и заявки хранятся в `backend/data/*.json`.

## Безопасность админки

При первом запуске вход в админку: **логин `admin`, пароль `admin`**. Для продакшена задайте переменные окружения:

- `ADMIN_LOGIN` — логин (по умолчанию `admin`)
- `ADMIN_PASSWORD_HASH` — SHA256-хеш пароля в hex (например, сгенерировать в Node: `require('crypto').createHash('sha256').update('ваш_пароль').digest('hex')`)

Либо задайте `ADMIN_PASSWORD` (пароль в открытом виде) — подходит только для разработки. Запросы на изменение данных (категории, товары, партнёры, заявки) и перевод каталога принимаются только с валидным токеном после входа.
