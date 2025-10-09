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

// Select all sections and corresponding nav links
const sections = document.querySelectorAll(".home-body section, .menu-body section");
const navLinks = document.querySelectorAll(".home-nav a, .menu-nav a");

// Intersection Observer setup
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");

      // find link in whichever nav exists on this page
      const navLink = document.querySelector(`.home-nav a[href="#${id}"], .menu-nav a[href="#${id}"]`);

      if (entry.isIntersecting && navLink) {
        // Remove active class from all links on this page
        navLinks.forEach((link) => link.classList.remove("active"));

        // Highlight the matching one
        navLink.classList.add("active");
      }
    });
  },
  {
    root: null,
    threshold: 0.5, // 50% of the section must be visible
  }
);

// Observe each section
sections.forEach((section) => observer.observe(section));
