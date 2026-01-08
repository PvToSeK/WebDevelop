const URL = "https://pokeapi.co/api/v2/pokemon/ditto";

async function getPokemon() {
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data.name);
}

getPokemon();
