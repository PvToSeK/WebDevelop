async function getUsers() {
    let utenti = [];
    for (let i = 1; i <= 3; i++) {
        const URL = `https://jsonplaceholder.typicode.com/users/${i}`;
        let response = await fetch(URL);
        let data = await response.json();
        utenti.push({ id: data.id, name: data.name });
    }

    return utenti;
}

getUsers().then(utenti => {
    console.log(utenti);
});
