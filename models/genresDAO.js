module.exports = class genresDAO {
    constructor() {
        this.id = 0;
        this.name = "";
    }

    setId = (id) => {
        this.id = id;
    }

    getId = () => {
        return this.id;
    }

    setName = (name) => {
        switch (true) {
            case name == '':
                throw "O campo nome é obrigatório.";
            case name.length > 50:
                throw "O nome do gênero não pode conter mais de 50 caracteres.";
            default:
                this.name = name;
        }
    }

    getName = () => {
        return this.name;
    }

    List = (connection, callback) => {
        let sql = "SELECT * FROM Genres";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Genres (name) VALUES (?)";

        connection.query(sql, [this.name], (err,result) =>{
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Genres WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
        })
    }

    SearchForId = (connection, callback) => {
        let sql = "SELECT * FROM Genres WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
            return callback(result);
        })
    }

    Update = (connection) => {
        let sql = "UPDATE Genres SET name = ? WHERE id = ?";

        connection.query(sql, [this.name, this.id], (err,result) =>{
            if (err) throw err;
        })
    }
}