window.onload = (e)=> {
    e.preventDefault();

    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", ()=>{
        const cardForm = document.forms["credit-card"];
        const cardNum = cardForm["card-num"].value;
        const expiryMonth = cardForm["expiry-month"].value;
        const expiryYear = cardForm["expiry-year"].value;
        const cvvCode = cardForm["cvv-code"].value;

        console.log(cardNum, expiryYear, expiryMonth, cvvCode);

        const cardTest = /^5[1-5][0-9]{14}$/;
        if(!cardTest.test(cardNum)){
            alert("Invalid card number");
            location.reload();
        }

        const today = new Date();
        const tYear = today.getFullYear();
        const tMonth = today.getMonth();
        if(expiryYear<tYear || (expiryMonth<=tMonth && expiryYear === tYear)){
            alert("Card expired");
            location.reload();
        }

        const cvvTest = /^[0-9]{3,4}$/
        if(!cvvTest.test(cvvCode)){
            alert("Invalid CVV code");
            location.reload();
        }

        const data = {
            "master_card": parseInt(cardNum),
            "exp_year": parseInt(expiryYear),
            "exp_month": parseInt(expiryMonth),
            "cvv_code": cvvCode
        }
        const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(r => {
            if (r.status === 200){
                return r.json();
            }else if(r.status === 400){
                throw "Bad data";
            }else {
                throw "Something wrong";
            }
        })
            .then((resJson) => {
            alert(resJson["message"]); // TODO: Success
        })
            .catch((error) => {
            console.log(error.toString());
            alert(error); // TODO: Error
        })
    });
}
