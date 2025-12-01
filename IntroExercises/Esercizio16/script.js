let parola = document.getElementById("parola");
let messaggio = document.getElementById("messaggio");
let resetBtn = document.getElementById("reset");
let tempo = {
     seconds: 3,
    running: false,
    timer: null
} 
function startTimer(){
    if (!tempo.running){
        tempo.running = true;

        tempo.timer = setTimeout(() => {
            parola.disabled = true;
            messaggio.textContent= "Tempo scaduto!";
        },3000);
    }
}
function completed(){
    if (tempo.running){
        clearTimeout(tempo.timer);
        messaggio.textContent = "Parola completata in tempo!"
        parola.disabled = true;
    }
}


function reset() {
    clearTimeout(tempo.timer);
    tempo.running = false;
    parola.disabled = false;
    parola.value = "";
    messaggio.textContent = "";
}

parola.addEventListener("input",startTimer);
parola.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        completed();
    }
});

resetBtn.addEventListener("click", reset);
