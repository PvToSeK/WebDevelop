const URL = `https://pokeapi.co/api/v2/pokemon/manaphy`

async function getPokemon() {
  let response = await fetch(URL);
  if(response.ok) {
  let data =  await response.json();
  let name = data.forms[0].name;
  let height = data.height;
  let weight = data.weight;
  let types  = data.types;
  let tipiPokemon = [];
  for(let type of types ){
     tipiPokemon.push(type.type.name)
  }
  console.log(tipiPokemon)
  let div= document.createElement("div");
  div.innerHTML = `Nome: ${name} <br>Altezza: ${height} <br> Peso: ${weight} <br> Tipo:${tipiPokemon}`
  document.body.append(div)
  }
}
getPokemon();
