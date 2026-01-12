let codicePC = document.getElementById("codicePC");
let nomeUtente = document.getElementById("nomeUtente");
let bottoneOccupa = document.getElementById("bottoneOccupa");
let bottoneLibera = document.getElementById("bottoneLibera");
let bottoneEliminaPC = document.getElementById("bottoneEliminaPC");
let area = document.getElementById("area");
let messaggio = document.getElementById("messaggio");

let computers = [
    { codice: "A01", utente: "", stato: "libero" },
    { codice: "A02", utente: "", stato: "libero" },
    { codice: "A03", utente: "", stato: "libero" }
];

function mostraPC() {
    area.textContent = "";
    for (let computer of computers) {
        let div = document.createElement("div");
        div.textContent = "PC " + computer.codice + " " + computer.utente + " " + computer.stato;
        area.append(div);
    }
}

function controllaCodice() {
    let codice = codicePC.value;
    messaggio.textContent = "";

    if (
        (codice.length !== 3 ||
        !isNaN(Number(codice[0])) ||
        isNaN(Number(codice[1])) ||
        isNaN(Number(codice[2])))
    ) {
        messaggio.textContent = "Formato non valido";
        return;
    }
}

function occupaPC() {
    for (let computer of computers) {
        if (computer.codice == codicePC.value) {
            if (computer.stato === "occupato") {
                messaggio.textContent = "PC già Occupato";
                return;
            }

            computer.stato = "occupato";
            computer.utente = nomeUtente.value;
            mostraPC();
            return;
        }
    }
    messaggio.textContent = "PC non Trovato";
    return;
}

function liberaPC() {
    for (let computer of computers) {
        if (computer.codice == codicePC.value) {
            if (computer.stato === "libero") {
                messaggio.textContent = "PC già Libero";
                return;
            }

            computer.stato = "libero";
            computer.utente = "";
            mostraPC();
            return;
        }
    }

    messaggio.textContent = "PC non Trovato";
    return;
}

function cancellaPC() {
    let array = [];
    for (let computer of computers) {
        if (computer.codice !== codicePC.value) {
            array.push(computer);
        }
    }

    computers = array;
    mostraPC();
    return;
}

codicePC.addEventListener("input", controllaCodice);
bottoneOccupa.addEventListener("click", occupaPC);
bottoneLibera.addEventListener("click", liberaPC);
bottoneEliminaPC.addEventListener("click", cancellaPC);

mostraPC();
