let bottone = document.getElementById("bottone");
let nome = document.getElementById("nome");
let messaggio = document.getElementById("messaggio");

bottone.addEventListener("click", ()=>{
    messaggio.textContent = "Benvenuto,"+ nome.value;
})

