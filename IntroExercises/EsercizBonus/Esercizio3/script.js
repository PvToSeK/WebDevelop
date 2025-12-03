let bottone = document.getElementById("bottone");
let testo = document.getElementById("testo");
let messaggio = document.getElementById("messaggio");

function contaVocali() {
    let parola = testo.value.toLowerCase();
    let vocali = ["a", "e", "i", "o", "u"];
    let contatore = 0;

    for (let i = 0; i < parola.length; i++) {
        if (vocali.includes(parola[i])) {
            contatore++;
        }
    }

    messaggio.textContent = "Vocali trovate: " + contatore;
}

bottone.addEventListener("click", contaVocali);
