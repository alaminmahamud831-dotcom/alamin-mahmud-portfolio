
(() => {
  let SITE = null;
  let PROJECTS = [];
  let CURRENT_LANG = localStorage.getItem("am-lang") || "en";

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

  async function loadData() {
    const [siteResponse, projectResponse] = await Promise.all([
      fetch("data/site-content.json", {cache:"no-cache"}),
      fetch("data/projects.json", {cache:"no-cache"})
    ]);
    if (!siteResponse.ok || !projectResponse.ok) throw new Error("Could not load website content.");
    SITE = await siteResponse.json();
    PROJECTS = await projectResponse.json();
  }

  function text(key, lang=CURRENT_LANG) {
    return SITE?.[lang]?.[key] ?? SITE?.en?.[key] ?? key;
  }

  function setLanguage(lang) {
    if (!SITE) return;
    CURRENT_LANG = lang === "ar" ? "ar" : "en";
    localStorage.setItem("am-lang", CURRENT_LANG);
    document.documentElement.lang = CURRENT_LANG;
    document.documentElement.dir = CURRENT_LANG === "ar" ? "rtl" : "ltr";
    document.body.dir = CURRENT_LANG === "ar" ? "rtl" : "ltr";

    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (SITE[CURRENT_LANG]?.[key] !== undefined) el.textContent = SITE[CURRENT_LANG][key];
    });
    $$("[data-lang-toggle]").forEach(el => {
      el.textContent = text("language_button");
      el.setAttribute("aria-label", CURRENT_LANG === "ar" ? "Switch to English" : "التبديل إلى العربية");
    });
    updateContact();
    updateMedia();
    updateTheme();
    renderProjectCards();
    renderProjectPage();
    updateActiveNav();
  }

  function updateTheme() {
    const theme = SITE.theme || {};
    const root = document.documentElement;
    const allowed = {
      primary_color: "--navy",
      accent_color: "--mint",
      page_background: "--paper",
      card_background: "--surface"
    };
    Object.entries(allowed).forEach(([key, variable]) => {
      const value = String(theme[key] || "").trim();
      if (/^#[0-9a-fA-F]{6}$/.test(value)) root.style.setProperty(variable, value);
    });
    const scale = Number(theme.font_scale);
    if (Number.isFinite(scale) && scale >= 0.9 && scale <= 1.15) {
      root.style.setProperty("--font-scale", String(scale));
    }
  }

  function updateMedia() {
    const media = SITE.media || {};
    $$("[data-site-image]").forEach(img => {
      const key = img.dataset.siteImage;
      if (media[key]) img.src = media[key];
    });
    if (media.office_image) {
      const safePath = String(media.office_image).replace(/["\\\\]/g, "");
      document.documentElement.style.setProperty("--office-photo", `url("${safePath}")`);
    }
  }

  function updateContact() {
    const contact = SITE.contact || {};
    $$("[data-contact-name]").forEach(el => el.textContent = contact.name || "Alamin Mahmud");
    $$("[data-contact-email]").forEach(el => el.textContent = contact.email || "");
    $$("[data-contact-email-link]").forEach(el => el.href = `mailto:${contact.email || ""}`);
    $$("[data-contact-whatsapp]").forEach(el => {
      el.href = `https://wa.me/${(contact.whatsapp || "").replace(/\D/g,"")}`;
      if (!el.textContent.trim() || el.textContent.includes("+")) el.textContent = "WhatsApp";
    });
    $$("[data-contact-whatsapp-link]").forEach(el => el.href = `https://wa.me/${(contact.whatsapp || "").replace(/\D/g,"")}`);
    $$("[data-contact-phone]").forEach(el => el.textContent = contact.whatsapp_display || contact.whatsapp || "");
    $$("[data-contact-linkedin]").forEach(el => el.href = contact.linkedin || "#");
    $$("[data-contact-linkedin-link]").forEach(el => el.href = contact.linkedin || "#");
  }

  function updateActiveNav() {
    const page = location.pathname.split("/").pop() || "index.html";
    const mapping = {
      "index.html":"home","about.html":"about","services.html":"services",
      "portfolio.html":"portfolio","process.html":"process",
      "data-quality.html":"quality","tools.html":"tools","contact.html":"contact"
    };
    const active = mapping[page] || (page.startsWith("project-") ? "portfolio" : "");
    $$(".main-nav a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === ({
        home:"index.html",about:"about.html",services:"services.html",
        portfolio:"portfolio.html",process:"process.html",quality:"data-quality.html",
        tools:"tools.html",contact:"contact.html"
      }[active] || ""));
    });
  }

  function makeProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const art = document.createElement("div");
    art.className = "project-art";
    const artTitle = document.createElement("strong");
    artTitle.textContent = project.id === "law" ? "LEGAL RESEARCH" :
      project.id === "realestate" ? "REAL ESTATE" : "DENTAL RESEARCH";
    art.appendChild(artTitle);

    const body = document.createElement("div");
    body.className = "project-body";
    const h3 = document.createElement("h3");
    h3.textContent = CURRENT_LANG === "ar" ? project.title_ar : project.title;
    const p = document.createElement("p");
    p.textContent = CURRENT_LANG === "ar" ? project.summary_ar : project.summary;
    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.textContent = `${project.source_count} ${text("records")}`;
    const link = document.createElement("a");
    link.className = "text-link";
    link.href = `project-${project.id}.html`;
    link.textContent = `${text("view_project")} ↗`;

    body.append(h3,p,meta,link);
    card.append(art,body);
    return card;
  }

  function renderProjectCards() {
    const host = $("[data-project-cards]");
    if (!host) return;
    host.replaceChildren(...PROJECTS.map(makeProjectCard));
  }

  function renderProjectPage() {
    const id = document.body.dataset.project;
    if (!id) return;
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    const ar = CURRENT_LANG === "ar";
    const title = ar ? project.title_ar : project.title;
    const summary = ar ? project.summary_ar : project.summary;
    const market = ar ? project.market_ar : project.market;
    const source = ar ? project.source_ar : project.source;

    $("[data-project-title]").textContent = title;
    $("[data-project-summary]").textContent = summary;
    $("[data-project-record-count]").textContent = project.source_count;
    $("[data-project-preview-count]").textContent = project.preview_count;
    $("[data-project-industry]").textContent = ar ? project.industry_ar : project.industry;
    $("[data-project-market]").textContent = market;
    $("[data-project-source]").textContent = source;
    $("[data-project-caveat]").textContent = ar ? project.caveat_ar : project.caveat;

    const keys = [
      ["company","table_company"],["decision_maker","table_decision"],
      ["job_title","table_job"],["location","table_location"],
      ["website","table_website"],["email_status","table_status"],
      ["email_masked","table_email"],["phone_masked","table_phone"],
      ["linkedin_masked","table_linkedin"]
    ];
    const table = $("[data-project-table]");
    const thead = $("thead", table);
    const tbody = $("tbody", table);
    thead.replaceChildren();
    tbody.replaceChildren();

    const headerRow = document.createElement("tr");
    keys.forEach(([field,labelKey]) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = text(labelKey);
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    project.rows.forEach(row => {
      const tr = document.createElement("tr");
      keys.forEach(([field]) => {
        const td = document.createElement("td");
        const value = row[field];
        if (field === "website" && value) {
          const a = document.createElement("a");
          a.href = `https://${value}`;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = value;
          a.dir = "ltr";
          td.appendChild(a);
        } else if (field === "email_status") {
          const span = document.createElement("span");
          const verified = String(value).toLowerCase() === "verified";
          span.className = verified ? "cell-status" : "cell-unverified";
          span.textContent = verified ? text("status_verified") : text("status_unverified");
          td.appendChild(span);
        } else {
          td.textContent = value || text("not_found");
          if (["email_masked","phone_masked","linkedin_masked"].includes(field)) td.dir = "ltr";
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function bindControls() {
    $$("[data-lang-toggle]").forEach(button => {
      button.addEventListener("click", () => setLanguage(CURRENT_LANG === "en" ? "ar" : "en"));
    });
    const menu = $(".menu-toggle");
    if (menu) {
      menu.addEventListener("click", () => {
        const nav = $(".main-nav");
        const open = nav.classList.toggle("open");
        menu.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  async function init() {
    try {
      await loadData();
      bindControls();
      setLanguage(CURRENT_LANG);
    } catch (error) {
      console.error(error);
      document.documentElement.classList.add("content-load-error");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
