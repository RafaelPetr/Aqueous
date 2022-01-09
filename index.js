//---------Iniciando servidor---------

const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server Started");
})

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

//---------Conectando servidor ao MySQL---------

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

//---------Importando models das tabelas---------

const clientsDAO = require("./models/clientsDAO");
const gamesDAO = require("./models/gamesDAO");
const purchasesDAO = require("./models/purchasesDAO");

//---------Implementações da home page---------

app.get("/", (req,res) => {
    res.render("index.ejs");
});

//---------Implementações do cadastro de clientes---------

app.get("/clients/", (req,res) => {
    let client = new clientsDAO();

    client.List(con, (result) => {
        res.render("clients/list.ejs", {clients: result});
    })
});

app.get("/clients/form/", (req,res) => {
    let client = new clientsDAO();
    client.setCPF(req.query.cpf);

    client.buscarPorId(con, (result) => {
        res.render("clients/form.ejs", {client:result});
    })
});

app.post("/clients/save/", (req,res) => {
    let client = new clientsDAO();
    client.setCPF(req.body.cpf);
    client.setPassword(req.body.password);
    client.setName(req.body.name);
    client.setBirthDate(req.body.birthDate);
    client.setNationality(req.body.nationality);
    client.setEmail(req.body.email);
    client.setPhone(req.body.phone);

    if (req.body.action == "Inserir") {
        let result = client.Insert(con);
        res.render("result.ejs");
    }
    else if (req.body.action == "Atualizar") {
        let result = client.Update(con);
        res.render("result.ejs");
    }
    else {
        res.redirect("../");
    }
});

app.get("/clients/delete/", (req,res) => {
    let client = new clientsDAO();
    client.setCPF(req.query.cpf);

    client.Delete(con);
    res.render("result.ejs");
});

//---------Implementações do cadastro de jogos---------

app.get("/games/", (req,res) => {
    let game = new gamesDAO();

    game.List(con, (result) => {
        res.render("games/list.ejs", {games: result});
    })
});

app.get("/games/form/", (req,res) => {
    let game = new gamesDAO();
    game.setId(req.query.id);

    game.buscarPorId(con, (result) => {
        res.render("games/form.ejs", {game:result});
    })
});

app.post("/games/save/", (req,res) => {
    let game = new gamesDAO();
    game.setId(req.body.id);
    game.setTitle(req.body.title);
    game.setGenre(req.body.genre);
    game.setDeveloper(req.body.developer);
    game.setPublication(req.body.publication);
    game.setPrice(req.body.price);

    if (req.body.action == "Salvar") {
        if (game.getId() <= 0) {
            let retorno = game.Insert(con);
            res.render("result.ejs");
        }
        else {
            let retorno = game.Update(con);
            res.render("result.ejs");
        }
    }
    else {
        res.redirect("../");
    }
});

app.get("/games/delete/", (req,res) => {
    let game = new gamesDAO();
    game.setId(req.query.id);

    game.Delete(con);
    res.render("result.ejs");
});

//---------Implementações do cadastro de compras---------

app.get("/purchases/", (req,res) => {
    let purchase = new purchasesDAO();

    purchase.List(con, (result) => {
        res.render("purchases/list.ejs", {purchases: result});
    })
});

app.get("/purchases/form/", (req,res) => {
    res.sendFile(__dirname + "/views/purchases/form.html");
});

app.post("/purchases/save/", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setClient(req.body.client);
    purchase.setGame(req.body.game);

    let retorno = purchase.Insert(con);
    res.render("result.ejs");

    //No sistema, não haverá a possibilidade de atualizar uma compra, somente realizar e cancelar a compra
});

app.get("/purchases/delete/", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setClient(req.query.cpf_client);
    purchase.setGame(req.query.id_game);

    purchase.Delete(con);
    res.render("result.ejs");
});