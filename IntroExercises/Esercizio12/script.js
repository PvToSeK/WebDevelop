let numero = document.getElementById("numero");
let bottonepiu = document.getElementById("bottonepiu");
let bottonemeno = document.getElementById("bottonemeno");
let massimo = document.getElementById("massimo");
let messaggio = document.getElementById("messaggio");

numero.value = 0;

function incrementa() {
    let numeroSu = Number(numero.value);
    let limite = Number(massimo.value);
    let risultatoPiu = numeroSu + 1;

    if (risultatoPiu >= limite) {
        numero.value = limite;
        messaggio.textContent = "LIMITE RAGGIUNTO!";
        bottonepiu.disabled = true;
    } else {
        numero.value = risultatoPiu;
        messaggio.textContent = "";
        bottonepiu.disabled = false;
    }

    if (numero.value > 0) {
        bottonemeno.disabled = false;
    }
}

function diminuisci() {
    let numeroGiu = Number(numero.value);
    let limite = Number(massimo.value);
    let risultatoMeno = numeroGiu - 1;

    if (risultatoMeno <= 0) {
        numero.value = 0;
        messaggio.textContent = "LIMITE RAGGIUNTO!";
        bottonemeno.disabled = true;
    } else {
        numero.value = risultatoMeno;
        messaggio.textContent = "";
        bottonemeno.disabled = false;
    }

    if (numero.value < limite) {
        bottonepiu.disabled = false;
    }
}

bottonepiu.addEventListener("click", incrementa);
bottonemeno.addEventListener("click", diminuisci);
