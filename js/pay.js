window.onload = (e)=> {
    e.preventDefault();

    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", ()=>{
        let cardForm = document.forms["credit-card"];
        let cardNum = cardForm["card-num"].value;
        let expiryMonth = cardForm["expiry-month"].value;
        let expiryYear = cardForm["expiry-year"].value;
        let cvvCode = cardForm["cvv-code"].value;

        console.log(cardNum, expiryYear, expiryMonth, cvvCode);

        let cardTest = /^5[1-5][0-9]{14}$/;
        if(!cardTest.test(cardNum)){
            alert("Invalid card number");
            location.reload();
        }

        let today = new Date();
        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        if(expiryYear<tYear || (expiryMonth<=tMonth && expiryYear === tYear)){
            alert("Card expired");
            location.reload();
        }

        let cvvTest = /^[0-9]{3,4}$/
        if(!cvvTest.test(cvvCode)){
            alert("Invalid CVV code");
            location.reload();
        }

        let data = {
            "master_card": parseInt(cardNum),
            "exp_year": parseInt(expiryYear),
            "exp_month": parseInt(expiryMonth),
            "cvv_code": cvvCode
        }
        const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";

        fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(r => {
            if (r.status === 200){
                return r.json();
            }else if(r.status === 400){
                throw "Bad data";
            }else {
                throw "Something wrong";
            }
        }).then((resJson) => {
            alert(resJson["message"]); // TODO: Success
        }).catch((error) => {
            console.log(error);
            alert(error); // TODO: Error
        })
    });
}
