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
