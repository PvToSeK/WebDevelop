function loading(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}
async function fetchUser() {
 await loading(2000);
 let response = await fetch(`https://jsonplaceholder.typicode.com/users/2`)
 let data = await response.json();
 let name = data.name;
 console.log(`Caricamento completato: ${name}`)

}
fetchUser();