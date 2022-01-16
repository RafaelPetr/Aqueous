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
        this.cpf = cpf;
    }

    getCPF = () => {
        return this.cpf;
    }

    setPassword = (password) => {
        this.password = password;
    }

    getPassword = () => {
        return this.password;
    }

    setName = (name) => {
        this.name = name;
    }

    getName = () => {
        return this.name;
    }

    setBirthdate = (birthdate) => {
        this.birthdate = birthdate;
    }

    getBirthdate = () => {
        return this.birthdate;
    }

    setNationality = (nationality) => {
        this.nationality = nationality;
    }

    getNationality = () => {
        return this.nationality;
    }

    setEmail = (email) => {
        this.email = email;
    }

    getEmail = () => {
        return this.email;
    }

    setPhone = (phone) => {
        this.phone = phone;
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
        let sql = "SELECT * FROM Users";

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

    SearchForId = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(birthdate,'%Y-%m-%d') as birthdate FROM Users WHERE cpf = ?";

        connection.query(sql, [this.cpf], (err,result) =>{
            if (err) throw err;
                return callback(result);
        })
    }

    Login = (connection,callback) => {
        let sql = "SELECT *, DATE_FORMAT(birthdate,'%Y-%m-%d') as birthdate FROM Users WHERE cpf = ? and password = ?";
        
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
}