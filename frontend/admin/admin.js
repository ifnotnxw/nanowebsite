(function () {
  const TOKEN_KEY = "nf_admin_token";
  const REFRESH_KEY = "nf_admin_refresh";
  const BASE_OVERRIDE =
    (typeof window !== "undefined" && window.__NF_ADMIN_API_BASE != null
      ? String(window.__NF_ADMIN_API_BASE)
      : (typeof localStorage !== "undefined" ? localStorage.getItem("nf_admin_api_base") : "") || ""
    ).replace(/\/+$/, "");

  const ENTITY_LABELS = {
    dashboard: "Обзор",
    products: "Товары",
    categories: "Категории",
    partners: "Партнёры",
    news: "Новости",
    pages: "Страницы (CMS)",
    media: "Медиа",
    seo: "SEO / URL",
  };

  const STATUS_LABELS = {
    published: "Опубликовано",
    draft: "Черновик",
    hidden: "Скрыто",
    archived: "В архиве",
  };

  const BULK_ACTIONS = [
    { value: "", label: "Массовые действия" },
    { value: "publish", label: "Опубликовать" },
    { value: "hide", label: "Скрыть" },
    { value: "draft", label: "Перевести в черновик" },
    { value: "archive", label: "Перевести в архив" },
    { value: "delete", label: "Удалить" },
  ];

  const BLOCK_TYPE_LABELS = {
    heading: "Заголовок",
    paragraph: "Текст",
    quote: "Цитата",
    callout: "Выделение",
    image: "Изображение",
  };
  const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
  const IMAGE_ACCEPT_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

  const state = {
    token: sessionStorage.getItem(TOKEN_KEY) || "",
    refreshToken: sessionStorage.getItem(REFRESH_KEY) || "",
    role: "admin",
    section: "dashboard",
    status: "",
    lists: {},
    pagination: {},
    filters: {},
    selected: {},
    editingEntity: "",
    editingItem: null,
    media: [],
  };

  const appRoot = document.getElementById("adminApp");

  function buildUrl(path) {
    if (/^https?:\/\//i.test(path)) return path;
    const clean = String(path || "").startsWith("/") ? String(path) : `/${String(path || "")}`;
    return `${BASE_OVERRIDE}${clean}`;
  }

  function withAltAdminPrefixes(path) {
    const normalized = String(path || "");
    const list = [normalized];
    if (normalized.startsWith("/api/admin/")) {
      const tail = normalized.slice("/api/admin/".length);
      list.push(`/admin-api/${tail}`);
      list.push(`/admin/api/${tail}`);
      list.push(`/api/v1/admin/${tail}`);
    }
    return list.map((candidate) => buildUrl(candidate));
  }

  async function fetchWithAdminFallback(path, options) {
    const candidates = withAltAdminPrefixes(path);
    let lastError = null;
    for (const url of candidates) {
      try {
        const response = await fetch(url, options);
        if (response.status === 404) {
          lastError = new Error(`404 for ${url}`);
          continue;
        }
        return response;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error(`Request failed: ${path}`);
  }

  function el(tag, attrs, content) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === "class") node.className = value;
        else if (key === "html") node.innerHTML = value;
        else if (value != null) node.setAttribute(key, value);
      });
    }
    if (content != null) node.textContent = content;
    return node;
  }

  function setStatus(text, isError) {
    state.status = text || "";
    const statusEl = document.querySelector("[data-admin-status]");
    if (!statusEl) return;
    statusEl.textContent = state.status;
    statusEl.classList.toggle("error", Boolean(isError));
  }

  function statusText(status) {
    return STATUS_LABELS[status] || status || "Черновик";
  }

  function boolText(value) {
    return value ? "Да" : "Нет";
  }

  function translationStatusLabel(status) {
    const value = String(status || "").toLowerCase();
    if (value === "completed" || value === "done") return "Готово";
    if (value === "pending") return "В очереди";
    if (value === "processing") return "В работе";
    if (value === "stale") return "Устарело";
    if (value === "failed") return "Ошибка";
    return value || "—";
  }

  function priceTypeText(value) {
    return value === "request" ? "По запросу" : "Фиксированная цена";
  }

  function availabilityText(value) {
    const v = String(value || "").toLowerCase();
    if (v === "out_of_stock" || v === "none" || v === "not_available") return "Нет в наличии";
    return "В наличии";
  }

  function mapMediaRow(row) {
    return {
      id: row.id || "",
      path: row.path || "",
      altText: row.alt_text || row.altText || "",
      caption: row.caption || "",
      mimeType: row.mime_type || row.mimeType || "",
      sizeBytes: row.size_bytes || row.sizeBytes || 0,
    };
  }

  function validateImageFile(file) {
    if (!file) return "Файл не выбран";
    if (!IMAGE_ACCEPT_MIME.has(String(file.type || "").toLowerCase())) {
      return "Допустимы только JPG, JPEG, PNG или WEBP";
    }
    if ((file.size || 0) > MAX_IMAGE_SIZE_BYTES) {
      return "Файл слишком большой (максимум 10 МБ)";
    }
    return "";
  }

  async function uploadImageToMedia(file) {
    const errorText = validateImageFile(file);
    if (errorText) throw new Error(errorText);
    const form = new FormData();
    form.append("file", file);
    const result = await api("/api/admin/media/upload", { method: "POST", body: form });
    return mapMediaRow(result.media || result);
  }

  function normalizeGalleryItems(item) {
    const sourceAssets = Array.isArray(item.galleryAssets)
      ? item.galleryAssets
      : Array.isArray(item.photos)
        ? item.photos.map((p) => ({
            mediaId: p.mediaId || "",
            path: p.url || "",
            altText: p.altText || "",
            caption: p.caption || "",
            isMain: Boolean(p.isMain),
            order: Number.isFinite(Number(p.order)) ? Number(p.order) : 0,
          }))
        : Array.isArray(item.gallery)
          ? item.gallery.map((path, index) => ({
              mediaId: (Array.isArray(item.mediaIds) ? item.mediaIds[index] : "") || "",
              path,
              altText: "",
              caption: "",
              isMain: index === 0,
              order: index,
            }))
          : [];
    const prepared = sourceAssets
      .filter((x) => x && x.path)
      .map((asset, index) => ({
        id: asset.id || `gal-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
        mediaId: asset.mediaId || "",
        path: asset.path,
        altText: asset.altText || "",
        caption: asset.caption || "",
        isMain: Boolean(asset.isMain),
        order: Number.isFinite(Number(asset.order)) ? Number(asset.order) : index,
      }));
    if (!prepared.some((x) => x.isMain) && prepared[0]) prepared[0].isMain = true;
    return prepared;
  }

  async function api(path, options) {
    const opts = Object.assign(
      { method: "GET", headers: {}, credentials: "same-origin" },
      options || {}
    );
    opts.headers = Object.assign({}, opts.headers);
    if (state.token) opts.headers.Authorization = `Bearer ${state.token}`;
    if (opts.body && !(opts.body instanceof FormData)) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(opts.body);
    }
    let response = await fetchWithAdminFallback(path, opts);
    if (response.status === 401 && state.refreshToken) {
      const refreshed = await refreshToken();
      if (refreshed) {
        opts.headers.Authorization = `Bearer ${state.token}`;
        response = await fetchWithAdminFallback(path, opts);
      }
    }
    if (!response.ok) {
      let message = `HTTP ${response.status}`;
      try {
        const payload = await response.json();
        if (payload && payload.error) message = payload.error;
      } catch (_e) {}
      throw new Error(message);
    }
    if (response.status === 204) return null;
    return response.json();
  }

  function saveTokens(token, refresh) {
    state.token = token || "";
    state.refreshToken = refresh || state.refreshToken || "";
    if (state.token) sessionStorage.setItem(TOKEN_KEY, state.token);
    else sessionStorage.removeItem(TOKEN_KEY);
    if (state.refreshToken) sessionStorage.setItem(REFRESH_KEY, state.refreshToken);
    else sessionStorage.removeItem(REFRESH_KEY);
  }

  async function refreshToken() {
    try {
      const data = await fetchWithAdminFallback("/api/admin/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refreshToken: state.refreshToken }),
      }).then((res) => (res.ok ? res.json() : null));
      if (!data || !data.token) return false;
      saveTokens(data.token, state.refreshToken);
      state.role = data.role || "admin";
      return true;
    } catch (_e) {
      return false;
    }
  }

  async function ensureSession() {
    if (!state.token) return false;
    try {
      const data = await api("/api/admin/check");
      state.role = data.role || "admin";
      return true;
    } catch (_e) {
      return false;
    }
  }

  function renderLogin() {
    appRoot.innerHTML = "";
    const wrap = el("div", { class: "adm-login-wrap" });
    const card = el("div", { class: "adm-login-card" });
    card.append(el("h1", { class: "adm-title" }, "NanoFarm Admin"));
    card.append(el("p", { class: "adm-subtitle" }, "Вход в панель управления контентом"));

    const loginField = el("div", { class: "adm-field" });
    loginField.append(el("label", null, "Логин"));
    const loginInput = el("input", { class: "adm-input", type: "text", autocomplete: "username", value: "admin" });
    loginField.append(loginInput);
    card.append(loginField);

    const passField = el("div", { class: "adm-field" });
    passField.append(el("label", null, "Пароль"));
    const passInput = el("input", { class: "adm-input", type: "password", autocomplete: "current-password", value: "admin" });
    passField.append(passInput);
    card.append(passField);

    const status = el("div", { class: "adm-status", "data-admin-status": "login" });
    card.append(status);

    const submit = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Войти");
    submit.addEventListener("click", async () => {
      status.textContent = "Проверка...";
      status.classList.remove("error");
      try {
        const data = await fetchWithAdminFallback("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ login: loginInput.value.trim(), password: passInput.value }),
        }).then(async (res) => {
          if (!res.ok) {
            const payload = await res.json().catch(() => ({}));
            throw new Error(payload.error || "Ошибка входа");
          }
          return res.json();
        });
        saveTokens(data.token, state.refreshToken);
        state.role = data.role || "admin";
        renderApp();
      } catch (error) {
        status.textContent = error.message;
        status.classList.add("error");
      }
    });
    card.append(submit);

    wrap.append(card);
    appRoot.append(wrap);
  }

  function sidebarButton(id) {
    const btn = el("button", { class: `adm-nav-btn${state.section === id ? " is-active" : ""}`, type: "button" }, ENTITY_LABELS[id]);
    btn.addEventListener("click", () => {
      state.section = id;
      renderApp();
    });
    return btn;
  }

  function renderShellContent(container) {
    if (state.section === "dashboard") {
      renderDashboard(container);
      return;
    }
    if (state.section === "media") {
      renderMedia(container);
      return;
    }
    if (state.section === "seo") {
      renderSeoTools(container);
      return;
    }
    renderEntitySection(container, state.section);
  }

  function renderApp() {
    appRoot.innerHTML = "";
    const layout = el("div", { class: "adm-layout" });
    const sidebar = el("aside", { class: "adm-sidebar" });
    sidebar.append(el("div", { class: "adm-brand" }, "NanoFarm Admin"));
    const nav = el("nav", { class: "adm-nav" });
    ["dashboard", "products", "categories", "partners", "news", "pages", "media", "seo"].forEach((id) => nav.append(sidebarButton(id)));
    sidebar.append(nav);
    layout.append(sidebar);

    const main = el("main", { class: "adm-main" });
    const top = el("div", { class: "adm-topbar" });
    top.append(el("div", null, ENTITY_LABELS[state.section] || "Admin"));
    const actions = el("div");
    const logout = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Выйти");
    logout.addEventListener("click", async () => {
      await fetchWithAdminFallback("/api/admin/logout", { method: "POST", credentials: "same-origin" }).catch(() => null);
      saveTokens("", "");
      renderLogin();
    });
    actions.append(logout);
    top.append(actions);
    main.append(top);

    const content = el("section", { class: "adm-content" });
    main.append(content);
    layout.append(main);
    appRoot.append(layout);
    renderShellContent(content);
  }

  function statusChip(status) {
    const chip = el("span", { class: `adm-chip adm-chip-${status || "draft"}` }, statusText(status));
    return chip;
  }

  async function renderDashboard(container) {
    container.innerHTML = "";
    const card = el("div", { class: "adm-card" });
    card.append(el("h2", null, "Обзор"));
    card.append(el("div", { class: "adm-status", "data-admin-status": "dash" }, "Загрузка..."));
    container.append(card);
    try {
      const data = await api("/api/admin/dashboard");
      const metrics = data.metrics || {};
      card.innerHTML = "<h2>Обзор сайта</h2>";
      const grid = el("div", { class: "adm-kpi-grid" });
      [
        ["Товары", data.totals?.products || 0],
        ["Категории", data.totals?.categories || 0],
        ["Партнёры", data.totals?.partners || 0],
        ["Новости", data.totals?.news || 0],
        ["Страницы (CMS)", data.totals?.pages || 0],
        ["Опубликовано", data.statuses?.published || 0],
        ["Черновики", data.statuses?.draft || 0],
        ["Скрыто", data.statuses?.hidden || 0],
        ["Посещения за день", metrics.visitsDay || 0],
        ["Посещения за неделю", metrics.visitsWeek || 0],
        ["Посещения за месяц", metrics.visitsMonth || 0],
      ].forEach(([label, value]) => {
        const box = el("div", { class: "adm-kpi" });
        box.append(el("div", { class: "adm-kpi-label" }, label));
        box.append(el("div", { class: "adm-kpi-value" }, String(value)));
        grid.append(box);
      });
      card.append(grid);

      const latestCard = el("div", { class: "adm-card" });
      latestCard.append(el("h3", null, "Последние изменения"));
      const list = el("div");
      (data.latestChanges || []).forEach((row) => {
        list.append(el("div", null, `${row.changed_at} — ${row.entity_type} / ${row.action} (${row.changed_by})`));
      });
      latestCard.append(list);
      container.append(latestCard);
    } catch (error) {
      const status = card.querySelector("[data-admin-status]");
      if (status) {
        status.textContent = error.message;
        status.classList.add("error");
      }
    }
  }

  function normalizeEntityForForm(entityType, item) {
    const data = Object.assign(
      {
        id: "",
        slug: "",
        status: "draft",
        sortOrder: 0,
        featured: false,
        seo: {
          metaTitle: "",
          metaDescription: "",
          keywords: "",
          canonical: "",
          robots: "",
          ogImage: "",
          slug: "",
        },
      },
      item || {}
    );
    if (!data.seo || typeof data.seo !== "object") data.seo = {};
    data.seo = Object.assign(
      {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        canonical: "",
        robots: "",
        ogImage: "",
        slug: data.slug || "",
      },
      data.seo
    );
    if (entityType === "news" || entityType === "pages") {
      data.contentBlocks = Array.isArray(data.contentBlocks) ? data.contentBlocks : [];
    }
    return data;
  }

  function renderEntityTable(card, entityType, result) {
    const rows = result.items || [];
    state.lists[entityType] = rows;
    const selectedSet = state.selected[entityType] || new Set();
    const tableWrap = el("div", { class: "adm-table-wrap" });
    const table = el("table", { class: "adm-table" });
    const thead = el("thead");
    if (entityType === "products") {
      thead.innerHTML = `
      <tr>
        <th><input type="checkbox" data-select-all /></th>
        <th>Фото</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Партнёр</th>
        <th>Артикул</th>
        <th>Статус</th>
        <th>Порядок</th>
        <th>Рекомендуемый</th>
        <th>Действия</th>
      </tr>`;
    } else {
      thead.innerHTML = `
      <tr>
        <th><input type="checkbox" data-select-all /></th>
        <th>Системный ID</th>
        <th>Название</th>
        <th>Ссылка</th>
        <th>Статус</th>
        <th>Порядок</th>
        <th>Рекомендуемый</th>
        <th>Действия</th>
      </tr>`;
    }
    table.append(thead);
    const tbody = el("tbody");
    rows.forEach((row) => {
      const tr = el("tr");
      if (entityType === "products") {
        const image = row.image || (Array.isArray(row.gallery) && row.gallery[0]) || "";
        tr.innerHTML = `
        <td><input type="checkbox" data-row-id="${row.id}" ${selectedSet.has(row.id) ? "checked" : ""} /></td>
        <td>${image ? `<img src="${escapeHtml(image)}" alt="" style="width:46px;height:46px;object-fit:cover;border:1px solid #d8e1ef;border-radius:8px;" />` : "—"}</td>
        <td><input class="adm-input" data-inline-title="${row.id}" value="${escapeHtml(row.title || row.name || "")}" /></td>
        <td>${escapeHtml(row.categoryId || "—")}</td>
        <td>${escapeHtml(row.partnerId || "—")}</td>
        <td>${escapeHtml(row.article || "—")}</td>
        <td>
          <select class="adm-select" data-inline-status="${row.id}">
            ${["draft", "published", "hidden", "archived"].map((status) => `<option value="${status}" ${row.status === status ? "selected" : ""}>${statusText(status)}</option>`).join("")}
          </select>
        </td>
        <td><input class="adm-input" type="number" data-inline-sort="${row.id}" value="${Number(row.sortOrder || 0)}" style="width:85px" /></td>
        <td>${boolText(Boolean(row.featured))}</td>
        <td class="adm-actions">
          <button class="adm-btn adm-btn-ghost" type="button" data-edit-id="${row.id}">Редактировать</button>
          <button class="adm-btn adm-btn-danger" type="button" data-del-id="${row.id}">Удалить</button>
        </td>`;
      } else {
        tr.innerHTML = `
        <td><input type="checkbox" data-row-id="${row.id}" ${selectedSet.has(row.id) ? "checked" : ""} /></td>
        <td>${row.id}</td>
        <td><input class="adm-input" data-inline-title="${row.id}" value="${escapeHtml(row.title || row.name || "")}" /></td>
        <td>${row.slug || ""}</td>
        <td>
          <select class="adm-select" data-inline-status="${row.id}">
            ${["draft", "published", "hidden", "archived"].map((status) => `<option value="${status}" ${row.status === status ? "selected" : ""}>${statusText(status)}</option>`).join("")}
          </select>
        </td>
        <td><input class="adm-input" type="number" data-inline-sort="${row.id}" value="${Number(row.sortOrder || 0)}" style="width:85px" /></td>
        <td>${boolText(Boolean(row.featured))}</td>
        <td class="adm-actions">
          <button class="adm-btn adm-btn-ghost" type="button" data-edit-id="${row.id}">Редактировать</button>
          <button class="adm-btn adm-btn-danger" type="button" data-del-id="${row.id}">Удалить</button>
        </td>`;
      }
      tbody.append(tr);
    });
    table.append(tbody);
    tableWrap.append(table);
    card.append(tableWrap);

    const selectAll = table.querySelector("[data-select-all]");
    selectAll.addEventListener("change", () => {
      const set = new Set();
      if (selectAll.checked) rows.forEach((row) => set.add(row.id));
      state.selected[entityType] = set;
      renderApp();
    });
    table.querySelectorAll("[data-row-id]").forEach((box) => {
      box.addEventListener("change", () => {
        if (!state.selected[entityType]) state.selected[entityType] = new Set();
        if (box.checked) state.selected[entityType].add(box.dataset.rowId);
        else state.selected[entityType].delete(box.dataset.rowId);
      });
    });
    table.querySelectorAll("[data-edit-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const row = rows.find((item) => item.id === button.dataset.editId);
        openEntityModal(entityType, row);
      });
    });
    table.querySelectorAll("[data-del-id]").forEach((button) => {
      button.addEventListener("click", async () => {
        if (!confirm("Удалить запись?")) return;
        try {
          await api(`/api/admin/${entityType}/${button.dataset.delId}`, { method: "DELETE" });
          setStatus("Запись удалена");
          renderApp();
        } catch (error) {
          setStatus(error.message, true);
        }
      });
    });
    table.querySelectorAll("[data-inline-title], [data-inline-status], [data-inline-sort]").forEach((input) => {
      input.addEventListener("change", async () => {
        const id = input.dataset.inlineTitle || input.dataset.inlineStatus || input.dataset.inlineSort;
        const row = rows.find((item) => item.id === id);
        if (!row) return;
        const titleInput = table.querySelector(`[data-inline-title="${id}"]`);
        const statusInput = table.querySelector(`[data-inline-status="${id}"]`);
        const sortInput = table.querySelector(`[data-inline-sort="${id}"]`);
        const payload = {
          title: titleInput ? titleInput.value.trim() : row.title,
          name: titleInput ? titleInput.value.trim() : row.name,
          status: statusInput ? statusInput.value : row.status,
          sortOrder: sortInput ? Number(sortInput.value || 0) : row.sortOrder || 0,
        };
        try {
          await api(`/api/admin/${entityType}/${id}/inline`, { method: "PATCH", body: payload });
          setStatus("Быстрое изменение сохранено");
        } catch (error) {
          setStatus(error.message, true);
        }
      });
    });
  }

  async function renderEntitySection(container, entityType) {
    container.innerHTML = "";
    const card = el("div", { class: "adm-card" });
    card.append(el("h2", null, ENTITY_LABELS[entityType]));

    const filter = state.filters[entityType] || { q: "", status: "", page: 1, limit: 20, sortBy: "sort_order", sortDir: "asc" };
    state.filters[entityType] = filter;

    const toolbar = el("div", { class: "adm-toolbar" });
    const qInput = el("input", { class: "adm-input", placeholder: "Поиск", value: filter.q || "" });
    const statusSelect = el("select", { class: "adm-select" });
    ["", "published", "draft", "hidden", "archived"].forEach((status) => {
      const option = el("option", { value: status }, status ? statusText(status) : "Все статусы");
      if (status === filter.status) option.selected = true;
      statusSelect.append(option);
    });
    const sortSelect = el("select", { class: "adm-select" });
    [
      { value: "sort_order:asc", label: "Порядок (по возрастанию)" },
      { value: "updated_at:desc", label: "Сначала новые изменения" },
      { value: "title:asc", label: "Название (А-Я)" },
      { value: "status:asc", label: "Статус" },
    ].forEach(({ value, label }) => {
      const option = el("option", { value }, label);
      if (`${filter.sortBy}:${filter.sortDir}` === value) option.selected = true;
      sortSelect.append(option);
    });
    const bulkSelect = el("select", { class: "adm-select" });
    BULK_ACTIONS.forEach((action) => {
      bulkSelect.append(el("option", { value: action.value }, action.label));
    });
    const addBtn = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Добавить");
    toolbar.append(qInput, statusSelect, sortSelect, bulkSelect, addBtn);
    card.append(toolbar);

    const status = el("div", { class: "adm-status", "data-admin-status": "entity" }, "Загрузка...");
    card.append(status);
    container.append(card);

    qInput.addEventListener("change", () => {
      filter.q = qInput.value.trim();
      filter.page = 1;
      renderApp();
    });
    statusSelect.addEventListener("change", () => {
      filter.status = statusSelect.value;
      filter.page = 1;
      renderApp();
    });
    sortSelect.addEventListener("change", () => {
      const [sortBy, sortDir] = sortSelect.value.split(":");
      filter.sortBy = sortBy;
      filter.sortDir = sortDir;
      renderApp();
    });
    bulkSelect.addEventListener("change", async () => {
      const action = bulkSelect.value;
      if (!action) return;
      const ids = Array.from(state.selected[entityType] || []);
      if (!ids.length) {
        setStatus("Выберите записи для bulk action", true);
        return;
      }
      if (action === "delete" && !confirm("Удалить выбранные записи?")) return;
      try {
        await api(`/api/admin/${entityType}/bulk`, {
          method: "POST",
          body: { action, ids },
        });
        state.selected[entityType] = new Set();
        const actionLabel = BULK_ACTIONS.find((item) => item.value === action)?.label || action;
        setStatus(`Выполнено: ${actionLabel}`);
        renderApp();
      } catch (error) {
        setStatus(error.message, true);
      }
    });
    addBtn.addEventListener("click", () => openEntityModal(entityType, null));

    try {
      const query = new URLSearchParams({
        q: filter.q || "",
        status: filter.status || "",
        page: String(filter.page || 1),
        limit: String(filter.limit || 20),
        sortBy: filter.sortBy || "sort_order",
        sortDir: filter.sortDir || "asc",
      });
      const result = await api(`/api/admin/${entityType}?${query}`);
      status.textContent = `Всего: ${result.total}`;
      status.classList.remove("error");
      renderEntityTable(card, entityType, result);
    } catch (error) {
      status.textContent = error.message;
      status.classList.add("error");
    }
  }

  function addModalField(form, label, input, fullWidth) {
    const wrap = el("div", { class: `adm-field${fullWidth ? " adm-field-full" : ""}` });
    wrap.append(el("label", null, label));
    wrap.append(input);
    form.append(wrap);
    return wrap;
  }

  function addSectionTitle(form, title) {
    const wrap = el("div", { class: "adm-field adm-field-full" });
    wrap.innerHTML = `<h4 class="adm-section-title">${escapeHtml(title)}</h4>`;
    form.append(wrap);
  }

  async function openMediaLibraryPicker(selectedItems) {
    const selectedPaths = new Set((selectedItems || []).map((item) => item.path));
    const mediaRows = (await api("/api/admin/media")).map(mapMediaRow).filter((item) => item.path);
    return new Promise((resolve) => {
      const overlay = el("div", { class: "adm-modal is-open" });
      const panel = el("div", { class: "adm-modal-panel" });
      panel.append(el("h3", null, "Выбор из медиатеки"));
      const list = el("div", { class: "adm-media-grid" });
      const localSelected = new Set(selectedPaths);

      function renderLibrary() {
        list.innerHTML = "";
        mediaRows.forEach((media) => {
          const card = el("div", { class: "adm-media-item" });
          card.innerHTML = `
            <img class="adm-media-preview" src="${escapeHtml(media.path)}" alt="" />
            <div style="margin-top:8px; word-break:break-all; font-size:12px;">${escapeHtml(media.path)}</div>
          `;
          const toggle = el(
            "button",
            { class: `adm-btn ${localSelected.has(media.path) ? "adm-btn-primary" : "adm-btn-ghost"}`, type: "button", style: "margin-top:8px" },
            localSelected.has(media.path) ? "Выбрано" : "Выбрать"
          );
          toggle.addEventListener("click", () => {
            if (localSelected.has(media.path)) localSelected.delete(media.path);
            else localSelected.add(media.path);
            renderLibrary();
          });
          card.append(toggle);
          list.append(card);
        });
      }

      renderLibrary();
      panel.append(list);
      const controls = el("div", { style: "display:flex;gap:8px;justify-content:flex-end;margin-top:12px" });
      const cancel = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Отмена");
      const apply = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Добавить выбранные");
      cancel.addEventListener("click", () => {
        overlay.remove();
        resolve([]);
      });
      apply.addEventListener("click", () => {
        const picked = mediaRows.filter((media) => localSelected.has(media.path));
        overlay.remove();
        resolve(picked);
      });
      controls.append(cancel, apply);
      panel.append(controls);
      overlay.append(panel);
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.remove();
          resolve([]);
        }
      });
      document.body.append(overlay);
    });
  }

  function openImageCropper(sourcePath) {
    return new Promise((resolve) => {
      const overlay = el("div", { class: "adm-modal is-open" });
      const panel = el("div", { class: "adm-modal-panel" });
      panel.append(el("h3", null, "Обрезка изображения"));

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = sourcePath;

      const controls = el("div", { class: "adm-form-grid", style: "margin-bottom:10px" });
      const aspect = el("select", { class: "adm-select" });
      [
        { value: "free", label: "Свободно" },
        { value: "1:1", label: "1:1" },
        { value: "4:3", label: "4:3" },
        { value: "16:9", label: "16:9" },
      ].forEach((opt) => {
        const option = el("option", { value: opt.value }, opt.label);
        aspect.append(option);
      });
      const zoom = el("input", { class: "adm-input", type: "range", min: "1", max: "3", step: "0.01", value: "1.3" });
      const offsetX = el("input", { class: "adm-input", type: "range", min: "-100", max: "100", step: "1", value: "0" });
      const offsetY = el("input", { class: "adm-input", type: "range", min: "-100", max: "100", step: "1", value: "0" });
      addModalField(controls, "Соотношение", aspect);
      addModalField(controls, "Масштаб", zoom);
      addModalField(controls, "Смещение X", offsetX);
      addModalField(controls, "Смещение Y", offsetY);
      panel.append(controls);

      const canvas = el("canvas", { class: "adm-crop-canvas", width: "800", height: "600" });
      panel.append(canvas);
      const ctx = canvas.getContext("2d");

      function drawPreview() {
        if (!img.naturalWidth || !img.naturalHeight) return;
        const aspectValue = aspect.value;
        const zoomValue = Number(zoom.value || 1.3);
        let cropW = img.naturalWidth / zoomValue;
        let cropH = img.naturalHeight / zoomValue;
        if (aspectValue !== "free") {
          const [aw, ah] = aspectValue.split(":").map(Number);
          const ratio = aw / ah;
          if (cropW / cropH > ratio) {
            cropW = cropH * ratio;
          } else {
            cropH = cropW / ratio;
          }
        }
        const maxShiftX = Math.max(0, (img.naturalWidth - cropW) / 2);
        const maxShiftY = Math.max(0, (img.naturalHeight - cropH) / 2);
        const sx = Math.max(
          0,
          Math.min(
            img.naturalWidth - cropW,
            img.naturalWidth / 2 - cropW / 2 + (Number(offsetX.value || 0) / 100) * maxShiftX
          )
        );
        const sy = Math.max(
          0,
          Math.min(
            img.naturalHeight - cropH,
            img.naturalHeight / 2 - cropH / 2 + (Number(offsetY.value || 0) / 100) * maxShiftY
          )
        );
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, sx, sy, cropW, cropH, 0, 0, canvas.width, canvas.height);
      }

      img.onload = () => drawPreview();
      [aspect, zoom, offsetX, offsetY].forEach((control) => {
        control.addEventListener("input", drawPreview);
        control.addEventListener("change", drawPreview);
      });

      const buttons = el("div", { style: "display:flex;gap:8px;justify-content:flex-end;margin-top:12px" });
      const cancel = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Отмена");
      const save = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Сохранить обрезку");
      cancel.addEventListener("click", () => {
        overlay.remove();
        resolve(null);
      });
      save.addEventListener("click", () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              overlay.remove();
              resolve(null);
              return;
            }
            const file = new File([blob], `crop-${Date.now()}.jpg`, { type: "image/jpeg" });
            overlay.remove();
            resolve(file);
          },
          "image/jpeg",
          0.92
        );
      });
      buttons.append(cancel, save);
      panel.append(buttons);

      overlay.append(panel);
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.remove();
          resolve(null);
        }
      });
      document.body.append(overlay);
    });
  }

  function createProductGalleryEditor(initialItems) {
    const wrap = el("div", { class: "adm-field adm-field-full" });
    const heading = el("label", null, "Галерея изображений");
    const zone = el("div", { class: "adm-upload-zone" }, "Перетащите изображения сюда или выберите через кнопку");
    const controls = el("div", { style: "display:flex;gap:8px;margin-top:10px;flex-wrap:wrap" });
    const uploadBtn = el("button", { type: "button", class: "adm-btn adm-btn-primary" }, "Загрузить изображения");
    const libraryBtn = el("button", { type: "button", class: "adm-btn adm-btn-ghost" }, "Выбрать из медиатеки");
    const hiddenInput = el("input", { type: "file", accept: "image/jpeg,image/png,image/webp", multiple: "multiple", style: "display:none" });
    controls.append(uploadBtn, libraryBtn, hiddenInput);
    const list = el("div", { class: "adm-gallery-grid" });
    const status = el("div", { class: "adm-status" });
    wrap.append(heading, zone, controls, status, list);

    let items = normalizeGalleryItems({ galleryAssets: initialItems });

    function ensureSingleMain() {
      if (!items.length) return;
      if (!items.some((item) => item.isMain)) items[0].isMain = true;
      let metMain = false;
      items.forEach((item) => {
        if (item.isMain && !metMain) {
          metMain = true;
          return;
        }
        if (item.isMain && metMain) item.isMain = false;
      });
      items.forEach((item, index) => {
        item.order = index;
      });
    }

    function renderItems() {
      ensureSingleMain();
      list.innerHTML = "";
      items.forEach((item, index) => {
        const card = el("div", { class: "adm-gallery-item" });
        const badge = item.isMain ? `<span class="adm-gallery-main-badge">Главное</span>` : "";
        card.innerHTML = `
          <div class="adm-gallery-image-wrap">
            ${badge}
            <img class="adm-gallery-image" src="${escapeHtml(item.path)}" alt="" />
          </div>
        `;
        const fields = el("div", { class: "adm-gallery-meta" });
        const altInput = el("input", { class: "adm-input", placeholder: "Alt-текст", value: item.altText || "" });
        const titleInput = el("input", { class: "adm-input", placeholder: "Подпись / title", value: item.caption || "" });
        altInput.addEventListener("change", () => (item.altText = altInput.value.trim()));
        titleInput.addEventListener("change", () => (item.caption = titleInput.value.trim()));
        fields.append(altInput, titleInput);

        const actionBar = el("div", { class: "adm-gallery-actions" });
        const mainBtn = el("button", { type: "button", class: "adm-btn adm-btn-ghost" }, "Сделать главным");
        const cropBtn = el("button", { type: "button", class: "adm-btn adm-btn-ghost" }, "Обрезать");
        const upBtn = el("button", { type: "button", class: "adm-btn adm-btn-ghost" }, "Вверх");
        const downBtn = el("button", { type: "button", class: "adm-btn adm-btn-ghost" }, "Вниз");
        const removeBtn = el("button", { type: "button", class: "adm-btn adm-btn-danger" }, "Удалить");

        mainBtn.addEventListener("click", () => {
          items.forEach((entry) => (entry.isMain = false));
          item.isMain = true;
          renderItems();
        });
        cropBtn.addEventListener("click", async () => {
          try {
            status.textContent = "Открыт редактор обрезки...";
            const cropped = await openImageCropper(item.path);
            if (!cropped) {
              status.textContent = "";
              return;
            }
            status.textContent = "Загрузка обрезанного изображения...";
            const uploaded = await uploadImageToMedia(cropped);
            item.mediaId = uploaded.id;
            item.path = uploaded.path;
            status.textContent = "Обрезанное изображение сохранено";
            renderItems();
          } catch (error) {
            status.textContent = error.message;
            status.classList.add("error");
          }
        });
        upBtn.addEventListener("click", () => {
          if (index <= 0) return;
          const temp = items[index - 1];
          items[index - 1] = items[index];
          items[index] = temp;
          renderItems();
        });
        downBtn.addEventListener("click", () => {
          if (index >= items.length - 1) return;
          const temp = items[index + 1];
          items[index + 1] = items[index];
          items[index] = temp;
          renderItems();
        });
        removeBtn.addEventListener("click", () => {
          items = items.filter((entry) => entry.id !== item.id);
          renderItems();
        });

        actionBar.append(mainBtn, cropBtn, upBtn, downBtn, removeBtn);
        card.append(fields, actionBar);
        list.append(card);
      });
    }

    async function handleFiles(files) {
      const fileList = Array.from(files || []);
      if (!fileList.length) return;
      status.classList.remove("error");
      for (const file of fileList) {
        const validationError = validateImageFile(file);
        if (validationError) {
          status.textContent = `${file.name}: ${validationError}`;
          status.classList.add("error");
          continue;
        }
        try {
          status.textContent = `Загрузка ${file.name}...`;
          const uploaded = await uploadImageToMedia(file);
          items.push({
            id: `gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            mediaId: uploaded.id,
            path: uploaded.path,
            altText: uploaded.altText || "",
            caption: uploaded.caption || "",
            isMain: items.length === 0,
            order: items.length,
          });
          renderItems();
        } catch (error) {
          status.textContent = `${file.name}: ${error.message}`;
          status.classList.add("error");
        }
      }
      status.textContent = status.classList.contains("error")
        ? status.textContent
        : "Изображения добавлены";
    }

    uploadBtn.addEventListener("click", () => hiddenInput.click());
    hiddenInput.addEventListener("change", () => handleFiles(hiddenInput.files));
    libraryBtn.addEventListener("click", async () => {
      try {
        const picked = await openMediaLibraryPicker(items);
        if (!picked.length) return;
        picked.forEach((media) => {
          if (items.some((entry) => entry.path === media.path)) return;
          items.push({
            id: `gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            mediaId: media.id,
            path: media.path,
            altText: media.altText || "",
            caption: media.caption || "",
            isMain: items.length === 0,
            order: items.length,
          });
        });
        renderItems();
      } catch (error) {
        status.textContent = error.message;
        status.classList.add("error");
      }
    });

    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-drag");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-drag"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-drag");
      handleFiles(event.dataTransfer.files);
    });

    renderItems();
    wrap.getItems = () =>
      items.map((entry, index) => ({
        mediaId: entry.mediaId || "",
        path: entry.path,
        altText: entry.altText || "",
        caption: entry.caption || "",
        isMain: Boolean(entry.isMain),
        order: index,
      }));
    return wrap;
  }

  function createNewsBlocksEditor(item) {
    const wrap = el("div", { class: "adm-field adm-field-full" });
    wrap.append(el("label", null, "Блоки статьи"));
    const list = el("div", { class: "adm-block-list" });
    const blocks = Array.isArray(item.contentBlocks) ? item.contentBlocks.slice() : [];

    function renderBlocks() {
      list.innerHTML = "";
      blocks.forEach((block, index) => {
        const row = el("div", { class: "adm-block-item" });
        const head = el("div", { class: "adm-block-head" });
        const title = el("div", { class: "adm-block-title" }, `Блок ${index + 1}: ${BLOCK_TYPE_LABELS[block.type] || "Текст"}`);
        const actions = el("div", { class: "adm-block-actions" });
        const moveUp = el("button", { type: "button", class: "adm-btn-icon", title: "Переместить вверх" }, "↑");
        const moveDown = el("button", { type: "button", class: "adm-btn-icon", title: "Переместить вниз" }, "↓");
        const remove = el("button", { type: "button", class: "adm-btn-icon", title: "Удалить блок" }, "×");
        actions.append(moveUp, moveDown, remove);
        head.append(title, actions);

        const type = el("select", { class: "adm-select" });
        ["heading", "paragraph", "quote", "callout", "image"].forEach((kind) => {
          const opt = el("option", { value: kind }, BLOCK_TYPE_LABELS[kind]);
          if (block.type === kind) opt.selected = true;
          type.append(opt);
        });
        const text = el("textarea", { class: "adm-textarea" });
        text.value = block.text || block.url || "";
        remove.addEventListener("click", () => {
          blocks.splice(index, 1);
          renderBlocks();
        });
        moveUp.addEventListener("click", () => {
          if (index <= 0) return;
          const temp = blocks[index - 1];
          blocks[index - 1] = blocks[index];
          blocks[index] = temp;
          renderBlocks();
        });
        moveDown.addEventListener("click", () => {
          if (index >= blocks.length - 1) return;
          const temp = blocks[index + 1];
          blocks[index + 1] = blocks[index];
          blocks[index] = temp;
          renderBlocks();
        });
        type.addEventListener("change", () => {
          blocks[index].type = type.value;
          title.textContent = `Блок ${index + 1}: ${BLOCK_TYPE_LABELS[type.value] || "Текст"}`;
        });
        text.addEventListener("change", () => {
          if (blocks[index].type === "image") blocks[index].url = text.value.trim();
          else blocks[index].text = text.value.trim();
        });
        row.append(head, type, text);
        list.append(row);
      });
    }

    const add = el("button", { type: "button", class: "adm-btn adm-btn-ghost" }, "Добавить блок");
    add.addEventListener("click", () => {
      blocks.push({ id: `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, type: "paragraph", text: "" });
      renderBlocks();
    });

    renderBlocks();
    wrap.append(list, add);
    wrap.getBlocks = () => blocks;
    return wrap;
  }

  function openEntityModal(entityType, sourceItem) {
    const item = normalizeEntityForForm(entityType, sourceItem || {});
    const modal = el("div", { class: "adm-modal is-open" });
    const panel = el("div", { class: "adm-modal-panel" });
    panel.append(el("h3", null, sourceItem ? "Редактирование" : "Создание"));
    const form = el("div", { class: "adm-form-grid" });

    const idInput = el("input", { class: "adm-input", value: item.id || "", placeholder: "system-id" });
    const slugInput = el("input", { class: "adm-input", value: item.slug || "" });
    const titleInput = el("input", { class: "adm-input", value: item.title || item.name || "" });
    const statusInput = el("select", { class: "adm-select" });
    ["draft", "published", "hidden", "archived"].forEach((status) => {
      const option = el("option", { value: status }, statusText(status));
      if (item.status === status) option.selected = true;
      statusInput.append(option);
    });
    const sortInput = el("input", { class: "adm-input", type: "number", value: String(item.sortOrder || 0) });
    const featuredInput = el("input", { type: "checkbox" });
    featuredInput.checked = Boolean(item.featured);

    if (entityType !== "products") {
      addModalField(form, "URL страницы / Ссылка", slugInput);
      addModalField(form, entityType === "news" ? "Заголовок" : "Название", titleInput);
      addModalField(form, "Статус публикации", statusInput);
      addModalField(form, "Порядок отображения", sortInput);
      addModalField(form, "Рекомендуемый", featuredInput);
    }

    function addTextArea(label, value, fullWidth) {
      const area = el("textarea", { class: "adm-textarea" });
      area.value = value || "";
      addModalField(form, label, area, fullWidth);
      return area;
    }

    let newsBlocksEditor = null;
    let galleryEditor = null;
    let translationStatusWrap = null;
    let translationStatusBody = null;
    let translationStatusMeta = null;
    let refreshTranslationsBtn = null;
    let retranslateBtn = null;
    let fields = {};
    if (entityType === "products") {
      addSectionTitle(form, "Основная информация");
      addModalField(form, "Название", titleInput);
      addModalField(form, "Категория", (fields.categoryId = el("input", { class: "adm-input", value: item.categoryId || "" })));
      addModalField(form, "Партнёр", (fields.partnerId = el("input", { class: "adm-input", value: item.partnerId || "" })));
      fields.article = el("input", { class: "adm-input", value: item.article || "" });
      addModalField(form, "Артикул", fields.article);

      addSectionTitle(form, "Описание");
      fields.shortDesc = addTextArea("Краткое описание", item.shortDesc || "", true);
      fields.description = addTextArea("Полное описание", item.description || "", true);
      fields.specs = addTextArea("Характеристики товара (по строкам)", Array.isArray(item.specs) ? item.specs.join("\n") : "", true);
      fields.tags = el("input", { class: "adm-input", value: Array.isArray(item.tags) ? item.tags.join(", ") : "" });
      addModalField(form, "Теги (через запятую)", fields.tags, true);

      addSectionTitle(form, "Медиа");
      galleryEditor = createProductGalleryEditor(
        normalizeGalleryItems(item)
      );
      form.append(galleryEditor);

      addSectionTitle(form, "Коммерческая информация");
      fields.price = el("input", { class: "adm-input", type: "number", value: item.price == null ? "" : String(item.price) });
      fields.priceType = el("select", { class: "adm-select" });
      [
        { value: "fixed", label: "Фиксированная цена" },
        { value: "request", label: "По запросу" },
      ].forEach((type) => {
        const option = el("option", { value: type.value }, type.label);
        if ((item.priceType || "fixed") === type.value) option.selected = true;
        fields.priceType.append(option);
      });
      fields.availability = el("select", { class: "adm-select" });
      [
        { value: "in_stock", label: "В наличии" },
        { value: "out_of_stock", label: "Нет в наличии" },
      ].forEach((optionData) => {
        const option = el("option", { value: optionData.value }, optionData.label);
        if (String(item.availability || "in_stock") === optionData.value) option.selected = true;
        fields.availability.append(option);
      });
      addModalField(form, "Цена", fields.price);
      addModalField(form, "Тип цены", fields.priceType);
      addModalField(form, "Наличие", fields.availability);

      addSectionTitle(form, "Публикация");
      addModalField(form, "URL страницы / Ссылка", slugInput);
      addModalField(form, "Статус публикации", statusInput);
      addModalField(form, "Порядок отображения", sortInput);
      addModalField(form, "Рекомендуемый", featuredInput);

      addSectionTitle(form, "SEO");
    } else if (entityType === "categories") {
      addModalField(form, "URL страницы / Ссылка", slugInput);
      fields.shortDesc = addTextArea("Краткое описание", item.shortDesc || "", true);
      fields.description = addTextArea("Описание", item.description || "", true);
      fields.image = el("input", { class: "adm-input", value: item.image || "" });
      addModalField(form, "Изображение URL", fields.image, true);
    } else if (entityType === "partners") {
      addModalField(form, "URL страницы / Ссылка", slugInput);
      fields.country = el("input", { class: "adm-input", value: item.country || "" });
      fields.website = el("input", { class: "adm-input", value: item.website || "" });
      fields.logo = el("input", { class: "adm-input", value: item.logo || "" });
      fields.contact = addTextArea("Контактные данные", item.contactInfo || "", true);
      fields.description = addTextArea("Описание", item.description || "", true);
      addModalField(form, "Страна", fields.country);
      addModalField(form, "Сайт", fields.website);
      addModalField(form, "Логотип URL", fields.logo);
    } else if (entityType === "news") {
      addModalField(form, "URL страницы / Ссылка", slugInput);
      fields.category = el("input", { class: "adm-input", value: item.category || "" });
      fields.type = el("select", { class: "adm-select" });
      [
        { value: "news", label: "Новость" },
        { value: "project", label: "Проект" },
        { value: "site-update", label: "Обновление сайта" },
        { value: "other", label: "Другое" },
      ].forEach((type) => {
        const option = el("option", { value: type.value }, type.label);
        if ((item.type || "news") === type.value) option.selected = true;
        fields.type.append(option);
      });
      fields.publicationDate = el("input", { class: "adm-input", type: "date", value: (item.publicationDate || item.date || "").slice(0, 10) });
      fields.author = el("input", { class: "adm-input", value: item.author || "" });
      fields.excerpt = addTextArea("Краткое описание", item.excerpt || "", true);
      fields.heroImage = el("input", { class: "adm-input", value: item.heroImage || item.image || "" });
      fields.tags = el("input", { class: "adm-input", value: Array.isArray(item.tags) ? item.tags.join(", ") : "" });
      addModalField(form, "Категория новости", fields.category);
      addModalField(form, "Тип", fields.type);
      addModalField(form, "Дата публикации", fields.publicationDate);
      addModalField(form, "Автор", fields.author);
      addModalField(form, "Главное изображение", fields.heroImage, true);
      addModalField(form, "Теги", fields.tags, true);
      newsBlocksEditor = createNewsBlocksEditor(item);
      form.append(newsBlocksEditor);
    } else if (entityType === "pages") {
      fields.excerpt = addTextArea("Краткое описание (лид)", item.excerpt || "", true);
      fields.description = addTextArea("Доп. текст / описание", item.description || "", true);
      newsBlocksEditor = createNewsBlocksEditor(item);
      form.append(newsBlocksEditor);
    }

    const seoTitle = el("input", { class: "adm-input", value: item.seo.metaTitle || item.seo.title || "" });
    const seoDesc = addTextArea("SEO-описание", item.seo.metaDescription || item.seo.description || "", true);
    const seoKeywords = el("input", { class: "adm-input", value: item.seo.keywords || "" });
    addModalField(form, "SEO-заголовок", seoTitle, true);
    addModalField(form, "SEO-ключевые слова", seoKeywords, true);

    if (sourceItem && sourceItem.id && ["products", "categories", "partners", "news", "pages"].includes(entityType)) {
      addSectionTitle(form, "AI-переводы");
      translationStatusWrap = el("div", { class: "adm-field adm-field-full" });
      translationStatusMeta = el("div", { class: "adm-status" }, "Загрузка статусов переводов...");
      translationStatusBody = el("div", { style: "display:grid; gap:8px;" });
      const actions = el("div", { style: "display:flex; gap:8px; flex-wrap:wrap;" });
      refreshTranslationsBtn = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Обновить статусы");
      retranslateBtn = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Перегенерировать переводы");
      actions.append(refreshTranslationsBtn, retranslateBtn);
      translationStatusWrap.append(translationStatusMeta, actions, translationStatusBody);
      form.append(translationStatusWrap);
    }

    if (entityType === "products") {
      const technicalWrap = el("details", { class: "adm-field adm-field-full" });
      const summary = el("summary", null, "Служебное");
      technicalWrap.append(summary);
      const technicalGrid = el("div", { class: "adm-form-grid", style: "padding-top:10px" });
      const idWrap = el("div", { class: "adm-field" });
      idWrap.append(el("label", null, "Системный ID"));
      idWrap.append(idInput);
      technicalGrid.append(idWrap);
      technicalWrap.append(technicalGrid);
      form.append(technicalWrap);
    } else {
      addModalField(form, "Системный ID", idInput);
    }

    panel.append(form);

    const controls = el("div", { style: "display:flex; gap:8px; justify-content:flex-end; margin-top:12px" });
    const cancel = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Отмена");
    const save = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Сохранить");
    controls.append(cancel, save);
    panel.append(controls);
    modal.append(panel);
    document.body.append(modal);

    cancel.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.remove();
    });

    async function loadProductTranslations() {
      if (!sourceItem || !sourceItem.id || !translationStatusBody) return;
      translationStatusMeta.textContent = "Загрузка статусов переводов...";
      translationStatusMeta.classList.remove("error");
      translationStatusBody.innerHTML = "";
      try {
        const result = await api(`/api/admin/translations/${entityType}/${sourceItem.id}`);
        const items = Array.isArray(result.items) ? result.items : [];
        translationStatusMeta.textContent = `Исходный язык: ${result.sourceLanguage || "ru"}. Целевые: ${(result.targetLanguages || []).join(", ") || "—"}`;
        if (!items.length) {
          translationStatusBody.append(el("div", null, "Для этого товара переводы ещё не запускались."));
          return;
        }
        items.forEach((entry) => {
          const row = el("div", { class: "adm-card", style: "padding:10px 12px;" });
          const st = entry.translationStatus || entry.status;
          row.append(
            el("div", null, `Язык: ${entry.language || "—"}`),
            el("div", null, `Статус: ${translationStatusLabel(st)}`),
            el("div", null, `AI: ${entry.translatedByAi || entry.machineTranslated ? "да" : "нет"} · Проверка: ${entry.needsReview !== false ? "нужна" : "нет"}`),
            el("div", null, `Попыток: ${Number(entry.attempts || 0)}`),
            el("div", null, `Провайдер: ${entry.provider || "—"}`)
          );
          if (entry.errorMessage) {
            const err = el("div", { class: "adm-status error" }, `Ошибка: ${entry.errorMessage}`);
            row.append(err);
          }
          translationStatusBody.append(row);
        });
      } catch (error) {
        translationStatusMeta.textContent = error.message;
        translationStatusMeta.classList.add("error");
      }
    }

    if (refreshTranslationsBtn) {
      refreshTranslationsBtn.addEventListener("click", () => {
        loadProductTranslations();
      });
    }
    if (retranslateBtn) {
      retranslateBtn.addEventListener("click", async () => {
        try {
          await api(`/api/admin/translations/${entityType}/${sourceItem.id}/retranslate`, {
            method: "POST",
            body: { force: true },
          });
          setStatus("Перегенерация переводов запущена");
          loadProductTranslations();
        } catch (error) {
          setStatus(error.message, true);
        }
      });
    }
    if (translationStatusWrap) loadProductTranslations();

    save.addEventListener("click", async () => {
      const payload = {
        ...(sourceItem || {}),
        id: idInput.value.trim(),
        slug: slugInput.value.trim(),
        status: statusInput.value,
        sortOrder: Number(sortInput.value || 0),
        featured: Boolean(featuredInput.checked),
        title: titleInput.value.trim(),
        name: titleInput.value.trim(),
        seo: {
          ...(item.seo || {}),
          metaTitle: seoTitle.value.trim(),
          metaDescription: seoDesc.value.trim(),
          keywords: seoKeywords.value.trim(),
          slug: slugInput.value.trim(),
        },
      };
      if (entityType === "products") {
        const galleryItems = galleryEditor ? galleryEditor.getItems() : [];
        const sortedGallery = galleryItems
          .slice()
          .sort((a, b) => {
            if (a.isMain && !b.isMain) return -1;
            if (!a.isMain && b.isMain) return 1;
            return (a.order || 0) - (b.order || 0);
          });
        payload.article = fields.article.value.trim();
        payload.categoryId = fields.categoryId.value.trim();
        payload.partnerId = fields.partnerId.value.trim();
        payload.price = fields.price.value ? Number(fields.price.value) : null;
        payload.priceType = fields.priceType.value;
        payload.availability = fields.availability.value.trim();
        payload.shortDesc = fields.shortDesc.value.trim();
        payload.description = fields.description.value.trim();
        payload.galleryAssets = sortedGallery.map((asset, index) => ({
          mediaId: asset.mediaId || "",
          path: asset.path,
          altText: asset.altText || "",
          caption: asset.caption || "",
          isMain: Boolean(asset.isMain),
          order: index,
        }));
        payload.mediaIds = payload.galleryAssets.map((asset) => asset.mediaId).filter(Boolean);
        payload.gallery = payload.galleryAssets.map((asset) => asset.path);
        payload.photos = payload.galleryAssets.map((asset, index) => ({
          id: `ph-${Date.now()}-${index}`,
          mediaId: asset.mediaId || "",
          url: asset.path,
          altText: asset.altText || "",
          caption: asset.caption || "",
          order: index,
          isMain: Boolean(asset.isMain),
        }));
        payload.image =
          (payload.galleryAssets.find((asset) => asset.isMain) || payload.galleryAssets[0] || {}).path ||
          payload.image ||
          "";
        payload.images = payload.gallery.slice();
        payload.specs = fields.specs.value.split("\n").map((v) => v.trim()).filter(Boolean);
        payload.tags = fields.tags.value.split(",").map((v) => v.trim()).filter(Boolean);
      } else if (entityType === "categories") {
        payload.shortDesc = fields.shortDesc.value.trim();
        payload.description = fields.description.value.trim();
        payload.image = fields.image.value.trim();
      } else if (entityType === "partners") {
        payload.country = fields.country.value.trim();
        payload.website = fields.website.value.trim();
        payload.logo = fields.logo.value.trim();
        payload.contactInfo = fields.contact.value.trim();
        payload.description = fields.description.value.trim();
      } else if (entityType === "news") {
        payload.category = fields.category.value.trim();
        payload.type = fields.type.value;
        payload.publicationDate = fields.publicationDate.value;
        payload.date = fields.publicationDate.value;
        payload.author = fields.author.value.trim();
        payload.excerpt = fields.excerpt.value.trim();
        payload.heroImage = fields.heroImage.value.trim();
        payload.image = fields.heroImage.value.trim();
        payload.tags = fields.tags.value.split(",").map((v) => v.trim()).filter(Boolean);
        payload.contentBlocks = newsBlocksEditor.getBlocks();
      } else if (entityType === "pages") {
        payload.title = titleInput.value.trim();
        payload.excerpt = fields.excerpt.value.trim();
        payload.shortDescription = payload.excerpt;
        payload.description = fields.description.value.trim();
        payload.contentBlocks = newsBlocksEditor ? newsBlocksEditor.getBlocks() : [];
      }
      try {
        if (sourceItem && sourceItem.id) {
          await api(`/api/admin/${entityType}/${sourceItem.id}`, { method: "PUT", body: payload });
        } else {
          await api(`/api/admin/${entityType}`, { method: "POST", body: payload });
        }
        modal.remove();
        setStatus("Изменения сохранены");
        renderApp();
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  }

  async function renderMedia(container) {
    container.innerHTML = "";
    const card = el("div", { class: "adm-card" });
    card.append(el("h2", null, "Медиа библиотека"));

    const upload = el("div", { class: "adm-upload-zone" });
    upload.innerHTML = "Перетащите файл или выберите вручную";
    const picker = el("input", { type: "file", accept: "image/*", style: "display:none" });
    upload.append(picker);
    upload.addEventListener("click", () => picker.click());
    picker.addEventListener("change", () => {
      if (picker.files && picker.files[0]) doUpload(picker.files[0]);
    });
    upload.addEventListener("dragover", (event) => {
      event.preventDefault();
      upload.style.background = "#ecf3ff";
    });
    upload.addEventListener("dragleave", () => {
      upload.style.background = "#f6f9ff";
    });
    upload.addEventListener("drop", (event) => {
      event.preventDefault();
      upload.style.background = "#f6f9ff";
      const file = event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) doUpload(file);
    });
    card.append(upload);
    const status = el("div", { class: "adm-status", "data-admin-status": "media" }, "Загрузка...");
    card.append(status);
    const grid = el("div", { class: "adm-media-grid" });
    card.append(grid);
    container.append(card);

    async function doUpload(file) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await api("/api/admin/media/upload", { method: "POST", body: form });
        setStatus(`Загружено: ${res.path}`);
        renderApp();
      } catch (error) {
        setStatus(error.message, true);
      }
    }

    try {
      const items = await api("/api/admin/media");
      status.textContent = `Файлов: ${items.length}`;
      grid.innerHTML = "";
      items.forEach((item) => {
        const box = el("div", { class: "adm-media-item" });
        const img = el("img", { class: "adm-media-preview", src: item.path, alt: item.alt_text || "" });
        box.append(img);
        box.append(el("div", null, item.path));
        const alt = el("input", { class: "adm-input", placeholder: "Альтернативный текст", value: item.alt_text || "" });
        const caption = el("input", { class: "adm-input", placeholder: "Подпись", value: item.caption || "" });
        box.append(alt, caption);
        const row = el("div", { style: "display:flex; gap:6px; margin-top:8px" });
        const save = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Сохранить");
        const remove = el("button", { class: "adm-btn adm-btn-danger", type: "button" }, "Удалить");
        save.addEventListener("click", async () => {
          try {
            await api(`/api/admin/media/${item.id}`, { method: "PATCH", body: { altText: alt.value.trim(), caption: caption.value.trim() } });
            setStatus("Медиа обновлено");
          } catch (error) {
            setStatus(error.message, true);
          }
        });
        remove.addEventListener("click", async () => {
          if (!confirm("Удалить файл?")) return;
          try {
            await api(`/api/admin/media/${item.id}`, { method: "DELETE" });
            setStatus("Медиа удалено");
            renderApp();
          } catch (error) {
            setStatus(error.message, true);
          }
        });
        row.append(save, remove);
        box.append(row);
        grid.append(box);
      });
    } catch (error) {
      status.textContent = error.message;
      status.classList.add("error");
    }
  }

  function renderSeoTools(container) {
    container.innerHTML = "";
    const card = el("div", { class: "adm-card" });
    card.append(el("h2", null, "SEO и проверка URL"));
    const form = el("div", { class: "adm-form-grid" });
    const entity = el("select", { class: "adm-select" });
    ["products", "categories", "partners", "news", "pages"].forEach((name) => entity.append(el("option", { value: name }, name)));
    const slug = el("input", { class: "adm-input", placeholder: "url-slug" });
    const checkBtn = el("button", { class: "adm-btn adm-btn-primary", type: "button" }, "Проверить уникальность ссылки");
    const previewBtn = el("button", { class: "adm-btn adm-btn-ghost", type: "button" }, "Показать итоговый URL");
    const output = el("pre", { class: "adm-card", style: "white-space:pre-wrap" });
    addModalField(form, "Сущность", entity);
    addModalField(form, "URL страницы / Ссылка", slug);
    form.append(checkBtn, previewBtn);
    card.append(form, output);
    container.append(card);

    checkBtn.addEventListener("click", async () => {
      try {
        const data = await api(`/api/admin/slug/check?entityType=${encodeURIComponent(entity.value)}&slug=${encodeURIComponent(slug.value)}`);
        output.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        output.textContent = error.message;
      }
    });
    previewBtn.addEventListener("click", async () => {
      try {
        const data = await api(`/api/admin/url-preview?entityType=${encodeURIComponent(entity.value)}&slug=${encodeURIComponent(slug.value)}`);
        output.textContent = data.url;
      } catch (error) {
        output.textContent = error.message;
      }
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function boot() {
    const ok = await ensureSession();
    if (!ok) {
      renderLogin();
      return;
    }
    renderApp();
  }

  boot();
})();
