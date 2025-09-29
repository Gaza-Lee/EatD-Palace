(function () {
    if (!document.querySelector('link[href="/Pages/menu/menu.css"]')){
        const menuStyles = document.createElement("link");
        menuStyles.rel = "stylesheet";
        menuStyles.href = "/Pages/menu/menu.css";
        document.head.appendChild(menuStyles);
    }
})();

