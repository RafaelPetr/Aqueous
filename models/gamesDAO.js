module.exports = class gamesDAO {
    constructor() {
        this.id = 0;
        this.title = "";
        this.genre = "";
        this.developer = "";
        this.publication = new Date();
        this.price = 0;
    }

    setId = (id) => {
        this.id = id;
    }

    getId = () => {
        return this.id;
    }

    setTitle = (title) => {
        this.title = title;
    }

    getTitle = () => {
        return this.title;
    }

    setGenre = (genre) => {
        this.genre = genre;
    }

    getGenre = () => {
        return this.genre;
    }

    setDeveloper = (developer) => {
        this.developer = developer;
    }

    getDeveloper = () => {
        return this.developer;
    }

    setPublication = (publication) => {
        this.publication = publication;
    }

    getPublication = () => {
        return this.publication;
    }

    setPrice = (price) => {
        this.price = price;
    }

    getPrice = () => {
        return this.price;
    }

    List = (connection, callback) => {
        let sql = "SELECT * FROM Jogos";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Jogos (titulo, genero, desenvolvedor, data_publicacao, preco) VALUES (?,?,?,?,?)";

        connection.query(sql, [this.title,this.genre,this.developer,this.publication,this.price], (err,result) =>{
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Jogos WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
        })
    }

    buscarPorId = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(data_publicacao, '%Y-%m-%d') as data_publicacao FROM Jogos WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
                return callback(result);
        })
    }

    Update = (connection) => {
        let sql = "UPDATE Jogos SET titulo = ?, genero = ?, desenvolvedor = ?, data_publicacao = ?, preco = ? WHERE id = ?";

        connection.query(sql, [this.title, this.genre, this.developer, this.publication, this.price, this.id], (err,result) =>{
            if (err) throw err;
        })
    }
}