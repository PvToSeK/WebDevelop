const URL = "https://jsonplaceholder.typicode.com/users/1";

async function getUser() {
let response = await fetch(URL);
let data = await response.json();
return data;

}
getUser().then(data => console.log(data))