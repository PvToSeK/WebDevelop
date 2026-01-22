const URL = "https://pokeapi.co/api/v2/pokemon/zoroark"


fetch(URL).then(response => response.json()).then(data => {
    let nome= data.forms[0].name;
    console.log(nome)
})
