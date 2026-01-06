const URL = "https://jsonplaceholder.typicode.com/users/1";

async function fetchUtente() {
    let response = await fetch(URL);
    let data = await response.json();
    let nome = data.name;

    let posts = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
    let json = await posts.json();

    console.log(`L'utente ${nome} ha scritto ${json.length} post`);
}
fetchUtente();