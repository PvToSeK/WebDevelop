let todo_input = document.getElementById("todo_input");
let btn_add = document.getElementById("btn_add");
let todos = [];
let lista = document.getElementById("lista");

function update_list(){
    // Pulisco la lista prima di ridisegnare
    lista.textContent = "";

    // Creo un li per ogni todo nell'array
    todos.forEach((todo, i) => {
        let li = document.createElement("li");
        li.textContent = todo.text; // Mostro solo il testo

        // Evento click sul li
        li.addEventListener("click", () => {
            // Modifica lo stato completed nell'array
            todos[i].completed = true;

            // Ridisegno la lista (per ora non cambiamo l'aspetto)
            update_list();
        });

        lista.append(li);
    });
}

// Al click del bottone aggiungi, inserisco il nuovo todo e aggiorno la lista
btn_add.addEventListener("click", () => {
    if(todo_input.value === ""){
        return; // Se input vuoto, esco
    }

    todos.push({
        text: todo_input.value,
        completed: false
    });

    update_list(); // Ridisegno la lista
    todo_input.value = ""; // Pulisco l'input per il prossimo todo
});
