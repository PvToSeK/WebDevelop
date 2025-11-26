const listaNumeri = [2, 3, 23, 32];

let numero = document.getElementById("numero");
let bottone = document.getElementById("bottone");

function cercaNumero() {
    if (listaNumeri.includes(Number(numero.value))) {
        alert("Numero Trovato!");
    } else {
        alert("Numero Non Trovato!");
    }
}

bottone.addEventListener("click", cercaNumero);
