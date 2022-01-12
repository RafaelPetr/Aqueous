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
        let sql = "SELECT * FROM Compras";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Compras (cpf_usere, id_jogo) VALUES (?,?)";
        
        connection.query(sql,[this.user,this.game],(err,result) => {
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Compras WHERE cpf_usere = ? AND id_jogo = ?";

        connection.query(sql, [this.user,this.game], (err,result) =>{
            if (err) throw err;
        })
    }
}