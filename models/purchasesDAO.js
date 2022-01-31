module.exports = class purchasesDAO {
    constructor() {
        this.user = "";
        this.game = 0;
    }

    setUser = (user) => {
        switch (true) {
            case user == '':
                throw "O campo CPF do usuário é obrigatório.";
            case isNaN(user):
                throw "O CPF do usuário precisa conter apenas valores numéricos";
            case user.length != 11:
                throw "O CPF do usuário precisa ter 11 caracteres.";
            default:
                this.user = user;
        }
    }

    getUser = () => {
        return this.user;
    }

    setGame = (game) => {
        switch (true) {
            case game == '':
                throw "O campo ID do jogo é obrigatório.";
            case isNaN(game):
                throw "O ID do jogo precisa conter apenas valores numéricos";
            case game.length > 11:
                throw "O ID do jogo não pode ter mais de 11 caracteres.";
            default:
                this.game = game;
        }
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

    VerifyUser = (connection, callback) => {
        let sql = "SELECT * FROM Users WHERE cpf = ?";

        connection.query(sql, [this.user], (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    VerifyGame = (connection, callback) => {
        let sql = "SELECT * FROM Games WHERE id = ?";

        connection.query(sql, [this.game], (err,result) => {
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