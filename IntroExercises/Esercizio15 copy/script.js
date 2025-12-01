let messaggio = document.getElementById("messaggio");
let da = document.getElementById("da")
let a = document.getElementById("a")
let bottone = document.getElementById("bottone")


function StampaNumeri() {
  let numeroCorrente = Number(da.value);

  let timer = setInterval(() => {

    messaggio.textContent = numeroCorrente; 

    if (numeroCorrente === Number(a.value)) {
        clearInterval(timer);              
    } else {
        numeroCorrente++;                  
    }

  }, 1000);
}
bottone.addEventListener("click", StampaNumeri)

