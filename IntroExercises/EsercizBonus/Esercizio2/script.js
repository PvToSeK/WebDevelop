let indice = document.getElementById("indice");
let bottone = document.getElementById("bottone");
let messaggio = document.getElementById("messaggio");
const colori = ["rosso","giallo","verde"];

function giampeppino(){
    if(Number(indice.value)<colori.length){
        messaggio.textContent = colori[indice.value]
    }
}
bottone.addEventListener("click", giampeppino)