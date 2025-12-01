let bottone = document.getElementById("bottone");
let contatore = 0
let messaggio = document.getElementById("messaggio");


let tempo = {
     seconds: 5,
    running: false,
    timer: null
}
function startTimer(){
   if (!tempo.running){
        tempo.running = true;
    tempo.timer = setTimeout(() => {
        messaggio.textContent = "Pressione eseguite: "+contatore;
        contatore = 0;
        tempo.running = false;

    },5000)
}}

document.addEventListener("keydown", () => {
    if(tempo.running)
        {contatore++ }
});
bottone.addEventListener("click",startTimer)