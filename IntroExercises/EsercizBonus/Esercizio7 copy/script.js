let mostra_pokemon = document.getElementById("mostra_pokemon");
let container = document.getElementById("container");
let contatore = 1;

mostra_pokemon.addEventListener("click", () => {
    for (let i = 0; i < 3; i++) { 
        let numero_casuale = Math.floor(Math.random() * 150 + 1); 
        let div = document.createElement("div");

        fetch(`https://pokeapi.co/api/v2/pokemon/${numero_casuale}`)
            .then(response => response.json())
            .then(data => {
                let nome = data.name;
                let type = data.types[0].type.name;
                div.textContent = `Pokemon numero: ${contatore} ${nome} ${type}`;
                contatore++;
            });

        container.append(div);
        setTimeout(() => div.remove(), 3000);
    }
});
