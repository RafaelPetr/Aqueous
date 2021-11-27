module.exports = class purchasesDAO {
    constructor() {
        this.client = "";
        this.game = 0;
    }

    setClient = (client) => {
        this.client = client;
    }

    getClient = () => {
        return this.client;
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
        let sql = "INSERT INTO Compras (cpf_cliente, id_jogo) VALUES (?,?)";
        
        connection.query(sql,[this.client,this.game],(err,result) => {
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Compras WHERE cpf_cliente = ? AND id_jogo = ?";

        connection.query(sql, [this.client,this.game], (err,result) =>{
            if (err) throw err;
        })
    }
}