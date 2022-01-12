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

const usersDAO = require("./models/usersDAO");
const gamesDAO = require("./models/gamesDAO");
const purchasesDAO = require("./models/purchasesDAO");

//---------Implementações da home page---------

app.get("/", (req,res) => {
    res.render("index.ejs");
});

//---------Implementações do cadastro de usuários---------

app.get("/users/", (req,res) => {
    let user = new usersDAO();

    user.List(con, (result) => {
        res.render("users/list.ejs", {users: result});
    })
});

app.get("/users/form/", (req,res) => {
    let user = new usersDAO();
    user.setCPF(req.query.cpf);

    user.buscarPorId(con, (result) => {
        res.render("users/form.ejs", {user:result});
    })
});

app.post("/users/save/", (req,res) => {
    let user = new usersDAO();
    user.setCPF(req.body.cpf);
    user.setPassword(req.body.password);
    user.setName(req.body.name);
    user.setBirthDate(req.body.birthDate);
    user.setNationality(req.body.nationality);
    user.setEmail(req.body.email);
    user.setPhone(req.body.phone);

    if (req.body.action == "Inserir") {
        let result = user.Insert(con);
        res.render("result.ejs");
    }
    else if (req.body.action == "Atualizar") {
        let result = user.Update(con);
        res.render("result.ejs");
    }
    else {
        res.redirect("../");
    }
});

app.get("/users/delete/", (req,res) => {
    let user = new usersDAO();
    user.setCPF(req.query.cpf);

    user.Delete(con);
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
    res.render("purchases/form.ejs");
});

app.post("/purchases/save/", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setUser(req.body.user);
    purchase.setGame(req.body.game);

    let retorno = purchase.Insert(con);
    res.render("result.ejs");

    //No sistema, não haverá a possibilidade de atualizar uma compra, somente realizar e cancelar a compra
});

app.get("/purchases/delete/", (req,res) => {
    let purchase = new purchasesDAO();
    purchase.setUser(req.query.cpf_user);
    purchase.setGame(req.query.id_game);

    purchase.Delete(con);
    res.render("result.ejs");
});