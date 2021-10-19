module.exports = class clientsDAO {
    constructor() {
        this.cpf = "";
        this.password = "";
        this.name = "";
        this.birthDate = new Date();
        this.nationality = "";
        this.email = "";
        this.phone = "";
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

    setBirthDate = (birthDate) => {
        this.birthDate = birthDate;
    }

    getBirthDate = () => {
        return this.birthDate;
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

    Insert = (connection) => {
        let sql = "INSERT INTO Clientes (cpf, senha, nome, data_nascimento, nacionalidade, email, telefone) VALUES (?,?,?,?,?,?,?)";

        connection.query(sql, [this.cpf,this.password,this.name,this.birthDate,this.nationality,this.email,this.phone], (err,result) =>{
            if (err) throw err;
        })
    } 
}