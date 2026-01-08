const URL = "https://jsonplaceholder.typicode.com/users/999999";

async function fetchUser() {
  let response = await fetch(URL);
    if(response.ok){
      let data = await response.json();
      console.log(data);
    }else{
      console.log(`Errore HTTP: ${response.status} `)
    }
}
fetchUser();