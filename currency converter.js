let Base='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies'
let btn=document.querySelector('form button');
let select=document.querySelectorAll('.dropdown select');
let fromCurr= document.querySelector('.from select');
let toCurr= document.querySelector('.to select')
let msg=document.querySelector('.msg');

for (selections of select){
    for (currCode in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        selections.append(newOption);
        if (selections.name==='from' && currCode==='USD'){
            newOption.selected='selected';
        }
        if (selections.name==='to' && currCode==='INR'){
            newOption.selected='selected';
        }
    }
    selections.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}

let updateFlag=(element)=>{
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector('img');
    img.src=newSrc;
}

let updateExchangeRate= async ()=>{
    let amount=document.querySelector('.amount input');
    let amountVal= amount.value;
    if (amountVal<1 || amountVal===""){
        amount.value=1;
    }
    const URL=`${Base}/${fromCurr.value.toLowerCase()}.json`
    let response=await fetch(URL);
    let data= await response.json();
    
    let exchangeRate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount= amountVal*exchangeRate;
    msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener('load',()=>{
    updateExchangeRate();
})