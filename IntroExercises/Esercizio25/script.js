let generatorcontainer = document.getElementById("generatorcontainer");
const simboli = ["🔥","⚡","💎","🌾"];
const capacita = 20;
let velocita = [100, 4000, 4000, 5000];

for (let i = 0; i < 4; i++) {
  let bottone = document.createElement("button");
  bottone.id = "G" + (i + 1);
  bottone.current = 0;
  bottone.capacita = capacita;
  bottone.interval = null;

  bottone.textContent = simboli[i] + " " + bottone.current + "/" + capacita;
  generatorcontainer.append(bottone);

  aumenta();

  bottone.addEventListener("click", () => {
    bottone.current = 0;
    bottone.textContent = simboli[i] + " " + bottone.current + "/" + capacita;
    aumenta();
  });

  function aumenta() {
    if (bottone.interval !== null) return;

    bottone.interval = setInterval(() => {
      bottone.current++;
      bottone.textContent =
        simboli[i] + " " + bottone.current + "/" + capacita;

      if (bottone.current >= capacita) {
        clearInterval(bottone.interval);
        bottone.interval = null;
      }
    }, velocita[i]);
  }
}
