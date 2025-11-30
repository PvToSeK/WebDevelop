let colori = ["rosso","giallo","verde","giallo"]
let indice = 0;


let bottone = document.getElementById("avvia")

function spegniTutte() {
    document.getElementById("rosso").style.opacity = "0.3";
    document.getElementById("giallo").style.opacity = "0.3";
    document.getElementById("verde").style.opacity = "0.3";
}

function accendi(){
    spegniTutte();
     let luceCorrente = colori[indice];
     document.getElementById(luceCorrente).style.opacity = "1";
    indice++
    indice = indice % colori.length;
}
bottone.addEventListener("click", accendi);