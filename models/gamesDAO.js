module.exports = class gamesDAO {
    constructor() {
        this.id = 0;
        this.title = "";
        this.publication = new Date();
        this.price = 0;
        this.description = "";
        this.image = "";
        this.executable = "";
        this.cpf_developer = "";
    }

    setId = (id) => {
        this.id = id;
    }

    getId = () => {
        return this.id;
    }

    setTitle = (title) => {
        switch (true) {
            case title == '':
                throw "O campo título é obrigatório.";
            case title.length > 50:
                throw "O título não pode possuir mais de 50 caracteres.";
            default:
                this.title = title;
        }
    }

    getTitle = () => {
        return this.title;
    }

    setDeveloper = (developer) => {
        switch (true) {
            case developer == '':
                throw "O campo CPF do desenvolvedor é obrigatório.";
            case isNaN(developer):
                throw "O CPF do desenvolver precisa conter apenas valores numéricos";
            case developer.length != 11:
                throw "O CPF do desenvolvedor precisa ter 11 caracteres.";
            default:
                this.cpf_developer = developer;
        }
    }

    getDeveloper = () => {
        return this.cpf_developer;
    }

    setPublication = (publication) => {
        this.publication = publication;
    }

    getPublication = () => {
        return this.publication;
    }

    setPrice = (price) => {
        switch (true) {
            case price == '':
                throw "O campo preço é obrigatório";
            case isNaN(price):
                throw "O preço precisa ser um valor numérico.";
            default:
                this.price = price;
        }
    }

    getPrice = () => {
        return this.price;
    }

    setDescription = (description) => {
        switch (true) {
            case description == '':
                throw "O campo descrição é obrigatório";
            case description.length > 250:
                throw "A descrição não pode possuir mais de 250 caracteres.";
            default:
                this.description = description;
        }
    }

    getDescription = () => {
        return this.description;
    }

    setImage = (image) => {
        let regExp = /^[a-zA-Z0-9]{1,}[.][a-zA-Z0-9]{1,}$/;
        switch (true) {
            case image.length > 20:
                throw "O nome do arquivo da imagem não pode ter mais de 20 caracteres (contando o nome da extensão).";
            case !regExp.test(image):
                throw "O nome do arquivo da imagem precisa ser no formato 'nome.extensão'";
            default:
                this.image = "placeholder.png"; //Manter arquivo como placeholder para o funcionamento do site (não foi adicionada funcionalidade de upload de arquivos)
                //this.image = image;
        }
    }

    getImage = () => {
        return this.image;
    }

    setExecutable = (executable) => {
        let regExp = /^[a-zA-Z0-9]{1,}[.][a-zA-Z0-9]{1,}$/;
        switch (true) {
            case executable.length > 20:
                throw "O nome do arquivo do executável não pode ter mais de 20 caracteres (contando o nome da extensão).";
            case !regExp.test(executable):
                throw "O nome do arquivo do executável precisa ser no formato 'nome.extensão'";
            default:
                this.executable = "placeholder.ejs"; //Manter arquivo como placeholder para o funcionamento do site (não foi adicionada funcionalidade de upload de arquivos)
                //this.executable = executable;
        }
    }

    getExecutable = () => {
        return this.executable;
    }

    List = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(publication, '%d/%m/%Y') as publication FROM Games";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Games (title, publication, price, description, image, executable, cpf_developer) VALUES (?,?,?,?,?,?,?)";

        connection.query(sql, [this.title,this.publication,this.price,this.description,this.image,this.executable,this.cpf_developer], (err,result) =>{
            if (err) throw err;
        })
    }
    
    Delete = (connection) => {
        let sql = "DELETE FROM Games WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
        })
    }

    SearchForId = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(publication, '%d/%m/%Y') as publication FROM Games WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
            return callback(result);
        })
    }

    SearchForDeveloper = (connection, callback) => {
        let sql = "SELECT *, DATE_FORMAT(publication, '%d/%m/%Y') as publication FROM Games WHERE cpf_developer = ?";

        connection.query(sql, [this.cpf_developer], (err,result) =>{
            if (err) throw err;
            return callback(result);
        })
    }

    Update = (connection) => {
        let sql = "UPDATE Games SET title = ?, price = ?, description = ?, image = ?, executable = ?, cpf_developer = ? WHERE id = ?";

        connection.query(sql, [this.title, this.price, this.description, this.image, this.executable, this.cpf_developer, this.id], (err,result) =>{
            if (err) throw err;
        })
    }
}