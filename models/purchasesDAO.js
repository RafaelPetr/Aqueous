module.exports = class purchasesDAO {
    constructor() {
        this.user = "";
        this.game = 0;
    }

    setUser = (user) => {
        this.user = user;
    }

    getUser = () => {
        return this.user;
    }

    setGame = (game) => {
        this.game = game;
    }
    
    getGame = () => {
        return this.game;
    }

    List = (connection, callback) => {
        let sql = "SELECT * FROM Purchases";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    SearchForUser = (connection, callback) => {
        let sql = "SELECT * FROM Purchases WHERE cpf_user = ?";

        connection.query(sql, [this.user], (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Purchases (cpf_user, id_game) VALUES (?,?)";
        
        connection.query(sql,[this.user,this.game],(err,result) => {
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Purchases WHERE cpf_user = ? AND id_game = ?";

        connection.query(sql, [this.user,this.game], (err,result) =>{
            if (err) throw err;
        })
    }
}