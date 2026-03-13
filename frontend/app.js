/* ==================================================
   NANOPHARM — app.js (FULL READY / CRASH-PROOF)
   ✅ No ReferenceError (all missing funcs implemented)
   ✅ Safe DOM access (no null crashes)
   ✅ Router loads pages/*.html, highlights nav
   ✅ Product modal + Partner modal stable
   ✅ Basic News + Admin + Form validation included
================================================== */

/* ====== КОНФИГ ====== */
// API_BASE: пустая строка = запросы на тот же домен (/api/...). Для админки на другом домене задайте window.__NF_API_BASE = "https://ваш-сайт.ru" до загрузки скрипта.
const NF_CONFIG = {
  API_BASE: typeof window !== "undefined" && window.__NF_API_BASE !== undefined ? String(window.__NF_API_BASE).replace(/\/$/, "") : "",
  I18N_ENDPOINT: "/api/i18n",
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
    { id: "ardo-medical", name: "Ardo Medical AG", country: "Швейцария", equipment: "Неонатология, медицинские насосы", years: 8, description: "Швейцарский производитель медицинских решений для неонатологии, акушерства и ухода за пациентами.", countProducts: 1, logo: "img/partners/ardo-medical.jpeg" },
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
      id: "proj-university-clinic",
      title: "Комплексное оснащение университетской клиники в Алматы",
      category: "Проект",
      date: "2025-09-10",
      author: "Команда НаноФарм",
      excerpt: "Поставлено более 150 единиц оборудования, включая лабораторные и диагностические комплексы.",
      content: [
        "В рамках проекта по модернизации университетской клиники в Алматы НаноФарм выполнил полный цикл поставки, инсталляции и ввода в эксплуатацию медицинского оборудования.",
        "Комплекс включал лабораторные анализаторы, системы визуализации, оборудование для операционных и отделений реанимации.",
        "Особое внимание было уделено интеграции оборудования с ИТ-инфраструктурой клиники и обучению медицинского персонала.",
      ],
    },
    {
      id: "news-lab-automation",
      title: "Запуск типового решения по автоматизации лабораторий",
      category: "Новость",
      date: "2025-07-01",
      author: "Команда НаноФарм",
      excerpt: "Представлено модульное решение для автоматизации до 80% рутинных операций лаборатории.",
      content: [
        "НаноФарм представил типовое решение по автоматизации лабораторий на базе системы NanoAutomation.",
        "Решение позволяет оптимизировать маршрутизацию проб, снизить количество ручных операций и повысить скорость выполнения исследований.",
        "Система масштабируема и может адаптироваться под текущий парк оборудования клиента.",
      ],
    },
    {
      id: "news-service-247",
      title: "Расширение сервисной службы и поддержка 24/7",
      category: "Новость",
      date: "2025-03-15",
      author: "Сервисная служба НаноФарм",
      excerpt: "Созданы региональные сервисные центры и внедрена единая система регистрации запросов.",
      content: [
        "Для повышения надёжности работы медицинских организаций НаноФарм расширил сервисную сеть и перевёл поддержку на режим 24/7.",
        "Введена единая система регистрации и мониторинга запросов, позволяющая отслеживать статус обращений и планировать профилактические работы.",
        "Инженеры проходят регулярную сертификацию у производителей оборудования.",
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
const NF_CATALOG_PAGE_SIZE = 24;

const NF_STATE = {
  currentPage: "home",
  lang: "ru",
  cart: [],
  pendingCatalogProductId: null,
  filters: {
    search: "",
    categoryIds: new Set(),
    partnerIds: new Set(),
    model: "",
    sort: "popular",
    viewMode: "grid",
    page: 1,
  },
  adminSection: "dashboard",
  selectedPartnerId: null,
  selectedNewsId: null,
  productModalProductId: null,
  legalTab: "privacy",
  clientsTab: "order",
};

const NF_I18N = {
  ru: {},
  en: {
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.partners": "Partners",
    "nav.news": "News",
    "nav.about": "About",
    "nav.contacts": "Contacts",
    "nav.admin": "Admin panel",

    "home.hero.title": "Turnkey supply of medical equipment",
    "home.hero.text":
      "Equipping clinics, laboratories and diagnostic centers. Design, supply, installation and service support.",
    "home.hero.toCatalog": "Go to catalog",
    "home.hero.contact": "Contact us",

    "footer.nav": "Navigation",
    "footer.clients": "For clients",
    "footer.legal": "Legal information",
    "footer.about":
      "Comprehensive solutions for the supply of medical equipment for clinics and laboratories. Design, installation, training and service support.",
    "footer.howToOrder": "How to order",
    "footer.support": "Service and support",
    "footer.warranty": "Warranty terms",
    "footer.faq": "FAQ",
    "footer.privacy": "Privacy policy",
    "footer.tos": "User agreement",
    "footer.requisites": "Company details",
    "footer.copyrightPrefix": "© {year} NanoPharm. All rights reserved.",

    "header.quickQuote": "Quick quote",
    "search.placeholder": "Search by name, model, SKU, partner…",
    "search.advanced": "Advanced search",

    "form.name": "Name",
    "form.company": "Company",
    "form.phone": "Phone",
    "form.phonePlaceholder": "+7 (___) ___-__-__",
    "form.items": "Interested items (models / SKUs)",
    "form.submit": "Send request",
    "form.success": "Request sent. We will contact you shortly.",

    "home.popular.title": "Popular equipment",
    "home.popular.all": "Full catalog",

    "home.categories.title": "Equipment categories",
    "home.partners.title": "Our partners",
    "home.news.title": "Company news",
    "home.news.all": "All news",

    "home.cta.title": "We will select equipment for your project",
    "home.cta.text": "Leave a request and our specialist will contact you.",
    "home.cta.button": "Get consultation",
  },
  kz: {
    "nav.home": "Басты бет",
    "nav.catalog": "Каталог",
    "nav.partners": "Серіктестер",
    "nav.news": "Жаңалықтар",
    "nav.about": "Компания туралы",
    "nav.contacts": "Байланыстар",
    "nav.admin": "Әкімші панелі",

    "home.hero.title": "Медициналық жабдықты кешенді жеткізу",
    "home.hero.text":
      "Клиникаларды, зертханаларды және диагностикалық орталықтарды жарақтандыру. Жобалау, жеткізу, монтаждау және сервистік қолдау.",
    "home.hero.toCatalog": "Каталогқа өту",
    "home.hero.contact": "Бізбен байланысу",

    "footer.nav": "Навигация",
    "footer.clients": "Клиенттерге",
    "footer.legal": "Құқықтық ақпарат",
    "footer.about":
      "Клиникалар мен зертханалар үшін медициналық жабдықты жеткізудің кешенді шешімдері. Жобалау, монтаждау, оқыту және сервистік қолдау.",
    "footer.howToOrder": "Қалай тапсырыс беру керек",
    "footer.support": "Сервис және қолдау",
    "footer.warranty": "Кепілдік шарттары",
    "footer.faq": "Жиі қойылатын сұрақтар",
    "footer.privacy": "Құпиялылық саясаты",
    "footer.tos": "Пайдаланушы келісімі",
    "footer.requisites": "Компания реквизиттері",
    "footer.copyrightPrefix": "© {year} NanoPharm. Барлық құқықтар қорғалған.",

    "header.quickQuote": "Жылдам баға сұранысы",
    "search.placeholder": "Атауы, моделі, артикулы, серіктесі бойынша іздеу…",
    "search.advanced": "Кеңейтілген іздеу",

    "form.name": "Аты",
    "form.company": "Компания",
    "form.phone": "Телефон",
    "form.phonePlaceholder": "+7 (___) ___-__-__",
    "form.items": "Қызықтыратын позициялар (модельдер / артикула)",
    "form.submit": "Сұранысты жіберу",
    "form.success": "Сұраныс жіберілді. Біз жақын арада хабарласамыз.",

    "home.popular.title": "Танымал жабдық",
    "home.popular.all": "Толық каталог",

    "home.categories.title": "Жабдық санаттары",
    "home.partners.title": "Біздің серіктестер",
    "home.news.title": "Компания жаңалықтары",
    "home.news.all": "Барлық жаңалықтар",

    "home.cta.title": "Жобаңызға жабдық таңдап береміз",
    "home.cta.text": "Өтініш қалдырыңыз — маманымыз сізбен хабарласады.",
    "home.cta.button": "Кеңес алу",
  },
};

const NF_POPULAR_MARQUEE = {
  rafId: null,
  offset: 0,
  speedDesktop: 46,
  speedMobile: 18,
  paused: false,
  initialized: false,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragStartOffset: 0,
  dragLock: null,
  dragMoved: false,
  lastTs: 0,
  cleanup: [],
  resizeTimer: null,
  resumeTimer: null,
  currentMode: "marquee",
  // IntersectionObserver state for CPU-friendly marquee
  observer: null,
  sectionEl: null,
  isInView: true,
  get isMobile() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(max-width: 768px)").matches;
  },
  get speed() {
    return this.isMobile ? this.speedMobile : this.speedDesktop;
  },
};

/* ====== SAFE DOM HELPERS ====== */
function nfEl(id) {
  return document.getElementById(id);
}

/* Плавный скролл для кастомных списков (wheel → анимированное scrollTop) */
function nfAttachSmoothScroll(el) {
  if (!el || el.dataset.nfSmoothScroll === "1") return;
  el.dataset.nfSmoothScroll = "1";

  let animFrame = null;
  let targetTop = el.scrollTop;

  const step = () => {
    const current = el.scrollTop;
    const diff = targetTop - current;
    if (Math.abs(diff) < 0.5) {
      el.scrollTop = targetTop;
      animFrame = null;
      return;
    }
    el.scrollTop = current + diff * 0.25; // easing
    animFrame = requestAnimationFrame(step);
  };

  el.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      targetTop = Math.max(0, Math.min(el.scrollHeight - el.clientHeight, targetTop + e.deltaY));
      if (animFrame === null) {
        animFrame = requestAnimationFrame(step);
      }
    },
    { passive: false }
  );
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
      if (opt.value === current.value) btn.classList.add("is-active");
      btn.textContent = opt.text;
      btn.dataset.value = opt.value;
      btn.addEventListener("click", () => {
        if (select.value !== opt.value) {
          select.value = opt.value;
          const ev = new Event("change", { bubbles: true });
          select.dispatchEvent(ev);
        }
        wrapper.classList.remove("is-open");
        buildOptions();
      });
      menu.appendChild(btn);
    });
  };

  buildOptions();

  select.addEventListener("change", buildOptions);

  nfAttachSmoothScroll(menu);

  display.addEventListener("click", () => {
    // На открытии пересобираем меню из актуальных option'ов (SPA/перерисовка/локализация)
    const willOpen = !wrapper.classList.contains("is-open");
    if (willOpen) buildOptions();
    wrapper.classList.toggle("is-open");
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("is-open");
    }
  });

  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  wrapper.appendChild(display);
  wrapper.appendChild(menu);
}
function nfSafeText(id, value) {
  const el = nfEl(id);
  if (!el) return false;
  el.textContent = value ?? "";
  return true;
}
function nfSafeHTML(id, value) {
  const el = nfEl(id);
  if (!el) return false;
  el.innerHTML = value ?? "";
  return true;
}
function nfOn(id, evt, handler) {
  const el = nfEl(id);
  if (!el) return false;
  el.addEventListener(evt, handler);
  return true;
}

/* ====== УТИЛИТЫ ====== */
function nfFormatPrice(value) {
  if (value == null) return "Цена по запросу";
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

function nfCreateEl(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html != null) el.innerHTML = html;
  return el;
}

function nfProductPlaceholderSvg() {
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
        '<defs>' +
        '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#e0f2fe"/>' +
        '<stop offset="1" stop-color="#e5f3f1"/>' +
        "</linearGradient>" +
        "</defs>" +
        '<rect width="400" height="300" rx="24" fill="url(#bg)"/>' +
        '<rect x="60" y="70" width="280" height="150" rx="18" fill="#f9fafb" stroke="#cbd5e1" stroke-width="2"/>' +
        '<rect x="80" y="90" width="120" height="110" rx="14" fill="#e5f3ff"/>' +
        '<rect x="210" y="100" width="100" height="18" rx="9" fill="#d1fae5"/>' +
        '<rect x="210" y="130" width="80" height="14" rx="7" fill="#bfdbfe"/>' +
        '<rect x="210" y="154" width="90" height="14" rx="7" fill="#e5e7eb"/>' +
        '<rect x="210" y="178" width="70" height="14" rx="7" fill="#e5e7eb"/>' +
        '<circle cx="310" cy="205" r="10" fill="#22c55e"/>' +
        '<rect x="60" y="235" width="120" height="12" rx="6" fill="#cbd5e1" opacity="0.7"/>' +
        '<rect x="190" y="235" width="80" height="12" rx="6" fill="#cbd5e1" opacity="0.7"/>' +
        '<rect x="280" y="235" width="60" height="12" rx="6" fill="#cbd5e1" opacity="0.7"/>' +
        '<text x="200" y="268" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="13">Изображение медицинского оборудования</text>' +
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

function nfEnsureProductLightbox() {
  let root = document.getElementById("nfProductLightbox");
  if (root) return root;
  root = document.createElement("div");
  root.id = "nfProductLightbox";
  root.className = "nf-product-lightbox";
  root.innerHTML = `
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
        <img class="nf-product-lightbox-image" alt="" />
      </div>
      <div class="nf-product-lightbox-caption">
        <span class="nf-product-lightbox-title"></span>
        <span class="nf-product-lightbox-counter"></span>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

function nfCloseProductLightbox() {
  const root = document.getElementById("nfProductLightbox");
  if (root) root.classList.remove("is-open");
  NF_PRODUCT_LIGHTBOX_STATE = null;
  document.removeEventListener("keydown", nfProductLightboxKeyHandler);
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
    const zoom = NF_PRODUCT_LIGHTBOX_STATE.zoom || 1;
    imgEl.style.transform = zoom > 1 ? `scale(${zoom})` : "none";
    if (zoom <= 1) {
      imgEl.style.transformOrigin = "50% 50%";
    }
    imgEl.style.cursor = zoom > 1 ? "zoom-out" : "zoom-in";
  }
  if (titleEl) titleEl.textContent = NF_PRODUCT_LIGHTBOX_STATE.productName || "";
  if (counterEl) counterEl.textContent = `${idx + 1} / ${images.length}`;
}

function nfOpenProductLightbox(images, startIndex, productName) {
  if (!images || !images.length) return;
  const root = nfEnsureProductLightbox();
  NF_PRODUCT_LIGHTBOX_STATE = {
    images: images.slice(),
    index: Math.max(0, Math.min(startIndex || 0, images.length - 1)),
    productName: productName || "",
    zoom: 1,
  };

  nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index);
  root.classList.add("is-open");

  const closeBtn = root.querySelector(".nf-product-lightbox-close");
  const prevBtn = root.querySelector(".nf-product-lightbox-prev");
  const nextBtn = root.querySelector(".nf-product-lightbox-next");
  const imageEl = root.querySelector(".nf-product-lightbox-image");
  const imageWrap = root.querySelector(".nf-product-lightbox-image-wrap");

  const applyLensFromPoint = (clientX, clientY) => {
    if (!NF_PRODUCT_LIGHTBOX_STATE || !imageEl) return;
    const zoom = NF_PRODUCT_LIGHTBOX_STATE.zoom || 1;
    if (zoom <= 1) {
      imageEl.style.transformOrigin = "50% 50%";
      imageEl.style.transform = "none";
      return;
    }
    const rect = imageEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    const relY = ((clientY - rect.top) / rect.height) * 100;
    const x = Math.max(0, Math.min(100, relX));
    const y = Math.max(0, Math.min(100, relY));
    imageEl.style.transformOrigin = `${x}% ${y}%`;
    imageEl.style.transform = `scale(${zoom})`;
  };

  if (closeBtn) closeBtn.onclick = nfCloseProductLightbox;
  if (prevBtn) prevBtn.onclick = () => nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index - 1);
  if (nextBtn) nextBtn.onclick = () => nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index + 1);
  if (imageEl) {
    imageEl.onclick = (e) => {
      if (!NF_PRODUCT_LIGHTBOX_STATE) return;
      const current = NF_PRODUCT_LIGHTBOX_STATE.zoom || 1;
      const next = current === 1 ? 2 : 1;
      NF_PRODUCT_LIGHTBOX_STATE.zoom = next;
      nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index);
      if (next > 1 && e && typeof e.clientX === "number" && typeof e.clientY === "number") {
        applyLensFromPoint(e.clientX, e.clientY);
      }
    };
  }

  let touchStartX = null;
  if (imageWrap) {
    imageWrap.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0]?.clientX ?? null;
      },
      { passive: true }
    );
    imageWrap.addEventListener(
      "touchend",
      (e) => {
        if (touchStartX == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
        if (Math.abs(dx) > 40) {
          if (dx < 0) nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index + 1);
          else nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index - 1);
        }
        touchStartX = null;
      },
      { passive: true }
    );

    imageWrap.addEventListener(
      "mousemove",
      (e) => {
        if (!NF_PRODUCT_LIGHTBOX_STATE) return;
        if ((NF_PRODUCT_LIGHTBOX_STATE.zoom || 1) <= 1) return;
        applyLensFromPoint(e.clientX, e.clientY);
      },
      { passive: true }
    );

    imageWrap.addEventListener(
      "wheel",
      (e) => {
        if (!NF_PRODUCT_LIGHTBOX_STATE) return;
        e.preventDefault();
        const delta = e.deltaY || 0;
        const current = NF_PRODUCT_LIGHTBOX_STATE.zoom || 1;
        let nextZoom = current;
        if (delta < 0) {
          nextZoom = Math.min(3, current + 0.25);
        } else if (delta > 0) {
          nextZoom = Math.max(1, current - 0.25);
        }
        if (nextZoom !== current) {
          NF_PRODUCT_LIGHTBOX_STATE.zoom = nextZoom;
          nfProductLightboxShow(NF_PRODUCT_LIGHTBOX_STATE.index);
          if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
            applyLensFromPoint(e.clientX, e.clientY);
          }
        }
      },
      { passive: false }
    );
  }

  document.addEventListener("keydown", nfProductLightboxKeyHandler);
}

function nfShowToast(message) {
  const container = nfEl("toastContainer");
  if (!container) return;
  const toast = nfCreateEl("div", "nf-toast", message);
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(4px)";
    setTimeout(() => toast.remove(), 200);
  }, 2500);
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

function nfNavigateToPartner(partnerId) {
  NF_STATE.selectedPartnerId = partnerId;
  nfNavigate("partners");
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

async function nfLoadCatalogFromApi() {
  const base = nfApiBase();
  const lang = NF_STATE.lang || "ru";
  const url = (base || "") + "/api/catalog?lang=" + encodeURIComponent(lang);
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("API " + res.status);
    const data = await res.json();

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
    nfOnCatalogLoaded();
  } catch (_e) {
    console.warn("НаноФарм: API недоступен, используются начальные данные.");
  }
}

function nfOnCatalogLoaded() {
  const page = NF_STATE.currentPage;
  if (page === "home") nfInitHomePage();
  else if (page === "catalog") nfInitCatalogPage();
  else if (page === "partners") nfInitPartnersPage();
  else if (page === "news") nfInitNewsPage();
}

/* ====== РОУТЕР ====== */
const NF_ROUTES = {
  home: "pages/home.html",
  catalog: "pages/catalog.html",
  partners: "pages/partners.html",
  news: "pages/news.html",
  about: "pages/about.html",
  legal: "pages/legal.html",
  contacts: "pages/contacts.html",
  admin: "pages/admin.html",
  product: "pages/product.html",
};

async function nfLoadPage(page) {
  const root = nfEl("page-root");
  if (!root) return;

  const safe = NF_ROUTES[page] ? page : "home";
  const path = NF_ROUTES[safe];

  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    root.innerHTML = html;
  } catch (e) {
    root.innerHTML = `
      <section class="nf-section">
        <div class="nf-container">
          <h1 style="margin:0 0 8px;">Страница не загрузилась</h1>
          <p style="margin:0;color:#6b7280;">
            Не удалось загрузить <code>${path}</code>.
            Проверь: файл существует, путь верный, и ты открываешь сайт через локальный сервер (Live Server).
          </p>
        </div>
      </section>
    `;
    console.error("nfLoadPage error:", e);
  }

  NF_STATE.currentPage = safe;
  nfSetActiveNav(safe);
  nfApplyTranslations();
  document.body.classList.toggle("nf-admin-mode", safe === "admin");

  // init page hooks
  if (safe === "home") nfInitHomePage();
  if (safe === "catalog") nfInitCatalogPage();
  if (safe === "product") nfInitProductPage();
  if (safe === "partners") nfInitPartnersPage();
  if (safe === "news") nfInitNewsPage();
  if (safe === "legal") nfInitLegalPage();
  if (safe === "contacts") nfInitContactsPage();
  if (safe === "admin") nfInitAdminPage();
}

function nfNavigate(page) {
  const safe = NF_ROUTES[page] ? page : "home";
  history.pushState({ page: safe }, "", `#${safe}`);
  nfLoadPage(safe);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nfSetActiveNav(page) {
  document.querySelectorAll(".nf-nav-link, .nf-mobile-menu__link, .nf-footer-link").forEach((el) => {
    const active = el.dataset.page === page;
    el.classList.toggle("nf-nav-link-active", active && (el.classList.contains("nf-nav-link") || el.classList.contains("nf-mobile-menu__link")));
    el.classList.toggle("nf-footer-link-active", active && el.classList.contains("nf-footer-link"));
    el.setAttribute("aria-current", active ? "page" : "false");
  });
}

window.addEventListener("popstate", (e) => {
  const page = e.state?.page || location.hash.replace("#", "") || "home";
  nfLoadPage(page);
});

/* ====== ЯЗЫК / ПЕРЕВОД ====== */
async function nfCollectBaseTranslations() {
  const map = {};
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key || map[key]) return;
    const attr = el.dataset.i18nAttr;
    const raw = attr ? el.getAttribute(attr) : el.textContent;
    const text = (raw || "").trim();
    if (!text) return;
    map[key] = text;
  });
  return map;
}

async function nfLoadTranslationsForLang(lang) {
  if (lang === "ru") return; // русская версия — базовый текст в разметке
  try {
    const ep = NF_CONFIG.I18N_ENDPOINT;
    const baseMap = await nfCollectBaseTranslations();
    // Сохраняем исходные русские тексты один раз, чтобы можно было вернуться с EN/KZ обратно на RU
    if (!NF_I18N.ru || Object.keys(NF_I18N.ru).length === 0) {
      NF_I18N.ru = baseMap;
    }
    const res = await fetch(ep, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang,
        base: baseMap,
        existing: NF_I18N[lang] || {},
      }),
    });
    if (!res.ok) return;
    const data = await res.json();
    if (!data || typeof data !== "object") return;
    NF_I18N[lang] = { ...(NF_I18N[lang] || {}), ...data };
  } catch (_e) {}
}

function nfApplyTranslations() {
  const dict = NF_I18N[NF_STATE.lang] || {};
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    let value = dict[key];
    if (!value) return;

    if (key === "footer.copyrightPrefix") {
      const year = new Date().getFullYear();
      value = value.replace("{year}", String(year));
    }

    const attr = el.dataset.i18nAttr;
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  });
}

function nfSetLang(lang) {
  NF_STATE.lang = lang;
  document.querySelectorAll(".nf-lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("nf-lang-btn-active", active);
    btn.setAttribute("aria-checked", active ? "true" : "false");
  });
  nfLoadTranslationsForLang(lang).finally(() => {
    nfApplyTranslations();
    nfLoadCatalogFromApi();
  });
}

/* ====== ГЛАВНАЯ ====== */
function nfPopularGetMode() {
  // Legacy split (mobile native scroll vs desktop marquee) is removed.
  // We now use one infinite marquee implementation for all breakpoints
  // with pointer-based drag (mouse) and swipe (touch).
  return "marquee";
}

function nfDestroyPopularMarquee() {
  const state = NF_POPULAR_MARQUEE;

  if (state.rafId) {
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }

  if (state.resumeTimer) {
    clearTimeout(state.resumeTimer);
    state.resumeTimer = null;
  }

  if (Array.isArray(state.cleanup)) {
    state.cleanup.forEach((fn) => {
      try {
        fn();
      } catch (_) {}
    });
  }

  state.cleanup = [];
  state.offset = 0;
  state.paused = false;
  state.isDragging = false;
  state.dragStartX = 0;
  state.dragStartY = 0;
  state.dragStartOffset = 0;
  state.dragLock = null;
  state.dragMoved = false;
  state.lastTs = 0;

  const track = nfEl("popularTrack");
  if (track) {
    track.style.transform = "";
    track.style.willChange = "";
  }
}

function nfRenderPopularCarousel() {
  console.log("[popular] render called");

  const track = nfEl("popularTrack");
  if (!track) {
    console.log("[popular] no track");
    return;
  }

  const viewport =
    track.closest(".nf-popular__viewport") ||
    document.querySelector(".nf-popular__viewport");

  if (!viewport) {
    console.log("[popular] no viewport");
    return;
  }

  const popularSource = (NF_DATA.products || []).filter((p) => p.popular);
  const popular = popularSource.length
    ? popularSource
    : (NF_DATA.products || []).slice(0, 8);

  nfDestroyPopularMarquee();

  track.innerHTML = "";
  if (!popular.length) return;

  const itemsToRender = [...popular, ...popular];

  itemsToRender.forEach((p, index) => {
    const isClone = index >= popular.length;
    track.appendChild(nfPopularCard(p, isClone));
  });

  track.onclick = (e) => {
    if (NF_POPULAR_MARQUEE.dragMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const addBtn = e.target.closest(".nf-popular-add");
    const moreBtn = e.target.closest(".nf-popular-more");
    const card = e.target.closest(".nf-product-card--popular");
    if (!card) return;

    const productId = card.dataset.productId;
    const product = (NF_DATA.products || []).find(
      (x) => String(x.id) === String(productId)
    );
    if (!product) return;

    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      nfAddToCart(productId, 1);
      return;
    }

    if (moreBtn) return;

    nfNavigateToCatalogProduct(productId);
  };

  track.onkeydown = (e) => {
    const card = e.target.closest(".nf-product-card--popular");
    if (!card) return;
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    nfNavigateToCatalogProduct(card.dataset.productId);
  };

  const prev = document.getElementById("popularPrev");
  const next = document.getElementById("popularNext");
  nfBindPopularViewportControls(viewport, prev, next, false);

  requestAnimationFrame(() => {
    setTimeout(() => {
      nfStartPopularMarquee();
    }, 0);
  });
}

function nfBindPopularViewportControls(viewport, prev, next, isMobile = false) {
  if (!viewport) return;

  const state = NF_POPULAR_MARQUEE;

  const updateButtons = () => {
    if (!prev || !next) return;

    if (!isMobile) {
      prev.disabled = true;
      next.disabled = true;
      return;
    }

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const left = Math.round(viewport.scrollLeft);

    prev.disabled = left <= 2;
    next.disabled = left >= maxScroll - 2;
  };

  const getStep = () => {
    const firstCard = viewport.querySelector(".nf-product-card--popular");
    if (!firstCard) return Math.round(viewport.clientWidth * 0.9);

    const cardRect = firstCard.getBoundingClientRect();
    const track = viewport.querySelector(".nf-popular__track");
    const styles = track ? window.getComputedStyle(track) : null;
    const gap = styles
      ? parseFloat(styles.columnGap || styles.gap || "0") || 0
      : 0;

    return Math.round(cardRect.width + gap);
  };

  if (prev) {
    prev.onclick = () => {
      if (!isMobile) return;
      viewport.scrollBy({
        left: -getStep(),
        behavior: "smooth",
      });
    };
  }

  if (next) {
    next.onclick = () => {
      if (!isMobile) return;
      viewport.scrollBy({
        left: getStep(),
        behavior: "smooth",
      });
    };
  }

  const onScroll = () => updateButtons();
  const onResize = () => updateButtons();

  viewport.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  state.cleanup.push(() => viewport.removeEventListener("scroll", onScroll));
  state.cleanup.push(() => window.removeEventListener("resize", onResize));

  requestAnimationFrame(updateButtons);
}

function nfStartPopularMarquee() {
  console.log("[popular] marquee start called");

  const track = nfEl("popularTrack");
  if (!track) {
    console.log("[popular] marquee: no track");
    return;
  }

  const viewport =
    track.closest(".nf-popular__viewport") ||
    document.querySelector(".nf-popular__viewport");
  if (!viewport) {
    console.log("[popular] marquee: no viewport");
    return;
  }

  const state = NF_POPULAR_MARQUEE;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Для блока "Популярное оборудование" не отключаем marquee полностью,
  // даже если в системе включено reduced motion.
  if (prefersReducedMotion) {
    console.log("[popular] reduced motion enabled, marquee still allowed");
  }

  if (state.rafId) {
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }

  track.style.willChange = "transform";

  state.offset = 0;
  state.paused = false;
  state.isDragging = false;
  state.dragMoved = false;
  state.dragLock = null;
  state.lastTs = 0;

  const getLoopWidth = () => {
    const cards = track.querySelectorAll(".nf-product-card--popular");
    if (!cards.length) return 0;
    return track.scrollWidth / 2;
  };

  const debugLoop = () => {
    const w = getLoopWidth();
    console.log("[popular] loopWidth =", w, "scrollWidth =", track.scrollWidth);
    return w;
  };

  const normalizeOffset = () => {
    const loopWidth = getLoopWidth();
    if (!loopWidth) return;
    while (state.offset < 0) state.offset += loopWidth;
    while (state.offset >= loopWidth) state.offset -= loopWidth;
  };

  const applyTransform = () => {
    track.style.transform = `translate3d(${-state.offset}px, 0, 0)`;
  };

  const tick = (ts) => {
    if (!document.body.contains(track)) {
      nfDestroyPopularMarquee();
      return;
    }

    if (!state.lastTs) state.lastTs = ts;
    const dt = ts - state.lastTs;
    state.lastTs = ts;

    if (!state.paused && !state.isDragging && state.isInView) {
      const loopWidth = debugLoop();
      if (loopWidth > 0) {
        state.offset += (state.speed * dt) / 1000;
        normalizeOffset();
        applyTransform();
      }
    }

    state.rafId = requestAnimationFrame(tick);
  };

  const pause = () => {
    state.paused = true;
  };

  const resume = () => {
    if (!state.isDragging) {
      state.paused = false;
    }
  };

  const scheduleResume = (delay = 300) => {
    if (state.resumeTimer) {
      clearTimeout(state.resumeTimer);
    }

    state.resumeTimer = setTimeout(() => {
      state.resumeTimer = null;
      if (!state.isDragging) {
        state.paused = false;
      }
    }, delay);
  };

  const onPointerDown = (e) => {
    state.isDragging = true;
    state.paused = true;
    state.dragMoved = false;
    state.dragLock = null;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
    state.dragStartOffset = state.offset;

    viewport.classList.add("nf-carousel-dragging");

    if (viewport.setPointerCapture) {
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  const onPointerMove = (e) => {
    if (!state.isDragging) return;

    const dx = e.clientX - state.dragStartX;
    const dy = e.clientY - state.dragStartY;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      state.dragMoved = true;
    }

    if (state.dragLock == null) {
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      if (ax < 6 && ay < 6) return;
      state.dragLock = ax >= ay ? "x" : "y";
    }

    if (state.dragLock === "y") return;

    if (e.pointerType !== "mouse") {
      e.preventDefault();
    }

    state.offset = state.dragStartOffset - dx;
    normalizeOffset();
    applyTransform();
  };

  const onPointerUp = () => {
    state.isDragging = false;
    state.dragLock = null;
    viewport.classList.remove("nf-carousel-dragging");
    scheduleResume(320);

    setTimeout(() => {
      state.dragMoved = false;
    }, 0);
  };

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resume);

    state.cleanup.push(() =>
      viewport.removeEventListener("mouseenter", pause)
    );
    state.cleanup.push(() =>
      viewport.removeEventListener("mouseleave", resume)
    );
  }

  const onWheel = (e) => {
    const hasHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const intent = hasHorizontal || e.shiftKey;
    if (!intent) return;

    e.preventDefault();
    state.paused = true;

    const loopWidth = getLoopWidth();
    if (!loopWidth) return;

    state.offset += (e.deltaX || e.deltaY || 0) * 0.8;
    normalizeOffset();
    applyTransform();
    scheduleResume(600);
  };

  const onResize = () => {
    normalizeOffset();
    applyTransform();
  };

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove, { passive: false });
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerUp);
  viewport.addEventListener("lostpointercapture", onPointerUp);
  viewport.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", onResize);

  state.cleanup.push(() =>
    viewport.removeEventListener("pointerdown", onPointerDown)
  );
  state.cleanup.push(() =>
    viewport.removeEventListener("pointermove", onPointerMove)
  );
  state.cleanup.push(() =>
    viewport.removeEventListener("pointerup", onPointerUp)
  );
  state.cleanup.push(() =>
    viewport.removeEventListener("pointercancel", onPointerUp)
  );
  state.cleanup.push(() =>
    viewport.removeEventListener("lostpointercapture", onPointerUp)
  );
  state.cleanup.push(() => viewport.removeEventListener("wheel", onWheel));
  state.cleanup.push(() => window.removeEventListener("resize", onResize));

  applyTransform();
  state.rafId = requestAnimationFrame(tick);
}

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

function nfInitPopularCarouselResponsiveWatcher() {
  const state = NF_POPULAR_MARQUEE;

  if (state.initialized) return;
  state.initialized = true;

  const onResize = () => {
    clearTimeout(state.resizeTimer);
    state.resizeTimer = setTimeout(() => {
      if (NF_STATE.currentPage !== "home") return;

      const nextMode = nfPopularGetMode();
      if (nextMode !== state.currentMode) {
        nfRenderPopularCarousel();
      }
    }, 120);
  };

  window.addEventListener("resize", onResize);
}

function nfInitPopularVisibilityObserver() {
  const state = NF_POPULAR_MARQUEE;

  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  if (state.observer) return;

  const section = document.querySelector(".nf-popular");
  if (!section) return;

  state.sectionEl = section;
  state.isInView = true;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== section) return;

        const visible =
          entry.isIntersecting && entry.intersectionRatio > 0.1;

        state.isInView = visible;

        if (!visible) {
          state.paused = true;
        } else if (!state.isDragging) {
          // Секция снова в зоне видимости — продолжаем плавное движение
          state.paused = false;
        }
      });
    },
    {
      root: null,
      threshold: [0, 0.1, 0.25],
    }
  );

  observer.observe(section);
  state.observer = observer;
}

function nfRenderHomeCategories() {
  const container = nfEl("homeCategories");
  if (!container) return;
  container.innerHTML = "";

  NF_DATA.categories.forEach((c, idx) => {
    const card = nfCreateEl("article", "nf-category-card");
    card.style.background =
      idx % 2 === 0
        ? "linear-gradient(135deg,#ffffff,#f5f7fa)"
        : "linear-gradient(135deg,#f9fafb,#edf2f7)";

    card.innerHTML = `
      <div class="nf-category-title">${c.name}</div>
      <div class="nf-category-desc">${c.description}</div>
      <div class="nf-category-footer">
        <span>${c.count} позиций</span>
        <span>Перейти →</span>
      </div>
    `;

    card.addEventListener("click", () => {
      NF_STATE.filters.categoryIds = new Set([c.id]);
      nfNavigate("catalog");
    });

    container.appendChild(card);
  });
}

function nfRenderHomePartners() {
  const grid = nfEl("homePartnersGrid");
  if (!grid) return;
  grid.innerHTML = "";

  NF_DATA.partners.forEach((p) => {
    const btn = nfCreateEl("button", "nf-partner nf-partner-btn");
    btn.type = "button";
    btn.dataset.partnerId = p.id;

    btn.innerHTML = `
      <span class="nf-partner-logo-wrap" aria-hidden="true">
        <img class="nf-partner-logo-img" alt="" loading="lazy" />
      </span>
      <span class="nf-partner-name">${nfPartnerShortName(p)}</span>
    `;

    const img = btn.querySelector(".nf-partner-logo-img");
    if (img) nfSetPartnerLogo(img, p.id);

    btn.addEventListener("click", () => nfOpenPartnerModal(p.id));
    grid.appendChild(btn);
  });
}

function nfRenderHomeNews() {
  const container = nfEl("homeNews");
  if (!container) return;
  container.innerHTML = "";

  const [main, ...rest] = NF_DATA.news;
  if (!main) {
    container.innerHTML = `<div class="nf-empty">Новостей пока нет.</div>`;
    return;
  }

  const mainEl = nfCreateEl("article", "nf-news-main");
  mainEl.innerHTML = `
    <div class="nf-news-main-image">
      ${
        main.image
          ? `<img src="${main.image}" alt="" class="nf-news-main-image-img" loading="lazy" />`
          : `<div class="nf-news-main-image-placeholder">НаноФарм · Новости</div>`
      }
    </div>
    <div class="nf-chip nf-chip-primary">${main.category}</div>
    <div class="nf-news-main-title">${main.title}</div>
    <div class="nf-news-main-meta">${nfFormatDate(main.date)} · ${main.author}</div>
    <div class="nf-news-main-text">${main.excerpt}</div>
  `;
  mainEl.addEventListener("click", () => {
    NF_STATE.selectedNewsId = main.id;
    nfNavigate("news");
  });

  const side = nfCreateEl("div", "nf-news-side-grid");
  rest.forEach((n) => {
    const card = nfCreateEl("article", "nf-news-card");
    card.innerHTML = `
      ${
        n.image
          ? `<div class="nf-news-card__image"><img src="${n.image}" alt="" loading="lazy" class="nf-news-card__image-img" /></div>`
          : ""
      }
      <div class="nf-news-card-title">${n.title}</div>
      <div class="nf-news-card-meta">${nfFormatDate(n.date)} · ${n.category}</div>
    `;
    card.addEventListener("click", () => {
      NF_STATE.selectedNewsId = n.id;
      nfNavigate("news");
    });
    side.appendChild(card);
  });

  container.append(mainEl, side);
}

/* ====== КАТАЛОГ ====== */
function nfApplyFilters() {
  let list = [...NF_DATA.products];
  const f = NF_STATE.filters;

  if (f.search) {
    const q = f.search.toLowerCase();
    list = list.filter((p) => {
      const partnerName = nfGetPartnerName(p.partnerId).toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.article.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        partnerName.includes(q)
      );
    });
  }

  if (f.categoryIds.size) list = list.filter((p) => f.categoryIds.has(p.categoryId));
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

  return list;
}

function nfRenderCatalogFilters() {
  const catSelect = nfEl("filterCategorySelect");
  const partnerSelect = nfEl("filterPartnerSelect");
  if (!catSelect || !partnerSelect) return;

  const f = NF_STATE.filters;

  // Категории
  catSelect.innerHTML = `<option value="">Все группы</option>`;
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
    nfRenderCatalog();
  };

  // Партнёры
  partnerSelect.innerHTML = `<option value="">Все бренды</option>`;
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
    nfRenderCatalog();
  };

  // Модели (по полю model)

  nfEnhanceSelectDropdown(catSelect);
  nfEnhanceSelectDropdown(partnerSelect);
}

function nfRenderCatalog() {
  nfRenderCatalogFilters();
  const fullList = nfApplyFilters();

  const label = nfEl("catalogCountLabel");
  const activeFilters = nfEl("catalogActiveFilters");
  if (label) label.textContent = `Найдено: ${fullList.length} позиций`;
  if (activeFilters) activeFilters.innerHTML = "";

  const f = NF_STATE.filters;

  if (activeFilters) {
    f.categoryIds.forEach((id) => {
      const c = NF_DATA.categories.find((x) => x.id === id);
      if (!c) return;
      const chip = nfCreateEl("div", "nf-filter-chip");
      chip.innerHTML = `Категория: ${c.name} <button type="button" aria-label="Убрать фильтр">×</button>`;
      chip.querySelector("button").addEventListener("click", () => {
        f.categoryIds.delete(id);
        nfRenderCatalog();
      });
      activeFilters.appendChild(chip);
    });

    f.partnerIds.forEach((id) => {
      const p = NF_DATA.partners.find((x) => x.id === id);
      if (!p) return;
      const chip = nfCreateEl("div", "nf-filter-chip");
      chip.innerHTML = `Партнёр: ${p.name} <button type="button" aria-label="Убрать фильтр">×</button>`;
      chip.querySelector("button").addEventListener("click", () => {
        f.partnerIds.delete(id);
        nfRenderCatalog();
      });
      activeFilters.appendChild(chip);
    });

    if (f.model) {
      const chip = nfCreateEl("div", "nf-filter-chip");
      chip.innerHTML = `Модель: ${f.model} <button type="button" aria-label="Убрать фильтр">×</button>`;
      chip.querySelector("button").addEventListener("click", () => {
        f.model = "";
        const input = nfEl("filterModelInput");
        if (input) input.value = "";
        nfRenderCatalog();
      });
      activeFilters.appendChild(chip);
    }
  }

  const container = nfEl("catalogProducts");
  if (!container) return;

  const total = fullList.length;
  const pageSize = NF_CATALOG_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  let currentPage = Number(f.page) || 1;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  f.page = currentPage;
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = fullList.slice(startIndex, startIndex + pageSize);

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

  pageItems.forEach((p) => {
    const card = nfCreateEl("article", "nf-product-card nf-product-card--catalog");

    const thumb = nfCreateEl("div", "nf-product-thumb");
    const thumbInner = nfCreateEl("div", "nf-product-thumb-inner");
    const img = document.createElement("img");
    img.alt = p.name;
    const galleryImages = nfGetProductImages(p);
    const primarySrc = galleryImages[0] || p.image || "";
    if (primarySrc && String(primarySrc).trim()) {
      img.src = primarySrc;
      nfConfigureImageElement(img, {
        loading: "lazy",
        decoding: "async",
        fetchPriority: "low",
        width: 600,
        height: 450,
      });
      img.onerror = () => {
        img.src = nfProductPlaceholderSvg();
      };
    } else {
      img.src = nfProductPlaceholderSvg();
      nfConfigureImageElement(img, {
        loading: "lazy",
        decoding: "async",
        fetchPriority: "low",
        width: 600,
        height: 450,
      });
    }
    thumbInner.appendChild(img);
    thumb.appendChild(thumbInner);
    thumb.addEventListener("click", () => nfOpenProductPage(p.id));

    const body = nfCreateEl("div", "nf-product-body");
    const titleBlock = nfCreateEl("div", "nf-popular-title-block");

    if (p.popular) {
      const badgeWrap = nfCreateEl("div", "nf-popular-badge-wrap");
      const badge = nfCreateEl("span", "nf-popular-badge", "Популярный");
      badgeWrap.appendChild(badge);
      titleBlock.appendChild(badgeWrap);
    }

    const title = nfCreateEl("div", "nf-product-title", p.name);
    title.addEventListener("click", () => nfOpenProductPage(p.id));
    titleBlock.appendChild(title);

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

    const footer = nfCreateEl("div", "nf-product-footer");
    footer.appendChild(nfCreateEl("div", p.price ? "nf-price" : "nf-price-muted", nfFormatPrice(p.price)));

    const actions = nfCreateEl("div", "nf-product-actions");
  const addBtn = nfCreateEl(
    "button",
    "nf-btn nf-btn-primary nf-btn-sm nf-btn-checkable",
    `<span class="nf-btn-icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5h2l1.2 8.4A1.5 1.5 0 0 0 9.7 15h7.1a1.5 1.5 0 0 0 1.47-1.19L19.8 9H8.3" stroke="#0b1f1c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="18" r="1.3" fill="#0b1f1c" />
        <circle cx="17" cy="18" r="1.3" fill="#0b1f1c" />
      </svg>
    </span><span class="nf-btn-label">В запрос</span>`
  );
    addBtn.type = "button";
    addBtn.addEventListener("click", () => {
      nfAddToCart(p.id, 1);
      nfAnimateAddToCartButton(addBtn);
    });

  const moreBtn = nfCreateEl(
    "button",
    "nf-btn nf-btn-secondary nf-btn-sm",
    `<span class="nf-btn-label">Подробнее</span>
     <span class="nf-btn-icon" aria-hidden="true">
       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M9 5l6 7-6 7" stroke="#0f172a" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
     </span>`
  );
    moreBtn.type = "button";
    moreBtn.addEventListener("click", () => nfOpenProductPage(p.id));

    actions.append(addBtn, moreBtn);
    footer.appendChild(actions);

    card.append(thumb, body, footer);
    container.appendChild(card);
  });

  const paginationEl = nfEl("catalogPagination");
  if (paginationEl) {
    paginationEl.innerHTML = "";
    if (totalPages > 1) {
      const createBtn = (page, label, isActive, isDisabled) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className =
          "nf-catalog-page-btn" +
          (isActive ? " nf-catalog-page-btn-active" : "") +
          (isDisabled ? " nf-catalog-page-btn-disabled" : "");
        btn.textContent = label;
        btn.disabled = isDisabled;
        if (!isDisabled && !isActive) {
          btn.addEventListener("click", () => {
            NF_STATE.filters.page = page;
            nfRenderCatalog();
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }
        return btn;
      };

      paginationEl.appendChild(
        createBtn(
          currentPage - 1,
          "Назад",
          false,
          currentPage <= 1
        )
      );

      for (let i = 1; i <= totalPages; i += 1) {
        if (totalPages > 7) {
          const isEdge = i === 1 || i === totalPages;
          const isNearCurrent = Math.abs(i - currentPage) <= 1;
          const shouldShow = isEdge || isNearCurrent;
          if (!shouldShow) {
            if (i === 2 || i === totalPages - 1) {
              const dots = document.createElement("span");
              dots.className = "nf-catalog-page-dots";
              dots.textContent = "…";
              paginationEl.appendChild(dots);
            }
            continue;
          }
        }

        paginationEl.appendChild(
          createBtn(i, String(i), i === currentPage, false)
        );
      }

      paginationEl.appendChild(
        createBtn(
          currentPage + 1,
          "Вперёд",
          false,
          currentPage >= totalPages
        )
      );
    }
  }
}

/* ====== КОРЗИНА ====== */
function nfGetCartItem(productId) {
  return NF_STATE.cart.find((x) => x.productId === productId);
}

function nfAddToCart(productId, qty) {
  const existing = nfGetCartItem(productId);
  if (existing) existing.qty += qty;
  else NF_STATE.cart.push({ productId, qty });

  nfUpdateCartBadge();
  nfRenderCart();
  nfShowToast("Товар добавлен в запрос");

  const btn = nfEl("cartToggleBtn");
  if (btn) {
    btn.style.transform = "translateY(-2px) scale(1.02)";
    setTimeout(() => {
      btn.style.transform = "";
    }, 160);
  }
}

function nfAnimateAddToCartButton(sourceButton) {
  if (!sourceButton) return;
  sourceButton.classList.add("nf-btn-checkable", "nf-btn-check-success");
  setTimeout(() => {
    sourceButton.classList.remove("nf-btn-check-success");
  }, 450);
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
  if (!itemsEl || !totalsEl || !btn) return;

  itemsEl.innerHTML = "";

  if (!NF_STATE.cart.length) {
    itemsEl.innerHTML =
      `<p class="nf-cart-empty">Ваш список запросов пока пуст. Откройте каталог и добавьте интересующие позиции.</p>`;
    totalsEl.textContent = "";
    btn.disabled = true;
    return;
  }

  btn.disabled = false;
  let totalKnown = 0;

  NF_STATE.cart.forEach((item) => {
    const p = NF_DATA.products.find((x) => x.id === item.productId);
    if (!p) return;

    const row = nfCreateEl("div", "nf-cart-item");
    const thumb = nfCreateEl("div", "nf-cart-thumb");

    const info = nfCreateEl("div", "nf-cart-info");
    info.innerHTML = `
      <div class="nf-cart-name">${p.name}</div>
      <div class="nf-cart-meta">${p.article} · ${nfGetPartnerName(p.partnerId)}</div>
    `;

    const qtyCol = nfCreateEl("div", "nf-cart-qty");
    const qtyInput = nfCreateEl("input", "");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = item.qty;

    qtyInput.addEventListener("change", () => {
      const v = Math.max(1, Number(qtyInput.value) || 1);
      item.qty = v;
      nfRenderCart();
      nfUpdateCartBadge();
    });

    const removeBtn = nfCreateEl("button", "nf-cart-remove", "Удалить");
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => {
      NF_STATE.cart = NF_STATE.cart.filter((x) => x.productId !== item.productId);
      nfRenderCart();
      nfUpdateCartBadge();
    });

    qtyCol.append("Кол-во:", qtyInput, removeBtn);
    row.append(thumb, info, qtyCol);
    itemsEl.appendChild(row);

    if (p.price != null) totalKnown += p.price * item.qty;
  });

  totalsEl.innerHTML = `
    <div><strong>Итого (по позициям с ценой):</strong> ${nfFormatPrice(totalKnown)}</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">
      Часть оборудования может иметь цену «по запросу» — итоговое КП будет содержать полный расчёт.
    </div>
  `;
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

/* ====== МОДАЛКА ТОВАРА ====== */
function nfOpenProductModal(productId) {
  const p = NF_DATA.products.find((x) => x.id === productId);
  if (!p) return;

  NF_STATE.productModalProductId = productId;

  const modal = nfEl("productModal");
  const backdrop = nfEl("productModalBackdrop");
  if (!modal || !backdrop) return;

  backdrop.style.display = "block";
  backdrop.style.visibility = "visible";
  backdrop.style.opacity = "1";
  modal.style.display = "block";
  modal.style.visibility = "visible";
  modal.style.opacity = "1";

  nfSafeText("productModalTitle", p.name);
  nfSafeText("productModalShortDesc", p.shortDesc || "Профессиональное медицинское оборудование.");
  nfSafeText("productModalArticle", `Артикул: ${p.article}`);
  nfSafeText("productModalPartner", `Партнёр: ${nfGetPartnerName(p.partnerId)}`);
  nfSafeText("productModalModel", `Модель: ${p.model}`);

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
    if (priceEl) priceEl.textContent = `Цена за единицу: ${nfFormatPrice(p.price)}`;
    if (totalEl && qtyInput) totalEl.textContent = `Итого: ${nfFormatPrice(p.price * Number(qtyInput.value))}`;
    if (primaryBtn) primaryBtn.textContent = "Добавить в запрос";
  } else {
    if (priceEl) priceEl.textContent = "Цена рассчитывается индивидуально";
    if (totalEl) totalEl.textContent = "";
    if (primaryBtn) primaryBtn.textContent = "Запросить цену по этой модели";
  }

  if (qtyInput) {
    qtyInput.oninput = () => {
      const v = Math.max(1, Number(qtyInput.value) || 1);
      qtyInput.value = v;
      if (p.price != null && totalEl) totalEl.textContent = `Итого: ${nfFormatPrice(p.price * v)}`;
    };
  }

  if (primaryBtn) {
    primaryBtn.onclick = () => {
      const qty = Number(qtyInput?.value) || 1;
      nfAddToCart(p.id, qty);
      nfCloseProductModal();
      nfShowToast("Товар добавлен в запрос.");
    };
  }

  const specsTab = nfEl("tab-specs");
  const installTab = nfEl("tab-install");

  if (specsTab) {
    specsTab.innerHTML = "";
    const wrap = nfCreateEl("div", "nf-tab-description");
    const title = nfCreateEl("div", "nf-tab-section-title", "Описание");
    const p1 = nfCreateEl(
      "p",
      "",
      p.description ||
        "Профессиональное медицинское оборудование для оснащения операционных, реанимации и диагностических подразделений."
    );
    wrap.appendChild(title);
    wrap.appendChild(p1);

    if (p.specs?.length) {
      const subtitle = nfCreateEl("div", "nf-tab-section-title", "Основные характеристики");
      wrap.appendChild(subtitle);
      const ul = nfCreateEl("ul", "");
      p.specs.forEach((s) => ul.appendChild(nfCreateEl("li", "", s)));
      wrap.appendChild(ul);
    }

    specsTab.appendChild(wrap);
  }

  if (installTab) {
    installTab.innerHTML = "";
    const steps =
      Array.isArray(p.serviceSteps) && p.serviceSteps.length
        ? p.serviceSteps
        : [
            "Анализ задач и требований заказчика",
            "Подготовка технического решения и КП",
            "Согласование конфигурации и сроков поставки",
            "Поставка и логистика",
            "Инсталляция и подключение к сетям",
            "Калибровка и настройка",
            "Интеграция с ИТ-системами",
            "Обучение персонала",
            "Тестовая эксплуатация",
            "Плановое сервисное сопровождение",
          ];

    const note = nfCreateEl("div", "nf-install-note");
    note.innerHTML = `
      <div class="nf-install-note-rows">
        <div>
          <h4>Помещение и условия</h4>
          <ul>
            <li>Температура: +18°C до +25°C</li>
            <li>Влажность: 30–75% без конденсата</li>
            <li>Площадь: от 15 м²</li>
            <li>Высота потолков: от 2,5 м</li>
          </ul>
        </div>
        <div>
          <h4>Инженерные коммуникации</h4>
          <ul>
            <li>Электропитание: 220В / 50Гц</li>
            <li>Заземление</li>
            <li>Интернет‑подключение (по необходимости)</li>
            <li>Вентиляция помещения</li>
          </ul>
        </div>
      </div>
    `;

    const titleSteps = nfCreateEl("div", "nf-tab-section-title", "Процесс установки");
    const ol = nfCreateEl("ol", "nf-install-steps");
    steps.forEach((s) => ol.appendChild(nfCreateEl("li", "", s)));

    installTab.appendChild(note);
    installTab.appendChild(titleSteps);
    installTab.appendChild(ol);
  }

  // tabs safe init
  document.querySelectorAll(".nf-tab-btn").forEach((btn) => btn.classList.remove("nf-tab-btn-active"));
  document.querySelectorAll(".nf-tab").forEach((t) => t.classList.remove("nf-tab-active"));

  const specsBtn = document.querySelector('[data-tab="specs"]');
  if (specsBtn) specsBtn.classList.add("nf-tab-btn-active");
  if (specsTab) specsTab.classList.add("nf-tab-active");

  document.querySelectorAll(".nf-tab-btn").forEach((btn) => {
    btn.onclick = () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll(".nf-tab-btn").forEach((b) => b.classList.toggle("nf-tab-btn-active", b === btn));
      document.querySelectorAll(".nf-tab").forEach((t) => t.classList.toggle("nf-tab-active", t.id === `tab-${tab}`));
    };
  });

  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();
}

function nfCloseProductModal() {
  const modal = nfEl("productModal");
  const backdrop = nfEl("productModalBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  backdrop.style.display = "";
  backdrop.style.visibility = "";
  backdrop.style.opacity = "";
  modal.style.display = "";
  modal.style.visibility = "";
  modal.style.opacity = "";
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  nfUpdateOverlayBody();
}

/* ====== ПАРТНЁРЫ (MODAL) ====== */
function nfRenderPartners() {
  const container = nfEl("partnersList");
  if (!container) return;

  container.innerHTML = "";

  NF_DATA.partners.forEach((p) => {
    const card = nfCreateEl("button", "nf-partner-card nf-partner-btn");
    card.type = "button";
    card.dataset.partnerId = p.id;

    card.innerHTML = `
      <div class="nf-partner-logo-wrap">
        <img class="nf-partner-logo-img" alt="" loading="lazy" />
      </div>
      <div class="nf-partner-name">${nfPartnerShortName(p)}</div>
      <div class="nf-partner-meta">${p.country || "—"} · ${p.equipment || "—"}</div>
    `;

    const img = card.querySelector(".nf-partner-logo-img");
    if (img) nfSetPartnerLogo(img, p.id);

    card.addEventListener("click", () => nfOpenPartnerModal(p.id));
    container.appendChild(card);
  });
}

function nfOpenPartnerModal(partnerId) {
  const p = NF_DATA.partners.find((x) => x.id === partnerId);
  if (!p) return;

  const modal = nfEl("partnerModal");
  const backdrop = nfEl("partnerModalBackdrop");
  if (!modal || !backdrop) return;

  // reset inline state to let CSS bottom-sheet animation control transforms
  modal.style.transform = "";
  modal.style.transition = "";

  backdrop.style.display = "block";
  backdrop.style.visibility = "visible";
  backdrop.style.opacity = "1";
  modal.style.display = "block";
  modal.style.visibility = "visible";
  modal.style.opacity = "1";

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
    const years = p.years ? `${p.years} лет` : "";
    metaEl.textContent = [short, years].filter(Boolean).join(" · ");
  }
  if (descEl) descEl.textContent = p.description || "Описание партнёра будет добавлено позже.";
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
    }, 180);

    // Автофокус оставляем только на desktop, чтобы на мобильных не было автоскролла вниз
    setTimeout(() => {
      try {
        const isDesktop = window.matchMedia
          ? window.matchMedia("(min-width: 1025px)").matches
          : window.innerWidth > 1024;
        if (isDesktop) {
          search.focus();
        }
      } catch (_e) {}
    }, 0);
  }

  const toCatalogBtn = nfEl("partnerModalToCatalog");
  if (toCatalogBtn) {
    toCatalogBtn.onclick = () => {
      NF_STATE.filters.partnerIds = new Set([p.id]);
      nfClosePartnerModal();
      nfNavigate("catalog");
    };
  }

  const addAllBtn = nfEl("partnerModalAddAll");
  if (addAllBtn) {
    addAllBtn.onclick = () => {
      if (!products.length) return;
      products.forEach((prod) => nfAddToCart(prod.id, 1));
      nfShowToast("Добавлено в запрос");
    };
  }

  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();
}

function nfRenderPartnerModalProducts(list) {
  const box = nfEl("partnerModalProducts");
  if (!box) return;

  box.innerHTML = "";

  if (!list.length) {
    box.innerHTML = `<div class="nf-empty" style="margin-top:6px;">Нет товаров у этого партнёра.</div>`;
    return;
  }

  list.forEach((prod) => {
    const cat = NF_DATA.categories.find((c) => c.id === prod.categoryId)?.name || "";
    const row = nfCreateEl("div", "nf-partner-prod");

    row.innerHTML = `
      <div class="nf-partner-prod-main">
        <div class="nf-partner-prod-title">${prod.name}</div>
        <div class="nf-partner-prod-meta">${prod.article} · ${cat} · ${
          prod.price ? nfFormatPrice(prod.price) : "по запросу"
        }</div>
      </div>
      <div class="nf-partner-prod-actions"></div>
    `;

    const actions = row.querySelector(".nf-partner-prod-actions");

    const openBtn = nfCreateEl("button", "nf-btn nf-btn-secondary nf-btn-sm", "Открыть");
    openBtn.type = "button";
    openBtn.onclick = () => {
      nfClosePartnerModal();
      nfOpenProductPage(prod.id);
    };

    const addBtn = nfCreateEl("button", "nf-btn nf-btn-primary nf-btn-sm nf-btn-checkable", "В запрос");
    addBtn.type = "button";
    addBtn.onclick = () => {
      nfAddToCart(prod.id, 1);
      nfAnimateAddToCartButton(addBtn);
    };

    actions.append(openBtn, addBtn);
    box.appendChild(row);
  });
}

function nfClosePartnerModal() {
  const modal = nfEl("partnerModal");
  const backdrop = nfEl("partnerModalBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  backdrop.style.display = "";
  backdrop.style.visibility = "";
  backdrop.style.opacity = "";
  modal.style.display = "";
  modal.style.visibility = "";
  modal.style.opacity = "";
  modal.style.transform = "";
  modal.style.transition = "";
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  nfUpdateOverlayBody();
}

/* ====== NEWS (Missing impl) ====== */
function nfRenderNews() {
  // expects (optional) containers inside pages/news.html
  const listEl = nfEl("newsList");
  const detailsEl = nfEl("newsDetails");

  const dateFilter = nfEl("newsDateFilter");
  const searchInput = nfEl("newsSearchInput");

  const q = String(searchInput?.value || "").trim().toLowerCase();
  const dateMode = String(dateFilter?.value || "all");

  let items = [...NF_DATA.news];

  if (q) {
    items = items.filter((n) => {
      const t = `${n.title} ${n.category} ${n.author} ${n.excerpt}`.toLowerCase();
      return t.includes(q);
    });
  }

  if (dateMode === "recent") {
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (dateMode === "old") {
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (listEl) {
    listEl.innerHTML = "";
    if (!items.length) {
      listEl.innerHTML = `<div class="nf-empty">Ничего не найдено.</div>`;
    } else {
      items.forEach((n) => {
        const card = nfCreateEl("article", "nf-news-card");
        card.innerHTML = `
          <div class="nf-news-card-chip">${n.category}</div>
          <div class="nf-news-card-main">
            <h3 class="nf-news-card-title">${n.title}</h3>
            <div class="nf-news-card-meta">${nfFormatDate(n.date)} · ${n.category}</div>
            <p class="nf-news-card-text">${n.excerpt}</p>
          </div>
        `;
        card.addEventListener("click", () => {
          NF_STATE.selectedNewsId = n.id;
          nfOpenNewsModal(n.id);
        });
        listEl.appendChild(card);
      });
    }
  }

  // Встроенная статья на странице больше не используется: новости открываются только в модальном окне
  if (detailsEl) {
    detailsEl.innerHTML = "";
  }
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

  const titleEl = nfEl("newsModalTitle");
  const metaEl = nfEl("newsModalMeta");
  const bodyEl = nfEl("newsModalBody");

  if (titleEl) titleEl.textContent = item.title;
  if (metaEl) {
    const date = nfFormatDate(item.date);
    const parts = [date];
    if (item.author) parts.push(item.author);
    if (item.category) parts.push(item.category);
    metaEl.textContent = parts.join(" · ");
  }
  if (bodyEl) {
    const paragraphs = Array.isArray(item.content) && item.content.length ? item.content : [item.excerpt];
    bodyEl.innerHTML = paragraphs
      .map((p) => `<p class="nf-news-modal-paragraph">${p}</p>`)
      .join("");
    bodyEl.scrollTop = 0;
  }

  backdrop.style.display = "block";
  backdrop.style.visibility = "visible";
  backdrop.style.opacity = "1";
  modal.style.display = "block";
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();
}

function nfCloseNewsModal() {
  const modal = nfEl("newsModal");
  const backdrop = nfEl("newsModalBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  backdrop.style.display = "";
  backdrop.style.visibility = "";
  backdrop.style.opacity = "";
  modal.style.display = "";
  modal.style.visibility = "";
  modal.style.opacity = "";
  modal.style.transform = "";
  modal.style.transition = "";
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
                  <td><code>${c.id}</code></td>
                  <td class="nf-admin-actions">
                    <button type="button" class="nf-admin-row-edit" data-admin-edit="category" data-id="${c.id}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="#e0f2f1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Редактировать</span>
                    </button>
                    <button type="button" class="nf-admin-row-del" data-admin-del="category" data-id="${c.id}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="#fecaca" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Удалить</span>
                    </button>
                  </td>
                  <td>${c.name}</td>
                  <td>${c.description || ""}</td>
                  <td>${c.count ?? 0}</td>
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
                  <td><code>${p.id}</code></td>
                  <td class="nf-admin-actions">
                    <button type="button" class="nf-admin-row-edit" data-admin-edit="partner" data-id="${p.id}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="#e0f2f1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Редактировать</span>
                    </button>
                    <button type="button" class="nf-admin-row-del" data-admin-del="partner" data-id="${p.id}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="#fecaca" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Удалить</span>
                    </button>
                  </td>
                  <td>${p.name}</td>
                  <td>${p.country || ""}</td>
                  <td>${p.equipment || ""}</td>
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
                <td><code>${p.id}</code></td>
                <td class="nf-admin-actions">
                  <button type="button" class="nf-admin-row-edit" data-admin-edit="product" data-id="${p.id}">
                    <span class="nf-admin-row-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="#e0f2f1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span class="nf-admin-row-label">Редактировать</span>
                  </button>
                  <button type="button" class="nf-admin-row-del" data-admin-del="product" data-id="${p.id}">
                    <span class="nf-admin-row-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="#fecaca" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span class="nf-admin-row-label">Удалить</span>
                  </button>
                </td>
                <td>${p.name || ""}</td>
                <td>${cat ? cat.name : p.categoryId}</td>
                <td>${part ? part.name : p.partnerId}</td>
                <td>${price}</td>
                <td>${popular}</td>
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
                  <td><code>${n.id}</code></td>
                  <td class="nf-admin-actions">
                    <button type="button" class="nf-admin-row-edit" data-admin-edit="news" data-id="${n.id}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="#e0f2f1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Редактировать</span>
                    </button>
                    <button type="button" class="nf-admin-row-del" data-admin-del="news" data-id="${n.id}">
                      <span class="nf-admin-row-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7h8l-1 11H9L8 7Z" stroke="#fecaca" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="nf-admin-row-label">Удалить</span>
                    </button>
                  </td>
                  <td>${n.title || ""}</td>
                  <td>${n.category || ""}</td>
                  <td>${n.date || ""}</td>
                  <td>${n.author || ""}</td>
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
                  <input name="id" class="nf-input" value="${entity.id || ""}" ${id ? "readonly" : ""} />
                </label>
                <label>Название
                  <input name="name" class="nf-input" value="${entity.name || ""}" />
                </label>
                <label>Кол-во позиций
                  <input name="count" type="number" class="nf-input" value="${entity.count ?? 0}" />
                </label>
                <label>Порядок сортировки
                  <input name="sortOrder" type="number" class="nf-input" value="${entity.sortOrder ?? 0}" />
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
                <textarea name="description" class="nf-textarea" rows="4" placeholder="Какой тип оборудования и задач покрывает раздел">${entity.description || ""}</textarea>
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
                    <input name="metaTitle" class="nf-input" value="${entity.seo.metaTitle || ""}" />
                  </label>
                  <label>Мета-описание
                    <textarea name="metaDescription" class="nf-textarea" rows="2">${entity.seo.metaDescription || ""}</textarea>
                  </label>
                </div>
                <div>
                  <label>ЧПУ (адрес страницы)
                    <input name="slug" class="nf-input" value="${entity.seo.slug || ""}" placeholder="naprimer-anesteziologiya-reanimaciya" />
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
                <img src="${logoSrc || ""}" alt="" class="nf-admin-image-preview" data-admin-preview="logo" />
                <div class="nf-admin-image-fields">
                  <label class="nf-admin-image-label">
                    <span>Логотип партнёра</span>
                    <div class="nf-admin-file">
                      <span class="nf-admin-file-label">Выберите файл</span>
                      <input type="file" name="logoFile" class="nf-admin-file-input" accept="image/*" />
                    </div>
                    <input type="hidden" name="logo" value="${logoSrc}" />
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
                    <input name="id" class="nf-input" value="${entity.id || ""}" ${id ? "readonly" : ""} />
                  </label>
                  <label>Название компании
                    <input name="name" class="nf-input" value="${entity.name || ""}" />
                  </label>
                  <label>Страна
                    <input name="country" class="nf-input" value="${entity.country || ""}" />
                  </label>
                  <label>Город
                    <input name="city" class="nf-input" value="${entity.city || ""}" />
                  </label>
                  <label>Сайт
                    <input name="website" class="nf-input" value="${entity.website || ""}" placeholder="https://example.com" />
                  </label>
                </div>
                <div>
                  <label>Оборудование (направления)
                    <input name="equipment" class="nf-input" value="${entity.equipment || ""}" placeholder="Например: реанимация, радиология" />
                  </label>
                  <label>Лет партнёрства
                    <input name="years" type="number" class="nf-input" value="${entity.years ?? 0}" />
                  </label>
                  <label>Порядок сортировки
                    <input name="sortOrder" type="number" class="nf-input" value="${entity.sortOrder ?? 0}" />
                  </label>
                  <label class="nf-admin-checkbox">
                    <input name="isHidden" type="checkbox" ${entity.isHidden ? "checked" : ""} />
                    <span>Скрыть партнёра с сайта</span>
                  </label>
                </div>
              </div>

              <label>Описание
                <textarea name="description" class="nf-textarea" rows="3">${entity.description || ""}</textarea>
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
                    <input name="metaTitle" class="nf-input" value="${entity.seo.metaTitle || ""}" />
                  </label>
                  <label>Мета-описание
                    <textarea name="metaDescription" class="nf-textarea" rows="2">${entity.seo.metaDescription || ""}</textarea>
                  </label>
                </div>
                <div>
                  <label>ЧПУ (адрес страницы)
                    <input name="slug" class="nf-input" value="${entity.seo.slug || ""}" placeholder="naprimer-ardo-medical" />
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
    const catOptions = (NF_DATA.categories || [])
      .map((c) => `<option value="${c.id}" ${c.id === entity.categoryId ? "selected" : ""}>${c.name}</option>`)
      .join("");
    const partnerOptions = (NF_DATA.partners || [])
      .map((p) => `<option value="${p.id}" ${p.id === entity.partnerId ? "selected" : ""}>${p.name}</option>`)
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
              <img src="${imageSrc || ""}" alt="" class="nf-admin-image-preview" data-admin-preview="image" />
              <div class="nf-admin-image-fields">
                <label class="nf-admin-image-label">
                  <span>Фото товара</span>
                  <div class="nf-admin-file">
                    <span class="nf-admin-file-label">Выберите файл</span>
                    <input type="file" name="imageFile" class="nf-admin-file-input" accept="image/*" />
                  </div>
                  <input type="hidden" name="image" value="${imageSrc}" />
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
                <input name="id" class="nf-input" value="${entity.id || ""}" ${id ? "readonly" : ""} />
              </label>
              <label>Артикул
                <input name="article" class="nf-input" value="${entity.article || ""}" placeholder="Автоматически: NF001, NF002…" readonly />
              </label>
              <label>Модель
                <input name="model" class="nf-input" value="${entity.model || ""}" placeholder="Например: PowerCube" />
              </label>
              <label>Категория
                <select name="categoryId" class="nf-select">${catOptions}</select>
              </label>
              <label>Партнёр
                <select name="partnerId" class="nf-select">${partnerOptions}</select>
              </label>
              <label>Цена
                <input name="price" type="number" class="nf-input" value="${entity.price ?? ""}" />
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
                <input name="manufacturer" class="nf-input" value="${entity.manufacturer || ""}" placeholder="Отличается от партнёра, если нужно" />
              </label>
              <label>Порядок сортировки
                <input name="sortOrder" type="number" class="nf-input" value="${entity.sortOrder ?? 0}" />
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
              <input name="name" class="nf-input" value="${entity.name || ""}" />
            </label>
            <label>Краткое описание
              <textarea name="shortDesc" class="nf-textarea" rows="2" placeholder="Короткий текст для карточек и списка">${entity.shortDesc || ""}</textarea>
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
                  <input name="metaTitle" class="nf-input" value="${entity.seo.metaTitle || ""}" />
                </label>
                <label>Мета-описание
                  <textarea name="metaDescription" class="nf-textarea" rows="2">${entity.seo.metaDescription || ""}</textarea>
                </label>
                <label>ЧПУ (адрес страницы)
                  <input name="slug" class="nf-input" value="${entity.seo.slug || ""}" placeholder="naprimer-apparat-ivl-neo" />
                </label>
              </div>
              <div>
                <label>OpenGraph заголовок
                  <input name="ogTitle" class="nf-input" value="${entity.seo.ogTitle || ""}" />
                </label>
                <label>OpenGraph описание
                  <textarea name="ogDescription" class="nf-textarea" rows="2">${entity.seo.ogDescription || ""}</textarea>
                </label>
                <label>Связанные товары (ID через запятую)
                  <textarea name="related" class="nf-textarea" rows="2" placeholder="ardo-ncpap, fujifilm-fdr-go">${relatedRaw}</textarea>
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
                <img src="${primaryImage || ""}" alt="" class="nf-admin-image-preview" data-admin-preview="image" />
                <div class="nf-admin-image-fields">
                  <label class="nf-admin-image-label">
                    <span>Обложка новости</span>
                    <div class="nf-admin-file">
                      <span class="nf-admin-file-label">Выберите файл</span>
                      <input type="file" name="newsCoverFile" class="nf-admin-file-input" accept="image/*" />
                    </div>
                    <input type="hidden" name="image" value="${primaryImage}" />
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
                    <input name="id" class="nf-input" value="${entity.id || ""}" ${id ? "readonly" : ""} />
                  </label>
                  <label>Заголовок
                    <input name="title" class="nf-input" value="${entity.title || ""}" />
                  </label>
                  <label>Категория (тип)
                    <input name="category" class="nf-input" value="${entity.category || ""}" />
                  </label>
                  <label>Дата
                    <input name="date" type="date" class="nf-input" value="${entity.date || new Date().toISOString().slice(0, 10)}" />
                  </label>
                  <label>Автор
                    <input name="author" class="nf-input" value="${entity.author || ""}" />
                  </label>
                  <label>Порядок сортировки
                    <input name="sortOrder" type="number" class="nf-input" value="${entity.sortOrder ?? 0}" />
                  </label>
                  <label class="nf-admin-checkbox">
                    <input name="isHidden" type="checkbox" ${entity.isHidden ? "checked" : ""} />
                    <span>Скрыть новость с сайта</span>
                  </label>
                </div>
                <div>
                  <label>Краткое описание
                    <textarea name="excerpt" class="nf-textarea" rows="3">${entity.excerpt || ""}</textarea>
                  </label>
                  <label>Текст новости (каждый абзац с новой строки)
                    <textarea name="content" class="nf-textarea" rows="8">${contentText}</textarea>
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
                    <input name="metaTitle" class="nf-input" value="${entity.seo.metaTitle || ""}" />
                  </label>
                  <label>Мета-описание
                    <textarea name="metaDescription" class="nf-textarea" rows="2">${entity.seo.metaDescription || ""}</textarea>
                  </label>
                </div>
                <div>
                  <label>ЧПУ (адрес страницы)
                    <input name="slug" class="nf-input" value="${entity.seo.slug || ""}" placeholder="naprimer-lab-automation" />
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
            <img src="${url}" alt="" class="nf-admin-gallery-thumb" />
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
            errEl.classList.add("is-visible-shake");
            setTimeout(() => errEl.classList.remove("is-visible-shake"), 260);
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
          errEl.classList.add("is-visible-shake");
          setTimeout(() => errEl.classList.remove("is-visible-shake"), 260);
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
          `<li><span class="nf-admin-list-title">${n.title}</span><span class="nf-admin-list-meta">${n.date || ""} · ${
            n.category || ""
          }</span></li>`,
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
          <tbody>${requests.slice(0, 50).map((r) => `<tr><td>${(r.createdAt || "").slice(0, 10)}</td><td>${r.type || ""}</td><td>${r.name || ""}</td><td>${r.company || ""}</td><td>${r.phone || ""} ${r.email || ""}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  } else {
    content = `
      <div class="nf-admin-card">
        <h2 style="margin:0 0 8px;">${tabs.find((t) => t.id === sec)?.label || "Раздел"}</h2>
        <p style="margin:0;color:#6b7280;">Раздел в разработке.</p>
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

/* ====== ИНИЦИАЛИЗАТОРЫ СТРАНИЦ ====== */
function nfInitHomePage() {
  console.log("[home] init home page");
  nfUpdateSeo({
    title: "НаноФарм — Медицинское оборудование для клиник и лабораторий",
    description:
      "Поставка, установка и сервисное обслуживание медицинского оборудования для клиник, лабораторий и диагностических центров.",
    ogType: "website",
  });
  nfInitPopularCarouselResponsiveWatcher();
  nfInitPopularVisibilityObserver();
  console.log("[home] calling popular carousel render");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nfRenderPopularCarousel();
    });
  });
  nfRenderHomeCategories();
  nfRenderHomePartners();
  nfRenderHomeNews();
}

function nfInitCatalogPage() {
  nfUpdateSeo({
    title: "Каталог медицинского оборудования — НаноФарм",
    description:
      "Каталог медицинского оборудования НаноФарм: аппараты ИВЛ, радиология, функциональная диагностика, нейрохирургия и другие направления.",
    ogType: "website",
  });
  nfRenderCatalog();

  const searchInput = nfEl("catalogSearchInput"); // сейчас поля нет, но оставляем на будущее
  const modelInput = nfEl("filterModelInput");
  const resetBtn = nfEl("filtersResetBtn");
  const sortSelect = nfEl("sortSelect");

  if (searchInput) {
    searchInput.value = NF_STATE.filters.search;
    searchInput.addEventListener(
      "input",
      nfDebounce((e) => {
        NF_STATE.filters.search = e.target.value.trim();
        NF_STATE.filters.page = 1;
        nfRenderCatalog();
      }, 220)
    );
  }

  if (modelInput) {
    modelInput.value = NF_STATE.filters.model || "";
    modelInput.addEventListener(
      "input",
      nfDebounce((e) => {
        NF_STATE.filters.model = e.target.value.trim();
        NF_STATE.filters.page = 1;
        nfRenderCatalog();
      }, 220)
    );
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      NF_STATE.filters = {
        search: "",
        categoryIds: new Set(),
        partnerIds: new Set(),
        model: "",
        sort: "popular",
        viewMode: NF_STATE.filters.viewMode || "grid",
        page: 1,
      };
      if (searchInput) searchInput.value = "";
      if (modelInput) modelInput.value = "";

      const catSelect = nfEl("filterCategorySelect");
      const partnerSelect = nfEl("filterPartnerSelect");

      if (catSelect) {
        catSelect.value = "";
        catSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (partnerSelect) {
        partnerSelect.value = "";
        partnerSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (sortSelect) {
        sortSelect.value = "popular";
        sortSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      nfRenderCatalog();
    };
  }

  if (sortSelect) {
    sortSelect.value = NF_STATE.filters.sort;
    sortSelect.onchange = (e) => {
      NF_STATE.filters.sort = e.target.value;
      NF_STATE.filters.page = 1;
      console.log("[catalog] sort =", NF_STATE.filters.sort);
      nfRenderCatalog();
    };

    // Используем кастомный dropdown на всех устройствах (desktop + mobile)
    nfEnhanceSelectDropdown(sortSelect);
  }

  const syncCatalogViewButtons = () => {
    document.querySelectorAll(".nf-view-switch-btn").forEach((btn) => {
      btn.classList.toggle(
        "nf-view-switch-btn-active",
        btn.dataset.viewmode === NF_STATE.filters.viewMode
      );
    });
  };

  document.querySelectorAll(".nf-view-switch-btn").forEach((btn) => {
    btn.onclick = () => {
      const nextMode = btn.dataset.viewmode || "grid";
      if (NF_STATE.filters.viewMode === nextMode) return;
      NF_STATE.filters.viewMode = nextMode;
      NF_STATE.filters.page = 1;
      console.log("[catalog] viewMode =", NF_STATE.filters.viewMode);
      console.log("[catalog] sort =", NF_STATE.filters.sort);
      syncCatalogViewButtons();
      nfRenderCatalog();
    };
  });

  syncCatalogViewButtons();

  // Управление фильтрами каталога (desktop: сворачивание панели, mobile: bottom-sheet)
  const filtersSheetBtn = nfEl("catalogFiltersSheetBtn");
  const catalogLayout = document.querySelector(".nf-catalog-layout");
  const FILTERS_COLLAPSED_KEY = "nf_catalog_filters_collapsed";

  const applyCollapsedState = (collapsed) => {
    if (!catalogLayout) return;
    catalogLayout.classList.toggle("is-filters-collapsed", collapsed);
    if (filtersSheetBtn) {
      filtersSheetBtn.classList.toggle("is-active", !collapsed);
      filtersSheetBtn.setAttribute("aria-expanded", String(!collapsed));
    }
  };

  // Инициализация состояния только на десктопе; на мобильных фильтры работают как bottom-sheet
  const initDesktopFiltersState = () => {
    if (!catalogLayout || !filtersSheetBtn) return;
    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    if (!isDesktop) {
      catalogLayout.classList.remove("is-filters-collapsed");
      filtersSheetBtn.classList.remove("is-active");
      filtersSheetBtn.removeAttribute("aria-expanded");
      return;
    }
    const saved = localStorage.getItem(FILTERS_COLLAPSED_KEY);
    const initialCollapsed = saved === "1";
    applyCollapsedState(initialCollapsed);
  };

  if (filtersSheetBtn) {
    // Десктоп: сворачиваем панель фильтров. На мобильных bottom-sheet отключён.
    filtersSheetBtn.onclick = () => {
      const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
      if (isDesktop) {
        const collapsed = !catalogLayout?.classList.contains("is-filters-collapsed");
        applyCollapsedState(collapsed);
        localStorage.setItem(FILTERS_COLLAPSED_KEY, collapsed ? "1" : "0");
      }
    };
  }

  initDesktopFiltersState();
  window.addEventListener("resize", initDesktopFiltersState);
}

function nfInitProductPage() {
  const id =
    NF_STATE.productDetailProductId ||
    NF_STATE.productModalProductId ||
    NF_STATE.pendingCatalogProductId;

  const pageRoot = document.querySelector(".nf-product-page");
  if (!pageRoot) return;

  const fallback = (message) => {
    pageRoot.innerHTML = `<div class="nf-empty">${message}</div>`;
  };

  if (!id) {
    fallback("Товар не найден. Вернитесь в каталог и выберите модель ещё раз.");
    return;
  }

  const product = NF_DATA.products.find((x) => x.id === id);
  if (!product) {
    fallback("Товар не найден в каталоге. Возможно, он был удалён.");
    return;
  }

  NF_STATE.productDetailProductId = product.id;
  NF_STATE.productModalProductId = product.id;

  const category = NF_DATA.categories.find((c) => c.id === product.categoryId);
  const partnerName = nfGetPartnerName(product.partnerId);

  const seo = product.seo || {};
  nfUpdateSeo({
    title: seo.metaTitle || product.name || "Товар каталога — НаноФарм",
    description:
      seo.metaDescription ||
      product.shortDesc ||
      "Профессиональное медицинское оборудование из каталога НаноФарм.",
    ogTitle: seo.ogTitle || seo.metaTitle || product.name,
    ogDescription:
      seo.ogDescription ||
      seo.metaDescription ||
      product.shortDesc ||
      "Профессиональное медицинское оборудование из каталога НаноФарм.",
    ogImage: seo.ogImage || (nfGetProductImages(product)[0] || ""),
    ogType: "product",
  });

  nfSafeText("productPageTitle", product.name);
  nfSafeText(
    "productPageShortDesc",
    product.shortDesc ||
      "Профессиональное медицинское оборудование для оснащения реанимации, операционных и диагностических отделений."
  );

  const metaEl = nfEl("productPageMeta");
  if (metaEl) {
    const meta = [];
    if (product.article) meta.push(`Артикул: <strong>${product.article}</strong>`);
    if (product.model) meta.push(`Модель: <strong>${product.model}</strong>`);
    if (partnerName) meta.push(`Партнёр: <strong>${partnerName}</strong>`);
    metaEl.innerHTML = meta.join(" · ");
  }

  const catBadge = nfEl("productPageCategoryBadge");
  if (catBadge) catBadge.textContent = category ? category.name : "";

  const partnerBadge = nfEl("productPagePartnerBadge");
  if (partnerBadge) partnerBadge.textContent = partnerName || "";

  const galleryImages = nfGetProductImages(product);
  let currentImageIndex = 0;

  const img = nfEl("productPageImage");
  const hintEl = document.querySelector(".nf-product-page-image-hint");
  const counterEl = nfEl("productPageImageCounter");

  const updateCounter = () => {
    if (!counterEl) return;
    if (!galleryImages.length) {
      counterEl.textContent = "";
      counterEl.style.display = "none";
      return;
    }
    counterEl.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    counterEl.style.display = "";
  };

  const setMainImageSrc = (src, options) => {
    if (!img) return;
    const opts = options || {};
    const fallback = nfProductPlaceholderSvg();
    const safeSrc = src && String(src).trim() ? src : fallback;

    if (opts.immediate) {
      img.style.opacity = "1";
      img.src = safeSrc;
      return;
    }

    img.style.transition = "opacity 200ms ease";
    img.style.opacity = "0";
    requestAnimationFrame(() => {
      img.src = safeSrc;
      img.onload = () => {
        img.style.opacity = "1";
      };
    });
  };

  const thumbs = nfEl("productPageThumbs");

  const showImageAt = (nextIndex, options) => {
    if (!galleryImages.length) return;
    const total = galleryImages.length;
    let idx = nextIndex;
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;
    currentImageIndex = idx;

    setMainImageSrc(galleryImages[idx], options);

    if (thumbs) {
      const thumbNodes = thumbs.querySelectorAll(".nf-product-page-thumb");
      thumbNodes.forEach((el, i) => {
        if (i === idx) el.classList.add("nf-product-page-thumb-active");
        else el.classList.remove("nf-product-page-thumb-active");
      });
    }

    updateCounter();
  };

  if (img) {
    img.alt = product.name;
    nfConfigureImageElement(img, {
      loading: "eager",
      decoding: "async",
      fetchPriority: "high",
      width: 1200,
      height: 900,
    });
    if (galleryImages.length && String(galleryImages[0]).trim()) {
      setMainImageSrc(galleryImages[0], { immediate: true });
      img.onerror = () => {
        setMainImageSrc(null, { immediate: true });
      };
      if (hintEl) hintEl.style.display = "none";
      updateCounter();
    } else {
      setMainImageSrc(null, { immediate: true });
      img.onerror = null;
      if (hintEl) hintEl.style.display = "";
      if (counterEl) counterEl.style.display = "none";
    }
    img.style.cursor = galleryImages.length ? "zoom-in" : "default";
    img.onclick = () => {
      if (galleryImages.length) {
        nfOpenProductLightbox(galleryImages, currentImageIndex, product.name);
      }
    };
  }

  if (thumbs) {
    thumbs.innerHTML = "";
    galleryImages.slice(0, 6).forEach((src, idx) => {
      const t = nfCreateEl(
        "div",
        "nf-product-page-thumb" + (idx === 0 ? " nf-product-page-thumb-active" : "")
      );
      const ti = document.createElement("img");
      ti.src = src;
      ti.alt = product.name;
      nfConfigureImageElement(ti, {
        loading: "lazy",
        decoding: "async",
        fetchPriority: "low",
        width: 80,
        height: 80,
      });
      t.appendChild(ti);
      t.addEventListener("click", () => {
        showImageAt(idx);
      });
      thumbs.appendChild(t);
    });
  }

  const mainImageWrap = pageRoot.querySelector(".nf-product-page-main-image");
  if (mainImageWrap && galleryImages.length > 1) {
    let touchStartXMain = null;
    mainImageWrap.addEventListener(
      "touchstart",
      (e) => {
        touchStartXMain = e.touches[0]?.clientX ?? null;
      },
      { passive: true }
    );
    mainImageWrap.addEventListener(
      "touchend",
      (e) => {
        if (touchStartXMain == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchStartXMain) - touchStartXMain;
        if (Math.abs(dx) > 40) {
          if (dx < 0) showImageAt(currentImageIndex + 1);
          else showImageAt(currentImageIndex - 1);
        }
        touchStartXMain = null;
      },
      { passive: true }
    );
  }

  const qtyInput = nfEl("productPageQty");
  if (qtyInput) qtyInput.value = 1;

  const priceEl = nfEl("productPagePrice");
  const totalEl = nfEl("productPageTotal");
  const primaryBtn = nfEl("productPagePrimaryBtn");

  const updateTotal = () => {
    if (!qtyInput) return;
    const qty = Math.max(1, Number(qtyInput.value) || 1);
    qtyInput.value = qty;
    if (product.price != null && totalEl) {
      totalEl.textContent = `Итого за ${qty} шт.: ${nfFormatPrice(product.price * qty)}`;
    }
  };

  if (product.price != null) {
    if (priceEl) priceEl.textContent = `Цена за единицу: ${nfFormatPrice(product.price)}`;
    updateTotal();
    if (primaryBtn) primaryBtn.textContent = "Добавить в запрос";
  } else {
    if (priceEl) priceEl.textContent = "Цена рассчитывается индивидуально";
    if (totalEl) totalEl.textContent = "";
    if (primaryBtn) primaryBtn.textContent = "Запросить цену по этой модели";
  }

  if (qtyInput) {
    qtyInput.oninput = updateTotal;

    const minus = pageRoot.querySelector('[data-role="qty-minus"]');
    const plus = pageRoot.querySelector('[data-role="qty-plus"]');

    const changeBy = (delta) => {
      const current = Math.max(1, Number(qtyInput.value) || 1);
      qtyInput.value = current + delta > 1 ? current + delta : 1;
      updateTotal();
    };

    if (minus) minus.addEventListener("click", () => changeBy(-1));
    if (plus) plus.addEventListener("click", () => changeBy(1));
  }

  if (primaryBtn) {
    primaryBtn.onclick = () => {
      const qty = Number(qtyInput?.value) || 1;
      if (product.price != null) {
        nfAddToCart(product.id, qty);
        nfShowToast("Товар добавлен в запрос.");
      } else {
        nfShowToast("Запрос на цену по этой модели будет оформлен через форму.");
        nfOpenQuickQuote();
        const quickForm = nfEl("quickQuoteForm");
        const itemsField =
          quickForm?.elements?.items || quickForm?.querySelector?.('[name="items"]');
        if (quickForm && itemsField && !itemsField.value) {
          itemsField.value = `${product.name} (${product.article || product.model || ""})`;
        }
      }
    };
  }

  const secondaryBtn = nfEl("productPageSecondaryBtn");
  if (secondaryBtn) {
    secondaryBtn.onclick = () => {
      nfOpenQuickQuote();
      const quickForm = nfEl("quickQuoteForm");
      const itemsField =
        quickForm?.elements?.items || quickForm?.querySelector?.('[name="items"]');
      if (quickForm && itemsField && !itemsField.value) {
        itemsField.value = `${product.name} (${product.article || product.model || ""})`;
      }
    };
  }

  const specsTab = nfEl("productPageTab-specs");
  const installTab = nfEl("productPageTab-install");
  const docsTab = nfEl("productPageTab-docs");

  if (specsTab) {
    specsTab.innerHTML = "";
    const wrap = nfCreateEl("div", "nf-tab-description");
    const title = nfCreateEl("div", "nf-tab-section-title", "Описание");
    const p1 = nfCreateEl(
      "p",
      "",
      product.description ||
        "Профессиональное медицинское оборудование для оснащения операционных, реанимации и диагностических подразделений."
    );
    wrap.appendChild(title);
    wrap.appendChild(p1);

    if (product.specs?.length) {
      const subtitle = nfCreateEl("div", "nf-tab-section-title", "Основные характеристики");
      wrap.appendChild(subtitle);
      const ul = nfCreateEl("ul", "");
      product.specs.forEach((s) => ul.appendChild(nfCreateEl("li", "", s)));
      wrap.appendChild(ul);
    }

    specsTab.appendChild(wrap);
  }

  if (installTab) {
    installTab.innerHTML = "";
    const steps =
      Array.isArray(product.serviceSteps) && product.serviceSteps.length
        ? product.serviceSteps
        : [
            "Анализ задач и требований заказчика",
            "Подготовка технического решения и КП",
            "Согласование конфигурации и сроков поставки",
            "Поставка и логистика",
            "Инсталляция и подключение к сетям",
            "Калибровка и настройка",
            "Интеграция с ИТ-системами",
            "Обучение персонала",
            "Тестовая эксплуатация",
            "Плановое сервисное сопровождение",
          ];

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

    const roomList =
      Array.isArray(product.roomRequirements) && product.roomRequirements.length
        ? product.roomRequirements
        : roomDefaults;
    const engineerList =
      Array.isArray(product.engineerRequirements) && product.engineerRequirements.length
        ? product.engineerRequirements
        : engineerDefaults;

    const note = nfCreateEl("div", "nf-install-note");
    const rows = nfCreateEl("div", "nf-install-note-rows");

    const roomCol = nfCreateEl("div", "", "");
    roomCol.appendChild(nfCreateEl("h4", "", "Помещение и условия"));
    const roomUl = nfCreateEl("ul", "", "");
    roomList.forEach((item) => roomUl.appendChild(nfCreateEl("li", "", item)));
    roomCol.appendChild(roomUl);

    const engineerCol = nfCreateEl("div", "", "");
    engineerCol.appendChild(nfCreateEl("h4", "", "Инженерные коммуникации"));
    const engineerUl = nfCreateEl("ul", "", "");
    engineerList.forEach((item) => engineerUl.appendChild(nfCreateEl("li", "", item)));
    engineerCol.appendChild(engineerUl);

    rows.appendChild(roomCol);
    rows.appendChild(engineerCol);
    note.appendChild(rows);

    const titleSteps = nfCreateEl("div", "nf-tab-section-title", "Процесс установки");
    const ol = nfCreateEl("ol", "nf-install-steps");
    steps.forEach((s) => ol.appendChild(nfCreateEl("li", "", s)));

    installTab.appendChild(note);
    installTab.appendChild(titleSteps);
    installTab.appendChild(ol);
  }

  if (docsTab) {
    docsTab.innerHTML = "";
    if (Array.isArray(product.docs) && product.docs.length) {
      const list = nfCreateEl("ul", "nf-product-docs-list");
      product.docs
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .forEach((doc, index) => {
          const li = nfCreateEl("li", "nf-product-docs-item");
          const main = nfCreateEl("div", "nf-product-docs-item-main");
          const title = nfCreateEl(
            "div",
            "nf-product-docs-item-title",
            doc.title || `Документ ${index + 1}`
          );
          const type =
            doc.type === "certificate"
              ? "Сертификат"
              : doc.type === "manual"
              ? "Инструкция"
              : "Документ";
          const meta = nfCreateEl(
            "div",
            "nf-product-docs-item-meta",
            type
          );
          main.appendChild(title);
          main.appendChild(meta);

          const link = document.createElement("a");
          link.href = doc.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "nf-product-docs-link";
          link.textContent = "Открыть PDF";

          li.appendChild(main);
          li.appendChild(link);
          list.appendChild(li);
        });
      docsTab.appendChild(list);
    } else {
      const p = nfCreateEl(
        "p",
        "",
        "Документация по оборудованию доступна по запросу — приложим паспорта и инструкции в составе коммерческого предложения."
      );
      docsTab.appendChild(p);
    }
  }

  const tabsRoot = pageRoot.querySelector(".nf-product-page-tabs");
  if (tabsRoot) {
    const btns = tabsRoot.querySelectorAll(".nf-tab-btn");
    const tabs = tabsRoot.querySelectorAll(".nf-tab");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.tab;
        btns.forEach((b) => b.classList.toggle("nf-tab-btn-active", b === btn));
        tabs.forEach((t) => t.classList.toggle("nf-tab-active", t.id === targetId));
      });
    });
  }
}

function nfInitPartnersPage() {
  nfUpdateSeo({
    title: "Партнёры НаноФарм — производители медицинского оборудования",
    description:
      "Международные и локальные партнёры НаноФарм: производители медицинского оборудования для различных направлений медицины.",
    ogType: "website",
  });
  nfRenderPartners();
}

function nfInitNewsPage() {
  const dateFilter = nfEl("newsDateFilter");
  const searchInput = nfEl("newsSearchInput");

  if (dateFilter) {
    dateFilter.onchange = nfRenderNews;
    nfEnhanceSelectDropdown(dateFilter);
  }
  if (searchInput) searchInput.addEventListener("input", nfDebounce(nfRenderNews, 220));

  nfRenderNews();
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

  nfUpdateSeo({
    title: "Правовая информация — НаноФарм",
    description:
      "Политика конфиденциальности, пользовательское соглашение и реквизиты компании НаноФарм.",
    ogType: "website",
  });
}

function nfInitContactsPage() {
  nfUpdateSeo({
    title: "Контакты НаноФарм",
    description:
      "Контактные данные НаноФарм: адрес, телефон, email и форма обратной связи для запросов по поставке медицинского оборудования.",
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
      nfShowToast("Заявка отправлена.");
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
function nfInitMobileHeaderScroll() {
  const header = document.querySelector(".nf-header");
  if (!header) return;

  let lastY = window.scrollY || 0;
  let ticking = false;

  const handle = () => {
    ticking = false;
    const y = window.scrollY || 0;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      header.classList.remove("nf-header--hidden");
      lastY = y;
      return;
    }

    const delta = y - lastY;
    const threshold = 12;

    if (y <= 0 || delta < -threshold) {
      // Скроллим вверх или вернулись к началу — показываем шапку
      header.classList.remove("nf-header--hidden");
    } else if (delta > threshold) {
      // Скроллим вниз — прячем шапку
      header.classList.add("nf-header--hidden");
    }

    lastY = y;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(handle);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      header.classList.remove("nf-header--hidden");
    }
  });
}

function nfInitPartnerModalSheetDrag() {
  const modal = nfEl("partnerModal");
  if (!modal) return;

  const grabber = modal.querySelector(".nf-modal-grabber") || modal;
  const content = modal.querySelector(".nf-modal-inner");
  let startY = null;
  let currentY = null;
  let dragging = false;

  const isMobile = () => window.innerWidth <= 768;

  const onStart = (clientY) => {
    if (!isMobile()) return;
    // only allow drag when content is scrolled to top (native sheet behavior)
    if (content && content.scrollTop > 0) return;
    dragging = true;
    startY = clientY;
    currentY = clientY;
    modal.style.transition = "transform 0s";
  };

  const onMove = (clientY) => {
    if (!dragging || startY == null) return;
    currentY = clientY;
    const dy = Math.max(0, clientY - startY);
    modal.style.transform = `translate(-50%, ${dy}px)`;
  };

  const onEnd = () => {
    if (!dragging || startY == null || currentY == null) {
      dragging = false;
      return;
    }
    const dy = currentY - startY;
    dragging = false;
    startY = null;
    currentY = null;

    modal.style.transition = "";

    if (dy > 80) {
      nfClosePartnerModal();
    } else {
      modal.style.transform = "translate(-50%, 0)";
    }
  };

  grabber.addEventListener(
    "touchstart",
    (e) => {
      const y = e.touches[0]?.clientY;
      if (typeof y === "number") onStart(y);
    },
    { passive: true }
  );

  grabber.addEventListener(
    "touchmove",
    (e) => {
      const y = e.touches[0]?.clientY;
      if (typeof y === "number") onMove(y);
    },
    { passive: true }
  );

  grabber.addEventListener("touchend", () => {
    onEnd();
  });

  grabber.addEventListener("mousedown", (e) => {
    onStart(e.clientY);
    const onMouseMove = (ev) => onMove(ev.clientY);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      onEnd();
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });
}

function nfInitNewsModalSheetDrag() {
  const modal = nfEl("newsModal");
  if (!modal) return;

  const grabber = modal.querySelector(".nf-modal-grabber") || modal;
  const content = modal.querySelector(".nf-modal-inner");
  let startY = null;
  let currentY = null;
  let dragging = false;

  const isMobile = () => window.innerWidth <= 768;

  const onStart = (clientY) => {
    if (!isMobile()) return;
    if (content && content.scrollTop > 0) return;
    dragging = true;
    startY = clientY;
    currentY = clientY;
    modal.style.transition = "transform 0s";
  };

  const onMove = (clientY) => {
    if (!dragging || startY == null) return;
    currentY = clientY;
    const dy = Math.max(0, clientY - startY);
    modal.style.transform = `translate(-50%, ${dy}px)`;
  };

  const onEnd = () => {
    if (!dragging || startY == null || currentY == null) {
      dragging = false;
      return;
    }
    const dy = currentY - startY;
    dragging = false;
    startY = null;
    currentY = null;

    modal.style.transition = "";

    if (dy > 80) {
      nfCloseNewsModal();
    } else {
      modal.style.transform = "translate(-50%, 0)";
    }
  };

  grabber.addEventListener(
    "touchstart",
    (e) => {
      const y = e.touches[0]?.clientY;
      if (typeof y === "number") onStart(y);
    },
    { passive: true }
  );

  grabber.addEventListener(
    "touchmove",
    (e) => {
      const y = e.touches[0]?.clientY;
      if (typeof y === "number") onMove(y);
    },
    { passive: true }
  );

  grabber.addEventListener("touchend", () => {
    onEnd();
  });

  grabber.addEventListener("mousedown", (e) => {
    onStart(e.clientY);
    const onMouseMove = (ev) => onMove(ev.clientY);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      onEnd();
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });
}

function nfOpenQuickQuote() {
  const modal = nfEl("quickQuoteModal");
  const backdrop = nfEl("quickQuoteBackdrop");
  if (!modal || !backdrop) return;
  backdrop.style.display = "block";
  backdrop.style.visibility = "visible";
  backdrop.style.opacity = "1";
  modal.style.display = "block";
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  modal.classList.add("nf-modal-visible");
  backdrop.classList.add("nf-backdrop-visible");
  modal.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  nfUpdateOverlayBody();
}

function nfCloseQuickQuote() {
  const modal = nfEl("quickQuoteModal");
  const backdrop = nfEl("quickQuoteBackdrop");
  if (!modal || !backdrop) return;
  modal.classList.remove("nf-modal-visible");
  backdrop.classList.remove("nf-backdrop-visible");
  backdrop.style.display = "";
  backdrop.style.visibility = "";
  backdrop.style.opacity = "";
  modal.style.display = "";
  modal.style.visibility = "";
  modal.style.opacity = "";
  modal.setAttribute("aria-hidden", "true");
  backdrop.setAttribute("aria-hidden", "true");
  nfUpdateOverlayBody();
}

/* ====== BOOT ====== */
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = nfEl("footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // NAV: data-page и data-route (делегирование для динамически загруженного контента)
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-page], [data-route]");
    if (!el) return;
    e.preventDefault();
    const page = el.dataset.page || el.dataset.route;
    if (!page) return;

    // Доп. состояние для юридических вкладок
    if (page === "legal" && el.dataset.legalTab) {
      NF_STATE.legalTab = el.dataset.legalTab;
    }

    // Доп. состояние для вкладок «Клиентам» на странице контактов
    if (page === "contacts" && el.dataset.clientsTab) {
      NF_STATE.clientsTab = el.dataset.clientsTab;
    }

    nfToggleMobileNav(false);
    nfNavigate(page);
  });

  // LANG
  document.querySelectorAll(".nf-lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => nfSetLang(btn.dataset.lang));
  });

  // CART PANEL
  const cartToggle = nfEl("cartToggleBtn");
  const cartClose = nfEl("cartCloseBtn");
  const cartBackdrop = nfEl("cartBackdrop");
  const cartRequestBtn = nfEl("cartRequestBtn");

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
    cartRequestBtn.onclick = async () => {
      const base = nfApiBase();
      if (base && NF_STATE.cart.length) {
        try {
          await fetch(base + "/api/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "cart", cart: NF_STATE.cart }),
          });
        } catch (_err) {}
      }
      nfShowToast("Запрос на оборудование отправлен.");
      nfCloseCartPanel();
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
  if (quickClose) quickClose.onclick = nfCloseQuickQuote;
  if (quickBackdrop) quickBackdrop.onclick = nfCloseQuickQuote;

  const quickForm = nfEl("quickQuoteForm");
  if (quickForm) {
    nfAttachRealtimeValidation(quickForm);
    const quickSuccess = nfEl("quickQuoteSuccess");
    quickForm.onsubmit = async (e) => {
      e.preventDefault();
      if (!nfValidateForm(quickForm)) return;
      const base = nfApiBase();
      const payload = {
        type: "quick_quote",
        name: quickForm.name?.value?.trim() || "",
        company: quickForm.company?.value?.trim() || "",
        phone: quickForm.phone?.value?.trim() || "",
        email: quickForm.email?.value?.trim() || "",
        items: quickForm.items?.value?.trim() || "",
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
      nfShowToast("Запрос отправлен.");
    };
  }

  // Global search suggestions
  const nfUpdateSearchSuggestions = nfDebounce(() => {
    const input = nfEl("globalSearchInput");
    const box = nfEl("searchSuggestions");
    if (!input || !box) return;

    const q = input.value.trim().toLowerCase();
    if (!q) {
      box.classList.remove("nf-search-suggestions-visible");
      box.innerHTML = "";
      return;
    }

    const products = NF_DATA.products
      .filter((p) => {
        const partnerName = nfGetPartnerName(p.partnerId).toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.article.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          partnerName.includes(q)
        );
      })
      .slice(0, 6);

    const categories = NF_DATA.categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    const partners = NF_DATA.partners.filter(
      (p) => p.name.toLowerCase().includes(q) || p.equipment.toLowerCase().includes(q)
    );

    box.innerHTML = "";

    if (!products.length && !categories.length && !partners.length) {
      box.innerHTML = `<div class="nf-search-group-label">Ничего не найдено</div>`;
      box.classList.add("nf-search-suggestions-visible");
      return;
    }

    if (products.length) {
      box.appendChild(nfCreateEl("div", "nf-search-group-label", "Товары"));
      products.forEach((p) => {
        const item = nfCreateEl("div", "nf-search-item");
        const thumb = nfCreateEl("div", "nf-search-thumb");
        const main = nfCreateEl("div", "nf-search-item-main");
        main.append(
          nfCreateEl("div", "nf-search-item-title", p.name),
          nfCreateEl("div", "nf-search-item-meta", `${p.article} · ${nfGetPartnerName(p.partnerId)}`)
        );

        const cta = nfCreateEl("div", "nf-search-item-cta nf-btn-checkable", "В запрос");
        cta.addEventListener("click", (e) => {
          e.stopPropagation();
          nfAddToCart(p.id, 1);
          nfAnimateAddToCartButton(cta);
        });

        item.append(thumb, main, cta);
        item.addEventListener("click", () => nfOpenProductPage(p.id));
        box.appendChild(item);
      });
    }

    if (categories.length) {
      box.appendChild(nfCreateEl("div", "nf-search-group-label", "Категории"));
      categories.forEach((c) => {
        const item = nfCreateEl("div", "nf-search-item");
        const main = nfCreateEl("div", "nf-search-item-main");
        main.append(
          nfCreateEl("div", "nf-search-item-title", c.name),
          nfCreateEl("div", "nf-search-item-meta", c.description)
        );
        item.append(main);
        item.addEventListener("click", () => {
          NF_STATE.filters.categoryIds = new Set([c.id]);
          nfNavigate("catalog");
          box.classList.remove("nf-search-suggestions-visible");
        });
        box.appendChild(item);
      });
    }

    if (partners.length) {
      box.appendChild(nfCreateEl("div", "nf-search-group-label", "Партнёры"));
      partners.forEach((p) => {
        const item = nfCreateEl("div", "nf-search-item");
        const main = nfCreateEl("div", "nf-search-item-main");
        main.append(
          nfCreateEl("div", "nf-search-item-title", p.name),
          nfCreateEl("div", "nf-search-item-meta", `${p.country} · ${p.equipment}`)
        );
        item.append(main);
        item.addEventListener("click", () => {
          NF_STATE.selectedPartnerId = p.id;
          nfNavigate("partners");
          box.classList.remove("nf-search-suggestions-visible");
        });
        box.appendChild(item);
      });
    }

    box.classList.add("nf-search-suggestions-visible");
  }, 220);

  const globalSearchInput = nfEl("globalSearchInput");
  if (globalSearchInput) globalSearchInput.addEventListener("input", nfUpdateSearchSuggestions);

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nf-search")) {
      const box = nfEl("searchSuggestions");
      if (box) box.classList.remove("nf-search-suggestions-visible");
    }
  });

  // Partner modal close
  const partnerClose = nfEl("partnerModalClose");
  const partnerBackdrop = nfEl("partnerModalBackdrop");
  if (partnerClose) partnerClose.onclick = nfClosePartnerModal;
  if (partnerBackdrop) partnerBackdrop.onclick = nfClosePartnerModal;

  // News modal close
  const newsClose = nfEl("newsModalClose");
  const newsBackdrop = nfEl("newsModalBackdrop");
  if (newsClose) newsClose.onclick = nfCloseNewsModal;
  if (newsBackdrop) newsBackdrop.onclick = nfCloseNewsModal;

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

  // START APP
  const initial = location.hash.replace("#", "") || "home";
  nfLoadPage(initial);
  nfUpdateCartBadge();
  nfLoadCatalogFromApi();

  // Mobile header hide/show on scroll
  nfInitMobileHeaderScroll();
  nfInitPartnerModalSheetDrag();
});