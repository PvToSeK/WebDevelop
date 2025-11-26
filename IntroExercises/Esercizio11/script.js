let lista = document.getElementById("lista");
let btn = document.getElementById("btn");
let btnCalcola = document.getElementById("btnCalcola");

function aggiungiPersona() {
    let persona = document.getElementById("persona").value;
    let importo = document.getElementById("importo").value;
    let li = document.createElement("li");
    li.append(persona + " " + importo + "$");
    lista.append(li);
}

function calcola() {
    let valori = document.getElementsByTagName("li");
    let listaSpese = {};

    for (let valore of valori) {
        let testo = valore.textContent;
        let nome = testo.split(" ")[0];
        let importo = Number(testo.split(" ")[1].replace("$", ""));

        if (listaSpese[nome]) {
            listaSpese[nome] += importo;
        } else {
            listaSpese[nome] = importo;
        }
    }

    for (let nome in listaSpese) {
        let p = document.createElement("p");
        p.append(nome + " " + listaSpese[nome]);
        document.body.append(p);
    }
    let somma = 0
    for (let nome in listaSpese) {
        somma += listaSpese[nome]
    }    
    let lunghezza = Object.keys(listaSpese).length;
    let p = document.createElement("p");
    let media = somma / lunghezza
    p.append("La media è: "+media)
    document.body.append(p)
}
    

btn.addEventListener("click", aggiungiPersona);
btnCalcola.addEventListener("click", calcola);
