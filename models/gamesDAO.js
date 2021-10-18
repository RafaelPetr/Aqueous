module.exports = class gamesDAO {
    constructor() {
        this.title = "";
        this.genre = "";
        this.developer = "";
        this.publication = new Date();
        this.price = 0;
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

    Insert = (connection) => {
        let sql = "INSERT INTO Jogos (titulo, genero, desenvolvedor, data_publicacao, preco) VALUES (?,?,?,?,?)";

        connection.query(sql, [this.title,this.genre,this.developer,this.publication,this.price], (err,result) =>{
            if (err) throw err;
        })
    } 
}