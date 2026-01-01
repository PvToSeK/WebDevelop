let studenti= ["Diego","Miriam","Francesco"] ;
let nomeStudente = document.getElementById("nomeStudente");
let messaggio = document.getElementById("messaggio")

function aggiungiStudente(){
    let nome= nomeStudente.value;
    for(let studente of studenti){
        if(studente === nome){
            messaggio.textContent = "Studente già presente";
            return;
        }
            studenti.push(nome);
            messaggio.textContent = "Studente aggiunto";

        }
 }      

function rimuoviStudente(){
    let nome = nomeStudente.value;
    for(let studente of studenti){
        if(studente === nome){
            
        }
    }
}