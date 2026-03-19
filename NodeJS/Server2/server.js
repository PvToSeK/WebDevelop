const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
let clienti = [{id:1,nome:"Han Solo", specie: "umano", credito : 1500},
    {id:2,nome:"Chewbecca", specie: "wookie", credito : 900},
    {id:3,nome:"Greedo", specie: "rodiano", credito : 300},
    {id:4,nome:"Hammerhead", specie: "ithoriano", credito : 200}];
let bevande = [{id: 1, nome: "Corelian Ale", prezzo : 50,gradazione:8},{
id: 2, nome: "Juice", prezzo : 80,gradazione:15},
{id: 3, nome: "Meranze Gold", prezzo : 120,gradazione:8},
{id: 4, nome: "Spotchka", prezzo : 200,gradazione:20}
]    
let nextClientId = clienti.length +1;

app.use((req,res,next)=>{
    console.log(`[CANTINA LOG] ${req.method} ${req.url} `);
    next();
});

app.use("/clienti", (req,res,next) =>{
    const tessera = req.headers["x-tessera"];
    if(!tessera){
        return res.status(403).json({error: "Devi avere una tessera"});
        

    }
    next();
})

app.use("/clienti",(req,res,next) =>{
    const gettoni = parseInt(req.headers["x-gettoni"]);
    if(isNaN(gettoni)){
        req.gettoni = 0
    }else{
        req.gettoni = gettoni;
    }
    next();
})
app.use("/clienti",(req,res,next) =>{
if(req.method !== "POST" && req.method !== "PUT"){
    return next();
}
    const nome = req.body.nome;
    if(!nome){
        return res.status(400).json({error : "Il nome non è valido. "})
    }
    const specie = req.body.specie;
        if(!specie){
        return res.status(400).json({error : "La specie non è valida. "});
    }
    const credito = parseInt(req.body.credito);
        if(isNaN(credito) || credito< 0){
        return res.status(400).json({error : "Il credito non è valido. "})
    }
    next();


})

app.post("/clienti",(req,res) =>{
    let trovato = false
    for(let cliente of clienti){
        if(cliente.nome === req.body.nome){
            trovato = true;
        }
    }
    if(trovato){
    return res.status(409).json({error: "Nome del cliente già esistente! "})    
}
        clienti.push({
            id:nextClientId,
            nome : req.body.nome,
            specie : req.body.specie,
            credito: req.body.credito
        });
        nextClientId++;
        return res.json("Cliente creato correttamente! ");

})
app.get("/clienti", (req,res) =>{
    return res.json(clienti);
})

app.get("/clienti/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let clienteTrovato = null;
    for(let cliente of clienti){
        if(id === cliente.id){
            clienteTrovato = cliente;
        }
    }
    if(clienteTrovato){
        res.json(clienteTrovato);
    }else{
            res.status(404).json({error: "Id non trovato"})
        }
    }
)
app.put("/clienti/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let clienteTrovato = null;
    for(cliente of clienti){
        if(id === cliente.id){
            clienteTrovato = cliente;
        }    
        }
        if(!clienteTrovato){
        return res.status(404).json({error: "Id non trovato"})
    }
    clienteTrovato['nome'] = req.body.nome;
    clienteTrovato['specie'] = req.body.specie;
    clienteTrovato['credito'] = req.body.credito;
    
    return res.json(clienteTrovato);
})

app.delete("/clienti/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let nuoviClienti = [];
    let trovato= false;
    for(cliente of clienti){
        if(id !== cliente.id){
        nuoviClienti.push(cliente);
        }else{
            trovato = true;
        }
    }
    if(!trovato){
        return res.status(404).json({error: "Id non trovato"})}
    clienti = nuoviClienti;
    return res.json(nuoviClienti);

});
app.get("/bevande",(req,res)=>{
    return res.json(bevande);

})
app.use("/ordine")







app.listen(PORT, ()=>{
    console.log(`Cantina aperta su http://localhost:${PORT}`);
})