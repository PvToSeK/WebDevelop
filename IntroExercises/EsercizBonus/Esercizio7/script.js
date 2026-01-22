let mostra_pokemon = document.getElementById("mostra_pokemon");
let container = document.getElementById("container");
let contatore = 1;  
let numero_corrente = 0;
mostra_pokemon.addEventListener("click", () => {
    let div = document.createElement("div");
    let numero_casuale= Math.floor(Math.random()*150 +1);
    while(numero_corrente === numero_casuale){
        numero_casuale= Math.floor(Math.random()*150 +1);
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${numero_casuale}`).then(response => response.json()).then(data => {
        let nome = data.name;
        let type = data.types[0].type.name;
        div.textContent = `Pokemon numero: ${contatore} ${nome} ${type}`
        contatore++;
        container.append(div);
        setTimeout(()=>{
            div.remove()    
        },3000)
    }


)
 numero_corrente= numero_casuale;
})