let headerTitle = document.querySelector(".title h1");
let bookingForm = document.querySelector(".booking");
let loadingWrapper;
let buttonWrapper;
let successMsg;
let errorMsg;
let infoMsg;
let countDownMsg;
let submitBtn;
let ticks = 0;
let animTimer;
let calendar;
let disclaimer;
let checkBoxTxt = "Es piekrītu ";
let privacyLinkTxt = "privātuma politikai";
let privacyCheckState = false;
let serviceSelect;
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const POST_LINK = BASE + VALIDATE_BOOKING;
let scriptLoaded = true;

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken': csrfToken
};

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
"Virsbūves remonts", "Vizuālā diagnostika", "Zobsiksnas maiņa"];

let msgErrors = ["Lūdzu norādiet vārdu!", "Lūdzu norādiet uzvārdu!", "Lūdzu norādiet pareizu e-pastu!",
"Lūdzu norādiet telefona numuru!", "Lūdzu norādiet automašīnas modeli!", "Lūdzu norādiet automašīnas izlaiduma gadu!",
"Lūdzu norādiet pakalpojumu!", "Lūdzu norādiet datumu un laiku!", "Jūsu sesija ir beigusies! Lūdzu pārlādējiet lapu!", 
"Lūdzu piekrītiet privātuma politikai!"];

let csrfErrorMsgs = ["Jūsu sesija ir beigusies! Lūdzu pārlādējiet lapu un mēģiniet vēlreiz!", "Jūsu sesijas atslēga ir nepareiza! Lūdzu pārlādējiet lapu un mēģiniet vēlreiz!", 
"Jūsu sesijas atslēga neeksistē! Lūdzu pārlādējiet lapu un mēģiniet vēlreiz!"];

let csrfErrors = ["The CSRF token has expired", "The CSRF token is invalid", "The CSRF session token is missing"];

function initializeHeaderTitle(){
    headerTitle.innerText = "Pieteikt pakalpojumu";
}

initBookingContent();
let field = document.querySelector('#carYear');

window.addEventListener('DOMContentLoaded', (event) => {
    animTimer = setInterval(function(){
        ticks++;
        if(ticks === 100){
            ticks = 20;
        }
    }, 700);
});

window.onpageshow = function(){

    let savedName = sessionStorage.getItem('name');
    let savedSurname = sessionStorage.getItem('surname');
    let savedEmail = sessionStorage.getItem('email');
    let savedPhone = sessionStorage.getItem('phone');
    let savedCarModel = sessionStorage.getItem('carModel');
    let savedCarYear = sessionStorage.getItem('carYear');
    let savedService = sessionStorage.getItem('service');
    let savedDate = sessionStorage.getItem('date');
    let savedMsg = sessionStorage.getItem('message');
    let selectedServices = JSON.parse(sessionStorage.getItem("selServices"));
    let savedPrivacyCheck = sessionStorage.getItem('privacyAgreed');

    let formName = document.querySelector('#name');
    let formSurname = document.querySelector('#surname');
    let formEmail = document.querySelector('#email');
    let formPhone = document.querySelector('#phone');
    let formCarModel = document.querySelector('#carModel');
    let formCarYear = document.querySelector('#carYear');
    let formService = document.querySelector('#service');
    let serviceList = document.querySelectorAll("#select-service > option");     
    let privacyCheck = document.querySelector("#privacyCheck");
    let formDate = document.querySelector('#date');
    let formMsg = document.querySelector('#message');

    let savedFormValues = [savedName, savedSurname, savedEmail, savedPhone, savedCarModel, savedCarYear, savedService, savedDate, savedMsg];     
    let formValues = [formName, formSurname, formEmail, formPhone, formCarModel, formCarYear, formService, formDate, formMsg];

    if(selectedServices !== null){
        serviceList.forEach(option => {
            if(selectedServices.indexOf(option.textContent) !== -1) {
                option.selected = true;             
            }
        })        
    }

    const resyncSelect = new Event('lc-select-refresh');
    serviceSelect.dispatchEvent(resyncSelect);


    if(savedPrivacyCheck === "true"){
        privacyCheck.checked = true;          
    }    

    if(savedFormValues.every(element => element === "")){
        return;
    }   

    for(let i = 0; i < savedFormValues.length; i++){
        if(savedFormValues[i] !== null){
            formValues[i].value = savedFormValues[i];
        }
    }
}

function initBookingContent(){
    let inputIds = ["name", "surname", "email", "phone", "carModel", "carYear", "service", "date"];
    let inputNames = ["name", "surname", "email", "phone","carModel", "carYear", "service", "date"];
    let inputClasses = ["input-name", "input-surname", "input-email", "input-phone", "input-car-model", "input-car-year", "input-service",  "input-date"];
    let inputPlaceholders = ["Vārds*", "Uzvārds*", "E-pasts*", "Tālrunis*", "Auto marka, modelis*", "Izvēlēties izlaiduma gadu*", "Pakalpojums*", "Vēlamais datums, laiks*"];
    let inputTypes = ["text", "text", "email", "tel", "text", "", "text", "text"]

    initFormHead();

    let detailsWrapper = document.querySelector(".details-wrapper-1");
    let detailsWrapper2 = document.querySelector(".details-wrapper-2");
    let detailsWrapper3 = document.querySelector(".details-wrapper-3");    
    let detailsWrapper4 = document.querySelector(".details-wrapper-4");   

    for(let i = 0; i < inputNames.length; i++){

        let col = document.createElement("div");
        col.classList.add("col-md-6");
        if(i === 0 || i === 2 || i === 4 || i == 6){
            col.classList.add("details-container");        
            col.classList.add("form-floating");      
        }
        else if(i === 1 || i === 3 || i === 5 || i === 7){
            col.classList.add("details-container-2");   
            col.classList.add("form-floating");    
        }
        else{
            col.classList.add("details-container-2");  
            col.classList.add("form-floating");    
        }

        if (i === 5){
            let dropdown = document.createElement("select");
            dropdown.classList.add("form-select");
            dropdown.classList.add("form-select-md");
            dropdown.classList.add(inputClasses[i]);
            dropdown.id = inputIds[i];
            dropdown.name = inputNames[i];
            col.appendChild(dropdown);
        }   
        else{
            let input = document.createElement("input");
            input.id = inputIds[i];
            input.name = inputNames[i];
            input.classList.add(inputClasses[i]);
            input.classList.add("form-control");
            input.type = inputTypes[i];
            input.placeholder = inputPlaceholders[i];
            if(i === 7){
                initCalendar(input);
            }
            if(i !== 7){
                input.addEventListener("input", valueOnChange.bind(null, null), false);                 
            }
            col.appendChild(input) 
        }     

        let floatingLbl = document.createElement("label");
        floatingLbl.setAttribute("for", inputIds[i]);
        if(i === 5){
            floatingLbl.innerText = "Auto izlaiduma gads*";
        }
        else{
            floatingLbl.innerText = inputPlaceholders[i];            
        }

        col.appendChild(floatingLbl);

        if(i < 2){
            detailsWrapper.appendChild(col);              
        }
        else if(i < 4){
            detailsWrapper2.appendChild(col);  
        }
        else if(i < 6){
            detailsWrapper3.appendChild(col);  
        }
        else{
            detailsWrapper4.appendChild(col);
        }
    }

    initFormTxtArea();
    initFormFooter();
    initLocField();

}

function initCalendar(element){
    let savedDate = sessionStorage.getItem('date');
    element.setAttribute("readonly", "");
    flatpickr.localize(flatpickr.l10ns.lv);
    calendar = flatpickr(element, {
        enableTime: true,
        time_24hr: true,
        minTime: "08:30",
        maxTime: "17:30",
        minDate: "today",
        dateFormat: "d.m.Y. H:i",
        disableMobile: "true",      
        minuteIncrement: 1,    
        locale: {
            firstDayOfWeek: 1
        },
        
        disable:[
            function(date){
                return (date.getDay() === 6)
            },

            function(date){
                return (date.getDay() === 0)
            }
        ]
    });

    if(savedDate !== ""){
        calendar.setDate(savedDate, true, "d.m.Y. H:i");        
    }

}

function bindChangeValue(){
    calendar.config.onValueUpdate.push(function() {
        valueOnChange();
    });    
}

function valueOnChange(){

    let successMsg = document.querySelector(".alert-success");
    let errorMsg = document.querySelector(".alert-danger");

    if(successMsg.classList.contains("show") || errorMsg.classList.contains("show")){
        let addClasses = ["hide", "hide-form-msg"];   

        successMsg.classList.remove("show");
        errorMsg.classList.remove("show");    

        for(let i = 0; i < addClasses.length; i++){
            successMsg.classList.add(addClasses[i]);
            errorMsg.classList.add(addClasses[i]);        
        }         
    } 
}

function initLocField(){
    let wrapper = document.querySelector(".details-wrapper-4 .details-container-2");

    let locField = document.createElement("input");
    locField.type = "text";
    locField.name = "loc";
    locField.id = "location";
    locField.autocomplete = "none";
    wrapper.appendChild(locField);
}

function initFormHead(){
    let bookingHeading = document.createElement("h2");
    bookingHeading.classList.add("booking-heading");
    bookingHeading.innerText = "Pieteikt pakalpojumu";
    bookingForm.appendChild(bookingHeading);

    for(let i = 1; i < 5; i++){
        let detailsWrapper = document.createElement("div");
        detailsWrapper.classList.add(`details-wrapper-${i}`);
        detailsWrapper.classList.add("row");
        bookingForm.appendChild(detailsWrapper);        
    }

}

function initFormTxtArea(){
    let messageWrapper = document.createElement("div")
    messageWrapper.classList.add("message-wrapper");
    messageWrapper.classList.add("row");
    bookingForm.appendChild(messageWrapper);

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");
    messageContainer.classList.add("col");
    messageContainer.classList.add("form-floating");
    messageWrapper.appendChild(messageContainer);

    let messageInput = document.createElement("textarea");
    messageInput.classList.add("input-message");
    messageInput.classList.add("form-control");
    messageInput.name = "message";
    messageInput.id = "message";
    messageInput.placeholder = "Piezīmes";
    messageInput.addEventListener("input", valueOnChange.bind(null, null), false);
    messageContainer.appendChild(messageInput);

    let messageLbl = document.createElement("label");
    messageLbl.setAttribute("for", "message");
    messageLbl.innerText = "Piezīmes";
    messageContainer.appendChild(messageLbl);
}

function initFormFooter(){
    initPrivacyCheck();

    disclaimer = document.createElement("p");
    disclaimer.classList.add("disclaimer-msg");
    disclaimer.innerText = "* - Obligātie lauki. \r\n \r\nJa izvēlētais datums vai laiks nebūs pieejams, ar Jums sazināsies mūsu menedžeris.";
    bookingForm.appendChild(disclaimer);

    buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    bookingForm.appendChild(buttonWrapper);

    initInfoMsg();
    initSubmitBtn();

    loadingWrapper = document.createElement("div");
    loadingWrapper.classList.add("loading-wrapper");
    loadingWrapper.style.display = "none";
    buttonWrapper.appendChild(loadingWrapper);

    let loadingIco = document.createElement("i");
    loadingIco.classList.add("loading-ico");
    loadingIco.classList.add("bi-gear-fill");
    loadingWrapper.appendChild(loadingIco);

    initFormMessages();
}

function initPrivacyCheck(){
    let checkBoxWrap = document.createElement("div");
    checkBoxWrap.classList.add("form-check");
    checkBoxWrap.classList.add("checkbox-wrapper");
    bookingForm.appendChild(checkBoxWrap);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "privacyCheck";
    checkbox.classList.add("privacy-check");
    checkbox.classList.add("form-check-input");
    checkbox.addEventListener("input", checkboxState.bind(null, checkbox), false)
    checkBoxWrap.appendChild(checkbox);

    let checkLbl = document.createElement("label");
    checkLbl.innerText = checkBoxTxt;
    checkLbl.setAttribute("for", "privacyCheck");
    checkLbl.classList.add("form-check-label");
    checkBoxWrap.appendChild(checkLbl);

    let privacyHref = document.createElement("a");
    privacyHref.classList.add("privacy-href");
    privacyHref.innerText = privacyLinkTxt;
    privacyHref.target = "_blank";
    privacyHref.href = "/privacy";  
    checkLbl.appendChild(privacyHref);
    privacyHref.after("*");

}

function checkboxState(obj){
    if(obj.checked){
        privacyCheckState = true;
        valueOnChange();
    }    
    else{
        privacyCheckState = false;
    }
}

function initSubmitBtn(){
    submitBtn = document.createElement("button");
    submitBtn.id = "submit";
    submitBtn.name = "submit";
    submitBtn.classList.add("submit-btn");
    submitBtn.onclick = function(e){
        e.preventDefault();
        submitBtn.disabled = true;
        let loadingWrapper = document.querySelector(".loading-wrapper"); 
        loadingWrapper.style.display = "flex";
        successMsg.classList.remove("show");
        successMsg.classList.add("hide"); 
        successMsg.classList.add("hide-form-msg"); 
        errorMsg.classList.remove("show");
        errorMsg.classList.add("hide"); 
        errorMsg.classList.add("hide-form-msg"); 
        sendForm();
        
    }
    submitBtn.innerText = "Nosūtīt";
    buttonWrapper.appendChild(submitBtn); 
}

function initFormMessages(){
    let loadingTxt = document.createElement("span");
    loadingTxt.classList.add("loading-txt");
    loadingTxt.innerText = "Nosūta...";
    loadingWrapper.appendChild(loadingTxt);

    initSuccessMsg();
    initErrorMsg();    
}

function initSuccessMsg(){
    let msgClasses = ["alert", "alert-success", "fade", "hide", "hide-form-msg"];

    successMsg = document.createElement("div");
    for(let i = 0; i < msgClasses.length; i++){
        successMsg.classList.add(msgClasses[i]);        
    }
    successMsg.setAttribute("role", "alert");
    successMsg.innerText = "Ziņa nosūtīta!";
    bookingForm.appendChild(successMsg);

    let successIco = document.createElement("i");
    successIco.classList.add("success-icon");
    successIco.classList.add("bi-check-circle-fill");    
    successMsg.appendChild(successIco);
}

function initErrorMsg(){
    let msgClasses = ["alert", "alert-danger", "fade", "hide", "hide-form-msg"];

    errorMsg = document.createElement("div");
    for(let i = 0; i < msgClasses.length; i++){
        errorMsg.classList.add(msgClasses[i]);        
    }
    errorMsg.setAttribute("role", "alert");
    bookingForm.appendChild(errorMsg);
}

function initErrorIcon(parent){
    let errorIco = document.createElement("i");
    errorIco.classList.add("error-icon");
    errorIco.classList.add("bi-exclamation-circle-fill"); 
    errorIco.src =  "../static/book_service/resources/error_icon.png";
    parent.appendChild(errorIco);    
}

function initInfoMsg(){
    let msgClasses = ["alert", "alert-primary", "fade", "hide", "hide-form-msg"];

    infoMsg = document.createElement("div");
    for(let i = 0; i < msgClasses.length; i++){
        infoMsg.classList.add(msgClasses[i]);        
    }
    infoMsg.setAttribute("role", "alert");
    infoMsg.innerText = "Nākamo pieteikumu varēsiet nosūtīt pēc 11 sekundēm.";
    buttonWrapper.appendChild(infoMsg);
}

function sendForm(){
    let formName = document.querySelector('#name');
    let formSurname = document.querySelector('#surname');
    let formEmail = document.querySelector('#email');
    let formPhone = document.querySelector('#phone');
    let formCarModel = document.querySelector('#carModel');
    let formCarYear = document.querySelector('#carYear');
    let formService = document.querySelector('#service');
    let formDate = document.querySelector('#date');
    let formMsg = document.querySelector('#message');
    let formLoc = document.querySelector('#location');
    let privacyCheck = document.querySelector("#privacyCheck");
    let loadingWrapper = document.querySelector(".loading-wrapper");
    let sendBtn = document.querySelector(".submit-btn");

    let formFields = [formName, formSurname, formEmail, formPhone, formCarModel, formCarYear, formService, formDate, formMsg];

    axios.post(POST_LINK, {
        "name": formName.value,
        "surname": formSurname.value,
        "email": formEmail.value,
        "phone": formPhone.value,
        "carModel": formCarModel.value,
        "carYear": formCarYear.value,
        "service": formService.value,
        "date": formDate.value,
        "message": formMsg.value,
        "privacyCheck": privacyCheckState,         
        "location": formLoc.value,
        "time": ticks,
        "csrf": csrfToken
    }
    ).then(function(res){
        let response = res.data;


        for(let i = 0; i < msgErrors.length; i++){
            if(response.error === msgErrors[i]){
                loadingWrapper.style.display = "none";
                errorMsg.classList.add("show");
                errorMsg.classList.remove("hide"); 
                errorMsg.classList.remove("hide-form-msg"); 
                errorMsg.innerText = response.error;     
                initErrorIcon(errorMsg);

                successMsg.classList.remove("show");
                successMsg.classList.add("hide"); 
                successMsg.classList.add("hide-form-msg");   
                sendBtn.disabled = false; 
            }
        }

        if(response.status === "sent"){
            ticks = 0;
            sendBtn.disabled = false; 
            loadingWrapper.style.display = "none";    
            successMsg.classList.add("show");
            successMsg.classList.remove("hide"); 
            successMsg.classList.remove("hide-form-msg");    
            
            errorMsg.classList.remove("show");
            errorMsg.classList.add("hide"); 
            errorMsg.classList.add("hide-form-msg"); 

            reinitList();
            calendar.clear();
            

            for(let i = 0; i < formFields.length; i++){
                formFields[i].value = "";
            }

            privacyCheck.checked = false;
            privacyCheckState = false;

            csrfToken = response.newCsrf;
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            };

        }
       
    }).catch(function (error) {
        console.log(error.response);
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if(error.response !== null){

            for(let i = 0; i < csrfErrors.length; i++){
                if(error.response.data.indexOf(csrfErrors[i]) !== -1){
                    displayErrorMsg(csrfErrorMsgs[i]);
                } 
            }

            sendBtn.disabled = false;                
        }
    });

}

function displayErrorMsg(message){
    loadingWrapper.style.display = "none";
    errorMsg.classList.add("show");
    errorMsg.classList.remove("hide"); 
    errorMsg.classList.remove("hide-form-msg"); 
    errorMsg.innerText = message;     
    initErrorIcon(errorMsg);

    successMsg.classList.remove("show");
    successMsg.classList.add("hide"); 
    successMsg.classList.add("hide-form-msg");  
}

function reinitList(){
    let list = document.querySelector(".lcslt-wrap");
    list.remove();
    initServiceSelect();
}

function allowPhoneCharOnly(){
    let phoneInput = document.querySelector("#phone");
    phoneInput.addEventListener("keypress", function (evt) {
        let charCode = (evt.which) ? evt.which : KeyboardEvent.code

        if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode === 43 || charCode === 32)){
            evt.preventDefault();
        }  
    });
}

function initYearOptions(){
    let selectYear = document.querySelector('#carYear');
    let currentYear = new Date().getFullYear();
    let initialYear = 2021;
    let years = 63;

    if(currentYear > initialYear){
        years += currentYear - initialYear;
    }

    for (let i = 0; i < years; i++) {
        let yearElem = document.createElement("option");
        if(i === 0){
            yearElem.value = "";
            yearElem.textContent = "Izvēlēties gadu*";
        }
        else{
            yearElem.value = currentYear; 
            yearElem.textContent = currentYear;
            currentYear--; 
            yearElem.addEventListener("click", valueOnChange.bind(null, null), false);                                              
        }  
        selectYear.append(yearElem);

    }
}

function initServiceSelect(){
    let serviceCon = document.querySelector(".details-wrapper-4 .details-container");

    let listWrap = document.createElement("select");
    listWrap.name = "multiple",
    listWrap.classList.add("form-select");
    listWrap.classList.add("form-select-md");
    listWrap.classList.add("select-service");
    listWrap.setAttribute("multiple", "");
    listWrap.id = "select-service";
    serviceCon.appendChild(listWrap);


    for(let i = 0; i < serviceTexts.length; i++){
        let listItem = document.createElement("option");
        listItem.classList.add("service-option");
        listItem.innerText = serviceTexts[i];
        listItem.value = serviceTexts[i];
        listWrap.appendChild(listItem);
    }

    serviceSelect = document.querySelector('select[name="multiple"]');

    new lc_select(serviceSelect, {
        wrap_width : '100%',
        labels : [
            'Meklēt pakalpojumu...',
            'Pievienot pakalpojumu',
            'Izvēlēties pakalpojumu',
            'Nekas netika atrasts',
        ]
    });



    selectService();
}

function selectService(){
    let listWrap = document.querySelector("#select-service");
    let serviceInput = document.querySelector(".input-service");
    
    listWrap.onchange = function(e){
        serviceInput.value = [...listWrap.options].filter(option => option.selected).map(option => option.value + "; ");
        valueOnChange();
    }
}

window.onpagehide = function(){
    let formName = document.querySelector('#name');
    let formSurname = document.querySelector('#surname');
    let formEmail = document.querySelector('#email');
    let formPhone = document.querySelector('#phone');
    let formCarModel = document.querySelector('#carModel');
    let formCarYear = document.querySelector('#carYear');
    let formService = document.querySelector('#service');
    let formDate = document.querySelector('#date');
    let formMsg = document.querySelector('#message');
    let serviceList = document.querySelector("#select-service");
    let serviceOptions = serviceList.querySelectorAll("option");
    let selectedArr = [];

    let inputs = ["name", "surname", "email", "phone", "carModel", "carYear", "service", "date", "privacyAgreed", "message"]
    let inputValues = [formName.value, formSurname.value, formEmail.value, formPhone.value, formCarModel.value, formCarYear.value, formService.value, formDate.value, privacyCheckState, formMsg.value]

    for(let i = 0; i < inputs.length; i++){
        sessionStorage.setItem(inputs[i], inputValues[i]) ;
    }

    for(let i = 0; i < serviceOptions.length; i++){
        if(serviceOptions[i].selected){
            selectedArr.push(serviceOptions[i].value);
        }
    }

    sessionStorage.setItem("selServices", JSON.stringify(selectedArr));

}

allowPhoneCharOnly();
initYearOptions();
initServiceSelect();
valueOnChange();
bindChangeValue();
