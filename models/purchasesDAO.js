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

    Insert = (connection) => {
        let sql = "INSERT INTO Compras (cpf_cliente, id_jogo) VALUES (?,?)";
        
        connection.query(sql,[this.client,this.game],(err,result) => {
            if (err) throw err;
        })
    }
}