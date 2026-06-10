/* ====== КОНФИГ ====== */
// API_BASE: пустая строка = запросы на тот же домен (/api/...). Для админки на другом домене задайте window.__NF_API_BASE = "https://ваш-сайт.ru" до загрузки скрипта.
const NF_CONFIG = {
  API_BASE: typeof window !== "undefined" && window.__NF_API_BASE !== undefined ? String(window.__NF_API_BASE).replace(/\/$/, "") : "",
  I18N_ENDPOINT: "/api/i18n",
};

/** Литералы = :root в styles.css (для data: SVG и инлайна, где нет var()) */
const NF_PALETTE = {
  text: "#151515",
  accent: "#51a8b1",
  accentSoft: "#e5f0ed",
  surface: "#ffffff",
  surfaceSubtle: "#f7faf9",
  surfaceAlt: "#f4f7f6",
  border: "#d7e4e0",
  hairline: "#e5e7eb",
  muted: "#6f7c79",
  error: "#dc2626",
};

/* ====== ДАННЫЕ (начальные; каталог подгружается с API при открытии сайта) ====== */
const NF_DATA = {
  categories: [
    { id: "anesteziologiya-reanimaciya", name: "Анестезиология и реанимация", description: "Оборудование для анестезии, ИВЛ и интенсивной терапии", count: 3 },
    { id: "radiologiya", name: "Радиология", description: "КТ, МРТ, рентген и системы визуализации", count: 1 },
    { id: "neyrohirurgiya", name: "Нейрохирургия", description: "Оборудование и инструменты для нейрохирургии", count: 5 },
    { id: "ortopediya", name: "Ортопедия", description: "Ортопедическое и травматологическое оборудование", count: 2 },
    { id: "urologiya", name: "Урология", description: "Урологическое и эндоскопическое оборудование", count: 1 },
    { id: "esteticheskaya-medicina", name: "Эстетическая медицина", description: "Оборудование для эстетической и восстановительной медицины", count: 1 },
    { id: "elektrokardiostimulyaciya", name: "Электрокардиостимуляция", description: "Кардиостимуляторы и электрофизиология", count: 1 },
    { id: "functionalnaya-diagnostika", name: "Функциональная диагностика", description: "Системы функциональной и респираторной диагностики", count: 1 },
    { id: "serdechno-sosudistaya-hirurgiya", name: "Сердечно-сосудистая хирургия", description: "Оборудование для кардио- и сосудистой хирургии", count: 3 },
  ],
  partners: [
    { id: "ardo-medical", name: "Ardo Medical AG", country: "Швейцария", equipment: "Неонатология, медицинские насосы", years: 8, description: "Швейцарский производитель медицинских решений для неонатологии, акушерства и ухода за пациентами.", countProducts: 1, logo: "img/partners/ardo-medical.webp" },
    { id: "fujifilm", name: "Fujifilm Corporation", country: "Япония", equipment: "Системы визуализации, эндоскопия", years: 10, description: "Международный лидер в области медицинской визуализации и эндоскопических систем.", countProducts: 1, logo: "img/partners/fujifilm.jpeg" },
    { id: "ganshorn", name: "Ganshorn Medizin Electronic GmbH", country: "Германия", equipment: "Функциональная диагностика дыхания", years: 7, description: "Немецкий производитель комплексных систем для функциональной диагностики лёгких и дыхательных путей.", countProducts: 1, logo: "img/partners/ganshorn.jpeg" },
    { id: "inceler-medikal", name: "Inceler Medikal Ltd. Sti.", country: "Турция", equipment: "Хирургия, эндоскопия", years: 6, description: "Производитель решений для хирургии и эндоскопии с фокусом на надёжность и эргономику.", countProducts: 1, logo: "img/partners/inceler-medikal.png" },
    { id: "schiller", name: "Schiller AG", country: "Швейцария", equipment: "Кардиология, мониторинг", years: 12, description: "Швейцарский производитель решений для кардиодиагностики, мониторинга пациентов и реанимации.", countProducts: 1, logo: "img/partners/schiller.jpeg" },
    { id: "tecme", name: "Tecme S.A.", country: "Аргентина", equipment: "Аппараты ИВЛ", years: 7, description: "Международный производитель аппаратов искусственной вентиляции лёгких для взрослых и новорождённых.", countProducts: 1, logo: "img/partners/tecme.jpeg" },
    { id: "fritz-stephan", name: "Fritz Stephan GmbH", country: "Германия", equipment: "Реанимация и анестезия", years: 9, description: "Специалист по реанимационному оборудованию и анестезиологическим системам для интенсивной терапии.", countProducts: 1, logo: "img/partners/stephan.jpeg" },
    { id: "tekto-medical", name: "Tekto-Medical Optik-Chirurgie GmbH", country: "Германия", equipment: "Хирургическая оптика и инструменты", years: 5, description: "Немецкий производитель хирургической оптики и инструментов для операционных блоков.", countProducts: 1, logo: "img/partners/tekno.jpeg" },
    { id: "emos-technology", name: "EMOS Technology GmbH", country: "Германия", equipment: "Электрохирургия, энергоустройства", years: 4, description: "Производитель электрохирургических систем и энергоустройств для операционных.", countProducts: 1, logo: "img/partners/emos-technology.png" },
    { id: "bissinger", name: "Günter Bissinger Medizintechnik GmbH", country: "Германия", equipment: "Микрохирургические инструменты", years: 6, description: "Немецкий производитель высокоточных микрохирургических инструментов.", countProducts: 1, logo: "img/partners/bissinger.png" },
    { id: "kogent-surgical", name: "Kogent Surgical", country: "США", equipment: "Нейрохирургия, расходные материалы", years: 5, description: "Американский производитель расходных материалов и инструментов для нейрохирургии.", countProducts: 1, logo: "img/partners/kogent-surgical.png" },
    { id: "lemaitre", name: "LeMaitre Vascular Inc.", country: "США", equipment: "Сосудистая хирургия", years: 8, description: "Поставщик решений для сосудистой хирургии и эндоваскулярных вмешательств.", countProducts: 1, logo: "img/partners/lemaitre.jpeg" },
    { id: "japan-lifeline", name: "Japan LifeLine Co. Ltd.", country: "Япония", equipment: "Кардиология, электрофизиология", years: 7, description: "Японский производитель оборудования и расходных материалов для инвазивной кардиологии.", countProducts: 1, logo: "img/partners/japan-lifeline.jpeg" },
    { id: "biovic", name: "Biovic Sdn. Bhd.", country: "Малайзия", equipment: "Лабораторная диагностика", years: 4, description: "Производитель решений для лабораторной диагностики и подготовки проб.", countProducts: 1, logo: "img/partners/biovic.png" },
    { id: "medprin", name: "Medprin Biotech GmbH", country: "Германия", equipment: "Нейрохирургия, имплантаты", years: 6, description: "Биотехнологическая компания, специализирующаяся на нейрохирургических имплантатах и материалах.", countProducts: 1, logo: "img/partners/medprin.jpeg" },
    { id: "sophysa", name: "Sophysa SA", country: "Франция", equipment: "Нейрохирургия, шунтирующие системы", years: 10, description: "Французский производитель шунтирующих систем и решений для нейрохирургии.", countProducts: 1, logo: "img/partners/sophysa.jpeg" },
    { id: "elestim-cardio", name: "Элестим-Кардио, ООО", country: "Россия", equipment: "Кардиология, расходные материалы", years: 5, description: "Российский производитель расходных материалов и решений для кардиологии и реанимации.", countProducts: 1, logo: "img/partners/elestim-cardio.jpeg" },
  ],
  products: [
    {
      id: "ardo-ncpap-system",
      name: "Система неинвазивной респираторной поддержки NCPAP Ardo",
      article: "ARDO-NCPAP",
      model: "NCPAP System",
      partnerId: "ardo-medical",
      categoryId: "anesteziologiya-reanimaciya",
      price: 1850000,
      popular: true,
      shortDesc: "Ненавязчивая респираторная поддержка для отделений реанимации новорождённых.",
      description:
        "Система NCPAP от Ardo Medical предназначена для неинвазивной респираторной поддержки новорождённых и детей раннего возраста в условиях реанимации и интенсивной терапии.",
      specs: [
        "Регулируемое давление 4–8 см вод. ст.",
        "Контроль утечек и потока",
        "Компактный блок управления с сенсорным экраном",
        "Набор одноразовых и многоразовых интерфейсов",
      ],
    },
    {
      id: "fujifilm-fdr-go",
      name: "Мобильный цифровой рентген‑аппарат FDR Go",
      article: "FDR-GO",
      model: "FDR Go",
      partnerId: "fujifilm",
      categoryId: "radiologiya",
      price: null,
      popular: true,
      shortDesc: "Мобильная цифровая рентген‑система для палат и реанимаций.",
      specs: [
        "Плоскопанельный детектор",
        "Быстрый прогрев и готовность к работе",
        "Интеграция с RIS/PACS",
      ],
    },
    {
      id: "ganshorn-powercube",
      name: "Система функциональной диагностики лёгких PowerCube",
      article: "POWER-CUBE",
      model: "PowerCube",
      partnerId: "ganshorn",
      categoryId: "functionalnaya-diagnostika",
      price: null,
      popular: true,
      shortDesc: "Полный комплекс для спирометрии и бодиплетизмографии.",
      specs: [
        "Высокая точность измерений",
        "Модули для детской и взрослой пульмонологии",
        "Интуитивный интерфейс оператора",
      ],
    },
    {
      id: "inceler-force2",
      name: "Электрохирургический генератор Force 2",
      article: "FORCE-2",
      model: "Force 2",
      partnerId: "inceler-medikal",
      categoryId: "urologiya",
      price: null,
      popular: true,
      shortDesc: "Надёжный электрохирургический генератор для операций различной сложности.",
      specs: [
        "Режимы резки и коагуляции",
        "Поддержка биполярных инструментов",
        "Система контроля нагрузки пациента",
      ],
    },
    {
      id: "stephan-omni-flow",
      name: "Неонатальный аппарат ИВЛ Omni Flow II",
      article: "OMNIFLOW-II",
      model: "OmniFlow II",
      partnerId: "fritz-stephan",
      categoryId: "anesteziologiya-reanimaciya",
      price: null,
      popular: true,
      shortDesc: "Высокоточная вентиляция для новорождённых и детей.",
      specs: [
        "Режимы вентиляции для недоношенных пациентов",
        "Встроенный мониторинг параметров дыхания",
        "Интуитивный сенсорный интерфейс",
      ],
    },
    {
      id: "schiller-cardovit-at1",
      name: "Электрокардиограф CARDIOVIT AT‑1",
      article: "AT-1",
      model: "CARDIOVIT AT-1",
      partnerId: "schiller",
      categoryId: "elektrokardiostimulyaciya",
      price: null,
      popular: true,
      shortDesc: "Компактный 12‑канальный ЭКГ‑аппарат для рутинных исследований.",
      specs: [
        "Интерпретация ЭКГ для взрослых и детей",
        "Встроенный термопринтер",
        "Память для хранения исследований",
      ],
    },
    {
      id: "tecme-rehab-vent",
      name: "Аппарат ИВЛ Rehab Vent",
      article: "REHAB-VENT",
      model: "Rehab Vent",
      partnerId: "tecme",
      categoryId: "anesteziologiya-reanimaciya",
      price: null,
      popular: true,
      shortDesc: "Современный аппарат ИВЛ для отделений реанимации и интенсивной терапии.",
      specs: [
        "Широкий набор режимов вентиляции",
        "Поддержка неинвазивной вентиляции",
        "Удобный сенсорный экран",
      ],
    },
    {
      id: "tekto-neuroscope",
      name: "Нейрохирургическая оптика NeuroScope",
      article: "NEUROSCOPE",
      model: "NeuroScope",
      partnerId: "tekto-medical",
      categoryId: "neyrohirurgiya",
      price: null,
      popular: true,
      shortDesc: "Высококонтрастная эндоскопическая оптика для нейрохирургии.",
      specs: [
        "Оптика высокого разрешения",
        "Совместимость с основными стойками",
        "Широкий выбор аксессуаров",
      ],
    },
    {
      id: "emos-force2",
      name: "Электрохирургическая система Force 2",
      article: "FORCE-2-EMOS",
      model: "Force 2",
      partnerId: "emos-technology",
      categoryId: "serdechno-sosudistaya-hirurgiya",
      price: null,
      popular: false,
      shortDesc: "Электрохирургическая система для открытой и эндоскопической хирургии.",
      specs: [
        "Гибкая настройка выходной мощности",
        "Режимы работы для различных типов тканей",
      ],
    },
    {
      id: "bissinger-neuro-set",
      name: "Набор микрохирургических инструментов Neuro Set",
      article: "NEURO-SET",
      model: "Neuro Set",
      partnerId: "bissinger",
      categoryId: "neyrohirurgiya",
      price: null,
      popular: false,
      shortDesc: "Премиальный набор микрохирургических инструментов для нейрохирургии.",
      specs: [
        "Эргономичные рукоятки",
        "Высокая точность и балансировка",
      ],
    },
    {
      id: "kogent-neuro-matrix",
      name: "Нейрохирургический набор расходных материалов NeuroMatrix",
      article: "NEUROMATRIX",
      model: "NeuroMatrix",
      partnerId: "kogent-surgical",
      categoryId: "neyrohirurgiya",
      price: null,
      popular: false,
      shortDesc: "Расходные материалы для интраоперационного мониторинга и нейрохирургии.",
      specs: [
        "Широкий выбор электродов и аксессуаров",
        "Совместимость с ведущими нейромониторами",
      ],
    },
    {
      id: "lemaitre-polaris",
      name: "Сосудистый протез Polaris",
      article: "POLARIS",
      model: "Polaris",
      partnerId: "lemaitre",
      categoryId: "serdechno-sosudistaya-hirurgiya",
      price: null,
      popular: false,
      shortDesc: "Современный сосудистый протез для открытых вмешательств.",
      specs: [
        "Гибкая конструкция",
        "Широкий размерный ряд",
      ],
    },
    {
      id: "jll-uroflex",
      name: "Система для радиочастотной абляции UroFlex 9.5",
      article: "UROFLEX-9.5",
      model: "UroFlex 9.5",
      partnerId: "japan-lifeline",
      categoryId: "urologiya",
      price: null,
      popular: false,
      shortDesc: "Система для малоинвазивных вмешательств в урологии и кардиологии.",
      specs: [
        "Радиочастотная абляция",
        "Одноразовые катетеры с навигацией",
      ],
    },
    {
      id: "biovic-beauty-pro",
      name: "Косметологическая платформа Beauty Pro",
      article: "BEAUTY-PRO",
      model: "Beauty Pro",
      partnerId: "biovic",
      categoryId: "esteticheskaya-medicina",
      price: null,
      popular: false,
      shortDesc: "Многофункциональная аппаратная платформа для эстетической медицины.",
      specs: [
        "Насадки для пилинга и омоложения кожи",
        "Гибкая конфигурация модулей",
      ],
    },
    {
      id: "medprin-neuro-scope",
      name: "Нейрохирургический имплантат NeuroScope",
      article: "NEURO-IMPLANT",
      model: "NeuroScope",
      partnerId: "medprin",
      categoryId: "neyrohirurgiya",
      price: null,
      popular: false,
      shortDesc: "Современный имплантат для реконструкции костных дефектов черепа.",
      specs: [
        "Биосовместимый материал",
        "Индивидуальное 3D‑моделирование",
      ],
    },
    {
      id: "sophysa-polaris",
      name: "Шунтирующая система Polaris",
      article: "POLARIS-SHUNT",
      model: "Polaris",
      partnerId: "sophysa",
      categoryId: "neyrohirurgiya",
      price: null,
      popular: false,
      shortDesc: "Регулируемая шунтирующая система для лечения гидроцефалии.",
      specs: [
        "МР‑совместимый клапан",
        "Точная пошаговая настройка давления",
      ],
    },
    {
      id: "elestim-cardio-ablation",
      name: "Радиочастотная абляционная система Ablation Catheter",
      article: "ABLATION-CATH",
      model: "Ablation Catheter",
      partnerId: "elestim-cardio",
      categoryId: "elektrokardiostimulyaciya",
      price: null,
      popular: false,
      shortDesc: "Катетер для радиочастотной абляции при лечении нарушений ритма сердца.",
      specs: [
        "Высокая управляемость",
        "Совместимость с современными РЧ‑генераторами",
      ],
    },
  ],
  news: [
    {
      id: "news-site-global-update",
      slug: "globalnoe-obnovlenie-sayta-nanofarm",
      title: "Глобальное обновление сайта NanoFarm",
      category: "Компания",
      date: "2026-04-13",
      author: "Корпоративные коммуникации NanoFarm",
      excerpt:
        "NanoFarm завершила полное обновление корпоративного сайта: пересобраны интерфейс, структура разделов и адреса материалов. Платформа отражает текущий уровень компании и задаёт основу для дальнейшего развития цифровой витрины.",
      image: "img/news/1.jpg",
      tags: ["Сайт", "Обновление", "NanoFarm"],
      content: [
        { h2: "Почему обновление было необходимо" },
        "Предыдущая версия сайта накопила визуальное и структурное отставание: плотная сетка блоков, разрозненные сценарии и навигация не соответствовали масштабу поставок и сервиса, которые компания обеспечивает сегодня. Интерфейс воспринимался перегруженным, а ключевые разделы — каталог, новости, партнёры и информация о компании — не складывались в единую понятную логику.",
        "Обновление было не косметическим, а архитектурным: мы упростили пути пользователя, выровняли дизайн-систему и подготовили почву для стабильного развития контента и функциональности без «наслоения» старых решений.",
        { h2: "Что изменилось в дизайне" },
        "Новый интерфейс опирается на спокойную светлую палитру, акцентный цвет бренда и единые карточные паттерны. Визуальный шум снижен: больше воздуха, чёткая типографика и предсказуемые отступы. Карточки товаров и материалов выглядят согласованно — пользователь быстрее считывает иерархию и действия.",
        "Дизайн ориентирован на B2B-аудиторию: сдержанная «премиальная» подача без лишнего декора, с акцентом на читаемость характеристик, партнёра и логистики сопровождения.",
        { h2: "Структура, навигация и адреса" },
        "Переработана информационная архитектура: главная страница собрана заново, усилены входы в каталог, новости и ключевые разделы. Для товаров, новостей, партнёров и категорий предусмотрены отдельные URL — материалы проще сохранять, делиться ими и возвращаться к ним из поиска и мессенджеров.",
        "Навигация стала короче и прозрачнее: меньше взаимно пересекающихся сценариев, больше прямых переходов к задаче — от подбора оборудования до контактов и документов.",
        { h2: "Какие разделы переработаны" },
        "Главная страница, карточки и сетки товаров, каталог с фильтрацией, раздел новостей, страницы партнёров, категории и блок «О компании» приведены к единым принципам компоновки и обновлённому контенту. Новости переведены на чистую ленту с одним актуальным материалом о самом обновлении — без устаревших заглушек.",
        "Каталог получил более ясную работу с фильтрами и карточками; партнёры и категории оформлены так, чтобы быстрее объяснять специализацию и состав линеек.",
        { h2: "Что это даёт клиентам и партнёрам" },
        "Клиентам проще ориентироваться в ассортименте и переходить к запросу коммерческого предложения. Партнёрам — нагляднее представлен бренд и связка «продукт — производитель — поддержка». Внутренним командам проще поддерживать контент: предсказуемые шаблоны и отдельные страницы снижают стоимость правок и согласований.",
        "В совокупности сайт выполняет роль обновлённой цифровой витрины: он соответствует текущему уровню компании и задаёт стандарт коммуникации на ближайшие релизы.",
        { h2: "Итог" },
        "Обновление сайта NanoFarm — это завершённый цикл пересборки цифрового присутствия: от визуала до URL и навигации. Мы закрыли наследие визуально и структурно устаревшей версии и вывели платформу на уровень, который отражает реальные компетенции компании. Дальнейшее развитие будет наращивать этот фундамент — без отката к перегруженному опыту прошлой версии.",
      ],
    },
  ],
};

/* ====== SEO / META ====== */
function nfUpdateSeo(opts) {
  if (typeof document === "undefined") return;
  const defaults = {
    title: "НаноФарм — Медицинское оборудование для клиник и лабораторий",
    description:
      "НаноФарм — поставка медицинского оборудования для клиник, лабораторий и диагностических центров.",
    ogType: "website",
  };
  const meta = { ...defaults, ...(opts || {}) };

  document.title = meta.title;

  function ensureMeta(selector, attrs) {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => {
        el.setAttribute(k, v);
      });
      document.head.appendChild(el);
    }
    return el;
  }

  const descEl = ensureMeta('meta[name="description"]', { name: "description" });
  if (meta.description != null) {
    descEl.setAttribute("content", String(meta.description));
  }

  const ogTitleEl = ensureMeta('meta[property="og:title"]', { property: "og:title" });
  ogTitleEl.setAttribute("content", meta.ogTitle || meta.title);

  const ogDescEl = ensureMeta('meta[property="og:description"]', { property: "og:description" });
  ogDescEl.setAttribute("content", meta.ogDescription || meta.description || "");

  const ogTypeEl = ensureMeta('meta[property="og:type"]', { property: "og:type" });
  ogTypeEl.setAttribute("content", meta.ogType || defaults.ogType);

  if (meta.ogImage) {
    const ogImgEl = ensureMeta('meta[property="og:image"]', { property: "og:image" });
    ogImgEl.setAttribute("content", meta.ogImage);
  }

  const url = typeof window !== "undefined" ? window.location.href : "";
  if (url) {
    const ogUrlEl = ensureMeta('meta[property="og:url"]', { property: "og:url" });
    ogUrlEl.setAttribute("content", url);
  }
}

/* ====== ГЛОБАЛЬНОЕ СОСТОЯНИЕ ====== */
/** @deprecated оставлено в state; пагинация каталога заменена на прогрессивную подгрузку */
const NF_CATALOG_PAGE_SIZE = 24;
const NF_CATALOG_BATCH_INITIAL = 16;
const NF_CATALOG_BATCH_STEP = 16;

const NF_STATE = {
  currentPage: "home",
  lang: "ru",
  catalogPhase: "hub",
  cart: [],
  pendingCatalogProductId: null,
  /** Кэш отфильтрованного списка и прогресс рендера (см. nfRenderCatalog / nfCatalogAppendNextBatch) */
  catalogRender: {
    signature: "",
    cachedList: [],
    renderedCount: 0,
  },
  homeLazy: {
    popular: false,
    categories: false,
    partners: false,
    news: false,
  },
  filters: {
    search: "",
    categoryIds: new Set(),
    partnerIds: new Set(),
    subcategoryId: "",
    model: "",
    sort: "popular",
    viewMode: "grid",
    page: 1,
  },
  adminSection: "dashboard",
  selectedPartnerId: null,
  selectedNewsId: null,
  categoryDetailId: null,
  newsArticleId: null,
  productDetailProductId: null,
  /** true when catalog was entered via a homepage category tile click — back button returns to home */
  catalogFromHome: false,
  /** Slug из URL /catalog/:slug, пока каталог с API не подтянут или товар ещё не сопоставлен */
  pendingProductPermalink: null,
  newsView: {
    search: "",
    sort: "recent",
    category: "all",
  },
  productModalProductId: null,
  legalTab: "privacy",
  clientsTab: "order",
};

const NF_I18N = { ru: {}, en: {}, kz: {} };
const NF_SUPPORTED_LANGS = new Set(["ru", "en", "kz"]);
const NF_I18N_STRUCTURAL_TAGS = new Set([
  "SECTION",
  "DIV",
  "ARTICLE",
  "MAIN",
  "ASIDE",
  "HEADER",
  "FOOTER",
  "NAV",
  "UL",
  "OL",
  "TABLE",
  "TBODY",
  "TR",
  "FORM",
]);
let NF_LANG_CHANGE_SEQ = 0;
let NF_CATALOG_REQUEST_SEQ = 0;
let NF_CATALOG_ACTIVE_REQUEST_SEQ = 0;

/* ====== SAFE DOM HELPERS ====== */
function nfEl(id) {
  return document.getElementById(id);
}

function nfEnsureModalOutsideLayout(modalId, backdropId) {
  const modal = nfEl(modalId);
  const backdrop = nfEl(backdropId);
  if (modal && modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }
  if (backdrop && backdrop.parentElement !== document.body) {
    document.body.appendChild(backdrop);
  }
}

/* motion baseline: wheel+rAF smooth scroll removed — native scrolling only (revisit for lightweight UX if needed) */
function nfAttachSmoothScroll(el) {
  if (!el || el.dataset.nfSmoothScroll === "1") return;
  el.dataset.nfSmoothScroll = "1";
}

/* Кастомный dropdown-обёртчик для select (используем, не трогая существующую onchange-логику) */
function nfEnhanceSelectDropdown(select) {
  if (!select || select.dataset.nfEnhanced === "1") return;
  select.dataset.nfEnhanced = "1";

  const wrapper = document.createElement("div");
  wrapper.className = "nf-select-shell";

  select.classList.add("nf-select-native");

  const display = document.createElement("button");
  display.type = "button";
  display.className = "nf-select-display";

  const menu = document.createElement("div");
  menu.className = "nf-select-menu";
  const menuId = `nf-select-menu-${select.id || `anon-${Math.random().toString(36).slice(2, 9)}`}`;
  menu.id = menuId;

  display.setAttribute("role", "combobox");
  display.setAttribute("aria-haspopup", "listbox");
  display.setAttribute("aria-controls", menuId);
  display.setAttribute("aria-expanded", "false");
  menu.setAttribute("role", "listbox");
  const listLabelledBy = select.getAttribute("aria-labelledby");
  if (listLabelledBy) menu.setAttribute("aria-labelledby", listLabelledBy);

  const syncOpenState = () => {
    const open = wrapper.classList.contains("is-open");
    display.setAttribute("aria-expanded", open ? "true" : "false");
    menu.hidden = !open;
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const getOptionButtons = () => Array.from(menu.querySelectorAll(".nf-select-option"));
  const closeOtherEnhancedSelects = () => {
    document.querySelectorAll(".nf-select-shell.is-open").forEach((node) => {
      if (node === wrapper) return;
      node.classList.remove("is-open");
      const displayEl = node.querySelector(".nf-select-display");
      const menuEl = node.querySelector(".nf-select-menu");
      if (displayEl) displayEl.setAttribute("aria-expanded", "false");
      if (menuEl) {
        menuEl.hidden = true;
        menuEl.setAttribute("aria-hidden", "true");
      }
    });
  };

  const focusOptionIndex = (idx) => {
    const btns = getOptionButtons();
    if (!btns.length) return;
    const i = Math.max(0, Math.min(idx, btns.length - 1));
    btns.forEach((b, j) => {
      b.tabIndex = j === i ? 0 : -1;
    });
    btns[i].focus();
  };

  const openAndFocus = (index) => {
    if (!wrapper.classList.contains("is-open")) {
      closeOtherEnhancedSelects();
      buildOptions();
      wrapper.classList.add("is-open");
      syncOpenState();
    }
    focusOptionIndex(index);
  };

  const closeAndFocusDisplay = () => {
    wrapper.classList.remove("is-open");
    syncOpenState();
    display.focus();
  };

  const buildOptions = () => {
    menu.innerHTML = "";
    const opts = Array.from(select.options);
    const currentValue = select.value;
    const current = opts.find((o) => o.value === currentValue) || opts[0];
    display.textContent = current ? current.text : "";

    opts.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nf-select-option";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", opt.value === current.value ? "true" : "false");
      if (opt.value === current.value) btn.classList.add("is-active");
      btn.textContent = opt.text;
      btn.dataset.value = opt.value;
      btn.tabIndex = -1;

      btn.addEventListener("click", () => {
        if (select.value !== opt.value) {
          select.value = opt.value;
          const ev = new Event("change", { bubbles: true });
          select.dispatchEvent(ev);
        }
        wrapper.classList.remove("is-open");
        syncOpenState();
        buildOptions();
      });

      btn.addEventListener("keydown", (e) => {
        const btns = getOptionButtons();
        const i = btns.indexOf(btn);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (i < btns.length - 1) focusOptionIndex(i + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (i > 0) focusOptionIndex(i - 1);
          else closeAndFocusDisplay();
        } else if (e.key === "Home") {
          e.preventDefault();
          focusOptionIndex(0);
        } else if (e.key === "End") {
          e.preventDefault();
          focusOptionIndex(btns.length - 1);
        } else if (e.key === "Escape") {
          e.preventDefault();
          closeAndFocusDisplay();
        }
      });

      menu.appendChild(btn);
    });
  };

  buildOptions();
  syncOpenState();

  select.addEventListener("change", () => {
    buildOptions();
    syncOpenState();
  });

  /* Программный .value не генерирует "change" — синхронизация подписи с NF_STATE */
  select.addEventListener("nf-enhanced-select-sync", () => {
    wrapper.classList.remove("is-open");
    buildOptions();
    syncOpenState();
  });

  nfAttachSmoothScroll(menu);

  display.addEventListener("click", () => {
    const opening = !wrapper.classList.contains("is-open");
    if (opening) {
      closeOtherEnhancedSelects();
      buildOptions();
      wrapper.classList.add("is-open");
    } else {
      wrapper.classList.remove("is-open");
    }
    syncOpenState();
  });

  display.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openAndFocus(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAndFocus(getOptionButtons().length - 1);
    } else if (e.key === "Escape") {
      if (wrapper.classList.contains("is-open")) {
        e.preventDefault();
        closeAndFocusDisplay();
      }
    }
  });

  try {
    select.__nfEnhanceSelectDocAc?.abort();
  } catch (_e) {}
  const docAc = new AbortController();
  select.__nfEnhanceSelectDocAc = docAc;
  document.addEventListener(
    "click",
    (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("is-open");
        syncOpenState();
      }
    },
    { signal: docAc.signal }
  );

  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  wrapper.appendChild(display);
  wrapper.appendChild(menu);
}

function nfAbortEnhancedSelectsInRoot(root) {
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll("select[data-nf-enhanced='1']").forEach((sel) => {
    try {
      sel.__nfEnhanceSelectDocAc?.abort();
    } catch (_e) {}
    sel.__nfEnhanceSelectDocAc = null;
  });
}

function nfSafeText(id, value) {
  const el = nfEl(id);
  if (!el) return false;
  el.textContent = value ?? "";
  return true;
}
function nfOn(id, evt, handler) {
  const el = nfEl(id);
  if (!el) return false;
  el.addEventListener(evt, handler);
  return true;
}

/* ====== УТИЛИТЫ ====== */
function nfNormalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]+/gu, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function nfEntitySearchHaystack(entity, fallbackParts) {
  const parts = [];
  if (entity && typeof entity.searchIndexText === "string") {
    parts.push(entity.searchIndexText);
  }
  (fallbackParts || []).forEach((item) => {
    if (item != null) parts.push(String(item));
  });
  return nfNormalizeSearchText(parts.join(" "));
}

function nfFormatPrice(value) {
  if (value == null) return nfT("common.priceOnRequest", "Цена по запросу");
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(value);
}

function nfFormatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
}

function nfConfigureImageElement(img, options) {
  if (!img) return;
  const opts = options || {};
  if (opts.width && opts.height) {
    img.width = opts.width;
    img.height = opts.height;
  }
  if (opts.loading) img.loading = opts.loading;
  if (opts.decoding) img.decoding = opts.decoding;
  if (opts.fetchPriority) img.fetchPriority = opts.fetchPriority;
}

function nfGetProductImages(product) {
  const override = NF_PRODUCT_IMAGE_OVERRIDES[product?.id];
  if (override) {
    return Array.isArray(override) ? override : [override];
  }

  const urls = [];

  if (Array.isArray(product?.photos) && product.photos.length) {
    const photos = [...product.photos].filter(Boolean);
    photos
      .map((p, index) => {
        if (typeof p === "string") {
          const v = p.trim();
          return v ? { url: v, order: index, isMain: index === 0 } : null;
        }
        const v = String(p.url || "").trim();
        if (!v) return null;
        return {
          url: v,
          order: typeof p.order === "number" ? p.order : index,
          isMain: Boolean(p.isMain),
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.isMain && !b.isMain) return -1;
        if (!a.isMain && b.isMain) return 1;
        return (a.order || 0) - (b.order || 0);
      })
      .forEach((p) => {
        const v = String(p.url || "").trim();
        if (v && !urls.includes(v)) urls.push(v);
      });
  }

  if (Array.isArray(product?.images)) {
    product.images.forEach((src) => {
      const v = String(src || "").trim();
      if (v && !urls.includes(v)) urls.push(v);
    });
  }

  const main = String(product?.image || "").trim();
  if (main && !urls.includes(main)) urls.unshift(main);

  return urls;
}

function nfRecalcCategoryCounts() {
  const categories = NF_DATA.categories || [];
  const products = NF_DATA.products || [];
  const map = {};
  products.forEach((p) => {
    if (!p || !p.categoryId) return;
    const id = String(p.categoryId);
    map[id] = (map[id] || 0) + 1;
  });
  categories.forEach((c) => {
    const id = String(c.id);
    c.count = map[id] || 0;
  });
}

function nfDebounce(fn, delay = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function nfCreateAnimatedSearchHint(input, options = {}) {
  if (!(input instanceof HTMLInputElement)) return () => {};
  if (typeof input.__nfAnimatedHintCleanup === "function") {
    input.__nfAnimatedHintCleanup();
  }

  const host = input.closest(".nf-search") || input.parentElement;
  if (!host) return () => {};

  const fallbackItems = [
    "Анестезиология",
    "Радиология",
    "Нейрохирургия",
    "Ортопедия",
    "Урология",
    "Диагностика",
  ];
  const sourceItems = Array.isArray(options.items) && options.items.length ? options.items : fallbackItems;
  const items = sourceItems
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  if (!items.length) return () => {};

  const focusedHintText = String(options.focusedHint || "Введите запрос").trim() || "Введите запрос";
  const placeholderBackup = String(input.getAttribute("placeholder") || "");
  input.setAttribute("placeholder", "");

  const layer = document.createElement("span");
  layer.className = "nf-search-hint-layer is-hidden";
  layer.setAttribute("aria-hidden", "true");

  const idleHint = document.createElement("span");
  idleHint.className = "nf-search-idle-hint is-hidden";
  const idleText = document.createElement("span");
  idleText.className = "nf-search-idle-hint-text";
  const idleCaret = document.createElement("span");
  idleCaret.className = "nf-search-idle-hint-caret";
  idleCaret.setAttribute("aria-hidden", "true");
  idleHint.append(idleText, idleCaret);

  const focusedHint = document.createElement("span");
  focusedHint.className = "nf-search-focused-hint is-hidden";
  focusedHint.textContent = focusedHintText;

  layer.append(idleHint, focusedHint);
  host.appendChild(layer);
  host.classList.add("nf-search-has-animated-hint");
  input.classList.add("nf-search-input--animated-hint");

  const state = {
    destroyed: false,
    running: false,
    mode: "typing", // typing | hold | deleting | focused
    currentPhraseIndex: 0,
    currentCharIndex: 0,
    segments: [],
    timerId: 0,
    timerDueAt: 0,
    availableWidth: 0,
    pausedSnapshot: null,
  };

  const timing = {
    startDelay: 420,
    typeMin: 82,
    typeMax: 124,
    deleteMin: 56,
    deleteMax: 88,
    hold: 1420,
    gapBetweenPhrases: 260,
  };

  const segmenter =
    typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter("ru", { granularity: "grapheme" })
      : null;
  const toSegments = (value) => {
    const normalized = String(value || "");
    if (!normalized) return [];
    if (!segmenter) return Array.from(normalized);
    return [...segmenter.segment(normalized)].map((piece) => piece.segment);
  };
  const randomIn = (min, max) => Math.round(min + Math.random() * (max - min));
  const hasText = () => Boolean(String(input.value || "").trim());
  const isFocused = () => document.activeElement === input;
  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  const wordSegmenter =
    typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter("ru", { granularity: "word" })
      : null;

  const normalizedHintText = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const getTextWidth = (value, sourceEl = idleText) => {
    const text = String(value || "");
    if (!text) return 0;
    if (!measureCtx) return text.length * 8;
    const cs = window.getComputedStyle(sourceEl);
    measureCtx.font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize} / ${cs.lineHeight} ${cs.fontFamily}`;
    return measureCtx.measureText(text).width;
  };
  const toWordTokens = (value) => {
    const text = normalizedHintText(value);
    if (!text) return [];
    if (!wordSegmenter) return text.split(" ").filter(Boolean);
    const tokens = [];
    [...wordSegmenter.segment(text)].forEach((segment) => {
      if (!segment.isWordLike) return;
      const token = String(segment.segment || "").trim();
      if (token) tokens.push(token);
    });
    return tokens.length ? tokens : text.split(" ").filter(Boolean);
  };
  const truncateByWholeWord = (value, maxWidth, sourceEl = idleText) => {
    const text = normalizedHintText(value);
    if (!text) return "";
    if (!Number.isFinite(maxWidth) || maxWidth <= 0) return "";
    if (getTextWidth(text, sourceEl) <= maxWidth) return text;

    const ellipsis = "…";
    const ellipsisWidth = getTextWidth(ellipsis, sourceEl);
    if (ellipsisWidth > maxWidth) return "";

    const words = toWordTokens(text);
    if (!words.length) return ellipsis;
    if (words.length === 1) {
      return getTextWidth(words[0], sourceEl) <= maxWidth ? words[0] : ellipsis;
    }

    let best = "";
    for (let i = 0; i < words.length; i += 1) {
      const candidate = words.slice(0, i + 1).join(" ");
      if (getTextWidth(candidate, sourceEl) <= maxWidth) {
        best = candidate;
      } else {
        break;
      }
    }
    if (!best) return ellipsis;
    if (best === text) return best;

    let clipped = best;
    while (clipped && getTextWidth(`${clipped}${ellipsis}`, sourceEl) > maxWidth) {
      const parts = clipped.split(" ");
      parts.pop();
      clipped = parts.join(" ").trim();
    }
    return clipped ? `${clipped}${ellipsis}` : ellipsis;
  };
  const getRenderedHintText = (value, sourceEl = idleText) => {
    const maxWidth = Math.max(0, (state.availableWidth || 0) - 2);
    if (!maxWidth) return "";
    return truncateByWholeWord(value, maxWidth, sourceEl);
  };
  const clearTimer = () => {
    const remaining = state.timerId ? Math.max(0, state.timerDueAt - Date.now()) : 0;
    if (state.timerId) clearTimeout(state.timerId);
    state.timerId = 0;
    state.timerDueAt = 0;
    return remaining;
  };
  const schedule = (delayMs) => {
    clearTimer();
    const delay = Math.max(0, Math.round(delayMs));
    state.timerDueAt = Date.now() + delay;
    state.timerId = window.setTimeout(step, delay);
  };
  const showIdle = (visible) => idleHint.classList.toggle("is-hidden", !visible);
  const showFocused = (visible) => focusedHint.classList.toggle("is-hidden", !visible);
  const setLayerVisible = (visible) => layer.classList.toggle("is-hidden", !visible);
  const updateSegments = () => {
    state.segments = toSegments(items[state.currentPhraseIndex] || "");
    state.currentCharIndex = Math.min(state.currentCharIndex, state.segments.length);
  };
  const renderIdle = () => {
    const rawText = state.segments.slice(0, state.currentCharIndex).join("");
    idleText.textContent = getRenderedHintText(rawText, idleText);
  };
  const renderFocused = () => {
    focusedHint.textContent = getRenderedHintText(focusedHintText, focusedHint);
  };
  const syncVisualState = () => {
    if (state.destroyed) return;
    if (hasText()) {
      setLayerVisible(false);
      showIdle(false);
      showFocused(false);
      return;
    }
    setLayerVisible(true);
    if (isFocused()) {
      showIdle(false);
      showFocused(true);
      return;
    }
    showFocused(false);
    showIdle(true);
  };
  const syncLayerBounds = () => {
    if (state.destroyed) return;
    const hostRect = host.getBoundingClientRect();
    const inputRect = input.getBoundingClientRect();
    const inputStyles = window.getComputedStyle(input);
    const padLeft = parseFloat(inputStyles.paddingLeft || "0") || 0;
    const padRight = parseFloat(inputStyles.paddingRight || "0") || 0;

    let left = inputRect.left - hostRect.left + padLeft;
    let right = inputRect.right - hostRect.left - padRight;

    const icon = host.querySelector(".nf-search-icon");
    if (icon) {
      const iconRect = icon.getBoundingClientRect();
      left = Math.max(left, iconRect.right - hostRect.left + 10);
    }

    const width = Math.max(0, right - left);
    state.availableWidth = width;
    layer.style.left = `${left}px`;
    layer.style.width = `${width}px`;
    renderIdle();
    renderFocused();
    syncVisualState();
  };
  const canRunIdle = () => {
    if (state.destroyed) return false;
    if (document.visibilityState === "hidden") return false;
    if (isFocused()) return false;
    return !hasText();
  };
  const stopIdle = () => {
    state.running = false;
    clearTimer();
  };
  const step = () => {
    if (!state.running || !canRunIdle()) {
      stopIdle();
      syncVisualState();
      return;
    }

    if (state.mode === "typing") {
      if (state.currentCharIndex < state.segments.length) {
        state.currentCharIndex += 1;
        renderIdle();
        schedule(randomIn(timing.typeMin, timing.typeMax));
        return;
      }
      state.mode = "hold";
      schedule(timing.hold);
      return;
    }

    if (state.mode === "hold") {
      state.mode = "deleting";
      schedule(randomIn(timing.deleteMin, timing.deleteMax));
      return;
    }

    if (state.mode === "deleting") {
      if (state.currentCharIndex > 0) {
        state.currentCharIndex -= 1;
        renderIdle();
        schedule(randomIn(timing.deleteMin, timing.deleteMax));
        return;
      }
      state.currentPhraseIndex = (state.currentPhraseIndex + 1) % items.length;
      state.mode = "typing";
      updateSegments();
      renderIdle();
      schedule(timing.gapBetweenPhrases);
      return;
    }

    state.mode = "typing";
    schedule(randomIn(timing.typeMin, timing.typeMax));
  };
  const startIdle = (delay = timing.startDelay) => {
    if (state.destroyed || state.running) return;
    if (!canRunIdle()) {
      syncVisualState();
      return;
    }
    state.running = true;
    syncVisualState();
    schedule(delay);
  };
  const restoreFromSnapshot = () => {
    const snap = state.pausedSnapshot;
    if (!snap) return false;
    state.currentPhraseIndex = Math.max(0, Math.min(items.length - 1, snap.currentPhraseIndex ?? 0));
    state.currentCharIndex = Math.max(0, snap.currentCharIndex ?? 0);
    state.mode = snap.mode === "deleting" || snap.mode === "hold" ? snap.mode : "typing";
    updateSegments();
    renderIdle();
    return true;
  };
  const captureSnapshotForFocus = () => {
    const remaining = clearTimer();
    state.running = false;
    state.pausedSnapshot = {
      currentPhraseIndex: state.currentPhraseIndex,
      currentCharIndex: state.currentCharIndex,
      mode: state.mode,
      remainingHoldMs: state.mode === "hold" ? remaining : null,
    };
  };
  const resumeFromSnapshot = () => {
    const restored = restoreFromSnapshot();
    const snap = state.pausedSnapshot;
    state.pausedSnapshot = null;
    if (!restored) {
      startIdle(timing.startDelay);
      return false;
    }
    if (!canRunIdle()) {
      syncVisualState();
      return true;
    }
    state.running = true;
    syncVisualState();
    if (snap?.mode === "hold") {
      schedule(snap.remainingHoldMs != null ? snap.remainingHoldMs : timing.hold);
      return true;
    }
    schedule(Math.max(40, randomIn(timing.typeMin, timing.typeMax)));
    return true;
  };

  updateSegments();
  renderIdle();
  renderFocused();
  syncLayerBounds();
  syncVisualState();

  const onInput = () => {
    if (hasText()) {
      stopIdle();
      syncVisualState();
      return;
    }
    if (isFocused()) {
      stopIdle();
      syncVisualState();
      return;
    }
    if (!state.running) {
      if (!resumeFromSnapshot()) startIdle(timing.startDelay);
      return;
    }
    syncVisualState();
  };
  const onFocus = () => {
    if (!hasText()) {
      captureSnapshotForFocus();
      state.mode = "focused";
    } else {
      stopIdle();
    }
    syncVisualState();
  };
  const onBlur = () => {
    if (hasText()) {
      syncVisualState();
      return;
    }
    resumeFromSnapshot();
  };
  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      stopIdle();
      return;
    }
    syncLayerBounds();
    if (!hasText() && !isFocused()) {
      resumeFromSnapshot();
      return;
    }
    syncVisualState();
  };

  const controller = new AbortController();
  const signal = controller.signal;
  input.addEventListener("input", onInput, { signal });
  input.addEventListener("focus", onFocus, { signal });
  input.addEventListener("blur", onBlur, { signal });
  document.addEventListener("visibilitychange", onVisibilityChange, { signal });
  window.addEventListener("resize", syncLayerBounds, { signal });

  const rafId = window.requestAnimationFrame(syncLayerBounds);
  startIdle(timing.startDelay);

  const destroy = () => {
    if (state.destroyed) return;
    state.destroyed = true;
    stopIdle();
    controller.abort();
    window.cancelAnimationFrame(rafId);
    input.setAttribute("placeholder", placeholderBackup);
    host.classList.remove("nf-search-has-animated-hint");
    input.classList.remove("nf-search-input--animated-hint");
    layer.remove();
    if (input.__nfAnimatedHintCleanup === destroy) {
      delete input.__nfAnimatedHintCleanup;
    }
  };

  input.__nfAnimatedHintCleanup = destroy;
  return destroy;
}

function nfCreateEl(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html != null) el.innerHTML = html;
  return el;
}

function nfCreateElText(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text != null) el.textContent = text;
  return el;
}

function nfEscapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nfProductPlaceholderSvg() {
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
        '<defs>' +
        '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
        `<stop offset="0" stop-color="${NF_PALETTE.accentSoft}"/>` +
        `<stop offset="1" stop-color="${NF_PALETTE.surfaceAlt}"/>` +
        "</linearGradient>" +
        "</defs>" +
        '<rect width="400" height="300" rx="24" fill="url(#bg)"/>' +
        `<rect x="60" y="70" width="280" height="150" rx="18" fill="${NF_PALETTE.surfaceSubtle}" stroke="${NF_PALETTE.border}" stroke-width="2"/>` +
        `<rect x="80" y="90" width="120" height="110" rx="14" fill="${NF_PALETTE.accentSoft}"/>` +
        `<rect x="210" y="100" width="100" height="18" rx="9" fill="${NF_PALETTE.accentSoft}"/>` +
        `<rect x="210" y="130" width="80" height="14" rx="7" fill="${NF_PALETTE.surfaceAlt}"/>` +
        `<rect x="210" y="154" width="90" height="14" rx="7" fill="${NF_PALETTE.hairline}"/>` +
        `<rect x="210" y="178" width="70" height="14" rx="7" fill="${NF_PALETTE.hairline}"/>` +
        `<circle cx="310" cy="205" r="10" fill="${NF_PALETTE.accent}"/>` +
        `<rect x="60" y="235" width="120" height="12" rx="6" fill="${NF_PALETTE.border}" opacity="0.7"/>` +
        `<rect x="190" y="235" width="80" height="12" rx="6" fill="${NF_PALETTE.border}" opacity="0.7"/>` +
        `<rect x="280" y="235" width="60" height="12" rx="6" fill="${NF_PALETTE.border}" opacity="0.7"/>` +
        `<text x="200" y="268" text-anchor="middle" fill="${NF_PALETTE.muted}" font-family="system-ui" font-size="13">Изображение медицинского оборудования</text>` +
        "</svg>"
    )
  );
}

/* Фото реального медоборудования (Unsplash): ИВЛ, мониторы, рентген, микроскопы, операционная и т.д. */
const NF_PRODUCT_IMAGE_OVERRIDES = {
  "ardo-ncpap-system":
    "https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=900&q=80",
  "fujifilm-fdr-go":
    "https://images.unsplash.com/photo-1666214280352-db292c05fd80?auto=format&fit=crop&w=900&q=80",
  "ganshorn-powercube":
    "https://images.unsplash.com/photo-1595464144526-5fb181b74625?auto=format&fit=crop&w=900&q=80",
  "inceler-force2":
    "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=900&q=80",
  "stephan-omni-flow":
    "https://images.unsplash.com/photo-1641877492086-771bc14a8e5e?auto=format&fit=crop&w=900&q=80",
  "schiller-cardovit-at1":
    "https://images.unsplash.com/photo-1513224502586-d1e602410265?auto=format&fit=crop&w=900&q=80",
  "tecme-rehab-vent":
    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80",
  "tekto-neuroscope":
    "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2?auto=format&fit=crop&w=900&q=80",
  "emos-force2":
    "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=900&q=80",
  "bissinger-neuro-set":
    "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=900&q=80",
  "kogent-neuro-matrix":
    "https://images.unsplash.com/photo-1579684288402-e3e337bcc7af?auto=format&fit=crop&w=900&q=80",
  "lemaitre-polaris":
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
  "jll-uroflex":
    "https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=900&q=80",
  "biovic-beauty-pro":
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
  "medprin-neuro-scope":
    "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=900&q=80",
  "sophysa-polaris":
    "https://images.unsplash.com/photo-1579684288402-e3e337bcc7af?auto=format&fit=crop&w=900&q=80",
  "elestim-cardio-ablation":
    "https://images.unsplash.com/photo-1770836037704-44bd8c7b6978?auto=format&fit=crop&w=900&q=80",
};

let NF_PRODUCT_LIGHTBOX_STATE = null;
let nfProductLightboxUiAbort = null;

const NF_PRODUCT_LIGHTBOX_HTML = `
    <div class="nf-product-lightbox-inner">
      <div class="nf-product-lightbox-image-wrap">
        <button type="button" class="nf-product-lightbox-prev" aria-label="Предыдущее фото">
          <span class="nf-product-lightbox-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6 9 12l6 6" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <button type="button" class="nf-product-lightbox-next" aria-label="Следующее фото">
          <span class="nf-product-lightbox-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6 15 12l-6 6" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <button type="button" class="nf-product-lightbox-close" aria-label="Закрыть">
          <span class="nf-product-lightbox-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7l10 10M17 7 7 17" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <div class="nf-product-lightbox-img-clip">
          <img class="nf-product-lightbox-image" alt="" />
        </div>
      </div>
      <div class="nf-product-lightbox-caption">
        <span class="nf-product-lightbox-title"></span>
        <span class="nf-product-lightbox-counter"></span>
      </div>
    </div>
`;

function nfEnsureProductLightbox() {
  let root = document.getElementById("nfProductLightbox");
  if (root && !root.querySelector(".nf-product-lightbox-img-clip")) {
    const wasOpen = root.classList.contains("is-open");
    root.innerHTML = NF_PRODUCT_LIGHTBOX_HTML.trim();
    if (wasOpen) root.classList.add("is-open");
    return root;
  }
  if (root) return root;
  root = document.createElement("div");
  root.id = "nfProductLightbox";
  root.className = "nf-product-lightbox";
  root.innerHTML = NF_PRODUCT_LIGHTBOX_HTML.trim();
  document.body.appendChild(root);
  return root;
}

function nfCloseProductLightbox() {
  if (nfProductLightboxUiAbort) {
    nfProductLightboxUiAbort.abort();
    nfProductLightboxUiAbort = null;
  }
  nfDisposeImageZoomPan("lightbox");
  const root = document.getElementById("nfProductLightbox");
  if (root) root.classList.remove("is-open");
  NF_PRODUCT_LIGHTBOX_STATE = null;
}

function nfProductLightboxKeyHandler(e) {
  if (!NF_PRODUCT_LIGHTBOX_STATE) return;
  if (e.key === "Escape") {
    nfCloseProductLightbox();
  } else if (e.key === "ArrowRight") {
    nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index + 1);
  } else if (e.key === "ArrowLeft") {
    nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index - 1);
  }
}

function nfProductLightboxShow(nextIndex) {
  if (!NF_PRODUCT_LIGHTBOX_STATE) return;
  const { images } = NF_PRODUCT_LIGHTBOX_STATE;
  if (!images.length) return;
  let idx = nextIndex;
  if (idx < 0) idx = images.length - 1;
  if (idx >= images.length) idx = 0;
  NF_PRODUCT_LIGHTBOX_STATE.index = idx;

  const root = nfEnsureProductLightbox();
  const imgEl = root.querySelector(".nf-product-lightbox-image");
  const titleEl = root.querySelector(".nf-product-lightbox-title");
  const counterEl = root.querySelector(".nf-product-lightbox-counter");

  if (imgEl) {
    imgEl.src = images[idx];
    imgEl.alt = NF_PRODUCT_LIGHTBOX_STATE.productName || "Фото товара";
    imgEl.style.transform = "";
    imgEl.classList.remove("nf-pdp-media-img--zooming");
  }
  if (titleEl) titleEl.textContent = NF_PRODUCT_LIGHTBOX_STATE.productName || "";
  if (counterEl) counterEl.textContent = `${idx + 1} / ${images.length}`;
}

function nfOpenProductLightbox(images, startIndex, productName) {
  if (!images || !images.length) return;
  if (nfProductLightboxUiAbort) {
    nfProductLightboxUiAbort.abort();
    nfProductLightboxUiAbort = null;
  }
  nfDisposeImageZoomPan("lightbox");

  const root = nfEnsureProductLightbox();
  NF_PRODUCT_LIGHTBOX_STATE = {
    images: images.slice(),
    index: Math.max(0, Math.min(startIndex || 0, images.length - 1)),
    productName: productName || "",
  };

  nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index);
  root.classList.add("is-open");

  const closeBtn = root.querySelector(".nf-product-lightbox-close");
  const prevBtn = root.querySelector(".nf-product-lightbox-prev");
  const nextBtn = root.querySelector(".nf-product-lightbox-next");
  const imageEl = root.querySelector(".nf-product-lightbox-image");
  const imageWrap = root.querySelector(".nf-product-lightbox-image-wrap");
  const clipEl = root.querySelector(".nf-product-lightbox-img-clip");

  const ac = new AbortController();
  nfProductLightboxUiAbort = ac;
  const sig = ac.signal;

  if (closeBtn) closeBtn.addEventListener("click", nfCloseProductLightbox, { signal: sig });
  if (prevBtn) {
    prevBtn.addEventListener(
      "click",
      () => nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index - 1),
      { signal: sig }
    );
  }
  if (nextBtn) {
    nextBtn.addEventListener(
      "click",
      () => nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index + 1),
      { signal: sig }
    );
  }

  let touchStartX = null;
  if (imageWrap) {
    imageWrap.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0]?.clientX ?? null;
      },
      { passive: true, signal: sig }
    );
    imageWrap.addEventListener(
      "touchend",
      (e) => {
        if (touchStartX == null || !NF_PRODUCT_LIGHTBOX_STATE) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
        if (Math.abs(dx) > 40) {
          if (dx < 0) nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index + 1);
          else nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index - 1);
        }
        touchStartX = null;
      },
      { passive: true, signal: sig }
    );
  }

  document.addEventListener("keydown", nfProductLightboxKeyHandler, { signal: sig });

  if (clipEl && imageEl) {
    nfAttachImageZoomPan({
      viewport: clipEl,
      img: imageEl,
      scale: NF_MODAL_LIGHTBOX_ZOOM_SCALE,
      disposeKey: "lightbox",
      wheelZoom: true,
      maxScale: NF_MODAL_LIGHTBOX_WHEEL_MAX_SCALE,
      isAllowed: () =>
        !!NF_PRODUCT_LIGHTBOX_STATE &&
        NF_PRODUCT_LIGHTBOX_STATE.images.length > 0 &&
        !!imageEl.src &&
        !String(imageEl.src).startsWith("data:image/svg+xml"),
    });
  }
}

function nfDismissToastElement(toast) {
  if (!toast || toast.dataset.nfToastDismissed === "1") return;
  toast.dataset.nfToastDismissed = "1";
  if (toast._nfToastClearTimer) toast._nfToastClearTimer();
  toast.classList.remove("nf-toast-item--visible");
  toast.classList.add("nf-toast-item--leaving");
  const finish = () => {
    toast.removeEventListener("transitionend", finish);
    toast.remove();
  };
  toast.addEventListener("transitionend", finish);
  setTimeout(() => {
    if (toast.isConnected) toast.remove();
  }, 420);
}

function nfPushToast(options) {
  const message = String(options?.message ?? "");
  const variant = options?.variant === "success" ? "success" : "info";
  const duration = typeof options?.duration === "number" ? options.duration : 4200;
  const actionLabel = options?.actionLabel;
  const onAction = options?.onAction;
  const pauseOnHover = options?.pauseOnHover !== false;

  const container = nfEl("toastContainer");
  if (!container) return null;

  const toast = document.createElement("div");
  toast.className = `nf-toast-item nf-toast-item--${variant}`;
  toast.setAttribute("role", "status");

  const row = document.createElement("div");
  row.className = "nf-toast-item__row";

  const msg = document.createElement("div");
  msg.className = "nf-toast-item__message";
  msg.textContent = message;
  row.appendChild(msg);

  if (actionLabel && typeof onAction === "function") {
    const action = document.createElement("button");
    action.type = "button";
    action.className = "nf-toast-item__action";
    action.textContent = actionLabel;
    action.addEventListener("click", (e) => {
      e.stopPropagation();
      const r = onAction();
      if (r !== false) nfDismissToastElement(toast);
    });
    row.appendChild(action);
  }

  toast.appendChild(row);
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("nf-toast-item--visible"));
  });

  let hideTimer = null;
  let endsAt = Date.now() + Math.max(0, duration);

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function scheduleHide() {
    clearHideTimer();
    if (duration <= 0) return;
    const ms = Math.max(0, endsAt - Date.now());
    if (ms === 0) {
      nfDismissToastElement(toast);
      return;
    }
    hideTimer = setTimeout(() => nfDismissToastElement(toast), ms);
  }

  scheduleHide();

  let remainingOnPause = duration;
  if (pauseOnHover && duration > 0) {
    toast.addEventListener("mouseenter", () => {
      clearHideTimer();
      remainingOnPause = Math.max(0, endsAt - Date.now());
    });
    toast.addEventListener("mouseleave", () => {
      endsAt = Date.now() + remainingOnPause;
      scheduleHide();
    });
  }

  toast._nfToastClearTimer = clearHideTimer;
  return toast;
}

/** Обратная совместимость: простое текстовое уведомление. */
function nfShowToast(message, opts) {
  const o = opts && typeof opts === "object" ? opts : {};
  nfPushToast({
    message: String(message ?? ""),
    variant: o.variant === "success" ? "success" : "info",
    duration: typeof o.duration === "number" ? o.duration : 3800,
    pauseOnHover: o.pauseOnHover !== false,
  });
}

function nfGetPartnerName(partnerId) {
  return NF_DATA.partners.find((x) => x.id === partnerId)?.name || "";
}

function nfPartnerShortName(p) {
  if (!p || !p.name) return "";
  // короткое имя для плиток: первая часть или бренд без юрид. суффиксов
  const name = String(p.name).trim();
  const stripped = name
    .replace(/\b(inc\.?|ltd\.?|llc|gmbh|ag|sa|s\.a\.|co\.?|corp\.?|corporation|ооо|ао|зао)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  const first = stripped.split(" ").slice(0, 2).join(" ");
  return first || name;
}

function nfPartnerSlug(partner) {
  if (!partner) return "";
  if (partner.slug && String(partner.slug).trim()) return String(partner.slug).trim().toLowerCase();
  if (partner.id === "ganshorn") return "ganhorn-medizin";
  return String(partner.id || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function nfPartnerOpenUrlBySlug(slug) {
  const normalized = String(slug || "").trim().toLowerCase();
  return normalized ? `/partners/${normalized}` : "/partners";
}

function nfPartnersPageUrlWithoutOpen() {
  return "/partners";
}

/** Латиница для сегментов URL (кириллица → латиница, остальное выкидываем). */
function nfSlugifyPathPart(raw) {
  const map = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  let s = String(raw || "")
    .trim()
    .toLowerCase();
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (map[ch]) out += map[ch];
    else if (/[a-z0-9]/.test(ch)) out += ch;
    else if (/[\s._/\\|+,;:]/.test(ch) || ch === "-") out += "-";
  }
  return out.replace(/-+/g, "-").replace(/^-|-$/g, "") || "item";
}

function nfProductPermalinkSegment(product) {
  if (!product) return "";
  const idPart = nfSlugifyPathPart(String(product.id || ""));
  const seoSlug =
    product.seo && product.seo.slug && String(product.seo.slug).trim()
      ? nfSlugifyPathPart(String(product.seo.slug).trim())
      : "";
  const namePart = nfSlugifyPathPart(String(product.name || ""));
  const base = seoSlug || namePart || idPart;
  if (!base || base === idPart) return idPart;
  return `${base}-${idPart}`.replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/** idle | loading | ok | error — чтобы PDP не редиректила в каталог до ответа /api/catalog */
let NF_CATALOG_LOAD_STATE = "idle";

function nfFindProductByPermalink(segment) {
  const seg = String(segment || "").trim().toLowerCase();
  if (!seg) return null;
  const list = (NF_DATA.products || []).filter((p) => p && !p.isHidden);
  const partners = NF_DATA.partners || [];

  const pick = (pred) => list.find(pred);

  const byCanonical = pick((p) => nfProductPermalinkSegment(p) === seg);
  if (byCanonical) return byCanonical;

  const bySeoSlug = pick(
    (p) => p.seo && p.seo.slug && nfSlugifyPathPart(String(p.seo.slug).trim()) === seg
  );
  if (bySeoSlug) return bySeoSlug;

  const byTopSlug = pick((p) => p.slug && nfSlugifyPathPart(String(p.slug).trim()) === seg);
  if (byTopSlug) return byTopSlug;

  const byIdSlug = pick((p) => nfSlugifyPathPart(String(p.id || "")) === seg);
  if (byIdSlug) return byIdSlug;

  const byNameSlug = pick((p) => nfSlugifyPathPart(String(p.name || "")) === seg);
  if (byNameSlug) return byNameSlug;

  const rawId = pick((p) => String(p.id || "").toLowerCase() === seg);
  if (rawId) return rawId;

  const partnerSlug = (p) => {
    const pr = partners.find((x) => x.id === p.partnerId);
    if (!pr) return "";
    return nfSlugifyPathPart(String(pr.name || pr.id || ""));
  };

  const partnerExact = list.filter((p) => partnerSlug(p) === seg);
  if (partnerExact.length === 1) return partnerExact[0];

  const partnerLoose = list.filter((p) => {
    const ps = partnerSlug(p);
    if (!ps) return false;
    if (ps === seg) return true;
    if (ps.startsWith(`${seg}-`)) return true;
    if (seg.startsWith(`${ps}-`)) return true;
    return false;
  });
  if (partnerLoose.length === 1) return partnerLoose[0];

  const byPrefix = list.filter((p) => {
    const full = nfProductPermalinkSegment(p);
    return full === seg || full.startsWith(`${seg}-`);
  });
  if (byPrefix.length === 1) return byPrefix[0];

  return null;
}

function nfCategoryPermalinkSlug(category) {
  if (!category) return "";
  const explicit = category.slug || (category.seo && category.seo.slug);
  if (explicit && String(explicit).trim()) return nfSlugifyPathPart(String(explicit).trim());
  return nfSlugifyPathPart(String(category.id || ""));
}

function nfFindCategoryByPermalink(segment) {
  const seg = String(segment || "").trim().toLowerCase();
  if (!seg) return null;
  return (NF_DATA.categories || []).find((c) => nfCategoryPermalinkSlug(c) === seg) || null;
}

function nfNewsPermalinkSlug(newsItem) {
  if (!newsItem) return "";
  if (newsItem.slug && String(newsItem.slug).trim()) return nfSlugifyPathPart(String(newsItem.slug).trim());
  return nfSlugifyPathPart(String(newsItem.id || ""));
}

function nfFindNewsByPermalink(segment) {
  const seg = String(segment || "").trim().toLowerCase();
  if (!seg) return null;
  return (NF_DATA.news || []).find((n) => nfNewsPermalinkSlug(n) === seg) || null;
}

function nfFindPartnerByPermalink(segment) {
  const seg = String(segment || "").trim().toLowerCase();
  if (!seg) return null;
  return (NF_DATA.partners || []).find((p) => nfPartnerSlug(p) === seg) || null;
}

function nfPathSegments() {
  return location.pathname
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .map((x) => String(x).toLowerCase());
}

/**
 * Определяет страницу SPA по pathname, выставляет NF_STATE для детальных сущностей.
 * @returns {{ page: string, path: string }}
 */
function nfResolvePageFromLocation() {
  const parts = nfPathSegments();
  const isCatalogProductPath = parts[0] === "catalog" && Boolean(parts[1]);
  if (!isCatalogProductPath) {
    NF_STATE.pendingProductPermalink = null;
  }

  if (!parts.length) {
    const h = location.hash.replace("#", "").trim();
    if (h && NF_ROUTES[h]) {
      return { page: h, path: h === "home" ? "/" : `/${h}` };
    }
    return { page: "home", path: "/" };
  }

  const [a, b] = [parts[0], parts[1]];

  const top = new Set(["about", "contacts", "legal", "admin", "catalog", "partners", "news"]);
  if (top.has(a) && !b) {
    if (a === "catalog") {
      NF_STATE.productDetailProductId = null;
      NF_STATE.productModalProductId = null;
      NF_STATE.pendingCatalogProductId = null;
      return { page: "catalog", path: "/catalog" };
    }
    if (a === "partners") return { page: "partners", path: "/partners" };
    if (a === "news") return { page: "news", path: "/news" };
    return { page: a, path: `/${a}` };
  }

  if (a === "catalog" && b) {
    const p = nfFindProductByPermalink(b);
    if (p) {
      NF_STATE.pendingProductPermalink = null;
      NF_STATE.productDetailProductId = p.id;
      NF_STATE.productModalProductId = p.id;
      return { page: "product", path: `/catalog/${b}` };
    }
    NF_STATE.productDetailProductId = null;
    NF_STATE.productModalProductId = null;
    NF_STATE.pendingProductPermalink = b;
    return { page: "product", path: `/catalog/${b}` };
  }

  if (a === "categories" && b) {
    const c = nfFindCategoryByPermalink(b);
    if (c) {
      NF_STATE.categoryDetailId = c.id;
      return { page: "category", path: `/categories/${b}` };
    }
    return { page: "home", path: "/" };
  }

  if (a === "partners" && b) {
    const pr = nfFindPartnerByPermalink(b);
    if (pr) {
      NF_STATE.selectedPartnerId = pr.id;
      return { page: "partners", path: `/partners/${b}` };
    }
    return { page: "partners", path: "/partners" };
  }

  if (a === "news" && b) {
    const n = nfFindNewsByPermalink(b);
    if (n) {
      NF_STATE.newsArticleId = n.id;
      NF_STATE.selectedNewsId = n.id;
      return { page: "newsArticle", path: `/news/${b}` };
    }
    return { page: "news", path: "/news" };
  }

  if (NF_ROUTES[a]) return { page: a, path: `/${a}` };

  return { page: "home", path: "/" };
}

function nfNavKeyForPage(page) {
  if (page === "product" || page === "category") return "catalog";
  if (page === "newsArticle") return "news";
  return page;
}

function nfNavigate(page) {
  const safe = NF_ROUTES[page] ? page : "home";
  let path = "/";
  if (safe === "home") path = "/";
  else if (safe === "product") {
    const p = NF_DATA.products.find((x) => String(x.id) === String(NF_STATE.productDetailProductId));
    path = p ? `/catalog/${nfProductPermalinkSegment(p)}` : "/catalog";
  } else path = `/${safe}`;
  history.pushState({ page: safe }, "", path);
  nfLoadPage(safe);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function nfGoPath(path) {
  const p = String(path || "").trim() || "/";
  try {
    const u = new URL(p, window.location.origin);
    const next = u.pathname + (u.search || "");
    history.pushState({}, "", next);
    const r = nfResolvePageFromLocation();
    nfLoadPage(r.page);
    window.scrollTo({ top: 0, behavior: "auto" });
  } catch (_e) {}
}

function nfSetPartnerLogo(imgEl, partnerId) {
  if (!imgEl || !partnerId) return;

  const id = String(partnerId);
  const partner = (NF_DATA.partners || []).find((p) => p.id === id);

  // Если в данных указан логотип — используем его как есть (любой путь и расширение)
  if (partner && partner.logo && String(partner.logo).trim()) {
    imgEl.onerror = null;
    imgEl.src = String(partner.logo).trim();
    return;
  }

  // Если логотип не задан — больше не пытаемся угадывать имя файла,
  // сразу ставим встроенную svg-заглушку, чтобы не плодить 404
  imgEl.onerror = null;
  imgEl.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cdefs%3E%3ClinearGradient id='pbg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f5faf9'/%3E%3Cstop offset='1' stop-color='%23e2ecea'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='8' y='8' width='80' height='80' rx='24' fill='url(%23pbg)'/%3E%3Ccircle cx='48' cy='40' r='18' fill='%23ffffff' stroke='%23d1e3e0' stroke-width='1.5'/%3E%3Ctext x='48' y='44' text-anchor='middle' dominant-baseline='middle' font-family='system-ui,-apple-system,BlinkMacSystemFont,%22SF Pro Text%22,Inter,sans-serif' font-size='14' font-weight='600' fill='%234b5563'%3E%3F%3C/text%3E%3C/svg%3E";
}

function nfNavigateToCatalogProduct(productId) {
  nfOpenProductPage(productId);
}

function nfOpenProductPage(productId) {
  NF_STATE.productModalProductId = productId;
  NF_STATE.productDetailProductId = productId;
  nfNavigate("product");
}

/* ====== API ====== */
async function nfApiJson(path, opts = {}) {
  const base = (NF_CONFIG.API_BASE || "").replace(/\/$/, "");
  const url = base + path;
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

function nfApiBase() {
  return (NF_CONFIG.API_BASE || "").replace(/\/$/, "");
}

async function nfLoadCatalogFromApi(options = {}) {
  const requestLang = String(options.lang || NF_STATE.lang || "ru");
  const requestSeq = ++NF_CATALOG_REQUEST_SEQ;
  NF_CATALOG_ACTIVE_REQUEST_SEQ = requestSeq;
  NF_CATALOG_LOAD_STATE = "loading";
  const base = nfApiBase();
  const url = (base || "") + "/api/catalog?lang=" + encodeURIComponent(requestLang);
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("API " + res.status);
    const data = await res.json();
    if (requestSeq !== NF_CATALOG_ACTIVE_REQUEST_SEQ) return;
    if (requestLang !== String(NF_STATE.lang || "ru")) return;

    if (data.categories) NF_DATA.categories = data.categories;

    // Берём логотипы партнёров из начальных данных, если API их не прислал (для обратной совместимости)
    if (data.partners && Array.isArray(data.partners)) {
      const existingById = new Map(
        (NF_DATA.partners || []).map((p) => [String(p.id), p])
      );

      NF_DATA.partners = data.partners.map((p) => {
        const id = String(p.id);
        const existing = existingById.get(id);

        if (existing && !p.logo && existing.logo) {
          return { ...p, logo: existing.logo };
        }

        return p;
      });
    }

    if (data.products) NF_DATA.products = data.products;
    if (data.news) NF_DATA.news = data.news;
    nfRecalcCategoryCounts();
    NF_CATALOG_LOAD_STATE = "ok";
  } catch (_e) {
    if (requestSeq !== NF_CATALOG_ACTIVE_REQUEST_SEQ) return;
    console.warn("НаноФарм: API недоступен, используются начальные данные.");
    NF_CATALOG_LOAD_STATE = "error";
  } finally {
    if (requestSeq !== NF_CATALOG_ACTIVE_REQUEST_SEQ) return;
    nfOnCatalogLoaded();
  }
}

function nfOnCatalogLoaded() {
  const page = NF_STATE.currentPage;
  if (page === "home") nfInitHomePage();
  else if (page === "catalog") nfInitCatalogPage();
  else if (page === "product") nfInitProductPage();
  else if (page === "category") nfInitCategoryPage();
  else if (page === "partners") nfInitPartnersPage();
  else if (page === "news") nfInitNewsPage();
  else if (page === "newsArticle") nfInitNewsArticlePage();
  nfInitViewportReveal(nfEl("page-root"));
}

/* ====== РОУТЕР ====== */
let NF_CATALOG_SENTINEL_IO = null;
const NF_CATALOG_FILTERS_COLLAPSED_KEY = "nf_catalog_filters_collapsed";
/** Слушатель window.resize для панели фильтров каталога — только один экземпляр, иначе лаги после каждого захода в каталог */
let NF_CATALOG_LAYOUT_RESIZE_BOUND = false;
let NF_MOTION_REVEAL_IO = null;
let NF_REVEAL_SAFETY_TIMER = null;

function nfDisconnectCatalogRevealAndSentinel() {
  if (NF_CATALOG_SENTINEL_IO) {
    NF_CATALOG_SENTINEL_IO.disconnect();
    NF_CATALOG_SENTINEL_IO = null;
  }
}

function nfDisconnectRevealObserver() {
  if (NF_MOTION_REVEAL_IO) {
    NF_MOTION_REVEAL_IO.disconnect();
    NF_MOTION_REVEAL_IO = null;
  }
  if (NF_REVEAL_SAFETY_TIMER != null) {
    clearTimeout(NF_REVEAL_SAFETY_TIMER);
    NF_REVEAL_SAFETY_TIMER = null;
  }
}

function nfCatalogApplyFiltersCollapsedUI(collapsed, opts) {
  const noReflowEvent = opts && opts.noReflowEvent;
  const catalogLayout = document.querySelector(".nf-catalog-layout");
  const filtersSheetBtn = nfEl("catalogFiltersSheetBtn");
  if (!catalogLayout) return;
  catalogLayout.classList.toggle("is-filters-collapsed", collapsed);
  if (filtersSheetBtn) {
    filtersSheetBtn.classList.toggle("is-active", !collapsed);
    filtersSheetBtn.setAttribute("aria-expanded", String(!collapsed));
  }
  if (!noReflowEvent) {
    requestAnimationFrame(() => {
      try {
        window.dispatchEvent(new Event("resize"));
      } catch (_e) {}
    });
  }
}

function nfCatalogDesktopFiltersSyncFromWindow() {
  const catalogLayout = document.querySelector(".nf-catalog-layout");
  const filtersSheetBtn = nfEl("catalogFiltersSheetBtn");
  if (!catalogLayout || !filtersSheetBtn) return;
  const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
  if (!isDesktop) {
    catalogLayout.classList.remove("is-filters-collapsed");
    filtersSheetBtn.classList.remove("is-active");
    filtersSheetBtn.removeAttribute("aria-expanded");
    return;
  }
  const initialCollapsed = localStorage.getItem(NF_CATALOG_FILTERS_COLLAPSED_KEY) === "1";
  nfCatalogApplyFiltersCollapsedUI(initialCollapsed, { noReflowEvent: true });
}

function nfDisconnectCatalogLayoutResize() {
  if (!NF_CATALOG_LAYOUT_RESIZE_BOUND) return;
  window.removeEventListener("resize", nfCatalogDesktopFiltersSyncFromWindow);
  NF_CATALOG_LAYOUT_RESIZE_BOUND = false;
}

/** Перед подменой #page-root: снять глобальные подписки каталога / reveal / home motion */
function nfRouteTeardownBeforeLoad() {
  nfDisconnectHomeObservers();
  nfDisconnectCatalogRevealAndSentinel();
  nfDisconnectRevealObserver();
  nfDisconnectCatalogLayoutResize();
}

function nfRevealSyncNearViewport(scope) {
  if (!scope || !scope.querySelectorAll) return;
  const vh = window.innerHeight || 640;
  scope.querySelectorAll(".nf-vp-reveal:not(.is-visible), .nf-enter:not(.is-visible)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom > -40 && r.top < vh + 40) {
      el.classList.add("is-visible");
    }
  });
}

function nfDisconnectHomeObservers() {
  if (typeof window._nfPopularCleanup === "function") {
    try {
      window._nfPopularCleanup();
    } catch (_e) {}
    window._nfPopularCleanup = null;
  }
  if (typeof window._nfPopularResizeCleanup === "function") {
    try {
      window._nfPopularResizeCleanup();
    } catch (_e) {}
    window._nfPopularResizeCleanup = null;
  }
  nfDisconnectPremiumHeroMotion();
  if (typeof NF_LOGO_PARTICLES_CLEANUP === "function") {
    try { NF_LOGO_PARTICLES_CLEANUP(); } catch (_e) {}
    NF_LOGO_PARTICLES_CLEANUP = null;
  }
}

function nfDisconnectPremiumHeroMotion() {
  if (typeof window._nfPremiumHeroCleanup === "function") {
    try {
      window._nfPremiumHeroCleanup();
    } catch (_e) {}
    window._nfPremiumHeroCleanup = null;
  }
  const root = document.querySelector("#nf-premium-hero-root[data-nf-premium-hero]");
  const mount = root && root.querySelector(".nf-hero-brand-particles");
  if (mount) mount.innerHTML = "";
}

function nfPrefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (_e) {
    return false;
  }
}

function nfInitViewportReveal(root) {
  nfDisconnectRevealObserver();
  const scope = root && root.querySelectorAll ? root : document;
  nfRevealSyncNearViewport(scope);

  const pending = scope.querySelectorAll(".nf-vp-reveal:not(.is-visible), .nf-enter:not(.is-visible)");
  if (!pending.length) return;

  const revealImmediate = () => {
    scope.querySelectorAll(".nf-vp-reveal:not(.is-visible), .nf-enter:not(.is-visible)").forEach((el) => {
      el.classList.add("is-visible");
    });
  };

  if (document.body.classList.contains("nf-admin-mode") || nfPrefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealImmediate();
    return;
  }

  const mark = (el) => {
    el.classList.add("is-visible");
    NF_MOTION_REVEAL_IO?.unobserve(el);
  };

  NF_MOTION_REVEAL_IO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) mark(e.target);
      });
    },
    { root: null, rootMargin: "0px 0px 2% 0px", threshold: 0.02 }
  );

  scope.querySelectorAll(".nf-vp-reveal:not(.is-visible), .nf-enter:not(.is-visible)").forEach((el) => {
    NF_MOTION_REVEAL_IO.observe(el);
  });

  nfRevealSyncNearViewport(scope);

  NF_REVEAL_SAFETY_TIMER = window.setTimeout(() => {
    NF_REVEAL_SAFETY_TIMER = null;
    revealImmediate();
  }, 2800);
}

/**
 * Секции/карточки с классами .nf-vp-reveal и .nf-enter — появление при скролле (один раз).
 */
function nfSimpleReveal(root) {
  nfInitViewportReveal(root || nfEl("page-root"));
}

function nfRevealObserveElements(elements) {
  if (!elements || !elements.length) return;
  if (nfPrefersReducedMotion() || document.body.classList.contains("nf-admin-mode")) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  if ("IntersectionObserver" in window && NF_MOTION_REVEAL_IO) {
    elements.forEach((el) => {
      if ((el.classList.contains("nf-vp-reveal") || el.classList.contains("nf-enter")) && !el.classList.contains("is-visible")) {
        NF_MOTION_REVEAL_IO.observe(el);
      } else {
        el.classList.add("is-visible");
      }
    });
    return;
  }
  elements.forEach((el) => el.classList.add("is-visible"));
}

function nfSimpleRevealObserveElements(elements) {
  nfRevealObserveElements(elements);
}

function nfRunPageEnterAnimation() {
  const root = nfEl("page-root");
  if (!root) return;

  root.classList.remove("nf-page-leave", "nf-page-enter", "nf-page-enter--ready");

  if (nfPrefersReducedMotion()) {
    return;
  }

  root.classList.add("nf-page-enter");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.add("nf-page-enter--ready");
    });
  });
  window.setTimeout(() => {
    root.classList.add("nf-page-enter--ready");
  }, 380);
}

function nfRunPageLeaveAnimation(root) {
  if (!root || nfPrefersReducedMotion()) return Promise.resolve();
  root.classList.remove("nf-page-enter", "nf-page-enter--ready");
  root.classList.add("nf-page-leave");
  return new Promise((resolve) => {
    window.setTimeout(resolve, 140);
  });
}

/**
 * Перед сменой страницы: lightbox/zoom PDP и модалка товара живут вне #page-root (на body).
 * Если их не закрыть, остаётся fixed-слой с pointer-events: auto — каталог «мертвый» для кликов.
 */
function nfCleanupSpaOverlaysBeforeRoute() {
  nfCloseProductLightbox();
  nfDisposeImageZoomPan("pdp");
  nfCloseProductModal();
  nfUpdateOverlayBody();
}

const NF_ROUTES = {
  home: "pages/home.html",
  catalog: "pages/catalog.html",
  category: "pages/category.html",
  partners: "pages/partners.html",
  news: "pages/news.html",
  newsArticle: "pages/news-detail.html",
  about: "pages/about.html",
  legal: "pages/legal.html",
  contacts: "pages/contacts.html",
  admin: "pages/admin.html",
  product: "pages/product.html",
};

async function nfLoadPage(page) {
  nfRouteTeardownBeforeLoad();

  const root = nfEl("page-root");
  if (!root) return;

  const safe = NF_ROUTES[page] ? page : "home";
  const fragmentPath = NF_ROUTES[safe];
  const path = fragmentPath.startsWith("/") ? fragmentPath : `/${fragmentPath}`;
  const fetchPromise = fetch(path, { cache: "no-store" });
  await nfRunPageLeaveAnimation(root);

  try {
    const res = await fetchPromise;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    nfAbortEnhancedSelectsInRoot(root);
    nfCleanupSpaOverlaysBeforeRoute();
    root.innerHTML = html;
    const addedBindings = nfRegisterAutoI18nBindings(root);
    if (addedBindings > 0 && String(NF_STATE.lang || "ru") !== "ru") {
      nfRefreshDynamicTranslations(2).catch(() => {});
    }
  } catch (e) {
    nfAbortEnhancedSelectsInRoot(root);
    nfCleanupSpaOverlaysBeforeRoute();
    root.innerHTML = `
      <section class="nf-section">
        <div class="nf-container">
          <h1 style="margin:0 0 8px;">${nfEscapeHtml(nfT("common.pageLoadFailed", "Страница не загрузилась"))}</h1>
          <p style="margin:0;color:${NF_PALETTE.muted};">
            ${nfEscapeHtml(nfFormatTemplate(nfT("common.pageLoadFailedPath", "Не удалось загрузить {path}."), { path }))}
            ${nfEscapeHtml(nfT("common.pageLoadFailedHint", "Проверь: файл существует, путь верный, и ты открываешь сайт через локальный сервер (Live Server)."))}
          </p>
        </div>
      </section>
    `;
    const addedBindings = nfRegisterAutoI18nBindings(root);
    if (addedBindings > 0 && String(NF_STATE.lang || "ru") !== "ru") {
      nfRefreshDynamicTranslations(2).catch(() => {});
    }
    console.error("nfLoadPage error:", e);
  }

  NF_STATE.currentPage = safe;
  nfSetActiveNav(nfNavKeyForPage(safe));
  nfApplyTranslations();
  document.body.classList.toggle("nf-admin-mode", safe === "admin");

  // init page hooks
  if (safe === "home") nfInitHomePage();
  if (safe === "catalog") nfInitCatalogPage();
  if (safe === "product") nfInitProductPage();
  if (safe === "category") nfInitCategoryPage();
  if (safe === "partners") nfInitPartnersPage();
  if (safe === "news") nfInitNewsPage();
  if (safe === "newsArticle") nfInitNewsArticlePage();
  if (safe === "legal") nfInitLegalPage();
  if (safe === "contacts") nfInitContactsPage();
  if (safe === "about") nfInitAboutPage();
  if (safe === "admin") nfInitAdminPage();

  nfRunPageEnterAnimation();
  nfInitViewportReveal(root);
}

const NF_NAV_INDICATOR = {
  initialized: false,
  hasPosition: false,
  resizeBound: false,
  resizeRafId: 0,
  lastX: 0,
  lastY: 0,
  lastW: 0,
  moveTimerId: 0,
};

function nfInitNavIndicator() {
  const nav = nfEl("mainNav");
  if (!nav) return null;
  let indicator = nav.querySelector(".nf-nav-indicator");
  if (!indicator) {
    indicator = document.createElement("span");
    indicator.className = "nf-nav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.appendChild(indicator);
  }
  if (!NF_NAV_INDICATOR.resizeBound) {
    NF_NAV_INDICATOR.resizeBound = true;
    window.addEventListener(
      "resize",
      () => {
        if (NF_NAV_INDICATOR.resizeRafId) cancelAnimationFrame(NF_NAV_INDICATOR.resizeRafId);
        NF_NAV_INDICATOR.resizeRafId = requestAnimationFrame(() => {
          NF_NAV_INDICATOR.resizeRafId = 0;
          nfRefreshNavIndicator({ animate: false });
        });
      },
      { passive: true }
    );
  }
  NF_NAV_INDICATOR.initialized = true;
  return { nav, indicator };
}

function nfNavIndicatorClearFlow() {
  if (NF_NAV_INDICATOR.moveTimerId) {
    clearTimeout(NF_NAV_INDICATOR.moveTimerId);
    NF_NAV_INDICATOR.moveTimerId = 0;
  }
}

function nfNavIndicatorApplyGeom(indicator, x, y, w) {
  indicator.style.width = `${Math.round(w)}px`;
  indicator.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
}

function nfNavIndicatorReadGeom(indicator, nav) {
  const navRect = nav.getBoundingClientRect();
  const r = indicator.getBoundingClientRect();
  return {
    x: Math.round(r.left - navRect.left),
    y: Math.round(r.top - navRect.top),
    w: Math.round(r.width),
  };
}

function nfNavIndicatorGetTargetGeom(navRect, targetRect) {
  const bottomOffset = 6;
  const maxByItem = Math.max(20, Math.round(targetRect.width - 10));
  let w = Math.round(targetRect.width * 0.56);
  w = Math.max(24, Math.min(64, w));
  w = Math.min(w, maxByItem);
  const centerX = targetRect.left - navRect.left + targetRect.width / 2;
  const x = centerX - w / 2;
  const y = targetRect.bottom - navRect.top + bottomOffset;
  return { x, y, w };
}

function nfUpdateNavIndicator(targetEl, animate = true) {
  const refs = nfInitNavIndicator();
  if (!refs) return;
  const { nav, indicator } = refs;
  if (!(targetEl instanceof HTMLElement) || !nav.contains(targetEl)) {
    nfNavIndicatorClearFlow();
    indicator.classList.remove("is-visible", "is-moving");
    NF_NAV_INDICATOR.hasPosition = false;
    return;
  }

  const navRect = nav.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();
  const next = nfNavIndicatorGetTargetGeom(navRect, targetRect);
  const oldG =
    indicator.classList.contains("is-moving") && indicator.classList.contains("is-visible")
      ? nfNavIndicatorReadGeom(indicator, nav)
      : {
          x: NF_NAV_INDICATOR.lastX,
          y: NF_NAV_INDICATOR.lastY,
          w: NF_NAV_INDICATOR.lastW,
        };

  const shouldMove =
    animate &&
    NF_NAV_INDICATOR.hasPosition &&
    !nfPrefersReducedMotion() &&
    (Math.abs(next.x - oldG.x) > 1 || Math.abs(next.y - oldG.y) > 1 || Math.abs(next.w - oldG.w) > 1);

  nfNavIndicatorClearFlow();

  if (!shouldMove) {
    indicator.classList.add("is-instant");
    nfNavIndicatorApplyGeom(indicator, next.x, next.y, next.w);
    indicator.classList.remove("is-moving");
    indicator.classList.add("is-visible");
    NF_NAV_INDICATOR.hasPosition = true;
    NF_NAV_INDICATOR.lastX = next.x;
    NF_NAV_INDICATOR.lastY = next.y;
    NF_NAV_INDICATOR.lastW = next.w;
    requestAnimationFrame(() => indicator.classList.remove("is-instant"));
    return;
  }

  const centerPrev = oldG.x + oldG.w / 2;
  const centerNext = next.x + next.w / 2;
  const distance = Math.abs(centerNext - centerPrev);
  const moveMs = Math.min(420, Math.max(220, Math.round(200 + distance * 0.72)));

  indicator.classList.add("is-instant");
  nfNavIndicatorApplyGeom(indicator, oldG.x, oldG.y, oldG.w);
  indicator.classList.add("is-visible", "is-moving");
  indicator.style.setProperty("--nf-nav-line-duration", `${moveMs}ms`);

  requestAnimationFrame(() => {
    indicator.classList.remove("is-instant");
    nfNavIndicatorApplyGeom(indicator, next.x, next.y, next.w);
  });

  NF_NAV_INDICATOR.moveTimerId = window.setTimeout(() => {
    indicator.classList.remove("is-moving");
    NF_NAV_INDICATOR.moveTimerId = 0;
    NF_NAV_INDICATOR.lastX = next.x;
    NF_NAV_INDICATOR.lastY = next.y;
    NF_NAV_INDICATOR.lastW = next.w;
  }, moveMs);

  NF_NAV_INDICATOR.hasPosition = true;
}

function initNavIndicator() {
  return nfInitNavIndicator();
}

function updateNavIndicator(targetEl, animate = true) {
  return nfUpdateNavIndicator(targetEl, animate);
}

function nfRefreshNavIndicator(options = {}) {
  const opts = { animate: true, ...options };
  const nav = nfEl("mainNav");
  const active = nav?.querySelector(".nf-nav-link.nf-nav-link-active") || null;
  nfUpdateNavIndicator(active, opts.animate);
}

function nfSetActiveNav(page) {
  document.querySelectorAll(".nf-nav-link, .nf-mobile-menu__link, .nf-footer-link").forEach((el) => {
    const active = el.dataset.page === page;
    el.classList.toggle("nf-nav-link-active", active && (el.classList.contains("nf-nav-link") || el.classList.contains("nf-mobile-menu__link")));
    el.classList.toggle("nf-footer-link-active", active && el.classList.contains("nf-footer-link"));
    el.setAttribute("aria-current", active ? "page" : "false");
  });
  requestAnimationFrame(() => nfRefreshNavIndicator({ animate: true }));
}

window.addEventListener("popstate", () => {
  const r = nfResolvePageFromLocation();
  nfLoadPage(r.page);
  window.scrollTo({ top: 0, behavior: "auto" });
});

/* ====== ЯЗЫК / ПЕРЕВОД ====== */
const NF_UI_EXTRA_RU = {
  "brand.name": "НаноФарм",
  "nav.home": "Главная",
  "nav.catalog": "Каталог",
  "nav.partners": "Партнёры",
  "nav.news": "Новости",
  "nav.about": "О компании",
  "nav.contacts": "Контакты",
  "nav.admin": "Админ-панель",
  "header.quickQuote": "Быстрый запрос цены",
  "search.placeholder": "Поиск по названию, модели, артикулу, партнёру…",
  "footer.nav": "Навигация",
  "footer.clients": "Клиентам",
  "footer.legal": "Правовая информация",
  "footer.about": "Комплексные решения по поставке медицинского оборудования для клиник, лабораторий и диагностических центров. Проектирование, монтаж, обучение и сервисное сопровождение.",
  "footer.ctaKicker": "Готовы обсудить проект",
  "footer.ctaLead": "Свяжитесь с отделом продаж — подберём оборудование под вашу задачу.",
  "footer.ctaButton": "Связаться",
  "common.popularBadge": "Популярный",
  "common.priceOnRequest": "Цена по запросу",
  "common.commercialOffer": "коммерческое предложение",
  "common.addToRequest": "В запрос",
  "common.inRequest": "В запросе",
  "common.details": "Подробнее",
  "common.goTo": "Перейти",
  "common.viewProducts": "Смотреть продукцию",
  "common.news": "Новости",
  "common.openNews": "Открыть новость",
  "common.readMaterial": "Читать материал",
  "common.noNewsYet": "Новостей пока нет.",
  "common.remove": "Удалить",
  "common.qtyShort": "Кол-во",
  "common.unitsShort": "шт.",
  "common.categoryUnknown": "Категория не указана",
  "common.estimatedQuote": "ориентировочно, уточняется в КП",
  "common.searchNothingFound": "Ничего не найдено",
  "search.group.products": "Товары",
  "search.group.categories": "Категории",
  "search.group.partners": "Партнёры",
  "home.hero.aria": "Главный экран",
  "home.hero.brandLineLead": "Поставки, данные и сервис — в одном контуре",
  "home.hero.brandLineSub": "Для клиник и лабораторий, где важны стерильность среды, предсказуемость поставок и партнёрство на годы",
  "home.hero.brandLead": "Закрываем полный цикл: подбор и поставка оборудования, сопровождение данных и сервисная поддержка. Один ответственный контур вместо разрозненных подрядчиков — спокойный ритм работы без срывов между закупкой, вводом в эксплуатацию и обслуживанием.",
  "home.hero.brandNote": "Ориентируемся на воспроизводимость процессов и прозрачность поставок — для команд, которым важна надёжность среды и партнёрство на годы, а не разовая сделка.",
  "common.open": "Открыть",
  "common.pageLoadFailed": "Страница не загрузилась",
  "common.pageLoadFailedPath": "Не удалось загрузить {path}.",
  "common.pageLoadFailedHint": "Проверь: файл существует, путь верный, и ты открываешь сайт через локальный сервер (Live Server).",
  "count.item.one": "позиция",
  "count.item.few": "позиции",
  "count.item.many": "позиций",
  "count.item.other": "позиций",
  "catalog.countFound": "Найдено: {total} {items}",
  "catalog.countShown": "Найдено: {total} {items} · показано {shown}",
  "catalog.filter.groupLabel": "Группа оборудования",
  "catalog.filter.brandLabel": "Бренд",
  "catalog.filter.modelLabel": "Поиск по модели",
  "catalog.filter.modelPlaceholder": "Введите модель…",
  "catalog.resetFilters": "Сбросить фильтры",
  "catalog.view.aria": "Вид каталога",
  "catalog.view.gridAria": "Сетка",
  "catalog.view.listAria": "Список",
  "catalog.loadMore": "Показать ещё",
  "catalog.paginationAria": "Навигация по страницам каталога",
  "catalog.allGroups": "Все группы",
  "catalog.allBrands": "Все бренды",
  "catalog.filter.category": "Категория: {value}",
  "catalog.filter.partner": "Партнёр: {value}",
  "catalog.filter.model": "Модель: {value}",
  "catalog.filter.search": "Поиск: {value}",
  "catalog.filter.removeAria": "Убрать фильтр",
  "catalog.filter.clearSearchAria": "Очистить поиск",
  "cart.empty.title": "В запросе пока нет позиций",
  "cart.empty.text": "Добавьте товары из каталога или карточек партнёров, чтобы отправить единый запрос.",
  "cart.total.positions": "Позиций:",
  "cart.total.withPrice": "Итого (по позициям с ценой):",
  "cart.total.note": "Часть оборудования может иметь цену «по запросу» — итоговое КП будет содержать полный расчёт.",
  "cart.panel.title": "Список запросов",
  "cart.panel.subtitle": "Все добавленные позиции для единого запроса.",
  "cart.panel.clear": "Очистить",
  "cart.panel.requestAll": "Запросить цену на всё",
  "toast.addedToRequest": "Товар добавлен в запрос",
  "toast.addedManyToRequest": "Добавлено в запрос: {count} {items}",
  "toast.removedFromRequest": "Товар удалён из запроса",
  "toast.removeCancelled": "Удаление отменено",
  "toast.undo": "Отменить",
  "toast.addCancelled": "Добавление отменено",
  "toast.requestSent": "Запрос отправлен.",
  "toast.linkCopied": "Ссылка скопирована",
  "toast.linkCopyFailed": "Не удалось скопировать ссылку",
  "toast.requestSubmitted": "Заявка отправлена.",
  "toast.equipmentRequestSent": "Запрос на оборудование отправлен.",
  "toast.requestListCleared": "Список запросов очищен.",
  "product.defaultShortDesc": "Профессиональное медицинское оборудование.",
  "product.page.aria": "Карточка товара",
  "product.backToCatalog": "В каталог",
  "product.backToCatalogAria": "Вернуться в каталог",
  "product.prevPhoto": "Предыдущее фото",
  "product.nextPhoto": "Следующее фото",
  "product.photoOnRequest": "Фото по запросу",
  "product.qtyLabel": "Количество",
  "product.qtyDecreaseAria": "Уменьшить количество",
  "product.qtyIncreaseAria": "Увеличить количество",
  "product.qtyInputAria": "Количество",
  "product.specsTitle": "Характеристики",
  "product.installTitle": "Установка",
  "product.maintenanceTitle": "Обслуживание",
  "product.article": "Артикул: {value}",
  "product.partner": "Партнёр: {value}",
  "product.model": "Модель: {value}",
  "product.unitPrice": "Цена за единицу: {value}",
  "product.total": "Итого: {value}",
  "product.priceIndividual": "Цена рассчитывается индивидуально",
  "product.requestPriceModel": "Запросить цену по этой модели",
  "product.requestPriceShort": "Запросить цену",
  "product.modal.zoomHint": "Наведите для увеличения",
  "product.docNote": "Документация по оборудованию доступна по запросу — приложим паспорта и инструкции в составе коммерческого предложения.",
  "product.install.roomConditions": "Помещение и условия",
  "product.install.engineering": "Инженерные коммуникации",
  "product.install.stepsTitle": "Этапы установки и ввода",
  "product.maintenanceFallback": "Регулярное сервисное сопровождение, калибровка и консультации доступны по договору. Формат поддержки согласуется при поставке.",
  "product.nav.description": "Описание",
  "product.nav.specs": "Характеристики",
  "product.nav.kit": "Комплектация",
  "product.nav.install": "Установка",
  "product.nav.service": "Сервис",
  "product.nav.docs": "Документация",
  "product.section.description": "Описание",
  "product.section.kit": "Комплектация",
  "product.section.docs": "Документация",
  "product.quickSpecsTitle": "Краткие параметры",
  "product.trust.delivery": "Поставка и сопровождение по договору",
  "product.trust.support": "Техническая поддержка и обучение персонала",
  "product.status.inStock": "В наличии",
  "product.status.onOrder": "Под заказ",
  "product.quick.category": "Категория",
  "product.quick.partner": "Партнёр",
  "product.quick.article": "Артикул",
  "product.quick.model": "Модель",
  "product.kitPlaceholder": "Состав комплекта и опции конфигурации согласуются при подготовке коммерческого предложения под вашу задачу.",
  "product.pdpZoomHint": "Просмотр",
  "partner.noProducts": "Нет товаров у этого партнёра.",
  "partners.stat.country": "Страна",
  "partners.stat.equipment": "Оборудование",
  "partners.stat.products": "Товаров",
  "partners.productsTitle": "Товары партнёра",
  "partners.searchPlaceholder": "Поиск по товарам партнёра…",
  "partners.countryFallback": "—",
  "partners.card.cta": "Решения бренда",
  "partners.heroMeta.one": "{count} бренд в витрине",
  "partners.heroMeta.few": "{count} бренда в витрине",
  "partners.heroMeta.many": "{count} брендов в витрине",
  "partners.heroMeta.other": "{count} брендов в витрине",
  "partners.years.one": "{count} год",
  "partners.years.few": "{count} года",
  "partners.years.many": "{count} лет",
  "partners.years.other": "{count} years",
  "partners.descriptionFallback": "Описание партнёра будет добавлено позже.",
  "news.placeholderWordmark": "НаноФарм",
  "news.placeholderHint": "Компания",
  "news.title": "Новости и события",
  "news.kicker": "Редакция",
  "news.subtitle": "Ключевые проекты, партнёрства и обновления НаноФарм для клиник, лабораторий и диагностических центров.",
  "news.all": "Все новости",
  "news.searchPlaceholder": "Поиск по заголовку, категории или ключевым словам",
  "news.nothingFound": "Ничего не найдено. Измените фильтры или поисковый запрос.",
  "news.noResultsByFilters": "Нет новостей по фильтрам",
  "news.categoryAll": "Все",
  "news.count.one": "новость",
  "news.count.few": "новости",
  "news.count.many": "новостей",
  "news.count.other": "новостей",
  "news.coverAlt": "Обложка: {title}",
  "news.inlineImageAlt": "Иллюстрация к материалу",
  "news.articleFallback": "Материал",
  "news.placeholderMediaLabel": "НаноФарм Новости",
  "news.galleryTitle": "Галерея",
  "news.relatedTitle": "Ещё материалы",
  "news.summaryTitle": "Кратко",
  "news.shareTitle": "Поделиться",
  "news.copyLink": "Скопировать ссылку",
  "news.directLinkHint": "Прямая ссылка на этот материал.",
  "news.tagsTitle": "Теги",
  "news.sort.recent": "Сначала новые",
  "news.sort.old": "Сначала старые",
  "news.sort.all": "За всё время",
  "search.focusedHint": "Введите запрос",
  "search.hint.1": "Анестезиология",
  "search.hint.2": "Радиология",
  "search.hint.3": "Нейрохирургия",
  "search.hint.4": "Ортопедия",
  "search.hint.5": "Урология",
  "search.hint.6": "Диагностика",
  "product.defaultStep.1": "Анализ задач и требований заказчика",
  "product.defaultStep.2": "Подготовка технического решения и КП",
  "product.defaultStep.3": "Согласование конфигурации и сроков поставки",
  "product.defaultStep.4": "Поставка и логистика",
  "product.defaultStep.5": "Инсталляция и подключение к сетям",
  "product.defaultStep.6": "Калибровка и настройка",
  "product.defaultStep.7": "Интеграция с ИТ-системами",
  "product.defaultStep.8": "Обучение персонала",
  "product.defaultStep.9": "Тестовая эксплуатация",
  "product.defaultStep.10": "Плановое сервисное сопровождение",
  "product.defaultRoom.1": "Температура: +18°C до +25°C",
  "product.defaultRoom.2": "Влажность: 30–75% без конденсата",
  "product.defaultRoom.3": "Площадь: от 15 м²",
  "product.defaultRoom.4": "Высота потолков: от 2,5 м",
  "product.defaultEngineer.1": "Электропитание: 220В / 50Гц",
  "product.defaultEngineer.2": "Заземление",
  "product.defaultEngineer.3": "Интернет‑подключение (по необходимости)",
  "product.defaultEngineer.4": "Вентиляция помещения",
  "seo.home.title": "НаноФарм — Медицинское оборудование для клиник и лабораторий",
  "seo.home.description": "Поставка, установка и сервисное обслуживание медицинского оборудования для клиник, лабораторий и диагностических центров.",
  "seo.catalog.title": "Каталог медицинского оборудования — НаноФарм",
  "seo.catalog.description": "Каталог медицинского оборудования НаноФарм: аппараты ИВЛ, радиология, функциональная диагностика, нейрохирургия и другие направления.",
  "seo.category.title": "{name} — каталог НаноФарм",
  "seo.category.descriptionFallback": "Оборудование: {name}",
  "seo.productNotFound.title": "Товар не найден — НаноФарм",
  "seo.productNotFound.description": "Запрошенная позиция отсутствует в каталоге или ссылка устарела.",
  "seo.product.fallbackTitle": "Товар каталога — НаноФарм",
  "seo.product.fallbackDescription": "Профессиональное медицинское оборудование из каталога НаноФарм.",
  "seo.legal.title": "Правовая информация — НаноФарм",
  "seo.legal.description": "Политика конфиденциальности, пользовательское соглашение и реквизиты компании НаноФарм.",
  "seo.about.title": "О компании НаноФарм — поставка медицинского оборудования",
  "seo.about.description": "НаноФарм: комплексная поставка и сервис медицинского оборудования для клиник и диагностических центров Казахстана.",
  "seo.contacts.title": "Контакты НаноФарм",
  "seo.contacts.description": "Контактные данные НаноФарм: адрес, телефон, email и форма обратной связи для запросов по поставке медицинского оборудования.",
  "errors.productPermalinkNotFound": "Товар по этой ссылке не найден. Проверьте адрес или откройте каталог и выберите модель из списка.",
  "errors.productNotFoundGeneric": "Товар не найден. Вернитесь в каталог и выберите модель ещё раз.",
  "errors.productRemoved": "Товар не найден в каталоге. Возможно, он был удалён.",
  "partners.seoTitle": "Партнёры НаноФарм — производители медицинского оборудования",
  "partners.seoDescription": "Международные и локальные партнёры НаноФарм: производители медицинского оборудования для различных направлений медицины.",
};

const NF_AUTO_I18N_BINDINGS = [];
const NF_AUTO_I18N_KEY_BY_TEXT = new Map();
const NF_I18N_ELEMENT_SOURCE = new WeakMap();

function nfSimpleTextHash(value) {
  let hash = 2166136261;
  const input = String(value || "");
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0).toString(36);
}

function nfAutoI18nKeyFromText(text) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const existed = NF_AUTO_I18N_KEY_BY_TEXT.get(normalized);
  if (existed) return existed;
  const key = `auto.${nfSimpleTextHash(normalized)}`;
  NF_AUTO_I18N_KEY_BY_TEXT.set(normalized, key);
  return key;
}

function nfShouldAutoTranslateText(text) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return false;
  if (value.length <= 1) return false;
  if (/^[0-9\s.,:/%()\-+]+$/.test(value)) return false;
  return true;
}

function nfRegisterAutoI18nBindings(rootNode) {
  const root = rootNode || document;
  if (!root || !root.querySelectorAll) return 0;
  let added = 0;
  const skipSelector = [
    ".nf-lang-switcher",
    ".nf-lang-btn",
    "#homeCategories",
    "#homePartnersGrid",
    "#homeNews",
    "#catalogProducts",
    "#newsFeatured",
    "#newsList",
    "#partnerModalProducts",
    "#cartItems",
    "#cartTotals",
    "#searchSuggestions",
    "[data-no-auto-i18n]",
    "[data-i18n]",
  ].join(", ");
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (parent.closest(skipSelector)) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      const raw = String(node.nodeValue || "");
      if (!nfShouldAutoTranslateText(raw)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const rawText = String(node.nodeValue || "");
    const text = rawText.replace(/\s+/g, " ").trim();
    const key = nfAutoI18nKeyFromText(text);
    if (!key) return;
    if (!NF_AUTO_I18N_BINDINGS.find((binding) => binding.node === node && binding.kind === "text")) {
      const leading = (rawText.match(/^\s*/) || [""])[0];
      const trailing = (rawText.match(/\s*$/) || [""])[0];
      NF_AUTO_I18N_BINDINGS.push({ kind: "text", node, key, source: text, leading, trailing });
      added += 1;
    }
  });
  root.querySelectorAll("[placeholder], [aria-label], [title]").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    if (el.closest(skipSelector)) return;
    ["placeholder", "aria-label", "title"].forEach((attr) => {
      const value = String(el.getAttribute(attr) || "").trim();
      if (!nfShouldAutoTranslateText(value)) return;
      const key = nfAutoI18nKeyFromText(value);
      if (!key) return;
      if (!NF_AUTO_I18N_BINDINGS.find((binding) => binding.node === el && binding.kind === attr)) {
        NF_AUTO_I18N_BINDINGS.push({ kind: attr, node: el, key, source: value });
        added += 1;
      }
    });
  });
  return added;
}

function nfApplyAutoTranslations() {
  const dict = NF_I18N[NF_STATE.lang] || {};
  const ruDict = NF_I18N.ru || {};
  NF_AUTO_I18N_BINDINGS.forEach((binding) => {
    if (!binding || !binding.node || !binding.node.isConnected) return;
    const value = dict[binding.key] || ruDict[binding.key] || binding.source;
    if (binding.kind === "text") {
      binding.node.nodeValue = `${binding.leading || ""}${value}${binding.trailing || ""}`;
      return;
    }
    if (binding.node instanceof HTMLElement) {
      binding.node.setAttribute(binding.kind, value);
    }
  });
}

function nfFormatTemplate(template, params) {
  let out = String(template || "");
  Object.entries(params || {}).forEach(([key, value]) => {
    out = out.replaceAll(`{${key}}`, String(value ?? ""));
  });
  return out;
}

function nfT(key, fallback = "", params = {}) {
  const lang = String(NF_STATE.lang || "ru");
  const dict = NF_I18N[lang] || {};
  const ruDict = NF_I18N.ru || {};
  const baseFallback = NF_UI_EXTRA_RU[key] || fallback || key;
  const value = dict[key] || ruDict[key] || baseFallback;
  return nfFormatTemplate(value, params);
}

function nfGetLocalizedField(entity, field, fallback = "") {
  if (!entity || typeof entity !== "object") return fallback;
  const value = entity[field];
  if (value == null) return fallback;
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized || fallback;
  }
  return value;
}

function nfPluralForm(count, forms) {
  const n = Math.abs(Number(count) || 0);
  const lang = String(NF_STATE.lang || "ru");
  if (lang === "en") return n === 1 ? forms.one : forms.other;
  if (lang === "kz" || lang === "kk") return forms.other;
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms.one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return forms.few;
  return forms.many;
}

function nfItemsCountLabel(count) {
  const forms = {
    one: nfT("count.item.one", "позиция"),
    few: nfT("count.item.few", "позиции"),
    many: nfT("count.item.many", "позиций"),
    other: nfT("count.item.other", "items"),
  };
  return `${count} ${nfPluralForm(count, forms)}`;
}

function nfPartnerShowcaseMetaText(count) {
  const n = Math.max(0, Number(count) || 0);
  return nfPluralForm(n, {
    one: nfT("partners.heroMeta.one", "{count} бренд в витрине").replace("{count}", String(n)),
    few: nfT("partners.heroMeta.few", "{count} бренда в витрине").replace("{count}", String(n)),
    many: nfT("partners.heroMeta.many", "{count} брендов в витрине").replace("{count}", String(n)),
    other: nfT("partners.heroMeta.other", "{count} brands in showcase").replace("{count}", String(n)),
  });
}

function nfPartnerYearsLabel(yearsCount) {
  const years = Math.max(0, Number(yearsCount) || 0);
  if (!years) return "";
  return nfPluralForm(years, {
    one: nfT("partners.years.one", "{count} год").replace("{count}", String(years)),
    few: nfT("partners.years.few", "{count} года").replace("{count}", String(years)),
    many: nfT("partners.years.many", "{count} лет").replace("{count}", String(years)),
    other: nfT("partners.years.other", "{count} years").replace("{count}", String(years)),
  });
}

const NF_STATIC_UI_LOCALE_CACHE = {};

async function nfLoadStaticUiLocale(lang) {
  const locale = String(lang || "ru").trim() || "ru";
  if (NF_STATIC_UI_LOCALE_CACHE[locale]) return NF_STATIC_UI_LOCALE_CACHE[locale];
  try {
    const res = await fetch(`/i18n/ui.${encodeURIComponent(locale)}.json`, { cache: "no-store" });
    if (!res.ok) return {};
    const json = await res.json();
    const data = json && typeof json === "object" ? json : {};
    NF_STATIC_UI_LOCALE_CACHE[locale] = data;
    return data;
  } catch (_e) {
    return {};
  }
}

function nfIsLikelyRuSourceText(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (!/[А-Яа-яЁё]/.test(text)) return false;
  if (/[ӘәҒғҚқҢңӨөҰұҮүҺһІі]/.test(text)) return false;
  return true;
}

async function nfCollectBaseTranslations(options = {}) {
  const includeDom = options.includeDom === true;
  const map = { ...NF_UI_EXTRA_RU };
  const staticRu = await nfLoadStaticUiLocale("ru");
  Object.entries(staticRu || {}).forEach(([key, value]) => {
    if (!key || map[key]) return;
    const text = String(value || "").trim();
    if (!text) return;
    map[key] = text;
  });
  NF_AUTO_I18N_BINDINGS.forEach((binding) => {
    if (!binding || !binding.key || !binding.source) return;
    if (!nfIsLikelyRuSourceText(binding.source)) return;
    if (!map[binding.key]) map[binding.key] = binding.source;
  });
  if (!includeDom) return map;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key || map[key]) return;
    const attr = el.dataset.i18nAttr;
    const raw = attr ? el.getAttribute(attr) : el.textContent;
    const text = (raw || "").trim();
    if (!text) return;
    if (!nfIsLikelyRuSourceText(text)) return;
    map[key] = text;
  });
  return map;
}

async function nfLoadTranslationsForLang(lang) {
  const l = String(lang || "ru");
  try {
    const base = nfApiBase();
    const endpoint = `${base}${NF_CONFIG.I18N_ENDPOINT}`;
    const isSourceRu = l === "ru";
    const staticData = await nfLoadStaticUiLocale(l);
    if (staticData && typeof staticData === "object") {
      NF_I18N[l] = { ...(NF_I18N[l] || {}), ...staticData };
    }
    const reqInit = isSourceRu
      ? { cache: "no-store" }
      : {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lang: l,
            base: await nfCollectBaseTranslations({ includeDom: true }),
            existing: NF_I18N[l] || {},
          }),
        };
    const url = isSourceRu ? `${endpoint}?lang=${encodeURIComponent(l)}` : endpoint;
    const ctrl = isSourceRu ? null : new AbortController();
    const timeoutId = ctrl ? window.setTimeout(() => ctrl.abort(), 9000) : null;
    let res;
    try {
      res = await fetch(url, ctrl ? { ...reqInit, signal: ctrl.signal } : reqInit);
    } finally {
      if (timeoutId != null) {
        window.clearTimeout(timeoutId);
      }
    }
    if (!res.ok) return;
    const data = await res.json();
    if (!data || typeof data !== "object") return;
    if (isSourceRu) {
      const staticRu = await nfLoadStaticUiLocale("ru");
      NF_I18N.ru = { ...NF_UI_EXTRA_RU, ...(staticRu || {}), ...data };
      return;
    }
    NF_I18N[l] = { ...(NF_I18N[l] || {}), ...data, ...(staticData || {}) };
  } catch (_e) {}
}

let NF_DYNAMIC_TRANSLATION_REFRESH_TASK = null;
let NF_DYNAMIC_TRANSLATION_REFRESH_LANG = "";
let NF_LOCALE_DIAGNOSTIC_TIMER = null;

function nfRefreshDynamicTranslations(retries = 2) {
  const lang = String(NF_STATE.lang || "ru");
  if (lang === "ru") return Promise.resolve();
  if (NF_DYNAMIC_TRANSLATION_REFRESH_TASK && NF_DYNAMIC_TRANSLATION_REFRESH_LANG === lang) {
    return NF_DYNAMIC_TRANSLATION_REFRESH_TASK;
  }
  NF_DYNAMIC_TRANSLATION_REFRESH_LANG = lang;
  NF_DYNAMIC_TRANSLATION_REFRESH_TASK = (async () => {
    const attempts = Math.max(1, Number(retries) || 1);
    for (let idx = 0; idx < attempts; idx += 1) {
      await nfLoadTranslationsForLang(lang);
      nfApplyTranslations();
      if (idx < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
    }
  })().finally(() => {
    NF_DYNAMIC_TRANSLATION_REFRESH_TASK = null;
    NF_DYNAMIC_TRANSLATION_REFRESH_LANG = "";
  });
  return NF_DYNAMIC_TRANSLATION_REFRESH_TASK;
}

function nfApplyTranslations() {
  const dict = NF_I18N[NF_STATE.lang] || {};
  const ruDict = NF_I18N.ru || {};
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    let source = NF_I18N_ELEMENT_SOURCE.get(el);
    if (!source) {
      source = {};
      NF_I18N_ELEMENT_SOURCE.set(el, source);
    }

    if (key === "footer.copyrightPrefix") {
      const year = new Date().getFullYear();
      const raw = String(dict[key] ?? ruDict[key] ?? source.text ?? NF_UI_EXTRA_RU[key] ?? "");
      if (!raw) return;
      const value = raw.replace("{year}", String(year));
      const attr = el.dataset.i18nAttr;
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
      return;
    }

    const attr = el.dataset.i18nAttr;
    if (attr) {
      if (source[attr] == null) {
        const src = String(el.getAttribute(attr) || "").trim();
        if (src) source[attr] = src;
      }
      const rawValue = dict[key] ?? ruDict[key] ?? source[attr] ?? NF_UI_EXTRA_RU[key];
      if (rawValue == null) return;
      const value = String(rawValue);
      el.setAttribute(attr, value);
      return;
    }
    if (source.text == null) {
      const src = String(el.textContent || "").trim();
      if (src) source.text = src;
    }
    const rawValue = dict[key] ?? ruDict[key] ?? source.text ?? NF_UI_EXTRA_RU[key];
    if (rawValue == null) return;
    const value = String(rawValue);
    const tagName = String(el.tagName || "").toUpperCase();
    const hasNestedElements = el.childElementCount > 0;
    const isStructural = NF_I18N_STRUCTURAL_TAGS.has(tagName);
    if (hasNestedElements || isStructural) {
      if (el.hasAttribute("aria-label")) {
        el.setAttribute("aria-label", value);
      } else if (el.hasAttribute("title")) {
        el.setAttribute("title", value);
      }
      return;
    }
    el.textContent = value;
  });
  nfApplyAutoTranslations();
  nfSyncGlobalSearchHint();
  nfScheduleLocaleDiagnostics();
  requestAnimationFrame(() => nfRefreshNavIndicator({ animate: false }));
}

let NF_I18N_FADE_STYLE_READY = false;
function nfEnsureI18nFadeStyles() {
  if (NF_I18N_FADE_STYLE_READY) return;
  const style = document.createElement("style");
  style.id = "nf-i18n-fade-style";
  style.textContent = `
    .nf-i18n-fade-target {
      transition: opacity 180ms ease, transform 220ms ease;
      will-change: opacity, transform;
    }
    .nf-i18n-fade-target.nf-i18n-fade-out {
      opacity: 0.62;
      transform: translateY(2px);
    }
    .nf-i18n-fade-target.nf-i18n-fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  NF_I18N_FADE_STYLE_READY = true;
}

function nfCollectI18nFadeTargets() {
  const selectors = [
    "[data-i18n]",
    ".nf-partner-action__label",
    "#partnersHeroMeta",
    "#partnerModalMeta",
    "#partnerModalDesc",
    "#partnerModalCountry",
    "#partnerModalEquip",
  ];
  const unique = new Set();
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (el instanceof HTMLElement) unique.add(el);
    });
  });
  return Array.from(unique);
}

function nfAnimateLocaleTextSwap() {
  nfEnsureI18nFadeStyles();
  const targets = nfCollectI18nFadeTargets();
  if (!targets.length) return;
  targets.forEach((el) => {
    el.classList.add("nf-i18n-fade-target", "nf-i18n-fade-out");
    el.classList.remove("nf-i18n-fade-in");
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      targets.forEach((el) => {
        el.classList.remove("nf-i18n-fade-out");
        el.classList.add("nf-i18n-fade-in");
      });
    });
  });
}

function nfBuildGlobalSearchHintConfig() {
  return {
    items: [
      nfT("search.hint.1", "Анестезиология"),
      nfT("search.hint.2", "Радиология"),
      nfT("search.hint.3", "Нейрохирургия"),
      nfT("search.hint.4", "Ортопедия"),
      nfT("search.hint.5", "Урология"),
      nfT("search.hint.6", "Диагностика"),
    ],
    focusedHint: nfT("search.focusedHint", "Введите запрос"),
  };
}

function nfSyncGlobalSearchHint() {
  const input = nfEl("globalSearchInput");
  if (!input) return;
  // Снять предыдущую анимированную подсказку, иначе таймеры/слушатели копятся
  // (это и давало растущий лаг при каждой смене языка).
  if (typeof input.__nfGlobalSearchHintCleanup === "function") {
    try { input.__nfGlobalSearchHintCleanup(); } catch (_e) {}
    input.__nfGlobalSearchHintCleanup = null;
  }
  // Создание подсказки тяжёлое (≈50мс + reflow) — откладываем на след. кадр,
  // чтобы применение перевода не блокировало поток при клике по языку.
  if (input.__nfHintRaf) cancelAnimationFrame(input.__nfHintRaf);
  input.__nfHintRaf = requestAnimationFrame(() => {
    input.__nfHintRaf = 0;
    const cfg = nfBuildGlobalSearchHintConfig();
    const cleanup = nfCreateAnimatedSearchHint(input, cfg);
    if (typeof cleanup === "function") {
      input.__nfGlobalSearchHintCleanup = cleanup;
    }
  });
}

function nfScheduleLocaleDiagnostics() {
  const lang = String(NF_STATE.lang || "ru");
  if (lang === "ru") return;
  if (NF_LOCALE_DIAGNOSTIC_TIMER != null) {
    clearTimeout(NF_LOCALE_DIAGNOSTIC_TIMER);
  }
  NF_LOCALE_DIAGNOSTIC_TIMER = window.setTimeout(() => {
    NF_LOCALE_DIAGNOSTIC_TIMER = null;
    const root = document.querySelector("#page-root") || document.body;
    if (!root) return;
    const unresolved = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (["SCRIPT", "STYLE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        const text = String(node.nodeValue || "").replace(/\s+/g, " ").trim();
        if (!text) return NodeFilter.FILTER_REJECT;
        if (!/[А-Яа-яЁё]/.test(text)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode() && unresolved.length < 12) {
      unresolved.push(String(walker.currentNode.nodeValue || "").replace(/\s+/g, " ").trim());
    }
    if (unresolved.length > 0) {
      console.warn("[nf][i18n] unresolved localized fragments", {
        lang,
        count: unresolved.length,
        sample: unresolved,
      });
    }
  }, 320);
}

let NF_LOCALE_RERENDER_RAF = 0;
/** Отложенный (после кадра) и схлопнутый ре-рендер данных при смене языка.
 *  Статический текст ([data-i18n]) меняется мгновенно отдельно; тяжёлую
 *  пересборку каруселей/сеток откладываем, чтобы клик по языку не фризил. */
function nfScheduleLocaleRerender() {
  if (NF_LOCALE_RERENDER_RAF) return;
  NF_LOCALE_RERENDER_RAF = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      NF_LOCALE_RERENDER_RAF = 0;
      nfOnCatalogLoaded();
    });
  });
}

function nfSetLang(lang) {
  const requestedLang = NF_SUPPORTED_LANGS.has(String(lang || "").trim()) ? String(lang).trim() : "ru";
  NF_STATE.lang = requestedLang;
  const langChangeSeq = ++NF_LANG_CHANGE_SEQ;
  try {
    localStorage.setItem("nf_lang", requestedLang);
  } catch (_e) {}
  document.documentElement.setAttribute("lang", requestedLang === "en" ? "en" : requestedLang === "kz" ? "kz" : "ru");
  document.querySelectorAll(".nf-lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === requestedLang;
    btn.textContent = String(btn.dataset.lang || "").toUpperCase();
    btn.classList.toggle("nf-lang-btn-active", active);
    btn.setAttribute("aria-checked", active ? "true" : "false");
  });
  // Instant UI switch: статический текст + фейд применяем сразу, без тяжёлого ре-рендера.
  nfAnimateLocaleTextSwap();
  nfApplyTranslations();
  nfScheduleLocaleRerender();

  // Remote translations/catalog are refreshed in background.
  nfLoadTranslationsForLang(requestedLang).then(() => {
    if (langChangeSeq !== NF_LANG_CHANGE_SEQ) return;
    if (NF_STATE.lang !== requestedLang) return;
    nfApplyTranslations();
    nfScheduleLocaleRerender();
  }).catch(() => {});
  nfLoadCatalogFromApi({ lang: requestedLang });
}

let NF_LANG_SWITCH_DELEGATED = false;
function nfInitLangSwitcherBinding() {
  if (NF_LANG_SWITCH_DELEGATED) return;
  NF_LANG_SWITCH_DELEGATED = true;
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const langBtn = target ? target.closest(".nf-lang-btn") : null;
    if (!langBtn) return;
    event.preventDefault();
    nfSetLang(langBtn.dataset.lang);
  });
}
nfInitLangSwitcherBinding();

function nfCheckStructuralLocaleTargets() {
  const checks = [
    { key: "catalog", selector: ".nf-page-catalog", minChildren: 1 },
    { key: "partners", selector: ".nf-partners-page", minChildren: 1 },
    { key: "about", selector: ".nf-about-page", minChildren: 1 },
  ];
  const failures = [];
  checks.forEach((check) => {
    const node = document.querySelector(check.selector);
    if (!node) return;
    if (node.childElementCount < check.minChildren) {
      failures.push(`${check.key}:empty-structure`);
    }
  });
  const particlesRoot = document.querySelector("#nf-premium-hero-root .nf-hero-brand-particles");
  if (particlesRoot) {
    const particlesCount = particlesRoot.querySelectorAll(".nf-hero-brand-particle").length;
    if (particlesCount > 12) {
      failures.push(`home:particle-overflow(${particlesCount})`);
    }
  }
  return failures;
}

async function nfRunLocaleSmokeTest(options = {}) {
  const sequence = Array.isArray(options.sequence) && options.sequence.length
    ? options.sequence
    : ["ru", "kz", "en", "ru"];
  const waitMs = Math.max(150, Number(options.waitMs) || 950);
  const report = [];
  for (const lang of sequence) {
    nfSetLang(lang);
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    const failures = nfCheckStructuralLocaleTargets();
    report.push({
      lang,
      page: NF_STATE.currentPage,
      failures,
      ok: failures.length === 0,
    });
  }
  const hasErrors = report.some((entry) => !entry.ok);
  if (hasErrors) {
    console.warn("[nf][locale-smoke] issues detected", report);
  } else {
    console.info("[nf][locale-smoke] passed", report);
  }
  return report;
}

if (typeof window !== "undefined") {
  window.nfRunLocaleSmokeTest = nfRunLocaleSmokeTest;
}

/* ====== ГЛАВНАЯ — «Популярное»: карусель ====== */

function nfPopularCard(p, isClone = false) {
  // Keep .nf-popular-card for carousel logic, add .nf-pop-card for new design
  const card = nfCreateEl("article", "nf-popular-card nf-pop-card");
  card.dataset.productId = p.id;
  if (isClone) {
    card.dataset.clone = "1";
    card.setAttribute("aria-hidden", "true");
    card.setAttribute("tabindex", "-1");
  } else {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `${p.name} — нажмите для подробной информации`);
  }

  // ── Media ──────────────────────────────────────────
  const media = nfCreateEl("div", "nf-pop-card__media");

  // Category chip (top-left overlay)
  const cat = NF_DATA.categories.find((c) => c.id === p.categoryId);
  if (cat) {
    const catChip = nfCreateEl("span", "nf-pop-card__cat");
    catChip.textContent = cat.name;
    media.appendChild(catChip);
  }

  // Image
  const images = nfGetProductImages(p);
  const placeholderSrc = nfProductPlaceholderSvg();
  const primarySrc = images.length ? images[0] : "";
  const img = document.createElement("img");
  img.className = "nf-pop-card__img";
  img.alt = p.name;
  img.src = primarySrc || placeholderSrc;
  nfConfigureImageElement(img, { loading: "lazy", decoding: "async", fetchPriority: "low" });
  img.onerror = () => { if (img.src !== placeholderSrc) img.src = placeholderSrc; };
  media.appendChild(img);

  // Hover overlay — "Смотреть подробнее"
  const overlay = nfCreateEl("div", "nf-pop-card__overlay");
  overlay.innerHTML = `<span class="nf-pop-card__overlay-text">Смотреть подробнее
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>`;
  media.appendChild(overlay);

  // ── Body ───────────────────────────────────────────
  const body = nfCreateEl("div", "nf-pop-card__body");

  // Row 1: availability + price
  const topRow = nfCreateEl("div", "nf-pop-card__top-row");

  // Availability
  const statusVal = p.status || "in_stock";
  const isInStock = statusVal === "in_stock";
  const statusEl = nfCreateEl("span", `nf-pop-card__status ${isInStock ? "nf-pop-card__status--in" : "nf-pop-card__status--order"}`);
  statusEl.innerHTML = `<span class="nf-pop-card__status-dot"></span>${isInStock ? "В наличии" : "Под заказ"}`;
  topRow.appendChild(statusEl);

  // Price
  const hasPrice = p.price != null && Number(p.price) > 0;
  const priceEl = nfCreateEl("span", `nf-pop-card__price ${hasPrice ? "" : "nf-pop-card__price--rq"}`);
  priceEl.textContent = hasPrice ? nfFormatPrice(p.price) : "По запросу";
  topRow.appendChild(priceEl);
  body.appendChild(topRow);

  // Name
  const nameEl = document.createElement("h3");
  nameEl.className = "nf-pop-card__name";
  nameEl.textContent = p.name;
  body.appendChild(nameEl);

  // Teaser: short description (max ~70 chars, faded)
  if (p.shortDesc) {
    const teaser = nfCreateEl("p", "nf-pop-card__teaser");
    const txt = p.shortDesc.length > 72 ? p.shortDesc.slice(0, 72).trimEnd() + "…" : p.shortDesc;
    teaser.textContent = txt;
    body.appendChild(teaser);
  }

  // "Подробнее" button
  const hint = nfCreateEl("div", "nf-pop-card__hint");
  hint.innerHTML = `<span>Подробнее</span>
    <svg class="nf-pop-card__hint-arrow" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  body.appendChild(hint);

  card.append(media, body);
  return card;
}

function nfRenderPopularCarousel() {
  const track = nfEl("popularTrack");
  if (!track) return;

  const viewport =
    track.closest(".nf-popular__viewport") ||
    document.querySelector(".nf-popular__viewport");

  if (!viewport) return;

  if (typeof window._nfPopularCleanup === "function") {
    try {
      window._nfPopularCleanup();
    } catch (_e) {}
    window._nfPopularCleanup = null;
  }

  const popularSource = (NF_DATA.products || []).filter((p) => p.popular);
  const popular = popularSource.length ? popularSource : (NF_DATA.products || []).slice(0, 8);

  track.innerHTML = "";
  track.classList.remove("nf-popular__track--scroll");
  track.classList.add("nf-popular__track--marquee");
  track.style.transform = "translate3d(0,0,0)";
  track.dataset.nfPopularDrive = "raf";
  /* Не вешаем viewport--scroll: там overflow-x:auto и pan-x — ломают JS-карусель */

  /* ── Delegated click: covers both originals AND marquee clones ──
     Buttons inside use e.stopPropagation() so they handle themselves. */
  if (track._nfCardClickHandler) {
    track.removeEventListener("click", track._nfCardClickHandler);
  }
  track._nfCardClickHandler = (e) => {
    if (e.target.closest(".nf-btn")) return;
    const card = e.target.closest(".nf-popular-card");
    if (!card) return;
    const id = card.dataset.productId;
    if (id) nfNavigateToCatalogProduct(id);
  };
  track.addEventListener("click", track._nfCardClickHandler);

  if (!popular.length) return;

  popular.forEach((p, idx) => {
    const card = nfPopularCard(p, false);
    card.dataset.popularVariant = String(idx % 3);
    track.appendChild(card);
  });
  popular.forEach((p, idx) => {
    const card = nfPopularCard(p, true);
    card.dataset.popularVariant = String(idx % 3);
    track.appendChild(card);
  });

  const prevBtn = nfEl("popularPrev");
  const nextBtn = nfEl("popularNext");
  const carouselWrap = viewport.closest(".nf-popular__carousel-wrap");

  let cycleWidth = 0;
  let raf = null;
  let lastTs = 0;
  let x = 0;
  let paused = false;
  let viewportHoverPaused = false;
  let tween = null;
  let resumeAfterInteractionTs = 0;
  /* Guard: prevents zombie RAF loops from previous carousel instances */
  let cleanedUp = false;

  /* Autoplay: быстрее, без суеты */
  const speedPxPerSec = nfPrefersReducedMotion() ? 14 : 30;

  const normalize = (value) => {
    if (cycleWidth <= 0) return 0;
    let next = value % cycleWidth;
    if (next < 0) next += cycleWidth;
    return next;
  };

  const computeCycleWidth = () => {
    const cards = track.querySelectorAll(".nf-popular-card");
    if (cards.length < popular.length + 1) {
      cycleWidth = 0;
      return;
    }
    const first = cards[0];
    const firstClone = cards[popular.length];
    cycleWidth = Math.max(1, Math.round(firstClone.offsetLeft - first.offsetLeft));
    x = normalize(x);
  };

  const getStep = () => {
    const card = track.querySelector(".nf-popular-card");
    if (!card) return Math.max(180, Math.round(viewport.clientWidth * 0.46));
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;
    return Math.max(1, Math.round(card.getBoundingClientRect().width + gap));
  };

  const render = () => {
    track.style.transform = `translate3d(${-x}px, 0, 0)`;
    track.style.webkitTransform = `translate3d(${-x}px, 0, 0)`;
  };

  const easeInOutSine = (t) => 0.5 * (1 - Math.cos(Math.PI * t));

  const startTween = (delta) => {
    if (!cycleWidth) return;
    const from = x;
    const to = normalize(x + delta);
    tween = { from, to, start: performance.now(), duration: 300 };
  };

  const tick = (ts) => {
    /* Stop zombie tickers that outlive their carousel instance */
    if (cleanedUp) return;
    if (!lastTs) lastTs = ts;
    const dt = Math.min(48, ts - lastTs);
    lastTs = ts;

    if (tween) {
      const p = Math.min(1, (ts - tween.start) / tween.duration);
      const e = easeInOutSine(p);
      let diff = tween.to - tween.from;
      if (Math.abs(diff) > cycleWidth / 2) {
        diff += diff > 0 ? -cycleWidth : cycleWidth;
      }
      x = normalize(tween.from + diff * e);
      if (p >= 1) tween = null;
    } else if (!paused && !viewportHoverPaused && cycleWidth > 0) {
      if (resumeAfterInteractionTs && ts < resumeAfterInteractionTs) {
        render();
        raf = requestAnimationFrame(tick);
        return;
      }
      resumeAfterInteractionTs = 0;
      x = normalize(x + (speedPxPerSec * dt) / 1000);
    }

    render();
    raf = requestAnimationFrame(tick);
  };

  const onPrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    paused = false;
    tween = null;
    computeCycleWidth();
    resumeAfterInteractionTs = performance.now() + 720;
    startTween(-getStep());
  };

  const onNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    paused = false;
    tween = null;
    computeCycleWidth();
    resumeAfterInteractionTs = performance.now() + 720;
    startTween(getStep());
  };

  const onWrapPointerEnter = () => {
    viewportHoverPaused = true;
  };

  const onWrapPointerLeave = () => {
    viewportHoverPaused = false;
    /* Also clear the focus-driven pause: a pointer user leaving the carousel
       is done interacting — don't keep the ticker frozen because a card or
       button still holds DOM focus from the last click. */
    paused = false;
  };

  /* Fallback: if pointerleave is missed (e.g. during SPA navigation and return),
     a document-level pointermove resets the pause flag once the cursor leaves. */
  const onDocPointerMove = (e) => {
    if (!viewportHoverPaused || cleanedUp) return;
    const wrap = carouselWrap || viewport;
    if (wrap && !wrap.contains(e.target)) {
      viewportHoverPaused = false;
    }
  };

  const onFocusIn = (e) => {
    const card = e.target.closest(".nf-popular-card");
    if (card && viewport.contains(card)) paused = true;
  };

  const onFocusOut = () => {
    paused = false;
  };

  if (prevBtn) {
    prevBtn.disabled = false;
    prevBtn.setAttribute("aria-disabled", "false");
    prevBtn.addEventListener("click", onPrevClick);
  }
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.setAttribute("aria-disabled", "false");
    nextBtn.addEventListener("click", onNextClick);
  }
  if (carouselWrap) {
    carouselWrap.addEventListener("pointerenter", onWrapPointerEnter);
    carouselWrap.addEventListener("pointerleave", onWrapPointerLeave);
  }
  viewport.addEventListener("focusin", onFocusIn);
  viewport.addEventListener("focusout", onFocusOut);
  document.addEventListener("pointermove", onDocPointerMove, { passive: true });

  let navResizeObserver = null;
  if (typeof ResizeObserver !== "undefined") {
    navResizeObserver = new ResizeObserver(() => {
      computeCycleWidth();
      render();
    });
    navResizeObserver.observe(viewport);
    navResizeObserver.observe(track);
  }

  const kickoff = () => {
    computeCycleWidth();
    render();
    if (raf == null) raf = requestAnimationFrame(tick);
  };
  kickoff();
  requestAnimationFrame(() => {
    computeCycleWidth();
    render();
  });

  /* Deferred recalcs: guard against late layout (content-visibility, fonts, etc.) */
  [80, 260, 700].forEach((ms) => {
    setTimeout(() => {
      if (cleanedUp) return;
      computeCycleWidth();
      if (raf == null) raf = requestAnimationFrame(tick);
    }, ms);
  });

  window._nfPopularCleanup = () => {
    cleanedUp = true;
    viewportHoverPaused = false;
    paused = false;
    if (raf != null) cancelAnimationFrame(raf);
    raf = null;
    track.style.webkitTransform = "";
    delete track.dataset.nfPopularDrive;
    if (track._nfCardClickHandler) {
      track.removeEventListener("click", track._nfCardClickHandler);
      track._nfCardClickHandler = null;
    }
    if (prevBtn) prevBtn.removeEventListener("click", onPrevClick);
    if (nextBtn) nextBtn.removeEventListener("click", onNextClick);
    if (carouselWrap) {
      carouselWrap.removeEventListener("pointerenter", onWrapPointerEnter);
      carouselWrap.removeEventListener("pointerleave", onWrapPointerLeave);
    }
    viewport.removeEventListener("focusin", onFocusIn);
    viewport.removeEventListener("focusout", onFocusOut);
    document.removeEventListener("pointermove", onDocPointerMove);
    if (navResizeObserver) {
      try {
        navResizeObserver.disconnect();
      } catch (_e) {}
      navResizeObserver = null;
    }
  };

  const ensureResizeHook = () => {
    if (typeof window._nfPopularResizeCleanup === "function") return;
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (NF_STATE.currentPage === "home") nfRenderPopularCarousel();
      }, 280);
    };
    window.addEventListener("resize", onResize, { passive: true });
    window._nfPopularResizeCleanup = () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  };
  ensureResizeHook();
}

function nfTearDownCategoryEcosystem(gridEl) {
  const wrap = gridEl && gridEl.closest("[data-nf-categories-wrap]");
  if (wrap && typeof wrap.__nfEcoCleanup === "function") {
    wrap.__nfEcoCleanup();
    wrap.__nfEcoCleanup = null;
  }
}

function nfSetupCategoryEcosystem(gridEl) {
  const wrap = gridEl.closest("[data-nf-categories-wrap]");
  const svg = wrap && wrap.querySelector("[data-nf-categories-flow]");
  if (!wrap || !svg) return;

  const NS = "http://www.w3.org/2000/svg";

  const clearHot = () => {
    svg.querySelectorAll(".nf-categories__cat-hot.is-hot").forEach((el) => el.classList.remove("is-hot"));
  };

  const onCardEnter = (ev) => {
    const i = Number(ev.currentTarget.dataset.nfCatIndex);
    if (Number.isNaN(i)) return;
    clearHot();
    svg.querySelectorAll(`.nf-categories__branch[data-branch="${i}"]`).forEach((el) => el.classList.add("is-hot"));
    svg.querySelectorAll(`.nf-categories__trunk-seg[data-trunk-for="${i}"]`).forEach((el) => el.classList.add("is-hot"));
  };

  const onCardLeave = () => {
    clearHot();
  };

  let raf = 0;
  const redraw = () => {
    const cards = [...gridEl.querySelectorAll(".nf-category-card")];
    const w = Math.round(wrap.clientWidth);
    const h = Math.round(wrap.clientHeight);
    clearHot();
    if (!cards.length || w < 48 || h < 48) {
      svg.innerHTML = "";
      return;
    }
    const eco = wrap.getBoundingClientRect();
    const n = cards.length;
    const padX2 = Math.max(10, w * 0.022);

    const trunkPoint = (u) => {
      const t = Math.max(0, Math.min(1, u));
      const x = padX2 + t * (w - 2 * padX2);
      const yMid = h * (n <= 2 ? 0.4 : 0.43);
      const amp = Math.min(h * 0.13, 44);
      const y = yMid + amp * Math.sin(t * (Math.PI * 2.12) + 0.62);
      return { x, y };
    };

    const polylineD = (u0, u1, steps) => {
      const seg = [];
      for (let s = 0; s <= steps; s += 1) {
        const u = u0 + (u1 - u0) * (s / steps);
        const p = trunkPoint(u);
        seg.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
      }
      return `M ${seg[0].replace(",", " ")} L ${seg
        .slice(1)
        .map((pair) => {
          const [xx, yy] = pair.split(",");
          return `${xx} ${yy}`;
        })
        .join(" ")}`;
    };

    const trunkFullD = polylineD(0, 1, 72);

    const attachOnCard = (tp, cr) => {
      const r = {
        left: cr.left - eco.left,
        right: cr.right - eco.left,
        top: cr.top - eco.top,
        bottom: cr.bottom - eco.top,
      };
      const mids = [
        { x: (r.left + r.right) / 2, y: r.top },
        { x: (r.left + r.right) / 2, y: r.bottom },
        { x: r.left, y: (r.top + r.bottom) / 2 },
        { x: r.right, y: (r.top + r.bottom) / 2 },
      ];
      let best = mids[0];
      let bd = Infinity;
      mids.forEach((c) => {
        const d = Math.hypot(tp.x - c.x, tp.y - c.y);
        if (d < bd) {
          bd = d;
          best = c;
        }
      });
      return best;
    };

    const frag = document.createDocumentFragment();

    const defs = document.createElementNS(NS, "defs");
    const filter = document.createElementNS(NS, "filter");
    filter.setAttribute("id", "nfCategoriesTrunkGlow");
    filter.setAttribute("x", "-35%");
    filter.setAttribute("y", "-35%");
    filter.setAttribute("width", "170%");
    filter.setAttribute("height", "170%");
    const blur = document.createElementNS(NS, "feGaussianBlur");
    blur.setAttribute("in", "SourceGraphic");
    blur.setAttribute("stdDeviation", "5");
    blur.setAttribute("result", "blur");
    const merge = document.createElementNS(NS, "feMerge");
    const mn1 = document.createElementNS(NS, "feMergeNode");
    mn1.setAttribute("in", "blur");
    const mn2 = document.createElementNS(NS, "feMergeNode");
    mn2.setAttribute("in", "SourceGraphic");
    merge.appendChild(mn1);
    merge.appendChild(mn2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    frag.appendChild(defs);

    const glow = document.createElementNS(NS, "path");
    glow.setAttribute("d", trunkFullD);
    glow.setAttribute("class", "nf-categories__trunk-glow");
    glow.setAttribute("fill", "none");
    frag.appendChild(glow);

    const trunkMain = document.createElementNS(NS, "path");
    trunkMain.setAttribute("d", trunkFullD);
    trunkMain.setAttribute("class", "nf-categories__trunk-main");
    trunkMain.setAttribute("fill", "none");
    frag.appendChild(trunkMain);

    for (let i = 0; i < n; i += 1) {
      const u0 = i / n;
      const u1 = (i + 1) / n;
      const piece = document.createElementNS(NS, "path");
      piece.setAttribute("d", polylineD(u0, u1, 18));
      piece.setAttribute("class", "nf-categories__trunk-seg nf-categories__cat-hot");
      piece.setAttribute("data-trunk-for", String(i));
      piece.setAttribute("fill", "none");
      frag.appendChild(piece);
    }

    for (let i = 0; i < n; i += 1) {
      const u = (i + 0.5) / n;
      const tp = trunkPoint(u);
      const cr = cards[i].getBoundingClientRect();
      const ap = attachOnCard(tp, cr);
      const mx = (tp.x + ap.x) / 2;
      const my = (tp.y + ap.y) / 2;
      const dx = ap.x - tp.x;
      const dy = ap.y - tp.y;
      const len = Math.hypot(dx, dy) || 1;
      const bend = Math.min(22, len * 0.14) * (i % 2 === 0 ? 1 : -1);
      const qx = mx + (-dy / len) * bend;
      const qy = my + (dx / len) * bend;
      const br = document.createElementNS(NS, "path");
      br.setAttribute("d", `M ${tp.x.toFixed(1)} ${tp.y.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${ap.x.toFixed(1)} ${ap.y.toFixed(1)}`);
      br.setAttribute("class", "nf-categories__branch nf-categories__cat-hot");
      br.setAttribute("data-branch", String(i));
      br.setAttribute("fill", "none");
      frag.appendChild(br);
    }

    svg.innerHTML = "";
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    svg.setAttribute("preserveAspectRatio", "none");
    svg.appendChild(frag);
  };

  const scheduleRedraw = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(redraw);
  };

  if (nfPrefersReducedMotion()) {
    svg.innerHTML = "";
    svg.classList.add("nf-categories__flow--reduced");
    wrap.__nfEcoCleanup = () => {
      cancelAnimationFrame(raf);
    };
    return;
  }
  svg.classList.remove("nf-categories__flow--reduced");

  const ro = new ResizeObserver(() => scheduleRedraw());
  ro.observe(wrap);
  ro.observe(gridEl);

  const cards = () => [...gridEl.querySelectorAll(".nf-category-card")];
  cards().forEach((el) => {
    el.addEventListener("mouseenter", onCardEnter);
    el.addEventListener("mouseleave", onCardLeave);
  });

  scheduleRedraw();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => scheduleRedraw()).catch(() => {});
  }
  setTimeout(scheduleRedraw, 160);
  setTimeout(scheduleRedraw, 480);

  wrap.__nfEcoCleanup = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    cards().forEach((el) => {
      el.removeEventListener("mouseenter", onCardEnter);
      el.removeEventListener("mouseleave", onCardLeave);
    });
    clearHot();
    svg.innerHTML = "";
  };
}

function nfRenderHomeCategories() {
  const container = nfEl("homeCategories");
  if (!container) return;
  container.innerHTML = "";
  container.className = "pfg-tile-grid";

  const allProducts = NF_DATA.products || [];

  const FLAGSHIP = [
    "нейрохирургия",
    "сердечно-сосудистая хирургия",
    "анестезиология и реанимация",
  ];

  const rootCatsHome = (NF_DATA.categories || []).filter((c) => !c.parentId);
  let selected = FLAGSHIP.map((name) =>
    rootCatsHome.find((c) => c.name.toLowerCase().trim() === name)
  ).filter(Boolean);

  if (selected.length < 3) {
    selected = rootCatsHome
      .map((c) => ({
        c,
        count: allProducts.filter((p) => p.categoryId === c.id && !p.isHidden).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(({ c }) => c);
  }

  const DESCS = [
    nfT("home.dir.neuro.desc",  "Высокоточные системы для нейрохирургии: навигационные платформы, операционные микроскопы, мониторинг ВЧД."),
    nfT("home.dir.cardio.desc", "Оборудование для кардиохирургии: аппараты ИК, кардиомониторинг и имплантируемые кардиологические системы."),
    nfT("home.dir.icu.desc",    "Комплексное оснащение ОРИТ: аппараты ИВЛ, анестезиологические станции, мультипараметрный мониторинг."),
  ];

  selected.forEach((c, slot) => {
    const count  = allProducts.filter((p) => p.categoryId === c.id && !p.isHidden).length;
    const thread = NF_CAT_THREADS[c.id] || NF_CAT_THREADS["_fallback"];
    const accent = NF_CAT_ACCENTS[c.id] || "#4da6b8";
    const desc   = DESCS[slot] || c.description || "";

    const card = nfCreateEl("article", "pfg-card pfg-card--tile");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", c.name);
    card.style.setProperty("--cat-accent", accent);
    card.style.setProperty("--nf-vp-stagger", `${slot * 80}ms`);

    card.innerHTML = `
      <div class="pfg-card__bloom" aria-hidden="true"></div>
      <div class="pfg-card__thread" aria-hidden="true">${thread}</div>
      <div class="pfg-card__body">
        <h3 class="pfg-card__name">${nfEscapeHtml(c.name)}</h3>
        <p class="pfg-card__desc">${nfEscapeHtml(desc)}</p>
        <div class="pfg-card__footer">
          <span class="pfg-card__count">${nfEscapeHtml(nfItemsCountLabel(count))}</span>
          <span class="pfg-card__cta" aria-hidden="true">
            ${nfEscapeHtml(nfT("common.goTo", "Перейти"))}
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    `;

    const navigate = () => {
      NF_STATE.categoryDetailId = c.id;
      nfGoPath(`/categories/${nfCategoryPermalinkSlug(c)}`);
    };
    card.addEventListener("click", navigate);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(); }
    });

    container.appendChild(card);
  });

  nfInitCardTilt();
}

function nfSetupBranchScene(gridEl) {
  const scene = gridEl && gridEl.closest("[data-nf-branch-scene]");
  const svgEl = scene && scene.querySelector("[data-nf-branch-svg]");
  if (!scene || !svgEl) return;

  const NS = "http://www.w3.org/2000/svg";
  let rafId = 0;

  const draw = () => {
    const cards = Array.from(gridEl.querySelectorAll(".nf-leaf-card"));
    if (!cards.length) return;

    svgEl.innerHTML = "";
    const sw = scene.offsetWidth;
    const sh = scene.offsetHeight;
    if (!sw || !sh) return;

    svgEl.setAttribute("viewBox", `0 0 ${sw} ${sh}`);
    svgEl.setAttribute("width", String(sw));
    svgEl.setAttribute("height", String(sh));

    const sceneRect = scene.getBoundingClientRect();

    // Card connection points: centre of card
    const pts = cards.map((card) => {
      const r = card.getBoundingClientRect();
      return {
        x: r.left - sceneRect.left + r.width / 2,
        y: r.top  - sceneRect.top  + r.height / 2,
        accent: getComputedStyle(card).getPropertyValue("--card-accent").trim() || "#4da0a9",
      };
    });

    // Root: bottom-centre of scene
    const rootX = sw / 2;
    const rootY = sh - 24;
    // Fork: where trunk splits into branches (~60% down)
    const forkY = sh * 0.60;

    // ── Trunk ────────────────────────────────────────────────────
    const trunk = document.createElementNS(NS, "path");
    trunk.setAttribute("class", "nf-branch-trunk");
    trunk.setAttribute("d",
      `M ${rootX.toFixed(1)} ${rootY.toFixed(1)} ` +
      `C ${rootX.toFixed(1)} ${((rootY + forkY) / 2).toFixed(1)}, ` +
      `${rootX.toFixed(1)} ${(forkY + 10).toFixed(1)}, ` +
      `${rootX.toFixed(1)} ${forkY.toFixed(1)}`
    );
    svgEl.appendChild(trunk);

    // Root dot
    const rootDot = document.createElementNS(NS, "circle");
    rootDot.setAttribute("class", "nf-branch-root-dot");
    rootDot.setAttribute("cx", rootX.toFixed(1));
    rootDot.setAttribute("cy", rootY.toFixed(1));
    rootDot.setAttribute("r", "5");
    svgEl.appendChild(rootDot);

    // ── Branches ─────────────────────────────────────────────────
    pts.forEach((pt, idx) => {
      // Organic bezier: fork → card centre
      const mx = (rootX + pt.x) / 2;
      const my = (forkY  + pt.y) / 2;
      const d =
        `M ${rootX.toFixed(1)} ${forkY.toFixed(1)} ` +
        `C ${rootX.toFixed(1)} ${my.toFixed(1)}, ` +
        `${mx.toFixed(1)} ${pt.y.toFixed(1)}, ` +
        `${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;

      // Glow (wide, low-opacity halo)
      const glow = document.createElementNS(NS, "path");
      glow.setAttribute("class", "nf-branch-glow");
      glow.setAttribute("d", d);
      glow.dataset.branch = String(idx);
      glow.style.stroke = pt.accent;
      svgEl.appendChild(glow);

      // Main line
      const line = document.createElementNS(NS, "path");
      line.setAttribute("class", "nf-branch-line");
      line.setAttribute("d", d);
      line.dataset.branch = String(idx);
      line.style.stroke = pt.accent;
      // Measure for trace animation
      let len = 400;
      try { len = Math.ceil(line.getTotalLength()); } catch (_) {}
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = "0";
      svgEl.appendChild(line);

      // End dot at card centre
      const endDot = document.createElementNS(NS, "circle");
      endDot.setAttribute("class", "nf-branch-end-dot");
      endDot.setAttribute("cx", pt.x.toFixed(1));
      endDot.setAttribute("cy", pt.y.toFixed(1));
      endDot.setAttribute("r", "4");
      endDot.dataset.branch = String(idx);
      endDot.style.fill = pt.accent;
      svgEl.appendChild(endDot);
    });
  };

  const scheduleDraw = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(draw);
  };

  const ro = new ResizeObserver(scheduleDraw);
  ro.observe(scene);
  scheduleDraw();

  // ── Hover: glow + retrace ─────────────────────────────────────
  gridEl.querySelectorAll(".nf-leaf-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const slot = card.dataset.leafSlot;
      // Retrace: snap to end, then animate to 0
      svgEl.querySelectorAll(`.nf-branch-line[data-branch="${slot}"]`).forEach((line) => {
        const len = parseFloat(line.style.strokeDasharray) || 500;
        line.style.transition = "none";
        line.style.strokeDashoffset = String(len);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            line.style.transition =
              "stroke-dashoffset 0.65s cubic-bezier(0.4,0,0.2,1), " +
              "opacity 0.25s ease, stroke-width 0.25s ease";
            line.style.strokeDashoffset = "0";
          });
        });
      });
      svgEl.querySelectorAll(`[data-branch="${slot}"]`).forEach((el) =>
        el.classList.add("is-hot")
      );
    });

    card.addEventListener("mouseleave", () => {
      svgEl.querySelectorAll("[data-branch].is-hot").forEach((el) => {
        el.classList.remove("is-hot");
        if (el.classList.contains("nf-branch-line")) {
          el.style.transition =
            "opacity 0.3s ease, stroke-width 0.3s ease";
          el.style.strokeDashoffset = "0";
        }
      });
    });
  });

  scene.__nfBranchCleanup = () => {
    ro.disconnect();
    cancelAnimationFrame(rafId);
  };
}

function nfRenderHomePartners() {
  const root = nfEl("homePartnersGrid");
  if (!root) return;

  // Clear previous timer if re-rendered
  if (root.__nfPartnerTimer) { clearInterval(root.__nfPartnerTimer); root.__nfPartnerTimer = null; }
  root.innerHTML = "";

  const partners = NF_DATA.partners || [];
  if (!partners.length) return;

  // ── Featured showcase (all partners) ──────────────────────────
  const featured = [...partners];

  const showcase = nfCreateEl("div", "nf-ps nf-vp-reveal fade-up");

  // Tabs
  const tabsEl = nfCreateEl("div", "nf-ps__tabs");
  tabsEl.setAttribute("role", "tablist");
  tabsEl.setAttribute("aria-label", "Ключевые партнёры");

  // Panels wrapper
  const panelsEl = nfCreateEl("div", "nf-ps__panels");

  let activeIdx = 0;
  let timer = null;

  const stopTimer = () => { clearInterval(timer); timer = null; };
  const startTimer = () => {
    if (featured.length < 2) return;
    timer = setInterval(() => {
      activateTab((activeIdx + 1) % featured.length);
    }, 5500);
    root.__nfPartnerTimer = timer;
  };

  const activateTab = (idx) => {
    activeIdx = idx;
    tabsEl.querySelectorAll(".nf-ps__tab").forEach((t, i) => {
      t.classList.toggle("is-active", i === idx);
      t.setAttribute("aria-selected", String(i === idx));
    });
    panelsEl.querySelectorAll(".nf-ps__panel").forEach((panel, i) => {
      const active = i === idx;
      panel.classList.toggle("is-active", active);
      if ("inert" in panel) panel.inert = !active;
    });
  };

  // Build tabs + panels
  featured.forEach((p, i) => {
    // Tab button
    const tab = nfCreateEl("button", "nf-ps__tab" + (i === 0 ? " is-active" : ""));
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
    tab.setAttribute("aria-controls", `nf-ps-panel-${i}`);
    tab.id = `nf-ps-tab-${i}`;
    tab.textContent = nfPartnerShortName(p);
    tab.addEventListener("click", () => { stopTimer(); activateTab(i); });
    tabsEl.appendChild(tab);

    // Panel
    const panel = nfCreateEl("div", "nf-ps__panel" + (i === 0 ? " is-active" : ""));
    panel.id = `nf-ps-panel-${i}`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", `nf-ps-tab-${i}`);
    if (i !== 0 && "inert" in panel) panel.inert = true;

    const tags = [];
    if (p.country) tags.push(`<span class="nf-ps__tag">${nfEscapeHtml(p.country)}</span>`);
    if (p.equipment) tags.push(`<span class="nf-ps__tag">${nfEscapeHtml(p.equipment)}</span>`);

    panel.innerHTML = `
      <img class="nf-ps__logo" alt="${nfEscapeHtml(nfPartnerShortName(p))}" loading="lazy" />
      <div class="nf-ps__tags">${tags.join("")}</div>
      <h3 class="nf-ps__name">${nfEscapeHtml(p.name)}</h3>
      <p class="nf-ps__desc">${nfEscapeHtml(p.description || "")}</p>
      <button type="button" class="nf-ps__cta">
        <span>${nfEscapeHtml(nfT("common.viewProducts", "Смотреть продукцию"))}</span>
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    const logoImg = panel.querySelector(".nf-ps__logo");
    if (logoImg) nfSetPartnerLogo(logoImg, p.id);

    panel.querySelector(".nf-ps__cta").addEventListener("click", () => {
      const slug = nfPartnerSlug(p);
      if (slug) nfGoPath(nfPartnerOpenUrlBySlug(slug));
    });

    panelsEl.appendChild(panel);
  });

  showcase.addEventListener("mouseenter", stopTimer);
  showcase.addEventListener("mouseleave", startTimer);

  showcase.appendChild(tabsEl);
  showcase.appendChild(panelsEl);
  root.appendChild(showcase);

  // ── Infinite logo ribbon ──────────────────────────────────────
  const ribbon = nfCreateEl("div", "nf-ribbon");
  ribbon.setAttribute("aria-label", "Все технологические партнёры");

  // Split all partners into two rows by even/odd index
  const row1Partners = partners.filter((_, i) => i % 2 === 0);
  const row2Partners = partners.filter((_, i) => i % 2 === 1);

  const buildRibbonRow = (items, direction) => {
    const row = nfCreateEl("div", "nf-ribbon__row");
    const track = nfCreateEl("div", `nf-ribbon__track nf-ribbon__track--${direction}`);

    // Duplicate for seamless loop
    [...items, ...items].forEach(p => {
      const btn = nfCreateEl("button", "nf-ribbon__item");
      btn.type = "button";
      btn.setAttribute("aria-label", nfPartnerShortName(p));
      btn.setAttribute("title", nfPartnerShortName(p));

      const img = document.createElement("img");
      img.className = "nf-ribbon__logo";
      img.alt = nfPartnerShortName(p);
      img.loading = "lazy";
      nfSetPartnerLogo(img, p.id);
      btn.appendChild(img);

      btn.addEventListener("click", () => {
        const slug = nfPartnerSlug(p);
        if (slug) nfGoPath(nfPartnerOpenUrlBySlug(slug));
      });

      track.appendChild(btn);
    });

    row.appendChild(track);
    return row;
  };

  ribbon.appendChild(buildRibbonRow(row1Partners, "fwd"));
  ribbon.appendChild(buildRibbonRow(row2Partners, "rev"));
  root.appendChild(ribbon);

  startTimer();
}

function nfRenderHomeNews() {
  const container = nfEl("homeNews");
  if (!container) return;
  container.innerHTML = "";

  const [main, ...rest] = [...(NF_DATA.news || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  if (!main) {
    container.innerHTML = `<div class="nf-empty">${nfEscapeHtml(nfT("common.noNewsYet", "Новостей пока нет."))}</div>`;
    return;
  }

  // Featured editorial story (left column)
  const featured = nfCreateEl("article", "nf-hn-featured fade-up");
  featured.style.setProperty("--nf-vp-stagger", "0ms");
  const _mainCat = nfNewsCategory(main);
  featured.innerHTML = `
    <div class="nf-hn-featured__media">
      ${main.image
        ? `<img src="${nfEscapeHtml(main.image)}" alt="" loading="lazy" class="nf-hn-featured__img" />`
        : `<div class="nf-hn-featured__ph" aria-hidden="true"><div class="nf-hn-featured__ph-label">${_mainCat ? `<span class="nf-hn-featured__ph-cat">${nfEscapeHtml(_mainCat)}</span><span class="nf-hn-featured__ph-sep" aria-hidden="true">·</span>` : ""}<span class="nf-hn-featured__ph-date">${nfEscapeHtml(nfFormatDate(main.date))}</span></div></div>`}
    </div>
    <div class="nf-hn-featured__body">
      ${_mainCat ? `<span class="nf-hn-featured__cat">${nfEscapeHtml(_mainCat)}</span>` : ""}
      <h3 class="nf-hn-featured__title">${nfEscapeHtml(nfNewsTitle(main))}</h3>
      <p class="nf-hn-featured__excerpt">${nfEscapeHtml(nfNewsExcerpt(main))}</p>
      <div class="nf-hn-featured__foot">
        <span class="nf-hn-featured__date">${nfEscapeHtml(nfFormatDate(main.date))}</span>
        <span class="nf-hn-featured__cta">${nfEscapeHtml(nfT("common.readMaterial", "Читать материал"))}<span class="nf-hn-featured__arrow" aria-hidden="true">→</span></span>
      </div>
    </div>
  `;
  featured.addEventListener("click", () => { NF_STATE.newsArticleId = main.id; nfGoPath(`/news/${nfNewsPermalinkSlug(main)}`); });

  // Compact headline list (right column)
  const sidebar = nfCreateEl("nav", "nf-hn-sidebar");
  sidebar.setAttribute("aria-label", nfT("common.moreNews", "Другие новости"));
  rest.slice(0, 4).forEach((n, i) => {
    const _dp = (n.date || "").split("-");
    const _months = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
    const _day = parseInt(_dp[2] || "", 10) || "";
    const _mon = _months[(parseInt(_dp[1] || "", 10) || 1) - 1] || "";
    const _yr = _dp[0] || "";
    const item = nfCreateEl("article", "nf-hn-item nf-vp-reveal");
    item.style.setProperty("--nf-vp-stagger", `${(i + 1) * 60}ms`);
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.innerHTML = `
      <div class="nf-hn-item__meta">
        <span class="nf-hn-item__day">${_day}</span>
        <span class="nf-hn-item__mon">${_mon} ${_yr}</span>
      </div>
      <h3 class="nf-hn-item__title">${nfEscapeHtml(nfNewsTitle(n))}</h3>
      <span class="nf-hn-item__arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </span>
    `;
    const _open = () => { NF_STATE.newsArticleId = n.id; nfGoPath(`/news/${nfNewsPermalinkSlug(n)}`); };
    item.addEventListener("click", _open);
    item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); _open(); } });
    sidebar.appendChild(item);
  });

  container.append(featured, sidebar);
}

/* ====== КАТАЛОГ ====== */
function nfCatalogCurrentFilterSnapshot() {
  const f = NF_STATE.filters;
  return {
    search: String(f.search || "").trim(),
    categoryIds: new Set(f.categoryIds || []),
    partnerIds: new Set(f.partnerIds || []),
    subcategoryId: String(f.subcategoryId || ""),
    model: String(f.model || "").trim(),
    sort: String(f.sort || "popular"),
    viewMode: String(f.viewMode || "grid"),
    page: 1,
  };
}

function nfCatalogBuildQueryFromFilters() {
  const f = nfCatalogCurrentFilterSnapshot();
  const params = new URLSearchParams();
  if (f.search) params.set("search", f.search);
  if (f.categoryIds.size) params.set("cat", [...f.categoryIds].sort().join(","));
  if (f.partnerIds.size) params.set("brand", [...f.partnerIds].sort().join(","));
  if (f.sort && f.sort !== "popular") params.set("sort", f.sort);
  if (f.viewMode && f.viewMode !== "grid") params.set("view", f.viewMode);
  return params.toString();
}

function nfCatalogSyncUrlWithFilters() {
  if (NF_STATE.currentPage !== "catalog") return;
  const query = nfCatalogBuildQueryFromFilters();
  const next = `/catalog${query ? `?${query}` : ""}`;
  const current = `${location.pathname}${location.search}`;
  if (current === next) return;
  try {
    history.replaceState({}, "", next);
  } catch (_e) {}
}

function nfCatalogApplyFiltersFromLocationSearch() {
  if (NF_STATE.currentPage !== "catalog") return;
  const params = new URLSearchParams(window.location.search || "");
  const f = NF_STATE.filters;

  const parseSet = (raw) =>
    new Set(
      String(raw || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    );

  f.search = String(params.get("search") || params.get("q") || "").trim();
  f.categoryIds = parseSet(params.get("cat"));
  f.partnerIds = parseSet(params.get("brand"));

  const allowedSort = new Set(["popular", "name-asc", "name-desc", "price-asc", "price-desc"]);
  const sort = String(params.get("sort") || "popular").trim();
  f.sort = allowedSort.has(sort) ? sort : "popular";

  const allowedView = new Set(["grid", "list", "large"]);
  const view = String(params.get("view") || "grid").trim();
  f.viewMode = allowedView.has(view) ? view : "grid";
  f.page = 1;
}

function nfCatalogResetFiltersState() {
  NF_STATE.filters = {
    search: "",
    categoryIds: new Set(),
    partnerIds: new Set(),
    model: "",
    sort: "popular",
    viewMode: NF_STATE.filters.viewMode || "grid",
    page: 1,
  };
}

function nfSyncCatalogSidebarControlsFromFilters() {
  const f = NF_STATE.filters;
  const modelInput = nfEl("filterModelInput");
  const catSelect = nfEl("filterCategorySelect");
  const partnerSelect = nfEl("filterPartnerSelect");
  const sortSelect = nfEl("catalogSort") || nfEl("sortSelect");
  const globalSearchInput = nfEl("globalSearchInput");

  if (modelInput) modelInput.value = f.model || "";
  if (catSelect) {
    catSelect.value = f.categoryIds.size === 1 ? [...f.categoryIds][0] : "";
    catSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
  }
  if (partnerSelect) {
    partnerSelect.value = f.partnerIds.size === 1 ? [...f.partnerIds][0] : "";
    partnerSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
  }
  if (sortSelect) {
    sortSelect.value = f.sort || "popular";
    sortSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
  }
  if (globalSearchInput && document.activeElement !== globalSearchInput) {
    globalSearchInput.value = f.search || "";
  }
}

function nfApplyCatalogFilters(filtersState = NF_STATE.filters, opts = {}) {
  const options = {
    navigateToCatalog: false,
    ...opts,
  };
  NF_STATE.filters = {
    ...NF_STATE.filters,
    ...filtersState,
    categoryIds: new Set(filtersState.categoryIds || []),
    partnerIds: new Set(filtersState.partnerIds || []),
    page: 1,
  };
  nfSyncCatalogSidebarControlsFromFilters();

  if (NF_STATE.currentPage === "catalog") {
    nfRenderCatalog();
    return;
  }

  if (options.navigateToCatalog) {
    const query = nfCatalogBuildQueryFromFilters();
    nfGoPath(`/catalog${query ? `?${query}` : ""}`);
  }
}

function applyFilters(filtersState = NF_STATE.filters, opts = {}) {
  nfApplyCatalogFilters(filtersState, opts);
}

function nfApplyFilters(filters = NF_STATE.filters) {
  let list = [...NF_DATA.products];
  const f = filters;

  if (f.search) {
    const q = nfNormalizeSearchText(f.search);
    list = list.filter((p) => {
      const partnerName = nfGetPartnerName(p.partnerId);
      const categoryName = String(NF_DATA.categories.find((c) => c.id === p.categoryId)?.name || "");
      const haystack = nfEntitySearchHaystack(p, [
        p.name,
        p.article,
        p.model,
        p.shortDesc,
        p.description,
        partnerName,
        categoryName,
      ]);
      return haystack.includes(q);
    });
  }

  if (f.categoryIds.size) list = list.filter((p) => f.categoryIds.has(p.categoryId));
  if (f.subcategoryId)   list = list.filter((p) => (p.subcategoryId || "") === f.subcategoryId);
  if (f.partnerIds.size) list = list.filter((p) => f.partnerIds.has(p.partnerId));

  if (f.model) {
    const q = f.model.toLowerCase();
    list = list.filter((p) => p.model.toLowerCase().includes(q));
  }

  switch (f.sort) {
    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      break;
    case "price-desc":
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    default:
      list.sort((a, b) => (b.popular === a.popular ? 0 : b.popular ? 1 : -1));
  }

  // Availability sort: in_stock first, on_order middle, out_of_stock last
  const availOrder = (p) => {
    const key = nfProductStatusKey(p.status, p.availability);
    if (key === "in")    return 0;
    if (key === "order") return 1;
    return 2; // out
  };
  list.sort((a, b) => availOrder(a) - availOrder(b));

  return list;
}

function nfRenderCatalogFilters() {
  const catSelect = nfEl("filterCategorySelect");
  const partnerSelect = nfEl("filterPartnerSelect");
  if (!catSelect || !partnerSelect) return;

  const f = NF_STATE.filters;

  // Категории
  catSelect.innerHTML = `<option value="">${nfEscapeHtml(nfT("catalog.allGroups", "Все группы"))}</option>`;
  NF_DATA.categories.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name;
    catSelect.appendChild(opt);
  });
  catSelect.value = f.categoryIds.size === 1 ? Array.from(f.categoryIds)[0] : "";
  catSelect.onchange = (e) => {
    const val = e.target.value;
    f.categoryIds = new Set();
    if (val) f.categoryIds.add(val);
    nfApplyCatalogFilters(f, { navigateToCatalog: false });
  };

  // Партнёры
  partnerSelect.innerHTML = `<option value="">${nfEscapeHtml(nfT("catalog.allBrands", "Все бренды"))}</option>`;
  NF_DATA.partners.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    partnerSelect.appendChild(opt);
  });
  partnerSelect.value = f.partnerIds.size === 1 ? Array.from(f.partnerIds)[0] : "";
  partnerSelect.onchange = (e) => {
    const val = e.target.value;
    f.partnerIds = new Set();
    if (val) f.partnerIds.add(val);
    nfApplyCatalogFilters(f, { navigateToCatalog: false });
  };

  // Модели (по полю model)

  nfEnhanceSelectDropdown(catSelect);
  nfEnhanceSelectDropdown(partnerSelect);

  catSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
  partnerSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
}

function nfCatalogFiltersSignature() {
  const f = NF_STATE.filters;
  const cats = [...f.categoryIds].sort().join("\u0001");
  const parts = [...f.partnerIds].sort().join("\u0001");
  return [
    cats,
    parts,
    f.subcategoryId || "",
    f.model || "",
    f.sort || "",
    f.viewMode || "",
    f.search || "",
  ].join("|");
}

/** Одна карточка каталога — premium redesign */
function nfCreateCatalogProductCard(p, staggerOpts) {
  const statusKey   = nfProductStatusKey(p.status, p.availability);
  const statusLabel = nfProductStatusLabel(p.status, p.availability);
  const isOut       = statusKey === "out";
  const isIn        = statusKey === "in";

  const card = nfCreateEl("article", `nf-pc nf-vp-reveal${isOut ? " nf-pc--out" : ""}${isIn ? " nf-pc--in" : ""}`);
  card.dataset.productId = p.id;
  if (staggerOpts?.staggerMs > 0) card.style.setProperty("--nf-vp-stagger", `${staggerOpts.staggerMs}ms`);

  // ── Image area ──────────────────────────────────────
  const imgWrap = nfCreateEl("div", "nf-pc__img-wrap");
  const img = document.createElement("img");
  img.alt = p.name;
  const src = (nfGetProductImages(p)[0] || p.image || "").trim();
  img.src = src || nfProductPlaceholderSvg();
  nfConfigureImageElement(img, { loading: "lazy", decoding: "async", fetchPriority: "low" });
  img.onerror = () => { img.src = nfProductPlaceholderSvg(); };
  img.className = "nf-pc__img";
  imgWrap.appendChild(img);

  // Status badge on image
  const badge = nfCreateEl("span", `nf-pc__status nf-pc__status--${statusKey}`);
  badge.textContent = statusLabel;
  imgWrap.appendChild(badge);

  // Popular badge
  if (p.popular || p.isPopular) {
    const pop = nfCreateEl("span", "nf-pc__popular", nfT("common.popularBadge", "Популярный"));
    imgWrap.appendChild(pop);
  }

  // Out-of-stock overlay
  if (isOut) {
    const overlay = nfCreateEl("div", "nf-pc__out-overlay");
    overlay.setAttribute("aria-hidden", "true");
    imgWrap.appendChild(overlay);
  }

  imgWrap.addEventListener("click", () => nfOpenProductPage(p.id));

  // ── Body ────────────────────────────────────────────
  const body = nfCreateEl("div", "nf-pc__body");

  const cat = NF_DATA.categories.find((c) => c.id === p.categoryId);
  const partnerName = nfGetPartnerName(p.partnerId);

  if (cat || partnerName) {
    const meta = nfCreateEl("div", "nf-pc__meta");
    if (partnerName) meta.appendChild(nfCreateElText("span", "nf-pc__brand", partnerName));
    if (cat && partnerName) {
      const sep = nfCreateEl("span", "nf-pc__meta-sep"); sep.setAttribute("aria-hidden","true");
      meta.appendChild(sep);
    }
    if (cat) meta.appendChild(nfCreateElText("span", "nf-pc__cat", cat.name));
    body.appendChild(meta);
  }

  const title = nfCreateEl("h3", "nf-pc__title");
  title.textContent = p.name;
  title.addEventListener("click", () => nfOpenProductPage(p.id));
  body.appendChild(title);

  if (p.shortDesc) {
    const desc = nfCreateEl("p", "nf-pc__desc");
    desc.textContent = p.shortDesc;
    body.appendChild(desc);
  }

  // ── Footer ───────────────────────────────────────────
  const footer = nfCreateEl("div", "nf-pc__footer");

  const price = nfCreateEl("div", `nf-pc__price${!p.price ? " nf-pc__price--muted" : ""}`);
  price.textContent = nfFormatPrice(p.price);
  footer.appendChild(price);

  const actions = nfCreateEl("div", "nf-pc__actions");

  const addBtn = nfCreateEl("button", "nf-pc__add nf-btn-checkable", "");
  addBtn.type = "button";
  nfInitAddToRequestControl(addBtn, p.id, nfT("common.addToRequest", "В запрос"), {});
  addBtn.addEventListener("click", () => nfToggleCartItem(p.id, 1, { sourceButton: addBtn }));

  const moreBtn = nfCreateEl("button", "nf-pc__more");
  moreBtn.type = "button";
  moreBtn.setAttribute("aria-label", nfT("common.details", "Подробнее"));
  moreBtn.innerHTML = `<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  moreBtn.addEventListener("click", () => nfOpenProductPage(p.id));

  actions.append(addBtn, moreBtn);
  footer.appendChild(actions);

  card.append(imgWrap, body, footer);
  return card;
}

function nfCatalogObserveAddedCards(elements) {
  nfSimpleRevealObserveElements(elements);
}

function nfCatalogUpdateCountLabel(total, shown) {
  const label = nfEl("catalogCountLabel");
  if (!label) return;
  if (shown >= total) {
    label.textContent = nfT("catalog.countFound", "Найдено: {total} {items}", {
      total,
      items: nfItemsCountLabel(total).replace(`${total} `, ""),
    });
  } else {
    label.textContent = nfT("catalog.countShown", "Найдено: {total} {items} · показано {shown}", {
      total,
      shown,
      items: nfItemsCountLabel(total).replace(`${total} `, ""),
    });
  }
}

function nfCatalogSetupLoadMoreSentinel(container, sentinel, hasMore) {
  if (NF_CATALOG_SENTINEL_IO) {
    NF_CATALOG_SENTINEL_IO.disconnect();
    NF_CATALOG_SENTINEL_IO = null;
  }

  const loadBtn = nfEl("catalogLoadMoreBtn");
  if (!hasMore) {
    if (loadBtn) {
      loadBtn.hidden = true;
      loadBtn.classList.add("nf-hidden");
    }
    return;
  }

  if (!("IntersectionObserver" in window)) {
    if (loadBtn) {
      loadBtn.hidden = false;
      loadBtn.classList.remove("nf-hidden");
      loadBtn.onclick = () => nfCatalogAppendNextBatch();
    }
    return;
  }

  if (loadBtn) {
    loadBtn.hidden = true;
    loadBtn.classList.add("nf-hidden");
  }

  NF_CATALOG_SENTINEL_IO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) nfCatalogAppendNextBatch();
      });
    },
    { rootMargin: "320px 0px 320px 0px", threshold: 0 }
  );
  if (sentinel) NF_CATALOG_SENTINEL_IO.observe(sentinel);
}

let NF_CATALOG_APPEND_LOCK = false;

function nfCatalogAppendNextBatch() {
  if (NF_CATALOG_APPEND_LOCK) return;
  const container = nfEl("catalogProducts");
  const st = NF_STATE.catalogRender;
  if (!container || !st.cachedList.length || st.renderedCount >= st.cachedList.length) return;
  if (nfCatalogFiltersSignature() !== st.signature) return;

  NF_CATALOG_APPEND_LOCK = true;
  try {
    const sentinel = container.querySelector(".nf-catalog-load-sentinel");
    const prev = st.renderedCount;
    const next = Math.min(prev + NF_CATALOG_BATCH_STEP, st.cachedList.length);
    const frag = document.createDocumentFragment();
    const newEls = [];
    for (let i = prev; i < next; i++) {
      const card = nfCreateCatalogProductCard(st.cachedList[i], null);
      frag.appendChild(card);
      newEls.push(card);
    }
    if (sentinel) container.insertBefore(frag, sentinel);
    else container.appendChild(frag);

    st.renderedCount = next;
    nfCatalogObserveAddedCards(newEls);
    nfCatalogUpdateCountLabel(st.cachedList.length, st.renderedCount);

    const stillMore = st.renderedCount < st.cachedList.length;
    nfCatalogSetupLoadMoreSentinel(container, sentinel, stillMore);
  } finally {
    queueMicrotask(() => {
      NF_CATALOG_APPEND_LOCK = false;
    });
  }
}

function nfRenderCatalog() {
  nfRenderCatalogFilters();
  const fullList = nfApplyFilters();
  NF_STATE.filters.page = 1;

  const label = nfEl("catalogCountLabel");
  const activeFilters = nfEl("catalogActiveFilters");
  if (activeFilters) activeFilters.innerHTML = "";

  const f = NF_STATE.filters;

  if (activeFilters) {
    if (NF_STATE.catalogPhase !== "explorer") {
      f.categoryIds.forEach((id) => {
        const c = NF_DATA.categories.find((x) => x.id === id);
        if (!c) return;
        const chip = nfCreateEl("div", "nf-filter-chip");
        const label = nfCreateEl("span", "nf-filter-chip__text");
        label.textContent = nfT("catalog.filter.category", "Категория: {value}", { value: c.name });
        const rm = document.createElement("button");
        rm.type = "button";
        rm.className = "nf-filter-chip__remove";
        rm.setAttribute("aria-label", nfT("catalog.filter.removeAria", "Убрать фильтр"));
        rm.textContent = "×";
        rm.addEventListener("click", () => {
          f.categoryIds.delete(id);
          nfApplyCatalogFilters(f, { navigateToCatalog: false });
        });
        chip.append(label, rm);
        activeFilters.appendChild(chip);
      });
    }

    f.partnerIds.forEach((id) => {
      const p = NF_DATA.partners.find((x) => x.id === id);
      if (!p) return;
      const chip = nfCreateEl("div", "nf-filter-chip");
      const label = nfCreateEl("span", "nf-filter-chip__text");
      label.textContent = nfT("catalog.filter.partner", "Партнёр: {value}", { value: p.name });
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "nf-filter-chip__remove";
      rm.setAttribute("aria-label", nfT("catalog.filter.removeAria", "Убрать фильтр"));
      rm.textContent = "×";
      rm.addEventListener("click", () => {
        f.partnerIds.delete(id);
        nfApplyCatalogFilters(f, { navigateToCatalog: false });
      });
      chip.append(label, rm);
      activeFilters.appendChild(chip);
    });

    if (f.subcategoryId) {
      const sub = (NF_DATA.categories || []).find((x) => x.id === f.subcategoryId);
      if (sub) {
        const chip = nfCreateEl("div", "nf-filter-chip nf-filter-chip--subcat");
        const lbl = nfCreateEl("span", "nf-filter-chip__text");
        lbl.textContent = sub.name;
        const rm = document.createElement("button");
        rm.type = "button";
        rm.className = "nf-filter-chip__remove";
        rm.setAttribute("aria-label", "Убрать подкатегорию");
        rm.textContent = "×";
        rm.addEventListener("click", () => nfClearSubcategory());
        chip.append(lbl, rm);
        activeFilters.appendChild(chip);
      }
    }

    if (f.model) {
      const chip = nfCreateEl("div", "nf-filter-chip");
      const label = nfCreateEl("span", "nf-filter-chip__text");
      label.textContent = nfT("catalog.filter.model", "Модель: {value}", { value: f.model });
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "nf-filter-chip__remove";
      rm.setAttribute("aria-label", nfT("catalog.filter.removeAria", "Убрать фильтр"));
      rm.textContent = "×";
      rm.addEventListener("click", () => {
        f.model = "";
        const input = nfEl("filterModelInput");
        if (input) input.value = "";
        nfApplyCatalogFilters(f, { navigateToCatalog: false });
      });
      chip.append(label, rm);
      activeFilters.appendChild(chip);
    }
    if (f.search) {
      const chip = nfCreateEl("div", "nf-filter-chip");
      const label = nfCreateEl("span", "nf-filter-chip__text");
      label.textContent = nfT("catalog.filter.search", "Поиск: {value}", { value: f.search });
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "nf-filter-chip__remove";
      rm.setAttribute("aria-label", nfT("catalog.filter.clearSearchAria", "Очистить поиск"));
      rm.textContent = "×";
      rm.addEventListener("click", () => {
        f.search = "";
        nfApplyCatalogFilters(f, { navigateToCatalog: false });
      });
      chip.append(label, rm);
      activeFilters.appendChild(chip);
    }
  }

  const container = nfEl("catalogProducts");
  if (!container) return;

  container.classList.add("nf-catalog-mutation");
  requestAnimationFrame(() => {
    container.classList.remove("nf-catalog-mutation");
  });

  const st = NF_STATE.catalogRender;
  st.signature = nfCatalogFiltersSignature();
  st.cachedList = fullList;
  st.renderedCount = 0;

  nfDisconnectCatalogRevealAndSentinel();

  container.innerHTML = "";
  container.classList.remove(
    "nf-products-list",
    "nf-products-large",
    "nf-products-grid-mode",
    "nf-products-list-mode"
  );

  if (f.viewMode === "list") {
    container.classList.add("nf-products-list", "nf-products-list-mode");
  } else if (f.viewMode === "large") {
    container.classList.add("nf-products-large");
  } else {
    container.classList.add("nf-products-grid-mode");
  }

  const total = fullList.length;

  // Empty state
  if (total === 0) {
    const subcatName = f.subcategoryId
      ? (NF_DATA.categories || []).find((c) => c.id === f.subcategoryId)?.name || ""
      : "";
    const emptyDiv = nfCreateEl("div", "nf-catalog-empty");
    emptyDiv.innerHTML = `
      <div class="nf-catalog-empty__icon" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" width="52" height="52">
          <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
          <path d="M22 32h20M32 22v20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.4"/>
        </svg>
      </div>
      <p class="nf-catalog-empty__title">${subcatName ? nfEscapeHtml(subcatName) : "Нет оборудования"}</p>
      <p class="nf-catalog-empty__text">${subcatName ? "В этой подкатегории пока нет оборудования." : "По выбранным фильтрам ничего не найдено."}</p>
      ${subcatName ? `<button type="button" class="nf-catalog-empty__btn" id="emptyShowAllBtn">Показать все в направлении</button>` : ""}
    `;
    container.appendChild(emptyDiv);
    if (subcatName) {
      const btn = document.getElementById("emptyShowAllBtn");
      if (btn) btn.addEventListener("click", () => nfClearSubcategory());
    }
    nfCatalogUpdateCountLabel(0, 0);
    return;
  }

  const firstCount = Math.min(NF_CATALOG_BATCH_INITIAL, total);
  const firstCards = [];
  for (let i = 0; i < firstCount; i++) {
    const staggerMs = i < 8 ? i * 42 : 0;
    const card = nfCreateCatalogProductCard(
      fullList[i],
      staggerMs > 0 ? { staggerMs } : null
    );
    container.appendChild(card);
    firstCards.push(card);
  }
  st.renderedCount = firstCount;

  const sentinel = nfCreateEl("div", "nf-catalog-load-sentinel");
  sentinel.setAttribute("aria-hidden", "true");
  container.appendChild(sentinel);

  nfCatalogUpdateCountLabel(total, st.renderedCount);
  nfCatalogObserveAddedCards(firstCards);

  const hasMore = st.renderedCount < st.cachedList.length;
  nfCatalogSetupLoadMoreSentinel(container, sentinel, hasMore);

  const paginationEl = nfEl("catalogPagination");
  if (paginationEl) {
    paginationEl.innerHTML = "";
    paginationEl.hidden = true;
  }

  nfCatalogSyncUrlWithFilters();
}

/* ====== КОРЗИНА ====== */
const NF_CART_STORAGE_KEY = "nf_cart_v1";

function nfSaveCartToStorage() {
  try {
    localStorage.setItem(NF_CART_STORAGE_KEY, JSON.stringify(NF_STATE.cart));
  } catch (_e) {}
}

function nfLoadCartFromStorage() {
  try {
    const raw = localStorage.getItem(NF_CART_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      NF_STATE.cart = parsed.filter(
        (x) => x && typeof x.productId === "string" && typeof x.qty === "number" && x.qty > 0
      );
    }
  } catch (_e) {}
}

function nfGetCartItem(productId) {
  return NF_STATE.cart.find((x) => x.productId === productId);
}

function nfUndoCartAdjust(productId, qty) {
  const existing = nfGetCartItem(productId);
  if (!existing) return;
  existing.qty -= qty;
  if (existing.qty <= 0) {
    NF_STATE.cart = NF_STATE.cart.filter((x) => x.productId !== productId);
  }
}

function nfAddToRequestCartIconSvg() {
  return `<svg class="nf-add-request__svg" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 5h2l1.2 8.4A1.5 1.5 0 0 0 9.7 15h7.1a1.5 1.5 0 0 0 1.47-1.19L19.8 9H8.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="10" cy="18" r="1.3" fill="currentColor" />
    <circle cx="17" cy="18" r="1.3" fill="currentColor" />
  </svg>`;
}

function nfAddToRequestCheckSvg() {
  return `<svg class="nf-add-request__svg nf-add-request__svg--check" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 12.5l3.8 3.5L18 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function nfAddToRequestInnerHtml(idleLabel, options = {}) {
  const compact = !!options.compact;
  const inCartLabel = options.inCartLabel || nfT("common.inRequest", "В запросе");
  const ico = compact ? "" : `<span class="nf-add-request__ico" aria-hidden="true">${nfAddToRequestCartIconSvg()}</span>`;
  const icoDone = compact ? "" : `<span class="nf-add-request__ico" aria-hidden="true">${nfAddToRequestCartIconSvg()}</span>`;
  const cancelSvg = `<svg class="nf-add-request__svg nf-add-request__svg--x" viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  return `<span class="nf-add-request__root">
    <span class="nf-add-request__seg nf-add-request__idle">${ico}<span class="nf-add-request__txt">${nfEscapeHtml(idleLabel)}</span></span>
    <span class="nf-add-request__seg nf-add-request__check" aria-hidden="true">${nfAddToRequestCheckSvg()}</span>
    <span class="nf-add-request__seg nf-add-request__undo">${cancelSvg}<span class="nf-add-request__txt">Отмена</span></span>
    <span class="nf-add-request__seg nf-add-request__done">${icoDone}<span class="nf-add-request__txt">${nfEscapeHtml(inCartLabel)}</span></span>
  </span>
  <span class="nf-add-request__undo-track" aria-hidden="true"><span class="nf-add-request__undo-bar"></span></span>`;
}

function nfInitAddToRequestControl(el, productId, idleLabel, options = {}) {
  if (!el) return;
  el.dataset.nfAddProduct = productId;
  el.classList.add("nf-add-request");
  el.classList.toggle("nf-add-request--compact", !!options.compact);
  el.innerHTML = nfAddToRequestInnerHtml(idleLabel, {
    compact: !!options.compact,
    inCartLabel: options.inCartLabel || nfT("common.inRequest", "В запросе"),
  });
  nfSyncAddToRequestButton(el);
}

function nfCssEscapeSelector(value) {
  const s = String(value ?? "");
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(s);
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function nfSyncAddToRequestButton(btn) {
  if (!btn || !btn.dataset || !btn.dataset.nfAddProduct) return;
  // Don't override transitional / animated states
  if (btn.classList.contains("nf-add-request--reverting"))  return;
  if (btn.classList.contains("nf-add-request--success-run")) return;
  if (btn.classList.contains("nf-add-request--countdown"))   return;
  const id = btn.dataset.nfAddProduct;
  const has = !!nfGetCartItem(id);
  if (has) {
    btn.classList.add("nf-add-request--in-cart");
  } else {
    btn.classList.remove(
      "nf-add-request--in-cart",
      "nf-add-request--success-run",
      "nf-add-request--pressed",
      "nf-add-request--countdown"
    );
  }
}

function nfSyncAllAddToRequestButtons() {
  document.querySelectorAll("[data-nf-add-product]").forEach((btn) => nfSyncAddToRequestButton(btn));
}

const NF_ADD_REQUEST_COUNTDOWN_MS = 3200;

function nfPlayAddToRequestSuccess(btn) {
  if (!btn || !btn.classList.contains("nf-add-request")) return;
  // Clear any running timers
  ["_nfAddReqSuccessT", "_nfUndoTimer"].forEach((k) => {
    if (btn[k]) { clearTimeout(btn[k]); btn[k] = null; }
  });
  btn.classList.remove(
    "nf-add-request--reverting",
    "nf-add-request--pressed",
    "nf-add-request--success-run",
    "nf-add-request--countdown",
    "nf-add-request--in-cart"
  );
  void btn.offsetWidth; // reflow to restart animations

  // Brief press flash
  btn.classList.add("nf-add-request--pressed");
  requestAnimationFrame(() => {
    btn.classList.remove("nf-add-request--pressed");

    // Show countdown / undo phase
    btn.classList.add("nf-add-request--countdown");

    // Restart bar animation
    const bar = btn.querySelector(".nf-add-request__undo-bar");
    if (bar) {
      bar.style.animationName = "none";
      void bar.offsetWidth;
      bar.style.animationName = "";
    }

    // After countdown → confirmed in-cart
    btn._nfUndoTimer = setTimeout(() => {
      btn._nfUndoTimer = null;
      if (!btn.classList.contains("nf-add-request--countdown")) return;
      btn.classList.remove("nf-add-request--countdown");
      btn.classList.add("nf-add-request--in-cart");
    }, NF_ADD_REQUEST_COUNTDOWN_MS);
  });
}

function nfPlayAddToRequestReset(btn) {
  if (!btn || !btn.classList.contains("nf-add-request")) return;
  ["_nfAddReqSuccessT", "_nfUndoTimer"].forEach((k) => {
    if (btn[k]) { clearTimeout(btn[k]); btn[k] = null; }
  });
  btn.classList.remove(
    "nf-add-request--success-run",
    "nf-add-request--pressed",
    "nf-add-request--countdown",
    "nf-add-request--in-cart"
  );
  btn.classList.add("nf-add-request--reverting");
  setTimeout(() => {
    btn.classList.remove("nf-add-request--reverting");
  }, 380);
}

function nfToastProductAddedToRequest({ productId, qty, sourceButton }) {
  nfPushToast({
    message: nfT("toast.addedToRequest", "Товар добавлен в запрос"),
    variant: "success",
    duration: 7200,
    actionLabel: nfT("toast.undo", "Отменить"),
    pauseOnHover: true,
    onAction: () => {
      nfUndoCartAdjust(productId, qty);
      nfSaveCartToStorage();
      nfUpdateCartBadge();
      const sel = `[data-nf-add-product="${nfCssEscapeSelector(productId)}"]`;
      document.querySelectorAll(sel).forEach((b) => nfPlayAddToRequestReset(b));
      nfRenderCart();
      nfPushToast({
        message: nfT("toast.addCancelled", "Добавление отменено"),
        variant: "info",
        duration: 3400,
      });
      return true;
    },
  });
  if (sourceButton && sourceButton.classList.contains("nf-add-request")) {
    // nfPlayAddToRequestSuccess already called by the non-inline path; avoid double-call
    if (!sourceButton.classList.contains("nf-add-request--countdown") &&
        !sourceButton.classList.contains("nf-add-request--in-cart")) {
      nfPlayAddToRequestSuccess(sourceButton);
    }
  }
  document.querySelectorAll(`[data-nf-add-product="${nfCssEscapeSelector(productId)}"]`).forEach((b) => {
    if (b !== sourceButton) nfSyncAddToRequestButton(b);
  });
}

function nfToastProductRemovedFromRequest({ productId, sourceButton }) {
  void sourceButton;
  nfPushToast({
    message: nfT("toast.removedFromRequest", "Товар удалён из запроса"),
    variant: "info",
    duration: 5200,
    actionLabel: nfT("toast.undo", "Отменить"),
    pauseOnHover: true,
    onAction: () => {
      // Re-add with qty 1
      if (!nfGetCartItem(productId)) {
        NF_STATE.cart.push({ productId, qty: 1 });
        nfSaveCartToStorage();
        nfUpdateCartBadge();
        nfRenderCart();
        const sel = `[data-nf-add-product="${nfCssEscapeSelector(productId)}"]`;
        document.querySelectorAll(sel).forEach((b) => nfPlayAddToRequestSuccess(b));
      }
      nfPushToast({
        message: nfT("toast.removeCancelled", "Удаление отменено"),
        variant: "success",
        duration: 3400,
      });
      return true;
    },
  });
}

function nfAddToCart(productId, qty, options) {
  const opts = options && typeof options === "object" ? options : {};
  const silent = !!opts.silent;
  const sourceButton = opts.sourceButton || null;

  const existing = nfGetCartItem(productId);
  if (existing) existing.qty += qty;
  else NF_STATE.cart.push({ productId, qty });

  nfSaveCartToStorage();
  nfUpdateCartBadge();
  nfRenderCart();

  if (!silent) {
    nfToastProductAddedToRequest({ productId, qty, sourceButton });
  }
}

function nfOpenCartAndHighlight(productId) {
  nfOpenCartPanel();
  setTimeout(() => {
    const row = document.querySelector(`[data-cart-product-id="${nfCssEscapeSelector(productId)}"]`);
    if (!row) return;
    row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    row.classList.add("nf-cart-item--highlight");
    setTimeout(() => row.classList.remove("nf-cart-item--highlight"), 1800);
  }, 160);
}

function nfToggleCartItem(productId, qty, options) {
  const opts = options && typeof options === "object" ? options : {};
  const sourceButton = opts.sourceButton || null;
  // True when sourceButton has inline countdown (toast is redundant)
  const hasInlineUndo = sourceButton && sourceButton.classList.contains("nf-add-request");

  if (nfGetCartItem(productId)) {
    // Already in request — if button is in "in-cart" state, open cart and highlight instead of removing
    if (sourceButton && sourceButton.classList.contains("nf-add-request--in-cart")) {
      nfOpenCartAndHighlight(productId);
      return;
    }
    // Otherwise (e.g. remove from cart panel itself) — remove it
    NF_STATE.cart = NF_STATE.cart.filter((x) => x.productId !== productId);
    nfSaveCartToStorage();
    nfUpdateCartBadge();
    nfRenderCart();
    const sel = `[data-nf-add-product="${nfCssEscapeSelector(productId)}"]`;
    document.querySelectorAll(sel).forEach((b) => nfPlayAddToRequestReset(b));
    // Skip toast when user explicitly cancelled via inline countdown button
    if (!hasInlineUndo) nfToastProductRemovedFromRequest({ productId, sourceButton });
  } else {
    // Not in request — add it
    NF_STATE.cart.push({ productId, qty: qty || 1 });
    nfSaveCartToStorage();
    nfUpdateCartBadge();
    nfRenderCart();
    if (hasInlineUndo) {
      // Inline countdown handles undo — just animate the button
      nfPlayAddToRequestSuccess(sourceButton);
      document.querySelectorAll(`[data-nf-add-product="${nfCssEscapeSelector(productId)}"]`).forEach((b) => {
        if (b !== sourceButton) nfSyncAddToRequestButton(b);
      });
    } else {
      nfToastProductAddedToRequest({ productId, qty: qty || 1, sourceButton });
    }
  }
}

function nfAnimateAddToCartButton(sourceButton) {
  if (!sourceButton) return;
  if (sourceButton.classList.contains("nf-add-request")) {
    nfPlayAddToRequestSuccess(sourceButton);
  } else {
    sourceButton.classList.add("nf-btn-checkable");
    sourceButton.classList.remove("nf-btn-check-success");
  }
}

function nfUpdateCartBadge() {
  const badge = nfEl("cartCountBadge");
  if (!badge) return;
  const total = NF_STATE.cart.reduce((sum, i) => sum + i.qty, 0);
  badge.textContent = total;
}

function nfRenderCart() {
  const itemsEl = nfEl("cartItems");
  const totalsEl = nfEl("cartTotals");
  const btn = nfEl("cartRequestBtn");
  const clearBtn = nfEl("cartClearBtn");
  const headerCount = nfEl("cartHeaderCount");
  if (!itemsEl || !totalsEl || !btn) return;

  itemsEl.innerHTML = "";

  // Update header count badge
  if (headerCount) {
    const n = NF_STATE.cart.length;
    headerCount.textContent = n ? String(n) : "";
    headerCount.hidden = !n;
  }

  if (!NF_STATE.cart.length) {
    itemsEl.innerHTML = `
      <div class="nf-cart-empty">
        <div class="nf-cart-empty-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
            <path d="M6 7h3l2.4 11.6A2 2 0 0 0 13.3 20h10.2a2 2 0 0 0 1.94-1.52L27 10H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="14" cy="24.5" r="1.7" fill="currentColor"/>
            <circle cx="22" cy="24.5" r="1.7" fill="currentColor"/>
          </svg>
        </div>
        <p class="nf-cart-empty-title">${nfEscapeHtml(nfT("cart.empty.title", "В запросе пока нет позиций"))}</p>
        <p class="nf-cart-empty-text">${nfEscapeHtml(nfT("cart.empty.text", "Добавьте оборудование из каталога, чтобы отправить единый запрос на коммерческое предложение."))}</p>
      </div>`;
    totalsEl.textContent = "";
    btn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;
    nfSyncAllAddToRequestButtons();
    return;
  }

  btn.disabled = false;
  if (clearBtn) clearBtn.disabled = false;
  let totalKnown = 0;
  let totalUnits = 0;

  NF_STATE.cart.forEach((item) => {
    const p = NF_DATA.products.find((x) => x.id === item.productId);
    if (!p) return;

    const row = nfCreateEl("div", "nf-cart-item");
    row.dataset.cartProductId = item.productId;

    // Thumbnail
    const thumb = nfCreateEl("div", "nf-cart-thumb");
    if (p.images && p.images[0]) {
      const img = document.createElement("img");
      img.src = p.images[0];
      img.alt = "";
      img.className = "nf-cart-thumb-img";
      img.loading = "lazy";
      thumb.appendChild(img);
    }

    // Info block
    const info = nfCreateEl("div", "nf-cart-info");
    const categoryName = NF_DATA.categories.find((c) => c.id === p.categoryId)?.name || "";
    const partnerName = nfGetPartnerName(p.partnerId);
    const priceLabel = p.price != null ? nfFormatPrice(p.price) : nfT("common.priceOnRequest", "По запросу");
    info.innerHTML = `
      <div class="nf-cart-name">${nfEscapeHtml(p.name)}</div>
      <div class="nf-cart-meta">
        <span class="nf-cart-partner">${nfEscapeHtml(partnerName)}</span>
        ${categoryName ? `<span class="nf-cart-dot" aria-hidden="true">·</span><span>${nfEscapeHtml(categoryName)}</span>` : ""}
      </div>
      ${p.article ? `<div class="nf-cart-article">Арт. ${nfEscapeHtml(p.article)}</div>` : ""}
    `;

    // Right column: qty stepper + price + remove
    const right = nfCreateEl("div", "nf-cart-right");

    // Price label
    const priceEl = nfCreateEl("div", "nf-cart-price", priceLabel);

    // Qty stepper
    const stepper = nfCreateEl("div", "nf-cart-stepper");
    const btnMinus = nfCreateEl("button", "nf-cart-stepper-btn", "−");
    btnMinus.type = "button";
    btnMinus.setAttribute("aria-label", "Уменьшить количество");
    const qtyDisplay = nfCreateEl("span", "nf-cart-stepper-val", String(item.qty));
    const btnPlus = nfCreateEl("button", "nf-cart-stepper-btn", "+");
    btnPlus.type = "button";
    btnPlus.setAttribute("aria-label", "Увеличить количество");

    btnMinus.onclick = () => {
      item.qty = Math.max(1, item.qty - 1);
      qtyDisplay.textContent = String(item.qty);
      nfSaveCartToStorage();
      nfUpdateCartBadge();
      // update total display inline
      const priceRow = row.querySelector(".nf-cart-price");
      if (priceRow && p.price != null) {
        // just re-render for simplicity
        nfRenderCart();
      }
    };
    btnPlus.onclick = () => {
      item.qty += 1;
      qtyDisplay.textContent = String(item.qty);
      nfSaveCartToStorage();
      nfUpdateCartBadge();
      if (p.price != null) nfRenderCart();
    };
    stepper.append(btnMinus, qtyDisplay, btnPlus);

    // Remove button (X icon)
    const removeBtn = nfCreateEl("button", "nf-cart-remove-btn");
    removeBtn.type = "button";
    removeBtn.setAttribute("aria-label", `Убрать ${p.name}`);
    removeBtn.innerHTML = `<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
    removeBtn.addEventListener("click", () => {
      NF_STATE.cart = NF_STATE.cart.filter((x) => x.productId !== item.productId);
      nfSaveCartToStorage();
      nfRenderCart();
      nfUpdateCartBadge();
      // Reset any in-cart button states
      const sel = `[data-nf-add-product="${nfCssEscapeSelector(item.productId)}"]`;
      document.querySelectorAll(sel).forEach((b) => nfPlayAddToRequestReset(b));
    });

    right.append(priceEl, stepper, removeBtn);
    row.append(thumb, info, right);
    itemsEl.appendChild(row);

    totalUnits += item.qty;
    if (p.price != null) totalKnown += p.price * item.qty;
  });

  // Totals
  const posCount = NF_STATE.cart.length;
  const hasPrices = NF_STATE.cart.some((i) => {
    const p = NF_DATA.products.find((x) => x.id === i.productId);
    return p && p.price != null;
  });
  totalsEl.innerHTML = `
    <div class="nf-cart-totals-row">
      <span class="nf-cart-totals-label">Позиций</span>
      <span class="nf-cart-totals-val">${posCount}</span>
    </div>
    <div class="nf-cart-totals-row">
      <span class="nf-cart-totals-label">Единиц</span>
      <span class="nf-cart-totals-val">${totalUnits} шт.</span>
    </div>
    ${hasPrices ? `
    <div class="nf-cart-totals-row nf-cart-totals-row--sum">
      <span class="nf-cart-totals-label">Итого (с ценой)</span>
      <span class="nf-cart-totals-val nf-cart-totals-sum">${nfFormatPrice(totalKnown)}</span>
    </div>` : ""}
    <p class="nf-cart-totals-note">Итоговое КП будет содержать полный расчёт с позициями «по запросу».</p>
  `;
  nfSyncAllAddToRequestButtons();
}

function nfUpdateOverlayBody() {
  const cartOpen = nfEl("cartPanel")?.classList.contains("nf-cart-panel-open");
  const modalOpen = document.querySelector(".nf-modal.nf-modal-visible") != null;
  const backdropOpen = document.querySelector(".nf-backdrop.nf-backdrop-visible") != null;
  const mobileMenuOpen = document.getElementById("nfMobileMenu")?.classList.contains("nf-mobile-menu--open") || false;
  document.body.classList.toggle("nf-overlay-open", !!(cartOpen || modalOpen || backdropOpen));
  document.body.classList.toggle("nf-mobile-menu-open", !!mobileMenuOpen);
}

function nfToggleMobileNav(open) {
  const menu = document.getElementById("nfMobileMenu");
  const burger = document.getElementById("nfBurgerBtn");
  if (!menu || !burger) return;

  if (open) {
    menu.classList.add("nf-mobile-menu--open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
  } else {
    menu.classList.remove("nf-mobile-menu--open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
  }
  nfUpdateOverlayBody();
}

function nfOpenCartPanel() {
  const panel = nfEl("cartPanel");
  const backdrop = nfEl("cartBackdrop");
  if (!panel || !backdrop) return;
  panel.classList.add("nf-cart-panel-open");
  backdrop.classList.add("nf-backdrop-visible");
  nfUpdateOverlayBody();
}

function nfCloseCartPanel() {
  const panel = nfEl("cartPanel");
  const backdrop = nfEl("cartBackdrop");
  if (!panel || !backdrop) return;
  panel.classList.remove("nf-cart-panel-open");
  backdrop.classList.remove("nf-backdrop-visible");
  nfUpdateOverlayBody();
}

/* ====== КАРТОЧКА ТОВАРА: ОПИСАНИЕ / УСТАНОВКА / ОБСЛУЖИВАНИЕ (страница + модалка) ====== */

const NF_PRODUCT_DOCUMENTATION_NOTE =
  "Документация по оборудованию доступна по запросу — приложим паспорта и инструкции в составе коммерческого предложения.";

function nfProductDefaultServiceSteps() {
  return [
    nfT("product.defaultStep.1", "Анализ задач и требований заказчика"),
    nfT("product.defaultStep.2", "Подготовка технического решения и КП"),
    nfT("product.defaultStep.3", "Согласование конфигурации и сроков поставки"),
    nfT("product.defaultStep.4", "Поставка и логистика"),
    nfT("product.defaultStep.5", "Инсталляция и подключение к сетям"),
    nfT("product.defaultStep.6", "Калибровка и настройка"),
    nfT("product.defaultStep.7", "Интеграция с ИТ-системами"),
    nfT("product.defaultStep.8", "Обучение персонала"),
    nfT("product.defaultStep.9", "Тестовая эксплуатация"),
    nfT("product.defaultStep.10", "Плановое сервисное сопровождение"),
  ];
}

function nfProductServiceSteps(product) {
  if (Array.isArray(product?.serviceSteps) && product.serviceSteps.length) {
    return product.serviceSteps.map(String).filter(Boolean);
  }
  return nfProductDefaultServiceSteps();
}

function nfProductRequirementLists(product) {
  const roomDefaults = [
    nfT("product.defaultRoom.1", "Температура: +18°C до +25°C"),
    nfT("product.defaultRoom.2", "Влажность: 30–75% без конденсата"),
    nfT("product.defaultRoom.3", "Площадь: от 15 м²"),
    nfT("product.defaultRoom.4", "Высота потолков: от 2,5 м"),
  ];
  const engineerDefaults = [
    nfT("product.defaultEngineer.1", "Электропитание: 220В / 50Гц"),
    nfT("product.defaultEngineer.2", "Заземление"),
    nfT("product.defaultEngineer.3", "Интернет‑подключение (по необходимости)"),
    nfT("product.defaultEngineer.4", "Вентиляция помещения"),
  ];
  const roomList =
    Array.isArray(product?.roomRequirements) && product.roomRequirements.length
      ? product.roomRequirements
      : roomDefaults;
  const engineerList =
    Array.isArray(product?.engineerRequirements) && product.engineerRequirements.length
      ? product.engineerRequirements
      : engineerDefaults;
  return { roomList, engineerList };
}

function nfSplitInstallMaintenanceSteps(steps) {
  const list = Array.isArray(steps) ? steps.filter(Boolean).map(String) : [];
  if (!list.length) return { install: nfProductDefaultServiceSteps(), maintenance: [] };
  if (list.length <= 4) return { install: list, maintenance: [] };
  const nMaint = list.length >= 9 ? 3 : list.length >= 6 ? 2 : 1;
  const split = Math.max(1, list.length - nMaint);
  return { install: list.slice(0, split), maintenance: list.slice(split) };
}

function nfFillProductDescriptionHost(descHost, product) {
  if (!descHost) return;
  descHost.innerHTML = "";
  const raw =
    product.description ||
    nfT("product.defaultShortDesc", "Профессиональное медицинское оборудование.");
  const p = document.createElement("p");
  p.textContent = String(raw);
  descHost.appendChild(p);
}

function nfFillProductSpecsList(specsUl, product) {
  if (!specsUl) return;
  specsUl.innerHTML = "";
  if (!product.specs?.length) return;
  product.specs.forEach((s) => {
    const li = nfCreateEl("li", "nf-pdp-spec-row", "");
    li.textContent = String(s);
    specsUl.appendChild(li);
  });
}

function nfProductStatusLabel(status, availability) {
  const s = String(availability || status || "").toLowerCase();
  if (s === "in_stock" || s === "available" || s === "instock")
    return nfT("product.status.inStock", "В наличии");
  if (s === "out_of_stock" || s === "unavailable" || s === "absent" || s === "out_of_stock")
    return nfT("product.status.absent", "Отсутствует");
  return nfT("product.status.onOrder", "Под заказ");
}

function nfProductStatusKey(status, availability) {
  const s = String(availability || status || "").toLowerCase();
  if (s === "in_stock" || s === "available" || s === "instock") return "in";
  if (s === "out_of_stock" || s === "unavailable" || s === "absent") return "out";
  return "order";
}

function nfFillPdpDescriptionBlocks(descHost, product) {
  if (!descHost) return;
  descHost.innerHTML = "";
  const raw = product.description && String(product.description).trim();
  if (!raw) return;
  const chunks = raw.split(/\n\s*\n+/).filter(Boolean);
  const paragraphs = chunks.length > 1 ? chunks : raw.split(/\n/).map((x) => x.trim()).filter(Boolean);
  paragraphs.forEach((chunk) => {
    const p = nfCreateEl("p", "nf-pdp-prose-p", "");
    p.textContent = chunk.replace(/\s+/g, " ").trim();
    descHost.appendChild(p);
  });
}

function nfFillPdpQuickSpecs(ulEl, product, category, partnerName) {
  if (!ulEl) return;
  ulEl.innerHTML = "";
  const rows = [];
  const specs = Array.isArray(product.specs) ? product.specs : [];
  if (specs.length) {
    specs.slice(0, 8).forEach((s) => rows.push({ k: "", v: String(s) }));
  } else {
    if (category?.name) rows.push({ k: nfT("product.quick.category", "Категория"), v: category.name });
    if (partnerName) rows.push({ k: nfT("product.quick.partner", "Партнёр"), v: partnerName });
    // article removed
    if (product.model) rows.push({ k: nfT("product.quick.model", "Модель"), v: product.model });
  }
  rows.forEach(({ k, v }) => {
    const li = document.createElement("li");
    li.className = "nf-pdp-quick-spec";
    if (k) {
      li.appendChild(nfCreateElText("span", "nf-pdp-quick-spec-k", k));
      li.appendChild(nfCreateElText("span", "nf-pdp-quick-spec-v", v));
    } else {
      li.appendChild(nfCreateElText("span", "nf-pdp-quick-spec-full", v));
    }
    ulEl.appendChild(li);
  });
}

function nfFillPdpDocsSection(host, product) {
  if (!host) return;
  host.innerHTML = "";
  const docs = product.docs;
  if (Array.isArray(docs) && docs.length) {
    const ul = nfCreateEl("ul", "nf-pdp-docs-list");
    docs.forEach((d) => {
      const label =
        typeof d === "string"
          ? d
          : String(d?.title || d?.name || d?.label || d?.filename || "").trim();
      if (!label) return;
      ul.appendChild(nfCreateElText("li", "nf-pdp-docs-item", label));
    });
    if (ul.childNodes.length) {
      host.appendChild(ul);
      return;
    }
  }
  host.appendChild(nfCreateElText("p", "nf-pdp-doc-note", nfT("product.docNote", NF_PRODUCT_DOCUMENTATION_NOTE)));
}

function nfPdpParseKV(line) {
  const str = String(line || "").trim();
  const idx = str.indexOf(":");
  if (idx > 0 && idx < str.length - 1) {
    return { label: str.slice(0, idx).trim(), value: str.slice(idx + 1).trim() };
  }
  return { label: "", value: str };
}

function nfPdpSpecIconSlug(label) {
  const l = String(label || "").toLowerCase();
  if (/температур|^temp/i.test(l)) return "temp";
  if (/влажност|humidity/i.test(l)) return "humidity";
  if (/площад|area|м²|m²/i.test(l)) return "area";
  if (/высот|ceiling|потол/i.test(l)) return "height";
  if (/заземлен|ground|earthing/i.test(l)) return "ground";
  if (/электро|питан|power|напряж|вольт|220|380|watt|ампер/i.test(l)) return "power";
  if (/вентиляц|vent|приток|вытяж|airflow/i.test(l)) return "vent";
  if (/интернет|сети|wi-?fi|ethernet|it\s|ip/i.test(l)) return "network";
  if (/свет|освещ|lumen/i.test(l)) return "light";
  return "default";
}

function nfPdpInstallLineIconSlug(line) {
  return nfPdpSpecIconSlug(String(line || ""));
}

function nfPdpIconSvgOpen() {
  return '<svg class="nf-pdp-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
}

/**
 * Минималистичные stroke-иконки (единый стиль). kind: spec slug, installRoom, installEng, service* .
 */
function nfPdpGetPdpStrokeIcon(kind) {
  const k = String(kind || "default");
  const o = nfPdpIconSvgOpen();
  const c = "</svg>";
  if (k === "temp")
    return o + '<path d="M10 2v7.1a4 4 0 1 0 4 0V2a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2z"/><line x1="12" y1="14" x2="12" y2="18"/>' + c;
  if (k === "humidity")
    return o + '<path d="M12 2.7l5.6 5.6a7 7 0 1 1-11.2 0z"/>' + c;
  if (k === "area")
    return o + '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' + c;
  if (k === "height")
    return (
      o +
      '<line x1="7" y1="3" x2="7" y2="21"/><path d="M4 6l3-3 3 3M4 18l3 3 3-3"/><line x1="11" y1="5" x2="17" y2="5"/><line x1="11" y1="12" x2="17" y2="12"/><line x1="11" y1="19" x2="17" y2="19"/>' +
      c
    );
  if (k === "power")
    return (
      o +
      '<path d="M9 2v2M15 2v2M7 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"/><line x1="9" y1="15" x2="9" y2="22"/><line x1="15" y1="15" x2="15" y2="22"/>' +
      c
    );
  if (k === "ground")
    return o + '<path d="M2 20h20"/><path d="M6 20l4-4 4 4 4-4M10 8h4M9 4h6"/>' + c;
  if (k === "vent")
    return o + '<path d="M3 8h3M3 12h2M3 16h3"/><path d="M13 4l-3 3M13 20l-3-3"/><path d="M19 4l-3 3M19 20l-3-3"/>' + c;
  if (k === "network")
    return (
      o +
      '<path d="M5 12.5a7 7 0 0 1 14 0"/><path d="M8.5 9.3a3.5 3.5 0 0 1 7 0"/><path d="M2 8h.01M2 12h.01M2 16h.01M22 8h.01M22 12h.01M22 16h.01M12 2a9 9 0 0 0-9 9c0 1.7.4 3.2 1.1 4.5"/>' +
      c
    );
  if (k === "light")
    return o + '<circle cx="12" cy="12" r="4"/><path d="M12 2v1M12 21v1M2 12h1M21 12h1M4.6 4.6l.7.7M18.7 18.7l.7.7M4.6 19.4l.7-.7M18.7 5.3l.7-.7"/>' + c;
  if (k === "installRoom")
    return o + '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' + c;
  if (k === "installEng")
    return o + '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>' + c;
  if (k === "serviceTrain")
    return (
      o +
      '<path d="M2 3h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H3a1 1 0 0 1-1-1V3z"/><path d="M18 2h2v2h-2"/><path d="M10 2h8v3"/><path d="M6 19h2"/>' +
      c
    );
  if (k === "servicePilot")
    return o + '<circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 8"/>' + c;
  if (k === "serviceCare")
    return o + '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="12" x2="12" y2="15"/><line x1="15" y1="9" x2="12" y2="12"/>' + c;
  return o + '<circle cx="12" cy="12" r="2"/><path d="M7 12H5.5A6.5 6.5 0 0 1 5 3M12 2v.5M19 3a6.5 6.5 0 0 1 .5 9M19 19a6.5 6.5 0 0 1-7 0"/>' + c;
}

function nfPdpCollectSpecPairs(product) {
  const pairs = [];
  const seen = new Set();
  const push = (label, value, raw) => {
    const key = `${label}|${value}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push({ label: label || nfT("product.spec.param", "Параметр"), value, raw: raw || `${label}: ${value}` });
  };

  if (Array.isArray(product.specs)) {
    product.specs.forEach((s) => {
      const str = String(s || "").trim();
      if (!str) return;
      const { label, value } = nfPdpParseKV(str);
      if (label && value) push(label, value, str);
      else push("", str, str);
    });
  }

  const { roomList, engineerList } = nfProductRequirementLists(product);
  [...roomList, ...engineerList].forEach((line) => {
    const { label, value } = nfPdpParseKV(line);
    if (label && value) push(label, value, line);
    else if (value) push(nfT("product.spec.requirement", "Требование"), value, line);
  });

  return pairs;
}

function nfFillPdpHeroBadges(host, product) {
  if (!host) return;
  host.innerHTML = "";
  host.setAttribute("aria-label", "");
  host.hidden = true;
}

function nfPdpCollectHeroSpecPairs(product, category, partnerName, limit) {
  const max = Number.isFinite(limit) ? Math.max(1, limit) : 3;
  const rawSpecs = Array.isArray(product?.specs) ? product.specs : [];
  const source = rawSpecs.length
    ? rawSpecs
        .map((line) => {
          const str = String(line || "").trim();
          if (!str) return null;
          const { label, value } = nfPdpParseKV(str);
          if (label && value) return { label, value, raw: str };
          return { label: "", value: str, raw: str };
        })
        .filter(Boolean)
    : nfPdpCollectSpecPairs(product);
  const all = source.map((item) => {
    const slug = nfPdpSpecIconSlug(item.label || item.raw);
    return { ...item, slug };
  });
  const preferred = ["temp", "humidity", "area", "power"];
  const chosen = [];
  const used = new Set();

  preferred.forEach((slug) => {
    if (chosen.length >= max) return;
    const idx = all.findIndex((x, i) => !used.has(i) && x.slug === slug && String(x.value || "").trim());
    if (idx >= 0) {
      chosen.push(all[idx]);
      used.add(idx);
    }
  });

  for (let i = 0; i < all.length && chosen.length < max; i++) {
    if (used.has(i)) continue;
    const item = all[i];
    if (!String(item?.value || "").trim()) continue;
    chosen.push(item);
    used.add(i);
  }

  if (!chosen.length) {
    const fallback = [];
    // article removed
    if (partnerName) fallback.push({ label: nfT("product.quick.partner", "Партнёр"), value: partnerName });
    if (product.model) fallback.push({ label: nfT("product.quick.model", "Модель"), value: product.model });
    fallback.slice(0, max).forEach((item) => chosen.push({ ...item, raw: `${item.label}: ${item.value}`, slug: nfPdpSpecIconSlug(item.label) }));
  }
  return chosen.slice(0, max);
}

function nfFillPdpHeroSpecGrid(host, product, category, partnerName) {
  if (!host) return;
  host.innerHTML = "";
  host.hidden = false;
  host.className = "frm-spec-strip";

  // FORM inline spec strip — icon + value + label, separated by dots
  const warrantyVal = product.warrantyMonths
    ? `${product.warrantyMonths} мес.`
    : nfT("service.trust.warranty.default", "24 мес.");

  const items = [
    { slug: "serviceCare",  value: warrantyVal,                                           label: nfT("hero.trust.warranty",     "Гарантия") },
    { slug: "installEng",   value: nfT("hero.trust.installation.value", "Включён"),       label: nfT("hero.trust.installation", "Монтаж") },
    { slug: "default",      value: nfT("hero.trust.delivery.value",     "Казахстан + СНГ"), label: nfT("hero.trust.delivery",   "Поставка") },
  ];

  if (product.certification) {
    items.push({ slug: "default", value: String(product.certification), label: nfT("hero.trust.cert", "Сертификат") });
  }

  items.forEach(({ slug, value, label }, i) => {
    if (i > 0) {
      const sep = document.createElement("span");
      sep.className = "frm-spec-strip__sep";
      sep.setAttribute("aria-hidden", "true");
      host.appendChild(sep);
    }
    const item = document.createElement("span");
    item.className = "frm-spec-strip__item";

    const iconEl = document.createElement("span");
    iconEl.className = "frm-spec-strip__icon";
    iconEl.setAttribute("aria-hidden", "true");
    iconEl.innerHTML = nfPdpGetPdpStrokeIcon(slug || "default");

    const valueEl = document.createElement("strong");
    valueEl.className = "frm-spec-strip__value";
    valueEl.textContent = value;

    const labelEl = document.createElement("span");
    labelEl.className = "frm-spec-strip__label";
    labelEl.textContent = label;

    item.appendChild(iconEl);
    item.appendChild(valueEl);
    item.appendChild(labelEl);
    host.appendChild(item);
  });
}

function nfPdpPrimarySpecLabel(slug) {
  if (slug === "temp") return nfT("product.spec.primary.temp", "Температура");
  if (slug === "humidity") return nfT("product.spec.primary.humidity", "Влажность");
  if (slug === "area") return nfT("product.spec.primary.area", "Площадь");
  if (slug === "height") return nfT("product.spec.primary.height", "Высота потолков");
  return nfT("product.spec.param", "Параметр");
}

function nfPdpParseSpecLine(line, fallbackLabel) {
  const text = String(line || "").trim();
  if (!text) return null;
  const { label, value } = nfPdpParseKV(text);
  if (label && value) return { label: label.trim(), value: value.trim(), raw: text };
  return {
    label: String(fallbackLabel || "").trim(),
    value: text,
    raw: text,
  };
}

function nfPdpBuildSpecsLayout(product) {
  const { roomList, engineerList } = nfProductRequirementLists(product);
  const priority = ["temp", "humidity", "area", "height"];
  const engineeringSlugs = new Set(["power", "ground", "network", "vent"]);
  const roomSource = Array.isArray(roomList) ? roomList : [];
  const engineerSource = Array.isArray(engineerList) ? engineerList : [];
  const rawSpecs = Array.isArray(product?.specs) ? product.specs : [];

  const parsedRoom = roomSource
    .map((line) => nfPdpParseSpecLine(line, ""))
    .filter(Boolean);
  const parsedSpecs = rawSpecs
    .map((line) => nfPdpParseSpecLine(line, ""))
    .filter(Boolean);
  const parsedEngineer = engineerSource
    .map((line) => nfPdpParseSpecLine(line, ""))
    .filter(Boolean);

  const primaryMap = new Map();
  const primaryFallback = [];
  const primaryKeys = new Set();

  const pushPrimary = (item) => {
    if (!item?.value) return;
    const slug = nfPdpSpecIconSlug(item.label || item.raw || item.value);
    const normalizedLabel = String(item.label || "").trim() || nfPdpPrimarySpecLabel(slug);
    const value = String(item.value || "").trim();
    if (!value) return;
    const key = `${normalizedLabel}|${value}`.toLowerCase();
    if (primaryKeys.has(key)) return;

    const entry = {
      slug,
      label: normalizedLabel,
      value,
      raw: item.raw,
    };

    primaryKeys.add(key);
    if (priority.includes(slug) && !primaryMap.has(slug)) {
      primaryMap.set(slug, entry);
      return;
    }
    if (primaryFallback.length < 8) {
      primaryFallback.push(entry);
    }
  };

  // Room conditions + engineering are INSTALLATION REQUIREMENTS — they belong to
  // the Install section ("Помещение и условия" / "Инженерные коммуникации"), not
  // the product specs table. Build the specs table from real product specs only
  // to avoid duplicating the same params in two places.
  parsedSpecs.forEach((item) => {
    const slug = nfPdpSpecIconSlug(item.label || item.raw || item.value);
    if (engineeringSlugs.has(slug)) return;
    pushPrimary(item);
  });

  const primary = [];
  priority.forEach((slug) => {
    const item = primaryMap.get(slug);
    if (item) primary.push(item);
  });
  primaryFallback.forEach((item) => {
    if (primary.length < 8) primary.push(item);
  });

  const engineering = [];
  const engineeringKeys = new Set();
  const pushEngineering = (item) => {
    if (!item?.value) return;
    const slug = nfPdpSpecIconSlug(item.label || item.raw || item.value);
    if (!engineeringSlugs.has(slug)) return;
    const label = String(item.label || "").trim();
    const value = String(item.value || "").trim();
    const text = label ? `${label}: ${value}` : value;
    if (!text) return;
    const key = text.toLowerCase();
    if (engineeringKeys.has(key)) return;
    engineeringKeys.add(key);
    engineering.push({ slug, text });
  };

  // Engineering rows in the specs table come from real product specs only;
  // install engineering requirements stay in the Install section.
  parsedSpecs.forEach(pushEngineering);

  return {
    primary: primary.slice(0, 8),
    engineering: engineering.slice(0, 8),
  };
}

function nfFillPdpSpecsGrid(host, product) {
  if (!host) return false;
  host.innerHTML = "";
  const { primary, engineering } = nfPdpBuildSpecsLayout(product);

  if (!primary.length && !engineering.length) {
    host.appendChild(nfCreateElText(
      "p", "nf-pdp-specs-empty",
      nfT("product.info.pending", "Информация уточняется. Предоставим параметры по запросу.")
    ));
    return false;
  }

  /* ── Chapter mark ── */
  const mark = document.createElement("p");
  mark.className = "frm-chapter-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = "02 ·";
  host.appendChild(mark);

  /* ── Primary — FORM horizontal stat bar ── */
  if (primary.length) {
    const bar = document.createElement("div");
    bar.className = "frm-stat-bar";

    primary.slice(0, 5).forEach(({ slug, label: lbl, value }, i) => {
      if (i > 0) {
        const sep = document.createElement("div");
        sep.className = "frm-stat-sep";
        sep.setAttribute("aria-hidden", "true");
        bar.appendChild(sep);
      }
      const item = document.createElement("div");
      item.className = "frm-stat-item";

      const iconEl = document.createElement("span");
      iconEl.className = "frm-stat-item__icon";
      iconEl.setAttribute("aria-hidden", "true");
      iconEl.innerHTML = nfPdpGetPdpStrokeIcon(slug || "default");

      const valueEl = document.createElement("span");
      valueEl.className = "frm-stat-item__value";
      valueEl.textContent = String(value || "");

      const labelEl = document.createElement("span");
      labelEl.className = "frm-stat-item__label";
      labelEl.textContent = String(lbl || "");

      item.appendChild(iconEl);
      item.appendChild(valueEl);
      item.appendChild(labelEl);
      bar.appendChild(item);
    });

    host.appendChild(bar);
  }

  /* ── All specs — FORM clean striped table ── */
  const allRows = [
    ...primary.map(({ label, value }) => ({ label, value, slug: "" })),
    ...engineering.map(({ slug, text }) => {
      const parts = String(text || "").split(":");
      return parts.length > 1
        ? { label: parts[0].trim(), value: parts.slice(1).join(":").trim(), slug }
        : { label: "", value: String(text || ""), slug };
    }),
  ];

  if (allRows.length) {
    const sectionLabel = document.createElement("p");
    sectionLabel.className = "frm-specs-section-label";
    sectionLabel.textContent = nfT("product.specs.allTitle", "Все характеристики").toUpperCase();
    host.appendChild(sectionLabel);

    const tableWrap = document.createElement("div");
    tableWrap.className = "frm-spec-table";

    allRows.forEach(({ label, value }) => {
      const row = document.createElement("div");
      row.className = "frm-spec-row";

      const labelEl = document.createElement("span");
      labelEl.className = "frm-spec-row__label";
      labelEl.textContent = label;

      const dotsEl = document.createElement("span");
      dotsEl.className = "frm-spec-row__dots";
      dotsEl.setAttribute("aria-hidden", "true");

      const valueEl = document.createElement("span");
      valueEl.className = "frm-spec-row__value";
      valueEl.textContent = value;

      row.appendChild(labelEl);
      row.appendChild(dotsEl);
      row.appendChild(valueEl);
      tableWrap.appendChild(row);
    });

    host.appendChild(tableWrap);
  }

  return true;
}

function nfFillPdpDescriptionRich(descHost, calloutEl, product, category) {
  if (descHost) descHost.innerHTML = "";
  const raw = product.description && String(product.description).trim();

  if (calloutEl) {
    if (category?.name) {
      calloutEl.hidden = false;
      calloutEl.textContent = nfT(
        "product.desc.callout",
        "Подходит для задач направления «{category}».",
        { category: category.name }
      );
    } else {
      calloutEl.hidden = true;
    }
  }

  if (!raw || !descHost) return;

  const chunks = raw.split(/\n\s*\n+/).filter(Boolean);
  const paragraphs = chunks.length > 1 ? chunks : raw.split(/\n/).map((x) => x.trim()).filter(Boolean);

  paragraphs.forEach((chunk) => {
    const text = chunk.replace(/\s+/g, " ").trim();
    if (!text) return;
    const p = nfCreateEl("p", "nf-pdp-prose-p", "");
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    parts.forEach((part) => {
      const m = part.match(/^\*\*([^*]+)\*\*$/);
      if (m) {
        const strong = document.createElement("strong");
        strong.className = "nf-pdp-prose-strong";
        strong.textContent = m[1];
        p.appendChild(strong);
      } else if (part) {
        p.appendChild(document.createTextNode(part));
      }
    });
    descHost.appendChild(p);
  });
}

function nfFillPdpKitSection(host, product) {
  if (!host) return;
  host.innerHTML = "";
  const attrs = product.attributes;
  if (Array.isArray(attrs) && attrs.length) {
    const ul = nfCreateEl("ul", "nf-pdp-attr-chips");
    attrs.forEach((a) => {
      let text = "";
      if (typeof a === "string") text = a.trim();
      else if (a && typeof a === "object") {
        const label = a.label || a.name || "";
        const val = a.value != null ? String(a.value) : "";
        text = label && val ? `${label}: ${val}` : label || val || "";
      }
      if (text) ul.appendChild(nfCreateElText("li", "nf-pdp-attr-chip", text));
    });
    if (ul.childNodes.length) {
      host.appendChild(ul);
      host.hidden = false;
      return;
    }
  }
  host.hidden = true;
}

function nfFillPdpServiceCards(product) {
  const host = nfEl("productPageServiceCards");
  if (!host) return;
  host.innerHTML = "";
  host.className = "frm-service-grid";

  const steps = nfProductServiceSteps(product);
  const { maintenance: maintSteps } = nfSplitInstallMaintenanceSteps(steps);

  const capabilities = maintSteps.length
    ? maintSteps
    : [
        nfT("product.serviceCard.deliveryFallback", "Поставка и логистика"),
        nfT("product.serviceCard.installFallback",  "Монтаж и инсталляция"),
        nfT("product.serviceCard.launchFallback",   "Пуско-наладочные работы"),
        nfT("product.serviceCard.trainingFallback", "Обучение персонала"),
        nfT("product.serviceCard.warrantyFallback", "Гарантийное обслуживание"),
        nfT("product.serviceCard.careFallback",     "Постгарантийная поддержка"),
      ];

  // Derive each card's icon + description from the TITLE content rather than a
  // fixed positional array. Real maintenance steps arrive in arbitrary order
  // and count, so positional indexing drifted out of sync — e.g. an "Обучение
  // персонала" title was paired with the delivery description. Classify by
  // keyword so the description always matches the title it sits under.
  const classifyService = (titleRaw) => {
    const t = String(titleRaw || "").toLowerCase();
    if (/обуч|тренинг|training/.test(t))
      return { icon: "serviceTrain", desc: nfT("product.serviceCard.trainingDesc", "Очное и дистанционное обучение") };
    if (/доставк|логист|поставк|delivery|supply/.test(t))
      return { icon: "default", desc: nfT("product.serviceCard.deliveryDesc", "Доставка в любую точку Казахстана и СНГ") };
    if (/монтаж|инсталл|подключ|install|mount/.test(t))
      return { icon: "installEng", desc: nfT("product.serviceCard.installDesc", "Сертифицированные инженеры на объекте") };
    if (/пуско|наладк|ввод в экспл|запуск|commission|launch/.test(t))
      return { icon: "installRoom", desc: nfT("product.serviceCard.launchDesc", "Тестирование и ввод в эксплуатацию") };
    if (/тест|испытан|пробн|trial|test/.test(t))
      return { icon: "default", desc: nfT("product.serviceCard.testDesc", "Проверка и тестовая эксплуатация оборудования") };
    if (/постгаран|внегаран/.test(t))
      return { icon: "serviceCare", desc: nfT("product.serviceCard.careDesc", "Техподдержка после завершения гарантии") };
    if (/гарантийн|гарантия/.test(t))
      return { icon: "serviceCare", desc: nfT("product.serviceCard.warrantyDesc", "Полное покрытие в течение гарантийного срока") };
    if (/поддержк|сопровожд|обслуж|сервис|care|support|maintenance/.test(t))
      return { icon: "serviceCare", desc: nfT("product.serviceCard.supportDesc", "Плановое техническое обслуживание и поддержка") };
    return { icon: "default", desc: "" };
  };

  capabilities.forEach((text) => {
    const item = document.createElement("div");
    item.className = "frm-service-item";

    const meta = classifyService(text);

    const iconEl = document.createElement("span");
    iconEl.className = "frm-service-item__icon";
    iconEl.setAttribute("aria-hidden", "true");
    iconEl.innerHTML = nfPdpGetPdpStrokeIcon(meta.icon);

    const titleEl = document.createElement("strong");
    titleEl.className = "frm-service-item__title";
    titleEl.textContent = String(text);

    item.appendChild(iconEl);
    item.appendChild(titleEl);

    if (meta.desc) {
      const descEl = document.createElement("p");
      descEl.className = "frm-service-item__desc";
      descEl.textContent = meta.desc;
      item.appendChild(descEl);
    }

    host.appendChild(item);
  });
}

function nfFillPdpServiceTrust(product) {
  const host = nfEl("productPageServiceTrust");
  if (!host) return;
  host.innerHTML = "";
  host.className = "frm-trust-bar";

  const warrantyVal = product.warrantyMonths
    ? `${product.warrantyMonths} мес.`
    : nfT("service.trust.warranty.default", "24 мес.");

  const items = [
    { value: warrantyVal, label: nfT("service.trust.warranty.label",  "Гарантия") },
    { value: "Включён",   label: nfT("service.trust.install.label",   "Монтаж") },
    { value: "Включено",  label: nfT("service.trust.training.label",  "Обучение") },
    { value: "6 мес.",    label: nfT("service.trust.support.label",   "Поддержка после запуска") },
  ];

  items.forEach(({ value, label }, i) => {
    if (i > 0) {
      const sep = document.createElement("span");
      sep.className = "frm-trust-bar__sep";
      sep.setAttribute("aria-hidden", "true");
      host.appendChild(sep);
    }
    const item = document.createElement("div");
    item.className = "frm-trust-bar__item";

    const valueEl = document.createElement("strong");
    valueEl.className = "frm-trust-bar__value";
    valueEl.textContent = value;

    const labelEl = document.createElement("span");
    labelEl.className = "frm-trust-bar__label";
    labelEl.textContent = label;

    item.appendChild(valueEl);
    item.appendChild(labelEl);
    host.appendChild(item);
  });
}

function nfFillPdpUseCases(host, product, category) {
  if (!host) return;
  host.innerHTML = "";
  const useCases = Array.isArray(product.useCases) ? product.useCases : [];
  if (!useCases.length) return;
  useCases.forEach((uc, i) => {
    const item = document.createElement("div");
    item.className = "nf-pdp-usecase-item";
    item.setAttribute("role", "listitem");
    const num = document.createElement("span");
    num.className = "nf-pdp-usecase-num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = String(i + 1).padStart(2, "0");
    const content = document.createElement("div");
    content.className = "nf-pdp-usecase-content";
    const title = document.createElement("h3");
    title.className = "nf-pdp-usecase-title";
    title.textContent = String(uc.title || "");
    content.appendChild(title);
    if (uc.description) {
      const text = document.createElement("p");
      text.className = "nf-pdp-usecase-text";
      text.textContent = String(uc.description);
      content.appendChild(text);
    }
    item.appendChild(num);
    item.appendChild(content);
    host.appendChild(item);
  });
}

function nfPdpInjectInstallEnvHeaderIcon(ulEl, kind) {
  if (!ulEl) return;
  const card = ulEl.closest(".nf-pdp-install-env-card");
  const h = card && card.querySelector(".nf-pdp-install-env-h");
  if (!h || h.querySelector(".nf-pdp-install-env-h-icon")) return;
  const wrap = document.createElement("span");
  wrap.className = "nf-pdp-install-env-h-icon";
  wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = nfPdpGetPdpStrokeIcon(kind);
  h.insertBefore(wrap, h.firstChild);
}

function nfPdpAppendInstallFeatureLine(ul, line) {
  const text = String(line || "").trim();
  if (!text) return;
  const { label } = nfPdpParseKV(text);
  const li = document.createElement("li");
  li.className = "nf-pdp-install-feature";
  const slug = label ? nfPdpSpecIconSlug(label) : nfPdpInstallLineIconSlug(text);
  const mark = document.createElement("span");
  mark.className = "nf-pdp-install-feature__mark";
  mark.setAttribute("aria-hidden", "true");
  mark.innerHTML = nfPdpGetPdpStrokeIcon(slug);
  const body = document.createElement("span");
  body.className = "nf-pdp-install-feature__text";
  body.textContent = text;
  li.appendChild(mark);
  li.appendChild(body);
  ul.appendChild(li);
}

function nfFillPdpInstallSection(product) {
  const roomUl      = nfEl("productPageInstallRoom");
  const engineerUl  = nfEl("productPageInstallEngineer");
  const phasesTrack = nfEl("productPagePhasesTrack");
  const phaseDetail = nfEl("productPagePhaseDetail");
  if (!roomUl || !engineerUl) return;

  const { roomList, engineerList } = nfProductRequirementLists(product);
  const { install: installSteps }  = nfSplitInstallMaintenanceSteps(nfProductServiceSteps(product));

  nfPdpInjectInstallEnvHeaderIcon(roomUl,     "installRoom");
  nfPdpInjectInstallEnvHeaderIcon(engineerUl, "installEng");
  roomUl.innerHTML     = "";
  engineerUl.innerHTML = "";
  roomList.forEach((item)     => nfPdpAppendInstallFeatureLine(roomUl,     item));
  engineerList.forEach((item) => nfPdpAppendInstallFeatureLine(engineerUl, item));

  if (!phasesTrack) return;
  phasesTrack.innerHTML = "";
  if (phaseDetail) phaseDetail.hidden = true;

  if (!installSteps.length) return;

  /* ── FORM — clean numbered installation steps ── */
  phasesTrack.className = "frm-install-steps";
  phasesTrack.removeAttribute("role");
  phasesTrack.style.removeProperty("--sm-phase-count");

  installSteps.forEach((s, i) => {
    const step = document.createElement("div");
    step.className = "frm-install-step";

    /* Large background step number — decorative art */
    const numBg = document.createElement("span");
    numBg.className = "frm-install-step__num-bg";
    numBg.setAttribute("aria-hidden", "true");
    numBg.textContent = String(i + 1).padStart(2, "0");

    const content = document.createElement("div");
    content.className = "frm-install-step__content";

    const numLabel = document.createElement("span");
    numLabel.className = "frm-install-step__num-label";
    numLabel.textContent = `ШАГ ${String(i + 1).padStart(2, "0")}`;

    const titleEl = document.createElement("p");
    titleEl.className = "frm-install-step__title";
    titleEl.textContent = String(s);

    content.appendChild(numLabel);
    content.appendChild(titleEl);
    step.appendChild(numBg);
    step.appendChild(content);

    /* Dashed connector between steps */
    if (i < installSteps.length - 1) {
      const connector = document.createElement("div");
      connector.className = "frm-install-step__connector";
      connector.setAttribute("aria-hidden", "true");
      step.appendChild(connector);
    }

    phasesTrack.appendChild(step);
  });
}

function nfFillPdpMaintenanceSection(product) {
  nfFillPdpServiceCards(product);
  nfFillPdpServiceTrust(product);
}

/* ── APEX portrait related product card ─────────────────────────────── */
function nfCreateRelatedProductCard(p) {
  const cat         = NF_DATA.categories.find((c) => c.id === p.categoryId);
  const partnerName = nfGetPartnerName(p.partnerId);
  const accent      = (typeof NF_CAT_ACCENTS !== "undefined" && NF_CAT_ACCENTS[p.categoryId]) || "#00b4c8";

  const card = document.createElement("article");
  card.className = "apex-rel-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", p.name);
  card.dataset.productId = p.id;
  card.style.setProperty("--apex-accent", accent);

  /* ── Image area (top) ── */
  const imgWrap     = document.createElement("div");
  imgWrap.className = "apex-rel-card__img";

  const img     = document.createElement("img");
  img.alt       = p.name;
  const imgs    = nfGetProductImages(p);
  img.src       = (imgs[0] || "").trim() ? imgs[0] : nfProductPlaceholderSvg();
  nfConfigureImageElement(img, { loading: "lazy", decoding: "async", fetchPriority: "low" });
  img.onerror   = () => { img.src = nfProductPlaceholderSvg(); };
  imgWrap.appendChild(img);

  /* ── Body (below image) ── */
  const body      = document.createElement("div");
  body.className  = "apex-rel-card__body";

  /* Eyebrow — category name */
  if (cat) {
    const eyebrow       = document.createElement("p");
    eyebrow.className   = "apex-rel-card__eyebrow";
    eyebrow.textContent = cat.name;
    body.appendChild(eyebrow);
  }

  /* Product name */
  const name        = document.createElement("h3");
  name.className    = "apex-rel-card__name";
  name.textContent  = p.name;
  body.appendChild(name);

  /* Partner / brand */
  if (partnerName) {
    const meta        = document.createElement("p");
    meta.className    = "apex-rel-card__meta";
    meta.textContent  = partnerName;
    body.appendChild(meta);
  }

  /* Price */
  if (p.price != null) {
    const priceEl       = document.createElement("p");
    priceEl.className   = "apex-rel-card__price";
    priceEl.textContent = nfFormatPrice(p.price);
    body.appendChild(priceEl);
  }

  /* CTA link */
  const cta     = document.createElement("span");
  cta.className = "apex-rel-card__cta";
  cta.setAttribute("aria-hidden", "true");
  cta.innerHTML =
    `${nfEscapeHtml(nfT("common.details", "Подробнее"))} ` +
    `<svg viewBox="0 0 16 16" fill="none" width="11" height="11" aria-hidden="true">` +
      `<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`;
  body.appendChild(cta);

  card.appendChild(imgWrap);
  card.appendChild(body);

  card.addEventListener("click", () => nfOpenProductPage(p.id));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") nfOpenProductPage(p.id);
  });
  return card;
}

function nfFillPdpRelated(product) {
  const section = nfEl("pdp-related");
  if (!section) return;

  const allProducts = NF_DATA.products || [];
  const allCategories = NF_DATA.categories || [];
  const allPartners = NF_DATA.partners || [];

  /* ── Tab 1: similar products ── */
  let candidates = [];
  if (Array.isArray(product.relatedProductIds) && product.relatedProductIds.length) {
    candidates = product.relatedProductIds
      .map((id) => allProducts.find((p) => p.id === String(id)))
      .filter(Boolean);
  }
  if (candidates.length < 3) {
    const sameCat = allProducts.filter(
      (p) => p.id !== product.id && p.categoryId === product.categoryId && !candidates.some((c) => c.id === p.id)
    );
    candidates = candidates.concat(sameCat).slice(0, 8);
  }
  if (candidates.length < 2) {
    const popular = allProducts.filter(
      (p) => p.id !== product.id && p.popular && !candidates.some((c) => c.id === p.id)
    );
    candidates = candidates.concat(popular).slice(0, 8);
  }

  /* ── Tab 2: partners ── */
  const partnerIds = new Set();
  if (product.partnerId) partnerIds.add(product.partnerId);
  allProducts
    .filter((p) => p.categoryId === product.categoryId && p.partnerId)
    .forEach((p) => partnerIds.add(p.partnerId));
  const relatedPartners = [...partnerIds]
    .map((pid) => allPartners.find((p) => p.id === pid))
    .filter(Boolean)
    .slice(0, 6);

  /* ── Tab 3: related categories ── */
  const catIds = new Set();
  catIds.add(product.categoryId);
  allProducts
    .filter((p) => p.partnerId === product.partnerId && p.categoryId)
    .forEach((p) => catIds.add(p.categoryId));
  const relatedCategories = [...catIds]
    .map((cid) => allCategories.find((c) => c.id === cid))
    .filter(Boolean)
    .slice(0, 6);

  /* If there's nothing at all, hide section */
  if (!candidates.length && !relatedPartners.length && !relatedCategories.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  /* ── Build tab bar ── */
  const tabBar = nfEl("pdpRelatedTabs");
  if (tabBar) tabBar.innerHTML = "";

  const tabs = [];
  if (candidates.length) tabs.push({ id: "Products", label: nfT("related.tab.products", "Похожие решения"), panelId: "pdpRelatedPanelProducts" });
  if (relatedPartners.length) tabs.push({ id: "Partners", label: nfT("related.tab.partners", "Партнёры"), panelId: "pdpRelatedPanelPartners" });
  if (relatedCategories.length) tabs.push({ id: "Categories", label: nfT("related.tab.categories", "Категории"), panelId: "pdpRelatedPanelCategories" });

  /* Hide all panels first */
  ["pdpRelatedPanelProducts", "pdpRelatedPanelPartners", "pdpRelatedPanelCategories"].forEach((id) => {
    const el = nfEl(id);
    if (el) el.hidden = true;
  });

  const activateTab = (activeIdx) => {
    if (!tabBar) return;
    tabBar.querySelectorAll(".nf-pdp-related-tab").forEach((btn, i) => {
      const isActive = i === activeIdx;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    tabs.forEach((t, i) => {
      const panel = nfEl(t.panelId);
      if (panel) panel.hidden = i !== activeIdx;
    });
  };

  tabs.forEach((t, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nf-pdp-related-tab" + (i === 0 ? " is-active" : "");
    btn.id = `pdpRelatedTab${t.id}`;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(i === 0));
    btn.setAttribute("aria-controls", t.panelId);
    btn.textContent = t.label;
    btn.addEventListener("click", () => activateTab(i));
    if (tabBar) tabBar.appendChild(btn);
  });

  /* ── Populate Tab 1: products carousel ── */
  const track = nfEl("productPageRelatedGrid");
  const prevBtn = nfEl("pdpRelatedPrev");
  const nextBtn = nfEl("pdpRelatedNext");
  if (track && candidates.length) {
    track.innerHTML = "";
    candidates.forEach((p) => track.appendChild(nfCreateRelatedProductCard(p)));
    const viewport = track.closest(".nf-pdp-related-viewport");
    if (viewport && prevBtn && nextBtn) {
      const updateNav = () => {
        const atStart = viewport.scrollLeft <= 8;
        const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
        prevBtn.hidden = atStart;
        nextBtn.hidden = atEnd || viewport.scrollWidth <= viewport.clientWidth + 8;
      };
      prevBtn.onclick = () => viewport.scrollBy({ left: -Math.round(viewport.clientWidth * 0.75), behavior: "smooth" });
      nextBtn.onclick = () => viewport.scrollBy({ left: Math.round(viewport.clientWidth * 0.75), behavior: "smooth" });
      viewport.addEventListener("scroll", updateNav, { passive: true });
      requestAnimationFrame(updateNav);
    }
  }

  /* ── Populate Tab 2: partner cards ── */
  const partnersGrid = nfEl("productPageRelatedPartners");
  if (partnersGrid && relatedPartners.length) {
    partnersGrid.innerHTML = "";
    relatedPartners.forEach((partner) => {
      const prodCount = allProducts.filter((p) => p.partnerId === partner.id).length;
      const card = document.createElement("div");
      card.className = "nf-pdp-related-partner-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      if (partner.logo) {
        const logo = document.createElement("img");
        logo.className = "nf-pdp-related-partner-card__logo";
        logo.src = partner.logo;
        logo.alt = partner.name || "";
        logo.onerror = () => logo.remove();
        card.appendChild(logo);
      }
      const nameEl = document.createElement("p");
      nameEl.className = "nf-pdp-related-partner-card__name";
      nameEl.textContent = partner.name || "";
      card.appendChild(nameEl);
      if (prodCount) {
        const countEl = document.createElement("p");
        countEl.className = "nf-pdp-related-partner-card__count";
        countEl.textContent = `${prodCount} ${nfT("related.products", "товаров")}`;
        card.appendChild(countEl);
      }
      const linkEl = document.createElement("span");
      linkEl.className = "nf-pdp-related-partner-card__link";
      linkEl.textContent = nfT("common.view", "Смотреть →");
      card.appendChild(linkEl);
      const slug = nfPartnerSlug ? nfPartnerSlug(partner) : (partner.slug || partner.id);
      card.addEventListener("click", () => { if (slug) nfGoPath(nfPartnerOpenUrlBySlug(slug)); });
      card.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && slug) nfGoPath(nfPartnerOpenUrlBySlug(slug)); });
      partnersGrid.appendChild(card);
    });
  }

  /* ── Populate Tab 3: category rows ── */
  const catList = nfEl("productPageRelatedCategories");
  if (catList && relatedCategories.length) {
    catList.innerHTML = "";
    relatedCategories.forEach((cat) => {
      const prodCount = allProducts.filter((p) => p.categoryId === cat.id).length;
      const row = document.createElement("div");
      row.className = "nf-pdp-related-cat-row";
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");
      const nameEl = document.createElement("span");
      nameEl.className = "nf-pdp-related-cat-row__name";
      nameEl.textContent = cat.name || "";
      row.appendChild(nameEl);
      if (prodCount) {
        const countEl = document.createElement("span");
        countEl.className = "nf-pdp-related-cat-row__count";
        countEl.textContent = `${prodCount}`;
        row.appendChild(countEl);
      }
      const arrow = document.createElement("span");
      arrow.className = "nf-pdp-related-cat-row__arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      row.appendChild(arrow);
      const catSlug = nfCategoryPermalinkSlug ? nfCategoryPermalinkSlug(cat) : cat.id;
      row.addEventListener("click", () => nfGoPath(`/categories/${catSlug}`));
      row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") nfGoPath(`/categories/${catSlug}`); });
      catList.appendChild(row);
    });
  }

  /* ── Show first available panel ── */
  activateTab(0);
}

function nfPdpMountRevealScroll(pageRoot) {
  if (!pageRoot || typeof IntersectionObserver === "undefined") return () => {};
  const els = pageRoot.querySelectorAll("[data-pdp-reveal-scroll]");
  if (!els.length) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("nf-pdp-reveal--in");
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
  return () => {
    io.disconnect();
    els.forEach((el) => el.classList.remove("nf-pdp-reveal--in"));
  };
}

function nfPdpMountSmoothAnchors(pageRoot) {
  const nav = pageRoot.querySelector(".nf-pdp-subnav");
  if (!nav) return () => {};
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !nav.contains(a)) return;
    const id = (a.getAttribute("href") || "").replace(/^#/, "");
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: nfPrefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };
  nav.addEventListener("click", onClick);
  return () => nav.removeEventListener("click", onClick);
}

function nfDisposePdpPageEnhancements(pageRoot) {
  if (!pageRoot || typeof pageRoot !== "object") return;
  if (typeof pageRoot._nfPdpCleanup === "function") {
    try {
      pageRoot._nfPdpCleanup();
    } catch (_e) {}
    pageRoot._nfPdpCleanup = null;
  }
}

function nfPdpSyncSubnav(pageRoot) {
  const pairs = [
    ["description", "pdp-description"],
    ["specs", "pdp-specs"],
    ["install", "pdp-install"],
    ["service", "pdp-service"],
  ];
  pairs.forEach(([key, id]) => {
    const sec = document.getElementById(id);
    const link = pageRoot.querySelector(`[data-pdp-section-link="${key}"]`);
    if (!link || !sec) return;
    link.hidden = sec.hasAttribute("hidden");
  });
}

function nfPdpMountScrollSpy(pageRoot) {
  const nav = pageRoot.querySelector(".nf-pdp-subnav");
  if (!nav || typeof IntersectionObserver === "undefined") return () => {};

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const toObserve = [];
  links.forEach((a) => {
    const id = (a.getAttribute("href") || "").replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el && !el.hidden && !a.hidden) toObserve.push(el);
  });

  const clearActive = () => links.forEach((l) => l.classList.remove("nf-pdp-subnav-link--active"));

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
      if (!visible?.target?.id) return;
      clearActive();
      const activeLink = nav.querySelector(`a[href="#${visible.target.id}"]`);
      if (activeLink) activeLink.classList.add("nf-pdp-subnav-link--active");
    },
    { root: null, rootMargin: "-12% 0px -62% 0px", threshold: [0, 0.08, 0.25] }
  );

  toObserve.forEach((el) => observer.observe(el));

  const firstNav = links.find((l) => !l.hidden);
  if (firstNav) firstNav.classList.add("nf-pdp-subnav-link--active");

  return () => {
    observer.disconnect();
    clearActive();
  };
}

function nfFillProductInstallMaintenancePanels(installEl, maintEl, product) {
  if (!installEl || !maintEl) return;

  const { roomList, engineerList } = nfProductRequirementLists(product);
  const { install: installSteps, maintenance: maintSteps } = nfSplitInstallMaintenanceSteps(
    nfProductServiceSteps(product)
  );

  installEl.innerHTML = "";
  maintEl.innerHTML = "";

  const note = nfCreateEl("div", "nf-install-note");
  const rows = nfCreateEl("div", "nf-install-note-rows");

  const roomCol = nfCreateEl("div", "", "");
  roomCol.appendChild(nfCreateEl("h4", "", nfT("product.install.roomConditions", "Помещение и условия")));
  const roomUl = nfCreateEl("ul", "", "");
  roomList.forEach((item) => roomUl.appendChild(nfCreateElText("li", "", item)));
  roomCol.appendChild(roomUl);

  const engineerCol = nfCreateEl("div", "", "");
  engineerCol.appendChild(nfCreateEl("h4", "", nfT("product.install.engineering", "Инженерные коммуникации")));
  const engineerUl = nfCreateEl("ul", "", "");
  engineerList.forEach((item) => engineerUl.appendChild(nfCreateElText("li", "", item)));
  engineerCol.appendChild(engineerUl);

  rows.appendChild(roomCol);
  rows.appendChild(engineerCol);
  note.appendChild(rows);
  installEl.appendChild(note);

  const titleSteps = nfCreateEl("div", "nf-tab-section-title", nfT("product.install.stepsTitle", "Этапы установки и ввода"));
  const ol = nfCreateEl("ol", "nf-install-steps");
  installSteps.forEach((s) => ol.appendChild(nfCreateElText("li", "", s)));
  installEl.appendChild(titleSteps);
  installEl.appendChild(ol);

  if (maintSteps.length) {
    const om = nfCreateEl("ol", "nf-install-steps nf-install-steps--maintenance");
    maintSteps.forEach((s) => om.appendChild(nfCreateElText("li", "", s)));
    maintEl.appendChild(om);
  } else {
    maintEl.appendChild(
      nfCreateEl(
        "p",
        "nf-product-page-maint-fallback",
        nfT("product.maintenanceFallback", "Регулярное сервисное сопровождение, калибровка и консультации доступны по договору. Формат поддержки согласуется при поставке.")
      )
    );
  }
}

const NF_IMAGE_ZOOM_DISPOSE = {
  pdp: null,
  modal: null,
  lightbox: null,
};

/** Сила hover-zoom в модалке товара и полноэкранном lightbox (на PDP остаётся 1.38). */
const NF_MODAL_LIGHTBOX_ZOOM_SCALE = 2.28;

/** Верхний предел масштаба при прокрутке колёсика (модалка / lightbox). */
const NF_MODAL_LIGHTBOX_WHEEL_MAX_SCALE = 4.25;

function nfDisposeImageZoomPan(key) {
  const k = key || "pdp";
  if (NF_IMAGE_ZOOM_DISPOSE[k]) {
    NF_IMAGE_ZOOM_DISPOSE[k]();
    NF_IMAGE_ZOOM_DISPOSE[k] = null;
  }
}

/**
 * Десктоп: hover-zoom + pan по курсору внутри viewport (карточка товара, модалка, lightbox).
 * opts.disposeKey: 'pdp' | 'modal' | 'lightbox'
 * opts.wheelZoom: колесо мыши — плавный zoom к точке под курсором (модалка / lightbox).
 */
function nfAttachImageZoomPan(opts) {
  const viewport = opts.viewport;
  const img = opts.img;
  const isAllowed = opts.isAllowed || (() => true);
  const ZOOM = opts.scale || 1.38;
  const disposeKey = opts.disposeKey || "pdp";
  const wheelZoom = !!opts.wheelZoom;
  const maxWheelScale =
    opts.maxScale != null ? opts.maxScale : wheelZoom ? NF_MODAL_LIGHTBOX_WHEEL_MAX_SCALE : ZOOM;

  nfDisposeImageZoomPan(disposeKey);

  if (!viewport || !img) return () => {};

  const canHoverZoom = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches && !nfPrefersReducedMotion();

  if (!canHoverZoom()) {
    img.style.transform = "";
    return () => {};
  }

  let hover = false;
  let panMaxX = 0;
  let panMaxY = 0;
  let ttx = 0;
  let tty = 0;
  let px = 0;
  let py = 0;
  let sc = 1;
  let raf = null;
  let lastCX = 0;
  let lastCY = 0;
  /** Целевой масштаб при hover (для wheelZoom меняется колесом; старт = ZOOM при входе). */
  let desiredSc = ZOOM;

  const recomputeBounds = () => {
    if (!img.offsetWidth || !img.offsetHeight) return;
    const cw = viewport.clientWidth;
    const ch = viewport.clientHeight;
    const iw = img.offsetWidth;
    const ih = img.offsetHeight;
    if (wheelZoom) {
      const sForBounds = Math.max(desiredSc, sc);
      panMaxX = Math.max(0, (iw * sForBounds - cw) / 2);
      panMaxY = Math.max(0, (ih * sForBounds - ch) / 2);
    } else {
      panMaxX = Math.max(0, (iw * ZOOM - cw) / 2);
      panMaxY = Math.max(0, (ih * ZOOM - ch) / 2);
    }
  };

  const clampPanToBounds = () => {
    recomputeBounds();
    px = Math.max(-panMaxX, Math.min(panMaxX, px));
    py = Math.max(-panMaxY, Math.min(panMaxY, py));
    ttx = Math.max(-panMaxX, Math.min(panMaxX, ttx));
    tty = Math.max(-panMaxY, Math.min(panMaxY, tty));
  };

  const updateTargetsFromClient = (clientX, clientY) => {
    const r = viewport.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    lastCX = clientX;
    lastCY = clientY;
    const mx = ((clientX - r.left) / r.width) * 2 - 1;
    const my = ((clientY - r.top) / r.height) * 2 - 1;
    ttx = -mx * panMaxX;
    tty = -my * panMaxY;
  };

  const tick = () => {
    const kPan = hover ? 0.2 : 0.22;
    const kSc = wheelZoom ? 0.14 : 0.16;
    px += (ttx - px) * kPan;
    py += (tty - py) * kPan;
    const targetSc = hover && isAllowed() ? (wheelZoom ? desiredSc : ZOOM) : 1;
    sc += (targetSc - sc) * kSc;
    const inv = sc > 0.08 ? sc : 1;
    img.style.transform = `scale(${sc}) translate(${px / inv}px, ${py / inv}px)`;

    const panSettled = Math.abs(ttx - px) < 0.4 && Math.abs(tty - py) < 0.4;
    const scSettled = Math.abs(targetSc - sc) < 0.006;
    if (!hover && panSettled && scSettled && Math.abs(sc - 1) < 0.008) {
      px = py = ttx = tty = 0;
      sc = 1;
      desiredSc = ZOOM;
      img.style.transform = "";
      viewport.classList.remove("nf-pdp-zoom-viewport--active");
      img.classList.remove("nf-pdp-media-img--zooming");
      raf = null;
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  const ensureLoop = () => {
    if (raf == null) raf = requestAnimationFrame(tick);
  };

  const onEnter = (e) => {
    if (!isAllowed() || !canHoverZoom()) return;
    if (wheelZoom) desiredSc = ZOOM;
    recomputeBounds();
    hover = true;
    viewport.classList.add("nf-pdp-zoom-viewport--active");
    img.classList.add("nf-pdp-media-img--zooming");
    updateTargetsFromClient(e.clientX, e.clientY);
    ensureLoop();
  };

  const onMove = (e) => {
    if (!hover || !isAllowed()) return;
    recomputeBounds();
    updateTargetsFromClient(e.clientX, e.clientY);
    ensureLoop();
  };

  const onLeave = () => {
    hover = false;
    ttx = 0;
    tty = 0;
    if (wheelZoom) desiredSc = ZOOM;
    ensureLoop();
  };

  const onWheel = (e) => {
    if (!wheelZoom || !hover || !isAllowed() || !canHoverZoom()) return;
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    e.stopPropagation();
    let d = e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    if (e.deltaMode === 2) d *= Math.min(400, Math.max(120, viewport.clientHeight * 0.2));
    const prevD = desiredSc;
    const step = Math.exp(-d * 0.00032);
    desiredSc = Math.min(Math.max(prevD * step, 1), maxWheelScale);
    const ratio = desiredSc / prevD;
    if (Math.abs(ratio - 1) > 1e-6) {
      const r = viewport.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const cx = r.width * 0.5;
      const cy = r.height * 0.5;
      const ax = mx - cx;
      const ay = my - cy;
      px = ax + (px - ax) * ratio;
      py = ay + (py - ay) * ratio;
      ttx = px;
      tty = py;
      clampPanToBounds();
    } else {
      recomputeBounds();
    }
    ensureLoop();
  };

  const onImgLoad = () => {
    recomputeBounds();
    if (hover && isAllowed()) {
      updateTargetsFromClient(lastCX, lastCY);
      ensureLoop();
    } else {
      px = py = ttx = tty = 0;
      sc = 1;
      if (wheelZoom) desiredSc = ZOOM;
      img.style.transform = "";
    }
  };

  viewport.addEventListener("mouseenter", onEnter);
  viewport.addEventListener("mousemove", onMove);
  viewport.addEventListener("mouseleave", onLeave);
  if (wheelZoom) viewport.addEventListener("wheel", onWheel, { passive: false });
  img.addEventListener("load", onImgLoad);
  window.addEventListener("resize", recomputeBounds);

  let ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      recomputeBounds();
      if (hover && isAllowed()) updateTargetsFromClient(lastCX, lastCY);
    });
    ro.observe(viewport);
  }

  const dispose = () => {
    if (raf != null) cancelAnimationFrame(raf);
    raf = null;
    viewport.removeEventListener("mouseenter", onEnter);
    viewport.removeEventListener("mousemove", onMove);
    viewport.removeEventListener("mouseleave", onLeave);
    if (wheelZoom) viewport.removeEventListener("wheel", onWheel);
    img.removeEventListener("load", onImgLoad);
    window.removeEventListener("resize", recomputeBounds);
    if (ro) ro.disconnect();
    img.style.transform = "";
    img.classList.remove("nf-pdp-media-img--zooming");
    viewport.classList.remove("nf-pdp-zoom-viewport--active");
    NF_IMAGE_ZOOM_DISPOSE[disposeKey] = null;
  };

  NF_IMAGE_ZOOM_DISPOSE[disposeKey] = dispose;
  return dispose;
}

function nfAttachPdpImageZoom(opts) {
  return nfAttachImageZoomPan({ ...opts, disposeKey: "pdp" });
}

/* ====== МОДАЛКА ТОВАРА ====== */
function nfOpenProductModal(productId) {
  const p = NF_DATA.products.find((x) => x.id === productId);
  if (!p) return;

  nfDisposeImageZoomPan("modal");

  NF_STATE.productModalProductId = productId;

  const modal = nfEl("productModal");
  const backdrop = nfEl("productModalBackdrop");
  if (!modal || !backdrop) return;

  nfSafeText("productModalTitle", p.name);
  nfSafeText("productModalShortDesc", p.shortDesc || nfT("product.defaultShortDesc", "Профессиональное медицинское оборудование."));
  nfSafeText("productModalArticle", "");
  nfSafeText("productModalPartner", nfT("product.partner", "Партнёр: {value}", { value: nfGetPartnerName(p.partnerId) }));
  nfSafeText("productModalModel", nfT("product.model", "Модель: {value}", { value: p.model || "" }));

  const img = nfEl("productModalImage");
  if (img) {
    img.alt = p.name;
    nfConfigureImageElement(img, {
      loading: "lazy",
      decoding: "async",
      fetchPriority: "low",
      width: 800,
      height: 600,
    });
    const imgs = nfGetProductImages(p);
    if (imgs.length && String(imgs[0]).trim()) {
      img.src = imgs[0];
      img.onerror = () => { img.src = nfProductPlaceholderSvg(); };
    } else {
      img.src = nfProductPlaceholderSvg();
      img.onerror = null;
    }
  }

  const thumbs = nfEl("productModalThumbnails");
  if (thumbs) {
    thumbs.innerHTML = "";
    const imgs = nfGetProductImages(p);
    imgs.slice(0, 4).forEach((src, idx) => {
      const t = nfCreateEl("div", "nf-modal-thumb" + (idx === 0 ? " nf-modal-thumb-active" : ""));
      const ti = document.createElement("img");
      ti.src = src;
      ti.alt = p.name;
      nfConfigureImageElement(ti, {
        loading: "lazy",
        decoding: "async",
        fetchPriority: "low",
        width: 80,
        height: 80,
      });
      t.appendChild(ti);
      t.addEventListener("click", () => {
        thumbs.querySelectorAll(".nf-modal-thumb").forEach((el) => el.classList.remove("nf-modal-thumb-active"));
        t.classList.add("nf-modal-thumb-active");
        if (img) img.src = src || nfProductPlaceholderSvg();
      });
      thumbs.appendChild(t);
    });
  }

  const qtyInput = nfEl("productModalQty");
  if (qtyInput) qtyInput.value = 1;

  const priceEl = nfEl("productModalPrice");
  const totalEl = nfEl("productModalTotal");
  const primaryBtn = nfEl("productModalPrimaryBtn");

  if (p.price != null) {
    if (priceEl) priceEl.textContent = nfT("product.unitPrice", "Цена за единицу: {value}", { value: nfFormatPrice(p.price) });
    if (totalEl && qtyInput) totalEl.textContent = nfT("product.total", "Итого: {value}", { value: nfFormatPrice(p.price * Number(qtyInput.value)) });
    if (primaryBtn) nfInitAddToRequestControl(primaryBtn, p.id, nfT("common.addToRequest", "Добавить в запрос"), {});
  } else {
    if (priceEl) priceEl.textContent = nfT("product.priceIndividual", "Цена рассчитывается индивидуально");
    if (totalEl) totalEl.textContent = "";
    if (primaryBtn) {
      primaryBtn.removeAttribute("data-nf-add-product");
      primaryBtn.classList.remove(
        "nf-add-request",
        "nf-add-request--compact",
        "nf-add-request--in-cart",
        "nf-add-request--success-run",
        "nf-add-request--reverting",
        "nf-add-request--pressed"
      );
      primaryBtn.textContent = nfT("product.requestPriceModel", "Запросить цену по этой модели");
    }
  }

  if (qtyInput) {
    qtyInput.oninput = () => {
      const v = Math.max(1, Number(qtyInput.value) || 1);
      qtyInput.value = v;
      if (p.price != null && totalEl) totalEl.textContent = nfT("product.total", "Итого: {value}", { value: nfFormatPrice(p.price * v) });
    };
  }

  if (primaryBtn) {
    primaryBtn.onclick = () => {
      const qty = Number(qtyInput?.value) || 1;
      nfToggleCartItem(p.id, qty, { sourceButton: primaryBtn });
      if (!nfGetCartItem(p.id)) return; // was removed — stay open
      nfCloseProductModal();
    };
  }

  const modalDesc = nfEl("productModalDescription");
  const modalSpecsWrap = nfEl("productModalSpecsWrap");
  const modalSpecsUl = nfEl("productModalSpecs");
  const modalInstall = nfEl("productModalInstall");
  const modalMaint = nfEl("productModalMaintenance");
  const modalDoc = nfEl("productModalDocNote");

  nfFillProductDescriptionHost(modalDesc, p);
  nfFillProductSpecsList(modalSpecsUl, p);
  if (modalSpecsWrap) modalSpecsWrap.hidden = !p.specs?.length;

  nfFillProductInstallMaintenancePanels(modalInstall, modalMaint, p);

  if (modalDoc) modalDoc.textContent = nfT("product.docNote", NF_PRODUCT_DOCUMENTATION_NOTE);

  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();

  const modalImgWrap = modal.querySelector(".nf-modal-product-imgwrap");
  if (modalImgWrap && img) {
    nfAttachImageZoomPan({
      viewport: modalImgWrap,
      img,
      scale: NF_MODAL_LIGHTBOX_ZOOM_SCALE,
      disposeKey: "modal",
      wheelZoom: true,
      maxScale: NF_MODAL_LIGHTBOX_WHEEL_MAX_SCALE,
      isAllowed: () =>
        !!img?.src && !String(img.src).startsWith("data:image/svg+xml"),
    });
  }
}

function nfCloseProductModal() {
  nfDisposeImageZoomPan("modal");
  const modal = nfEl("productModal");
  const backdrop = nfEl("productModalBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  nfUpdateOverlayBody();
}

/* ====== ПАРТНЁРЫ (MODAL) ====== */
function nfRenderPartners() {
  const container = nfEl("partnersList");
  if (!container) return;

  container.innerHTML = "";

  NF_DATA.partners.forEach((p, i) => {
    const card = nfCreateEl("button", "nf-pt-card nf-partner-btn nf-vp-reveal");
    card.style.setProperty("--nf-vp-stagger", `${Math.min(i, 20) * 32}ms`);
    card.type = "button";
    card.dataset.partnerId = p.id;

    const brand = nfEscapeHtml(nfPartnerShortName(p));
    const prodCount = (NF_DATA.products || []).filter((x) => x.partnerId === p.id).length;
    const countLabel = prodCount === 0 ? "" :
      prodCount === 1 ? "1 продукт" :
      prodCount <= 4 ? `${prodCount} продукта` :
      `${prodCount} продуктов`;

    card.innerHTML = `
      <div class="nf-pt-card__media">
        <img class="nf-partner-logo-img nf-pt-card__logo" alt="${brand}" loading="lazy" />
        ${countLabel ? `<span class="nf-pt-card__count">${nfEscapeHtml(countLabel)}</span>` : ""}
      </div>
      <div class="nf-pt-card__body">
        <span class="nf-pt-card__name">${brand}</span>
        <span class="nf-pt-card__country">
          <svg viewBox="0 0 12 12" fill="none" width="10" height="10" aria-hidden="true">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M6 1v10M1 6h10M2 3.5Q4 5 6 3.5T10 3.5M2 8.5Q4 7 6 8.5T10 8.5" stroke="currentColor" stroke-width="1"/>
          </svg>
          ${nfEscapeHtml(p.country || "—")}
        </span>
      </div>
      <div class="nf-pt-card__cta" aria-hidden="true">
        <span>Подробнее</span>
        <svg class="nf-pt-card__arrow" viewBox="0 0 16 16" fill="none" width="12" height="12">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;

    const img = card.querySelector(".nf-partner-logo-img");
    if (img) nfSetPartnerLogo(img, p.id);

    card.addEventListener("click", () => {
      nfGoPath(nfPartnerOpenUrlBySlug(nfPartnerSlug(p)));
    });
    container.appendChild(card);
  });

  const meta = nfEl("partnersHeroMeta");
  if (meta) {
    meta.textContent = nfPartnerShowcaseMetaText(NF_DATA.partners.length);
  }
}

function nfOpenPartnerModalBySlug(slug, options = {}) {
  const normalized = String(slug || "").trim().toLowerCase();
  if (!normalized) return;
  const partner = NF_DATA.partners.find((p) => nfPartnerSlug(p) === normalized);
  if (partner) nfOpenPartnerModal(partner.id, options);
}

function nfOpenPartnerModal(partnerId, options = {}) {
  const p = NF_DATA.partners.find((x) => x.id === partnerId);
  if (!p) return;

  const modal = nfEl("partnerModal");
  const backdrop = nfEl("partnerModalBackdrop");
  if (!modal || !backdrop) return;

  NF_STATE.selectedPartnerId = partnerId;

  // элементы модалки
  const titleEl = nfEl("partnerModalTitle");
  const metaEl = nfEl("partnerModalMeta");
  const descEl = nfEl("partnerModalDesc");
  const countryEl = nfEl("partnerModalCountry");
  const equipEl = nfEl("partnerModalEquip");
  const countEl = nfEl("partnerModalCount");
  const logoEl = nfEl("partnerModalLogo");

  if (titleEl) titleEl.textContent = p.name;
  if (metaEl) {
    const short = nfPartnerShortName(p);
    const years = nfPartnerYearsLabel(p.years);
    metaEl.textContent = [short, years].filter(Boolean).join(" · ");
  }
  if (descEl) descEl.textContent = p.description || nfT("partners.descriptionFallback", "Описание партнёра будет добавлено позже.");
  if (countryEl) countryEl.textContent = p.country || "—";
  if (equipEl) equipEl.textContent = p.equipment || "—";

  const products = NF_DATA.products.filter((prod) => prod.partnerId === p.id);
  if (countEl) countEl.textContent = String(products.length);

  if (logoEl) {
    logoEl.alt = "";
    nfSetPartnerLogo(logoEl, p.id);
  }

  nfRenderPartnerModalProducts(products);

  const search = nfEl("partnerModalSearch");
  if (search) {
    search.value = "";

    // Обновляем счётчик в тулбаре при фильтрации
    const updateToolbarCount = (count) => {
      const titleEl = modal.querySelector(".nf-pm-toolbar__title");
      if (titleEl) {
        titleEl.textContent = count === products.length
          ? "Товары партнёра"
          : `Найдено: ${count}`;
      }
    };

    search.oninput = nfDebounce(() => {
      const q = String(search.value || "").toLowerCase().trim();
      const filtered = !q
        ? products
        : products.filter((x) => {
            const name = String(x.name || "").toLowerCase();
            const article = String(x.article || "").toLowerCase();
            const model = String(x.model || "").toLowerCase();
            return name.includes(q) || article.includes(q) || model.includes(q);
          });
      nfRenderPartnerModalProducts(filtered);
      updateToolbarCount(filtered.length);
    }, 180);
  }

  const toCatalogBtn = nfEl("partnerModalToCatalog");
  if (toCatalogBtn) {
    toCatalogBtn.onclick = () => {
      NF_STATE.filters.partnerIds = new Set([p.id]);
      nfClosePartnerModal({ skipUrlSync: true });
      nfGoPath("/catalog");
    };
  }

  const addAllBtn = nfEl("partnerModalAddAll");
  if (addAllBtn) {
    addAllBtn.onclick = () => {
      if (!products.length) return;
      const ops = products.map((prod) => ({ productId: prod.id, qty: 1 }));
      ops.forEach((op) => {
        const ex = nfGetCartItem(op.productId);
        if (ex) ex.qty += op.qty;
        else NF_STATE.cart.push({ productId: op.productId, qty: op.qty });
      });
      nfUpdateCartBadge();
      nfRenderCart();
      nfPushToast({
        message: nfT("toast.addedManyToRequest", "Добавлено в запрос: {count} {items}", {
          count: ops.length,
          items: nfItemsCountLabel(ops.length).replace(`${ops.length} `, ""),
        }),
        variant: "success",
        duration: 8200,
        actionLabel: nfT("toast.undo", "Отменить"),
        pauseOnHover: true,
        onAction: () => {
          ops.forEach((op) => nfUndoCartAdjust(op.productId, op.qty));
          nfUpdateCartBadge();
          nfRenderCart();
          nfSyncAllAddToRequestButtons();
          nfPushToast({ message: nfT("toast.addCancelled", "Добавление отменено"), variant: "info", duration: 3400 });
          return true;
        },
      });
      nfSyncAllAddToRequestButtons();
    };
  }

  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  if (!options.skipUrlSync) {
    const slug = nfPartnerSlug(p);
    const nextUrl = nfPartnerOpenUrlBySlug(slug);
    if (`${location.pathname}${location.search}` !== nextUrl) {
      window.history.pushState({ page: "partners" }, "", nextUrl);
    }
  }
  nfUpdateOverlayBody();
}

function nfRenderPartnerModalProducts(list) {
  const box = nfEl("partnerModalProducts");
  if (!box) return;

  box.innerHTML = "";

  if (!list.length) {
    box.innerHTML = `
      <div class="nf-pm-empty">
        <svg viewBox="0 0 48 48" fill="none" width="40" height="40" aria-hidden="true">
          <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="1.5" opacity="0.25"/>
          <path d="M16 24h16M24 16v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
        </svg>
        <span>Товары не найдены</span>
      </div>`;
    return;
  }

  list.forEach((prod) => {
    const cat = NF_DATA.categories.find((c) => c.id === prod.categoryId)?.name || "";
    const isInStock = (prod.status || "in_stock") === "in_stock";
    const priceLabel = prod.price ? nfFormatPrice(prod.price) : null;

    const card = nfCreateEl("div", "nf-pm-card");

    // Image
    const imgWrap = nfCreateEl("div", "nf-pm-card__img");
    if (prod.images && prod.images[0]) {
      const img = document.createElement("img");
      img.src = prod.images[0];
      img.alt = "";
      img.loading = "lazy";
      imgWrap.appendChild(img);
    }

    // Status dot in corner
    imgWrap.insertAdjacentHTML("beforeend", `
      <span class="nf-pm-card__status ${isInStock ? "nf-pm-card__status--in" : "nf-pm-card__status--order"}">
        <span class="nf-pm-card__status-dot"></span>${isInStock ? "В наличии" : "Под заказ"}
      </span>`);

    // Body
    const body = nfCreateEl("div", "nf-pm-card__body");
    body.innerHTML = `
      ${cat ? `<span class="nf-pm-card__cat">${nfEscapeHtml(cat)}</span>` : ""}
      <div class="nf-pm-card__name">${nfEscapeHtml(prod.name)}</div>
      <div class="nf-pm-card__price ${priceLabel ? "" : "nf-pm-card__price--rq"}">
        ${priceLabel ? nfEscapeHtml(priceLabel) : "По запросу"}
      </div>`;

    // Footer buttons
    const foot = nfCreateEl("div", "nf-pm-card__foot");

    const openBtn = nfCreateEl("button", "nf-btn nf-btn-ghost nf-btn-sm nf-pm-card__open");
    openBtn.type = "button";
    openBtn.textContent = "Подробнее";
    openBtn.onclick = () => { nfClosePartnerModal(); nfOpenProductPage(prod.id); };

    const addBtn = nfCreateEl("button", "nf-btn nf-btn-primary nf-btn-sm nf-btn-checkable nf-pm-card__add");
    addBtn.type = "button";
    nfInitAddToRequestControl(addBtn, prod.id, "В запрос", {});
    addBtn.addEventListener("click", () => nfToggleCartItem(prod.id, 1, { sourceButton: addBtn }));

    foot.append(openBtn, addBtn);
    card.append(imgWrap, body, foot);
    box.appendChild(card);
  });
}

function nfClosePartnerModal(options = {}) {
  const modal = nfEl("partnerModal");
  const backdrop = nfEl("partnerModalBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  if (!options.skipUrlSync) {
    const segs = nfPathSegments();
    if (segs[0] === "partners") {
      window.history.replaceState({ page: "partners" }, document.title, nfPartnersPageUrlWithoutOpen());
    }
  }
  nfUpdateOverlayBody();
}

/* ====== NEWS ====== */
function nfNewsTitle(item) {
  return String(nfGetLocalizedField(item, "title", nfT("news.articleFallback", "Материал")) || "");
}

function nfNewsExcerpt(item) {
  return String(
    nfGetLocalizedField(
      item,
      "shortDescription",
      nfGetLocalizedField(item, "excerpt", nfNewsTitle(item))
    ) || ""
  );
}

function nfNewsCategory(item) {
  return String(nfGetLocalizedField(item, "category", nfT("common.news", "Новости")) || "");
}

function nfNewsCountLabel(count) {
  const forms = {
    one: nfT("news.count.one", "новость"),
    few: nfT("news.count.few", "новости"),
    many: nfT("news.count.many", "новостей"),
    other: nfT("news.count.other", "news"),
  };
  return `${count} ${nfPluralForm(count, forms)}`;
}

function nfNewsSortLabel(sort) {
  if (sort === "old") return nfT("news.sort.old", "Сначала старые");
  if (sort === "all") return nfT("news.sort.all", "За всё время");
  return nfT("news.sort.recent", "Сначала новые");
}

function nfGetFilteredNews() {
  const view = NF_STATE.newsView || {};
  const q = String(view.search || "").trim().toLowerCase();
  const category = String(view.category || "all");
  const sort = String(view.sort || "recent");

  let items = [...NF_DATA.news];
  if (q) {
    items = items.filter((n) => {
      const hay = nfEntitySearchHaystack(n, [
        nfNewsTitle(n),
        nfNewsCategory(n),
        n.author || "",
        nfNewsExcerpt(n),
        nfGetLocalizedField(n, "description", ""),
      ]);
      return hay.includes(q);
    });
  }
  if (category !== "all") items = items.filter((n) => nfNewsCategory(n) === category);

  if (sort === "old") items.sort((a, b) => new Date(a.date) - new Date(b.date));
  else items.sort((a, b) => new Date(b.date) - new Date(a.date));

  return items;
}

function nfRenderNews() {
  const listEl = nfEl("newsList");
  const featuredEl = nfEl("newsFeatured");
  const chipsEl = nfEl("newsCategoryChips");
  const metaEl = nfEl("newsResultsMeta");
  if (!listEl || !featuredEl || !chipsEl) return;

  const items = nfGetFilteredNews();
  const categories = Array.from(new Set(NF_DATA.news.map((n) => nfNewsCategory(n)).filter(Boolean)));
  const currentCategory = NF_STATE.newsView?.category || "all";

  chipsEl.innerHTML = `
    <button type="button" class="news-category-chip${currentCategory === "all" ? " is-active" : ""}" data-news-category="all">${nfEscapeHtml(nfT("news.categoryAll", "Все"))}</button>
    ${categories
      .map(
        (cat) =>
          `<button type="button" class="news-category-chip${currentCategory === cat ? " is-active" : ""}" data-news-category="${nfEscapeHtml(cat)}">${nfEscapeHtml(cat)}</button>`
      )
      .join("")}
  `;
  chipsEl.querySelectorAll("[data-news-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      NF_STATE.newsView.category = btn.dataset.newsCategory || "all";
      nfRenderNews();
    });
  });

  const totalNews = (NF_DATA.news || []).length;
  if (chipsEl) chipsEl.hidden = totalNews <= 1;

  if (metaEl) {
    metaEl.textContent = items.length
      ? nfNewsCountLabel(items.length)
      : nfT("news.noResultsByFilters", "Нет новостей по фильтрам");
  }

  featuredEl.innerHTML = "";
  listEl.innerHTML = "";
  featuredEl.hidden = false;
  if (!items.length) {
    featuredEl.innerHTML = `<article class="news-featured-card"><div class="nf-empty">${nfEscapeHtml(nfT("news.nothingFound", "Ничего не найдено. Измените фильтры или поисковый запрос."))}</div></article>`;
    return;
  }

  function nfAppendNewsListCard(n, i) {
    const _dp = (n.date || "").split("-");
    const _months = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
    const _day = parseInt(_dp[2] || "", 10) || "";
    const _mon = _months[(parseInt(_dp[1] || "", 10) || 1) - 1] || "";
    const _yr = _dp[0] || "";
    const card = nfCreateEl("article", "nf-nr-item nf-vp-reveal");
    card.style.setProperty("--nf-vp-stagger", `${Math.min(i + 1, 12) * 45}ms`);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="nf-nr-item__date" aria-label="${nfEscapeHtml(nfFormatDate(n.date))}">
        <span class="nf-nr-item__day">${_day}</span>
        <span class="nf-nr-item__month">${_mon}</span>
        <span class="nf-nr-item__year">${_yr}</span>
      </div>
      <div class="nf-nr-item__body">
        <span class="nf-nr-item__cat">${nfEscapeHtml(nfNewsCategory(n))}</span>
        <h3 class="nf-nr-item__title">${nfEscapeHtml(nfNewsTitle(n))}</h3>
        <p class="nf-nr-item__excerpt">${nfEscapeHtml(nfNewsExcerpt(n))}</p>
      </div>
      <span class="nf-nr-item__arrow" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
      </span>
    `;
    const _openItem = () => { NF_STATE.newsArticleId = n.id; nfGoPath(`/news/${nfNewsPermalinkSlug(n)}`); };
    card.addEventListener("click", _openItem);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); _openItem(); } });
    listEl.appendChild(card);
  }

  if (items.length === 1) {
    featuredEl.hidden = true;
    nfAppendNewsListCard(items[0], 0);
  } else {
    const [featured, ...rest] = items;
    const featuredCard = nfCreateEl("article", "news-featured-card news-featured-card--editorial nf-vp-reveal");
    featuredCard.style.setProperty("--nf-vp-stagger", "40ms");
    featuredCard.innerHTML = `
    <div class="news-featured-media">
      ${
        featured.image
          ? `<img src="${nfEscapeHtml(featured.image)}" alt="" loading="lazy" />`
          : `<div class="news-featured-media-empty"><div class="nf-news-ph"><span class="nf-news-ph__brand">NanoFarm</span><span class="nf-news-ph__label">Newsroom</span></div></div>`
      }
    </div>
    <div class="news-featured-body">
      <div class="news-featured-body-stack">
        <div class="news-featured-chip">${nfEscapeHtml(nfNewsCategory(featured))}</div>
        <h2 class="news-featured-title">${nfEscapeHtml(nfNewsTitle(featured))}</h2>
        <p class="news-featured-text">${nfEscapeHtml(nfNewsExcerpt(featured))}</p>
        <div class="news-featured-foot">
          <div class="news-featured-meta">${nfEscapeHtml(nfFormatDate(featured.date))}${featured.author ? ` · ${nfEscapeHtml(featured.author)}` : ""}</div>
          <span class="news-featured-cta" aria-hidden="true"><span class="news-featured-cta-label">${nfEscapeHtml(nfT("common.readMaterial", "Читать материал"))}</span><span class="news-featured-cta-arrow">→</span></span>
        </div>
      </div>
    </div>
  `;
    featuredCard.addEventListener("click", () => {
      NF_STATE.newsArticleId = featured.id;
      nfGoPath(`/news/${nfNewsPermalinkSlug(featured)}`);
    });
    featuredEl.appendChild(featuredCard);

    rest.forEach((n, i) => {
      nfAppendNewsListCard(n, i);
    });
  }

  const pending = document.querySelectorAll(
    "#newsFeatured .nf-vp-reveal:not(.is-visible), #newsList .nf-vp-reveal:not(.is-visible)"
  );
  if (pending.length) nfRevealObserveElements(Array.from(pending));
}

function nfOpenNewsModal(newsId) {
  const modal = nfEl("newsModal");
  const backdrop = nfEl("newsModalBackdrop");
  if (!modal || !backdrop) return;

  const item =
    NF_DATA.news.find((x) => x.id === newsId) ||
    NF_DATA.news.find((x) => x.id === NF_STATE.selectedNewsId) ||
    NF_DATA.news[0];
  if (!item) return;

  NF_STATE.selectedNewsId = item.id;
  const newsTitle = nfNewsTitle(item);
  const newsSummary = nfNewsExcerpt(item);

  const titleEl = nfEl("newsModalTitle");
  const metaEl = nfEl("newsModalMeta");
  const bodyEl = nfEl("newsModalBody");

  if (titleEl) titleEl.textContent = newsTitle;
  if (metaEl) {
    const date = nfFormatDate(item.date);
    const cat = nfNewsCategory(item);
    metaEl.innerHTML = `${cat ? `<span class="nf-nm-cat">${nfEscapeHtml(cat)}</span>` : ""}<span class="nf-nm-date">${nfEscapeHtml(date)}</span>${item.author ? `<span class="nf-nm-sep" aria-hidden="true">·</span><span class="nf-nm-author">${nfEscapeHtml(item.author)}</span>` : ""}`;
  }

  const figEl = nfEl("newsModalFigure");
  const imgEl = nfEl("newsModalImage");
  const fallbackEl = nfEl("newsModalMediaFallback");
  const galleryEl = nfEl("newsModalGallery");
  const galleryTrack = nfEl("newsModalGalleryTrack");
  const mediaSources = [];
  if (Array.isArray(item.images)) {
    item.images.forEach((src) => {
      const safeSrc = String(src || "").trim();
      if (safeSrc && !mediaSources.includes(safeSrc)) mediaSources.push(safeSrc);
    });
  }
  const hero = String(item.image || "").trim();
  if (hero && !mediaSources.includes(hero)) mediaSources.unshift(hero);

  const activeIndex = Number(item._newsModalImageIndex) || 0;
  const safeIndex = Math.max(0, Math.min(activeIndex, Math.max(0, mediaSources.length - 1)));
  item._newsModalImageIndex = safeIndex;

  if (figEl && imgEl && fallbackEl) {
    if (mediaSources.length) {
      const activeSrc = mediaSources[safeIndex];
      imgEl.src = activeSrc;
      imgEl.alt = newsTitle
        ? nfFormatTemplate(nfT("news.coverAlt", "Обложка: {title}"), { title: newsTitle })
        : nfT("news.inlineImageAlt", "Иллюстрация к материалу");
      figEl.hidden = false;
      fallbackEl.hidden = true;
    } else {
      imgEl.removeAttribute("src");
      imgEl.alt = "";
      figEl.hidden = true;
      fallbackEl.hidden = false;
    }
  }

  if (galleryEl && galleryTrack) {
    if (mediaSources.length > 1) {
      galleryTrack.innerHTML = mediaSources
        .map(
          (src, idx) => `
            <button
              type="button"
              class="nf-news-modal-gallery-thumb${idx === safeIndex ? " is-active" : ""}"
              data-news-gallery-index="${idx}"
              aria-label="Изображение ${idx + 1}"
            >
              <img src="${nfEscapeHtml(src)}" alt="" loading="lazy" />
            </button>
          `
        )
        .join("");
      galleryEl.hidden = false;
    } else {
      galleryTrack.innerHTML = "";
      galleryEl.hidden = true;
    }
  }

  if (bodyEl) {
    const htmlBody = nfBuildNewsArticleBodyHtml(item);
    if (htmlBody) {
      bodyEl.innerHTML = htmlBody;
      const firstParagraph = bodyEl.querySelector("p");
      if (firstParagraph) firstParagraph.classList.add("nf-news-modal-intro");
    } else {
      const paragraphs = [newsSummary];
      bodyEl.innerHTML = paragraphs
        .map((p, idx) => `<p class="nf-news-modal-paragraph${idx === 0 ? " nf-news-modal-intro" : ""}">${nfEscapeHtml(p)}</p>`)
        .join("");
    }
    bodyEl.scrollTop = 0;
  }

  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();
}

function nfInitNewsModalMediaControls() {
  const modal = nfEl("newsModal");
  const prevBtn = nfEl("newsModalGalleryPrev");
  const nextBtn = nfEl("newsModalGalleryNext");
  const track = nfEl("newsModalGalleryTrack");
  if (!modal || !track) return;

  const step = (delta) => {
    const current =
      NF_DATA.news.find((x) => x.id === NF_STATE.selectedNewsId) ||
      NF_DATA.news[0];
    if (!current) return;
    const pool = [];
    if (Array.isArray(current.images)) {
      current.images.forEach((src) => {
        const safeSrc = String(src || "").trim();
        if (safeSrc && !pool.includes(safeSrc)) pool.push(safeSrc);
      });
    }
    const hero = String(current.image || "").trim();
    if (hero && !pool.includes(hero)) pool.unshift(hero);
    if (pool.length < 2) return;
    const idx = Number(current._newsModalImageIndex) || 0;
    const next = (idx + delta + pool.length) % pool.length;
    current._newsModalImageIndex = next;
    nfOpenNewsModal(current.id);
  };

  if (prevBtn) prevBtn.onclick = () => step(-1);
  if (nextBtn) nextBtn.onclick = () => step(1);
  track.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-news-gallery-index]");
    if (!thumb) return;
    const current =
      NF_DATA.news.find((x) => x.id === NF_STATE.selectedNewsId) ||
      NF_DATA.news[0];
    if (!current) return;
    current._newsModalImageIndex = Number(thumb.dataset.newsGalleryIndex) || 0;
    nfOpenNewsModal(current.id);
  });
}

function nfCloseNewsModal() {
  const modal = nfEl("newsModal");
  const backdrop = nfEl("newsModalBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  nfUpdateOverlayBody();
}

/* ====== ADMIN AUTH ====== */
const NF_ADMIN_TOKEN_KEY = "nf_admin_token";
const NF_ADMIN_REFRESH_KEY = "nf_admin_refresh";

function nfAdminToken() {
  try {
    return typeof sessionStorage !== "undefined" ? sessionStorage.getItem(NF_ADMIN_TOKEN_KEY) : null;
  } catch (_) {
    return null;
  }
}

function nfAdminRefreshToken() {
  try {
    return typeof sessionStorage !== "undefined" ? sessionStorage.getItem(NF_ADMIN_REFRESH_KEY) : null;
  } catch (_) {
    return null;
  }
}

function nfAdminSetToken(token) {
  try {
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(NF_ADMIN_TOKEN_KEY, token);
  } catch (_) {}
}

function nfAdminSetRefreshToken(token) {
  try {
    if (typeof sessionStorage !== "undefined") {
      if (token) sessionStorage.setItem(NF_ADMIN_REFRESH_KEY, token);
      else sessionStorage.removeItem(NF_ADMIN_REFRESH_KEY);
    }
  } catch (_) {}
}

function nfAdminClearToken() {
  try {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(NF_ADMIN_TOKEN_KEY);
      sessionStorage.removeItem(NF_ADMIN_REFRESH_KEY);
    }
  } catch (_) {}
}

function nfAdminAuthHeaders() {
  const t = nfAdminToken();
  return t ? { Authorization: "Bearer " + t } : {};
}

function nfAdminOnUnauthorized() {
  nfAdminClearToken();
  nfShowToast("Сессия истекла. Войдите снова.");
  nfRenderAdminLogin();
}

function nfAdminShowStatus(message, kind) {
  const el = nfEl("adminStatus");
  if (!el) return;
  el.textContent = message;
  el.classList.remove("nf-admin-status-success", "nf-admin-status-error");
  el.classList.add(kind === "error" ? "nf-admin-status-error" : "nf-admin-status-success", "is-visible");
  try {
    if (window.__nfAdminStatusTimer) clearTimeout(window.__nfAdminStatusTimer);
  } catch (_) {}
  try {
    window.__nfAdminStatusTimer = setTimeout(() => {
      el.classList.remove("is-visible");
    }, 2500);
  } catch (_) {}
}

/* ====== ADMIN CRUD HELPERS ====== */
function nfAdminCategoriesContent() {
  const list = NF_DATA.categories || [];
  return `
    <div class="nf-admin-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <div>
          <h2 class="nf-admin-card-title">Категории (${list.length})</h2>
          <p class="nf-admin-subtitle">Группы каталога, которые видит пользователь на публичном сайте.</p>
        </div>
        <div class="nf-admin-header-actions">
          <input type="search" class="nf-admin-search" data-admin-search="categories" placeholder="Поиск по названию или описанию" />
          <button type="button" class="nf-btn nf-btn-primary nf-admin-add-btn" data-admin-add="category">Добавить категорию</button>
        </div>
      </div>
      <div class="nf-admin-table-wrap">
        <table class="nf-admin-table">
          <thead><tr><th>ID</th><th class="nf-admin-col-actions">Действия</th><th>Название</th><th>Описание</th><th>Кол-во</th></tr></thead>
          <tbody>${list
            .map(
              (c) =>
                `<tr>
                  <td><code>${nfEscapeHtml(c.id)}</code></td>
                  <td class="nf-admin-actions">
                    <button type="button" class="nf-admin-row-edit" data-admin-edit="category" data-id="${nfEscapeHtml(c.id)}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="${NF_PALETTE.accentSoft}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Редактировать</span>
                    </button>
                    <button type="button" class="nf-admin-row-del" data-admin-del="category" data-id="${nfEscapeHtml(c.id)}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="${NF_PALETTE.error}" stroke-opacity="0.62" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Удалить</span>
                    </button>
                  </td>
                  <td>${nfEscapeHtml(c.name)}</td>
                  <td>${nfEscapeHtml(c.description || "")}</td>
                  <td>${nfEscapeHtml(c.count ?? 0)}</td>
                </tr>`,
            )
            .join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function nfAdminPartnersContent() {
  const list = NF_DATA.partners || [];
  return `
    <div class="nf-admin-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <div>
          <h2 class="nf-admin-card-title">Партнёры (${list.length})</h2>
          <p class="nf-admin-subtitle">Производители и бренды, с которыми работает компания.</p>
        </div>
        <div class="nf-admin-header-actions">
          <input type="search" class="nf-admin-search" data-admin-search="partners" placeholder="Поиск по названию или стране" />
          <button type="button" class="nf-btn nf-btn-primary nf-admin-add-btn" data-admin-add="partner">Добавить партнёра</button>
        </div>
      </div>
      <div class="nf-admin-table-wrap">
        <table class="nf-admin-table">
          <thead><tr><th>ID</th><th class="nf-admin-col-actions">Действия</th><th>Название</th><th>Страна</th><th>Оборудование</th></tr></thead>
          <tbody>${list
            .map(
              (p) =>
                `<tr>
                  <td><code>${nfEscapeHtml(p.id)}</code></td>
                  <td class="nf-admin-actions">
                    <button type="button" class="nf-admin-row-edit" data-admin-edit="partner" data-id="${nfEscapeHtml(p.id)}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="${NF_PALETTE.accentSoft}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Редактировать</span>
                    </button>
                    <button type="button" class="nf-admin-row-del" data-admin-del="partner" data-id="${nfEscapeHtml(p.id)}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="${NF_PALETTE.error}" stroke-opacity="0.62" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Удалить</span>
                    </button>
                  </td>
                  <td>${nfEscapeHtml(p.name)}</td>
                  <td>${nfEscapeHtml(p.country || "")}</td>
                  <td>${nfEscapeHtml(p.equipment || "")}</td>
                </tr>`,
            )
            .join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function nfAdminProductsContent() {
  const list = NF_DATA.products || [];
  return `
    <div class="nf-admin-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <div>
          <h2 class="nf-admin-card-title">Товары (${list.length})</h2>
          <p class="nf-admin-subtitle">Позиции каталога, отображаемые на сайте и в поиске.</p>
        </div>
        <div class="nf-admin-header-actions">
          <input type="search" class="nf-admin-search" data-admin-search="products" placeholder="Поиск по названию, артикулу, партнёру" />
          <button type="button" class="nf-btn nf-btn-primary nf-admin-add-btn" data-admin-add="product">Добавить товар</button>
        </div>
      </div>
      <div class="nf-admin-table-wrap">
        <table class="nf-admin-table">
          <thead><tr><th>ID</th><th class="nf-admin-col-actions">Действия</th><th>Название</th><th>Категория</th><th>Партнёр</th><th>Цена</th><th>Популярный</th></tr></thead>
          <tbody>${list
            .map((p) => {
              const cat = (NF_DATA.categories || []).find((c) => c.id === p.categoryId);
              const part = (NF_DATA.partners || []).find((x) => x.id === p.partnerId);
              const price = p.price != null ? nfFormatPrice(p.price) : "—";
              const popular = p.popular ? "Да" : "—";
              return `<tr>
                <td><code>${nfEscapeHtml(p.id)}</code></td>
                <td class="nf-admin-actions">
                  <button type="button" class="nf-admin-row-edit" data-admin-edit="product" data-id="${nfEscapeHtml(p.id)}">
                    <span class="nf-admin-row-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="${NF_PALETTE.accentSoft}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span class="nf-admin-row-label">Редактировать</span>
                  </button>
                  <button type="button" class="nf-admin-row-del" data-admin-del="product" data-id="${nfEscapeHtml(p.id)}">
                    <span class="nf-admin-row-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="${NF_PALETTE.error}" stroke-opacity="0.62" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span class="nf-admin-row-label">Удалить</span>
                  </button>
                </td>
                <td>${nfEscapeHtml(p.name || "")}</td>
                <td>${nfEscapeHtml(cat ? cat.name : p.categoryId)}</td>
                <td>${nfEscapeHtml(part ? part.name : p.partnerId)}</td>
                <td>${nfEscapeHtml(price)}</td>
                <td>${nfEscapeHtml(popular)}</td>
              </tr>`;
            })
            .join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function nfAdminNewsContent() {
  const list = NF_DATA.news || [];
  const sorted = list
    .slice()
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  return `
    <div class="nf-admin-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <div>
          <h2 class="nf-admin-card-title">Новости (${list.length})</h2>
          <p class="nf-admin-subtitle">Публикации, которые выводятся в разделе «Новости» и на главной странице.</p>
        </div>
        <div class="nf-admin-header-actions">
          <input type="search" class="nf-admin-search" data-admin-search="news" placeholder="Поиск по заголовку или категории" />
          <button type="button" class="nf-btn nf-btn-primary nf-admin-add-btn" data-admin-add="news">Добавить новость</button>
        </div>
      </div>
      <div class="nf-admin-table-wrap">
        <table class="nf-admin-table">
          <thead><tr><th>ID</th><th class="nf-admin-col-actions">Действия</th><th>Заголовок</th><th>Категория</th><th>Дата</th><th>Автор</th></tr></thead>
          <tbody>${sorted
            .map(
              (n) =>
                `<tr>
                  <td><code>${nfEscapeHtml(n.id)}</code></td>
                  <td class="nf-admin-actions">
                    <button type="button" class="nf-admin-row-edit" data-admin-edit="news" data-id="${nfEscapeHtml(n.id)}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="${NF_PALETTE.accentSoft}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Редактировать</span>
                    </button>
                    <button type="button" class="nf-admin-row-del" data-admin-del="news" data-id="${nfEscapeHtml(n.id)}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="${NF_PALETTE.error}" stroke-opacity="0.62" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Удалить</span>
                    </button>
                  </td>
                  <td>${nfEscapeHtml(n.title || "")}</td>
                  <td>${nfEscapeHtml(n.category || "")}</td>
                  <td>${nfEscapeHtml(n.date || "")}</td>
                  <td>${nfEscapeHtml(n.author || "")}</td>
                </tr>`,
            )
            .join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function nfAdminBindCrud(root) {
  if (!root) return;
  const base = nfApiBase();

  // редактирование
  root.querySelectorAll("[data-admin-edit]").forEach((btn) => {
    btn.onclick = () => {
      const kind = btn.dataset.adminEdit;
      const id = btn.dataset.id;
      if (!kind || !id) return;
      nfAdminOpenForm(kind, id);
    };
  });

  root.querySelectorAll("[data-admin-del]").forEach((btn) => {
    btn.onclick = async () => {
      const kind = btn.dataset.adminDel;
      const id = btn.dataset.id;
      if (!id || !confirm(`Удалить ${kind === "category" ? "категорию" : kind === "partner" ? "партнёра" : "товар"} «${id}»?`)) return;
      const path =
        kind === "category"
          ? "categories"
          : kind === "partner"
          ? "partners"
          : kind === "product"
          ? "products"
          : "news";
      try {
        const res = await fetch(`${base}/api/${path}/${id}`, { method: "DELETE", headers: nfAdminAuthHeaders() });
        if (res.status === 401) { nfAdminOnUnauthorized(); return; }
        if (res.ok) {
          if (kind === "category") NF_DATA.categories = NF_DATA.categories.filter((c) => c.id !== id);
          else if (kind === "partner") NF_DATA.partners = NF_DATA.partners.filter((p) => p.id !== id);
          else if (kind === "product") NF_DATA.products = NF_DATA.products.filter((p) => p.id !== id);
          else if (kind === "news") NF_DATA.news = (NF_DATA.news || []).filter((n) => n.id !== id);
          nfRenderAdmin();
          nfShowToast("Удалено.");
          nfAdminShowStatus("Запись удалена", "success");
        } else nfShowToast("Ошибка удаления.");
      } catch (_) {
        nfShowToast("Ошибка сети.");
        nfAdminShowStatus("Ошибка сети при удалении", "error");
      }
    };
  });

  root.querySelectorAll("[data-admin-add]").forEach((btn) => {
    btn.onclick = () => {
      const kind = btn.dataset.adminAdd;
      if (!kind) return;
      nfAdminOpenForm(kind, null);
    };
  });

  root.querySelectorAll("[data-admin-search]").forEach((input) => {
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      const card = input.closest(".nf-admin-card");
      if (!card) return;
      const rows = card.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        const text = (row.textContent || "").toLowerCase();
        row.style.display = !q || text.includes(q) ? "" : "none";
      });
    });
  });
}

async function nfAdminSaveCategories(base) {
  const res = await fetch(`${base}/api/categories`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...nfAdminAuthHeaders() },
    body: JSON.stringify(NF_DATA.categories),
  });
  if (res.status === 401) { nfAdminOnUnauthorized(); throw new Error("Unauthorized"); }
  if (!res.ok) throw new Error("Save failed");
}

async function nfAdminSavePartners(base) {
  const res = await fetch(`${base}/api/partners`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...nfAdminAuthHeaders() },
    body: JSON.stringify(NF_DATA.partners),
  });
  if (res.status === 401) { nfAdminOnUnauthorized(); throw new Error("Unauthorized"); }
  if (!res.ok) throw new Error("Save failed");
}

async function nfAdminSaveProducts(base) {
  const slimProducts = (NF_DATA.products || []).map((p) => {
    const copy = { ...p };
    // Урезаем тяжёлые автопереводы, чтобы не раздувать payload
    Object.keys(copy).forEach((key) => {
      if (
        key.endsWith("_en") ||
        key.endsWith("_kz") ||
        key === "specs_en" ||
        key === "specs_kz" ||
        key === "serviceSteps_en" ||
        key === "serviceSteps_kz"
      ) {
        delete copy[key];
      }
    });
    return copy;
  });

  const res = await fetch(`${base}/api/products`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...nfAdminAuthHeaders() },
    body: JSON.stringify(slimProducts),
  });
  if (res.status === 401) { nfAdminOnUnauthorized(); throw new Error("Unauthorized"); }
  if (!res.ok) throw new Error("Save failed");
}

async function nfAdminSaveNews(base) {
  const res = await fetch(`${base}/api/news`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...nfAdminAuthHeaders() },
    body: JSON.stringify(NF_DATA.news),
  });
  if (res.status === 401) { nfAdminOnUnauthorized(); throw new Error("Unauthorized"); }
  if (!res.ok) throw new Error("Save failed");
}

function nfAdminOpenForm(kind, id) {
  const base = nfApiBase();
  const modal = document.createElement("div");
  modal.className = "nf-admin-modal-backdrop";
  const isEdit = !!id;
  const entityLabel =
    kind === "category"
      ? "Редактор категории"
      : kind === "partner"
      ? "Редактор партнёра"
      : kind === "product"
      ? "Редактор товара"
      : "Редактор записи";
  const actionLabel = isEdit ? "Редактирование" : "Создание";
  const fullTitle =
    (isEdit ? "Редактирование " : "Добавление ") +
    (kind === "category" ? "категории" : kind === "partner" ? "партнёра" : kind === "product" ? "товара" : "записи");
  const modalClass = kind === "product" ? "nf-admin-modal nf-admin-modal--product" : "nf-admin-modal";
  modal.innerHTML = `
    <div class="${modalClass}">
      <div class="nf-admin-modal-head">
        <div class="nf-admin-modal-head-main">
          <h2>${entityLabel}</h2>
          ${actionLabel ? `<span class="nf-admin-modal-badge">${actionLabel}</span>` : ""}
        </div>
        <button type="button" class="nf-icon-btn nf-modal-close nf-admin-modal-close" aria-label="Закрыть">×</button>
      </div>
      <form class="nf-admin-modal-form" aria-label="${fullTitle}"></form>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector(".nf-admin-modal-close").onclick = close;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  const form = modal.querySelector(".nf-admin-modal-form");
  if (!form) return;

  let entity;
  if (kind === "category") {
    const raw =
      (NF_DATA.categories || []).find((c) => String(c.id) === String(id)) || {};

    const baseCategory = {
      id: "",
      name: "",
      description: "",
      count: 0,
      sortOrder: 0,
      isHidden: false,
      seo: {
        metaTitle: "",
        metaDescription: "",
        slug: "",
      },
    };

    entity = {
      ...baseCategory,
      ...raw,
      seo: { ...baseCategory.seo, ...(raw.seo || {}) },
    };

    form.innerHTML = `
      <div class="nf-admin-product-layout">
        <div class="nf-admin-product-left">
          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">Основная информация</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-product-meta">
                <label>Идентификатор (латиница)
                  <input name="id" class="nf-input" value="${nfEscapeHtml(entity.id || "")}" ${id ? "readonly" : ""} />
                </label>
                <label>Название
                  <input name="name" class="nf-input" value="${nfEscapeHtml(entity.name || "")}" />
                </label>
                <label>Кол-во позиций
                  <input name="count" type="number" class="nf-input" value="${nfEscapeHtml(entity.count ?? 0)}" />
                </label>
                <label>Порядок сортировки
                  <input name="sortOrder" type="number" class="nf-input" value="${nfEscapeHtml(entity.sortOrder ?? 0)}" />
                </label>
                <label class="nf-admin-checkbox">
                  <input name="isHidden" type="checkbox" ${entity.isHidden ? "checked" : ""} />
                  <span>Скрыть раздел с сайта</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="nf-admin-product-right">
          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">Описание</span>
            </button>
            <div class="nf-admin-section-body">
              <label>Описание категории
                <textarea name="description" class="nf-textarea" rows="4" placeholder="Какой тип оборудования и задач покрывает раздел">${nfEscapeHtml(entity.description || "")}</textarea>
              </label>
            </div>
          </div>

          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">SEO</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-product-split">
                <div>
                  <label>Мета-заголовок
                    <input name="metaTitle" class="nf-input" value="${nfEscapeHtml(entity.seo.metaTitle || "")}" />
                  </label>
                  <label>Мета-описание
                    <textarea name="metaDescription" class="nf-textarea" rows="2">${nfEscapeHtml(entity.seo.metaDescription || "")}</textarea>
                  </label>
                </div>
                <div>
                  <label>ЧПУ (адрес страницы)
                    <input name="slug" class="nf-input" value="${nfEscapeHtml(entity.seo.slug || "")}" placeholder="naprimer-anesteziologiya-reanimaciya" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="nf-admin-product-actions">
            <button type="button" class="nf-btn nf-btn-secondary nf-admin-modal-cancel">Отмена</button>
            <button type="submit" class="nf-btn nf-btn-primary">Сохранить категорию</button>
          </div>
        </div>
      </div>
    `;
  } else if (kind === "partner") {
    const raw =
      (NF_DATA.partners || []).find((p) => String(p.id) === String(id)) || {};

    const basePartner = {
      id: "",
      name: "",
      country: "",
      equipment: "",
      years: 0,
      description: "",
      logo: "",
      website: "",
      city: "",
      sortOrder: 0,
      isHidden: false,
      seo: {
        metaTitle: "",
        metaDescription: "",
        slug: "",
      },
    };

    entity = {
      ...basePartner,
      ...raw,
      seo: { ...basePartner.seo, ...(raw.seo || {}) },
    };

    const logoSrc = entity.logo || "";
    form.innerHTML = `
      <div class="nf-admin-product-layout">
        <div class="nf-admin-product-left">
          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">Медиа</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-image-preview-wrap nf-admin-product-image-wrap">
                <img src="${nfEscapeHtml(logoSrc || "")}" alt="" class="nf-admin-image-preview" data-admin-preview="logo" />
                <div class="nf-admin-image-fields">
                  <label class="nf-admin-image-label">
                    <span>Логотип партнёра</span>
                    <div class="nf-admin-file">
                      <span class="nf-admin-file-label">Выберите файл</span>
                      <input type="file" name="logoFile" class="nf-admin-file-input" accept="image/*" />
                    </div>
                    <input type="hidden" name="logo" value="${nfEscapeHtml(logoSrc)}" />
                    <span class="nf-admin-image-hint">PNG/JPG до 5&nbsp;МБ, загрузится автоматически</span>
                  </label>
                  <button type="button" class="nf-admin-image-clear" data-admin-clear-image="logo">Удалить логотип</button>
                  <div class="nf-admin-image-upload-status" aria-live="polite"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="nf-admin-product-right">
          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">Основная информация</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-product-split">
                <div>
                  <label>ID партнёра
                    <input name="id" class="nf-input" value="${nfEscapeHtml(entity.id || "")}" ${id ? "readonly" : ""} />
                  </label>
                  <label>Название компании
                    <input name="name" class="nf-input" value="${nfEscapeHtml(entity.name || "")}" />
                  </label>
                  <label>Страна
                    <input name="country" class="nf-input" value="${nfEscapeHtml(entity.country || "")}" />
                  </label>
                  <label>Город
                    <input name="city" class="nf-input" value="${nfEscapeHtml(entity.city || "")}" />
                  </label>
                  <label>Сайт
                    <input name="website" class="nf-input" value="${nfEscapeHtml(entity.website || "")}" placeholder="https://example.com" />
                  </label>
                </div>
                <div>
                  <label>Оборудование (направления)
                    <input name="equipment" class="nf-input" value="${nfEscapeHtml(entity.equipment || "")}" placeholder="Например: реанимация, радиология" />
                  </label>
                  <label>Лет партнёрства
                    <input name="years" type="number" class="nf-input" value="${nfEscapeHtml(entity.years ?? 0)}" />
                  </label>
                  <label>Порядок сортировки
                    <input name="sortOrder" type="number" class="nf-input" value="${nfEscapeHtml(entity.sortOrder ?? 0)}" />
                  </label>
                  <label class="nf-admin-checkbox">
                    <input name="isHidden" type="checkbox" ${entity.isHidden ? "checked" : ""} />
                    <span>Скрыть партнёра с сайта</span>
                  </label>
                </div>
              </div>

              <label>Описание
                <textarea name="description" class="nf-textarea" rows="3">${nfEscapeHtml(entity.description || "")}</textarea>
              </label>
            </div>
          </div>

          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">SEO</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-product-split">
                <div>
                  <label>Мета-заголовок
                    <input name="metaTitle" class="nf-input" value="${nfEscapeHtml(entity.seo.metaTitle || "")}" />
                  </label>
                  <label>Мета-описание
                    <textarea name="metaDescription" class="nf-textarea" rows="2">${nfEscapeHtml(entity.seo.metaDescription || "")}</textarea>
                  </label>
                </div>
                <div>
                  <label>ЧПУ (адрес страницы)
                    <input name="slug" class="nf-input" value="${nfEscapeHtml(entity.seo.slug || "")}" placeholder="naprimer-ardo-medical" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="nf-admin-product-actions">
            <button type="button" class="nf-btn nf-btn-secondary nf-admin-modal-cancel">Отмена</button>
            <button type="submit" class="nf-btn nf-btn-primary">Сохранить партнёра</button>
          </div>
        </div>
      </div>
    `;

    // Загрузка логотипа партнёра через API и обновление превью
    const logoFileInput = form.querySelector('input[name="logoFile"]');
    const hiddenLogoInput = form.querySelector('input[name="logo"]');
    const logoStatusEl = form.querySelector(".nf-admin-image-upload-status");
    if (logoFileInput && hiddenLogoInput) {
      logoFileInput.addEventListener("change", async () => {
        const file = logoFileInput.files?.[0];
        if (!file) return;
        const fdUpload = new FormData();
        fdUpload.append("file", file);
        if (logoStatusEl) {
          logoStatusEl.textContent = "Загрузка логотипа…";
          logoStatusEl.classList.remove("is-error", "is-success");
        }
        logoFileInput.disabled = true;
        try {
          const res = await fetch(`${base}/api/admin/upload/partner-logo`, {
            method: "POST",
            headers: nfAdminAuthHeaders(),
            body: fdUpload,
          });
          if (res.status === 401) {
            nfAdminOnUnauthorized();
            return;
          }
          if (!res.ok) throw new Error("upload failed");
          const data = await res.json().catch(() => null);
          if (data?.path) {
            const url = String(data.path || "").trim();
            hiddenLogoInput.value = url;
            const previewImg = form.querySelector('[data-admin-preview="logo"]');
            if (previewImg) {
              previewImg.style.display = "block";
              previewImg.src = url;
            }
            if (logoStatusEl) {
              logoStatusEl.textContent = "Логотип загружен";
              logoStatusEl.classList.add("is-success");
            }
          } else {
            throw new Error("no path in response");
          }
        } catch (_e) {
          if (logoStatusEl) {
            logoStatusEl.textContent = "Не удалось загрузить логотип";
            logoStatusEl.classList.add("is-error");
          }
        } finally {
          logoFileInput.disabled = false;
          logoFileInput.value = "";
        }
      });
    }
  } else if (kind === "product") {
    const raw =
      (NF_DATA.products || []).find((p) => String(p.id) === String(id)) || {};

    const baseProduct = {
      id: "",
      name: "",
      article: "",
      model: "",
      categoryId: (NF_DATA.categories || [])[0]?.id || "",
      partnerId: (NF_DATA.partners || [])[0]?.id || "",
      price: null,
      currency: "KZT",
      popular: false,
      isPopular: false,
      isNew: false,
      isHidden: false,
      status: "in_stock",
      sortOrder: 0,
      manufacturer: "",
      shortDesc: "",
      description: "",
      specs: [],
      serviceSteps: [],
      image: "",
      images: [],
      photos: [],
      attributes: [],
      docs: [],
      relatedProductIds: [],
      seo: {
        metaTitle: "",
        metaDescription: "",
        slug: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
      },
    };

    entity = {
      ...baseProduct,
      ...raw,
      seo: { ...baseProduct.seo, ...(raw.seo || {}) },
    };

    const initialImages = nfGetProductImages(entity);
    const catOptions = (NF_DATA.categories || []).filter((c) => !c.parentId)
      .map(
        (c) =>
          `<option value="${nfEscapeHtml(c.id)}" ${c.id === entity.categoryId ? "selected" : ""}>${nfEscapeHtml(c.name)}</option>`
      )
      .join("");
    const partnerOptions = (NF_DATA.partners || [])
      .map(
        (p) =>
          `<option value="${nfEscapeHtml(p.id)}" ${p.id === entity.partnerId ? "selected" : ""}>${nfEscapeHtml(p.name)}</option>`
      )
      .join("");
    const imageSrc = initialImages[0] || "";
    const specsText = Array.isArray(entity.specs) ? entity.specs.join("\n") : "";
    const serviceText = Array.isArray(entity.serviceSteps) ? entity.serviceSteps.join("\n") : "";
    const roomText = Array.isArray(entity.roomRequirements) ? entity.roomRequirements.join("\n") : "";
    const engineeringText = Array.isArray(entity.engineerRequirements)
      ? entity.engineerRequirements.join("\n")
      : "";
    const relatedRaw = Array.isArray(entity.relatedProductIds) ? entity.relatedProductIds.join(", ") : "";

    form.innerHTML = `
      <div class="nf-admin-product-layout">
        <div class="nf-admin-product-left">
          <div class="nf-admin-section">
            <h3 class="nf-admin-section-title">Медиа</h3>
            <div class="nf-admin-image-preview-wrap nf-admin-product-image-wrap">
              <img src="${nfEscapeHtml(imageSrc || "")}" alt="" class="nf-admin-image-preview" data-admin-preview="image" />
              <div class="nf-admin-image-fields">
                <label class="nf-admin-image-label">
                  <span>Фото товара</span>
                  <div class="nf-admin-file">
                    <span class="nf-admin-file-label">Выберите файл</span>
                    <input type="file" name="imageFile" class="nf-admin-file-input" accept="image/*" />
                  </div>
                  <input type="hidden" name="image" value="${nfEscapeHtml(imageSrc)}" />
                  <span class="nf-admin-image-hint">JPG/PNG до 10&nbsp;МБ, загрузится автоматически</span>
                </label>
                <button type="button" class="nf-admin-image-clear" data-admin-clear-image="image">Удалить фото</button>
                <div class="nf-admin-image-upload-status" aria-live="polite"></div>
              </div>
            </div>

            <div class="nf-admin-gallery-block">
              <div class="nf-admin-gallery-head">
                <span>Галерея товара</span>
                <button type="button" class="nf-admin-gallery-add" data-admin-gallery-add>Добавить фото</button>
              </div>
              <p class="nf-admin-gallery-hint">Загруженные изображения появятся в карточке и на странице товара. Первое фото используется как главное.</p>
              <div class="nf-admin-gallery-dropzone" data-admin-gallery-dropzone>Перетащите сюда изображения или нажмите «Добавить фото».</div>
              <div class="nf-admin-gallery-list" data-admin-gallery-list></div>
            </div>
          </div>

          <div class="nf-admin-section">
            <h3 class="nf-admin-section-title">Параметры</h3>
            <div class="nf-admin-product-meta">
              <label>ID товара
                <input name="id" class="nf-input" value="${nfEscapeHtml(entity.id || "")}" ${id ? "readonly" : ""} />
              </label>
              <label>Артикул
                <input name="article" class="nf-input" value="${nfEscapeHtml(entity.article || "")}" placeholder="Автоматически: NF001, NF002…" readonly />
              </label>
              <label>Модель
                <input name="model" class="nf-input" value="${nfEscapeHtml(entity.model || "")}" placeholder="Например: PowerCube" />
              </label>
              <label>Категория
                <select name="categoryId" class="nf-select">${catOptions}</select>
              </label>
              <label>Партнёр
                <select name="partnerId" class="nf-select">${partnerOptions}</select>
              </label>
              <label>Цена
                <input name="price" type="number" class="nf-input" value="${nfEscapeHtml(entity.price ?? "")}" />
              </label>
              <label>Валюта
                <select name="currency" class="nf-select">
                  <option value="KZT" ${entity.currency === "KZT" ? "selected" : ""}>₸ KZT</option>
                  <option value="USD" ${entity.currency === "USD" ? "selected" : ""}>$ USD</option>
                  <option value="EUR" ${entity.currency === "EUR" ? "selected" : ""}>€ EUR</option>
                </select>
              </label>
              <label>Статус
                <select name="status" class="nf-select">
                  <option value="in_stock" ${entity.status === "in_stock" ? "selected" : ""}>В наличии</option>
                  <option value="on_order" ${entity.status === "on_order" ? "selected" : ""}>Под заказ</option>
                  <option value="archived" ${entity.status === "archived" ? "selected" : ""}>Архив</option>
                </select>
              </label>
              <label>Производитель
                <input name="manufacturer" class="nf-input" value="${nfEscapeHtml(entity.manufacturer || "")}" placeholder="Отличается от партнёра, если нужно" />
              </label>
              <label>Порядок сортировки
                <input name="sortOrder" type="number" class="nf-input" value="${nfEscapeHtml(entity.sortOrder ?? 0)}" />
              </label>
            </div>

            <div class="nf-admin-flags">
              <div class="nf-admin-flags-group">
                <label class="nf-admin-checkbox">
                  <input name="popular" type="checkbox" ${entity.popular || entity.isPopular ? "checked" : ""} />
                  <span>Популярный товар</span>
                </label>
                <label class="nf-admin-checkbox">
                  <input name="isNew" type="checkbox" ${entity.isNew ? "checked" : ""} />
                  <span>Новинка</span>
                </label>
                <label class="nf-admin-checkbox">
                  <input name="isHidden" type="checkbox" ${entity.isHidden ? "checked" : ""} />
                  <span>Скрыть с сайта</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="nf-admin-product-right">
          <div class="nf-admin-section">
            <h3 class="nf-admin-section-title">Основная информация</h3>
            <label>Название
              <input name="name" class="nf-input" value="${nfEscapeHtml(entity.name || "")}" />
            </label>
            <label>Краткое описание
              <textarea name="shortDesc" class="nf-textarea" rows="2" placeholder="Короткий текст для карточек и списка">${nfEscapeHtml(entity.shortDesc || "")}</textarea>
            </label>
            <label>Полное описание</label>
            <div class="nf-admin-wysiwyg" data-admin-wysiwyg>
              <div class="nf-admin-wysiwyg-toolbar">
                <button type="button" class="nf-admin-wysiwyg-btn" data-wysiwyg-cmd="bold"><strong>B</strong></button>
                <button type="button" class="nf-admin-wysiwyg-btn" data-wysiwyg-cmd="italic"><em>I</em></button>
                <button type="button" class="nf-admin-wysiwyg-btn" data-wysiwyg-cmd="insertUnorderedList">• Список</button>
              </div>
              <div class="nf-admin-wysiwyg-editor" contenteditable="true"></div>
            </div>
          </div>

          <div class="nf-admin-section">
            <h3 class="nf-admin-section-title">Характеристики</h3>
            <div class="nf-admin-product-split nf-admin-bullets-grid">
              <div class="nf-admin-bullets-group">
                <div class="nf-admin-bullets-label">Технические характеристики</div>
                <div class="nf-admin-bullets-sub">Каждый пункт — отдельная строка</div>
                <div class="nf-admin-bullets-list" data-admin-list="specs"></div>
                <button type="button" class="nf-btn nf-btn-secondary nf-admin-bullets-add" data-admin-list-add="specs">Добавить пункт</button>
              </div>
              <div class="nf-admin-bullets-group">
                <div class="nf-admin-bullets-label">Установка и сервис</div>
                <div class="nf-admin-bullets-sub">Шаги процесса внедрения</div>
                <div class="nf-admin-bullets-list" data-admin-list="service"></div>
                <button type="button" class="nf-btn nf-btn-secondary nf-admin-bullets-add" data-admin-list-add="service">Добавить пункт</button>
              </div>
            </div>
            <div class="nf-admin-product-split nf-admin-bullets-grid">
              <div class="nf-admin-bullets-group">
                <div class="nf-admin-bullets-label">Помещение и условия</div>
                <div class="nf-admin-bullets-sub">Требования к комнате и среде</div>
                <div class="nf-admin-bullets-list" data-admin-list="room"></div>
                <button type="button" class="nf-btn nf-btn-secondary nf-admin-bullets-add" data-admin-list-add="room">Добавить пункт</button>
              </div>
              <div class="nf-admin-bullets-group">
                <div class="nf-admin-bullets-label">Инженерные коммуникации</div>
                <div class="nf-admin-bullets-sub">Электрика, сети, вентиляция и т.д.</div>
                <div class="nf-admin-bullets-list" data-admin-list="engineering"></div>
                <button type="button" class="nf-btn nf-btn-secondary nf-admin-bullets-add" data-admin-list-add="engineering">Добавить пункт</button>
              </div>
            </div>

            <div class="nf-admin-product-split">
              <div>
                <label>Характеристики (key – value)</label>
                <div data-admin-attrs-list></div>
                <button type="button" class="nf-btn nf-btn-secondary" data-admin-attrs-add>Добавить характеристику</button>
              </div>
              <div>
                <label>Документация (PDF)</label>
                <div data-admin-docs-list></div>
                <button type="button" class="nf-btn nf-btn-secondary" data-admin-docs-add>Добавить документ</button>
                <input type="file" accept="application/pdf" hidden data-admin-docs-file-input />
              </div>
            </div>
          </div>

          <div class="nf-admin-section">
            <h3 class="nf-admin-section-title">SEO</h3>
            <div class="nf-admin-product-split">
              <div>
                <label>Мета-заголовок
                  <input name="metaTitle" class="nf-input" value="${nfEscapeHtml(entity.seo.metaTitle || "")}" />
                </label>
                <label>Мета-описание
                  <textarea name="metaDescription" class="nf-textarea" rows="2">${nfEscapeHtml(entity.seo.metaDescription || "")}</textarea>
                </label>
                <label>ЧПУ (адрес страницы)
                  <input name="slug" class="nf-input" value="${nfEscapeHtml(entity.seo.slug || "")}" placeholder="naprimer-apparat-ivl-neo" />
                </label>
              </div>
              <div>
                <label>OpenGraph заголовок
                  <input name="ogTitle" class="nf-input" value="${nfEscapeHtml(entity.seo.ogTitle || "")}" />
                </label>
                <label>OpenGraph описание
                  <textarea name="ogDescription" class="nf-textarea" rows="2">${nfEscapeHtml(entity.seo.ogDescription || "")}</textarea>
                </label>
                <label>Связанные товары (ID через запятую)
                  <textarea name="related" class="nf-textarea" rows="2" placeholder="ardo-ncpap, fujifilm-fdr-go">${nfEscapeHtml(relatedRaw)}</textarea>
                </label>
              </div>
            </div>
          </div>

          <div class="nf-admin-product-actions">
            <button type="button" class="nf-btn nf-btn-secondary nf-admin-modal-cancel">Отмена</button>
            <button type="submit" class="nf-btn nf-btn-primary">Сохранить товар</button>
          </div>
        </div>
      </div>
    `;

    // состояние галереи
    const galleryListEl = form.querySelector("[data-admin-gallery-list]");
    const galleryAddBtn = form.querySelector("[data-admin-gallery-add]");
    const galleryInput = document.createElement("input");
    galleryInput.type = "file";
    galleryInput.accept = "image/*";
    galleryInput.multiple = true;
    galleryInput.hidden = true;
    form.appendChild(galleryInput);
    const galleryDropzone = form.querySelector("[data-admin-gallery-dropzone]");
    const hiddenImage = form.querySelector('input[name="image"]');
    const previewImg = form.querySelector('[data-admin-preview="image"]');

    const existingPhotos = Array.isArray(entity.photos) ? entity.photos : [];
    const galleryState = {
      items: initialImages.map((url, index) => {
        const existing = existingPhotos.find((p) => String(p.url || "") === String(url));
        return {
          id: existing?.id || `ph-${Date.now().toString(36)}-${index}`,
          url,
          isMain: existing ? !!existing.isMain : index === 0,
          order: typeof existing?.order === "number" ? existing.order : index,
        };
      }),
    };

    let dragIndex = null;

    const renderGallery = () => {
      if (!galleryListEl) return;
      galleryListEl.innerHTML = "";
      if (!galleryState.items.length) {
        const empty = document.createElement("div");
        empty.className = "nf-admin-gallery-empty";
        empty.textContent = "Пока нет дополнительных фото.";
        galleryListEl.appendChild(empty);
        return;
      }

      galleryState.items.forEach((itemData, idx) => {
        const wrap = document.createElement("div");
        wrap.className = "nf-admin-gallery-item";
        wrap.draggable = true;

        wrap.addEventListener("dragstart", (e) => {
          dragIndex = idx;
          try {
            e.dataTransfer.effectAllowed = "move";
          } catch (_) {}
        });

        wrap.addEventListener("dragover", (e) => {
          e.preventDefault();
        });

        wrap.addEventListener("drop", (e) => {
          e.preventDefault();
          if (dragIndex === null || dragIndex === idx) return;
          const [moved] = galleryState.items.splice(dragIndex, 1);
          galleryState.items.splice(idx, 0, moved);
          dragIndex = null;
          // пересчёт порядка
          galleryState.items.forEach((it, orderIdx) => {
            it.order = orderIdx;
          });
          renderGallery();
        });

        const imgEl = document.createElement("img");
        imgEl.src = itemData.url;
        imgEl.alt = entity.name || "Фото товара";
        imgEl.loading = "lazy";

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "nf-admin-gallery-remove";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => {
          galleryState.items.splice(idx, 1);
          if (!galleryState.items.some((x) => x.isMain) && galleryState.items[0]) {
            galleryState.items[0].isMain = true;
          }
          renderGallery();
        });

        const mainBtn = document.createElement("button");
        mainBtn.type = "button";
        mainBtn.className =
          "nf-admin-gallery-main" + (itemData.isMain ? " is-active" : "");
        mainBtn.textContent = itemData.isMain ? "Главное фото" : "Сделать главным";
        mainBtn.addEventListener("click", () => {
          galleryState.items.forEach((it, i) => {
            it.isMain = i === idx;
          });
          const [mainItem] = galleryState.items.splice(idx, 1);
          galleryState.items.unshift(mainItem);
          galleryState.items.forEach((it, orderIdx) => {
            it.order = orderIdx;
          });
          if (hiddenImage) hiddenImage.value = mainItem.url;
          if (previewImg) {
            previewImg.style.display = "block";
            previewImg.src = mainItem.url;
          }
          renderGallery();
        });

        wrap.append(imgEl, delBtn, mainBtn);
        galleryListEl.appendChild(wrap);
      });
    };

    renderGallery();

    const uploadFilesToGallery = async (files) => {
      const fileList = Array.from(files || []);
      if (!fileList.length) return;
      for (const file of fileList) {
        const fdUpload = new FormData();
        fdUpload.append("file", file);
        try {
          const res = await fetch(`${base}/api/admin/upload/product-image`, {
            method: "POST",
            headers: nfAdminAuthHeaders(),
            body: fdUpload,
          });
          if (res.status === 401) {
            nfAdminOnUnauthorized();
            return;
          }
          if (!res.ok) continue;
          const data = await res.json().catch(() => null);
          if (data?.path) {
            const url = data.path;
            galleryState.items.push({
              id: `ph-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
              url,
              isMain: !galleryState.items.length,
              order: galleryState.items.length,
            });
          }
        } catch (_e) {
          // игнорируем отдельные ошибки
        }
      }
      if (galleryState.items.length) {
        // гарантируем, что есть главное фото
        if (!galleryState.items.some((x) => x.isMain)) {
          galleryState.items[0].isMain = true;
        }
        const mainItem = galleryState.items[0];
        if (hiddenImage) hiddenImage.value = mainItem.url;
        if (previewImg) {
          previewImg.style.display = "block";
          previewImg.src = mainItem.url;
        }
      }
      renderGallery();
    };

    if (galleryAddBtn) {
      galleryAddBtn.addEventListener("click", () => galleryInput.click());
    }

    galleryInput.addEventListener("change", async () => {
      if (!galleryInput.files || !galleryInput.files.length) return;
      await uploadFilesToGallery(galleryInput.files);
      galleryInput.value = "";
    });

    if (galleryDropzone) {
      ["dragenter", "dragover"].forEach((evt) => {
        galleryDropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          galleryDropzone.classList.add("is-drag-over");
        });
      });
      ["dragleave", "drop"].forEach((evt) => {
        galleryDropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          if (evt === "drop") {
            const dt = e.dataTransfer;
            if (dt && dt.files && dt.files.length) {
              uploadFilesToGallery(dt.files);
            }
          }
          galleryDropzone.classList.remove("is-drag-over");
        });
      });
    }

    // загрузка основного фото товара через API
    const fileInput = form.querySelector('input[name="imageFile"]');
    const statusEl = form.querySelector(".nf-admin-image-upload-status");
    if (fileInput && hiddenImage) {
      fileInput.addEventListener("change", async () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        const fdUpload = new FormData();
        fdUpload.append("file", file);
        if (statusEl) {
          statusEl.textContent = "Загрузка фото…";
          statusEl.classList.remove("is-error", "is-success");
        }
        fileInput.disabled = true;
        try {
          const res = await fetch(`${base}/api/admin/upload/product-image`, {
            method: "POST",
            headers: nfAdminAuthHeaders(),
            body: fdUpload,
          });
          if (res.status === 401) {
            nfAdminOnUnauthorized();
            return;
          }
          if (!res.ok) throw new Error("upload failed");
          const data = await res.json();
          if (data?.path) {
            hiddenImage.value = data.path;
            if (previewImg) {
              previewImg.style.display = "block";
              previewImg.src = data.path;
            }
            // добавляем/обновляем основное фото в галерее
            const existingMainIndex = galleryState.items.findIndex((x) => x.isMain);
            if (existingMainIndex >= 0) {
              galleryState.items[existingMainIndex].url = data.path;
            } else {
              galleryState.items.unshift({
                id: `ph-${Date.now().toString(36)}-main`,
                url: data.path,
                isMain: true,
                order: 0,
              });
            }
            galleryState.items.forEach((it, orderIdx) => {
              it.order = orderIdx;
            });
            renderGallery();
            if (statusEl) {
              statusEl.textContent = "Фото загружено";
              statusEl.classList.add("is-success");
            }
          } else {
            throw new Error("no path in response");
          }
        } catch (_e) {
          if (statusEl) {
            statusEl.textContent = "Не удалось загрузить фото";
            statusEl.classList.add("is-error");
          }
        } finally {
          fileInput.disabled = false;
        }
      });
    }

    // инициализация WYSIWYG
    const wysiwyg = form.querySelector("[data-admin-wysiwyg]");
    const wysiwygEditor = wysiwyg?.querySelector(".nf-admin-wysiwyg-editor");
    if (wysiwygEditor) {
      wysiwygEditor.innerHTML = entity.description || "";
      wysiwyg
        .querySelectorAll(".nf-admin-wysiwyg-btn")
        .forEach((btn) => {
          btn.addEventListener("click", () => {
            const cmd = btn.getAttribute("data-wysiwyg-cmd");
            if (!cmd) return;
            try {
              document.execCommand(cmd, false);
            } catch (_) {}
            wysiwygEditor.focus();
          });
        });
    }

    // динамические характеристики
    const attrsListEl = form.querySelector("[data-admin-attrs-list]");
    const attrsAddBtn = form.querySelector("[data-admin-attrs-add]");
    const attrsState = Array.isArray(entity.attributes)
      ? entity.attributes.map((a) => ({ ...a }))
      : [];

    const renderAttrs = () => {
      if (!attrsListEl) return;
      attrsListEl.innerHTML = "";
      if (!attrsState.length) {
        const empty = document.createElement("div");
        empty.className = "nf-admin-gallery-empty";
        empty.textContent = "Пока нет характеристик.";
        attrsListEl.appendChild(empty);
        return;
      }
      attrsState.forEach((attr, idx) => {
        const row = document.createElement("div");
        row.style.display = "grid";
        row.style.gridTemplateColumns = "1fr 1fr auto";
        row.style.gap = "4px";
        row.style.marginBottom = "4px";

        const keyInput = document.createElement("input");
        keyInput.className = "nf-input";
        keyInput.placeholder = "Название параметра";
        keyInput.value = attr.key || "";
        keyInput.addEventListener("input", () => {
          attr.key = keyInput.value;
        });

        const valInput = document.createElement("input");
        valInput.className = "nf-input";
        valInput.placeholder = "Значение";
        valInput.value = attr.value || "";
        valInput.addEventListener("input", () => {
          attr.value = valInput.value;
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "nf-admin-gallery-remove";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => {
          attrsState.splice(idx, 1);
          renderAttrs();
        });

        row.append(keyInput, valInput, delBtn);
        attrsListEl.appendChild(row);
      });
    };

    renderAttrs();

    if (attrsAddBtn) {
      attrsAddBtn.addEventListener("click", () => {
        attrsState.push({
          id: `attr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          key: "",
          value: "",
          order: attrsState.length,
        });
        renderAttrs();
      });
    }

    // динамические списки-пункты (характеристики, установка, помещение, коммуникации)
    const specsListEl = form.querySelector('[data-admin-list="specs"]');
    const specsAddBtn = form.querySelector('[data-admin-list-add="specs"]');
    const serviceListEl = form.querySelector('[data-admin-list="service"]');
    const serviceAddBtn = form.querySelector('[data-admin-list-add="service"]');
    const roomListEl = form.querySelector('[data-admin-list="room"]');
    const roomAddBtn = form.querySelector('[data-admin-list-add="room"]');
    const engineeringListEl = form.querySelector('[data-admin-list="engineering"]');
    const engineeringAddBtn = form.querySelector('[data-admin-list-add="engineering"]');

    const specsState = Array.isArray(entity.specs) ? entity.specs.slice() : [];
    const serviceState = Array.isArray(entity.serviceSteps) ? entity.serviceSteps.slice() : [];

    const roomDefaults = [
      "Температура: +18°C до +25°C",
      "Влажность: 30–75% без конденсата",
      "Площадь: от 15 м²",
      "Высота потолков: от 2,5 м",
    ];
    const engineerDefaults = [
      "Электропитание: 220В / 50Гц",
      "Заземление",
      "Интернет‑подключение (по необходимости)",
      "Вентиляция помещения",
    ];

    const roomState = Array.isArray(entity.roomRequirements) && entity.roomRequirements.length
      ? entity.roomRequirements.slice()
      : roomDefaults.slice();
    const engineeringState =
      Array.isArray(entity.engineerRequirements) && entity.engineerRequirements.length
        ? entity.engineerRequirements.slice()
        : engineerDefaults.slice();

    const renderBulletList = (container, state, emptyLabel) => {
      if (!container) return;
      container.innerHTML = "";
      if (!state.length) {
        const empty = document.createElement("div");
        empty.className = "nf-admin-gallery-empty";
        empty.textContent = emptyLabel;
        container.appendChild(empty);
        return;
      }
      state.forEach((val, idx) => {
        const row = document.createElement("div");
        row.className = "nf-admin-bullets-row";

        const input = document.createElement("input");
        input.className = "nf-input nf-admin-bullets-input";
        input.placeholder = "Текст пункта";
        input.value = val || "";
        input.addEventListener("input", () => {
          state[idx] = input.value;
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "nf-admin-bullets-remove";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => {
          state.splice(idx, 1);
          renderBulletList(container, state, emptyLabel);
        });

        row.appendChild(input);
        row.appendChild(delBtn);
        container.appendChild(row);
      });
    };

    renderBulletList(specsListEl, specsState, "Пока нет пунктов.");
    renderBulletList(serviceListEl, serviceState, "Пока нет пунктов.");
    renderBulletList(roomListEl, roomState, "Пока нет пунктов.");
    renderBulletList(engineeringListEl, engineeringState, "Пока нет пунктов.");

    if (specsAddBtn && specsListEl) {
      specsAddBtn.addEventListener("click", () => {
        specsState.push("");
        renderBulletList(specsListEl, specsState, "Пока нет пунктов.");
      });
    }
    if (serviceAddBtn && serviceListEl) {
      serviceAddBtn.addEventListener("click", () => {
        serviceState.push("");
        renderBulletList(serviceListEl, serviceState, "Пока нет пунктов.");
      });
    }
    if (roomAddBtn && roomListEl) {
      roomAddBtn.addEventListener("click", () => {
        roomState.push("");
        renderBulletList(roomListEl, roomState, "Пока нет пунктов.");
      });
    }
    if (engineeringAddBtn && engineeringListEl) {
      engineeringAddBtn.addEventListener("click", () => {
        engineeringState.push("");
        renderBulletList(engineeringListEl, engineeringState, "Пока нет пунктов.");
      });
    }

    form.__nfSpecsState = specsState;
    form.__nfServiceState = serviceState;
    form.__nfRoomState = roomState;
    form.__nfEngineerState = engineeringState;

    // динамические документы
    const docsListEl = form.querySelector("[data-admin-docs-list]");
    const docsAddBtn = form.querySelector("[data-admin-docs-add]");
    const docsFileInput = form.querySelector("[data-admin-docs-file-input]");
    const docsState = Array.isArray(entity.docs)
      ? entity.docs.map((d) => ({ ...d }))
      : [];

    const renderDocs = () => {
      if (!docsListEl) return;
      docsListEl.innerHTML = "";
      if (!docsState.length) {
        const empty = document.createElement("div");
        empty.className = "nf-admin-gallery-empty";
        empty.textContent = "Документация пока не добавлена.";
        docsListEl.appendChild(empty);
        return;
      }
      docsState.forEach((doc, idx) => {
        const row = document.createElement("div");
        row.style.display = "grid";
        row.style.gridTemplateColumns = "minmax(0, 1.2fr) minmax(0, 1.2fr) auto auto";
        row.style.gap = "4px";
        row.style.marginBottom = "4px";

        const titleInput = document.createElement("input");
        titleInput.className = "nf-input";
        titleInput.placeholder = "Название документа";
        titleInput.value = doc.title || "";
        titleInput.addEventListener("input", () => {
          doc.title = titleInput.value;
        });

        const urlInput = document.createElement("input");
        urlInput.className = "nf-input";
        urlInput.placeholder = "/uploads/docs/filename.pdf";
        urlInput.value = doc.url || "";
        urlInput.addEventListener("input", () => {
          doc.url = urlInput.value;
        });

        const uploadBtn = document.createElement("button");
        uploadBtn.type = "button";
        uploadBtn.className = "nf-btn nf-btn-secondary";
        uploadBtn.textContent = "Загрузить PDF";
        uploadBtn.addEventListener("click", () => {
          docsFileInput.__nfDocIndex = idx;
          docsFileInput.click();
        });

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "nf-admin-gallery-remove";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => {
          docsState.splice(idx, 1);
          renderDocs();
        });

        row.append(titleInput, urlInput, uploadBtn, delBtn);
        docsListEl.appendChild(row);
      });
    };

    renderDocs();

    if (docsAddBtn) {
      docsAddBtn.addEventListener("click", () => {
        docsState.push({
          id: `doc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          type: "manual",
          title: "",
          url: "",
          order: docsState.length,
        });
        renderDocs();
      });
    }

    if (docsFileInput) {
      docsFileInput.addEventListener("change", async () => {
        const idx = docsFileInput.__nfDocIndex;
        const file = docsFileInput.files?.[0];
        docsFileInput.__nfDocIndex = undefined;
        if (!file || typeof idx !== "number" || !docsState[idx]) {
          docsFileInput.value = "";
          return;
        }
        const fdUpload = new FormData();
        fdUpload.append("file", file);
        try {
          const res = await fetch(`${base}/api/admin/upload/product-doc`, {
            method: "POST",
            headers: nfAdminAuthHeaders(),
            body: fdUpload,
          });
          if (res.status === 401) {
            nfAdminOnUnauthorized();
            return;
          }
          if (!res.ok) throw new Error("upload failed");
          const data = await res.json().catch(() => null);
          if (data?.path) {
            docsState[idx].url = data.path;
            if (!docsState[idx].title) {
              docsState[idx].title = file.name;
            }
            renderDocs();
          }
        } catch (_e) {
          nfShowToast("Не удалось загрузить документ");
        } finally {
          docsFileInput.value = "";
        }
      });
    }

    // сохраняем ссылку на состояния для использования в onsubmit
    form.__nfGalleryState = galleryState;
    form.__nfAttrsState = attrsState;
    form.__nfDocsState = docsState;
    form.__nfWysiwygEditor = wysiwygEditor;
  } else if (kind === "news") {
    const raw =
      (NF_DATA.news || []).find((n) => String(n.id) === String(id)) || {};

    const baseNews = {
      id: "",
      title: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
      author: "",
      excerpt: "",
      content: [],
      image: "",
      images: [],
      isHidden: false,
      sortOrder: 0,
      seo: {
        metaTitle: "",
        metaDescription: "",
        slug: "",
      },
    };

    entity = {
      ...baseNews,
      ...raw,
      seo: { ...baseNews.seo, ...(raw.seo || {}) },
    };

    const contentText = (entity.content || []).join("\n\n");
    const newsGalleryState = {
      items: Array.isArray(entity.images) ? entity.images.slice() : [],
    };
    const primaryImage = entity.image || newsGalleryState.items[0] || "";

    form.innerHTML = `
      <div class="nf-admin-product-layout">
        <div class="nf-admin-product-left">
          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">Медиа</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-image-preview-wrap nf-admin-product-image-wrap">
                <img src="${nfEscapeHtml(primaryImage || "")}" alt="" class="nf-admin-image-preview" data-admin-preview="image" />
                <div class="nf-admin-image-fields">
                  <label class="nf-admin-image-label">
                    <span>Обложка новости</span>
                    <div class="nf-admin-file">
                      <span class="nf-admin-file-label">Выберите файл</span>
                      <input type="file" name="newsCoverFile" class="nf-admin-file-input" accept="image/*" />
                    </div>
                    <input type="hidden" name="image" value="${nfEscapeHtml(primaryImage)}" />
                    <span class="nf-admin-image-hint">JPG/PNG до 10&nbsp;МБ, не обязательно</span>
                  </label>
                  <button type="button" class="nf-admin-image-clear" data-admin-clear-image="image">Удалить фото</button>
                  <div class="nf-admin-image-upload-status" aria-live="polite"></div>
                </div>
              </div>

              <div class="nf-admin-gallery-block">
                <div class="nf-admin-gallery-head">
                  <span>Галерея иллюстраций</span>
                  <button type="button" class="nf-admin-gallery-add" data-admin-news-gallery-add>Добавить фото</button>
                </div>
                <p class="nf-admin-gallery-hint">Фотографии для карточек и детальной новости. Необязательно.</p>
                <div class="nf-admin-gallery-dropzone" data-admin-news-gallery-dropzone>Перетащите изображения сюда или нажмите «Добавить фото».</div>
                <div class="nf-admin-gallery-list" data-admin-news-gallery-list></div>
              </div>
            </div>
          </div>
        </div>

        <div class="nf-admin-product-right">
          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">Основная информация</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-product-split">
                <div>
                  <label>ID новости
                    <input name="id" class="nf-input" value="${nfEscapeHtml(entity.id || "")}" ${id ? "readonly" : ""} />
                  </label>
                  <label>Заголовок
                    <input name="title" class="nf-input" value="${nfEscapeHtml(entity.title || "")}" />
                  </label>
                  <label>Категория (тип)
                    <input name="category" class="nf-input" value="${nfEscapeHtml(entity.category || "")}" />
                  </label>
                  <label>Дата
                    <input name="date" type="date" class="nf-input" value="${nfEscapeHtml(entity.date || new Date().toISOString().slice(0, 10))}" />
                  </label>
                  <label>Автор
                    <input name="author" class="nf-input" value="${nfEscapeHtml(entity.author || "")}" />
                  </label>
                  <label>Порядок сортировки
                    <input name="sortOrder" type="number" class="nf-input" value="${nfEscapeHtml(entity.sortOrder ?? 0)}" />
                  </label>
                  <label class="nf-admin-checkbox">
                    <input name="isHidden" type="checkbox" ${entity.isHidden ? "checked" : ""} />
                    <span>Скрыть новость с сайта</span>
                  </label>
                </div>
                <div>
                  <label>Краткое описание
                    <textarea name="excerpt" class="nf-textarea" rows="3">${nfEscapeHtml(entity.excerpt || "")}</textarea>
                  </label>
                  <label>Текст новости (каждый абзац с новой строки)
                    <textarea name="content" class="nf-textarea" rows="8">${nfEscapeHtml(contentText)}</textarea>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="nf-admin-section">
            <button type="button" class="nf-admin-section-header" data-admin-section-toggle aria-expanded="true">
              <span class="nf-admin-section-chevron" aria-hidden="true"></span>
              <span class="nf-admin-section-title">SEO</span>
            </button>
            <div class="nf-admin-section-body">
              <div class="nf-admin-product-split">
                <div>
                  <label>Мета-заголовок
                    <input name="metaTitle" class="nf-input" value="${nfEscapeHtml(entity.seo.metaTitle || "")}" />
                  </label>
                  <label>Мета-описание
                    <textarea name="metaDescription" class="nf-textarea" rows="2">${nfEscapeHtml(entity.seo.metaDescription || "")}</textarea>
                  </label>
                </div>
                <div>
                  <label>ЧПУ (адрес страницы)
                    <input name="slug" class="nf-input" value="${nfEscapeHtml(entity.seo.slug || "")}" placeholder="naprimer-lab-automation" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="nf-admin-product-actions">
            <button type="button" class="nf-btn nf-btn-secondary nf-admin-modal-cancel">Отмена</button>
            <button type="submit" class="nf-btn nf-btn-primary">Сохранить новость</button>
          </div>
        </div>
      </div>
    `;

    // сохраняем состояние галереи для последующего сохранения
    form.__nfNewsGalleryState = newsGalleryState;

    const coverFileInput = form.querySelector('input[name="newsCoverFile"]');
    const hiddenCoverInput = form.querySelector('input[name="image"]');
    const coverPreviewImg = form.querySelector('[data-admin-preview="image"]');
    const coverStatusEl = form.querySelector(".nf-admin-image-upload-status");

    const renderNewsGallery = () => {
      const listEl = form.querySelector("[data-admin-news-gallery-list]");
      if (!listEl) return;
      listEl.innerHTML = "";
      if (!newsGalleryState.items.length) {
        const empty = document.createElement("div");
        empty.className = "nf-admin-gallery-empty";
        empty.textContent = "Пока нет изображений.";
        listEl.appendChild(empty);
        return;
      }
      newsGalleryState.items.forEach((url, index) => {
        const item = document.createElement("div");
        item.className = "nf-admin-gallery-item";
        item.innerHTML = `
          <div class="nf-admin-gallery-thumb-wrap">
            <img src="${nfEscapeHtml(url)}" alt="" class="nf-admin-gallery-thumb" />
          </div>
          <button type="button" class="nf-admin-gallery-remove" aria-label="Удалить фото">×</button>
        `;
        const removeBtn = item.querySelector(".nf-admin-gallery-remove");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            newsGalleryState.items.splice(index, 1);
            renderNewsGallery();
          });
        }
        listEl.appendChild(item);
      });
    };

    const applyCover = (url) => {
      const v = String(url || "").trim();
      if (!v) return;
      if (hiddenCoverInput) hiddenCoverInput.value = v;
      if (coverPreviewImg) {
        coverPreviewImg.style.display = "block";
        coverPreviewImg.src = v;
      }
      // обложка всегда первая в списке изображений
      newsGalleryState.items = [v].concat(newsGalleryState.items.filter((x) => x !== v));
      renderNewsGallery();
    };

    if (coverFileInput && hiddenCoverInput) {
      coverFileInput.addEventListener("change", async () => {
        const file = coverFileInput.files?.[0];
        if (!file) return;
        const fdUpload = new FormData();
        fdUpload.append("file", file);
        if (coverStatusEl) {
          coverStatusEl.textContent = "Загрузка фото…";
          coverStatusEl.classList.remove("is-error", "is-success");
        }
        coverFileInput.disabled = true;
        try {
          const res = await fetch(`${base}/api/admin/upload/news-image`, {
            method: "POST",
            headers: nfAdminAuthHeaders(),
            body: fdUpload,
          });
          if (res.status === 401) {
            nfAdminOnUnauthorized();
            return;
          }
          if (!res.ok) throw new Error("upload failed");
          const data = await res.json().catch(() => null);
          if (data?.path) {
            applyCover(data.path);
            if (coverStatusEl) {
              coverStatusEl.textContent = "Фото загружено";
              coverStatusEl.classList.add("is-success");
            }
          } else {
            throw new Error("no path in response");
          }
        } catch (_e) {
          if (coverStatusEl) {
            coverStatusEl.textContent = "Не удалось загрузить фото";
            coverStatusEl.classList.add("is-error");
          }
        } finally {
          coverFileInput.disabled = false;
          coverFileInput.value = "";
        }
      });
    }

    // Галерея новостей (дополнительные изображения)
    const galleryListEl = form.querySelector("[data-admin-news-gallery-list]");
    const galleryDropzone = form.querySelector("[data-admin-news-gallery-dropzone]");
    const galleryAddBtn = form.querySelector("[data-admin-news-gallery-add]");

    const galleryInput = document.createElement("input");
    galleryInput.type = "file";
    galleryInput.accept = "image/*";
    galleryInput.multiple = true;
    galleryInput.style.display = "none";
    form.appendChild(galleryInput);

    const uploadNewsFilesToGallery = async (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;
      for (const file of files) {
        const fdUpload = new FormData();
        fdUpload.append("file", file);
        try {
          const res = await fetch(`${base}/api/admin/upload/news-image`, {
            method: "POST",
            headers: nfAdminAuthHeaders(),
            body: fdUpload,
          });
          if (res.status === 401) {
            nfAdminOnUnauthorized();
            return;
          }
          if (!res.ok) continue;
          const data = await res.json().catch(() => null);
          if (data?.path) {
            const url = String(data.path || "").trim();
            if (url && !newsGalleryState.items.includes(url)) {
              newsGalleryState.items.push(url);
            }
          }
        } catch (_e) {
          // игнорируем отдельные ошибки загрузки отдельных файлов
        }
      }
      renderNewsGallery();
    };

    if (galleryAddBtn) {
      galleryAddBtn.addEventListener("click", () => galleryInput.click());
    }

    galleryInput.addEventListener("change", async () => {
      if (!galleryInput.files || !galleryInput.files.length) return;
      await uploadNewsFilesToGallery(galleryInput.files);
      galleryInput.value = "";
    });

    if (galleryDropzone) {
      ["dragenter", "dragover"].forEach((evt) => {
        galleryDropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          galleryDropzone.classList.add("is-drag-over");
        });
      });
      ["dragleave", "drop"].forEach((evt) => {
        galleryDropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          if (evt === "drop") {
            const dt = e.dataTransfer;
            if (dt && dt.files && dt.files.length) {
              uploadNewsFilesToGallery(dt.files);
            }
          }
          galleryDropzone.classList.remove("is-drag-over");
        });
      });
    }

    // начальный рендер галереи, если уже есть изображения
    renderNewsGallery();
  }

  const cancelBtn = modal.querySelector(".nf-admin-modal-cancel");
  if (cancelBtn) cancelBtn.onclick = close;

  // collapsible sections UI (не влияет на данные)
  form.querySelectorAll("[data-admin-section-toggle]").forEach((btn) => {
    const section = btn.closest(".nf-admin-section");
    if (!section) return;
    btn.addEventListener("click", () => {
      const collapsed = section.classList.toggle("is-collapsed");
      btn.setAttribute("aria-expanded", String(!collapsed));
    });
  });

  form.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    if (kind === "category") {
      const newId = String(fd.get("id") || "").trim() || (entity.id || `cat-${Date.now()}`);
      const obj = {
        id: newId,
        name: String(fd.get("name") || "").trim() || "Без названия",
        description: String(fd.get("description") || "").trim(),
        count: Number(fd.get("count") || 0),
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : entity.sortOrder || 0,
        isHidden: fd.get("isHidden") === "on",
        seo: {
          metaTitle: String(fd.get("metaTitle") || "").trim(),
          metaDescription: String(fd.get("metaDescription") || "").trim(),
          slug: String(fd.get("slug") || "").trim(),
        },
      };
      const list = NF_DATA.categories || [];
      const idx = list.findIndex((c) => String(c.id) === String(entity.id));
      if (idx >= 0) list[idx] = obj;
      else list.push(obj);
      NF_DATA.categories = list;
      try {
        await nfAdminSaveCategories(base);
        nfRenderAdmin();
        nfShowToast("Категория сохранена.");
        nfAdminShowStatus("Изменения сохранены", "success");
        close();
      } catch (_) {
        nfShowToast("Ошибка сохранения категорий.");
        nfAdminShowStatus("Ошибка сохранения категорий", "error");
      }
    } else if (kind === "partner") {
      const newId = String(fd.get("id") || "").trim() || (entity.id || `p-${Date.now()}`);
      const obj = {
        id: newId,
        name: String(fd.get("name") || "").trim() || "Партнёр",
        country: String(fd.get("country") || "").trim(),
        city: String(fd.get("city") || "").trim(),
        equipment: String(fd.get("equipment") || "").trim(),
        years: Number(fd.get("years") || 0),
        website: String(fd.get("website") || "").trim(),
        description: String(fd.get("description") || "").trim(),
        logo: String(fd.get("logo") || "").trim() || "",
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : entity.sortOrder || 0,
        isHidden: fd.get("isHidden") === "on",
        countProducts: entity.countProducts ?? 0,
        seo: {
          metaTitle: String(fd.get("metaTitle") || "").trim(),
          metaDescription: String(fd.get("metaDescription") || "").trim(),
          slug: String(fd.get("slug") || "").trim(),
        },
      };
      const list = NF_DATA.partners || [];
      const idx = list.findIndex((p) => String(p.id) === String(entity.id));
      if (idx >= 0) list[idx] = obj;
      else list.push(obj);
      NF_DATA.partners = list;
      try {
        await nfAdminSavePartners(base);
        nfRenderAdmin();
        nfShowToast("Партнёр сохранён.");
        nfAdminShowStatus("Изменения сохранены", "success");
        close();
      } catch (_) {
        nfShowToast("Ошибка сохранения партнёров.");
        nfAdminShowStatus("Ошибка сохранения партнёров", "error");
      }
    } else if (kind === "product") {
      const newId = String(fd.get("id") || "").trim() || (entity.id || `prod-${Date.now()}`);
      const specsState =
        Array.isArray(form.__nfSpecsState) && form.__nfSpecsState.length
          ? form.__nfSpecsState
          : null;
      const serviceState =
        Array.isArray(form.__nfServiceState) && form.__nfServiceState.length
          ? form.__nfServiceState
          : null;
      const roomState =
        Array.isArray(form.__nfRoomState) && form.__nfRoomState.length
          ? form.__nfRoomState
          : null;
      const engineerState =
        Array.isArray(form.__nfEngineerState) && form.__nfEngineerState.length
          ? form.__nfEngineerState
          : null;

      const specsRaw = String(fd.get("specsText") || "");
      const specs =
        (specsState || specsRaw
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean)) || [];
      const serviceRaw = String(fd.get("serviceText") || "");
      const serviceSteps =
        (serviceState || serviceRaw
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean)) || [];
      const roomRaw = String(fd.get("roomText") || "");
      const roomRequirements =
        (roomState || roomRaw
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean)) || [];
      const engineeringRaw = String(fd.get("engineeringText") || "");
      const engineerRequirements =
        (engineerState || engineeringRaw
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean)) || [];

      const galleryState = form.__nfGalleryState || { items: [] };
      const attrsState = form.__nfAttrsState || [];
      const docsState = form.__nfDocsState || [];
      const wysiwygEditor = form.__nfWysiwygEditor;

      let photos = Array.isArray(galleryState.items) ? galleryState.items.slice() : [];
      photos = photos
        .filter((p) => p && p.url)
        .map((p, index) => ({
          id: p.id || `ph-${Date.now().toString(36)}-${index}`,
          url: String(p.url || "").trim(),
          isMain: Boolean(p.isMain) || index === 0,
          order: typeof p.order === "number" ? p.order : index,
        }))
        .filter((p) => p.url);

      photos.sort((a, b) => {
        if (a.isMain && !b.isMain) return -1;
        if (!a.isMain && b.isMain) return 1;
        return (a.order || 0) - (b.order || 0);
      });

      const images = photos.map((p) => p.url);

      let primaryImage = String(fd.get("image") || "").trim();
      if (!primaryImage && photos[0]) primaryImage = photos[0].url;

      const descriptionHtml = wysiwygEditor
        ? String(wysiwygEditor.innerHTML || "").trim()
        : String(fd.get("description") || "").trim();

      const attributes = (Array.isArray(attrsState) ? attrsState : [])
        .map((attr, index) => ({
          id: attr.id || `attr-${Date.now().toString(36)}-${index}`,
          key: String(attr.key || "").trim(),
          value: String(attr.value || "").trim(),
          order: typeof attr.order === "number" ? attr.order : index,
        }))
        .filter((a) => a.key || a.value);

      const docs = (Array.isArray(docsState) ? docsState : [])
        .map((doc, index) => ({
          id: doc.id || `doc-${Date.now().toString(36)}-${index}`,
          type: String(doc.type || "manual"),
          title: String(doc.title || "").trim() || "Документ",
          url: String(doc.url || "").trim(),
          order: typeof doc.order === "number" ? doc.order : index,
        }))
        .filter((d) => d.url);

      const relatedRaw = String(fd.get("related") || "").trim();
      const relatedProductIds = relatedRaw
        ? relatedRaw
            .split(/[,\s]+/)
            .map((v) => v.trim())
            .filter(Boolean)
        : Array.isArray(entity.relatedProductIds)
        ? entity.relatedProductIds
        : [];

      const metaTitle = String(fd.get("metaTitle") || "").trim() || entity.seo?.metaTitle || "";
      const metaDescription =
        String(fd.get("metaDescription") || "").trim() || entity.seo?.metaDescription || "";
      const slug = String(fd.get("slug") || "").trim() || entity.seo?.slug || "";
      const ogTitle = String(fd.get("ogTitle") || "").trim() || metaTitle;
      const ogDescription =
        String(fd.get("ogDescription") || "").trim() || metaDescription;
      const ogImage = photos[0]?.url || entity.seo?.ogImage || primaryImage;

      const seo = {
        metaTitle,
        metaDescription,
        slug,
        ogTitle,
        ogDescription,
        ogImage,
      };

      const obj = {
        ...entity,
        id: newId,
        name: String(fd.get("name") || "").trim() || "Товар",
        article: String(fd.get("article") || "").trim(),
        model: String(fd.get("model") || "").trim(),
        categoryId: String(fd.get("categoryId") || entity.categoryId),
        partnerId: String(fd.get("partnerId") || entity.partnerId),
        price: fd.get("price") ? Number(fd.get("price")) : null,
        currency: String(fd.get("currency") || entity.currency || "KZT"),
        status: String(fd.get("status") || entity.status || "in_stock"),
        manufacturer: String(fd.get("manufacturer") || "").trim(),
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : entity.sortOrder || 0,
        popular: fd.get("popular") === "on",
        isPopular: fd.get("popular") === "on",
        isNew: fd.get("isNew") === "on",
        isHidden: fd.get("isHidden") === "on",
        shortDesc: String(fd.get("shortDesc") || "").trim(),
        description: descriptionHtml,
        image: primaryImage,
        images,
        photos,
        specs,
        serviceSteps,
        roomRequirements,
        engineerRequirements,
        attributes,
        docs,
        relatedProductIds,
        seo,
      };
      const list = NF_DATA.products || [];
      const idx = list.findIndex((p) => String(p.id) === String(entity.id));
      if (idx >= 0) list[idx] = obj;
      else list.push(obj);
      NF_DATA.products = list;
      try {
        nfRecalcCategoryCounts();
        await nfAdminSaveProducts(base);
        nfRenderAdmin();
        nfShowToast("Товар сохранён.");
        nfAdminShowStatus("Изменения сохранены", "success");
        close();
      } catch (_) {
        nfShowToast("Ошибка сохранения товаров.");
        nfAdminShowStatus("Ошибка сохранения товаров", "error");
      }
    } else if (kind === "news") {
      const newId = String(fd.get("id") || "").trim() || (entity.id || `news-${Date.now()}`);
      const rawContent = String(fd.get("content") || "");
      const paragraphs = rawContent
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

      const newsGalleryState = form.__nfNewsGalleryState || { items: [] };
      const newsImages = Array.isArray(newsGalleryState.items)
        ? newsGalleryState.items
            .map((u) => String(u || "").trim())
            .filter(Boolean)
        : [];

      const cover = String(fd.get("image") || "").trim() || newsImages[0] || "";

      const obj = {
        id: newId,
        title: String(fd.get("title") || "").trim() || "Новость",
        category: String(fd.get("category") || "").trim() || "Новость",
        date: String(fd.get("date") || "").trim() || entity.date || new Date().toISOString().slice(0, 10),
        author: String(fd.get("author") || "").trim() || entity.author || "",
        excerpt: String(fd.get("excerpt") || "").trim(),
        content: paragraphs.length ? paragraphs : entity.content || [],
        image: cover,
        images: newsImages,
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : entity.sortOrder || 0,
        isHidden: fd.get("isHidden") === "on",
        seo: {
          metaTitle: String(fd.get("metaTitle") || "").trim(),
          metaDescription: String(fd.get("metaDescription") || "").trim(),
          slug: String(fd.get("slug") || "").trim(),
        },
      };
      const list = NF_DATA.news || [];
      const idx = list.findIndex((n) => String(n.id) === String(entity.id));
      if (idx >= 0) list[idx] = obj;
      else list.push(obj);
      NF_DATA.news = list;
      try {
        await nfAdminSaveNews(base);
        nfRenderAdmin();
        nfShowToast("Новость сохранена.");
        nfAdminShowStatus("Изменения сохранены", "success");
        close();
      } catch (_) {
        nfShowToast("Ошибка сохранения новостей.");
        nfAdminShowStatus("Ошибка сохранения новостей", "error");
      }
    }
  };

  // превью и очистка изображений
  form.querySelectorAll("[data-admin-clear-image]").forEach((btn) => {
    const key = btn.dataset.adminClearImage;
    if (!key) return;
    const input = form.querySelector(`input[name="${key}"]`);
    const img = form.querySelector(`[data-admin-preview="${key}"]`);
    btn.addEventListener("click", () => {
      if (input) input.value = "";
      if (img) {
        img.removeAttribute("src");
        img.style.display = "none";
      }
    });
  });

  form.querySelectorAll("[data-admin-preview]").forEach((img) => {
    const key = img.dataset.adminPreview;
    if (!key) return;
    const input = form.querySelector(`input[name="${key}"]`);
    if (!input) return;
    const update = () => {
      const v = String(input.value || "").trim();
      if (!v) {
        img.style.display = "none";
        img.removeAttribute("src");
      } else {
        img.style.display = "block";
        img.src = v;
      }
    };
    input.addEventListener("input", update);
    // первичная инициализация превью
    update();
  });
}
/* ====== ADMIN LOGIN ====== */
function nfRenderAdminLogin() {
  const root = nfEl("adminRoot");
  if (!root) return;
  root.innerHTML = `
    <div class="nf-admin-login-page">
      <div class="nf-admin-login-inner">
        <header class="nf-admin-login-hero">
          <div class="nf-admin-login-logo-title">НаноФарм</div>
          <div class="nf-admin-login-logo-subtitle">Админ‑панель</div>
        </header>
        <section class="nf-admin-login-card">
          <h2 class="nf-admin-login-title">Вход в админ‑панель</h2>
          <p class="nf-admin-login-desc">Введите логин и пароль администратора.</p>
          <form id="adminLoginForm" class="nf-admin-login-form">
            <label class="nf-admin-login-label">
              <span>Логин</span>
              <div class="nf-admin-login-field">
                <span class="nf-admin-login-icon nf-admin-login-icon-user" aria-hidden="true"></span>
                <input type="text" name="login" class="nf-admin-login-input" autocomplete="username" placeholder="admin" required />
              </div>
            </label>
            <label class="nf-admin-login-label">
              <span>Пароль</span>
              <div class="nf-admin-login-field">
                <span class="nf-admin-login-icon nf-admin-login-icon-lock" aria-hidden="true"></span>
                <input type="password" name="password" class="nf-admin-login-input" autocomplete="current-password" required />
                <button type="button" class="nf-admin-login-toggle" aria-label="Показать пароль"></button>
              </div>
              <span id="adminLoginCaps" class="nf-admin-login-caps">Caps Lock включён</span>
            </label>
            <p id="adminLoginError" class="nf-admin-login-error" hidden></p>
            <button type="submit" class="nf-btn nf-btn-primary nf-admin-login-btn" id="adminLoginSubmit">Войти</button>
          </form>
        </section>
      </div>
    </div>
  `;
  const form = document.getElementById("adminLoginForm");
  const errEl = document.getElementById("adminLoginError");
  const loginInput = form ? form.login : null;
  const passwordInput = form ? form.password : null;
  const capsEl = document.getElementById("adminLoginCaps");
  const toggleBtn = form ? form.querySelector(".nf-admin-login-toggle") : null;
  const submitBtn = document.getElementById("adminLoginSubmit");

  if (loginInput) {
    try { loginInput.focus(); } catch (_) {}
  }

  if (toggleBtn && passwordInput) {
    toggleBtn.onclick = () => {
      const isText = passwordInput.type === "text";
      passwordInput.type = isText ? "password" : "text";
      toggleBtn.classList.toggle("is-active", !isText);
      toggleBtn.setAttribute("aria-label", isText ? "Показать пароль" : "Скрыть пароль");
      passwordInput.focus();
    };
  }

  if (passwordInput && capsEl) {
    passwordInput.addEventListener("keydown", (e) => {
      const on = e.getModifierState && e.getModifierState("CapsLock");
      capsEl.classList.toggle("is-visible", !!on);
    });
    passwordInput.addEventListener("blur", () => {
      capsEl.classList.remove("is-visible");
    });
  }

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      if (errEl) { errEl.hidden = true; errEl.textContent = ""; errEl.classList.remove("is-visible-shake"); }
      const base = nfApiBase();
      const login = form.login?.value?.trim() || "";
      const password = form.password?.value || "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
      }
      try {
        const res = await fetch((base || "") + "/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (errEl) {
            errEl.textContent = data.error || "Ошибка входа";
            errEl.hidden = false;
          }
          return;
        }
        if (data.token) nfAdminSetToken(data.token);
        if (data.refreshToken) nfAdminSetRefreshToken(data.refreshToken);
        nfShowToast("Успешный вход в админ‑панель.");
        nfInitAdminPage();
      } catch (_) {
        if (errEl) {
          errEl.textContent = "Ошибка сети";
          errEl.hidden = false;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove("is-loading");
        }
      }
    };
  }
}

/* ====== ADMIN ====== */
function nfRenderAdmin() {
  const root = nfEl("adminRoot");
  if (!root) return;
  // Всегда требуем логин для доступа в админку
  if (!nfAdminToken()) {
    nfRenderAdminLogin();
    return;
  }

  const sec = NF_STATE.adminSection || "dashboard";

  const tabs = [
    { id: "dashboard", label: "Дашборд" },
    { id: "categories", label: "Категории" },
    { id: "products", label: "Товары" },
    { id: "partners", label: "Партнёры" },
    { id: "news", label: "Новости" },
    { id: "requests", label: "Запросы" },
  ];

  const nav = `
    <div class="nf-admin-tabs-row">
      <div class="nf-admin-tabs">
        ${tabs
          .map(
            (t) =>
              `<button type="button" class="nf-admin-tab ${t.id === sec ? "is-active" : ""}" data-admin-section="${t.id}">${t.label}</button>`,
          )
          .join("")}
      </div>
      <button type="button" class="nf-admin-logout-btn" id="adminLogoutBtn">Выход</button>
    </div>
  `;

  let content = "";
  if (sec === "dashboard") {
    const totalRequests = (NF_DATA.requests || []).length;
    const latestNewsItems = (NF_DATA.news || [])
      .slice()
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
      .slice(0, 3)
      .map(
        (n) =>
          `<li><span class="nf-admin-list-title">${nfEscapeHtml(n.title)}</span><span class="nf-admin-list-meta">${nfEscapeHtml(n.date || "")} · ${nfEscapeHtml(
            n.category || ""
          )}</span></li>`,
      )
      .join("");
    const latestNewsHtml =
      latestNewsItems ||
      '<li><span class="nf-admin-list-meta">Пока нет новостей. Добавьте первую в разделе «Новости».</span></li>';
    content = `
      <div class="nf-admin-dashboard">
        <section class="nf-admin-card nf-admin-card--metrics">
          <h2 class="nf-admin-card-title">Сводка по каталогу</h2>
          <div class="nf-admin-metrics">
            <div class="nf-admin-metric">
              <div class="k">Категорий</div>
              <div class="v">${NF_DATA.categories.length}</div>
            </div>
            <div class="nf-admin-metric">
              <div class="k">Товаров</div>
              <div class="v">${NF_DATA.products.length}</div>
            </div>
            <div class="nf-admin-metric">
              <div class="k">Партнёров</div>
              <div class="v">${NF_DATA.partners.length}</div>
            </div>
            <div class="nf-admin-metric">
              <div class="k">Новостей</div>
              <div class="v">${NF_DATA.news.length}</div>
            </div>
            <div class="nf-admin-metric">
              <div class="k">Заявок</div>
              <div class="v">${totalRequests}</div>
            </div>
          </div>
        </section>
        <section class="nf-admin-card nf-admin-card--news">
          <h2 class="nf-admin-card-title">Последние новости</h2>
          <ul class="nf-admin-list">
            ${latestNewsHtml}
          </ul>
        </section>
      </div>
    `;
  } else if (sec === "categories") {
    content = nfAdminCategoriesContent();
  } else if (sec === "partners") {
    content = nfAdminPartnersContent();
  } else if (sec === "products") {
    content = nfAdminProductsContent();
  } else if (sec === "news") {
    content = nfAdminNewsContent();
  } else if (sec === "requests") {
    const requests = NF_DATA.requests || [];
    content = `
      <div class="nf-admin-card">
        <h2 style="margin:0 0 8px;">Заявки (${requests.length})</h2>
        <div class="nf-admin-table-wrap">
          <table class="nf-admin-table"><thead><tr><th>Дата</th><th>Тип</th><th>Имя</th><th>Компания</th><th>Контакты</th></tr></thead>
          <tbody>${requests
            .slice(0, 50)
            .map(
              (r) =>
                `<tr><td>${nfEscapeHtml((r.createdAt || "").slice(0, 10))}</td><td>${nfEscapeHtml(r.type || "")}</td><td>${nfEscapeHtml(r.name || "")}</td><td>${nfEscapeHtml(r.company || "")}</td><td>${nfEscapeHtml(r.phone || "")} ${nfEscapeHtml(r.email || "")}</td></tr>`,
            )
            .join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  } else {
    content = `
      <div class="nf-admin-card">
        <h2 style="margin:0 0 8px;">${tabs.find((t) => t.id === sec)?.label || "Раздел"}</h2>
        <p style="margin:0;color:${NF_PALETTE.muted};">Раздел в разработке.</p>
      </div>
    `;
  }

  root.innerHTML = `
    <div class="nf-admin-page">
      <div class="nf-admin-shell">
        <header class="nf-admin-topbar">
          <div class="nf-admin-topbar-left">
            <span class="nf-admin-badge">Admin</span>
            <div>
              <p class="nf-admin-title">Админ‑панель НаноФарм</p>
              <p class="nf-admin-subtitle-main">Управление товарами, категориями, партнёрами, новостями и заявками.</p>
            </div>
          </div>
        </header>

        <div class="nf-admin-layout">
          <aside class="nf-admin-sidebar">
            <div class="nf-admin-nav-caption">Разделы</div>
            <button type="button" class="nf-admin-nav-btn ${sec === "dashboard" ? "nf-admin-nav-btn-active" : ""}" data-admin-section="dashboard">
              <span class="nf-admin-nav-label">
                <span class="nf-admin-nav-dot" aria-hidden="true"></span>
                <span>Дашборд</span>
              </span>
              <span class="nf-admin-nav-meta"></span>
            </button>
            <button type="button" class="nf-admin-nav-btn ${sec === "products" ? "nf-admin-nav-btn-active" : ""}" data-admin-section="products">
              <span class="nf-admin-nav-label">
                <span class="nf-admin-nav-dot" aria-hidden="true"></span>
                <span>Товары</span>
              </span>
              <span class="nf-admin-nav-meta">${NF_DATA.products.length}</span>
            </button>
            <button type="button" class="nf-admin-nav-btn ${sec === "categories" ? "nf-admin-nav-btn-active" : ""}" data-admin-section="categories">
              <span class="nf-admin-nav-label">
                <span class="nf-admin-nav-dot" aria-hidden="true"></span>
                <span>Категории</span>
              </span>
              <span class="nf-admin-nav-meta">${NF_DATA.categories.length}</span>
            </button>
            <button type="button" class="nf-admin-nav-btn ${sec === "partners" ? "nf-admin-nav-btn-active" : ""}" data-admin-section="partners">
              <span class="nf-admin-nav-label">
                <span class="nf-admin-nav-dot" aria-hidden="true"></span>
                <span>Партнёры</span>
              </span>
              <span class="nf-admin-nav-meta">${NF_DATA.partners.length}</span>
            </button>
            <button type="button" class="nf-admin-nav-btn ${sec === "news" ? "nf-admin-nav-btn-active" : ""}" data-admin-section="news">
              <span class="nf-admin-nav-label">
                <span class="nf-admin-nav-dot" aria-hidden="true"></span>
                <span>Новости</span>
              </span>
              <span class="nf-admin-nav-meta">${NF_DATA.news.length}</span>
            </button>
            <button type="button" class="nf-admin-nav-btn ${sec === "requests" ? "nf-admin-nav-btn-active" : ""}" data-admin-section="requests">
              <span class="nf-admin-nav-label">
                <span class="nf-admin-nav-dot" aria-hidden="true"></span>
                <span>Заявки</span>
              </span>
              <span class="nf-admin-nav-meta">${(NF_DATA.requests || []).length}</span>
            </button>
          </aside>

          <section class="nf-admin-content" aria-label="Админ-панель">
            <header class="nf-admin-header">
              <div class="nf-admin-header-main">
                <h1>Каталог и контент</h1>
                <p>Редактирование данных, которые видят посетители сайта.</p>
              </div>
              <div id="adminStatus" class="nf-admin-status" aria-live="polite"></div>
            </header>

            ${nav}

            <div id="adminContentInner">
              ${content}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  // Синхронизация активного пункта в левом меню
  document.querySelectorAll(".nf-admin-nav-btn").forEach((btn) => {
    const active = btn.dataset.adminSection === sec;
    btn.classList.toggle("nf-admin-nav-btn-active", active);
  });

  root.querySelectorAll("[data-admin-section]").forEach((btn) => {
    btn.onclick = () => {
      NF_STATE.adminSection = btn.dataset.adminSection;
      nfRenderAdmin();
    };
  });

  const logoutBtn = document.getElementById("adminLogoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      const base = nfApiBase();
      fetch((base || "") + "/api/admin/logout", { method: "POST", headers: nfAdminAuthHeaders() }).catch(() => {});
      nfAdminClearToken();
      nfRenderAdminLogin();
    };
  }

  nfAdminBindCrud(root);
}

/* ====== FORMS (Missing impl) ====== */
function nfAttachRealtimeValidation(form) {
  if (!form) return;
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => nfValidateField(field));
    field.addEventListener("blur", () => nfValidateField(field));
  });
}

function nfValidateField(field) {
  if (!field) return true;
  const wrapper = field.closest("label") || field.parentElement;
  const err = wrapper ? wrapper.querySelector(".nf-field-error") : null;

  const name = field.getAttribute("name") || "";
  const type = field.getAttribute("type") || "";
  const required = field.hasAttribute("required");

  let ok = true;
  let msg = "";

  const val = String(field.value || "").trim();

  if (required && !val) {
    ok = false;
    msg = "Заполните поле";
  }

  if (ok && type === "email" && val) {
    ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!ok) msg = "Некорректный email";
  }

  if (ok && type === "tel" && val) {
    // допускаем разные форматы, главное чтобы было 10+ цифр
    const digits = val.replace(/\D/g, "");
    ok = digits.length >= 10;
    if (!ok) msg = "Введите телефон";
  }

  field.classList.toggle("nf-input-error", !ok);
  if (err) err.textContent = msg;

  return ok;
}

function nfValidateForm(form) {
  if (!form) return false;
  let ok = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const r = nfValidateField(field);
    if (!r) ok = false;
  });
  return ok;
}

/* ====== MATRIX DATUM CELL HELPER ====== */
/**
 * Creates a single spec datum cell for the MATRIX telemetry column.
 * Layout: [icon 20px] [LABEL] [dotted connector] [value bold], 52px tall.
 * @param {string} slug   – spec slug for icon selection
 * @param {string} label  – label text (uppercased via CSS)
 * @param {string} value  – value text
 * @returns {HTMLElement}
 */
function _nfBuildDatumCell(slug, label, value) {
  const cell = document.createElement("div");
  cell.className = "matrix-datum-cell";
  cell.setAttribute("data-spec", slug || "");

  const iconEl = document.createElement("span");
  iconEl.className = "matrix-datum-icon";
  iconEl.setAttribute("aria-hidden", "true");
  iconEl.innerHTML = nfPdpGetPdpStrokeIcon(slug || "default");

  const labelEl = document.createElement("span");
  labelEl.className = "matrix-datum-label";
  labelEl.textContent = String(label || "");

  const connectorEl = document.createElement("span");
  connectorEl.className = "matrix-datum-connector";
  connectorEl.setAttribute("aria-hidden", "true");

  const valueEl = document.createElement("span");
  valueEl.className = "matrix-datum-value";
  valueEl.textContent = String(value || "");

  cell.appendChild(iconEl);
  cell.appendChild(labelEl);
  cell.appendChild(connectorEl);
  cell.appendChild(valueEl);
  return cell;
}

/* ====== MATRIX PDP HERO BUILDER (CONCEPT 3) ====== */
/**
 * MATRIX Command Grid — replaces .nf-pdp-hero__inner as a 3-column layout:
 *   Col A (3fr) · Control Panel  – breadcrumb, partner, title, desc, spec grid, CTAs
 *   Col B (5fr) · Canvas         – calibration grid, gallery, product-code status bar
 *   Col C (4fr) · Telemetry      – datum cells (primary specs) + engineering accordion
 *
 * ALL original element IDs are recreated so every downstream nfInitProductPage()
 * fill-pass continues to work without modification.
 *
 * @param {object}      product  — product record from NF_DATA.products
 * @param {object|null} category — matching category from NF_DATA.categories
 */
function nfInitPdpCinematicHero(product, category) {
  const heroOuter = document.querySelector(".nf-pdp-hero");
  const heroInner = heroOuter
    ? (heroOuter.querySelector(".nf-pdp-hero__inner") || heroOuter)
    : (document.querySelector(".nf-pdp-hero__inner") || document.querySelector(".matrix-grid"));
  if (!heroInner) return;

  /* FORM — clean white hero */
  if (heroOuter) {
    heroOuter.classList.remove("mrd-hero");
    heroOuter.classList.add("frm-hero");
  }
  heroInner.className = "frm-hero-grid";
  heroInner.innerHTML = "";

  const partner = product.partnerId
    ? (NF_DATA.partners || []).find((p) => p.id === product.partnerId)
    : null;

  /* ═══════════════════════════════════════════════════════════════════
     LEFT COLUMN — Media (warm stage, product image, thumbs)
     ═══════════════════════════════════════════════════════════════════ */
  const colMedia = document.createElement("div");
  colMedia.className = "frm-media-col";

  const mediaStageWrap = document.createElement("div");
  mediaStageWrap.className = "frm-media-stage";

  /* Gallery — preserve class names required by gallery JS */
  const galleryRoot = document.createElement("div");
  galleryRoot.className = "nf-pdp-gallery--product frm-gallery";
  galleryRoot.id = "pdpGalleryRoot";

  const galStage = document.createElement("div");
  galStage.className = "nf-pdp-media-stage frm-gal-stage";

  const imgWrapEl = document.createElement("div");
  imgWrapEl.className = "nf-pdp-media-imgwrap frm-gal-wrap";

  const mainImg = document.createElement("img");
  mainImg.className = "nf-pdp-main-img frm-main-img";
  mainImg.id = "productPageImage";
  mainImg.alt = product.name || "";

  imgWrapEl.appendChild(mainImg);
  galStage.appendChild(imgWrapEl);

  const navPrev = document.createElement("button");
  navPrev.type = "button";
  navPrev.className = "nf-pdp-nav nf-pdp-nav--prev frm-nav frm-nav--prev";
  navPrev.id = "productPageNavPrev";
  navPrev.setAttribute("aria-label", "Предыдущее фото");
  navPrev.innerHTML = `<svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const navNext = document.createElement("button");
  navNext.type = "button";
  navNext.className = "nf-pdp-nav nf-pdp-nav--next frm-nav frm-nav--next";
  navNext.id = "productPageNavNext";
  navNext.setAttribute("aria-label", "Следующее фото");
  navNext.innerHTML = `<svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const expandBtn = document.createElement("button");
  expandBtn.type = "button";
  expandBtn.className = "nf-pdp-expand frm-expand";
  expandBtn.id = "productPageMediaExpand";
  expandBtn.setAttribute("aria-label", "Открыть галерею");
  expandBtn.innerHTML = `<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M2 6V2H6M10 2h4V6M14 10v4h-4M6 14H2v-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const counterEl = document.createElement("span");
  counterEl.className = "nf-pdp-counter frm-counter";
  counterEl.id = "productPageImageCounter";

  galleryRoot.appendChild(galStage);
  galleryRoot.appendChild(navPrev);
  galleryRoot.appendChild(navNext);
  galleryRoot.appendChild(expandBtn);
  galleryRoot.appendChild(counterEl);

  mediaStageWrap.appendChild(galleryRoot);

  const thumbsEl = document.createElement("div");
  thumbsEl.className = "nf-pdp-thumbs frm-thumbs";
  thumbsEl.id = "productPageThumbs";
  mediaStageWrap.appendChild(thumbsEl);

  colMedia.appendChild(mediaStageWrap);

  /* ═══════════════════════════════════════════════════════════════════
     RIGHT COLUMN — Info (identity · specs · actions)
     ═══════════════════════════════════════════════════════════════════ */
  const colInfo = document.createElement("div");
  colInfo.className = "frm-info-col";

  /* Breadcrumb */
  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "frm-breadcrumb";
  breadcrumb.setAttribute("aria-label", "Навигация");
  const bcHome = document.createElement("a");
  bcHome.className = "frm-breadcrumb__link";
  bcHome.href = "#";
  bcHome.textContent = "Каталог";
  const bcSep = document.createElement("span");
  bcSep.className = "frm-breadcrumb__sep";
  bcSep.setAttribute("aria-hidden", "true");
  bcSep.textContent = "/";
  const bcCat = document.createElement("span");
  bcCat.className = "frm-breadcrumb__current";
  bcCat.id = "productPageBreadcrumbCat";
  bcCat.textContent = category?.name || "";
  breadcrumb.appendChild(bcHome);
  breadcrumb.appendChild(bcSep);
  breadcrumb.appendChild(bcCat);

  /* Partner badge */
  const partnerBadge = document.createElement("div");
  partnerBadge.className = "frm-partner-badge";
  partnerBadge.id = "productPagePartnerBadge";
  const partnerLogo = document.createElement("img");
  partnerLogo.className = "frm-partner-logo";
  partnerLogo.id = "productPagePartnerLogo";
  const partnerNameEl = document.createElement("span");
  partnerNameEl.className = "frm-partner-name";
  if (partner && partner.logo) {
    partnerLogo.src = String(partner.logo).trim();
    partnerLogo.alt = partner.name || "";
    partnerLogo.onerror = () => { partnerBadge.hidden = true; };
    partnerNameEl.textContent = partner.name || "";
    partnerBadge.hidden = false;
  } else {
    partnerBadge.hidden = true;
  }
  partnerBadge.appendChild(partnerLogo);
  partnerBadge.appendChild(partnerNameEl);

  /* Category tag */
  const categoryTag = document.createElement("span");
  categoryTag.className = "frm-category-tag";
  categoryTag.id = "productPageHeroKicker";
  categoryTag.textContent = category?.name ? String(category.name).toUpperCase() : "";
  categoryTag.hidden = !category?.name;

  /* Title */
  const title = document.createElement("h1");
  title.className = "frm-title";
  title.id = "productPageTitle";
  title.textContent = product.name || "";

  /* Short description */
  const shortDesc = document.createElement("p");
  shortDesc.className = "frm-shortdesc";
  shortDesc.id = "productPageShortDesc";
  shortDesc.textContent = product.shortDesc || "";

  /* Badges */
  const badges = document.createElement("div");
  badges.className = "frm-badges";
  badges.id = "productPageHeroBadges";

  /* Brand / SKU */
  const brand = document.createElement("p");
  brand.className = "frm-meta";
  brand.id = "productPageBrand";
  const sku = document.createElement("p");
  sku.className = "frm-meta frm-sku";
  sku.id = "productPageSku";

  /* Divider */
  const divider = document.createElement("hr");
  divider.className = "frm-divider";
  divider.setAttribute("aria-hidden", "true");

  /* Spec strip — filled by nfFillPdpHeroSpecGrid */
  const specStrip = document.createElement("div");
  specStrip.className = "frm-spec-strip";
  specStrip.id = "productPageHeroSpecGrid";

  /* Price */
  const priceEl = document.createElement("span");
  priceEl.className = "frm-price";
  priceEl.id = "productPagePrice";

  /* Hidden compat IDs required by fill-passes */
  const glowEl = document.createElement("div");
  glowEl.id = "pdpViewerGlow";
  glowEl.hidden = true;
  const productCodeEl = document.createElement("span");
  productCodeEl.id = "pdpViewerProductCode";
  productCodeEl.hidden = true;

  /* CTAs — primary adds to cart, secondary opens quick-quote (kept hidden in DOM for compat) */
  const ctaRow = document.createElement("div");
  ctaRow.className = "frm-cta-row";

  const primaryBtn = document.createElement("button");
  primaryBtn.type = "button";
  primaryBtn.className = "frm-cta-primary nf-btn nf-btn--primary";
  primaryBtn.id = "productPagePrimaryBtn";
  primaryBtn.innerHTML =
    `<svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true" style="flex-shrink:0">` +
      `<path d="M5.5 3.5h-2l-.75 1.5H4l2.7 5.7-1 1.83A.75.75 0 006.5 14h8.25v-1.5H7.06l.7-1.26L14.25 7H5.41L4.65 5.5H12l-.5-1-1-.5H5.5v-.5zm0 0" fill="currentColor"/>` +
      `<circle cx="8" cy="15.5" r="1.5" fill="currentColor"/>` +
      `<circle cx="13" cy="15.5" r="1.5" fill="currentColor"/>` +
    `</svg>` +
    `Добавить в запрос`;

  /* Secondary — kept in DOM for fill-pass/bindQuoteClick, shown as text link */
  const secondaryBtn = document.createElement("button");
  secondaryBtn.type = "button";
  secondaryBtn.className = "frm-cta-ghost";
  secondaryBtn.id = "productPageSecondaryBtn";
  secondaryBtn.textContent = "Получить КП";

  ctaRow.appendChild(primaryBtn);
  ctaRow.appendChild(secondaryBtn);

  /* Hide expand button when no real product images (placeholder case) */
  const hasImages = (
    (Array.isArray(product.photos) && product.photos.some(Boolean)) ||
    (Array.isArray(product.images) && product.images.some(Boolean)) ||
    Boolean(product.image)
  );
  if (!hasImages) expandBtn.hidden = true;

  colInfo.appendChild(breadcrumb);
  colInfo.appendChild(partnerBadge);
  colInfo.appendChild(categoryTag);
  colInfo.appendChild(title);
  colInfo.appendChild(shortDesc);
  colInfo.appendChild(badges);
  colInfo.appendChild(brand);
  colInfo.appendChild(sku);
  colInfo.appendChild(divider);
  colInfo.appendChild(specStrip);
  colInfo.appendChild(priceEl);
  colInfo.appendChild(glowEl);
  colInfo.appendChild(productCodeEl);
  colInfo.appendChild(ctaRow);

  /* ── Assemble ── */
  heroInner.appendChild(colMedia);
  heroInner.appendChild(colInfo);
}

/* ====== PFG CARD TILT ENGINE ====== */
/**
 * Lightweight RAF-based 3D tilt + SVG-thread parallax for .pfg-card.
 * ±5° X / ±7° Y rotation, 7px / 5px thread parallax offset.
 * Called after every render that produces new cards.
 */
function nfInitCardTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const EASE = "600ms cubic-bezier(0.22,1,0.36,1)";

  document.querySelectorAll(".pfg-card").forEach((card) => {
    if (card._pfgTiltBound) return;
    card._pfgTiltBound = true;

    const thread = card.querySelector(".pfg-card__thread");
    const bloom  = card.querySelector(".pfg-card__bloom");
    let rafId    = 0;
    let active   = false;

    /* Derive bloom color from CSS --cat-accent variable (with alpha) */
    const _getBloomColor = () => {
      try {
        const raw = getComputedStyle(card).getPropertyValue("--cat-accent").trim();
        if (raw.startsWith("#") && raw.length === 7) {
          const r = parseInt(raw.slice(1, 3), 16);
          const g = parseInt(raw.slice(3, 5), 16);
          const b = parseInt(raw.slice(5, 7), 16);
          return `rgba(${r},${g},${b},0.10)`;
        }
        return "rgba(0,180,200,0.09)";
      } catch (_) {
        return "rgba(0,180,200,0.09)";
      }
    };

    const onMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!active) return;
        const r   = card.getBoundingClientRect();
        const dx  = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
        const dy  = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
        const pX  = ((e.clientX - r.left)  / r.width)  * 100;
        const pY  = ((e.clientY - r.top)   / r.height) * 100;

        card.style.transition = "none";
        card.style.transform  = `perspective(1200px) rotateX(${-dy * 5}deg) rotateY(${dx * 7}deg) translateZ(10px) scale(1.015)`;

        if (thread) {
          thread.style.transition = "none";
          thread.style.transform  = `translate(${dx * -8}px, ${dy * -5}px)`;
        }

        if (bloom) {
          bloom.style.backgroundImage =
            `radial-gradient(circle at ${pX}% ${pY}%, ${_getBloomColor()} 0%, transparent 65%)`;
          bloom.style.opacity = "1";
        }
      });
    };

    const onEnter = () => { active = true; };

    const onLeave = () => {
      active = false;
      cancelAnimationFrame(rafId);
      card.style.transition = EASE;
      card.style.transform  = "";
      if (thread) {
        thread.style.transition = EASE;
        thread.style.transform  = "";
      }
      if (bloom) {
        bloom.style.transition = "opacity 400ms ease";
        bloom.style.opacity    = "0";
      }
      setTimeout(() => {
        card.style.transition = "";
        if (thread) thread.style.transition = "";
        if (bloom)  bloom.style.transition  = "";
      }, 650);
    };

    card.addEventListener("mousemove",  onMove,  { passive: true });
    card.addEventListener("mouseenter", onEnter, { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });
  });
}

/* ====== ИНИЦИАЛИЗАТОРЫ СТРАНИЦ ====== */
/** Hero «Mesh-среда» — лёгкий parallax всей сцены за курсором */
function nfInitHeroMesh() {
  const mesh = document.getElementById("nfMesh");
  if (!mesh) return;
  if (nfPrefersReducedMotion()) return;

  let tx = 0, ty = 0, cx = 0, cy = 0, animId;
  function onMove(e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  function loop() {
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;
    mesh.style.transform = `translate3d(${cx * 15}px, ${cy * 11}px, 0)`;
    animId = requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener("mousemove", onMove, { passive: true });

  // Cleanup при SPA-навигации (подмена #page-root)
  const pageRoot = document.getElementById("page-root");
  const obs = new MutationObserver(() => {
    if (!document.getElementById("nfMesh")) {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      obs.disconnect();
    }
  });
  if (pageRoot) obs.observe(pageRoot, { childList: true });
}

/**
 * Hero particle logo — частицы разлетаются и собираются в фирменный знак НаноФарм.
 *  • На входе: точки рассыпаны по сцене → плавно стягиваются в логотип (стаггер по дистанции).
 *  • После сборки: лёгкое «дыхание» + расталкивание от курсора.
 *  • reduced-motion / мобильные: статичная отрисовка знака, без анимации.
 */
let NF_LOGO_PARTICLES_CLEANUP = null;

function nfInitLogoParticles() {
  if (typeof NF_LOGO_PARTICLES_CLEANUP === "function") {
    try { NF_LOGO_PARTICLES_CLEANUP(); } catch (_e) {}
    NF_LOGO_PARTICLES_CLEANUP = null;
  }

  const stage = document.getElementById("nfStage");
  const canvas = document.getElementById("nfLogoCanvas");
  if (!stage || !canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduced = nfPrefersReducedMotion();
  let coarse = false;
  try { coarse = window.matchMedia("(pointer: coarse), (max-width: 640px)").matches; } catch (_e) {}

  // Фирменные цвета берём из CSS-переменных, чтобы оставаться на бренде.
  const css = getComputedStyle(document.documentElement);
  const TEAL = (css.getPropertyValue("--nf-color-accent") || "").trim() || "#3f9caa";
  const GRAPHITE = (css.getPropertyValue("--nf-color-text-primary") || "").trim() || "#26302f";

  let W = 0, H = 0, dpr = 1;
  let particles = [];
  let nodes = [];                // узлы сети-созвездия (нано/нейро-сеть вокруг знака)
  let raf = null;
  let running = false;
  let startTs = 0;
  const FORM_MS = 1700;          // длительность сборки
  const pointer = { x: -9999, y: -9999, active: false };

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // ── Источник: монограмма (левый квадрат логотипа) ──
  const logo = new Image();
  logo.decoding = "async";

  function buildParticles() {
    const rect = stage.getBoundingClientRect();
    W = Math.max(rect.width, 1);
    H = Math.max(rect.height, 1);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Кроп монограммы из logo.png (rounded-square знак слева)
    const SX = 110, SY = 30, SW = 1760, SH = 1620;
    const srcAspect = SW / SH;

    // Целевой размер знака внутри сцены (коробки нет — знак крупнее, эпичнее)
    const fit = Math.min(W, H) * (coarse ? 0.76 : 0.9);
    let tw = fit, th = fit / srcAspect;
    if (th > fit) { th = fit; tw = fit * srcAspect; }
    const offX = (W - tw) / 2;
    const offY = (H - th) / 2;

    // Оффскрин-рендер для сэмплирования пикселей
    const off = document.createElement("canvas");
    off.width = Math.max(2, Math.round(tw));
    off.height = Math.max(2, Math.round(th));
    const octx = off.getContext("2d");
    octx.drawImage(logo, SX, SY, SW, SH, 0, 0, off.width, off.height);

    let data;
    try {
      data = octx.getImageData(0, 0, off.width, off.height).data;
    } catch (_e) {
      // CORS / iOS edge — fallback: просто рисуем знак
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(logo, SX, SY, SW, SH, offX, offY, tw, th);
      return false;
    }

    const step = coarse ? 5 : 4;
    const half = coarse ? 1.25 : 1.2;
    const targets = [];
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        const i = (y * off.width + x) * 4;
        const a = data[i + 3];
        if (a < 130) continue;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        // отбрасываем белый фон и бледно-серую рамку, оставляем бирюзу и графит
        const isTeal = sat > 0.22 && b > 90 && g > 90;
        const isDark = lum < 0.42;
        if (!isTeal && !isDark) continue;
        targets.push({ x: offX + x, y: offY + y, color: isTeal ? TEAL : GRAPHITE });
      }
    }

    // Стягиваем число точек на слабых устройствах
    let pts = targets;
    const cap = coarse ? 1500 : 3600;
    if (pts.length > cap) {
      const keep = cap / pts.length;
      pts = pts.filter(() => Math.random() < keep);
    }

    const cx = W / 2, cy = H / 2;
    particles = pts.map((t) => {
      // старт: по кольцу вокруг центра + случайный разброс (эффект «сборки из вихря»)
      const ang = Math.random() * Math.PI * 2;
      const rad = (0.4 + Math.random() * 0.7) * Math.max(W, H);
      return {
        tx: t.x, ty: t.y,
        x: cx + Math.cos(ang) * rad,
        y: cy + Math.sin(ang) * rad,
        color: t.color,
        half,
        delay: Math.random() * 0.32,                 // стаггер входа
        ph: Math.random() * Math.PI * 2,             // фаза дыхания
        sp: 0.5 + Math.random() * 0.7,               // скорость дыхания
        amp: 0.6 + Math.random() * 1.4,              // амплитуда дыхания
        vx: 0, vy: 0,
      };
    });

    // Узлы сети-созвездия: дрейфуют по сцене, соединяются линиями вблизи
    const nodeCount = coarse ? 0 : 56;
    nodes = [];
    for (let n = 0; n < nodeCount; n++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: 0.8 + Math.random() * 1.4,
      });
    }
    return true;
  }

  function drawConstellation(gt) {
    if (!nodes.length) return;
    const LINK = Math.min(W, H) * 0.26;
    const LINK2 = LINK * LINK;
    const fade = Math.min(gt, 1);   // проявляется по мере сборки знака

    // обновление позиций + мягкое притяжение к курсору
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
      if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
      if (pointer.active) {
        const dx = pointer.x - n.x, dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) { n.x += dx * 0.004; n.y += dy * 0.004; }
      }
    }

    // связи
    ctx.lineWidth = 1;
    for (let a = 0; a < nodes.length; a++) {
      const na = nodes[a];
      for (let b = a + 1; b < nodes.length; b++) {
        const nb = nodes[b];
        const dx = na.x - nb.x, dy = na.y - nb.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK2) {
          const al = (1 - d2 / LINK2) * 0.17 * fade;
          ctx.strokeStyle = `rgba(63,156,170,${al.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }
      }
    }

    // узлы
    ctx.fillStyle = `rgba(63,156,170,${(0.42 * fade).toFixed(3)})`;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, 6.2832);
      ctx.fill();
    }
  }

  function drawStatic() {
    // reduced-motion: моментально собранный знак (точки на местах)
    ctx.clearRect(0, 0, W, H);
    drawConstellation(1);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.fillStyle = p.color;
      ctx.fillRect(p.tx - p.half, p.ty - p.half, p.half * 2, p.half * 2);
    }
  }

  function drawStatic() {
    // reduced-motion: моментально собранный знак (точки на местах)
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.fillStyle = p.color;
      ctx.fillRect(p.tx - p.half, p.ty - p.half, p.half * 2, p.half * 2);
    }
  }

  function tick(ts) {
    if (!running) return;
    if (!startTs) startTs = ts;
    const elapsed = ts - startTs;
    const gt = Math.min(elapsed / FORM_MS, 1);   // глобальный прогресс сборки

    ctx.clearRect(0, 0, W, H);

    // Живая энергетическая аура за знаком — проявляется по мере сборки, мягко пульсирует
    const breathe = 0.85 + Math.sin(elapsed * 0.0013) * 0.15;
    const auraA = Math.min(gt, 1) * 0.13 * breathe;
    if (auraA > 0.005) {
      const aR = Math.min(W, H) * (0.34 + (1 - gt) * 0.18);
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, aR);
      grd.addColorStop(0, `rgba(63,156,170,${auraA.toFixed(3)})`);
      grd.addColorStop(1, "rgba(63,156,170,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }

    // сеть-созвездие за знаком
    drawConstellation(gt);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (gt < 1) {
        // фаза сборки: интерполяция старт → цель с персональным стаггером
        const local = Math.max(0, Math.min((gt - p.delay) / (1 - p.delay), 1));
        const e = easeOutCubic(local);
        p.x = p.x + (p.tx - p.x) * (0.08 + e * 0.14);
        p.y = p.y + (p.ty - p.y) * (0.08 + e * 0.14);
      } else {
        // фаза жизни: дыхание вокруг цели + расталкивание от курсора
        const t = elapsed * 0.001;
        let gx = p.tx + Math.sin(t * p.sp + p.ph) * p.amp;
        let gy = p.ty + Math.cos(t * p.sp * 0.92 + p.ph) * p.amp;

        if (pointer.active) {
          const dx = gx - pointer.x;
          const dy = gy - pointer.y;
          const d2 = dx * dx + dy * dy;
          const R = 96;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / R) * 26;
            gx += (dx / d) * force;
            gy += (dy / d) * force;
          }
        }
        p.vx += (gx - p.x) * 0.16;
        p.vy += (gy - p.y) * 0.16;
        p.vx *= 0.62;
        p.vy *= 0.62;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.half, p.y - p.half, p.half * 2, p.half * 2);
    }

    // непрерывный цикл: сборка → лёгкое «дыхание» + реакция на курсор (дёшево)
    raf = requestAnimationFrame(tick);
  }

  const onMove = (e) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  };
  const onLeave = () => { pointer.active = false; pointer.x = -9999; pointer.y = -9999; };

  let ro = null;
  let inited = false;
  const start = () => {
    if (inited) return;        // защита от двойного вызова (кэш изображения: complete + onload)
    inited = true;

    const ok = buildParticles();
    if (!ok) return; // фолбэк уже нарисован

    if (reduced) { drawStatic(); return; }

    running = true;
    startTs = 0;
    raf = requestAnimationFrame(tick);

    if (!coarse) {
      stage.addEventListener("pointermove", onMove, { passive: true });
      stage.addEventListener("pointerleave", onLeave);
    }

    // ресайз — пересобрать раскладку
    if ("ResizeObserver" in window) {
      let rt = null;
      ro = new ResizeObserver(() => {
        clearTimeout(rt);
        rt = setTimeout(() => {
          const ok2 = buildParticles();
          if (ok2 && reduced) drawStatic();
          startTs = 0; // переиграть сборку плавно
        }, 220);
      });
      ro.observe(stage);
    }
  };

  logo.onload = start;
  logo.onerror = () => {
    try { ctx.clearRect(0, 0, W, H); } catch (_e) {}
  };
  logo.src = "/img/logo.png";
  // уже в кэше — onload может не сработать
  if (logo.complete && logo.naturalWidth) start();

  NF_LOGO_PARTICLES_CLEANUP = () => {
    running = false;
    if (raf != null) cancelAnimationFrame(raf);
    raf = null;
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerleave", onLeave);
    if (ro) { try { ro.disconnect(); } catch (_e) {} ro = null; }
    try { ctx.clearRect(0, 0, W, H); } catch (_e) {}
    particles = [];
    nodes = [];
  };
}

function nfInitHomePage() {
  NF_STATE.homeLazy = {
    popular: false,
    categories: false,
    partners: false,
    news: false,
  };
  nfUpdateSeo({
    title: nfT("seo.home.title", "НаноФарм — Медицинское оборудование для клиник и лабораторий"),
    description: nfT(
      "seo.home.description",
      "Поставка, установка и сервисное обслуживание медицинского оборудования для клиник, лабораторий и диагностических центров."
    ),
    ogType: "website",
  });
  nfInitHomeHeroReveal();
  nfInitHomeHeroParallax();
  nfInitPremiumHeroMotion();
  nfInitHeroMesh();
  nfInitLogoParticles();
  nfInitHomeLazyHeavySections();
  nfInitHomeFadeUpReveal();
}

function nfInitHomeFadeUpReveal() {
  const blocks = document.querySelectorAll(".fade-up");
  if (!blocks.length) return;

  if (nfPrefersReducedMotion()) {
    blocks.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  blocks.forEach((el) => io.observe(el));
}

/**
 * Home below-fold sections: static-first — always mount content immediately.
 * data-nf-lazy-section remains as a semantic hook; optional deferred render can be reintroduced behind html.nf-motion-enhanced only.
 */
function nfInitHomeLazyHeavySections() {
  const root = nfEl("page-root");
  if (!root) return;

  if (!NF_STATE.homeLazy.categories) {
    NF_STATE.homeLazy.categories = true;
    nfRenderHomeCategories();
  }
  if (!NF_STATE.homeLazy.partners) {
    NF_STATE.homeLazy.partners = true;
    nfRenderHomePartners();
  }
  if (!NF_STATE.homeLazy.news) {
    NF_STATE.homeLazy.news = true;
    nfRenderHomeNews();
  }
  if (!NF_STATE.homeLazy.popular) {
    NF_STATE.homeLazy.popular = true;
    nfRenderPopularCarousel();
  }
}

function nfInitHomeHeroReveal() {
  const firstScreen = document.querySelector(".nf-home-firstscreen");
  const heroContent = document.querySelector(".nf-home-firstscreen .nf-hero__content");
  if (!firstScreen && !heroContent) return;
  if (firstScreen && firstScreen.dataset.revealReady === "1") return;
  if (firstScreen) firstScreen.dataset.revealReady = "1";

  if (heroContent) {
    heroContent
      .querySelectorAll(
        ".nf-hero__headline-line--lead, .nf-hero__headline-line--sub, .nf-hero__lead--brand, .nf-hero__note--brand, .nf-hero__buttons"
      )
      .forEach((el, i) => {
        el.classList.add("nf-vp-reveal");
        el.style.setProperty("--nf-vp-stagger", `${i * 55}ms`);
      });
  }

  const advHead = firstScreen?.querySelector(".nf-advantages__head");
  if (advHead) {
    const eyebrow = advHead.querySelector(".nf-advantages__eyebrow");
    const lede = advHead.querySelector(".nf-advantages__lede");
    if (eyebrow) {
      eyebrow.classList.add("nf-vp-reveal");
      eyebrow.style.setProperty("--nf-vp-stagger", "0ms");
    }
    if (lede) {
      lede.classList.add("nf-vp-reveal");
      lede.style.setProperty("--nf-vp-stagger", "45ms");
    }
  }

  if (firstScreen) firstScreen.classList.add("is-ready");
}

function nfInitHomeHeroParallax() {
  const hero = document.querySelector(".nf-home-firstscreen .nf-hero");
  const bg = hero?.querySelector(".hero-bg");
  if (!hero || !bg) return;
  if (hero.dataset.parallaxReady === "1") return;
  hero.dataset.parallaxReady = "1";

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (prefersReduced || coarsePointer) return;

  const limit = 20;
  let raf = null;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const tick = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    bg.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  };

  const schedule = () => {
    if (raf == null) raf = requestAnimationFrame(tick);
  };

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const px = (e.clientX - rect.left) / Math.max(rect.width, 1);
    const py = (e.clientY - rect.top) / Math.max(rect.height, 1);
    targetX = (px - 0.5) * 2 * limit;
    targetY = (py - 0.5) * 2 * limit;
    schedule();
  });

  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    schedule();
  });
}

/**
 * Набор лёгких line-иконок мед-оборудования для дрейфующих частиц hero.
 * stroke=currentColor — цвет управляется через CSS (.nf-hero-medicon).
 */
const NF_MED_ICONS = [
  // микроскоп
  '<path d="M9 18h7M11 18l-1-4m4 4 1-4"/><path d="M10 14 8.5 9.5a2 2 0 0 1 1.2-2.6l1.4-.5 1.4 4"/><path d="m11 6 1.6-.6 1 2.8-1.6.6z"/><path d="M14 8a4 4 0 0 1 2.6 4.8"/>',
  // стетоскоп
  '<path d="M6 4v4a4 4 0 0 0 8 0V4"/><path d="M6 4H5m1 0h1m6 0h1m1 0h-1M10 16v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2"/><circle cx="18" cy="13" r="2"/>',
  // шприц
  '<path d="m14 4 6 6M17 7l-9.5 9.5M5 19l2.5-2.5M9 11l4 4M11 9l4 4"/><path d="M3 21l2.5-2.5"/>',
  // колба/мензурка
  '<path d="M9 3v6L4.5 18a1.6 1.6 0 0 0 1.4 2.4h12.2a1.6 1.6 0 0 0 1.4-2.4L15 9V3"/><path d="M8 3h8M7.5 14h9"/>',
  // ДНК
  '<path d="M7 3c0 5 10 5 10 10S7 18 7 23M17 3c0 5-10 5-10 10s10 5 10 10"/><path d="M8.5 6h7M8.5 18h7M10 9h4M10 15h4"/>',
  // пульс / кардиограмма
  '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  // таблетка
  '<path d="M10.5 3.5 3.5 10.5a4.95 4.95 0 0 0 7 7l7-7a4.95 4.95 0 0 0-7-7Z"/><path d="m7 7 7 7"/>',
  // мед-крест
  '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M12 9v6M9 12h6"/>',
  // сердце-пульс
  '<path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5Z"/><path d="M8.5 12h2l1-2 1.5 4 1-2h1.5"/>',
];

function nfMedIconSvg(i) {
  const body = NF_MED_ICONS[i % NF_MED_ICONS.length];
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/**
 * Premium hero: лёгкий parallax декора + дрейфующие мед-иконки (только transform, rAF).
 * На coarse / узких экранах — без магнита к курсору; при prefers-reduced-motion — статика.
 */
function nfInitPremiumHeroMotion() {
  nfDisconnectPremiumHeroMotion();

  const root = document.querySelector("#nf-premium-hero-root[data-nf-premium-hero]");
  const mount = root && root.querySelector(".nf-hero-brand-particles");
  if (!root || !mount) return;
  mount.innerHTML = "";

  const reduced = nfPrefersReducedMotion();
  let fineHover = false;
  try {
    fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  } catch (_e) {
    fineHover = true;
  }
  let wide = false;
  try {
    wide = window.matchMedia("(min-width: 1024px)").matches;
  } catch (_e2) {
    wide = window.innerWidth >= 1024;
  }

  const interactive = !reduced && fineHover && wide;
  const count = reduced || !wide ? 0 : interactive ? 9 : 5;

  const particles = [];

  // Дрейфующие иконки мед-оборудования вместо логотипов
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "nf-hero-brand-particle nf-hero-medicon";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = nfMedIconSvg(i);
    const w = 30 + Math.floor(Math.random() * 30);
    span.style.setProperty("--nf-hp-w", `${w}px`);
    span.style.setProperty("--nf-hp-o", String(0.1 + Math.random() * 0.1));
    const ax = 0.06 + Math.random() * 0.88;
    const ay = 0.1 + Math.random() * 0.8;
    span.style.left = `${ax * 100}%`;
    span.style.top = `${ay * 100}%`;
    particles.push({
      el: span,
      ax,
      ay,
      phx: Math.random() * Math.PI * 2,
      phy: Math.random() * Math.PI * 2,
      sp: 0.2 + Math.random() * 0.32,
      amp: 16 + Math.random() * 30,
      vx: 0,
      vy: 0,
      scale: 0.82 + Math.random() * 0.38,
    });
    mount.appendChild(span);
  }

  let raf = null;
  let running = false;
  let time = 0;
  let pointerIn = false;
  let pmx = 0.5;
  let pmy = 0.5;
  let smx = 0.5;
  let smy = 0.5;
  let pvx = 0;
  let pvy = 0;
  let mrx = 0;
  let mry = 0;
  let ggx = 42;
  let ggy = 36;
  const hasSculpture = !!root.querySelector(".nf-hero-medtech-sculpture");
  const sculptTilt = hasSculpture && !reduced && fineHover && wide;

  const schedule = () => {
    if (!running) return;
    if (raf == null) raf = requestAnimationFrame(tick);
  };

  const tick = () => {
    raf = null;
    if (!running) return;

    const rect = root.getBoundingClientRect();
    const w = Math.max(rect.width, 1);
    const h = Math.max(rect.height, 1);

    time += 0.016 * 0.34;

    smx += (pmx - smx) * 0.085;
    smy += (pmy - smy) * 0.085;
    const tpx = (smx - 0.5) * 24;
    const tpy = (smy - 0.5) * 19;
    pvx += (tpx - pvx) * 0.065;
    pvy += (tpy - pvy) * 0.065;

    if (!reduced) {
      root.style.setProperty("--nf-hero-pvx", `${pvx.toFixed(3)}px`);
      root.style.setProperty("--nf-hero-pvy", `${pvy.toFixed(3)}px`);
    }

    if (sculptTilt) {
      const nx = (smx - 0.5) * 2;
      const ny = (smy - 0.5) * 2;
      const tgtRx = pointerIn ? ny * -5.2 : 0;
      const tgtRy = pointerIn ? nx * 6.2 : 0;
      mrx += (tgtRx - mrx) * 0.065;
      mry += (tgtRy - mry) * 0.065;
      const tgtGx = 42 + nx * 10;
      const tgtGy = 36 + ny * 8.5;
      ggx += (tgtGx - ggx) * 0.072;
      ggy += (tgtGy - ggy) * 0.072;
      root.style.setProperty("--nf-mt-rx", `${mrx.toFixed(3)}deg`);
      root.style.setProperty("--nf-mt-ry", `${mry.toFixed(3)}deg`);
      root.style.setProperty("--nf-mt-gx", `${ggx.toFixed(2)}%`);
      root.style.setProperty("--nf-mt-gy", `${ggy.toFixed(2)}%`);
    }

    const pull = pointerIn && interactive ? 1 : 0;

    for (let p = 0; p < particles.length; p++) {
      const q = particles[p];
      const axPx = q.ax * w;
      const ayPx = q.ay * h;
      const autoX = Math.sin(time * q.sp + q.phx) * q.amp;
      const autoY = Math.cos(time * q.sp * 0.91 + q.phy) * q.amp * 0.88;

      let magX = 0;
      let magY = 0;
      if (pull) {
        const mx = pmx * w;
        const my = pmy * h;
        const dx = mx - axPx;
        const dy = my - ayPx;
        const len = Math.sqrt(dx * dx + dy * dy) + 48;
        magX = (dx / len) * 56;
        magY = (dy / len) * 56;
      }

      const tx = autoX * (1 - pull * 0.94) + magX;
      const ty = autoY * (1 - pull * 0.94) + magY;
      const ease = pull ? 0.12 : 0.048;
      q.vx += (tx - q.vx) * ease;
      q.vy += (ty - q.vy) * ease;

      const wob = Math.sin(time * 0.72 + q.phx) * (pull ? 1.8 : 3.2);
      const r = wob;
      q.el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${q.vx.toFixed(2)}px, ${q.vy.toFixed(
        2
      )}px, 0) rotate(${r.toFixed(2)}deg) scale(${q.scale.toFixed(3)})`;
    }

    const parallaxMoving = !reduced && (pointerIn || Math.abs(pvx - tpx) > 0.04 || Math.abs(pvy - tpy) > 0.04);
    const tiltActive =
      sculptTilt &&
      (pointerIn ||
        Math.abs(mrx) > 0.025 ||
        Math.abs(mry) > 0.025 ||
        Math.abs(ggx - 42) > 0.45 ||
        Math.abs(ggy - 36) > 0.4);
    if (particles.length > 0 || parallaxMoving || tiltActive) schedule();
  };

  const onMove = (e) => {
    const rect = root.getBoundingClientRect();
    pmx = (e.clientX - rect.left) / Math.max(rect.width, 1);
    pmy = (e.clientY - rect.top) / Math.max(rect.height, 1);
    schedule();
  };

  const onEnter = () => {
    pointerIn = true;
    schedule();
  };

  const onLeave = () => {
    pointerIn = false;
    pmx = 0.5;
    pmy = 0.5;
    schedule();
  };

  running = true;
  if (!reduced && fineHover) {
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
  }

  if (particles.length > 0 || (!reduced && fineHover)) schedule();

  window._nfPremiumHeroCleanup = () => {
    running = false;
    if (raf != null) cancelAnimationFrame(raf);
    raf = null;
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerenter", onEnter);
    root.removeEventListener("pointerleave", onLeave);
    root.style.removeProperty("--nf-hero-pvx");
    root.style.removeProperty("--nf-hero-pvy");
    root.style.removeProperty("--nf-mt-rx");
    root.style.removeProperty("--nf-mt-ry");
    root.style.removeProperty("--nf-mt-gx");
    root.style.removeProperty("--nf-mt-gy");
    particles.forEach((particle) => {
      try {
        particle.el.remove();
      } catch (_e) {}
    });
    mount.innerHTML = "";
  };
}

function nfInitHomeAdvantageCardsAnimation() {
  const cards = document.querySelectorAll(".nf-advantages .nf-adv");
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.style.setProperty("--nf-item-idx", String(index));
    card.classList.add("nf-vp-reveal");
    card.style.setProperty("--nf-vp-stagger", `${index * 55}ms`);
  });
}

/* ═══════════════════════════════════════════════════════════════
   SECTOR GATEWAY — Equipment Hub + Explorer phase navigation
═══════════════════════════════════════════════════════════════ */

/* ── Category premium medical illustrations (ID-keyed) ──────────
   Semi-realistic gradient vector forms. Per-category accent palette.
   Recognisable specific medical device silhouettes, soft depth.      */
const NF_CAT_ILLUSTRATIONS = {

  /* ── Coronary stent — crimson #e05a6d ─────────────────────── */
  "serdechno-sosudistaya-hirurgiya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="st-bd" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#f5a8b8"/><stop offset="45%" stop-color="#e05a6d"/><stop offset="100%" stop-color="#8c2030"/></linearGradient><radialGradient id="st-cp" cx="32%" cy="28%" r="70%"><stop offset="0%" stop-color="#fcc0cc"/><stop offset="100%" stop-color="#b83050"/></radialGradient><clipPath id="st-cl"><rect x="30" y="54" width="140" height="52"/></clipPath><filter id="st-fx" x="-10%" y="-22%" width="120%" height="168%"><feDropShadow dx="0" dy="9" stdDeviation="11" flood-color="#6c0020" flood-opacity="0.26"/></filter></defs><g filter="url(#st-fx)"><ellipse cx="170" cy="80" rx="13" ry="26" fill="#7a1828"/><rect x="30" y="54" width="140" height="52" fill="url(#st-bd)"/><g clip-path="url(#st-cl)" stroke="rgba(255,255,255,0.30)" stroke-width="1.1"><line x1="-22" y1="54" x2="30" y2="106"/><line x1="4" y1="54" x2="56" y2="106"/><line x1="30" y1="54" x2="82" y2="106"/><line x1="56" y1="54" x2="108" y2="106"/><line x1="82" y1="54" x2="134" y2="106"/><line x1="108" y1="54" x2="160" y2="106"/><line x1="134" y1="54" x2="186" y2="106"/><line x1="160" y1="54" x2="212" y2="106"/><line x1="30" y1="54" x2="-22" y2="106"/><line x1="56" y1="54" x2="4" y2="106"/><line x1="82" y1="54" x2="30" y2="106"/><line x1="108" y1="54" x2="56" y2="106"/><line x1="134" y1="54" x2="82" y2="106"/><line x1="160" y1="54" x2="108" y2="106"/><line x1="186" y1="54" x2="134" y2="106"/><line x1="212" y1="54" x2="160" y2="106"/></g><ellipse cx="30" cy="80" rx="13" ry="26" fill="url(#st-cp)"/><ellipse cx="80" cy="63" rx="44" ry="10" fill="rgba(255,255,255,0.24)"/></g></svg>`,

  /* ── Neurosurgical navigation probe — amber #d4916d ────────── */
  "neyrohirurgiya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="nh-hd" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#edd4bc"/><stop offset="50%" stop-color="#d4916d"/><stop offset="100%" stop-color="#8c4820"/></linearGradient><linearGradient id="nh-sh" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#dca882"/><stop offset="100%" stop-color="#7a3814"/></linearGradient><filter id="nh-fx" x="-8%" y="-28%" width="116%" height="195%"><feDropShadow dx="2" dy="9" stdDeviation="10" flood-color="#5c2806" flood-opacity="0.26"/></filter></defs><g filter="url(#nh-fx)"><rect x="12" y="67" width="82" height="26" rx="9" fill="url(#nh-hd)"/><line x1="36" y1="67" x2="36" y2="93" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/><line x1="52" y1="67" x2="52" y2="93" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/><line x1="68" y1="67" x2="68" y2="93" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/><rect x="94" y="73" width="60" height="14" rx="3" fill="url(#nh-sh)"/><line x1="108" y1="73" x2="108" y2="70" stroke="rgba(255,255,255,0.30)" stroke-width="0.8"/><line x1="118" y1="73" x2="118" y2="70" stroke="rgba(255,255,255,0.30)" stroke-width="0.8"/><line x1="128" y1="73" x2="128" y2="70" stroke="rgba(255,255,255,0.30)" stroke-width="0.8"/><line x1="138" y1="73" x2="138" y2="70" stroke="rgba(255,255,255,0.30)" stroke-width="0.8"/><line x1="148" y1="73" x2="148" y2="70" stroke="rgba(255,255,255,0.30)" stroke-width="0.8"/><path d="M154 73 L154 87 L185 80 Z" fill="#6a3010"/><rect x="16" y="69" width="66" height="8" rx="4" fill="rgba(255,255,255,0.26)"/></g></svg>`,

  /* ── Anesthesia face mask — mint #4db89b ───────────────────── */
  "anesteziologiya-reanimaciya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="ar-mk" cx="36%" cy="30%" r="68%"><stop offset="0%" stop-color="#9edccc"/><stop offset="55%" stop-color="#4db89b"/><stop offset="100%" stop-color="#1a7060"/></radialGradient><radialGradient id="ar-cv" cx="38%" cy="34%" r="66%"><stop offset="0%" stop-color="#6cc8b4"/><stop offset="100%" stop-color="#0e5e4a"/></radialGradient><radialGradient id="ar-pt" cx="36%" cy="34%" r="66%"><stop offset="0%" stop-color="#a8e0d0"/><stop offset="100%" stop-color="#1a7860"/></radialGradient><filter id="ar-fx" x="-14%" y="-18%" width="128%" height="162%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#082e22" flood-opacity="0.26"/></filter></defs><g filter="url(#ar-fx)"><ellipse cx="100" cy="83" rx="66" ry="56" fill="url(#ar-mk)"/><ellipse cx="100" cy="85" rx="52" ry="44" fill="url(#ar-cv)"/><ellipse cx="100" cy="85" rx="30" ry="26" fill="#0e5040"/><circle cx="100" cy="82" r="17" fill="url(#ar-pt)"/><circle cx="100" cy="82" r="11" fill="#0a4030"/><circle cx="100" cy="82" r="7" fill="#1e7860"/><ellipse cx="70" cy="54" rx="28" ry="16" fill="rgba(255,255,255,0.28)"/></g></svg>`,

  /* ── CT gantry bore — blue #5a8fd4 ────────────────────────── */
  "radiologiya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="rd-ou" cx="34%" cy="28%" r="72%"><stop offset="0%" stop-color="#a8c4ec"/><stop offset="55%" stop-color="#5a8fd4"/><stop offset="100%" stop-color="#1c3e88"/></radialGradient><radialGradient id="rd-in" cx="40%" cy="36%" r="64%"><stop offset="0%" stop-color="#6898dc"/><stop offset="100%" stop-color="#2048a0"/></radialGradient><filter id="rd-fx" x="-14%" y="-18%" width="128%" height="162%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0c1e48" flood-opacity="0.26"/></filter></defs><g filter="url(#rd-fx)"><circle cx="100" cy="80" r="68" fill="url(#rd-ou)"/><circle cx="100" cy="80" r="50" fill="#0e1e58"/><circle cx="100" cy="80" r="42" fill="url(#rd-in)"/><circle cx="100" cy="80" r="24" fill="#04091e"/><rect x="87" y="104" width="26" height="20" rx="2" fill="#04091e"/><ellipse cx="68" cy="46" rx="30" ry="16" fill="rgba(255,255,255,0.22)"/></g></svg>`,

  /* ── Endoscope distal tip cross-section — teal #32b5c6 ─────── */
  "urologiya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="ur-ou" cx="34%" cy="28%" r="72%"><stop offset="0%" stop-color="#88d8e4"/><stop offset="55%" stop-color="#32b5c6"/><stop offset="100%" stop-color="#1a6878"/></radialGradient><radialGradient id="ur-ln" cx="38%" cy="34%" r="64%"><stop offset="0%" stop-color="#b0e8f0"/><stop offset="100%" stop-color="#0e5868"/></radialGradient><radialGradient id="ur-cm" cx="36%" cy="32%" r="66%"><stop offset="0%" stop-color="#60d0e0"/><stop offset="100%" stop-color="#0c4858"/></radialGradient><filter id="ur-fx" x="-14%" y="-18%" width="128%" height="162%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#062830" flood-opacity="0.26"/></filter></defs><g filter="url(#ur-fx)"><circle cx="100" cy="80" r="66" fill="url(#ur-ou)"/><circle cx="100" cy="80" r="52" fill="#0c3848"/><circle cx="76" cy="80" r="18" fill="url(#ur-ln)"/><circle cx="76" cy="80" r="11" fill="#0a3040"/><circle cx="100" cy="80" r="14" fill="url(#ur-cm)"/><circle cx="100" cy="80" r="8" fill="#081e30"/><circle cx="100" cy="80" r="4" fill="#1a7888"/><circle cx="124" cy="58" r="8" fill="url(#ur-ln)"/><circle cx="132" cy="80" r="8" fill="url(#ur-ln)"/><circle cx="124" cy="102" r="8" fill="url(#ur-ln)"/><ellipse cx="72" cy="50" rx="24" ry="14" fill="rgba(255,255,255,0.24)"/></g></svg>`,

  /* ── Medical laser handpiece — coral #e8836d ───────────────── */
  "esteticheskaya-medicina": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="em-bd" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#f8c0b0"/><stop offset="45%" stop-color="#e8836d"/><stop offset="100%" stop-color="#9c3820"/></linearGradient><linearGradient id="em-tp" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#f0a898"/><stop offset="100%" stop-color="#803018"/></linearGradient><radialGradient id="em-ap" cx="36%" cy="32%" r="68%"><stop offset="0%" stop-color="#fcc8b8"/><stop offset="100%" stop-color="#b04030"/></radialGradient><filter id="em-fx" x="-10%" y="-22%" width="120%" height="168%"><feDropShadow dx="1" dy="9" stdDeviation="11" flood-color="#5c1808" flood-opacity="0.26"/></filter></defs><g filter="url(#em-fx)"><rect x="14" y="64" width="116" height="32" rx="10" fill="url(#em-bd)"/><line x1="44" y1="64" x2="44" y2="96" stroke="rgba(255,255,255,0.22)" stroke-width="1.8"/><line x1="60" y1="64" x2="60" y2="96" stroke="rgba(255,255,255,0.22)" stroke-width="1.8"/><line x1="76" y1="64" x2="76" y2="96" stroke="rgba(255,255,255,0.22)" stroke-width="1.8"/><path d="M130 66 L130 94 L152 90 L152 70 Z" fill="url(#em-tp)"/><circle cx="160" cy="80" r="16" fill="url(#em-ap)"/><circle cx="160" cy="80" r="10" fill="#3c1208"/><circle cx="160" cy="80" r="6" fill="#e07060"/><circle cx="160" cy="80" r="3" fill="#fcc0b0"/><rect x="18" y="66" width="96" height="9" rx="4" fill="rgba(255,255,255,0.26)"/></g></svg>`,

  /* ── Pacemaker D-case with IS-1 header — violet #7c5cbf ────── */
  "elektrokardiostimulyaciya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="ek-cs" cx="34%" cy="28%" r="72%"><stop offset="0%" stop-color="#b8a0e0"/><stop offset="55%" stop-color="#7c5cbf"/><stop offset="100%" stop-color="#401880"/></radialGradient><linearGradient id="ek-hd" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#9880cc"/><stop offset="100%" stop-color="#4c28a0"/></linearGradient><filter id="ek-fx" x="-14%" y="-14%" width="128%" height="155%"><feDropShadow dx="1" dy="9" stdDeviation="11" flood-color="#1c083e" flood-opacity="0.26"/></filter></defs><g filter="url(#ek-fx)"><path d="M30 34 L132 34 Q160 34 160 58 L160 110 Q160 134 132 134 L30 134 Q14 134 14 110 L14 58 Q14 34 30 34 Z" fill="url(#ek-cs)"/><rect x="136" y="38" width="32" height="66" rx="4" fill="url(#ek-hd)"/><circle cx="152" cy="56" r="9" fill="#200e50"/><circle cx="152" cy="56" r="5.5" fill="#130830"/><circle cx="152" cy="80" r="9" fill="#200e50"/><circle cx="152" cy="80" r="5.5" fill="#130830"/><circle cx="152" cy="104" r="9" fill="#200e50"/><circle cx="152" cy="104" r="5.5" fill="#130830"/><ellipse cx="58" cy="58" rx="36" ry="24" fill="rgba(255,255,255,0.20)"/></g></svg>`,

  /* ── ECG electrode disc — sky blue #4fa3c7 ─────────────────── */
  "functionalnaya-diagnostika": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="fd-ds" cx="34%" cy="28%" r="72%"><stop offset="0%" stop-color="#a8d4e8"/><stop offset="55%" stop-color="#4fa3c7"/><stop offset="100%" stop-color="#1868a0"/></radialGradient><radialGradient id="fd-gv" cx="36%" cy="32%" r="66%"><stop offset="0%" stop-color="#7abcdc"/><stop offset="100%" stop-color="#0e5888"/></radialGradient><radialGradient id="fd-sn" cx="36%" cy="30%" r="68%"><stop offset="0%" stop-color="#b8dced"/><stop offset="100%" stop-color="#2878b0"/></radialGradient><filter id="fd-fx" x="-18%" y="-18%" width="136%" height="162%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#082038" flood-opacity="0.24"/></filter></defs><g filter="url(#fd-fx)"><circle cx="100" cy="80" r="66" fill="url(#fd-ds)"/><circle cx="100" cy="80" r="52" fill="#0e3858"/><circle cx="100" cy="80" r="40" fill="url(#fd-gv)"/><circle cx="100" cy="80" r="22" fill="#0a2848"/><circle cx="100" cy="80" r="14" fill="url(#fd-sn)"/><circle cx="100" cy="80" r="7" fill="#062038"/><circle cx="100" cy="80" r="3" fill="#2888c0"/><ellipse cx="72" cy="48" rx="28" ry="16" fill="rgba(255,255,255,0.24)"/></g></svg>`,

  /* ── Hip femoral implant — green #5dac6b ───────────────────── */
  "ortopediya": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="op-hd" cx="32%" cy="26%" r="74%"><stop offset="0%" stop-color="#a4d4b0"/><stop offset="55%" stop-color="#5dac6b"/><stop offset="100%" stop-color="#286840"/></radialGradient><linearGradient id="op-nk" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#7ac490"/><stop offset="100%" stop-color="#1e5030"/></linearGradient><linearGradient id="op-st" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop offset="0%" stop-color="#68b878"/><stop offset="100%" stop-color="#1a4828"/></linearGradient><filter id="op-fx" x="-20%" y="-12%" width="140%" height="155%"><feDropShadow dx="2" dy="9" stdDeviation="11" flood-color="#0a2010" flood-opacity="0.26"/></filter></defs><g filter="url(#op-fx)"><polygon points="86,98 94,148 116,148 108,98" fill="url(#op-st)"/><line x1="90" y1="112" x2="112" y2="112" stroke="rgba(255,255,255,0.20)" stroke-width="1"/><line x1="88" y1="128" x2="114" y2="128" stroke="rgba(255,255,255,0.20)" stroke-width="1"/><path d="M86 98 Q80 84 90 74 Q96 64 108 64 Q120 64 126 76 Q132 88 108 98 Z" fill="url(#op-nk)"/><circle cx="105" cy="52" r="34" fill="url(#op-hd)"/><ellipse cx="90" cy="38" rx="18" ry="12" fill="rgba(255,255,255,0.30)"/></g></svg>`,

  /* ── Fallback — generic medical device ─────────────────────── */
  "_fallback": `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="fb-s" cx="34%" cy="28%" r="70%"><stop offset="0%" stop-color="#b8d0d8"/><stop offset="55%" stop-color="#6898a8"/><stop offset="100%" stop-color="#2c5060"/></radialGradient><filter id="fb-fx" x="-18%" y="-18%" width="136%" height="162%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0e2830" flood-opacity="0.24"/></filter></defs><g filter="url(#fb-fx)"><circle cx="100" cy="80" r="56" fill="url(#fb-s)"/><rect x="88" y="56" width="24" height="48" rx="4" fill="rgba(255,255,255,0.50)"/><rect x="76" y="68" width="48" height="24" rx="4" fill="rgba(255,255,255,0.50)"/><ellipse cx="82" cy="62" rx="18" ry="12" fill="rgba(255,255,255,0.28)"/></g></svg>`,
};

/* ── Per-category accent colors (distinct per specialty) ─────── */
const NF_CAT_ACCENTS = {
  "serdechno-sosudistaya-hirurgiya": "#e05a6d",  /* crimson  */
  "neyrohirurgiya":                   "#d4916d",  /* amber    */
  "anesteziologiya-reanimaciya":      "#4db89b",  /* mint     */
  "radiologiya":                      "#5a8fd4",  /* blue     */
  "urologiya":                        "#32b5c6",  /* teal     */
  "esteticheskaya-medicina":          "#e8836d",  /* coral    */
  "elektrokardiostimulyaciya":        "#7c5cbf",  /* violet   */
  "functionalnaya-diagnostika":       "#4fa3c7",  /* sky blue */
  "ortopediya":                       "#5dac6b",  /* green    */
};

/* ── Per-category light-thread SVG graphics (PFG system) ─────────────
 *  Abstract stroke-only paths, stroke="currentColor", teal-tinted.
 *  Rendered at 170×136 inside .pfg-card__thread (positioned top-right).
 * ──────────────────────────────────────────────────────────────────── */
const NF_CAT_THREADS = {
  "serdechno-sosudistaya-hirurgiya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></g></svg>`,
  "neyrohirurgiya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></g></svg>`,
  "anesteziologiya-reanimaciya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M5 10h2.2l1.3-3 2 6 1.3-3H19"/></g></svg>`,
  "radiologiya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3.5"/></g></svg>`,
  "urologiya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></g></svg>`,
  "esteticheskaya-medicina": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></g></svg>`,
  "elektrokardiostimulyaciya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></g></svg>`,
  "functionalnaya-diagnostika": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></g></svg>`,
  "ortopediya": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(40 23) scale(3.75)" fill="none" stroke="currentColor" stroke-width="0.62" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></g></svg>`,
  "_fallback": `<svg viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="85" cy="68" r="52" stroke="currentColor" stroke-opacity="0.10" stroke-width="1.2"/><circle cx="85" cy="68" r="32" stroke="currentColor" stroke-opacity="0.14" stroke-width="1"/><circle cx="85" cy="68" r="12" stroke="currentColor" stroke-opacity="0.18" stroke-width="1.2"/><line x1="85" y1="16" x2="85" y2="120" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/><line x1="33" y1="68" x2="137" y2="68" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/></svg>`,
};

function nfRenderCatalogHub() {
  const grid = nfEl("catalogHubGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const allProducts = NF_DATA.products || [];
  const rootCatsHub = (NF_DATA.categories || []).filter((c) => !c.parentId);
  rootCatsHub.forEach((c, i) => {
    const count  = allProducts.filter((p) => p.categoryId === c.id && !p.isHidden).length;
    const thread = NF_CAT_THREADS[c.id] || NF_CAT_THREADS["_fallback"];
    const accent = NF_CAT_ACCENTS[c.id] || "#4da6b8";

    const card = nfCreateEl("article", "pfg-card");
    card.setAttribute("role", "listitem");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", c.name);
    card.style.setProperty("--cat-accent", accent);
    card.style.setProperty("--nf-vp-stagger", `${Math.min(i, 14) * 55}ms`);

    card.innerHTML = `
      <div class="pfg-card__bloom" aria-hidden="true"></div>
      <div class="pfg-card__thread" aria-hidden="true">${thread}</div>
      <div class="pfg-card__body">
        <h3 class="pfg-card__name">${nfEscapeHtml(c.name)}</h3>
        ${c.description ? `<p class="pfg-card__desc">${nfEscapeHtml(c.description)}</p>` : ""}
        <div class="pfg-card__footer">
          <span class="pfg-card__count">${nfEscapeHtml(nfItemsCountLabel(count))}</span>
          <span class="pfg-card__cta" aria-hidden="true">
            ${nfEscapeHtml(nfT("common.open", "Открыть"))}
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => nfEnterCatalogExplorer(c.id, { fromHub: true }));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nfEnterCatalogExplorer(c.id, { fromHub: true }); }
    });

    grid.appendChild(card);
  });

  nfInitCardTilt();
}

function nfShowCatalogHub() {
  const hubEl = nfEl("catalogHub");
  const explorerEl = nfEl("catalogExplorer");
  if (!hubEl) return;
  NF_STATE.catalogPhase = "hub";
  if (explorerEl) explorerEl.hidden = true;
  hubEl.hidden = false;
  nfRenderCatalogHub();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nfEnterCatalogExplorer(categoryId, opts = {}) {
  const { replace = false } = opts;
  const cat = (NF_DATA.categories || []).find((c) => c.id === categoryId && !c.parentId);
  if (!cat) return;

  NF_STATE.filters.categoryIds  = new Set([categoryId]);
  NF_STATE.filters.subcategoryId = "";
  NF_STATE.filters.partnerIds   = new Set();
  NF_STATE.filters.model        = "";
  NF_STATE.filters.page         = 1;
  NF_STATE.catalogPhase = "explorer";

  const newUrl = `/catalog?cat=${encodeURIComponent(categoryId)}`;
  if (replace) {
    history.replaceState({ page: "catalog" }, "", newUrl);
  } else {
    history.pushState({ page: "catalog" }, "", newUrl);
  }

  nfShowCatalogExplorer(cat);
}

function nfUpdateExplorerBreadcrumb(catId, subcatId) {
  const bcEl = nfEl("catalogExplorerBreadcrumb");
  if (!bcEl) return;
  if (!subcatId) {
    bcEl.hidden = true;
    bcEl.innerHTML = "";
    return;
  }
  const subcat = (NF_DATA.categories || []).find((c) => c.id === subcatId);
  if (!subcat) { bcEl.hidden = true; return; }

  bcEl.hidden = false;
  bcEl.innerHTML = `
    <button class="nf-bc__item nf-bc__item--link" type="button" id="bcCatBtn"></button>
    <span class="nf-bc__sep" aria-hidden="true">
      <svg viewBox="0 0 10 16" fill="none" width="6" height="10">
        <path d="M2 2l6 6-6 6" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="nf-bc__item nf-bc__item--active"></span>
  `;
  const catName = (NF_DATA.categories || []).find((c) => c.id === catId)?.name || "";
  bcEl.querySelector(".nf-bc__item--link").textContent  = catName;
  bcEl.querySelector(".nf-bc__item--active").textContent = subcat.name;
  bcEl.querySelector("#bcCatBtn").addEventListener("click", () => nfClearSubcategory());
}

function nfShowCatalogExplorer(cat) {
  const hubEl = nfEl("catalogHub");
  const explorerEl = nfEl("catalogExplorer");
  if (!explorerEl) return;
  NF_STATE.catalogPhase = "explorer";

  if (hubEl) hubEl.hidden = true;
  explorerEl.hidden = false;

  const titleEl = nfEl("catalogExplorerTitle");
  const descEl  = nfEl("catalogExplorerDesc");
  if (titleEl) titleEl.textContent = cat.name;
  if (descEl)  descEl.textContent  = cat.description || "";

  nfUpdateSeo({
    title: nfT("seo.category.title", "{name} — каталог НаноФарм", { name: cat.name }),
    description: cat.description || cat.name,
    ogType: "website",
  });

  nfUpdateExplorerBreadcrumb(cat.id, NF_STATE.filters.subcategoryId || "");
  nfRenderCatalogStrip(cat.id, NF_STATE.filters.subcategoryId || "");
  nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
  nfInitCatalogExplorerControls();
}

/** Switch active main category in explorer */
function nfSwitchCatalogCategory(catId) {
  const newCat = (NF_DATA.categories || []).find((x) => x.id === catId && !x.parentId);
  if (!newCat) return;
  NF_STATE.catalogFromHome = false;
  NF_STATE.filters.categoryIds    = new Set([catId]);
  NF_STATE.filters.subcategoryId  = "";
  NF_STATE.filters.partnerIds     = new Set();
  NF_STATE.filters.model          = "";
  NF_STATE.filters.page           = 1;
  history.replaceState({ page: "catalog" }, "", `/catalog?cat=${encodeURIComponent(catId)}`);
  const titleEl = nfEl("catalogExplorerTitle");
  const descEl  = nfEl("catalogExplorerDesc");
  if (titleEl) titleEl.textContent = newCat.name;
  if (descEl)  descEl.textContent  = newCat.description || "";
  nfUpdateSeo({
    title: nfT("seo.category.title", "{name} — каталог НаноФарм", { name: newCat.name }),
    description: newCat.description || newCat.name,
    ogType: "website",
  });
  nfUpdateExplorerBreadcrumb(catId, "");
  nfRenderCatalogStrip(catId, "");
  nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
  // Scroll content area to top smoothly
  const contentEl = nfEl("catalogExplorerHead");
  if (contentEl) contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Select a subcategory — keeps parent category active, filters by subcategoryId */
function nfSwitchSubcategory(subcatId, parentCatId) {
  const subcat = (NF_DATA.categories || []).find((x) => x.id === subcatId);
  if (!subcat) return;
  NF_STATE.filters.subcategoryId = subcatId;
  NF_STATE.filters.page          = 1;
  nfUpdateExplorerBreadcrumb(parentCatId, subcatId);
  nfRenderCatalogStrip(parentCatId, subcatId);
  nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
}

/** Clear subcategory filter, stay in same main category */
function nfClearSubcategory() {
  const catId = NF_STATE.filters.categoryIds.size
    ? [...NF_STATE.filters.categoryIds][0]
    : "";
  NF_STATE.filters.subcategoryId = "";
  NF_STATE.filters.page          = 1;
  nfUpdateExplorerBreadcrumb(catId, "");
  nfRenderCatalogStrip(catId, "");
  nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
}

/** Populate the sticky strip (mobile) and the sidebar rail (desktop/tablet).
 *  activeCategoryId  — main category currently selected
 *  activeSubcategoryId — subcategory currently selected (or "")
 */
function nfRenderCatalogStrip(activeCategoryId, activeSubcategoryId) {
  const itemsEl  = nfEl("catalogStripItems");
  const backBtn  = nfEl("catalogStripBack");
  const railEl   = nfEl("catalogRailItems");
  const railBack = nfEl("catalogRailBack");

  if (backBtn)  backBtn.onclick  = () => nfReturnToCatalogHub();
  if (railBack) railBack.onclick = () => nfReturnToCatalogHub();

  const allCats = NF_DATA.categories || [];
  // Split into root categories and subcategories
  const rootCats = allCats.filter((c) => !c.parentId);
  // Map: parentId → [subcategories]
  const subMap = {};
  allCats.filter((c) => c.parentId).forEach((c) => {
    if (!subMap[c.parentId]) subMap[c.parentId] = [];
    subMap[c.parentId].push(c);
  });

  /* ── Mobile horizontal strip (root categories only, no accordion) ── */
  if (itemsEl) {
    itemsEl.innerHTML = "";
    rootCats.forEach((c) => {
      const isActive = c.id === activeCategoryId;
      const btn = nfCreateEl("button", `nf-catalog-strip__item${isActive ? " is-active" : ""}`);
      btn.type = "button";
      btn.setAttribute("role", "listitem");
      btn.setAttribute("aria-current", isActive ? "true" : "false");
      btn.textContent = c.name;
      if (!isActive) btn.addEventListener("click", () => nfSwitchCatalogCategory(c.id));
      itemsEl.appendChild(btn);
    });
  }

  /* ── Desktop / tablet sidebar rail with accordion ── */
  if (!railEl) return;
  railEl.innerHTML = "";

  rootCats.forEach((c) => {
    const subs   = subMap[c.id] || [];
    const isActiveCat = c.id === activeCategoryId;
    const hasActiveSub = isActiveCat && !!activeSubcategoryId;

    if (subs.length === 0) {
      // No subcategories — plain button
      const btn = nfCreateEl("button", `nf-cat-rail__item${isActiveCat ? " is-active" : ""}`);
      btn.type = "button";
      btn.setAttribute("role", "listitem");
      btn.setAttribute("aria-current", isActiveCat ? "true" : "false");
      btn.textContent = c.name;
      if (!isActiveCat) btn.addEventListener("click", () => nfSwitchCatalogCategory(c.id));
      railEl.appendChild(btn);
      return;
    }

    // Has subcategories — accordion group
    const group = nfCreateEl("div", "nf-cat-rail__group");
    group.dataset.catId = c.id;

    // Main category trigger
    const trigger = nfCreateEl("button", `nf-cat-rail__item nf-cat-rail__item--has-sub${isActiveCat ? " is-active" : ""}`);
    trigger.type = "button";
    trigger.setAttribute("role", "listitem");
    trigger.setAttribute("aria-current", isActiveCat ? "true" : "false");
    trigger.setAttribute("aria-expanded", isActiveCat ? "true" : "false");

    const triggerText = nfCreateEl("span", "nf-cat-rail__item-text");
    triggerText.textContent = c.name;
    trigger.appendChild(triggerText);

    // Chevron icon
    const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chevron.setAttribute("class", "nf-cat-rail__chevron");
    chevron.setAttribute("viewBox", "0 0 16 16");
    chevron.setAttribute("width", "12");
    chevron.setAttribute("height", "12");
    chevron.setAttribute("fill", "none");
    chevron.setAttribute("aria-hidden", "true");
    const chevPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    chevPath.setAttribute("d", "M6 4l4 4-4 4");
    chevPath.setAttribute("stroke", "currentColor");
    chevPath.setAttribute("stroke-width", "1.6");
    chevPath.setAttribute("stroke-linecap", "round");
    chevPath.setAttribute("stroke-linejoin", "round");
    chevron.appendChild(chevPath);
    trigger.appendChild(chevron);

    // Sub-list panel (outer div drives grid animation)
    const subPanel = nfCreateEl("div", `nf-cat-rail__sub${isActiveCat ? " is-open" : ""}`);

    // Inner wrapper (needed for grid-template-rows collapse trick)
    const subInner = nfCreateEl("div", "nf-cat-rail__sub-inner");
    subInner.setAttribute("role", "list");
    subInner.setAttribute("aria-label", `Подкатегории ${c.name}`);

    // "Все" (all) button to clear subcategory filter
    const allBtn = nfCreateEl("button", `nf-cat-rail__subitem${isActiveCat && !activeSubcategoryId ? " is-active" : ""}`);
    allBtn.type = "button";
    allBtn.setAttribute("role", "listitem");
    allBtn.textContent = "Все";
    if (isActiveCat && activeSubcategoryId) {
      allBtn.addEventListener("click", () => nfClearSubcategory());
    } else if (!isActiveCat) {
      allBtn.addEventListener("click", () => nfSwitchCatalogCategory(c.id));
    }
    subInner.appendChild(allBtn);

    // Individual subcategory buttons
    subs.forEach((s) => {
      const isActiveSub = s.id === activeSubcategoryId;
      const subBtn = nfCreateEl("button", `nf-cat-rail__subitem${isActiveSub ? " is-active" : ""}`);
      subBtn.type = "button";
      subBtn.setAttribute("role", "listitem");
      subBtn.textContent = s.name;
      if (!isActiveSub) {
        subBtn.addEventListener("click", () => {
          // If parent not yet active, switch to it first
          if (!isActiveCat) {
            NF_STATE.filters.categoryIds = new Set([c.id]);
            NF_STATE.filters.partnerIds  = new Set();
            NF_STATE.filters.model       = "";
            const parentCat = rootCats.find((x) => x.id === c.id);
            const titleEl   = nfEl("catalogExplorerTitle");
            const descEl    = nfEl("catalogExplorerDesc");
            if (titleEl && parentCat) titleEl.textContent = parentCat.name;
            if (descEl  && parentCat) descEl.textContent  = parentCat.description || "";
          }
          nfSwitchSubcategory(s.id, c.id);
        });
      }
      subInner.appendChild(subBtn);
    });

    subPanel.appendChild(subInner);

    // Toggle expand/collapse on trigger click
    trigger.addEventListener("click", () => {
      if (isActiveCat) {
        // Just toggle expand (don't re-filter)
        const isOpen = subPanel.classList.contains("is-open");
        if (isOpen) {
          subPanel.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          subPanel.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      } else {
        nfSwitchCatalogCategory(c.id);
      }
    });

    group.append(trigger, subPanel);
    railEl.appendChild(group);
  });
}

function nfReturnToCatalogHub() {
  NF_STATE.filters.categoryIds    = new Set();
  NF_STATE.filters.subcategoryId  = "";
  NF_STATE.filters.partnerIds     = new Set();
  NF_STATE.filters.model          = "";
  NF_STATE.filters.page           = 1;
  NF_STATE.catalogPhase = "hub";

  /* If the user arrived here via a homepage category tile, take them back
     to the homepage instead of the catalog root (which they never visited). */
  if (NF_STATE.catalogFromHome) {
    NF_STATE.catalogFromHome = false;
    nfNavigate("home");
    return;
  }

  history.pushState({ page: "catalog" }, "", "/catalog");
  const explorerEl = nfEl("catalogExplorer");
  if (explorerEl) explorerEl.hidden = true;
  nfShowCatalogHub();
}

function nfInitCatalogExplorerControls() {
  const explorerEl = nfEl("catalogExplorer");
  if (!explorerEl || explorerEl.dataset.controlsInited) return;
  explorerEl.dataset.controlsInited = "1";

  const modelInput = nfEl("filterModelInput");
  const resetBtn   = nfEl("filtersResetBtn");
  const sortSelect = nfEl("catalogSort") || nfEl("sortSelect");

  if (modelInput) {
    modelInput.value = NF_STATE.filters.model || "";
    modelInput.addEventListener("input", nfDebounce((e) => {
      NF_STATE.filters.model = e.target.value.trim();
      NF_STATE.filters.page = 1;
      nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
    }, 220));
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      const catId = NF_STATE.filters.categoryIds.size
        ? [...NF_STATE.filters.categoryIds][0] : "";
      NF_STATE.filters.partnerIds    = new Set();
      NF_STATE.filters.subcategoryId = "";
      NF_STATE.filters.model         = "";
      NF_STATE.filters.page          = 1;
      if (modelInput) modelInput.value = "";
      if (catId) nfRenderCatalogStrip(catId, "");
      nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
    };
  }

  if (sortSelect) {
    nfEnhanceSelectDropdown(sortSelect);
    sortSelect.value = NF_STATE.filters.sort;
    sortSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
    sortSelect.onchange = (e) => {
      NF_STATE.filters.sort = e.target.value;
      NF_STATE.filters.page = 1;
      nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
    };
  }

  const syncViewButtons = () => {
    document.querySelectorAll(".nf-view-switch-btn").forEach((btn) => {
      const isActive = btn.dataset.viewmode === NF_STATE.filters.viewMode;
      btn.classList.toggle("nf-view-switch-btn-active", isActive);
      btn.classList.toggle("is-active", isActive);
    });
  };
  document.querySelectorAll(".nf-view-switch-btn").forEach((btn) => {
    btn.onclick = () => {
      const nextMode = btn.dataset.viewmode || "grid";
      if (NF_STATE.filters.viewMode === nextMode) return;
      NF_STATE.filters.viewMode = nextMode;
      NF_STATE.filters.page = 1;
      syncViewButtons();
      nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
    };
  });
  syncViewButtons();

  const filtersSheetBtn = nfEl("catalogFiltersSheetBtn");
  const catalogLayout = document.querySelector(".nf-catalog-layout");
  if (filtersSheetBtn && catalogLayout) {
    const initDesktopFiltersState = () => {
      const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
      if (!isDesktop) {
        catalogLayout.classList.remove("is-filters-collapsed");
        filtersSheetBtn.classList.remove("is-active");
        filtersSheetBtn.removeAttribute("aria-expanded");
        return;
      }
      const initialCollapsed = localStorage.getItem(NF_CATALOG_FILTERS_COLLAPSED_KEY) === "1";
      if (typeof nfCatalogApplyFiltersCollapsedUI === "function") {
        nfCatalogApplyFiltersCollapsedUI(initialCollapsed, { noReflowEvent: false });
      }
    };
    filtersSheetBtn.onclick = () => {
      const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
      if (isDesktop) {
        const collapsed = !catalogLayout.classList.contains("is-filters-collapsed");
        if (typeof nfCatalogApplyFiltersCollapsedUI === "function") {
          nfCatalogApplyFiltersCollapsedUI(collapsed, { noReflowEvent: false });
        }
        localStorage.setItem(NF_CATALOG_FILTERS_COLLAPSED_KEY, collapsed ? "1" : "0");
      } else {
        if (typeof nfOpenCatalogFiltersSheet === "function") nfOpenCatalogFiltersSheet();
      }
    };
    initDesktopFiltersState();
    window.addEventListener("resize", nfDebounce(initDesktopFiltersState, 160), { passive: true });
  }

  const partnerSelect = nfEl("filterPartnerSelect");
  if (partnerSelect) {
    nfRenderCatalogFilters();
    nfEnhanceSelectDropdown(partnerSelect);
    partnerSelect.value = NF_STATE.filters.partnerIds.size === 1 ? [...NF_STATE.filters.partnerIds][0] : "";
    partnerSelect.dispatchEvent(new CustomEvent("nf-enhanced-select-sync", { bubbles: false }));
    partnerSelect.onchange = (e) => {
      NF_STATE.filters.partnerIds = e.target.value ? new Set([e.target.value]) : new Set();
      NF_STATE.filters.page = 1;
      nfApplyCatalogFilters(NF_STATE.filters, { navigateToCatalog: false });
    };
  }
}

function nfInitCategoryPage() {
  const cat = NF_DATA.categories.find((c) => c.id === NF_STATE.categoryDetailId);
  if (!cat) { nfGoPath("/catalog"); return; }

  /* Mark that we arrived from a homepage category tile so the back button
     can return to home rather than the catalog hub.
     Use replaceState (not pushState) to replace the /categories/{slug} entry —
     this prevents a browser-back bounce loop:
       home → /categories/x → /catalog?cat=x → /categories/x → … */
  NF_STATE.catalogFromHome = true;
  const catUrl = `/catalog?cat=${encodeURIComponent(cat.id)}`;
  try { history.replaceState({ page: "catalog" }, "", catUrl); } catch (_e) {}
  nfLoadPage("catalog");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function nfBuildNewsArticleProseHtml(item) {
  const blocks = Array.isArray(item.contentBlocks) ? item.contentBlocks : [];
  if (blocks.length) {
    return blocks
      .map((block) => {
        if (!block || typeof block !== "object") return "";
        const type = String(block.type || "paragraph");
        const text = String(block.text || "").trim();
        const caption = String(block.caption || "").trim();
        if (type === "heading" && text) {
          return `<h2 class="nf-news-editorial__section-h">${nfEscapeHtml(text)}</h2>`;
        }
        if (type === "quote" && text) {
          return `<blockquote class="nf-news-editorial__quote"><p>${nfEscapeHtml(text)}</p></blockquote>`;
        }
        if (type === "callout" && (text || caption)) {
          const titleHtml = caption
            ? `<strong class="nf-news-editorial__callout-title">${nfEscapeHtml(caption)}</strong>`
            : "";
          const bodyHtml = text
            ? `<p class="nf-news-editorial__callout-text">${nfEscapeHtml(text)}</p>`
            : "";
          return `<aside class="nf-news-editorial__callout" role="note">${titleHtml}${bodyHtml}</aside>`;
        }
        if (!text) return "";
        return `<p class="nf-news-editorial__p">${nfEscapeHtml(text)}</p>`;
      })
      .join("");
  }
  const paras = Array.isArray(item.content) && item.content.length ? item.content : [nfNewsExcerpt(item)];
  let out = "";
  let pIdx = 0;
  paras.forEach((entry) => {
    if (typeof entry === "string") {
      out += `<p class="nf-news-editorial__p">${nfEscapeHtml(entry)}</p>`;
      if (pIdx === 0 && item.pullQuote) {
        out += `<blockquote class="nf-news-editorial__quote"><p>${nfEscapeHtml(String(item.pullQuote))}</p></blockquote>`;
      }
      if (pIdx === 1 && item.callout && (item.callout.title || item.callout.text)) {
        const t = item.callout.title ? `<strong class="nf-news-editorial__callout-title">${nfEscapeHtml(String(item.callout.title))}</strong>` : "";
        const b = item.callout.text ? `<p class="nf-news-editorial__callout-text">${nfEscapeHtml(String(item.callout.text))}</p>` : "";
        out += `<aside class="nf-news-editorial__callout" role="note">${t}${b}</aside>`;
      }
      pIdx += 1;
    } else if (entry && typeof entry === "object" && entry.h2) {
      out += `<h2 class="nf-news-editorial__section-h">${nfEscapeHtml(String(entry.h2))}</h2>`;
    } else if (entry && typeof entry === "object" && entry.p) {
      out += `<p class="nf-news-editorial__p">${nfEscapeHtml(String(entry.p))}</p>`;
      if (pIdx === 0 && item.pullQuote) {
        out += `<blockquote class="nf-news-editorial__quote"><p>${nfEscapeHtml(String(item.pullQuote))}</p></blockquote>`;
      }
      if (pIdx === 1 && item.callout && (item.callout.title || item.callout.text)) {
        const t = item.callout.title ? `<strong class="nf-news-editorial__callout-title">${nfEscapeHtml(String(item.callout.title))}</strong>` : "";
        const b = item.callout.text ? `<p class="nf-news-editorial__callout-text">${nfEscapeHtml(String(item.callout.text))}</p>` : "";
        out += `<aside class="nf-news-editorial__callout" role="note">${t}${b}</aside>`;
      }
      pIdx += 1;
    }
  });
  return out;
}

function nfNewsHtmlContent(item) {
  const html = String(
    nfGetLocalizedField(
      item,
      "contentHtml",
      nfGetLocalizedField(item, "content", nfGetLocalizedField(item, "description", ""))
    ) || ""
  ).trim();
  if (!html) return "";
  if (!/[<][a-z!/]/i.test(html)) return "";
  return html;
}

function nfBuildNewsArticleBodyHtml(item) {
  const html = nfNewsHtmlContent(item);
  if (html) return html;
  return nfBuildNewsArticleProseHtml(item);
}

function nfInitNewsArticlePage() {
  const item =
    (NF_DATA.news || []).find((x) => x.id === NF_STATE.newsArticleId) ||
    (NF_DATA.news || []).find((x) => x.id === NF_STATE.selectedNewsId);
  const titleEl = nfEl("newsArticleTitle");
  const bodyEl = nfEl("newsArticleBody");
  const heroImg = nfEl("newsArticleHeroImg");
  const heroPh = nfEl("newsArticleHeroPlaceholder");
  const metaRow = nfEl("newsArticleMetaRow");
  const leadEl = nfEl("newsArticleLead");
  const crumbCur = nfEl("newsArticleCrumbCurrent");
  const catEl = nfEl("newsArticleCategory");
  const asideSum = nfEl("newsArticleAsideSummary");
  const copyBtn = nfEl("newsArticleCopyLink");
  const relatedSec = nfEl("newsArticleRelated");
  const relatedList = nfEl("newsArticleRelatedList");
  const galleryEl = nfEl("newsArticleGallery");
  const galleryGrid = nfEl("newsArticleGalleryGrid");
  const tagsWrap = nfEl("newsArticleTags");
  const tagsInner = nfEl("newsArticleTagsInner");
  const inlineFig = nfEl("newsArticleInlineFigure");
  const inlineImg = nfEl("newsArticleInlineImg");
  const inlineCap = nfEl("newsArticleInlineCaption");

  if (!item || !titleEl || !bodyEl) {
    nfGoPath("/news");
    return;
  }

  const newsTitle = nfNewsTitle(item);
  const newsSummary = nfNewsExcerpt(item);

  nfUpdateSeo({
    title: `${newsTitle} — ${nfT("brand.name", "НаноФарм")}`,
    description: newsSummary || newsTitle,
    ogType: "article",
    ogImage: item.image || (Array.isArray(item.images) ? item.images[0] : null),
  });

  titleEl.textContent = newsTitle;
  if (crumbCur) {
    const short = String(newsTitle || nfT("news.articleFallback", "Материал")).trim();
    crumbCur.textContent = short.length > 56 ? `${short.slice(0, 54)}…` : short;
  }

  if (catEl) {
    const cat = nfNewsCategory(item);
    if (cat) {
      catEl.textContent = cat;
      catEl.hidden = false;
    } else {
      catEl.textContent = "";
      catEl.hidden = true;
    }
  }

  if (metaRow) {
    const dateStr = item.date ? nfFormatDate(item.date) : "";
    const author = String(item.author || "").trim();
    metaRow.innerHTML = `
      <span class="nf-news-editorial__meta-item nf-news-editorial__meta-item--date">${nfEscapeHtml(dateStr)}</span>
      ${author ? `<span class="nf-news-editorial__meta-dot" aria-hidden="true">·</span><span class="nf-news-editorial__meta-item">${nfEscapeHtml(author)}</span>` : ""}
      <span class="nf-news-editorial__meta-dot" aria-hidden="true">·</span>
      <span class="nf-news-editorial__meta-item nf-news-editorial__meta-item--muted">${nfEscapeHtml(nfT("brand.name", "НаноФарм"))}</span>`;
  }

  if (leadEl) {
    leadEl.textContent = newsSummary || newsTitle;
  }
  if (asideSum) {
    asideSum.textContent = newsSummary || newsTitle;
  }

  bodyEl.innerHTML = nfBuildNewsArticleBodyHtml(item);

  const hero = String(item.image || "").trim();
  if (heroImg && heroPh) {
    if (hero) {
      heroImg.src = hero;
      heroImg.alt = newsTitle ? nfFormatTemplate(nfT("news.coverAlt", "Обложка: {title}"), { title: newsTitle }) : "";
      heroImg.hidden = false;
      heroPh.hidden = true;
    } else {
      heroImg.removeAttribute("src");
      heroImg.hidden = true;
      heroPh.hidden = false;
    }
  }

  if (inlineFig && inlineImg && inlineCap) {
    const mid = String(item.inlineImage || "").trim();
    const cap = String(item.inlineCaption || "").trim();
    if (mid) {
      inlineImg.src = mid;
      inlineImg.alt = cap || nfT("news.inlineImageAlt", "Иллюстрация к материалу");
      inlineCap.textContent = cap;
      inlineCap.hidden = !cap;
      inlineFig.hidden = false;
    } else {
      inlineImg.removeAttribute("src");
      inlineFig.hidden = true;
    }
  }

  if (galleryEl && galleryGrid) {
    const imgs = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    const caps = Array.isArray(item.imageCaptions) ? item.imageCaptions : [];
    if (imgs.length >= 2) {
      const slice = imgs.slice(0, 6);
      galleryGrid.dataset.galleryCount = String(slice.length);
      galleryGrid.innerHTML = slice
        .map((src, i) => {
          const c = caps[i] ? `<figcaption class="nf-news-editorial__gallery-cap">${nfEscapeHtml(String(caps[i]))}</figcaption>` : "";
          return `<figure class="nf-news-editorial__gallery-cell nf-news-editorial__gallery-cell--i${i}"><div class="nf-news-editorial__gallery-cell-frame"><img src="${nfEscapeHtml(String(src).trim())}" alt="" loading="lazy" decoding="async" /></div>${c}</figure>`;
        })
        .join("");
      galleryEl.hidden = false;
    } else {
      galleryGrid.innerHTML = "";
      delete galleryGrid.dataset.galleryCount;
      galleryEl.hidden = true;
    }
  }

  if (tagsWrap && tagsInner) {
    const raw = Array.isArray(item.tags) ? item.tags : item.category ? [item.category] : [];
    const tags = [...new Set(raw.map((t) => String(t).trim()).filter(Boolean))];
    if (tags.length) {
      tagsInner.innerHTML = tags.map((t) => `<span class="nf-news-editorial__tag-pill">${nfEscapeHtml(t)}</span>`).join("");
      tagsWrap.hidden = false;
    } else {
      tagsInner.innerHTML = "";
      tagsWrap.hidden = true;
    }
  }

  if (relatedSec && relatedList) {
    const others = (NF_DATA.news || []).filter((n) => n && n.id !== item.id);
    const pick = others.slice(0, 3);
    if (pick.length) {
      relatedList.innerHTML = pick
        .map((n) => {
          const href = `/news/${nfNewsPermalinkSlug(n)}`;
          const media = n.image
            ? `<img src="${nfEscapeHtml(n.image)}" alt="" loading="lazy" decoding="async" />`
            : `<div class="news-feed-card-media-empty"><span>${nfEscapeHtml(nfT("common.news", "News"))}</span></div>`;
          return `<a class="nf-news-card news-feed-card nf-news-editorial__related-card" href="${href}">
            <div class="news-feed-card-media">${media}</div>
            <div class="news-feed-card-body">
              <span class="nf-news-card-chip">${nfEscapeHtml(nfNewsCategory(n))}</span>
              <h3 class="nf-news-card-title">${nfEscapeHtml(nfNewsTitle(n))}</h3>
              <div class="nf-news-card-meta">${nfEscapeHtml(nfFormatDate(n.date))}${n.author ? ` · ${nfEscapeHtml(n.author)}` : ""}</div>
              <p class="nf-news-card-text">${nfEscapeHtml(nfNewsExcerpt(n))}</p>
            </div>
          </a>`;
        })
        .join("");
      relatedSec.hidden = false;
    } else {
      relatedList.innerHTML = "";
      relatedSec.hidden = true;
    }
  }

  if (copyBtn) {
    copyBtn.onclick = async () => {
      const url = String(location.href || "");
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const ta = document.createElement("textarea");
          ta.value = url;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        nfShowToast(nfT("toast.linkCopied", "Ссылка скопирована"));
      } catch (_e) {
        nfShowToast(nfT("toast.linkCopyFailed", "Не удалось скопировать ссылку"));
      }
    };
  }
}

function nfInitCatalogPage() {
  const pageRootEl = nfEl("page-root");
  if (pageRootEl) nfAbortEnhancedSelectsInRoot(pageRootEl);

  nfUpdateSeo({
    title: nfT("seo.catalog.title", "Каталог медицинского оборудования — НаноФарм"),
    description: nfT(
      "seo.catalog.description",
      "Каталог медицинского оборудования НаноФарм: аппараты ИВЛ, радиология, функциональная диагностика, нейрохирургия и другие направления."
    ),
    ogType: "website",
  });

  nfCatalogApplyFiltersFromLocationSearch();
  const catParam = new URLSearchParams(window.location.search || "").get("cat");
  const cat = catParam ? (NF_DATA.categories || []).find((c) => c.id === catParam) : null;

  if (cat) {
    NF_STATE.filters.categoryIds = new Set([cat.id]);
    NF_STATE.catalogPhase = "explorer";
    nfShowCatalogExplorer(cat);
  } else {
    NF_STATE.filters.categoryIds = new Set();
    NF_STATE.catalogPhase = "hub";
    nfShowCatalogHub();
  }
}

function nfClearPdpLoadingMask(pageRoot) {
  pageRoot?.querySelector("[data-nf-pdp-loading]")?.remove();
}

/* ════════════════════════════════════════════════════════════════════
   EDITORIAL PRODUCT PAGE ("Витрина") — full rebuild
   A data-driven, Apple-style editorial showcase rendered entirely from
   product data. Sections appear only when their data exists; nothing is
   faked. Markup is generated into #epdpMain (see pages/product.html).
   ════════════════════════════════════════════════════════════════════ */

function nfEpdpCheckIcon() {
  return '<svg class="nf-epdp-ico" viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><circle cx="8" cy="8" r="6.6" stroke="currentColor" stroke-width="1.2" opacity="0.5"/><path d="M5 8.2L7.2 10.4L11.3 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function nfEpdpExpandIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function nfEpdpArrowIcon() {
  return '<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function nfEpdpRelatedProducts(product) {
  const all = Array.isArray(NF_DATA.products) ? NF_DATA.products : [];
  const visible = (p) => p && !p.isHidden && p.id !== product.id;
  const byId = (id) => all.find((p) => p.id === id);
  const out = [];
  const pushUnique = (p) => {
    if (visible(p) && !out.some((x) => x.id === p.id)) out.push(p);
  };
  if (Array.isArray(product.relatedProductIds)) {
    product.relatedProductIds.forEach((id) => {
      const p = byId(id);
      if (p) pushUnique(p);
    });
  }
  if (out.length < 6) {
    all.filter((p) => visible(p) && p.categoryId === product.categoryId).forEach(pushUnique);
  }
  if (out.length < 6) {
    all.filter((p) => visible(p) && (p.popular || p.isPopular)).forEach(pushUnique);
  }
  return out.slice(0, 6);
}

function nfRenderEditorialPdp(pageRoot, product, category, partnerName) {
  if (!pageRoot) return;
  const main = pageRoot.querySelector("#epdpMain");
  const crumbs = pageRoot.querySelector("#epdpCrumbs");
  if (!main) return;

  const esc = (v) => nfEscapeHtml(String(v == null ? "" : v));
  const catName = category && category.name ? String(category.name) : "";
  const statusLabel = nfProductStatusLabel(product.status, product.availability);
  const statusKey = nfProductStatusKey(product.status, product.availability);
  const priceText =
    product.price != null ? nfFormatPrice(product.price) : nfT("common.priceOnRequest", "Цена по запросу");

  // ── Resolve data ──
  const galleryImages = nfGetProductImages(product).filter((u) => u && String(u).trim());
  const hasRealImage = galleryImages.length > 0;
  const heroImg = hasRealImage ? galleryImages[0] : nfProductPlaceholderSvg();

  const description =
    product.description && String(product.description).trim() ? String(product.description).trim() : "";
  const shortDesc =
    product.shortDesc && String(product.shortDesc).trim()
      ? String(product.shortDesc).trim()
      : nfT("product.defaultShortDesc", "Профессиональное медицинское оборудование.");

  const useCases = Array.isArray(product.useCases)
    ? product.useCases.filter((u) => u && (u.title || u.description))
    : [];

  const specPairs = (Array.isArray(product.specs) ? product.specs : [])
    .map((s) => String(s || "").trim())
    .filter(Boolean)
    .map((s) => nfPdpParseKV(s));

  const { roomList, engineerList } = nfProductRequirementLists(product);
  const allSteps = nfProductServiceSteps(product);
  const { install: installSteps, maintenance: maintenanceSteps } = nfSplitInstallMaintenanceSteps(allSteps);
  const related = nfEpdpRelatedProducts(product);

  // ── Breadcrumbs ──
  if (crumbs) {
    crumbs.innerHTML =
      '<button type="button" class="nf-epdp-crumb" data-page="home">НаноФарм</button>' +
      '<span class="nf-epdp-crumb__sep" aria-hidden="true">/</span>' +
      '<button type="button" class="nf-epdp-crumb" data-page="catalog">Каталог</button>' +
      (catName
        ? '<span class="nf-epdp-crumb__sep" aria-hidden="true">/</span>' +
          '<span class="nf-epdp-crumb nf-epdp-crumb--current">' +
          esc(catName) +
          "</span>"
        : "");
  }

  const html = [];

  // ── HERO ──
  html.push(
    '<header class="nf-epdp-hero" data-pdp-reveal-scroll>' +
      '<div class="nf-epdp-hero__grid">' +
      '<div class="nf-epdp-hero__text">' +
      (catName ? '<p class="nf-epdp-kicker">' + esc(catName) + "</p>" : "") +
      '<h1 class="nf-epdp-title">' +
      esc(product.name) +
      "</h1>" +
      '<p class="nf-epdp-lead">' +
      esc(shortDesc) +
      "</p>" +
      '<div class="nf-epdp-hero__chips">' +
      (product.model ? '<span class="nf-epdp-chip">' + esc(product.model) + "</span>" : "") +
      '<span class="nf-epdp-status-glow nf-epdp-status-glow--' + statusKey + '" role="status">' +
      esc(statusLabel) +
      "</span>" +
      "</div>" +
      '<div class="nf-epdp-hero__price">' +
      '<span class="nf-epdp-price__label">Стоимость</span>' +
      '<span class="nf-epdp-price__value">' +
      esc(priceText) +
      "</span>" +
      "</div>" +
      '<div class="nf-epdp-hero__ctas">' +
      '<button type="button" id="epdpPrimaryBtn" class="nf-btn nf-btn-primary nf-epdp-cta"></button>' +
      '<button type="button" id="epdpQuoteBtn" class="nf-epdp-cta nf-epdp-cta--ghost">Запросить цену</button>' +
      "</div>" +
      '<p class="nf-epdp-hero__trust">' +
      nfEpdpCheckIcon() +
      "Консультация специалиста в течение рабочего дня</p>" +
      "</div>" +
      '<div class="nf-epdp-hero__media">' +
      '<figure class="nf-epdp-stage' +
      (hasRealImage ? "" : " is-placeholder") +
      '" id="epdpStage">' +
      '<img id="epdpHeroImg" class="nf-epdp-stage__img" src="' +
      esc(heroImg) +
      '" alt="' +
      esc(product.name) +
      '" />' +
      (hasRealImage
        ? '<button type="button" class="nf-epdp-stage__zoom" id="epdpZoomBtn" aria-label="Открыть на весь экран">' +
          nfEpdpExpandIcon() +
          "</button>"
        : '<span class="nf-epdp-stage__hint">Фото по запросу</span>') +
      "</figure>" +
      (galleryImages.length > 1
        ? '<div class="nf-epdp-thumbs" id="epdpThumbs">' +
          galleryImages
            .slice(0, 6)
            .map(
              (src, i) =>
                '<button type="button" class="nf-epdp-thumb' +
                (i === 0 ? " is-active" : "") +
                '" data-epdp-thumb="' +
                i +
                '" aria-label="Фото ' +
                (i + 1) +
                '"><img src="' +
                esc(src) +
                '" alt="" loading="lazy" /></button>'
            )
            .join("") +
          "</div>"
        : "") +
      "</div>" +
      "</div>" +
      "</header>"
  );

  // ── STATEMENT (description as editorial lead) ──
  if (description) {
    html.push(
      '<section class="nf-epdp-statement" data-pdp-reveal-scroll>' +
        '<p class="nf-epdp-statement__eyebrow">О решении</p>' +
        '<p class="nf-epdp-statement__lead">' +
        esc(description) +
        "</p>" +
        "</section>"
    );
  }

  // vitals strip removed

  // ── STORY BANDS (alternating visual/text) — only when use-cases exist ──
  if (useCases.length) {
    const bands = useCases
      .map((uc, i) => {
        const mirror = i % 2 === 1;
        const num = String(i + 1).padStart(2, "0");
        return (
          '<section class="nf-epdp-band' +
          (mirror ? " nf-epdp-band--mirror" : "") +
          '" data-pdp-reveal-scroll>' +
          '<div class="nf-epdp-band__visual"><span class="nf-epdp-band__num">' +
          num +
          "</span></div>" +
          '<div class="nf-epdp-band__text">' +
          '<p class="nf-epdp-band__eyebrow">Применение</p>' +
          (uc.title ? '<h2 class="nf-epdp-band__title">' + esc(uc.title) + "</h2>" : "") +
          (uc.description ? '<p class="nf-epdp-band__desc">' + esc(uc.description) + "</p>" : "") +
          "</div>" +
          "</section>"
        );
      })
      .join("");
    html.push('<div class="nf-epdp-bands">' + bands + "</div>");
  }

  // ── SPECS table — only when specs exist ──
  if (specPairs.length) {
    html.push(
      '<section class="nf-epdp-specs" data-pdp-reveal-scroll>' +
        '<div class="nf-epdp-sechead"><p class="nf-epdp-eyebrow">Параметры</p><h2 class="nf-epdp-h2">Технические характеристики</h2></div>' +
        '<div class="nf-epdp-spectable">' +
        specPairs
          .map(
            (kv) =>
              '<div class="nf-epdp-specrow">' +
              '<span class="nf-epdp-specrow__icon">' +
              nfPdpGetPdpStrokeIcon(nfPdpSpecIconSlug(kv.label || kv.value)) +
              "</span>" +
              '<span class="nf-epdp-specrow__k">' +
              esc(kv.label || "Параметр") +
              "</span>" +
              '<span class="nf-epdp-specrow__v">' +
              esc(kv.value) +
              "</span>" +
              "</div>"
          )
          .join("") +
        "</div>" +
        "</section>"
    );
  }

  // ── REQUIREMENTS (two columns) ──
  const reqCol = (title, list, iconKind) => {
    const items = (list || [])
      .map((line) => {
        const kv = nfPdpParseKV(line);
        const icon = nfPdpGetPdpStrokeIcon(nfPdpSpecIconSlug(kv.label || kv.value));
        return (
          '<li class="nf-epdp-req">' +
          '<span class="nf-epdp-req__icon">' +
          icon +
          "</span>" +
          '<span class="nf-epdp-req__body">' +
          (kv.label ? '<span class="nf-epdp-req__k">' + esc(kv.label) + "</span>" : "") +
          '<span class="nf-epdp-req__v">' +
          esc(kv.value) +
          "</span>" +
          "</span>" +
          "</li>"
        );
      })
      .join("");
    return (
      '<div class="nf-epdp-reqcard">' +
      '<h3 class="nf-epdp-reqcard__h">' +
      nfPdpGetPdpStrokeIcon(iconKind) +
      "<span>" +
      esc(title) +
      "</span></h3>" +
      '<ul class="nf-epdp-reqlist">' +
      items +
      "</ul>" +
      "</div>"
    );
  };
  // Подготовка, Внедрение, Сервис — removed

  // ── RELATED ──
  if (related.length) {
    html.push(
      '<section class="nf-epdp-related" data-pdp-reveal-scroll>' +
        '<div class="nf-epdp-sechead"><p class="nf-epdp-eyebrow">Каталог</p><h2 class="nf-epdp-h2">Смотрите также</h2></div>' +
        '<div class="nf-epdp-related__grid">' +
        related
          .map((rp) => {
            const rImgs = nfGetProductImages(rp).filter((u) => u && String(u).trim());
            const rImg = rImgs.length ? rImgs[0] : nfProductPlaceholderSvg();
            const rCat = NF_DATA.categories.find((c) => c.id === rp.categoryId);
            return (
              '<button type="button" class="nf-epdp-relcard" data-epdp-related="' +
              esc(rp.id) +
              '">' +
              '<span class="nf-epdp-relcard__media"><img src="' +
              esc(rImg) +
              '" alt="' +
              esc(rp.name) +
              '" loading="lazy" /></span>' +
              '<span class="nf-epdp-relcard__body">' +
              (rCat && rCat.name ? '<span class="nf-epdp-relcard__cat">' + esc(rCat.name) + "</span>" : "") +
              '<span class="nf-epdp-relcard__name">' +
              esc(rp.name) +
              "</span>" +
              '<span class="nf-epdp-relcard__more">Подробнее ' +
              nfEpdpArrowIcon() +
              "</span>" +
              "</span>" +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        "</section>"
    );
  }

  main.innerHTML = html.join("");

  // ════ Wire interactivity ════
  const bindQuoteClick = (btn) => {
    if (!btn) return;
    btn.onclick = () => {
      nfOpenQuickQuote();
      const quickForm = nfEl("quickQuoteForm");
      const itemsField = quickForm?.elements?.items || quickForm?.querySelector?.('[name="items"]');
      if (quickForm && itemsField && !itemsField.value) {
        itemsField.value = `${product.name} (${product.article || product.model || ""})`;
      }
    };
  };

  ["epdpPrimaryBtn"].forEach((id) => {
    const btn = pageRoot.querySelector("#" + id);
    if (!btn) return;
    nfInitAddToRequestControl(btn, product.id, nfT("common.addToRequest", "В запрос"), {});
    btn.onclick = () => nfToggleCartItem(product.id, 1, { sourceButton: btn });
  });

  bindQuoteClick(pageRoot.querySelector("#epdpQuoteBtn"));
  bindQuoteClick(pageRoot.querySelector("#epdpKpBtn"));

  // Gallery: lightbox + thumbnails
  let currentIndex = 0;
  const heroImgEl = pageRoot.querySelector("#epdpHeroImg");
  const openLightbox = () => {
    if (hasRealImage) nfOpenProductLightbox(galleryImages, currentIndex, product.name);
  };
  if (hasRealImage && heroImgEl) {
    heroImgEl.style.cursor = "zoom-in";
    heroImgEl.onclick = openLightbox;
  }
  const zoomBtn = pageRoot.querySelector("#epdpZoomBtn");
  if (zoomBtn) zoomBtn.onclick = openLightbox;

  if (galleryImages.length > 1) {
    const thumbBtns = pageRoot.querySelectorAll("[data-epdp-thumb]");
    thumbBtns.forEach((tb) => {
      tb.onclick = () => {
        const idx = parseInt(tb.getAttribute("data-epdp-thumb"), 10) || 0;
        currentIndex = idx;
        if (heroImgEl) heroImgEl.src = galleryImages[idx];
        thumbBtns.forEach((x) => x.classList.toggle("is-active", x === tb));
      };
    });
  }

  // Related cards → open product
  pageRoot.querySelectorAll("[data-epdp-related]").forEach((card) => {
    card.onclick = () => {
      const rid = card.getAttribute("data-epdp-related");
      if (rid) nfOpenProductPage(rid);
    };
  });

  // Reveal-on-scroll (reuses the PDP IntersectionObserver helper)
  const revealStop = nfPdpMountRevealScroll(pageRoot);
  pageRoot._nfPdpCleanup = () => {
    if (typeof revealStop === "function") revealStop();
  };
}

function nfInitProductPage() {
  const pageRoot = document.querySelector(".nf-pdp");
  if (!pageRoot) return;

  nfDisposePdpPageEnhancements(pageRoot);

  const pend = NF_STATE.pendingProductPermalink;
  if (pend) {
    const pMatch = nfFindProductByPermalink(pend);
    if (pMatch) {
      NF_STATE.pendingProductPermalink = null;
      NF_STATE.productDetailProductId = pMatch.id;
      NF_STATE.productModalProductId = pMatch.id;
    }
  }

  let id =
    NF_STATE.productDetailProductId ||
    NF_STATE.productModalProductId ||
    NF_STATE.pendingCatalogProductId;

  nfDisposeImageZoomPan("pdp");

  const fallbackNotFound = (message) => {
    nfClearPdpLoadingMask(pageRoot);
    pageRoot.innerHTML = `
      <div class="nf-pdp-toolbar">
        <button type="button" class="nf-pdp-back" data-page="catalog" aria-label="Вернуться в каталог">← В каталог</button>
      </div>
      <div class="nf-container" style="padding:48px 20px;max-width:720px;">
        <div class="nf-empty" role="status">${nfEscapeHtml(message)}</div>
      </div>`;
    nfUpdateSeo({
      title: nfT("seo.productNotFound.title", "Товар не найден — НаноФарм"),
      description: nfT("seo.productNotFound.description", "Запрошенная позиция отсутствует в каталоге или ссылка устарела."),
      ogType: "website",
    });
  };

  if (!id) {
    const waiting =
      NF_STATE.pendingProductPermalink &&
      (NF_CATALOG_LOAD_STATE === "loading" || NF_CATALOG_LOAD_STATE === "idle");
    if (waiting) {
      let mask = pageRoot.querySelector("[data-nf-pdp-loading]");
      if (!mask) {
        mask = document.createElement("div");
        mask.dataset.nfPdpLoading = "1";
        mask.setAttribute("aria-busy", "true");
        mask.className = "nf-pdp-loading-mask";
        mask.style.cssText =
          "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.88);backdrop-filter:blur(4px);z-index:12;";
        mask.innerHTML = `<div class="nf-empty">Загрузка каталога…</div>`;
        const pos = window.getComputedStyle(pageRoot).position;
        if (!pos || pos === "static") pageRoot.style.position = "relative";
        pageRoot.appendChild(mask);
      }
      return;
    }
    if (NF_STATE.pendingProductPermalink) {
      NF_STATE.pendingProductPermalink = null;
      fallbackNotFound(
        nfT(
          "errors.productPermalinkNotFound",
          "Товар по этой ссылке не найден. Проверьте адрес или откройте каталог и выберите модель из списка."
        )
      );
      return;
    }
    fallbackNotFound(nfT("errors.productNotFoundGeneric", "Товар не найден. Вернитесь в каталог и выберите модель ещё раз."));
    return;
  }

  nfClearPdpLoadingMask(pageRoot);

  const product = NF_DATA.products.find((x) => x.id === id);
  if (!product) {
    fallbackNotFound(nfT("errors.productRemoved", "Товар не найден в каталоге. Возможно, он был удалён."));
    return;
  }

  NF_STATE.productDetailProductId = product.id;
  NF_STATE.productModalProductId = product.id;

  const urlSeg = nfPathSegments()[1];
  const canonSeg = nfProductPermalinkSegment(product);
  if (urlSeg && canonSeg && urlSeg !== canonSeg) {
    try {
      history.replaceState({}, "", `/catalog/${canonSeg}`);
    } catch (_e) {}
  }

  const category = NF_DATA.categories.find((c) => c.id === product.categoryId);
  const partnerName = nfGetPartnerName(product.partnerId);

  const seo = product.seo || {};
  nfUpdateSeo({
    title: seo.metaTitle || product.name || nfT("seo.product.fallbackTitle", "Товар каталога — НаноФарм"),
    description:
      seo.metaDescription ||
      product.shortDesc ||
      nfT("seo.product.fallbackDescription", "Профессиональное медицинское оборудование из каталога НаноФарм."),
    ogTitle: seo.ogTitle || seo.metaTitle || product.name,
    ogDescription:
      seo.ogDescription ||
      seo.metaDescription ||
      product.shortDesc ||
      nfT("seo.product.fallbackDescription", "Профессиональное медицинское оборудование из каталога НаноФарм."),
    ogImage: seo.ogImage || (nfGetProductImages(product)[0] || ""),
    ogType: "product",
  });

  pageRoot.classList.remove("nf-pdp--ready");

  // Editorial "Витрина" product page — full rebuild. All section markup is
  // generated by the renderer below into #epdpMain; the page shell (product.html)
  // only carries the back bar + breadcrumbs container.
  nfRenderEditorialPdp(pageRoot, product, category, partnerName);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pageRoot.classList.add("nf-pdp--ready");
    });
  });
}

function nfInitPartnersPage() {
  nfUpdateSeo({
    title: nfT("partners.seoTitle", "Партнёры НаноФарм — производители медицинского оборудования"),
    description: nfT("partners.seoDescription", "Международные и локальные партнёры НаноФарм: производители медицинского оборудования для различных направлений медицины."),
    ogType: "website",
  });
  nfRenderPartners();
  const segs = nfPathSegments();
  if (segs[0] === "partners" && segs[1]) {
    nfOpenPartnerModalBySlug(segs[1], { skipUrlSync: true });
  } else {
    const params = new URLSearchParams(window.location.search);
    const openPartner = params.get("open");
    if (openPartner) {
      nfOpenPartnerModalBySlug(openPartner, { skipUrlSync: true });
    }
  }
  document.querySelectorAll(".nf-view-header").forEach((el) => {
    el.classList.add("nf-vp-reveal");
    el.style.setProperty("--nf-vp-stagger", "0ms");
  });
}

function nfInitNewsPage() {
  const searchInput = nfEl("newsSearchInput");
  const sortDropdown = nfEl("newsSortDropdown");
  const sortBtn = nfEl("newsSortButton");
  const sortMenu = nfEl("newsSortMenu");
  const sortLabel = nfEl("newsSortButtonLabel");
  if (!NF_STATE.newsView) {
    NF_STATE.newsView = { search: "", sort: "recent", category: "all" };
  }

  if (searchInput) {
    searchInput.value = NF_STATE.newsView.search || "";
    searchInput.addEventListener(
      "input",
      nfDebounce((e) => {
        NF_STATE.newsView.search = e.target.value || "";
        nfRenderNews();
      }, 180)
    );
  }

  if (sortBtn && sortMenu) {
    const setSort = (nextSort) => {
      NF_STATE.newsView.sort = nextSort;
      if (sortLabel) sortLabel.textContent = nfNewsSortLabel(nextSort);
      sortMenu.querySelectorAll(".news-sort-option").forEach((opt) => {
        opt.classList.toggle("is-active", opt.dataset.sort === nextSort);
      });
    };
    setSort(NF_STATE.newsView.sort || "recent");

    sortBtn.onclick = () => {
      const expanded = sortBtn.getAttribute("aria-expanded") === "true";
      sortBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
      sortMenu.hidden = expanded;
    };
    sortMenu.querySelectorAll(".news-sort-option").forEach((btn) => {
      btn.onclick = () => {
        setSort(btn.dataset.sort || "recent");
        sortMenu.hidden = true;
        sortBtn.setAttribute("aria-expanded", "false");
        nfRenderNews();
      };
    });
    document.addEventListener("click", (e) => {
      if (!sortDropdown?.contains(e.target)) {
        sortMenu.hidden = true;
        sortBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  nfRenderNews();

  document
    .querySelectorAll(".news-page-hero, .news-page-toolbar, .news-category-chips, .news-featured, .news-list-section")
    .forEach((el, i) => {
    el.classList.add("nf-vp-reveal");
    el.style.setProperty("--nf-vp-stagger", `${i * 60}ms`);
  });
}

function nfInitLegalPage() {
  const root = document.querySelector(".nf-legal");
  if (!root) return;

  const tabs = root.querySelectorAll(".nf-legal-tabs .nf-tab-btn");
  const panels = root.querySelectorAll(".nf-legal-panel");
  if (!tabs.length || !panels.length) return;

  const activate = (key) => {
    tabs.forEach((btn) => {
      const on = btn.dataset.tab === key;
      btn.classList.toggle("nf-tab-btn-active", on);
    });
    panels.forEach((p) => {
      const on = p.dataset.legalPanel === key;
      p.classList.toggle("nf-tab-active", on);
    });
    NF_STATE.legalTab = key;
  };

  tabs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const key = btn.dataset.tab || "privacy";
      activate(key);
    });
  });

  const initial = NF_STATE.legalTab || "privacy";
  activate(initial);

  const leg = document.querySelector(".nf-legal");
  if (leg) {
    leg.querySelectorAll(".nf-view-header, .nf-legal-layout").forEach((el, i) => {
      el.classList.add("nf-vp-reveal");
      el.style.setProperty("--nf-vp-stagger", `${i * 55}ms`);
    });
  }

  nfUpdateSeo({
    title: nfT("seo.legal.title", "Правовая информация — НаноФарм"),
    description: nfT(
      "seo.legal.description",
      "Политика конфиденциальности, пользовательское соглашение и реквизиты компании НаноФарм."
    ),
    ogType: "website",
  });
}

function nfInitAboutPage() {
  nfUpdateSeo({
    title: nfT("seo.about.title", "О компании НаноФарм — поставка медицинского оборудования"),
    description: nfT(
      "seo.about.description",
      "НаноФарм: комплексная поставка и сервис медицинского оборудования для клиник и диагностических центров Казахстана."
    ),
    ogType: "website",
  });
  const page = document.querySelector(".nf-about-page");
  if (!page) return;
  page.querySelectorAll(".nf-about-hero, .nf-about-section").forEach((el, i) => {
    el.classList.add("nf-vp-reveal");
    el.style.setProperty("--nf-vp-stagger", `${Math.min(i, 12) * 50}ms`);
  });
}

function nfInitContactsPage() {
  nfUpdateSeo({
    title: nfT("seo.contacts.title", "Контакты НаноФарм"),
    description: nfT(
      "seo.contacts.description",
      "Контактные данные НаноФарм: адрес, телефон, email и форма обратной связи для запросов по поставке медицинского оборудования."
    ),
    ogType: "website",
  });
  const form = nfEl("contactForm");
  if (form) {
    nfAttachRealtimeValidation(form);
    const successEl = nfEl("contactFormSuccess");
    form.onsubmit = async (e) => {
      e.preventDefault();
      if (!nfValidateForm(form)) return;
      const base = nfApiBase();
      const payload = {
        type: "contact",
        requestType: form.type?.value || "kp",
        name: form.name?.value?.trim() || "",
        company: form.company?.value?.trim() || "",
        phone: form.phone?.value?.trim() || "",
        email: form.email?.value?.trim() || "",
        message: form.message?.value?.trim() || "",
      };
      if (base) {
        try {
          await fetch(base + "/api/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (_err) {}
      }
      if (successEl) successEl.hidden = false;
      nfShowToast(nfT("toast.requestSubmitted", "Заявка отправлена."));
    };

    if (form.type) {
      nfEnhanceSelectDropdown(form.type);
    }
  }

  // Вкладки «Клиентам» (как заказать / сервис / гарантия / FAQ)
  const tabsRoot = document.querySelector(".nf-contacts-tabs");
  if (tabsRoot) {
    const btns = tabsRoot.querySelectorAll(".nf-tab-btn");
    const panels = document.querySelectorAll(".nf-contacts-info-panel");

    const activate = (key) => {
      btns.forEach((b) => {
        b.classList.toggle("nf-tab-btn-active", b.dataset.clientsTab === key);
      });
      panels.forEach((p) => {
        p.classList.toggle("nf-tab-active", p.dataset.clientsPanel === key);
      });
      NF_STATE.clientsTab = key;
    };

    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const key = btn.dataset.clientsTab || "order";
        activate(key);
      });
    });

    const initial = NF_STATE.clientsTab || "order";
    activate(initial);
  }

  nfInitContactsMap();

  const cp = document.querySelector(".nf-contacts-page");
  if (cp) {
    cp
      .querySelectorAll(".nf-contacts-hero, .nf-contacts-hub, .nf-contacts-guides, .nf-contacts-form-section")
      .forEach((el, i) => {
        el.classList.add("nf-vp-reveal");
        el.style.setProperty("--nf-vp-stagger", `${i * 70}ms`);
      });
  }
}

function nfInitContactsMap() {
  const mapEl = document.getElementById("nfContactsMap");
  if (!mapEl || typeof L === "undefined") return;
  if (window._nfContactsMap) {
    try { window._nfContactsMap.remove(); } catch (_) {}
    window._nfContactsMap = null;
  }
  var map = L.map("nfContactsMap").setView([43.211788, 76.908176], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
  }).addTo(map);
  L.marker([43.211788, 76.908176])
    .addTo(map)
    .bindPopup("<strong>НаноФарм</strong><br>ул. Еділ Ерғожин, 28<br>Бостандыкский район, Алматы");
  window._nfContactsMap = map;
  setTimeout(function () {
    if (window._nfContactsMap) window._nfContactsMap.invalidateSize();
  }, 100);
}

function nfInitAdminPage() {
  const base = nfApiBase();
  const headers = nfAdminAuthHeaders();

  if (base) {
    fetch((base || "") + "/api/admin/check", { headers })
      .then((r) => {
        if (r.status === 401) { nfAdminClearToken(); nfRenderAdminLogin(); return; }
      })
      .catch(() => {});

    fetch((base || "") + "/api/requests", { headers })
      .then((r) => {
        if (r.status === 401) { nfAdminOnUnauthorized(); return; }
        return r.json();
      })
      .then((arr) => { if (Array.isArray(arr)) NF_DATA.requests = arr; })
      .catch(() => { NF_DATA.requests = NF_DATA.requests || []; });
  }

  document.querySelectorAll(".nf-admin-nav-btn").forEach((btn) => {
    btn.onclick = () => {
      NF_STATE.adminSection = btn.dataset.adminSection;
      nfRenderAdmin();
    };
  });

  nfRenderAdmin();
}

/* ====== ГЛОБАЛЬНЫЕ ИНИЦИАЛИЗАЦИИ ====== */
function nfInitPremiumHeaderScrolled() {
  const header = document.querySelector(".nf-header--ds");
  if (!header) return;

  const update = () => {
    const y = window.scrollY || 0;
    header.classList.toggle("nf-header--scrolled", y > 10);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function nfInitPartnerModalSheetDrag() {
  /* motion-free: sheet drag disabled */
}

function nfInitNewsModalSheetDrag() {
  /* motion-free: sheet drag disabled */
}

// ── Quick Quote product picker state ──────────────────────────────────────
let NF_QQ_SELECTED = new Set();
let NF_QQ_FROM_CART = false; // true when opened via "Запросить цену" from cart panel

function nfRenderQQPicker(filterText) {
  const list = nfEl("qqPickerList");
  const countEl = nfEl("qqPickerCount");
  if (!list) return;
  const q = (filterText || "").toLowerCase().trim();
  let products = NF_DATA.products || [];
  if (q) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.article || "").toLowerCase().includes(q) ||
      nfGetPartnerName(p.partnerId).toLowerCase().includes(q)
    );
  }
  if (countEl) countEl.textContent = products.length ? `${products.length} позиций` : "";
  list.innerHTML = "";
  if (!products.length) {
    list.innerHTML = `<div class="nf-qq-picker-empty">Ничего не найдено</div>`;
    return;
  }
  const checkSvg = `<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M3 8.5l3.5 3L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const plusSvg  = `<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  products.forEach((p) => {
    const selected = NF_QQ_SELECTED.has(p.id);
    const catName = NF_DATA.categories.find((c) => c.id === p.categoryId)?.name || "";
    const row = nfCreateEl("div", "nf-qq-item" + (selected ? " nf-qq-item--sel" : ""));
    row.dataset.qqProductId = p.id;
    row.innerHTML = `
      <div class="nf-qq-item-thumb"></div>
      <div class="nf-qq-item-info">
        <div class="nf-qq-item-name">${nfEscapeHtml(p.name)}</div>
        <div class="nf-qq-item-meta">${nfEscapeHtml(nfGetPartnerName(p.partnerId))}${catName ? ` · ${nfEscapeHtml(catName)}` : ""}</div>
      </div>
      <button type="button" class="nf-qq-item-toggle" aria-label="${selected ? "Убрать" : "Добавить"}" aria-pressed="${selected}">
        ${selected ? checkSvg : plusSvg}
      </button>`;
    row.querySelector(".nf-qq-item-toggle").onclick = () => {
      const wasSelected = NF_QQ_SELECTED.has(p.id);
      if (wasSelected) NF_QQ_SELECTED.delete(p.id);
      else NF_QQ_SELECTED.add(p.id);
      // Sync back to cart if opened from cart panel
      if (NF_QQ_FROM_CART) {
        if (wasSelected) {
          NF_STATE.cart = NF_STATE.cart.filter((x) => x.productId !== p.id);
          const sel = `[data-nf-add-product="${nfCssEscapeSelector(p.id)}"]`;
          document.querySelectorAll(sel).forEach((b) => nfPlayAddToRequestReset(b));
        } else {
          if (!nfGetCartItem(p.id)) NF_STATE.cart.push({ productId: p.id, qty: 1 });
          const sel = `[data-nf-add-product="${nfCssEscapeSelector(p.id)}"]`;
          document.querySelectorAll(sel).forEach((b) => nfSyncAddToRequestButton(b));
        }
        nfSaveCartToStorage();
        nfUpdateCartBadge();
        nfRenderCart();
      }
      nfRenderQQPicker(filterText);
      nfRenderQQChips();
      nfSyncQQItemsInput();
    };
    list.appendChild(row);
  });
}

function nfRenderQQChips() {
  const wrap = nfEl("qqSelectedChips");
  const countEl = nfEl("qqSelectedCount");
  if (countEl) {
    countEl.textContent = NF_QQ_SELECTED.size ? `${NF_QQ_SELECTED.size} выбрано` : "";
    countEl.hidden = !NF_QQ_SELECTED.size;
  }
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!NF_QQ_SELECTED.size) { wrap.hidden = true; return; }
  wrap.hidden = false;
  NF_QQ_SELECTED.forEach((id) => {
    const p = (NF_DATA.products || []).find((x) => x.id === id);
    if (!p) return;
    const chip = nfCreateEl("div", "nf-qq-chip");
    chip.innerHTML = `<span class="nf-qq-chip-name">${nfEscapeHtml(p.name)}</span>
      <button type="button" class="nf-qq-chip-rm" aria-label="Убрать ${nfEscapeHtml(p.name)}">
        <svg viewBox="0 0 10 10" fill="none" width="9" height="9" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>`;
    chip.querySelector(".nf-qq-chip-rm").onclick = () => {
      NF_QQ_SELECTED.delete(id);
      if (NF_QQ_FROM_CART) {
        NF_STATE.cart = NF_STATE.cart.filter((x) => x.productId !== id);
        const sel = `[data-nf-add-product="${nfCssEscapeSelector(id)}"]`;
        document.querySelectorAll(sel).forEach((b) => nfPlayAddToRequestReset(b));
        nfSaveCartToStorage();
        nfUpdateCartBadge();
        nfRenderCart();
      }
      nfRenderQQChips();
      nfRenderQQPicker(nfEl("qqPickerSearch")?.value || "");
      nfSyncQQItemsInput();
    };
    wrap.appendChild(chip);
  });
}

function nfSyncQQItemsInput() {
  const input = nfEl("qqItemsHidden");
  if (!input) return;
  const lines = [...NF_QQ_SELECTED].map((id) => {
    const p = (NF_DATA.products || []).find((x) => x.id === id);
    return p ? `${p.name}${p.article ? ` (арт. ${p.article})` : ""}` : id;
  });
  input.value = lines.join("\n");
}

function nfOpenQuickQuoteWithCart() {
  const productIds = NF_STATE.cart.map((i) => i.productId);
  nfCloseCartPanel();
  nfOpenQuickQuote({ preselect: productIds, fromCart: true });
}

function nfOpenQuickQuote(opts) {
  const modal = nfEl("quickQuoteModal");
  const backdrop = nfEl("quickQuoteBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();

  // Init product picker
  const preselect = (opts && opts.preselect) ? opts.preselect : [];
  NF_QQ_SELECTED = new Set(preselect);
  NF_QQ_FROM_CART = !!(opts && opts.fromCart);

  // Reset search input
  const searchInput = nfEl("qqPickerSearch");
  if (searchInput) {
    searchInput.value = "";
    // Wire search input (only once via flag)
    if (!searchInput._qqWired) {
      searchInput._qqWired = true;
      searchInput.addEventListener("input", () => {
        nfRenderQQPicker(searchInput.value);
      });
    }
  }

  nfRenderQQPicker("");
  nfRenderQQChips();
  nfSyncQQItemsInput();
}

function nfCloseQuickQuote() {
  const modal = nfEl("quickQuoteModal");
  const backdrop = nfEl("quickQuoteBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  // Hide success message on close
  const quickSuccess = nfEl("quickQuoteSuccess");
  if (quickSuccess) quickSuccess.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  nfUpdateOverlayBody();
}

/* ====== MAGNETIC BUTTONS ====== */
function nfInitMagBtns() {
  const SEL = ".nf-btn:not(:disabled):not([disabled]), .nf-hero--brand .nf-hero-btn";
  const PRIM = ".nf-btn-primary, .nf-hero-btn--primary";
  let cur = null;
  let raf = null;

  function apply(btn, e) {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const isHero = btn.classList.contains("nf-hero-btn");
    const magStr = isHero ? 0.28 : 0.18;
    const tiltStr = isHero ? 11 : 8;
    const sc = isHero ? 1.05 : 1.04;

    const mx = dx * magStr;
    const my = dy * magStr;
    const rx = (dy / (r.height / 2 || 1)) * -tiltStr;
    const ry = (dx / (r.width / 2 || 1)) * tiltStr;

    btn.style.transition = "box-shadow 0.1s ease";
    btn.style.transform = `translate(${mx}px,${my}px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`;
    btn.style.setProperty("--nfbx", `${50 + (dx / r.width) * 70}%`);
    btn.style.setProperty("--nfby", `${50 + (dy / r.height) * 70}%`);

    if (btn.matches(PRIM)) {
      const sx = (mx * 0.35).toFixed(1);
      const sy = (8 + my * 0.35).toFixed(1);
      btn.style.boxShadow = `${sx}px ${sy}px 28px rgba(var(--nf-accent-rgb),0.38), 0 0 0 1px rgba(var(--nf-accent-rgb),0.14)`;
    }
  }

  function release(btn) {
    btn.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease";
    btn.style.transform = "";
    btn.style.boxShadow = "";
    btn.style.removeProperty("--nfbx");
    btn.style.removeProperty("--nfby");
    setTimeout(() => { try { btn.style.transition = ""; } catch (_) {} }, 540);
  }

  document.addEventListener("mousemove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const btn = e.target.closest(SEL);
      if (btn !== cur) {
        if (cur) release(cur);
        cur = btn || null;
      }
      if (cur) apply(cur, e);
    });
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    if (cur) { release(cur); cur = null; }
  });
}

/* ====== BOOT ====== */
document.addEventListener("DOMContentLoaded", () => {
  nfInitLangSwitcherBinding();
  try {
    const saved = localStorage.getItem("nf_lang");
    if (saved === "ru" || saved === "en" || saved === "kz") {
      NF_STATE.lang = saved;
      document.querySelectorAll(".nf-lang-btn").forEach((btn) => {
        const active = btn.dataset.lang === saved;
        btn.textContent = String(btn.dataset.lang || "").toUpperCase();
        btn.classList.toggle("nf-lang-btn-active", active);
        btn.setAttribute("aria-checked", active ? "true" : "false");
      });
    }
  } catch (_e) {}
  try {
    const l = NF_STATE.lang || "ru";
    document.documentElement.setAttribute("lang", l === "en" ? "en" : l === "kz" ? "kz" : "ru");
  } catch (_e) {}

  nfEnsureModalOutsideLayout("newsModal", "newsModalBackdrop");
  const addedBindings = nfRegisterAutoI18nBindings(document);
  if (addedBindings > 0 && String(NF_STATE.lang || "ru") !== "ru") {
    nfRefreshDynamicTranslations(2).catch(() => {});
  }

  // Footer year
  const yearEl = nfEl("footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // NAV: внутренние /path и #hash, плюс data-page / data-route (в т.ч. в подгружаемых фрагментах)
  document.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest("a[href]");
    if (link && link instanceof HTMLAnchorElement && link.target !== "_blank" && !link.hasAttribute("download")) {
      const hrefAttr = link.getAttribute("href");
      if (hrefAttr && hrefAttr.startsWith("/") && !hrefAttr.startsWith("//")) {
        try {
          const u = new URL(hrefAttr, location.origin);
          if (u.origin === location.origin) {
            e.preventDefault();
            const navEl = link.closest("[data-page], [data-route]");
            if (navEl) {
              if (navEl.dataset.legalTab) NF_STATE.legalTab = navEl.dataset.legalTab;
              if (navEl.dataset.clientsTab) NF_STATE.clientsTab = navEl.dataset.clientsTab;
              if (navEl.classList?.contains("nf-nav-link")) {
                nfUpdateNavIndicator(navEl, true);
              }
            }
            nfToggleMobileNav(false);
            nfGoPath(u.pathname + u.search);
            return;
          }
        } catch (_e) {}
      }
      if (hrefAttr && hrefAttr.startsWith("#") && hrefAttr.length > 1 && !hrefAttr.startsWith("#/")) {
        const h = hrefAttr.slice(1).trim();
        if (h && NF_ROUTES[h]) {
          e.preventDefault();
          const navEl = link.closest("[data-page], [data-route]");
          if (navEl) {
            if (navEl.dataset.legalTab) NF_STATE.legalTab = navEl.dataset.legalTab;
            if (navEl.dataset.clientsTab) NF_STATE.clientsTab = navEl.dataset.clientsTab;
            if (navEl.classList?.contains("nf-nav-link")) {
              nfUpdateNavIndicator(navEl, true);
            }
          }
          nfToggleMobileNav(false);
          nfGoPath(h === "home" ? "/" : `/${h}`);
          return;
        }
      }
    }

    const el = e.target.closest("[data-page], [data-route]");
    if (!el) return;
    e.preventDefault();
    const page = el.dataset.page || el.dataset.route;
    if (!page) return;

    if (page === "legal" && el.dataset.legalTab) {
      NF_STATE.legalTab = el.dataset.legalTab;
    }

    if (page === "contacts" && el.dataset.clientsTab) {
      NF_STATE.clientsTab = el.dataset.clientsTab;
    }

    if (el.classList?.contains("nf-nav-link")) {
      nfUpdateNavIndicator(el, true);
    }
    nfToggleMobileNav(false);
    const path = page === "home" ? "/" : `/${page}`;
    nfGoPath(path);
  });

  // CART PANEL
  const cartToggle = nfEl("cartToggleBtn");
  const cartClose = nfEl("cartCloseBtn");
  const cartBackdrop = nfEl("cartBackdrop");
  const cartRequestBtn = nfEl("cartRequestBtn");
  const cartClearBtn = nfEl("cartClearBtn");

  if (cartToggle) cartToggle.onclick = nfOpenCartPanel;
  if (cartClose) cartClose.onclick = nfCloseCartPanel;
  if (cartBackdrop) cartBackdrop.onclick = nfCloseCartPanel;

  const burgerBtn = nfEl("nfBurgerBtn");
  const mobileMenu = nfEl("nfMobileMenu");
  const mobileMenuClose = nfEl("nfMobileMenuClose");
  const mobileMenuBackdrop = mobileMenu?.querySelector(".nf-mobile-menu__backdrop");
  if (burgerBtn) {
    burgerBtn.onclick = () => {
      const isOpen = mobileMenu?.classList.contains("nf-mobile-menu--open");
      nfToggleMobileNav(!isOpen);
    };
  }
  if (mobileMenuClose) mobileMenuClose.onclick = () => nfToggleMobileNav(false);
  if (mobileMenuBackdrop) mobileMenuBackdrop.onclick = () => nfToggleMobileNav(false);

  if (cartRequestBtn) {
    cartRequestBtn.onclick = () => {
      if (!NF_STATE.cart.length) return;
      nfOpenQuickQuoteWithCart();
    };
  }

  if (cartClearBtn) {
    cartClearBtn.onclick = () => {
      if (!NF_STATE.cart.length) return;
      NF_STATE.cart = [];
      nfSaveCartToStorage();
      nfRenderCart();
      nfUpdateCartBadge();
      nfShowToast(nfT("toast.requestListCleared", "Список запросов очищен."));
    };
  }

  // PRODUCT MODAL CLOSE
  const productClose = nfEl("productModalClose");
  const productBackdrop = nfEl("productModalBackdrop");
  if (productClose) productClose.onclick = nfCloseProductModal;
  if (productBackdrop) productBackdrop.onclick = nfCloseProductModal;

  // qty +/- inside product modal
  document.querySelectorAll(".nf-qty-input button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const change = Number(btn.dataset.qtyChange);
      const input = nfEl("productModalQty");
      if (!input) return;

      const v = Math.max(1, (Number(input.value) || 1) + change);
      input.value = v;

      const p = NF_DATA.products.find((x) => x.id === NF_STATE.productModalProductId);
      if (p && p.price != null) {
        const total = nfEl("productModalTotal");
        if (total) total.textContent = `Итого: ${nfFormatPrice(p.price * v)}`;
      }
    });
  });

  // QUICK QUOTE MODAL
  const quickBtn = nfEl("quickQuoteBtn");
  const quickClose = nfEl("quickQuoteClose");
  const quickBackdrop = nfEl("quickQuoteBackdrop");
  if (quickBtn) quickBtn.onclick = nfOpenQuickQuote;
  document.querySelectorAll(".nf-js-quick-quote").forEach((btn) => {
    btn.addEventListener("click", () => {
      nfToggleMobileNav(false);
      nfOpenQuickQuote();
    });
  });
  if (quickClose) quickClose.onclick = nfCloseQuickQuote;
  if (quickBackdrop) quickBackdrop.onclick = nfCloseQuickQuote;

  const quickForm = nfEl("quickQuoteForm");
  if (quickForm) {
    nfAttachRealtimeValidation(quickForm);
    const quickSuccess = nfEl("quickQuoteSuccess");
    quickForm.onsubmit = async (e) => {
      e.preventDefault();
      if (!nfValidateForm(quickForm)) return;
      // Collect selected products from picker
      nfSyncQQItemsInput();
      const itemsValue = nfEl("qqItemsHidden")?.value?.trim() || "";
      const base = nfApiBase();
      const payload = {
        type: "quick_quote",
        name: quickForm.elements.name?.value?.trim() || "",
        company: quickForm.elements.company?.value?.trim() || "",
        phone: quickForm.elements.phone?.value?.trim() || "",
        email: quickForm.elements.email?.value?.trim() || "",
        items: itemsValue,
        productIds: [...NF_QQ_SELECTED],
      };
      if (base) {
        try {
          await fetch(base + "/api/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (_err) {}
      }
      if (quickSuccess) quickSuccess.hidden = false;
      nfShowToast(nfT("toast.requestSent", "Запрос отправлен."));
      // Reset form & picker after short delay
      setTimeout(() => {
        quickForm.reset();
        NF_QQ_SELECTED = new Set();
        nfRenderQQChips();
        nfRenderQQPicker("");
        nfSyncQQItemsInput();
        if (quickSuccess) quickSuccess.hidden = true;
        nfCloseQuickQuote();
      }, 2400);
    };
  }

  // Global search suggestions
  const nfUpdateSearchSuggestions = nfDebounce(() => {
    const input = nfEl("globalSearchInput");
    const box = nfEl("searchSuggestions");
    if (!input || !box) return;

    const q = nfNormalizeSearchText(input.value);
    if (!q) {
      box.classList.remove("nf-search-suggestions-visible");
      box.innerHTML = "";
      return;
    }
    const goCatalogWith = (paramsMap) => {
      const params = new URLSearchParams();
      Object.entries(paramsMap || {}).forEach(([key, value]) => {
        if (value == null) return;
        const normalized = String(value).trim();
        if (!normalized) return;
        params.set(key, normalized);
      });
      nfGoPath(`/catalog${params.toString() ? `?${params.toString()}` : ""}`);
      box.classList.remove("nf-search-suggestions-visible");
    };

    const products = NF_DATA.products
      .filter((p) => {
        const haystack = nfEntitySearchHaystack(p, [
          p.name,
          p.article,
          p.model,
          p.shortDesc,
          p.description,
          nfGetPartnerName(p.partnerId),
        ]);
        return haystack.includes(q);
      })
      .slice(0, 6);

    const categories = NF_DATA.categories.filter(
      (c) =>
        nfEntitySearchHaystack(c, [c.name, c.description]).includes(q)
    );

    const partners = NF_DATA.partners.filter(
      (p) =>
        nfEntitySearchHaystack(p, [p.name, p.country, p.equipment, p.description]).includes(q)
    );

    box.innerHTML = "";

    if (!products.length && !categories.length && !partners.length) {
      box.innerHTML = `<div class="nf-search-group-label">${nfEscapeHtml(nfT("common.searchNothingFound", "Ничего не найдено"))}</div>`;
      box.classList.add("nf-search-suggestions-visible");
      return;
    }

    if (products.length) {
      box.appendChild(nfCreateEl("div", "nf-search-group-label", nfT("search.group.products", "Товары")));
      products.forEach((p) => {
        const item = nfCreateEl("div", "nf-search-item");
        const thumb = nfCreateEl("div", "nf-search-thumb");
        const main = nfCreateEl("div", "nf-search-item-main");
        main.append(
          nfCreateElText("div", "nf-search-item-title", p.name),
          nfCreateElText(
            "div",
            "nf-search-item-meta",
            `${p.article} · ${nfGetPartnerName(p.partnerId)}`
          )
        );

        const cta = nfCreateEl("div", "nf-search-item-cta nf-btn-checkable", "");
        cta.setAttribute("role", "button");
        cta.tabIndex = 0;
        nfInitAddToRequestControl(cta, p.id, nfT("common.addToRequest", "В запрос"), { compact: true });
        cta.addEventListener("click", (e) => {
          e.stopPropagation();
          nfToggleCartItem(p.id, 1, { sourceButton: cta });
        });

        item.append(thumb, main, cta);
        item.addEventListener("click", () => {
          goCatalogWith({ search: p.name });
        });
        box.appendChild(item);
      });
    }

    if (categories.length) {
      box.appendChild(nfCreateEl("div", "nf-search-group-label", nfT("search.group.categories", "Категории")));
      categories.forEach((c) => {
        const item = nfCreateEl("div", "nf-search-item");
        const main = nfCreateEl("div", "nf-search-item-main");
        main.append(
          nfCreateElText("div", "nf-search-item-title", c.name),
          nfCreateElText("div", "nf-search-item-meta", c.description)
        );
        item.append(main);
        item.addEventListener("click", () => {
          goCatalogWith({ cat: c.id });
        });
        box.appendChild(item);
      });
    }

    if (partners.length) {
      box.appendChild(nfCreateEl("div", "nf-search-group-label", nfT("search.group.partners", "Партнёры")));
      partners.forEach((p) => {
        const item = nfCreateEl("div", "nf-search-item");
        const main = nfCreateEl("div", "nf-search-item-main");
        main.append(
          nfCreateElText("div", "nf-search-item-title", p.name),
          nfCreateElText("div", "nf-search-item-meta", `${p.country} · ${p.equipment}`)
        );
        item.append(main);
        item.addEventListener("click", () => {
          goCatalogWith({ brand: p.id });
        });
        box.appendChild(item);
      });
    }

    box.classList.add("nf-search-suggestions-visible");
  }, 220);

  const globalSearchInput = nfEl("globalSearchInput");
  if (globalSearchInput) {
    globalSearchInput.addEventListener("input", nfUpdateSearchSuggestions);
    globalSearchInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      const q = String(globalSearchInput.value || "").trim();
      const params = new URLSearchParams();
      if (q) params.set("search", q);
      nfGoPath(`/catalog${params.toString() ? `?${params.toString()}` : ""}`);
    });
    nfSyncGlobalSearchHint();
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nf-search")) {
      const box = nfEl("searchSuggestions");
      if (box) box.classList.remove("nf-search-suggestions-visible");
    }
  });

  // Partner modal close
  const partnerClose = nfEl("partnerModalClose");
  const partnerBackdrop = nfEl("partnerModalBackdrop");
  const partnerModal = nfEl("partnerModal");
  const partnerModalInner = partnerModal?.querySelector(".nf-modal-inner");
  if (partnerClose) partnerClose.onclick = nfClosePartnerModal;
  if (partnerBackdrop) partnerBackdrop.onclick = nfClosePartnerModal;
  if (partnerModal) {
    partnerModal.addEventListener("click", (e) => {
      if (e.target === partnerModal) nfClosePartnerModal();
    });
  }
  if (partnerModalInner) {
    partnerModalInner.addEventListener("click", (e) => e.stopPropagation());
  }

  // News modal close
  const newsClose = nfEl("newsModalClose");
  const newsBackdrop = nfEl("newsModalBackdrop");
  const newsModal = nfEl("newsModal");
  const newsModalCard = newsModal?.querySelector(".nf-modal-inner.nf-modal-news");
  if (newsClose) newsClose.onclick = nfCloseNewsModal;
  if (newsBackdrop) newsBackdrop.onclick = nfCloseNewsModal;
  if (newsModal) {
    newsModal.addEventListener("click", (e) => {
      if (e.target === newsModal) nfCloseNewsModal();
    });
  }
  if (newsModalCard) {
    newsModalCard.addEventListener("click", (e) => e.stopPropagation());
  }
  nfInitNewsModalMediaControls();

  // ESC closes modals and mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    nfToggleMobileNav(false);
    nfClosePartnerModal();
    nfCloseProductModal();
    nfCloseQuickQuote();
    nfCloseNewsModal();
    nfCloseCartPanel();
  });

  // START APP: прямой заход по /catalog/..., /news/..., старые закладки #catalog → /catalog
  function nfBootInitialPage() {
    const parts = nfPathSegments();
    if (parts.length) {
      return nfResolvePageFromLocation().page;
    }
    const hashInitial = location.hash.replace("#", "").trim();
    if (hashInitial && NF_ROUTES[hashInitial]) {
      const path = hashInitial === "home" ? "/" : `/${hashInitial}`;
      try {
        history.replaceState({}, "", path + location.search);
      } catch (_e) {}
      return nfResolvePageFromLocation().page;
    }
    return "home";
  }

  nfInitMagBtns();

  void (async () => {
    await nfLoadTranslationsForLang(NF_STATE.lang || "ru");
    nfApplyTranslations();
    nfLoadCartFromStorage();
    nfLoadPage(nfBootInitialPage());
    nfUpdateCartBadge();
    nfLoadCatalogFromApi();
    nfInitPremiumHeaderScrolled();
    nfInitPartnerModalSheetDrag();
  })();
});