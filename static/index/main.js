const body = document.querySelector("body");
let headerTitle = document.querySelector(".title h1");
let menuLinks = document.getElementsByClassName("menu-item");
let menuImg = document.getElementById("button-img");
let logoLink = document.querySelector(".logo-wrapper");
let title = document.querySelector(".title");
let indexContact = document.querySelector(".contact-parent");
let imgHeadingTxt = "Dažādu veidu auto remontdarbi";
let imgDescTxt = "Ierodies mūsu autoservisā un salabo savu auto!";
let applyBtnTxt = "Pieteikt pakalpojumu";
const staticFolder = "../static";
const buildingContSrc = staticFolder + "/index/resources/building.jpg";
const carImgSrc = staticFolder + "/index/resources/car.png";
let parent;
let contactCont;
let imgCont = document.querySelector(".building-container");
let mainRow;
let map;
let dayTexts = ["Pirmdiena", "Otrdiena", "Trešdiena", 
"Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"];
let hourTexts = ["8.30 – 17.30", "8.30 – 17.30", "8.30 – 17.30", 
"8.30 – 17.30", "8.30 – 17.30", "Slēgts", "Slēgts"];
let scriptLoaded = true;

function modifyHeaderContent(){
    headerTitle.remove();

    let carImg = document.createElement("img");
    carImg.classList.add("car-img");
    carImg.src = carImgSrc;
    carImg.alt = "Autoserviss";
    carImg.ondragstart = function(e){
        e.preventDefault();
    }
    title.appendChild(carImg);
}

function modifyMenu(){
    let underline = document.querySelector(".item-0 .menu-underline");
    underline.style.opacity = "1";
}

function initMainPage(){
    modifyMenu();
    bgImgContent();    
    contactContent();
    workingDays();
    initializeMap();
}

function bgImgContent(){
    imgCont.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('" + buildingContSrc + "')";    

    let imgHeading = document.createElement("h1");
    imgHeading.classList.add("img-heading");
    imgHeading.innerText = imgHeadingTxt;
    imgCont.appendChild(imgHeading);

    let imgDesc = document.createElement("h4");
    imgDesc.classList.add("img-desc");
    imgDesc.innerText = imgDescTxt;
    imgCont.appendChild(imgDesc);

    let applyBtn = document.createElement("button");
    applyBtn.classList.add("apply-btn");
    applyBtn.innerText = applyBtnTxt;
    applyBtn.onclick = function(e){
        window.location.href = BASE + BOOK_SERVICE;
    }
    imgCont.appendChild(applyBtn);
}

function contactContent(){
    let classes = ["working-time-container", "contacts-container", "address-container"];
    let headerTxts = ["Darba laiks", "Kontakti", "Atrašanās vieta"];
    let btnIds = ["timeDropdownBtn", "contactDropdownBtn", "addressDropdownBtn"];
    let attrKeys = ["data-bs-display", "data-bs-toggle", "data-bs-auto-close", "data-expanded"];
    let attrValues = ["static", "dropdown", "outside", "false"];

    for(let i = 0; i < 3; i++){
        let contactDrop = document.createElement("div");
        contactDrop.classList.add("dropdown");
        contactDrop.classList.add("col-lg-4"); 
        indexContact.appendChild(contactDrop);        

        let contactChild = document.createElement("div");
        contactChild.id = btnIds[i];
        contactChild.classList.add(classes[i]);
        contactChild.classList.add("dropdown-toggle");
        contactChild.classList.add("index-contacts");  
        for(let i = 0; i < attrKeys.length; i++){
            contactChild.setAttribute(attrKeys[i], attrValues[i]);
        }
        contactChild.addEventListener("mouseover", function(){
            let dropIco = document.querySelector(`.dropdown-ico-container > #dropdownIco${i}`);   
            dropIco.style.color = "limegreen";                      
        });         
        contactChild.addEventListener("mouseout", function(){
            let dropIco = document.querySelector(`.dropdown-ico-container > #dropdownIco${i}`);                
            dropIco.style.color = "darkgreen";  
        });
        contactChild.addEventListener("click", function(){
            let dropIco = document.querySelector(`.dropdown-ico-container > #dropdownIco${i}`);                
            if(dropIco.classList.contains("dropdown-ico-down")){     
                dropIco.classList.remove("dropdown-ico-down");
                dropIco.classList.add("dropdown-ico-up");
                return;
            }
            if(dropIco.classList.contains("dropdown-ico-up")){
                dropIco.classList.remove("dropdown-ico-up");
                dropIco.classList.add("dropdown-ico-down");
                return;
            }
        });
        contactDrop.appendChild(contactChild);

        indexContactIco(contactChild, i);

        infoContainers(contactChild);

        let header = document.createElement("h4");
        header.classList.add("contact-headers");
        header.innerText = headerTxts[i];
        contactCont.appendChild(header);

        dropdownIcon(contactChild, i);
        initDropdown(contactDrop, i);
    }

    dropdownContactWrap();
    mapDropdownWrappers();
    toggleDropdowns();
}

function indexContactIco(parent, i){
    let iconClasses = ["clock-fill", "person-circle", "geo-alt-fill"];

    let ico = document.createElement("i");
    ico.classList.add("contact-ico-before");
    ico.classList.add(`bi-${iconClasses[i]}`);
    parent.appendChild(ico);
}

function dropdownIcon(parent, i){

    let container = document.createElement("div");
    container.classList.add("dropdown-ico-container");
    parent.appendChild(container)

    let ico = document.createElement("i");
    ico.id = `dropdownIco${i}`;
    ico.classList.add("dropdown-ico");
    ico.classList.add("dropdown-ico-down");
    ico.classList.add("bi-caret-down-square-fill");
    container.appendChild(ico);
}

function infoContainers(parent){
    contactCont = document.createElement("div");
    contactCont.classList.add("title-container");
    parent.appendChild(contactCont);
}

function toggleDropdowns(){
    let allDropdowns = document.querySelectorAll(".dropdown > .info-dropdown");
    let dropdownParents = document.querySelectorAll(".contact-parent > .dropdown");
    let animTimeout;

    for(let i = 0; i < 3; i++){
        dropdownParents[i].addEventListener('shown.bs.dropdown', function () {
            allDropdowns[i].classList.toggle("hide-contact-dropdown");  
        });     

        dropdownParents[i].addEventListener('show.bs.dropdown', function () {
            clearTimeout(animTimeout);
            allDropdowns[i].style.display = "";  

            if(i === 2){
                setTimeout(function() {
                    map.invalidateSize();
                }, 600);          
            }

        });     
          
        dropdownParents[i].addEventListener('hidden.bs.dropdown', function () {
            allDropdowns[i].classList.toggle("hide-contact-dropdown");  
            animTimeout = setTimeout(() => {
                allDropdowns[i].style.display = "none";                
            }, 600);
        }); 

        dropdownParents[i].addEventListener('hide.bs.dropdown', function () {
            let dropIco = document.querySelector(`.dropdown-ico-container  > #dropdownIco${i}`);      

            if(dropIco.classList.contains("dropdown-ico-up")){
                dropIco.classList.remove("dropdown-ico-up");
                dropIco.classList.add("dropdown-ico-down");
            }
        }); 
    }

}

function initDropdown(parent, i){
    let uniqueClasses = ["time-dropdown", "contact-dropdown", "address-dropdown"];
    let btnIds = ["timeDropdownBtn", "contactDropdownBtn", "addressDropdownBtn"];

    let dropdown = document.createElement("div");
    dropdown.classList.add("hide-contact-dropdown");     
    dropdown.classList.add(uniqueClasses[i]);
    dropdown.classList.add("info-dropdown");
    dropdown.classList.add("dropdown-menu");
    dropdown.classList.add("fade");
    dropdown.style.display = "none";
    dropdown.setAttribute("aria-labelledby", btnIds[i]);
    parent.appendChild(dropdown);
}

function mapDropdownWrappers(){
    let parent = document.querySelector(".address-dropdown");

    let headerWrapper = document.createElement("div");
    headerWrapper.classList.add("map-header-wrapper");
    parent.appendChild(headerWrapper);

    let mapWrapper = document.createElement("div");
    mapWrapper.id = "map";
    parent.appendChild(mapWrapper);

    mapHeaderContent();
}

function mapHeaderContent(){
    let parent = document.querySelector(".map-header-wrapper");

    let ico = document.createElement("i");
    ico.classList.add("bi-geo-fill");
    parent.appendChild(ico);

    let title = document.createElement("h6");
    title.innerText = "Adrese:";
    parent.appendChild(title);

    let desc = document.createElement("p");
    desc.innerText = "Odzienas iela 10, Pļaviņas, LV-5120";
    parent.appendChild(desc);
}

function dropdownContactWrap(){
    let parent = document.querySelector(".contact-dropdown");
    let iconClasses = ["bi-telephone-fill", "bi-envelope-fill"];    

    for(let i = 0; i < 2; i++){
        let wrapper = document.createElement("div");
        wrapper.classList.add("contact-dropdown-wrapper");
        parent.appendChild(wrapper);

        let ico = document.createElement("i");
        ico.classList.add(iconClasses[i]);
        wrapper.appendChild(ico);        

        let cont = document.createElement("div");
        cont.classList.add("contact-dropdown-container");
        wrapper.appendChild(cont);

        dropdownContacts(cont, i);
    }

}

function dropdownContacts(container, i){
    let headerTxts = ["Tālrunis: ", "E-pasts: "];
    let phoneTxts = "+371 26 434 118";
    let emailTxt = "veriz.serviss@apollo.lv";

    let header = document.createElement("h6");
    header.innerText = headerTxts[i];
    container.appendChild(header);

    if(i === 0){
        let desc = document.createElement("p");
        desc.innerText = phoneTxts;
        container.appendChild(desc);
    }
    else{
        let desc = document.createElement("p");
        desc.innerText = emailTxt;
        container.appendChild(desc);   
    }

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
        document.querySelector(".time-dropdown")
    );
    highlightDay();    
}

function highlightDay(){
    var today = new Date().getDay();
    document.querySelector(".d"+today).classList.add("highlight");      
}

function initializeMap(){
    map = L.map("map", {
        center: [56.61975, 25.71730],
        zoom: 18,
        maxZoom: 20,
        gestureHandling: true,

    });

    let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Add marker

    let marker = L.marker([56.61975, 25.71730]);
    marker.addTo(map);


}

initMainPage();