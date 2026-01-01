let gamecontainer = document.getElementById("game-container");

let numeroEstratto = Math.floor(Math.random() * 10) + 1;

function mostraBottone() {
  for (let i = 0; i < numeroEstratto; i++) {
    let bottone = document.createElement("button");
    bottone.id = "B" + (i + 1);

    let lifepoints = Math.floor(Math.random() * 10) + 1;
    bottone.lifepoints = lifepoints;

    bottone.textContent = bottone.id+" LP:" + lifepoints;
    gamecontainer.append(bottone);
  }
}

mostraBottone();
