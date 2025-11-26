const listaNomi = ["Diego", "Silvanokcs",  "Miriam"];
let bottone = document.getElementById("bottone");
let risultato = document.getElementById("risultato");
function cercaNome(){
    let nomePiuLungo = "";
    for(let nome of listaNomi){
        if (nome.length > nomePiuLungo.length){
            nomePiuLungo = nome;
        }
    }
    risultato.textContent = "Il nome più lungo è: "+ nomePiuLungo;
}

bottone.addEventListener("click", cercaNome)