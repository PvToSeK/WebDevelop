const URL = "https://pokeapi.co/api/v2/pokemon/pikachu"

fetch(URL).then((response) => {
    if(response.ok){
        let json = response.json()
        return json
    }
}

).then((json) => {
let nome = json.name
let peso = json.weight
console.log("Nome "+ nome+" Peso: "+peso)
})