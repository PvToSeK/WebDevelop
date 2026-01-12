let codice_prodotto = document.getElementById("codice_prodotto");
let bottone_carica = document.getElementById("bottone_carica");
let bottone_scarica = document.getElementById("bottone_scarica");
let bottone_elimina = document.getElementById("bottone_elimina");
let area = document.getElementById("area");
let messaggioErrore = document.createElement("div");

let prodotti = [
    { codice: "A001", nome: "banana", quantita: 10 },
    { codice: "A002", nome: "mela", quantita: 5 },
    { codice: "A003", nome: "pesca", quantita: 2 }
];

function mostraProdotto() {
    area.textContent = "";
    for (let prodotto of prodotti) {
        let div = document.createElement("div");
        div.textContent = ` ${prodotto.codice} ${prodotto.nome} ${prodotto.quantita}`;
        area.append(div);
    }
}

function aumentaProdotto() {
    let trovato = false;
    for (let prodotto of prodotti) {
        if (codice_prodotto.value === prodotto.codice) {
            prodotto.quantita += 10;
            trovato = true;
        }
    }
    if (!trovato) {
        messaggioErrore.textContent = "Codice prodotto non trovato!";
        area.append(messaggioErrore);
    }
    mostraProdotto();
}

function diminuisciProdotto() {
    let trovato = false;
    for (let prodotto of prodotti) {
        if (codice_prodotto.value === prodotto.codice) {
            prodotto.quantita -= 5;
            trovato = true;
        }
    }
    if (!trovato) {
        messaggioErrore.textContent = "Codice prodotto non trovato!";
        area.append(messaggioErrore);
    }
    mostraProdotto();
}

function eliminaProdotto() {
    let array = [];
    let trovato = false;
    for (let prodotto of prodotti) {
        if (codice_prodotto.value !== prodotto.codice) {
            array.push(prodotto);
        } else {
            trovato = true;
        }
    }
    if (trovato) {
        prodotti = array;
        mostraProdotto();
    } else {
        messaggioErrore.textContent = "Codice prodotto non trovato";
        area.append(messaggioErrore);
    }
}

codice_prodotto.addEventListener("input", () => {
    messaggioErrore.textContent = "";
    if (codice_prodotto.value.length > 4) {
        messaggioErrore.textContent = "Codice prodotto troppo lungo!";
        area.append(messaggioErrore);
        return;
    }
    let trovato = false;
    for (let prodotto of prodotti) {
        if (codice_prodotto.value === prodotto.codice) {
            trovato = true;
        }
    }
    if (!trovato) {
        messaggioErrore.textContent = "Codice prodotto non esistente!";
        area.append(messaggioErrore);
    }
});

bottone_carica.addEventListener("click", aumentaProdotto);
bottone_scarica.addEventListener("click", diminuisciProdotto);
bottone_elimina.addEventListener("click", eliminaProdotto);

mostraProdotto();
