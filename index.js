const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server Started");
})

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "aqueous",
    password: "123456",
    database: "Biblioteca_Jogos"
})

con.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
})

const purchasesDAO = require("./models/purchasesDAO");
const gamesDAO = require("./models/gamesDAO");
const clientsDAO = require("./models/clientsDAO");

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/gamesForm", (req,res) => {
    res.sendFile(__dirname + "/views/gamesForm.html");
});

app.get("/clientsForm", (req,res) => {
    res.sendFile(__dirname + "/views/clientsForm.html");
});

app.get("/purchasesForm", (req,res) => {
    res.sendFile(__dirname + "/views/purchasesForm.html");
});

app.post("/saveGame", (req,res) => {
    let game = new gamesDAO();
    game.setTitle(req.body.title);
    game.setGenre(req.body.genre);
    game.setDeveloper(req.body.developer);
    game.setPublication(req.body.publication);
    game.setPrice(req.body.price);

    game.Insert(con);
    res.sendFile(__dirname + "/views/result.html");
});

app.post("/saveClient", (req,res) => {
    let client = new clientsDAO();
    client.setCPF(req.body.cpf);
    client.setPassword(req.body.password);
    client.setName(req.body.name);
    client.setBirthDate(req.body.birthDate);
    client.setNationality(req.body.nationality);
    client.setEmail(req.body.email);
    client.setPhone(req.body.phone);

    client.Insert(con);
    res.sendFile(__dirname + "/views/result.html");
});

app.post("/savePurchase", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setClient(req.body.client);
    purchase.setGame(req.body.game);

    purchase.Insert(con);
    res.sendFile(__dirname + "/views/result.html");
});