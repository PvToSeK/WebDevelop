const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
let clienti = [{ id: 1, nome: "Han Solo", specie: "umano", credito: 1500 },
{ id: 2, nome: "Chewbecca", specie: "wookie", credito: 900 },
{ id: 3, nome: "Greedo", specie: "rodiano", credito: 300 },
{ id: 4, nome: "Hammerhead", specie: "ithoriano", credito: 200 }];
let nextClientId = clienti.length + 1;
let bevande = [
    { id: 1, nome: "Corelian Ale", prezzo: 50, gradazione: 8 },
    { id: 2, nome: "Juice", prezzo: 80, gradazione: 15 },
    { id: 3, nome: "Meranze Gold", prezzo: 120, gradazione: 8 },
    { id: 4, nome: "Spotchka", prezzo: 200, gradazione: 20 }
]
let ordini = [
    { id: 1, clienteId: 1, bevandaId: 1, quantita: 2, costo_base: 100, maggiorazione: 0, costo_totale: 100, credito_rimasto: 1400 },
    { id: 2, clienteId: 2, bevandaId: 4, quantita: 1, costo_base: 200, maggiorazione: 30, costo_totale: 230, credito_rimasto: 670 },
    { id: 3, clienteId: 3, bevandaId: 2, quantita: 3, costo_base: 240, maggiorazione: 36, costo_totale: 276, credito_rimasto: 24 },
    { id: 4, clienteId: 1, bevandaId: 3, quantita: 2, costo_base: 240, maggiorazione: 0, costo_totale: 240, credito_rimasto: 1160 }
];

let nextOrdineId = ordini.length + 1;
let taglie = [
    { id: 1, clienteId: 1, motivazione: "Debito al Crimine Organizzato", ricompensa: 500, attiva: true },
    { id: 2, clienteId: 2, motivazione: "Traffico illegale", ricompensa: 750, attiva: false },
    { id: 3, clienteId: 3, motivazione: "Debiti di gioco", ricompensa: 1000, attiva: true },
    { id: 4, clienteId: 4, motivazione: "Furto spaziale", ricompensa: 600, attiva: true }
];

let nextTagliaId = taglie.length + 1;

let missioni = [
    { id: 1, codice: 'AURORA-1', descrizione: 'Recupero piani della Morte Nera', pianeta: 'Scarif', rischio: 'alto', clearance: 3, agente: 'Cassian Andor' },
    { id: 2, codice: 'NEBULA-4', descrizione: 'Sorveglianza porto di Mos Eisley', pianeta: 'Tatooine', rischio: 'basso', clearance: 1, agente: 'Fulcrum' },
    { id: 3, codice: 'ECLIPSE-7', descrizione: 'Sabotaggio generatori imperiali', pianeta: 'Lothal', rischio: 'alto', clearance: 2, agente: 'Hera Syndulla' },
    { id: 4, codice: 'PHANTOM-2', descrizione: 'Estrazione agente sotto copertura', pianeta: 'Coruscant', rischio: 'critico', clearance: 3, agente: 'Sconosciuto' }

];
app.use((req, res, next) => {
    console.log(`[CANTINA LOG] ${req.method} ${req.url} `);
    next();
});

app.use("/clienti", (req, res, next) => {
    const tessera = req.headers["x-tessera"];
    if (!tessera) {
        return res.status(403).json({ error: "Devi avere una tessera" });


    }
    next();
})
app.use("/clienti", (req, res, next) => {
    const ruolo = req.headers["x-ruolo"];
    if (!ruolo) {
        req.ruolo = 'ospite';
    } else {
        req.ruolo = ruolo;
    }
    next();
})
app.use("/clienti", (req, res, next) => {
    const gettoni = parseInt(req.headers["x-gettoni"]);
    if (isNaN(gettoni)) {
        req.gettoni = 0
    } else {
        req.gettoni = gettoni;
    }
    console.log(req.gettoni);
    next();
})
app.use("/clienti", (req, res, next) => {
    if (req.method !== "POST" && req.method !== "PUT") {
        return next();
    }
    const nome = req.body.nome;
    if (!nome) {
        return res.status(400).json({ error: "Il nome non è inserito. " })
    }
    const specie = req.body.specie;
    if (!specie) {
        return res.status(400).json({ error: "La specie non è inserita. " });
    }
    const credito = parseInt(req.body.credito);
    if (isNaN(credito) || credito < 0) {
        return res.status(400).json({ error: "Il credito non è inserito. " })
    }
    next();
})


app.post("/clienti", (req, res) => {
    let trovato = false
    for (let cliente of clienti) {
        if (cliente.nome === req.body.nome) {
            trovato = true;
        }
    }
    if (trovato) {
        return res.status(409).json({ error: "Nome del cliente già esistente! " })
    }
    clienti.push({
        id: nextClientId,
        nome: req.body.nome,
        specie: req.body.specie,
        credito: req.body.credito
    });
    nextClientId++;
    return res.status(201).json(clienti[clienti.length - 1]);

})
app.get("/clienti", (req, res) => {
    return res.json(clienti);
})

app.get("/clienti/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let clienteTrovato = null;
    for (let cliente of clienti) {
        if (id === cliente.id) {
            clienteTrovato = cliente;
        }
    }
    if (clienteTrovato) {
        return res.json(clienteTrovato);
    } else {
        return res.status(404).json({ error: "Id non trovato" })
    }
}
)
app.get("/clienti/:id/ordini", (req, res) => {
    let id = parseInt(req.params.id);
    let clienteTrovato = null;
    let OrdinidaDare = [];
    let ordiniFiltrati = [];
    if (isNaN(id)) {
        return res.status(400).json({ error: "L'id non è valido" });
    }
    for (let cliente of clienti) {
        if (cliente.id === id) {
            clienteTrovato = cliente;
        }
    }
    if (!clienteTrovato) {
        return res.status(404).json({ error: "Cliente non trovato" });
    }
    // per ogni ordine cerco match con id clientr
    for (let ordine of ordini) {
        if (ordine.clienteId === id) {

            OrdinidaDare.push({
                id: ordine.id,
                clienteId: ordine.clienteId,
                bevandaId: ordine.bevandaId,
                quantita: ordine.quantita,
                costo_base: ordine.costo_base,
                maggiorazione: ordine.maggiorazione,
                costo_totale: ordine.costo_totale,
                credito_rimasto: ordine.credito_rimasto
            })
            ordiniFiltrati.push({
                id: ordine.id,
                clienteId: ordine.clienteId,
                bevandaId: ordine.bevandaId,
                quantita: ordine.quantita,
                costo_base: ordine.costo_base,
                maggiorazione: ordine.maggiorazione,
                credito_rimasto: ordine.credito_rimasto
            });
            //return res.json()
        }
    }
    if (req.ruolo === 'admin') {
        return res.json(OrdinidaDare);
    } else {
        return res.json(ordiniFiltrati);
    } //return res.json(OrdinidaDare)
}

)
app.get('/clienti/:id/riepilogo', (req, res) => {

    let id = parseInt(req.params.id);
    let bevandaId = 0;
    let quantitaMax = 0;
    let clienteTrovato = null;
    let bevandaTrovata = null;
    let contaOrdini = 0;
    let totale_speso = 0;
    let taglie_attive = 0;
    let bevanda_preferita = null;
    if (isNaN(id)) {
        return res.status(400).json({ error: "Id non è valido" });
    }
    for (let cliente of clienti) {
        if (cliente.id === id) {
            clienteTrovato = cliente;
        }
    }
    for (let ordine of ordini) {
        if (ordine.clienteId === id) {
            contaOrdini++;
            totale_speso += ordine.costo_totale;
            if (ordine.quantita > quantitaMax) {
                quantitaMax = ordine.quantita;
                bevandaId = ordine.bevandaId;
            }
        }
    }
    for (let bevanda of bevande) {
        if (bevanda.id === bevandaId) {
            bevandaTrovata = bevanda;
        }
    }
    for (let taglia of taglie) {
        if (taglia.clienteId === id && taglia.attiva === true) {
            taglie_attive++
        }
    }
    if (!clienteTrovato) {
        return res.status(404).json({ error: "Cliente non trovato" });
    }
    if (bevandaTrovata) {
        bevanda_preferita = bevandaTrovata.nome;
    }
    return res.json({
        cliente: clienteTrovato.nome,
        credito_attuale: clienteTrovato.credito,
        numero_ordini: contaOrdini,
        totale_speso: totale_speso,
        bevanda_preferita: bevanda_preferita,
        taglie_attive: taglie_attive
    })
})
app.put("/clienti/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let clienteTrovato = null;
    for (let cliente of clienti) {
        if (id === cliente.id) {
            clienteTrovato = cliente;
        }
    }
    if (!clienteTrovato) {
        return res.status(404).json({ error: "Id non trovato" })
    }
    clienteTrovato['nome'] = req.body.nome;
    clienteTrovato['specie'] = req.body.specie;
    clienteTrovato['credito'] = req.body.credito;

    return res.json(clienteTrovato);
})

app.delete("/clienti/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let nuoviClienti = [];
    let trovato = false;
    for (cliente of clienti) {
        if (id !== cliente.id) {
            nuoviClienti.push(cliente);
        } else {
            trovato = true;
        }
    }
    if (!trovato) {
        return res.status(404).json({ error: "Id non trovato" })
    }
    clienti = nuoviClienti;
    return res.json(nuoviClienti);

});
app.use("/bevande", (req, res, next) => {
    let gradazione_max = parseInt(req.headers["x-gradazione-max"]);
    if (isNaN(gradazione_max)) {
        req.gradazioneMax = null;
    } else {
        req.gradazioneMax = gradazione_max;
    }
    next();
});
app.get("/bevande", (req, res) => {
    let bevandeMin = [];
    let gradazioneMax = req.gradazioneMax;
    if (!gradazioneMax) {
        return res.json(bevande);
    } else {
        for (let bevanda of bevande) {
            if (bevanda.gradazione <= gradazioneMax) {
                bevandeMin.push(bevanda);
            }
        }
        return res.status(200).json(bevandeMin);
    }
});
app.use("/ordini", (req, res, next) => {
    if (req.method === "POST") {
        let clienteId = parseInt(req.body.clienteId);
        if ((isNaN(clienteId))) {
            return res.status(400).json({ error: "L'id del cliente non è valido. " })
        }
        let bevandaId = parseInt(req.body.bevandaId);
        if (isNaN(bevandaId)) {
            return res.status(400).json({ error: "L'id della bevanda non è valido. " })
        }
        let quantita = parseInt(req.body.quantita);
        if (isNaN(quantita) || quantita <= 0) {
            return res.status(400).json({ error: "La quantita' non è valida . " })
        }
    }

    next();
})
app.post("/ordini", (req, res) => {
    const clienteId = parseInt(req.body.clienteId);
    const bevandaId = parseInt(req.body.bevandaId);

    let clienteTrovato = null;
    let bevandaTrovata = null;
    let taglieChiuse = 0;

    for (let cliente of clienti) {
        if (clienteId === cliente.id) {
            clienteTrovato = cliente;
        }
    }

    for (let bevanda of bevande) {
        if (bevandaId === bevanda.id) {
            bevandaTrovata = bevanda;
        }
    }

    if (!clienteTrovato) {
        return res.status(404).json({ error: "cliente non trovato" });
    }

    if (!bevandaTrovata) {
        return res.status(404).json({ error: "bevanda non trovata" });
    }

    let costo_base = bevandaTrovata.prezzo * req.body.quantita;
    let maggiorazione = 0;

    if (bevandaTrovata.gradazione > 10) {
        maggiorazione = costo_base * 0.15;
    }

    let costo_totale = costo_base + maggiorazione;

    if (clienteTrovato.credito < costo_totale) {
        return res.status(402).json({ error: "credito non sufficiente" });
    }

    clienteTrovato.credito -= costo_totale;

    let nuovoOrdine = {
        id: nextOrdineId,
        clienteId: clienteId,
        bevandaId: bevandaId,
        quantita: req.body.quantita,
        costo_base: costo_base,
        maggiorazione: maggiorazione,
        costo_totale: costo_totale,
        credito_rimasto: clienteTrovato.credito,
        taglia_riscossa: 0
    };

    for (let taglia of taglie) {
        if (taglia.clienteId === clienteId && taglia.attiva === true) {
            taglia.attiva = false;
            taglieChiuse++;
        }
    }

    nuovoOrdine.taglia_riscossa = taglieChiuse;

    ordini.push(nuovoOrdine);
    nextOrdineId++;

    return res.status(201).json(nuovoOrdine);
});
app.get("/ordini", (req, res) => {
    return res.json(ordini);
});

app.use("/missioni", (req, res, next) => {
    if (req.method === 'GET') {
        return next();
    } else {
        return res.status(405).json({ error: "Metodo non consentito, le missioni non si toccano" })
    }
});
app.use("/missioni", (req, res, next) => {
    let clearance = parseInt(req.headers['x-clearance']);
    if (isNaN(clearance)) {
        req.clearance = 0;
    } else {
        req.clearance = clearance;
    }
    next();
});
app.use("/missioni", (req, res, next) => {
    let missioniVisibili = [];
    for (let missione of missioni) {
        if (missione.clearance <= req.clearance) {
            missioniVisibili.push(missione);
        }
    }
    req.missioniVisibili = missioniVisibili;
    next();
});
app.get("/missioni", (req, res) => {
    let missioniOscurate = [];
    for (let missione of req.missioniVisibili) {
        missioniOscurate.push({
            id: missione.id,
            codice: missione.codice,
            descrizione: missione.descrizione,
            pianeta: missione.pianeta,
            rischio: missione.rischio,
            clearance: missione.clearance,
            agente: '[CLASSIFICATO]'
        })
    }
    if (req.clearance === 0) {
        return res.status(403).json({ error: "Clearance insufficiente. Non sai niente" });
    }
    if (req.clearance === 1 || req.clearance === 2) {
        return res.json(missioniOscurate);
    } else {
        return res.json(req.missioniVisibili);
    }
});
app.get("/missioni/:id", (req, res) => {
    let missioneTarget = null;

    if (req.clearance === 0) {
        return res.status(403).json({ error: "Non si puo'" });
    }

    let id = parseInt(req.params.id);
    for (let missione of req.missioniVisibili) {
        if (missione.id === id) {
            missioneTarget = missione;
        }
    }
    if (missioneTarget) {
        if (req.clearance === 1 || req.clearance === 2) {
            return res.json({
                ...missioneTarget,
                agente: "[CLASSIFICATO]"
            });
        } else {
            return res.json(missioneTarget);
        }
    }
    let esiste = false;
    for (let missione of missioni) {
        if (missione.id === id) {
            esiste = true;
        }
    }

    if (esiste) {
        return res.status(403).json({ error: "Clearance insufficiente per questa missione." });
    } else {
        return res.status(404).json({ error: "Missione non trovata" });
    }
});




app.listen(PORT, () => {
    console.log(`Cantina aperta su http://localhost:${PORT}`);
});