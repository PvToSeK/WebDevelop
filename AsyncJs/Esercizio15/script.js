let meteo = document.getElementById("meteo");

let citta = [
  { name: "Milano", latitude: 45.46, longitude: 9.19 },
  { name: "Roma", latitude: 41.89, longitude: 12.49 },
  { name: "Napoli", latitude: 40.85, longitude: 14.27 }
];

async function getMeteo() {
  try {
    for (let i in citta) {
      let response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${citta[i].latitude}&longitude=${citta[i].longitude}&current_weather=true`
      );

      if (!response.ok) {
        throw new Error(`Errore HTTP ${response.status}`);
      }

      let data = await response.json();

      let div = document.createElement("div");
      div.textContent = `${citta[i].name}: ${data.current_weather.temperature}°C, vento ${data.current_weather.windspeed} km/h`;

      meteo.append(div);
    }
  } catch (error) {
    console.log(error);
  }
}

getMeteo();
