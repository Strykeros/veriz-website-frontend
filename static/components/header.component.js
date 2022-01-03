const headerHtml = document.querySelector("html");
const head = document.querySelector("head");
const pageBody = document.querySelector("body");
let header;
let menuUl;
let divCol;
let menuIcon = "../static/resources/menu_icon.png";
let menuIconClose = "../static/resources/close_icon.png";
let indexLink = BASE;
let newsLink = BASE + NEWS;
let servicesLink = BASE + SERVICES;
let contactLink = BASE + CONTACT;
let partsLink = BASE + SPARE_PARTS;
let headerMenuTxts = ["Sākums", "Jaunumi/Akcijas", "Pakalpojumi", "Kontakti"];

function initializeHeader(){
    header = document.createElement("header");
    pageBody.appendChild(header);
    initializeHeaderContent();
}

function createMenuBtn(){

    let div = document.createElement("div");
    div.classList.add("menu-button");  
    div.addEventListener("click", toggleMenu.bind(null, null), false);
    header.appendChild(div);

    let ico = document.createElement("i");
    ico.classList.add("header-button-ico");
    ico.classList.add("bi-list");
    div.appendChild(ico);
}


function initializeHeaderContent(){
    let classNames = ["logo-parent", "menu"];

    let logoNames = ["logo-large", "logo-small"];
    let imgSrcs = ["../static/resources/logo_veriz_italic_lines.png", "../static/resources/logo_veriz_italic.png"];
    for(let i = 0; i < classNames.length; i++){
        if(i === 0){
            let logoImg;

            let a = document.createElement("a");
            a.href = indexLink;
            a.classList.add("logo-wrapper");   
            a.ondragstart = function(e){
                e.preventDefault();
            }         
            header.appendChild(a);

            for(let i = 0; i < 2; i++){
                logoImg = document.createElement("img");
                logoImg.classList.add("logo");    
                logoImg.classList.add(logoNames[i]);      
                logoImg.src = imgSrcs[i];
                logoImg.alt = "veriz.lv";
                logoImg.ondragstart = function(e){
                    e.preventDefault();
                }  
                a.appendChild(logoImg);          
            }               
        }
        else{
            let div = document.createElement("div");
            div.classList.add(classNames[i]);
            header.appendChild(div);            
        }

    }

    initializeMenuContent();
    createMenuBtn();
}

function initializeTitleContent(){
    let headingDiv = document.querySelector(".title");
    let h1 = document.createElement("h1");
    headingDiv.appendChild(h1);
}

function initializeMenuContent(){

    let links = [indexLink, newsLink, servicesLink, contactLink];
    let menuDiv = document.querySelector(".menu");

    let menuCont = document.createElement("div");
    menuCont.classList.add("menu-container");
    menuDiv.appendChild(menuCont);

    for(let i = 0; i < headerMenuTxts.length; i++){
        let a = document.createElement("a");
        a.classList.add("item-" + i);        
        a.classList.add("menu-item");
        a.ondragstart = function(e){
            e.preventDefault();
        }
        a.href = links[i];
        menuCont.appendChild(a);  
        
        let div = document.createElement("div");
        div.classList.add("menu-inner");
        div.innerText = headerMenuTxts[i];        
        a.appendChild(div);

        let hr = document.createElement("hr");
        hr.classList.add("menu-underline");
        a.appendChild(hr);      
    }
    hideMenu();
}

function hideMenu(){
    let menu = document.querySelector(".menu");
    menu.classList.add("hide");
}

function toggleMenu(){
    let menuBtn = document.querySelector(".header-button-ico");
    let menu = document.querySelector(".menu");

    menu.classList.toggle("hide");

    if (menu.classList.contains("hide")) {
        menuBtn.classList.remove("bi-x"); 
        menuBtn.classList.add("bi-list"); 
    } else {
        menuBtn.classList.remove("bi-list"); 
        menuBtn.classList.add("bi-x"); 
    }
}

initializeHeader();