let container = document.getElementById("generatorcontainer");

const generators = [
  { id: "g1", simbolo: "🔥", current: 0, capacita: 20, velocita: 2000, interval: null },
  { id: "g2", simbolo: "⚡", current: 0, capacita: 20, velocita: 3000, interval: null },
  { id: "g3", simbolo: "💎", current: 0, capacita: 20, velocita: 4000, interval: null },
  { id: "g4", simbolo: "🌾", current: 0, capacita: 20, velocita: 5000, interval: null }
];

// Creazione bottoni
for (let i = 0; i < generators.length; i++) {
  const gen = generators[i];
  const btn = document.createElement("button");
  btn.id = gen.id;
  btn.textContent = gen.simbolo + " " + gen.current + "/" + gen.capacita;

  btn.addEventListener("click", function () {
    collect(i);
  });

  container.append(btn);
  startProduction(i);
}

// Avvia la produzione
function startProduction(index) {
  const gen = generators[index];

  if (gen.interval !== null) return;

  gen.interval = setInterval(function () {
    gen.current++;
    updateButton(index);

    if (gen.current >= gen.capacita) {
      clearInterval(gen.interval);
      gen.interval = null;
    }
  }, gen.velocita);
}

// Raccolta risorse
function collect(index) {
  const gen = generators[index];
  gen.current = 0;
  updateButton(index);
  startProduction(index);
}

// Aggiorna testo bottone
function updateButton(index) {
  const gen = generators[index];
  const btn = document.getElementById(gen.id);
  btn.textContent = gen.simbolo + " " + gen.current + "/" + gen.capacita;
}
