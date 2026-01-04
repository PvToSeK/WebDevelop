const URL = "https://restcountries.com/v3.1/name/italy";

fetch (URL).then(response =>{
    if (response.ok){
        return response.json();
    }
}).then(data =>{
    return data[0];
}).then(data =>{
    let capitale = data.capital[0]
    let popolazione = data.population 
    console.log("Capitale: " + capitale + ", Popolazione: " + popolazione)

}).catch(error => console.log("Errore nella richiesta:", error))
