const footerBody = document.querySelector("body");
let footer;
let footerCurrentYear = new Date().getFullYear();
let addressTxt = "Odzienas iela 10, Pļaviņas, LV-5120";
let copyrightTxt = `Copyright \u00A9 ${footerCurrentYear} SIA Vēri Z — All rights reserved.`;
let socialHeadingTxt = "Seko mums";
let menuHeadingTxt = "Izvēlne";
let contactHeadingTxt = "Kontakti";
let menuTxts = ["Sākums", "Jaunumi", "Pakalpojumi", "Pieteikt pakalpojumu", "Kontakti", "Privātuma politika"];
let contactTitleTxts = ["Tālrunis", "E-pasts"];
let contactDescTxts = ["", "veriz.serviss@apollo.lv", ""];
let contactPhoneTxt = "+371 26 434 118";
let linkList = ["", NEWS, SERVICES, BOOK_SERVICE, CONTACT, PRIVACY];
let contactCon;

function initFooter(){
    footerContent();
}

function footerContent(){
    footer = document.createElement("footer");
    footer.classList.add("container-fluid");
    footerBody.appendChild(footer);

    initFooterSections();
}

function initFooterSections(){

    let footerContainer = document.createElement("div");
    footerContainer.classList.add(`footer-container-1`);
    footerContainer.classList.add("row");
    footer.appendChild(footerContainer);

    initFooterWrappers();
    initCopyright();
    initContacts();    
    menuContent();
}

function initFooterWrappers(){
    let footerContainer = document.querySelector(".footer-container-1");    
    for(let i = 1; i < 4; i++){

        let contentWrap = document.createElement("div");
        contentWrap.classList.add(`ftr-content-wrapper-${i}`);
        contentWrap.classList.add("col-md-4");
        footerContainer.appendChild(contentWrap);            
    }
}

function initCopyright(){
    let wrapper1 = document.querySelector(".ftr-content-wrapper-1");
    
    let indexLink = document.createElement("a");
    indexLink.classList.add("index-href");
    indexLink.href = BASE;
    indexLink.ondragstart = function(e){
        e.preventDefault();
    } 
    wrapper1.appendChild(indexLink);

    let footerLogo = document.createElement("img");
    footerLogo.classList.add("footer-logo"); 
    footerLogo.classList.add("img-fluid"); 
    footerLogo.src = "../static/resources/logo_veriz_italic.png";
    indexLink.appendChild(footerLogo);   

    let address = document.createElement("p");
    address.classList.add("footer-address");
    address.innerText = addressTxt;
    wrapper1.appendChild(address);

    let copyright = document.createElement("p");
    copyright.classList.add("footer-copy");
    copyright.innerText = copyrightTxt;
    wrapper1.appendChild(copyright);


}

function initContacts(){
    let wrapper3 = document.querySelector(".ftr-content-wrapper-3");

    contactCon = document.createElement("div");
    contactCon.classList.add("contact-container");
    wrapper3.appendChild(contactCon);

    contactContent();
}

function contactContent(){
    let contactHeading = document.createElement("h3");
    contactHeading.classList.add("content-heading");
    contactHeading.innerText = contactHeadingTxt;
    contactCon.appendChild(contactHeading);

    for(let i = 0; i < contactTitleTxts.length; i++){

        let contactContent = document.createElement("div");
        contactContent.classList.add("contact-content");
        contactContent.classList.add(`contact-content-${i}`);
        contactCon.appendChild(contactContent);

        let contactTitle = document.createElement("h4");
        contactTitle.classList.add("contact-title");
        contactTitle.innerText = contactTitleTxts[i] + ":";
        contactContent.appendChild(contactTitle);

        if(i === 0){

            let contactLink = document.createElement("a");
            contactLink.classList.add("contact-link");
            contactLink.href = "tel:" + contactPhoneTxt;
            contactContent.appendChild(contactLink);

            let contactDesc = document.createElement("p");
            contactDesc.classList.add("contact-description");                
            contactDesc.innerText = contactPhoneTxt;
            contactLink.appendChild(contactDesc);     

        }
        else{

            let contactLink = document.createElement("a");
            contactLink.classList.add("contact-link");
            contactLink.href = "mailto:" + contactDescTxts[1];
            contactContent.appendChild(contactLink);

            let contactDesc = document.createElement("p");
            contactDesc.classList.add("contact-description");
            contactDesc.innerText = contactDescTxts[i];
            contactLink.appendChild(contactDesc); 
        }

    }
}

function menuContent(){
    let wrapper2 = document.querySelector(".ftr-content-wrapper-2");

    let menuHeading = document.createElement("h3");
    menuHeading.classList.add("content-heading");
    menuHeading.innerText = menuHeadingTxt;
    wrapper2.appendChild(menuHeading);

    let linkWrap = document.createElement("div");
    linkWrap.classList.add("link-wrapper");
    wrapper2.appendChild(linkWrap);

    for(let i = 1; i < 3; i++){
        let linkContainer = document.createElement("div");
        linkContainer.classList.add("link-container");
        linkContainer.id = `linkContainer${i}`;
        linkWrap.appendChild(linkContainer);
    }

    initMenu();
}

function initMenu(){
    let linkWrapper1 = document.querySelector("#linkContainer1");
    let linkWrapper2 = document.querySelector("#linkContainer2");

    for(let i = 0; i < menuTxts.length; i++){
        let menuLink = document.createElement("a");
        menuLink.classList.add("menu-link");
        menuLink.id = `menuLink${i}`;
        menuLink.innerText = menuTxts[i];
        menuLink.href = BASE + linkList[i];
        if(i < 3){
            linkWrapper1.appendChild(menuLink);            
        }
        else{
            linkWrapper2.appendChild(menuLink);       
        }
    }    
}

initFooter();
