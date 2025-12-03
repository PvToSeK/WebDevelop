let bottone = document.getElementById("bottone");
let messaggio = document.getElementById("messaggio");
let numeroNotifica = 1

bottone.addEventListener("click", () => {
    let div = document.createElement("div");
    div.textContent = "Nuova notifica #"+numeroNotifica++;
    messaggio.append(div);
    setTimeout(()=>{
        div.remove();
        numeroNotifica = 1;
    },3000)
    

} )