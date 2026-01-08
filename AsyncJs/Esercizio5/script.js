const URL = "https://api.open-meteo.com/v1/forecast?latitude=45.46&longitude=9.19&current_weather=true";

fetch(URL).then(response => {
    if (response.ok){
        return response.json();
    }
}).then(data =>{
    let temperatura = data.current_weather.temperature;
    console.log("Temperatura attuale a Milano: " + temperatura + "°C")
}).catch((error) =>{
    console.log("ERRORE NELLA RICHIESTA:" , error)
})
