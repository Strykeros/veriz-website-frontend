const body = document.querySelector("body");
let headerTitle = document.querySelector(".title h1");
let menuLinks = document.getElementsByClassName("menu-item");
let menuImg = document.getElementById("button-img");
let logoLink = document.querySelector(".logo-wrapper");
let title = document.querySelector(".title");
let privacyWrap;
let privacyContainer;
let propertiesWrapper;
let privHeaderTxt = "Privātuma politika";
let headingTexts = ["Juridiskā adrese:", "PVN reģistrācijas numurs:"];
let descTexts = ["Jaunā iela 22-39, Jēkabpils, LV-5201, Latvija", "LV 45401016423"];
let propHeadingTxt = "SIA Vēri Z";
let headerTitleTxt = "Privātuma politika";
let scriptLoaded = true;

function modifyHeaderContent(){
    headerTitle.innerText = headerTitleTxt;
}

function initMainBody(){
    parent = document.createElement("div");
    parent.classList.add("parent");
    parent.classList.add("container");    
    body.appendChild(parent);
    
    initPrivacyWrapper();
}

function initPrivacyWrapper(){
    let privacyParent = document.createElement("div");
    privacyParent.classList.add("privacy-parent");
    privacyParent.classList.add("row");
    parent.appendChild(privacyParent);

    privacyWrap = document.createElement("div");
    privacyWrap.classList.add("privacy-wrapper");
    privacyWrap.classList.add("col");
    privacyParent.appendChild(privacyWrap); 

    initPrivacy();
}

function initPrivacy(){
    privacyContainer = document.createElement("div");
    privacyContainer.classList.add("privacy");
    privacyWrap.appendChild(privacyContainer);

    initPrivacyContent();
}

function initPrivacyContent(){
    initPrivacySections();

    propertiesWrapper = document.createElement("div");
    propertiesWrapper.classList.add("properties-wrapper");
    privacyContainer.appendChild(propertiesWrapper);

    initProperties();

    let privHeader = document.createElement("h2");
    privHeader.classList.add("privacy-title");
    privHeader.innerText = privHeaderTxt;
    privacyContainer.appendChild(privHeader);


}

function initProperties(){
    let compName = document.createElement("h5");
    compName.classList.add("properties-heading");
    compName.innerText = propHeadingTxt;
    propertiesWrapper.appendChild(compName);

    for(let i = 0; i < 2; i++){
        let property = document.createElement("div");
        property.classList.add("property");
        propertiesWrapper.appendChild(property);

        let propertyHeading = document.createElement("p");
        propertyHeading.classList.add("property-heading");
        propertyHeading.innerText = headingTexts[i];
        property.appendChild(propertyHeading);

        let propertyDesc = document.createElement("p");
        propertyDesc.innerText = descTexts[i];
        property.appendChild(propertyDesc);
    }

}

function privacyList(){
    const elements = [];

    for(let i = 0; i < policyHeaders.length; i++){
        elements.push({headingText: policyHeaders[i], pText: policyTxts[i]});
    }

    return(
        elements.map((elem) => (
            ele(PolicyParagraph, elem)
        ))
    );
}

function initPrivacySections(){
    ReactDOM.render(
        [
            privacyList()
        ],
        document.querySelector(".privacy")
    );
}

initMainBody();