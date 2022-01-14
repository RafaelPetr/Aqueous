module.exports = class games_genresDAO {
    constructor() {
        this.id_game = 0;
        this.id_genre = 0;
    }

    setId_Game = (id) => {
        this.id_game = id;
    }

    getId_Game = () => {
        return this.id_game;
    }

    setId_Genre = (id) => {
        this.id_genre = id;
    }

    getId_Genre = () => {
        return this.id_genre;
    }

    List = (connection, callback) => {
        let sql = "SELECT * FROM Games_Genres";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Games_Genres (id_genre,id_game) VALUES (?,?)";
        if (this.id_game <= 0) {
            sql = "INSERT INTO Games_Genres (id_genre,id_game) VALUES (?,LAST_INSERT_ID())";
        }

        connection.query(sql, [this.id_genre,this.id_game], (err,result) =>{
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Games_Genres WHERE id_game = ?";

        connection.query(sql, [this.id_game], (err,result) =>{
            if (err) throw err;
        })
    }
}