const http = require("http");

const PORT = 1025;
const HOSTNAME = "localhost";

const users = [
  { username: "shadowFox", age: 23 },
  { username: "blueTiger", age: 31 },
  { username: "pixelNinja", age: 19 },
  { username: "darkWolf", age: 27 },
  { username: "neoCoder", age: 35 },
  { username: "lunaStar", age: 22 },
  { username: "ironManiac", age: 29 },
  { username: "silentMoon", age: 41 },
  { username: "redDragon", age: 26 },
  { username: "byteHunter", age: 33 }
];

let numbers = [];

const server = http.createServer((req, res) => {
console.log(req.url);
    let urlParts = []
    for (let part of req.url.split("/")) {
        if (part !== "") urlParts.push(part);
    }
    console.log(urlParts);
    
    if (req.url === "/" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Ciao, yafra");
    }

    if (req.url === "/users" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(users));
    }

    if (req.url === "/users" && req.method === "POST") {
        res.statusCode = 405;
        res.setHeader("Allow", "GET")
        return res.end();
    }
    if(req.url === "/numbers" && req.method === "GET"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify({numbers: numbers}));
    }
    if(urlParts[0]=== "numbers" && req.method === "POST"){
              let body = '';
        req.on("data", (chunk) => {
            body += chunk;
         })
         req.on("end", () => {
            if(typeof body !== "number"){
                res.statusCode === 400;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({error: " number must be a number "}))
            }
            numbers.push(body);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({numbers}))
         })
         return;
    }


 if (urlParts[0] === "number" && req.method === "GET" && urlParts.length === 2) {
        let n = urlParts[1];
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ index: n, value: numbers[n] }))
    
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: req.url + " not found" }));
});

server.listen(PORT, HOSTNAME, () => {
    console.log("servizio ONLINE " + HOSTNAME + ":" + PORT);
});