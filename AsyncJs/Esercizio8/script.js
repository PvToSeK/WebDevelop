const URL = "https://jsonplaceholder.typicode.com/usersXXX/1";

async function fetchUser() {
    try {
        let response = await fetch(URL);

        if (!response.ok) throw new Error("HTTP error " + response.status);

        let data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Errore catturato:", error);
    }
}

fetchUser();
