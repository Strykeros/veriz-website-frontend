var mediaAll = window.matchMedia("(all)");
var mediaContrastNone = window.matchMedia("(-ms-high-contrast: none)");
var mediaContrastActive = window.matchMedia("(-ms-high-contrast: active)");

if (mediaAll.matches || mediaContrastNone.matches || mediaContrastActive.matches) {

    var ieBody = document.querySelector("body");
    var ieHeader = document.querySelector("header");
    var ieDiv = document.createElement("div");    
    ieDiv.classList.add("ie-msg");
    ieDiv.textContent = "UZMANĪBU! Jūs lietojat novecojušu pārlūkprogrammu, Internet Explorer, kura ir nedroša, un netiek vairs atbalstīta. Lai apskatītu šo vietni, lūdzam izvēlēties citu pārlūkprogrammu."
    + "\r\n"
    + "\r\nATTENTION! You are using an outdated browser, Internet Explorer, that is not secure and is not supported anymore. Please use a different browser in order to view this website."
    + "\r\n"
    + "\r\nВНИМАНИЕ! Вы используете устаревший браузер Internet Explorer, который не является безопасным и больше не поддерживается. Пожалуйста, используйте другой браузер для просмотра этого сайта.";

    ieDiv.style.position = "absolute";
    ieDiv.style.top = "0";
    ieDiv.style.left = "0";
    ieDiv.style.visibility = "visible";
    ieDiv.style.width = "100%";
    ieDiv.style.fontSize = "36px";
    ieDiv.style.backgroundColor = "white";
    ieDiv.style.height = "auto";
    ieDiv.style.whiteSpace = "pre-line";
    ieBody.appendChild(ieDiv);    

    ieHeader.style.visibility = "hidden";
}
