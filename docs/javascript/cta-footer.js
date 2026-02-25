(function () {
  // ====== PLACEHOLDERS (replace later) ======
  const EMAIL = "you@example.com";
  const LINKEDIN = "https://www.linkedin.com/in/your-handle";
  const GITHUB = "https://github.com/your-username";
  // =========================================

  function getBase() {
    // MkDocs Material base path (GitHub Pages subpath safe)
    try {
      if (typeof __md_get === "function") return __md_get("__base") || "";
    } catch (e) {}
    return "";
  }

  function url(path) {
    const base = getBase().replace(/\/$/, ""); // remove trailing slash
    const clean = String(path || "").replace(/^\//, ""); // remove leading slash
    // Ensure ends with /
    return `${base}/${clean}`.replace(/\/+$/, "/");
  }

  function addFooterTemplate() {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;
    if (footer.querySelector(".custom-footer")) return;

    const meta = footer.querySelector(".md-footer-meta");
    const block = document.createElement("section");
    block.className = "custom-footer";

    const t = {
      explore: "Explore",
      home: "Home",
      links: "Links",
      policies: "Policies",
      privacy: "Privacy Notice",
      disclaimer: "Academic Disclaimer",
      copyright: "Copyright",
      contact: "Contact",
      linkedin: "LinkedIn",
      github: "GitHub",
      email: "Email",
    };

    // Navigation
    const homeHref = url("");
    const linksHref = url("links/");

    // Policies
    const privacyHref = url("privacy-notice/");
    const disclaimerHref = url("academic-disclaimer/");
    const copyrightHref = url("copyright/");

    block.innerHTML = `
      <div class="custom-footer__inner" dir="ltr">
        <div class="custom-footer__right">
          <div class="footer-col">
            <div class="footer-col__title">${t.explore}</div>
            <a class="footer-link" href="${homeHref}">${t.home}</a>
            <a class="footer-link" href="${linksHref}">${t.links}</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">${t.policies}</div>
            <a class="footer-link" href="${privacyHref}">${t.privacy}</a>
            <a class="footer-link" href="${disclaimerHref}">${t.disclaimer}</a>
            <a class="footer-link" href="${copyrightHref}">${t.copyright}</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">${t.contact}</div>
            <a class="footer-link" href="mailto:${EMAIL}">${EMAIL}</a>
            <a class="footer-link" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">
              ${t.linkedin}
            </a>
            <a class="footer-link" href="${GITHUB}" target="_blank" rel="noopener noreferrer">
              ${t.github}
            </a>
          </div>
        </div>
      </div>
    `;

    if (meta) footer.insertBefore(block, meta);
    else footer.prepend(block);
  }

  function run() {
    addFooterTemplate();
  }

  // Material instant navigation support
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();