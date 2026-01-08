let gamecontainer = document.getElementById("game-container");
let bersaglio = document.createElement("input");
bersaglio.type = "text";
bersaglio.id = "bersaglio";

let togli_lp = document.createElement("button");
togli_lp.id = "togli_lp";
togli_lp.textContent = "Colpisci";
let contatoreClone = 1;

document.body.append(bersaglio, togli_lp);
let numeroEstratto = Math.floor(Math.random() * 10) + 1;

function mostraBottone() {
  for (let i = 0; i < numeroEstratto; i++) {
    let bottone = document.createElement("button");
    bottone.id = "B" + (i + 1);

    let lifepoints = Math.floor(Math.random() * 10) + 1;
    bottone.lifepoints = lifepoints;

    bottone.value = bottone.id; 
    bottone.textContent = bottone.id + " LP:" + lifepoints;
    gamecontainer.append(bottone);

    bottone.addEventListener("dblclick", () => {
      clona_bottone(bottone);
    });
  }
}

function clona_bottone(bottone){

  let bottoneCliccato = document.createElement("button");
  bottoneCliccato.lifepoints = bottone.lifepoints;
  bottoneCliccato.id = "B(C)" + (contatoreClone++);
  bottoneCliccato.textContent = bottoneCliccato.id + " LP:" + bottoneCliccato.lifepoints;

  gamecontainer.append(bottoneCliccato);

  // 🎬 Animazione aggiunta (solo qui, come richiesto)
  bottoneCliccato.animate(
    [
      { opacity: 0, transform: "scale(0.5)" },
      { opacity: 1, transform: "scale(1)" }
    ],
    {
      duration: 400,
      easing: "ease-out"
    }
  );

  bottoneCliccato.addEventListener("dblclick", () => {
    clona_bottone(bottoneCliccato);
  });
}

function mostraEntitaColpita() {
  togli_lp.textContent = "Togli LP a " + bersaglio.value;
}

bersaglio.addEventListener("input", () => {
  if (bersaglio.value.length >= 3) {
    bersaglio.value = bersaglio.value.slice(0, 3).toUpperCase(); 
  }
  mostraEntitaColpita();
});

togli_lp.addEventListener("click", () => {
  let bottoneDaColpire = document.getElementById(bersaglio.value.toUpperCase());
  if (bottoneDaColpire.value === bersaglio.value.toUpperCase()) {
    bottoneDaColpire.lifepoints -= 1;
    bottoneDaColpire.textContent = bottoneDaColpire.id + " LP:" + bottoneDaColpire.lifepoints;

    if (bottoneDaColpire.lifepoints <= 0) {
      bottoneDaColpire.disabled = true;
      setTimeout(() => {
        bottoneDaColpire.lifepoints = Math.floor(Math.random() * 10) + 1;
        bottoneDaColpire.textContent =
          bottoneDaColpire.id + " LP:" + bottoneDaColpire.lifepoints;
        bottoneDaColpire.disabled = false;
      }, 2000);
    }
  }
});

togli_lp.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  let bottoneDaColpire = document.getElementById(bersaglio.value.toUpperCase());
  if (bottoneDaColpire.value === bersaglio.value.toUpperCase()) {
    bottoneDaColpire.lifepoints -= 2;
    bottoneDaColpire.textContent = bottoneDaColpire.id + " LP:" + bottoneDaColpire.lifepoints;

    if (bottoneDaColpire.lifepoints <= 0) {
      bottoneDaColpire.disabled = true;
      togli_lp.disabled = true;
      setTimeout(() => {
        bottoneDaColpire.lifepoints = Math.floor(Math.random() * 10) + 1;
        bottoneDaColpire.textContent =
          bottoneDaColpire.id + " LP:" + bottoneDaColpire.lifepoints;
        bottoneDaColpire.disabled = false;
        togli_lp.disabled = false;
      }, 2000);
    }
  }
});

mostraBottone();
