Nanopharm — production deploy на Ubuntu (Nginx + PM2)
======================================================

## 1. Что важно про архитектуру

- Приложение запускается Node.js-процессом: `node backend/server.js`.
- Frontend (HTML/CSS/Vanilla JS) раздается Express из `frontend`.
- API доступно по относительным путям `/api/...`.
- Рекомендуемая схема: `Nginx (80/443) -> proxy -> 127.0.0.1:3000 (Node.js)`.

## 2. Подготовка сервера

```bash
sudo apt update
sudo apt install -y nginx git curl
```

Установите Node.js 20+ (через nvm или NodeSource), затем проверьте:

```bash
node -v
npm -v
```

## 3. Первый запуск проекта

```bash
cd /var/www
sudo git clone <YOUR_REPO_URL> nanopharm
sudo chown -R $USER:$USER /var/www/nanopharm
cd /var/www/nanopharm
npm install
cp .env.example .env
```

Заполните `.env` (минимум):

- `PORT=3000`
- `NODE_ENV=production`
- `ADMIN_LOGIN=...`
- `ADMIN_PASSWORD_BCRYPT=...`
- `JWT_ACCESS_SECRET=...`
- `JWT_REFRESH_SECRET=...`
- `CORS_ORIGINS=https://example.com,https://shop.example.com`

Если нужно временно разрешить любые origin: `CORS_ORIGINS=*` (используйте осознанно).

## 4. Запуск через PM2

Установка PM2:

```bash
sudo npm install -g pm2
```

Запуск:

```bash
cd /var/www/nanopharm
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

Проверка:

```bash
pm2 status
pm2 logs nanopharm
```

## 5. Nginx reverse proxy (домен или поддомен)

Создайте конфиг, пример для `nano.domain.kz`:

```nginx
server {
    listen 80;
    server_name nano.domain.kz;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Включите сайт:

```bash
sudo ln -s /etc/nginx/sites-available/nanopharm /etc/nginx/sites-enabled/nanopharm
sudo nginx -t
sudo systemctl reload nginx
```

## 6. HTTPS (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d nano.domain.kz
```

После выпуска сертификата certbot автоматически добавит SSL-конфигурацию.

## 7. Обновление проекта через git pull

После каждого обновления кода:

```bash
cd /var/www/nanopharm
git pull
npm install
pm2 restart nanopharm
pm2 logs nanopharm --lines 100
```

Если менялся Nginx-конфиг:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 8. Проверки после деплоя

- Сайт открывается по `https://your-domain`.
- API отвечает по `https://your-domain/api/...`.
- Админка доступна по `https://your-domain/#admin`.
- Cookies авторизации ставятся и работают в `NODE_ENV=production` (Secure + HttpOnly).
- Статика (`/styles.css`, `/app.js`, `/img/...`, `/i18n/...`) грузится без `localhost`.

