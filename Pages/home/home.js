(function(){
    if (!document.querySelector('link[href="/Pages/home/home.css"]')){
        const homeStyle = document.createElement("link");
        homeStyle.rel = "stylesheet";
        homeStyle.href = "/Pages/home/home.css";
        document.head.appendChild(homeStyle);
    }
})();