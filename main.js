const resultElement = document.querySelector("#result");
const lengthElement = document.querySelector("#length")
const capitalElement = document.querySelector("#capital")
const smallElement = document.querySelector("#small")
const numberElement = document.querySelector("#number")
const specialElement = document.querySelector("#symbol")
const form = document.querySelector("#pg-form");
const clipboardEl = document.querySelector(".clipboard");

const fieldsArray = [
    {
       field: capitalElement,
       getChar: getCapitalLetter 
    },
    {
       field: smallElement,
       getChar: getSmallerLetter 
    },
    {
       field: numberElement,
       getChar: getNumber
    },
    {
       field: specialElement,
       getChar: getSpecialChar 
    }    
];

//Las siguientes funciones son valores ASCII

function getRandomChar(min, max){
    const limit = max - min + 1; // 4 -> 2 
    return String.fromCharCode(Math.floor(Math.random()* limit ) + min);
};

function getCapitalLetter(){
    return getRandomChar(65, 90);
};
function getSmallerLetter(){
    return getRandomChar(97, 122);
}

function getNumber(){
    return getRandomChar(48, 57);
}
function getSpecialChar(){
    const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
    return specialChar[Math.floor(Math.random() * specialChar.length)];
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const length = lengthElement.value;
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({ field }) => field.checked);

    for (i= 0; i < length; i++){
        const index = Math.floor(Math.random() * checkedFields.length);
        const letter = checkedFields[index].getChar();
        generatedPassword += letter;
    }

    resultElement.value = generatedPassword;
});

clipboardEl.addEventListener("click", async (e) => {
    const text = resultElement.value;
    if(text){
        await navigator.clipboard.writeText(text);
        alert("¡Copiado al portapapeles!");
    } else {
        alert("Genere un password para copiar al portapapeles");
    }
});
