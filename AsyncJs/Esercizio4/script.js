const URL = "https://jsonplaceholder.typicode.com/users/999999";

fetch(URL).then(response => {
    if(response.ok){
        let json = response.json();
        console.log(json)
    }else{
        console.log("Errore HTTP: "+ response.status)
    }
})