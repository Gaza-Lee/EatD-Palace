import { Navbar } from "../shared/navbar.js";

(function () {
  // Prevent duplicate
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "/src/assets/fav-icon.png";
    document.head.appendChild(favicon);
  }

  if (!document.querySelector('link[href="/src/shared/indexStyles.css"]')) {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/src/shared/indexStyles.css";
    document.head.appendChild(styleLink);
  }

  if (!document.querySelector('script[src*="iconify-icon"]')) {
    const script = document.createElement("script");
    script.src = "https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js";
    document.head.appendChild(script);
  }

 if (!document.body.classList.contains("no-navbar")) {
  document.body.prepend(Navbar());
}
})();