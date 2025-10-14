import { Navbar } from "../shared/navbar.js";
import { Footer } from "../shared/footer.js";

(function () {
  // Prevent duplicate
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "/src/assets/fav-icon.png";
    document.head.appendChild(favicon);
  }

  // Index styles
  if (!document.querySelector('link[href="/src/shared/indexStyles.css"]')) {
    const indexStyles = document.createElement("link");
    indexStyles.rel = "stylesheet";
    indexStyles.href = "/src/shared/indexStyles.css";
    document.head.appendChild(indexStyles);
  }

  // Index media queries
  if (!document.querySelector('link[href="/src/shared/responsiveness.css"]')) {
    const responsiveStyles = document.createElement("link");
    responsiveStyles.rel = "stylesheet";
    responsiveStyles.href = "/src/shared/responsiveness.css";
    document.head.appendChild(responsiveStyles);
  }

  // Iconify script
  if (!document.querySelector('script[src*="iconify-icon"]')) {
    const script = document.createElement("script");
    script.src =
      "https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js";
    document.head.appendChild(script);
  }

  // Navbar
  if (!document.body.classList.contains("no-navbar")) {
    document.body.prepend(Navbar());
  }

  // Footer
  if (!document.body.classList.contains("no-footer")) {
    document.body.appendChild(Footer());
  }
})();

/// ===== Select sections and nav links =====
const homeSections = document.querySelectorAll(".home-body section");
const menuSections = document.querySelectorAll(".menu-body section");
const homeNavLinks = document.querySelectorAll(".home-nav a");
const menuNavLinks = document.querySelectorAll(".menu-nav a");

// =========================
// HOME PAGE OBSERVER (simple threshold)
// =========================
if (homeNavLinks.length > 0) {
  const homeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.home-nav a[href="#${id}"]`);

        if (entry.isIntersecting && navLink) {
          homeNavLinks.forEach((link) => link.classList.remove("active"));
          navLink.classList.add("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.5, // 50% visible = active
    }
  );

  homeSections.forEach((section) => homeObserver.observe(section));
}

// =========================
// MENU PAGE OBSERVER (most visible section detection)
// =========================
if (menuNavLinks.length > 0) {
  const menuObserver = new IntersectionObserver(
    (entries) => {
      // find which section has the largest visible area
      let mostVisible = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          mostVisible = entry;
          maxRatio = entry.intersectionRatio;
        }
      });

      if (mostVisible && mostVisible.isIntersecting) {
        const id = mostVisible.target.getAttribute("id");
        const navLink = document.querySelector(
          `.menu-nav a[href="#${id}"]`
        );

        if (navLink) {
          menuNavLinks.forEach((link) => link.classList.remove("active"));
          navLink.classList.add("active");
        }
      }
    },
    {
      root: null,
      threshold: buildThresholdList(), // more granular detection
    }
  );

  function buildThresholdList() {
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.1) thresholds.push(i);
    return thresholds;
  }

  menuSections.forEach((section) => menuObserver.observe(section));
}
