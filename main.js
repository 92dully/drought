/* ============================================================
   DROUGHT — MAIN SCRIPT
   Renders BUSINESS / SPECIALS / MENU / CUSTOMISATION from
   data.js into the page, then wires up nav, accordion,
   filtering, and scroll-reveal behaviour.
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const to12h = (t) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = ((h + 11) % 12) + 1;
    return m === 0 ? `${hour}${period}` : `${hour}:${String(m).padStart(2, "0")}${period}`;
  };

  /* ---------------- Hero hours summary ---------------- */
  function renderHeroHours() {
    const open = BUSINESS.hours.filter((h) => h.open);
    if (!open.length) return;
    const first = open[0].day.slice(0, 3).toUpperCase();
    const last = open[open.length - 1].day.slice(0, 3).toUpperCase();
    const span = open.length > 1 ? `${first} — ${last}` : first;
    const time = `${to12h(open[0].open)} — ${to12h(open[0].close)}`;
    $("#heroHours").innerHTML = `
      <span class="h-days">${span}</span>
      <span class="h-time">${time}</span>
    `;
  }

  /* ---------------- Specials ---------------- */
  function renderSpecials() {
    const grid = $("#specialsGrid");
    grid.innerHTML = SPECIALS.map((s) => {
      const isTruncated = !/[.!?]$/.test(s.description.trim());
      return `
        <article class="special-card reveal">
          <span class="special-name">${s.name}</span>
          <span class="special-price">${s.price}</span>
          <p class="special-desc">${s.description}${isTruncated ? '<span class="fade-note"> …</span>' : ""}</p>
        </article>
      `;
    }).join("");
  }

  /* ---------------- Menu ---------------- */
  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function renderMenuNav() {
    const nav = $("#menuNav");
    nav.innerHTML = MENU.map((cat, i) => `
      <button class="menu-pill${i === 0 ? " is-active" : ""}" data-target="cat-${slugify(cat.category)}" type="button">
        ${cat.category}
      </button>
    `).join("");

    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu-pill");
      if (!btn) return;
      $$(".menu-pill", nav).forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function chipRow(label, items, isAddon = false) {
    if (!items || !items.length) return "";
    return `
      <div class="chip-group">
        <span class="chip-group-label">${label}</span>
        <div class="chip-row">
          ${items.map((i) => `<span class="chip${isAddon ? " chip-addon" : ""}">${i}</span>`).join("")}
        </div>
      </div>
    `;
  }

  function renderMenuList() {
    const list = $("#menuList");
    list.innerHTML = MENU.map((cat, i) => `
      <div class="menu-item" id="cat-${slugify(cat.category)}" data-index="${i}">
        <button class="menu-item-head" aria-expanded="false">
          <span class="menu-item-title">${cat.category}</span>
          <span style="display:flex;align-items:center;gap:0.75rem;">
            <span class="menu-item-price">${cat.price}</span>
            <span class="menu-item-chevron" aria-hidden="true"></span>
          </span>
        </button>
        <div class="menu-item-body">
          <div class="menu-item-body-inner">
            ${chipRow("Flavours", cat.flavours)}
            ${chipRow("Milk", cat.milk)}
            ${chipRow("Add-ons", cat.addOns, true)}
          </div>
        </div>
      </div>
    `).join("");

    $$(".menu-item-head", list).forEach((head) => {
      head.addEventListener("click", () => {
        if (window.matchMedia("(min-width: 860px)").matches) return; // always open on desktop
        const item = head.closest(".menu-item");
        const body = $(".menu-item-body", item);
        const isOpen = item.classList.contains("is-open");
        item.classList.toggle("is-open", !isOpen);
        head.setAttribute("aria-expanded", String(!isOpen));
        body.style.maxHeight = isOpen ? "0px" : body.scrollHeight + "px";
      });
    });
  }

  /* ---------------- Customisation ---------------- */
  function renderCustomisation() {
    const grid = $("#customGrid");
    grid.innerHTML = `
      <div class="custom-card">
        <h3>Cold Foam</h3>
        <span class="custom-price">${CUSTOMISATION.coldFoam.price}</span>
        ${chipRow("Flavours", CUSTOMISATION.coldFoam.flavours)}
      </div>
      <div class="custom-card">
        <h3>Fruit Bases</h3>
        <span class="custom-price">${CUSTOMISATION.fruitBases.price}</span>
        ${chipRow("Flavours", CUSTOMISATION.fruitBases.flavours)}
      </div>
      <div class="custom-card">
        <h3>Milk</h3>
        ${chipRow("Options", CUSTOMISATION.milk.options)}
      </div>
    `;
    $("#customNote").textContent = BUSINESS.allergenNote;
  }

  /* ---------------- Visit / hours / footer ---------------- */
  function renderVisit() {
    const { address, mapsUrl, mapsEmbedUrl, instagram, hours, hoursNote } = BUSINESS;
    const addrLines = [address.line1, address.city, address.postcode].filter(Boolean);

    $("#visitAddress").innerHTML = `${BUSINESS.name}<br>${addrLines.join("<br>")}`;

    const directionsBtn = $("#directionsBtn");
    directionsBtn.href = mapsUrl;
    directionsBtn.target = "_blank";
    directionsBtn.rel = "noopener";

    const mapEmbed = $("#mapEmbed");
    if (mapEmbed) mapEmbed.src = mapsEmbedUrl;

    $("#hoursTable").innerHTML = hours.map((h) => `
      <tr class="${h.open ? "" : "hours-closed"}">
        <td>${h.day}</td>
        <td>${h.open ? `${to12h(h.open)} – ${to12h(h.close)}` : "Closed"}</td>
      </tr>
    `).join("");
    $("#hoursNote").textContent = hoursNote;

    $("#instaHandle").textContent = instagram.handle;
    $("#instaBtn").href = instagram.url;

    $("#footerTagline").textContent = BUSINESS.tagline;
    const openDays = hours.filter((h) => h.open);
    const firstOpen = openDays[0];
    $("#footerAddress").innerHTML = `${addrLines.join("<br>")}<br>${openDays.map((h) => h.day.slice(0, 3)).join("/")} ${to12h(firstOpen.open)}–${to12h(firstOpen.close)}`;
    $("#footerInsta").textContent = instagram.handle;
    $("#footerInsta").href = instagram.url;
    $("#footerCopy").textContent = `© ${new Date().getFullYear()} DROUGHT`;
  }

  /* ---------------- Nav interactions ---------------- */
  function initNav() {
    const header = $("#siteHeader");
    const toggle = $("#navToggle");
    const mobileMenu = $("#mobileMenu");

    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      mobileMenu.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    }));
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    const items = $$(".reveal, .special-card");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeroHours();
    renderSpecials();
    renderMenuNav();
    renderMenuList();
    renderCustomisation();
    renderVisit();
    initNav();
    initReveal();
  });
})();
