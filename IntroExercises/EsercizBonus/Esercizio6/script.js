let button = document.getElementById("button");
let container= document.getElementById("container");
let contatore = 1;
button.addEventListener("click",()=>{
    let div =document.createElement("div");
    div.textContent= `Notifica ${contatore++}`;
    fetch("https://restcountries.com/v3.1/name/italy").then(response => {
        let data = response.json();
        return data;
    }).then(data =>{
        let capital = data[0].capital[0];
        let population = data[0].population;
        div.textContent = `Notifica ${contatore-1}\nCapitale: ${capital}, Popolazione: ${population}`;
    })  
    container.append(div);
    let  tempo = setTimeout(() =>{
        div.remove();
    },3000)
})