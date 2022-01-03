const body = document.querySelector("body");
let headerTitle = document.querySelector(".title h1");
let headerTitleTxt = "Jaunumi";
let scriptLoaded = true;

function initializeHeaderTitle(){
    headerTitle.innerText = headerTitleTxt;
}

function modifyMenu(){
    let underline = document.querySelector(".item-1 .menu-underline");
    underline.style.opacity = "1";
}

modifyMenu();
