(function () {
  if (!document.querySelector('link[href="/Pages/aboutUs/aboutUs.css"]')) {
    const menuStyles = document.createElement("link");
    menuStyles.rel = "stylesheet";
    menuStyles.href = "/Pages/aboutUs/aboutUs.css";
    document.head.appendChild(menuStyles);
  }
})();