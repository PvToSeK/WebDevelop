let tentativo = document.getElementById("tentativo");
let confronta = document.getElementById("confronta");
let messaggio = document.getElementById("messaggio");
let numeroCasuale;
let tentativi = [];


function generaNumero(){
  numeroCasuale = Math.floor(Math.random() * 20) + 1;
    alert ("Numero generato!")
}
generaNumero();
function confrontaNumero(){
    let valore = Number(tentativo.value)
    tentativi.push(valore);
    if(Number(tentativo.value) === numeroCasuale){
      messaggio.textContent =
    ("Indovinato! Tentativi fatti: " + tentativi.length)

     } else if(Number(tentativo.value)> numeroCasuale){
        messaggio.textContent= "Troppo alto! "
    }
    else if(Number(tentativo.value) < numeroCasuale){
        messaggio.textContent ="Troppo basso! " 
    }
    
}
confronta.addEventListener("click", confrontaNumero);