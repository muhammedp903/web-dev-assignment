window.onload = ()=> {
    const errorMsg = document.getElementById("error-msg");
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", (e)=>{
        e.preventDefault();
        errorMsg.innerHTML = "";

        const cardForm = document.forms["credit-card"];
        const cardNum = cardForm["card-num"].value;
        const expiryMonth = parseInt(cardForm["expiry-month"].value);
        const expiryYear = parseInt(cardForm["expiry-year"].value);
        const cvvCode = cardForm["cvv-code"].value;

        const cardTest = /^5[1-5][0-9]{14}$/;
        if(!cardTest.test(cardNum)){
            errorMsg.innerHTML = "Invalid card number";
            // location.reload();
            return;
        }

        const today = new Date();
        const tYear = today.getFullYear();
        const tMonth = today.getMonth()+1;
        if(expiryYear<tYear || (expiryMonth<tMonth && expiryYear === tYear)){
            errorMsg.innerHTML = "Expiry date is in the past";
            // location.reload();
            return;
        }

        const cvvTest = /^[0-9]{3,4}$/
        if(!cvvTest.test(cvvCode)){
            errorMsg.innerHTML = "Invalid CVV code";
            // location.reload();
            return;
        }

        const data = {
            "master_card": parseInt(cardNum),
            "exp_year": expiryYear,
            "exp_month": expiryMonth,
            "cvv_code": cvvCode
        }
        const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        ).then(r => {
            if (r.status === 200){
                return r.json();
            }else if(r.status === 400){
                throw "Something doesn't look right";
            }else {
                throw "Something went wrong :(";
            }
        }
        ).then((resJson) => {
            alert(resJson.message)
            let url = "success.html";
            url += "?card=" + cardNum.substring(12);
            location.replace(url);
        }
        ).catch((error) => {
            console.log(error.toString());
            alert(error);
        })
    });
}
