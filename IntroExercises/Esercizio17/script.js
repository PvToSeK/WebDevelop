let colori = ["rosso", "giallo", "verde"];
let indice = 0;
let bottone = document.getElementById("avvia");

let semaforo = {
    running: false,
    timer: null
};

function spegniTutte() {
    document.getElementById("rosso").style.opacity = "0.3";
    document.getElementById("giallo").style.opacity = "0.3";
    document.getElementById("verde").style.opacity = "0.3";
}

function accendiColore() {
    spegniTutte();
    document.getElementById(colori[indice]).style.opacity = "1";
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

bottone.addEventListener("click", function() {
    if (semaforo.running) {
        stop();
    } else {
        start();
    }
});


accendiColore();
