let numeri = [1,4,6,3]
let risultato = document.getElementById("risultato")
let btn = document.getElementById("btn")
function calcolaSomma(){
    let somma = 0
    for(let i=0;i<numeri.length;i++){
        somma += numeri[i]
        
    }
    risultato.textContent = somma
  }   
  btn=addEventListener("click",calcolaSomma)