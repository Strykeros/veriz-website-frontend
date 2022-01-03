/*
* Map API by:
* https://leafletjs.com/,
* https://www.openstreetmap.org/.
*
* Leaflet-gesture-handling.js by:
* Elmarquis (https://github.com/elmarquis/Leaflet.GestureHandling),
* Raruto (https://github.com/Raruto/leaflet-gesture-handling).
*/
const body = document.querySelector("body");
const html = document.querySelector("html");
let main;
let infoParent;
let infoWrapper;
let headerTitleTxt = "Kontakti";
let email = "mailto:veriz.serviss@apollo.lv";
let phoneNoLink = "tel:+371 26 434 118";
let classes = ["phone", "email", "address"];
let imgSrc = ["../static/resources/phone_icon.png", "../static/resources/email_icon.png", "../static/resources/location_icon.png"];
let hoverSrc = ["../static/resources/phone_light_icon.png", "../static/resources/email_light_icon.png", "../static/resources/location_light_icon.png"]
let contactHeadingTxts = ["Tālrunis", "E-pasts", "Atrašanās vieta"];
let paragraphTxt = ["", "veriz.serviss@apollo.lv", "Odzienas iela 10, Pļaviņas, LV-5120"];
let phoneTxt = "+371 26 434 118";
let propHeadingTexts = ["Juridiskā adrese:", "PVN reģistrācijas numurs:", "A/S Swedbank, kods:", "Konta Nr.:"];
let descTexts = ["Jaunā iela 22-39, Jēkabpils, LV-5201", "LV45401016423", "HABALV22", "LV37HABA 0001 40C0 5415 3"];
let dayTexts = ["Pirmdiena", "Otrdiena", "Trešdiena", 
"Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"];
let hourTexts = ["8.30 – 17.30", "8.30 – 17.30", "8.30 – 17.30", 
"8.30 – 17.30", "8.30 – 17.30", "Slēgts", "Slēgts"];
let compNameTxt = "SIA Vēri Z";
let propHeadingTxt = "Rekvizīti";
let workingTimeHeadingTxt = "Darba laiks";
let modalTitleTxt = "Atrašanās vieta";
let popoverTxt = "Spiediet uz piespraudes ikonas lai apskatītu karti.";
let modalContent;
let modalHeader;
let modalBody;
let modalFooter;
let addressPopover;
let headerTitle = document.querySelector(".title h1");
let scriptLoaded = true;

function initializeHeaderTitle(){
    headerTitle.innerText = headerTitleTxt;
}

function modifyMenu(){
    let underline = document.querySelector(".item-3 .menu-underline");
    underline.style.opacity = "1";
}

function initializeMainBody(){

    modifyMenu();
    parent = document.createElement("div");
    parent.classList.add("parent");
    parent.classList.add("container");    
    body.appendChild(parent);

    initInfoParent();

}

function infoParentList(){
    let classes = ["contacts", "working-time"];
    let wrapperClasses = ["info-wrapper col-sm-12 col-md-12", "info-wrapper col-sm-12 col-md-6"];
    const elements = [];

    for(let i = 0; i < 2; i++){
        elements.push({className: classes[i], wrapClass: wrapperClasses[i]});
    }

    return(
        elements.map((elem) => (
            ele(InfoParent, elem)
        ))
    );
}

function initInfoParent(){
    ReactDOM.render(
        [
            infoParentList()
        ],
        document.querySelector(".parent")
    );
    ContactChilds();
    propertiesParent();
    propertiesWrapper();
    initWorkingTimeWrapper();    
}

function propertiesParent(){
    let classes = ["info-wrapper", "col-sm-12", "col-md-6", "ps-md-3"];
    let infParent = document.getElementsByClassName("info-parent")[1];

    let infWrapper = document.getElementsByClassName("info-wrapper")[1];
    infWrapper.classList.add("pe-md-3");

    let taxWrapper = document.createElement("div");
    for(let i = 0; i < classes.length; i++){
        taxWrapper.classList.add(classes[i]);        
    }
    infParent.appendChild(taxWrapper);
}

function propertiesWrapper(){
    let infParent = document.getElementsByClassName("info-wrapper")[2];

    let wrapper = document.createElement("div");
    wrapper.classList.add("properties");
    infParent.appendChild(wrapper);

    propertiesChilds();

}

function propertiesChilds(){
    let parent = document.querySelector(".properties");

    let h3 = document.createElement("h3");
    h3.innerText = propHeadingTxt;
    h3.style.textAlign = "center";
    h3.style.width = "100%";
    parent.appendChild(h3);

    let compName = document.createElement("h5");
    compName.classList.add("company-name");
    compName.innerText = compNameTxt;
    compName.style.textAlign = "center";
    compName.style.width = "100%";
    parent.appendChild(compName);

    let div = document.createElement("div");
    div.classList.add("properties-wrapper");
    parent.appendChild(div);

    propWrapperChilds();
}

function propWrapperChildsList(){

    const elements = [];

    for(let i = 0; i < 4; i++){
        elements.push({headingText: propHeadingTexts[i], descText: descTexts[i]});
    }

    return(
        elements.map((elem) => (
            ele(Properties, elem)
        ))
    );
}

function propWrapperChilds(){
    ReactDOM.render(
        [
            propWrapperChildsList()
        ],
        document.querySelector(".properties-wrapper")
    );
}

function ContactChilds(){
    let contactParent = document.querySelector(".contacts");
    let iconTxts = ["bi-telephone-fill", "bi-envelope-fill", "bi-geo-alt-fill"]

    for(let i = 0; i < 3; i++){
        
        let div = document.createElement("div");

        if(i === 0){
            let phoneLink = document.createElement("a");
            phoneLink.classList.add(classes[i]);
            phoneLink.classList.add("phone-link");
            phoneLink.href = phoneNoLink;
            contactParent.appendChild(phoneLink);

            div.classList.add("phone-content");        
            phoneLink.appendChild(div);    
        }
        else{
            div.classList.add(classes[i]); 
            contactParent.appendChild(div);                       
        }


        if(i === 2){
            div.setAttribute("data-bs-toggle", "modal");
            div.setAttribute("data-bs-target", "#mapModal");
            div.setAttribute("data-bs-placement", "right");
            div.setAttribute("data-bs-content", popoverTxt);
            div.addEventListener("click", function(){
                body.style.padding = "0";
                if(addressPopover._element !== null){
                    addressPopover.dispose();  
                    let infoWrapper = document.querySelectorAll(".info-parent > .info-wrapper");
                    for(let i = 0; i < infoWrapper.length; i++){
                        infoWrapper[i].style.marginBottom = "30px";                            
                    }
              
                }
            });  
        }
  
        if(i === 1){
            div.addEventListener("click", function(){
                mailTo();
            });  
        }

        if(i < 2){

            let vr = document.createElement("div");
            vr.classList.add("ver-line");
            contactParent.appendChild(vr);   
        }

        let ico = document.createElement("i");
        ico.classList.add("icon");
        ico.classList.add(iconTxts[i]);
        div.appendChild(ico);

        div.addEventListener("mouseover", function(){
            ico.style.color = "limegreen";   
        });         
        div.addEventListener("mouseout", function(){
            ico.style.color = "darkgreen";  
        });

        let h2 = document.createElement("h3"); 
        h2.innerText = contactHeadingTxts[i];
        h2.style.fontWeight = "bold";
        h2.style.textAlign = "center";
        div.appendChild(h2);

        if(i === 0){

            let h3 = document.createElement("h4"); 
            h3.innerText = phoneTxt;
            h3.style.textAlign = "center";
            h3.style.width = "100%";
            div.appendChild(h3);

            continue;
        }
        else{
            let h3 = document.createElement("h4"); 
            h3.innerText = paragraphTxt[i];
            h3.style.textAlign = "center";
            h3.style.width = "100%";
            div.appendChild(h3);            
        }

    }

    initPopover();
}

function initPopover(){
    let popoverParent = document.querySelector('.address');
    addressPopover = new bootstrap.Popover(popoverParent, {
        popperConfig: function(defaultBsPopperConfig){
            let newPopperConfig = {
                placement: "top"
            }
            return newPopperConfig;
        }
    });
    addressPopover.show();

    popoverIco();
}

function popoverIco(){
    let popoverBody = document.querySelector(".popover-body");

    let popoverIco = document.createElement("i");
    popoverIco.classList.add("popover-ico");
    popoverIco.classList.add("bi");
    popoverIco.classList.add("bi-info-circle-fill");
    popoverBody.appendChild(popoverIco);
}

function mailTo(){
    window.location.href = email;
}

function initWorkingTimeWrapper(){

    let parent = document.querySelector(".working-time");

    let h3 = document.createElement("h3");
    h3.innerText = workingTimeHeadingTxt;
    h3.style.width = "100%";
    parent.appendChild(h3);

    let wrapper = document.createElement("div");
    wrapper.classList.add("working-time-wrapper");
    parent.appendChild(wrapper);

    workingDays();
}

function workingDayList(){
    const elements = [];


    let wrapperClasses = ["day-wrapper d1", "day-wrapper d2", "day-wrapper d3", "day-wrapper d4", 
    "day-wrapper d5", "day-wrapper d6", "day-wrapper d0"];

    for(let i = 0; i < 7; i++){
        elements.push({dayText: dayTexts[i], hourText: hourTexts[i], wrapperClass: wrapperClasses[i]});
    }

    return(
        elements.map((elem) => (
            ele(WorkingTime, elem)
        ))
    );
}

function workingDays(){
    ReactDOM.render(
        [
            workingDayList()
        ],
        document.querySelector(".working-time-wrapper")
    );
    highlightDay();    
}

function highlightDay(){
    var today = new Date().getDay();
    document.querySelector(".d"+today).classList.add("highlight");      
}

function initMapModal(){
    let modalParent = document.createElement("div");
    modalParent.classList.add("modal");
    modalParent.classList.add("fade");
    modalParent.id = "mapModal";
    modalParent.setAttribute("aria-labelledby", "mapModalLbl");
    modalParent.setAttribute("aria-hidden", "true");
    modalParent.addEventListener('hidden.bs.modal', function () {
        html.classList.remove('no-scroll');
    });
    body.appendChild(modalParent);

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.classList.add("modal-dialog-centered");
    modalDialog.classList.add("modal-xl");
    modalParent.appendChild(modalDialog);
    
    modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.appendChild(modalContent);

    initModalHeader();
    initModalBody();
    initModalFooter();
}

function initModalHeader(){
    modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.id = "mapModalLbl";
    modalTitle.innerText = modalTitleTxt;
    modalHeader.appendChild(modalTitle);

    let modalClose = document.createElement("button");
    modalClose.type = "button";
    modalClose.classList.add("btn-close");
    modalClose.setAttribute("data-bs-dismiss", "modal");
    modalClose.setAttribute("aria-label", "close");
    modalHeader.appendChild(modalClose);
}

function initModalBody(){
    modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.appendChild(modalBody);

    initializeMapContainer();
}

function initModalFooter(){
    modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    modalContent.appendChild(modalFooter);

    let wazeLink = document.createElement("a");
    wazeLink.classList.add("waze-link");
    wazeLink.href = "https://ul.waze.com/ul?ll=56.61976993%2C25.71736336&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";
    wazeLink.target = "_blank";
    modalFooter.appendChild(wazeLink);

    let linkTxt = document.createElement("h4");
    linkTxt.innerText = "Braukt ar Waze:";
    wazeLink.appendChild(linkTxt);

    let imgWrapper = document.createElement("div");
    imgWrapper.classList.add("waze-logo-wrapper");
    wazeLink.appendChild(imgWrapper);

    let wazeImg = document.createElement("img");
    wazeImg.classList.add("waze-logo");
    wazeImg.alt = "waze logo";
    wazeImg.src = "../static/resources/waze_logo.png";
    imgWrapper.appendChild(wazeImg);

    let wazeImgHover = document.createElement("img");
    wazeImgHover.classList.add("waze-logo-hover");
    wazeImgHover.alt = "waze logo";
    wazeImgHover.src = "../static/resources/waze_logo_hover.png";
    wazeImgHover.style.opacity = "0";
    imgWrapper.appendChild(wazeImgHover);

    wazeLink.addEventListener("mouseover", function(){
        wazeImg.style.opacity = "0";  
        wazeImgHover.style.opacity = "1";  
    });         
    wazeLink.addEventListener("mouseout", function(){
        wazeImg.style.opacity = "1";  
        wazeImgHover.style.opacity = "0";  
    });
}

function initializeMapContainer(){

    let mapWrapper = document.createElement("div");
    mapWrapper.classList.add("map-wrapper");
    modalBody.appendChild(mapWrapper);

    let map = document.createElement("div");
    map.id = "map";
    mapWrapper.appendChild(map);

    initializeMap();
}
  
function initializeMap(){
    let map = L.map("map", {
        center: [56.61975, 25.71730],
        zoom: 18,
        gestureHandling: true,
    });

    let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Add marker

    let marker = L.marker([56.61975, 25.71730]);
    marker.addTo(map);

    let modal = document.querySelector("#mapModal");

    modal.addEventListener('shown.bs.modal', function () {
        map.invalidateSize();
        html.classList.add('no-scroll');
    })
}

initializeMainBody();
initMapModal();
