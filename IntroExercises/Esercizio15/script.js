let messaggio = document.getElementById("messaggio");
let da = 1;
let a = 10;

function StampaNumeri() {
  let numeroCorrente = da;

  let timer = setInterval(() => {

    messaggio.textContent = numeroCorrente; 

    if (numeroCorrente === a) {
        clearInterval(timer);              
    } else {
        numeroCorrente++;                  
    }

  }, 1000);
}
StampaNumeri(1,10);
