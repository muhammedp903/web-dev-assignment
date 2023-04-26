window.onload = ()=> {
    const urlQuery = window.location.search;
    const param = new URLSearchParams(urlQuery);
    const cardDigits =  param.get("card");

    const cardText = document.getElementById("card-text");
    cardText.innerHTML = "Your card **** **** **** " + cardDigits +" was used to make the payment";
}



// https://www.sitepoint.com/get-url-parameters-with-javascript/