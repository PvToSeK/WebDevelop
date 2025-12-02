let bottone = document.getElementById("bottone")
let testo = document.getElementById("testo")
let messaggio = document.getElementById("messaggio")
bottone.disabled = true;
let contatore = 0;
 function attivaBottone(){
    if (bottone.disabled){
        bottone.disabled = false;
    }
 }
 testo.addEventListener("keyup", () =>{
    contatore++;
    if (contatore > 20){
        attivaBottone();
    }
 })
 bottone.addEventListener("click",() =>{
    messaggio.textContent = "Form Inviato! "
 })
