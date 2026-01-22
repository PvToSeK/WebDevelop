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

console.log(users);

const server = http.createServer((req, res) => {

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

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: req.url + " not found" }));
});

server.listen(PORT, HOSTNAME, () => {
    console.log("servizio ONLINE " + HOSTNAME + ":" + PORT);
});