const body = document.querySelector("body");

let serviceTexts = ["Bremžu šļauciņas maiņa", "Bremžu tīrīšana, profilakse", "Bremžu trubiņu maiņa", "Datordiagnostika", "Degvielas filtra maiņa", 
"Degvielas sistēmas remonts", "Dzinēja maiņa", "Dzinēja mazgāšana", "Dzinēja remonts", "Elektroinstalācijas darbi", "Elektroinstalācijas remonts", 
"Eļļas maiņa aizmugures tiltā", "Eļļas maiņa ātrumkārbā", "Eļļas maiņa priekšas tiltā", "Eļļas papildināšana", "Eļļas un eļļas filtra maiņa", 
"Gaisa filtra maiņa", "Gaismu pārbaude, regulēšana", "Gultņa maiņa", "Ģenerātora maiņa", "Ģenerātora remonts", "Kardāna demontāža - montāža", 
"Kardāna remonts", "Klusinātāja (izpūtēja) maiņa", "Klusinātāja (izpūtēja) remonts", "Klusinātāja (izpūtēja) skalošana", "Klusinātāja aizsarga nostiprināšana", 
"Kondicioniera apkope", "Kondicioniera uzpilde", "Kreisās atsperlāgas maiņa", "Kvēlsveču maiņa", "Kvēlsveču pārbaude", "Ķīļsiksnas maiņa", "Ķīmiskā tīrīšana", 
"Lampiņas maiņa", "Lodbalstu maiņa", "Logu apskalotāja remonts", "Logu mehānisma remonts", "Logu slotiņu maiņa", "Luktura maiņa", "Lukturu regulēšana", 
"Metināšanas darbi", "Motora mazgāšana", "Paklāju tīrīšana", "Pievadsiksnu maiņa", "Priekšas kreisā gultņa maiņa", "Pusass putekļu gumijas maiņa", 
"Pusass šarnīra maiņa", "Pusass žņauga nostiprināšana", "Riepas balansēšana", "Riepas montāža un balansēšana", "Riepas remonts", "Riepu disku mazgāšana", 
"Riepu kompleksa mazgāšana", "Riepu maiņa", "Riepu mazgāšana", "Rievsiksnas maiņa", "Riteņu gultņu maiņa", "Rokas bremzes troses maiņa", "Sajūga maiņa", 
"Salona filtra maiņa", "Salona tīrīšana", "Savērsuma regulēšana", "Sprauslu maiņa", "Sprauslu pārbaude, remonts", "Stabilizatora atsaišu maiņa", 
"Stabilizatora bukšu maiņa", "Startera maiņa", "Startera remonts", "Stūres pirksta maiņa", "Stūres sistēmas remonts", "Stūres stieņa maiņa", "Sviru bukšu maiņa", 
"Sviru maiņa", "Tilta bukšu maiņa", "Transmisijas eļļas maiņa", "Ūdenssūkņa maiņa", "Vējstikla maiņa", "Virsbūves maiņa", "Virsbūves mazgāšana", 
"Virsbūves remonts", "Vizuālā diagnostika", "Zobsiksnas maiņa"
];

let servicePrices = ["10.00", "20.00", "20.00", "10.00", "15.00", "0.01", "50.00", "0.01", "40.00", "0.01", "350.00", "0.01", "0.01", "0.01", "0.01", "15.00", 
"15.00", "15.00", "3.00", "15.00", "10.00", "5.00", "25.00", "30.00", "0.01", "50.00", "0.01", "0.01", "0.01", "0.01", "0.01", "30.00", "0.01", "50.00", "15.00", 
"5.00", "0.01", "0.01", "3.00", "15.00", "0.01", "20.00", "2.00", "20.00", "5.00", "0.01", "15.00", "30.00", "30.00", "5.00", "1.15", "4.50", "5.00", "0.70", 
"10.00", "0.01", "0.70", "15.00", "30.00", "15.00", "150.00", "10.00", "0.01", "22.00", "0.01", "0.01", "8.00", "10.00", "30.00", "0.01", "12.00", "0.01", "16.00", 
"20.00", "25.00", "25.00", "10.00", "50.00", "60.00", "0.01", "0.01", "10.00", "120.00"];

let disclaimerTxts = ["Par citiem autoservisa pakalpojumiem zvaniet ", "* - Norādītās cenas ir aptuvenas un atkarīgas no pakalpojumu sarežģītības pakāpes."];
let disclaimerLinkPhone = "+371 26 434 118";
let headerTitleTxt = "Pakalpojumi";
let applyBtnTxt = "Pierakstīties uz servisu";
let serviceTitleTxt = "Piedāvājam šādus pakalpojumus:";
let searchPlacehTxt = "Meklēt pakalpojumu...";    
let headerTxt = ["Pakalpojums", "Cena"]; 
let notFoundTxt = "Nekas netika atrasts!";
let headerTitle = document.querySelector(".title h1");
let applyWrapper = document.querySelector(".apply-wrapper");
let parent = document.querySelector(".parent");
let scrollTopBtn;
let tableWrap;
let touchMoved;
let scriptLoaded = true;

function initializeHeaderTitle(){
    headerTitle.innerText = headerTitleTxt;
}

function modifyMenu(){
    let underline = document.querySelector(".item-2 .menu-underline");
    underline.style.opacity = "1";
}

function initHeading(){
    let headingColClasses = ["heading-wrapper", "search-wrapper"];

    initBookServiceBtn();

    let headingRow = document.querySelector(".heading-parent");


    let headingCol = document.createElement("div");
    headingCol.classList.add("search-wrapper");
    headingCol.classList.add("col");      
    headingRow.appendChild(headingCol);            

    initSearchBox();
}

function initBookServiceBtn(){

    let applyBtn = document.createElement("button");
    applyBtn.classList.add("apply-btn");
    applyBtn.onclick = function(e){
        window.location.href = BASE + BOOK_SERVICE;
    }
    applyBtn.innerText = applyBtnTxt;
    applyWrapper.appendChild(applyBtn);
}

function initHeadingTitle(){
    let headingParent = document.querySelector(".heading-wrapper");

    let h1 = document.createElement("h1");
    h1.classList.add("heading-title");
    h1.innerText = serviceTitleTxt;
    headingParent.appendChild(h1);    
}

function initSearchBox(){
    let searchParent = document.querySelector(".search-wrapper");

    let input = document.createElement("input");
    input.id = "searchBox";
    input.onkeyup = function(){
        initSearch();
        checkSearchResult();
    }
    input.placeholder = searchPlacehTxt;
    searchParent.appendChild(input);

}

function initSearch(){
    let searchBox = document.querySelector("#searchBox");    
    let cellTxt;
    let serviceRow = document.getElementsByClassName("service-row");
    let searchInput = searchBox.value.toUpperCase();

    for(let i = 0; i < serviceRow.length; i++){
        let serviceCol = serviceRow[i].getElementsByClassName("service-cell")[0];
        if(serviceCol !== null){            
            cellTxt = serviceCol.innerText;
            if(cellTxt.toUpperCase().indexOf(searchInput) > -1){
                serviceRow[i].classList.remove("hide-row");
            }
            else{
                serviceRow[i].classList.add("hide-row");
            }
        }
    }
}

function checkSearchResult(){
    let disclaimerWrapper = document.querySelector(".disclaimer-wrapper");
    let notFoundTxt = document.querySelector(".not-found");
    let tableBody = document.querySelector(".table-body");

    if(tableBody.children.length === tableBody.querySelectorAll(".hide-row").length){
        notFoundTxt.style.visibility = "visible";
        notFoundTxt.style.margin = "20px 0 20px 0";   
        notFoundTxt.style.height = "auto"; 
        
        disclaimerWrapper.style.height = "0";
        disclaimerWrapper.style.visibility = "hidden";
    }
    else{
        notFoundTxt.style.visibility = "hidden";
        notFoundTxt.style.margin = "0";
        notFoundTxt.style.height = "0";    

        disclaimerWrapper.style.height = "auto";
        disclaimerWrapper.style.visibility = "visible";
    }

}

function initParentContent(){

    modifyMenu();
    initHeading();
    coreTable();
    initNotFoundMsg();
    priceNote();
    initScrollBtn();
}

function coreTable(){
    tableWrap = document.querySelector(".table-wrapper");
    let table = document.querySelector(".service-table");
    let tr = document.querySelector(".table-header");

    for(let i = 0; i < headerTxt.length; i++){
        let th = document.createElement("th");
        th.innerText = headerTxt[i];
        if(i === 0){
            th.setAttribute("data-sorted-direction", "descending");   
            th.setAttribute("data-sorted", "true"); 
        }
        if(i === 1){
            th.setAttribute("data-sortable-type", "numeric")
        }
        tr.appendChild(th);
    }

    tableContent();   
    Sortable.initTable(table);    
}

function tableContentList(){
    const elements = [];

    for(let i = 0; i < 83; i++){
        elements.push({cellTxt: serviceTexts[i], cellTxt2: `*no ${servicePrices[i]} \u20ac`});
    }

    return(
        elements.map((elem) => (
            ele(TableContent, elem)
        ))
    );
}

function tableContent(){
    ReactDOM.render(
        [
            tableContentList()
        ],
        document.querySelector(".table-body")
    );  
}

function initScrollBtn(){
    scrollTopBtn = document.createElement("button");
    scrollTopBtn.classList.add("scroll-btn");
    scrollTopBtn.innerText = "▲";
    scrollTopBtn.onclick = function(){ scrollToTop();}
    body.appendChild(scrollTopBtn);
}

function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function onPageScroll(){
    let scrollBtn = document.querySelector(".scroll-btn");

    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}

function initNotFoundMsg(){
    let tableWrapper = document.querySelector(".table-wrapper");

    let notFound = document.createElement("h2");
    notFound.classList.add("not-found");
    notFound.innerText = notFoundTxt;
    tableWrapper.appendChild(notFound);
}

function priceNote(){
    let discWrapper = document.createElement("div");
    discWrapper.classList.add("disclaimer-wrapper");
    tableWrap.appendChild(discWrapper);

    for(let i = 0; i < 2; i++){
        let p = document.createElement("p");
        p.classList.add("disclaimer");   
        p.innerText = disclaimerTxts[i];
        discWrapper.appendChild(p);

        if(i === 0){
            let disclaimerLink = document.createElement("a");
            disclaimerLink.classList.add("disclaimer-link");
            disclaimerLink.href = `tel:${disclaimerLinkPhone}`;
            disclaimerLink.innerText = disclaimerLinkPhone;
            p.appendChild(disclaimerLink);            
        }
    }
}

initParentContent();
window.onscroll = function() {onPageScroll()};
