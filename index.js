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
    user: "root",
    password: "123456",
    database: "Biblioteca_Jogos"
})

con.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
})

const gamesDAO = require("./models/gamesDAO");

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/gamesForm.html");
});

app.post("/saveGame", (req,res) => {
    let game = new gamesDAO();
    game.setTitle(req.body.title);
    game.setGenre(req.body.genre);
    game.setDeveloper(req.body.developer);
    game.setPublication(req.body.publication);
    game.setPrice(req.body.price);

    let response = game.Insert(con);
    res.sendFile(__dirname + "/views/result.html");
});