async function getCountryPopulation(countryName) {
  const URL = `https://restcountries.com/v3.1/name/${countryName}`
  let response = await fetch(URL);
  let data = await response.json();
  let population = data[0].population
  return population;
}
const country = "Ecuador"
getCountryPopulation(country).then(pop =>{
  console.log(`Popolazione ${country}: ${pop}`)
})
