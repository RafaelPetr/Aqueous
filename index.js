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
    database: "Aqueous"
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

app.get("/games/", (req,res) => {
    let game = new gamesDAO();

    game.List(con, (result) => {
        res.render("lists/gamesList.ejs", {games: result});
    })
});

app.get("/clients/", (req,res) => {
    let client = new clientsDAO();

    client.List(con, (result) => {
        res.render("lists/clientsList.ejs", {clients: result});
    })
});

app.get("/purchases/", (req,res) => {
    let purchase = new purchasesDAO();

    purchase.List(con, (result) => {
        res.render("lists/purchasesList.ejs", {purchases: result});
    })
});

app.get("/games/insert/", (req,res) => {
    res.sendFile(__dirname + "/views/forms/gamesForm.html");
});

app.get("/clients/insert/", (req,res) => {
    res.sendFile(__dirname + "/views/forms/clientsForm.html");
});

app.get("/purchases/insert/", (req,res) => {
    res.sendFile(__dirname + "/views/forms/purchasesForm.html");
});

app.post("/games/insert/", (req,res) => {
    let game = new gamesDAO();
    game.setTitle(req.body.title);
    game.setGenre(req.body.genre);
    game.setDeveloper(req.body.developer);
    game.setPublication(req.body.publication);
    game.setPrice(req.body.price);

    game.Insert(con);
    res.sendFile(__dirname + "/views/result.html");
});

app.post("/clients/insert/", (req,res) => {
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

app.post("/purchases/insert/", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setClient(req.body.client);
    purchase.setGame(req.body.game);

    purchase.Insert(con);
    res.sendFile(__dirname + "/views/result.html");
});

app.get("/games/excluir/", (req,res) => {
    let game = new gamesDAO();
    game.setId(req.query.id);

    game.Delete(con);
    res.sendFile(__dirname + "/views/result.html");
});

app.get("/clients/excluir/", (req,res) => {
    let client = new clientsDAO();
    client.setCPF(req.query.cpf);

    client.Delete(con);
    res.sendFile(__dirname + "/views/result.html");
});

app.get("/purchases/excluir/", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setClient(req.query.cpf_client);
    purchase.setGame(req.query.id_game);

    purchase.Delete(con);
    res.sendFile(__dirname + "/views/result.html");
});