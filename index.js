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
const genresDAO = require("./models/genresDAO");
const games_genresDAO = require("./models/games_genresDAO");
const { DATE } = require("mysql/lib/protocol/constants/types");

//---------Implementações da home page---------

app.get("/", (req,res) => {
    let games = new gamesDAO();
    let genres = new genresDAO();
    let games_genres = new games_genresDAO();

    games.List(con, (resultGames) => {
        genres.List(con, (resultGenres) => {
            games_genres.List(con, (resultGames_Genres) => {
                res.render("index.ejs", {games:resultGames,genres:resultGenres,games_genres:resultGames_Genres});
            })
        })
    })
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

    user.SearchForId(con, (result) => {
        res.render("users/form.ejs", {user:result});
    })
});

app.post("/users/save/", (req,res) => {
    let user = new usersDAO();
    user.setCPF(req.body.cpf);
    user.setPassword(req.body.password);
    user.setName(req.body.name);
    user.setBirthdate(req.body.birthdate);
    user.setNationality(req.body.nationality);
    user.setEmail(req.body.email);
    user.setPhone(req.body.phone);

    if (req.body.action == "Inserir") {
        user.setWallet(100);
        let result = user.Insert(con);
        res.render("result.ejs");
    }
    else if (req.body.action == "Atualizar") {
        user.setWallet(req.body.wallet);
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
    let genre = new genresDAO();
    game.setId(req.query.id);

    game.SearchForId(con, (resultGames) => {
        genre.List(con, (resultGenres) => {
            res.render("games/form.ejs", {game:resultGames,genres:resultGenres});
        })
    })
});

app.post("/games/save/", (req,res) => {
    let game = new gamesDAO();
    game.setId(req.body.id);
    game.setTitle(req.body.title);
    game.setDeveloper(req.body.developer);
    game.setPublication(new Date());
    game.setPrice(req.body.price);
    game.setDescription(req.body.description);

    //Manter arquivos como o placeholder padrão para o funcionamento da home page em construção
    game.setImage("placeholder.png");
    game.setExecutable("placeholder.html");

    let games_genres = new games_genresDAO();
    let genres = req.body.genres;

    if (genres == undefined) {
        genres = [];
    }

    if (req.body.action == "Salvar") {
        if (game.getId() <= 0) {
            let retornoGame = game.Insert(con);

            //Relaciona jogo com a tabela de gêneros
            genres.forEach(genre => {
                games_genres.setId_Genre(genre);
                let retornoGames_Genres = games_genres.Insert(con);
            });

            res.render("result.ejs");
        }
        else {
            let retorno = game.Update(con);

            //Relaciona jogo com a tabela de gêneros
            games_genres.setId_Game(game.getId());
            games_genres.Delete(con);
            genres.forEach(genre => {
                games_genres.setId_Genre(genre);
                let retornoGames_Genres = games_genres.Insert(con);
            });

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

//---------Implementações do cadastro de gêneros---------

app.get("/genres/", (req,res) => {
    let genre = new genresDAO();

    genre.List(con, (result) => {
        res.render("genres/list.ejs", {genres: result});
    })
});

app.get("/genres/form/", (req,res) => {
    let genre = new genresDAO();
    genre.setId(req.query.id);

    genre.SearchForId(con, (result) => {
        res.render("genres/form.ejs", {genre:result});
    })
});

app.post("/genres/save/", (req,res) => {
    let genre = new genresDAO();
    genre.setId(req.body.id);
    genre.setName(req.body.name);

    if (req.body.action == "Salvar") {
        if (genre.getId() <= 0) {
            let retorno = genre.Insert(con);
            res.render("result.ejs");
        }
        else {
            let retorno = genre.Update(con);
            res.render("result.ejs");
        }
    }
    else {
        res.redirect("../");
    }
});

app.get("/genres/delete/", (req,res) => {
    let genre = new genresDAO();
    genre.setId(req.query.id);

    genre.Delete(con);
    res.render("result.ejs");
});