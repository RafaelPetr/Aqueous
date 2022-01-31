module.exports = class usersDAO {
    constructor() {
        this.cpf = "";
        this.password = "";
        this.name = "";
        this.birthdate = new Date();
        this.nationality = "";
        this.email = "";
        this.phone = "";
        this.wallet = 0;
    }

    setCPF = (cpf) => {
        if (cpf != undefined) {
            switch (true) {
                case cpf == '':
                    throw "O campo CPF é obrigatório.";
                case cpf.length != 11:
                    throw "O CPF precisa ter 11 caracteres";
                case isNaN(cpf):
                    throw "O CPF precisa conter apenas valores numéricos";
                default:
                    this.cpf = cpf;   
            }
        }
    }

    getCPF = () => {
        return this.cpf;
    }

    setPassword = (password) => {
        switch (true) {
            case password == '':
                throw "O campo senha é obrigatório.";
            case password.length > 8:
                throw "A senha não pode conter mais que 8 caracteres";
            default:
                this.password = password;
        }
    }

    getPassword = () => {
        return this.password;
    }

    setName = (name) => {
        switch (true) {
            case name == '':
                throw "O campo nome é obrigatório.";
            case name.length > 40:
                throw "O nome não pode conter mais que 40 caracteres";
            default:
                this.name = name;
        }
    }

    getName = () => {
        return this.name;
    }

    setBirthdate = (birthdate) => {
        let regExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        switch (true) {
            case birthdate == '':
                throw "O campo data de nascimento é obrigatório.";
            case !regExp.test(birthdate):
                throw "Escreva o ano no formato AAAA-MM-DD";
            default:
                this.birthdate = birthdate;
        }
    }

    getBirthdate = () => {
        return this.birthdate;
    }

    setNationality = (nationality) => {
        switch (true) {
            case nationality == '':
                throw "O campo nacionalidade é obrigatório.";
            case nationality.length > 20:
                throw "A nacionalidade não pode conter mais de 20 caracteres";
            default:
                this.nationality = nationality;
        }
    }

    getNationality = () => {
        return this.nationality;
    }

    setEmail = (email) => {
        let regExp = /^[.A-Za-z0-9!#$%&'*+\?^_`{|}~-]{1,}@[.A-Za-z0-9!#$%&'*+\?^_`{|}~-]{1,}$/;
        switch (true) {
            case email == '':
                throw "O campo e-mail é obrigatório.";
            case !regExp.test(email):
                throw "Escreva o email no formato alguma@coisa";
            case email.length > 100:
                throw "O e-mail não pode conter mais de 100 caracteres";
            default:
                this.email = email;
        }
    }

    getEmail = () => {
        return this.email;
    }

    setPhone = (phone) => {
        let regExp = /^[(][0-9]{2}[)] 9[0-9]{4}-[0-9]{4}$/;
        switch (true) {
            case phone == '':
                throw "O campo telefone é obrigatório.";
            case !regExp.test(phone):
                throw "Escreva o telefone no formato (XX) 9XXXX-XXXX";
            default:
                this.phone = phone;
        }
    }

    getPhone = () => {
        return this.phone;
    }
    
    setWallet = (wallet) => {
        this.wallet = wallet;
    }

    getWallet = () => {
        return this.wallet;
    }

    List = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') as birthdate FROM Users";

        connection.query(sql, (err,result) =>{
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Users (cpf, password, name, birthdate, nationality, email, phone, wallet) VALUES (?,?,?,?,?,?,?,100)";
        connection.query(sql, [this.cpf,this.password,this.name,this.birthdate,this.nationality,this.email,this.phone,this.wallet], (err,result) =>{
            if (err) throw err;
        })
    }

    Delete = (connection) => {
        let sql = "DELETE FROM Users WHERE cpf = ?";

        connection.query(sql, [this.cpf], (err,result) =>{
            if (err) throw err;
        })
    }

    SearchForCPF = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') as birthdate FROM Users WHERE cpf = ?";

        connection.query(sql, [this.cpf], (err,result) =>{
            if (err) throw err;
            return callback(result);
        })
    }

    Login = (connection,callback) => {
        let sql = "SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') as birthdate FROM Users WHERE cpf = ? and password = ?";
        
        connection.query(sql, [this.cpf,this.password], (err,result) =>{
            if (err) throw err;
                return callback(result);
        })
    }

    Update = (connection) => {
        let sql = "UPDATE Users SET password = ?, name = ?, birthdate = ?, nationality = ?, email = ?, phone = ?, wallet = ? WHERE cpf = ?";

        connection.query(sql, [this.password, this.name, this.birthdate, this.nationality, this.email, this.phone, 100, this.cpf], (err,result) =>{
            if (err) throw err;
        })
    }

    UpdateWallet = (connection, payment) => {
        let sql = "UPDATE Users SET wallet = wallet - ? WHERE cpf = ?";
        connection.query(sql, [payment,this.cpf], (err,result) =>{
            if (err) throw err;
        })
    }
}