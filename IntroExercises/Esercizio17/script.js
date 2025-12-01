let rosso = document.getElementById("rosso");
let giallo = document.getElementById("giallo");
let verde = document.getElementById("verde");

let colori = ["rosso","giallo", "verde"];
let indice = 0;
let bottone = document.getElementById("avvia");

let semaforo = {
    running: false,
    timer: null
};

function svuotaDiv(){
    rosso.textContent = "";
    giallo.textContent = "";
    verde.textContent = "";
}

function accendiColore(){
    svuotaDiv();

    document.getElementById(colori[indice]).textContent = colori[indice];

    indice = (indice + 1) % colori.length;
}

function start() {
    semaforo.timer = setInterval(accendiColore, 2000);
    semaforo.running = true;
    bottone.textContent = "Spegni";
}

function stop() {
    clearInterval(semaforo.timer);
    semaforo.running = false;
    bottone.textContent = "Accendi";
}

bottone.addEventListener("click", () => {
    if (semaforo.running) stop();
    else start();
});

accendiColore();
