const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
let clienti = [{id:1,nome:"Han Solo", specie: "umano", crediti : 1500},
    {id:2,nome:"Chewbecca", specie: "wookie", crediti : 900},
    {id:3,nome:"Greedo", specie: "rodiano", crediti : 300},
    {id:4,nome:"Hammerhead", specie: "ithoriano", crediti : 200}];
let bevande = [{id: 1, nome: "Corelian Ale", prezzo : 50,gradiazione:8},{
id: 2, nome: "Juice", prezzo : 80,gradiazione:15},
{id: 3, nome: "Meranze Gold", prezzo : 120,gradiazione:8},
{id: 4, nome: "Spotchka", prezzo : 200,gradiazione:20}
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
    const specie = req.body.specie;
    const crediti = req.body.crediti;

})
app.get("/clienti", (req,res) =>{
    res.json(clienti);
})







app.listen(PORT, ()=>{
    console.log(`Cantina aperta su http://localhost:${PORT}`);
})
