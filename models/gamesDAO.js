module.exports = class gamesDAO {
    constructor() {
        this.id = 0;
        this.title = "";
        this.developer = "";
        this.publication = new Date();
        this.price = 0;
        this.description = "";
        this.image = "";
        this.executable = "";
    }

    setId = (id) => {
        this.id = id;
    }

    getId = () => {
        return this.id;
    }

    setTitle = (title) => {
        this.title = title;
    }

    getTitle = () => {
        return this.title;
    }

    setDeveloper = (developer) => {
        this.developer = developer;
    }

    getDeveloper = () => {
        return this.developer;
    }

    setPublication = (publication) => {
        this.publication = publication;
    }

    getPublication = () => {
        return this.publication;
    }

    setPrice = (price) => {
        this.price = price;
    }

    getPrice = () => {
        return this.price;
    }

    setDescription = (description) => {
        this.description = description;
    }

    getDescription = () => {
        return this.description;
    }

    setImage = (image) => {
        this.image = image;
    }

    getImage = () => {
        return this.image;
    }

    setExecutable = (executable) => {
        this.executable = executable;
    }

    getExecutable = () => {
        return this.executable;
    }

    List = (connection, callback) => {
        let sql = "SELECT * FROM Games";

        connection.query(sql, (err,result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    Insert = (connection) => {
        let sql = "INSERT INTO Games (title, developer, publication, price, description, image, executable) VALUES (?,?,?,?,?,?,?)";

        connection.query(sql, [this.title,this.developer,this.publication,this.price,this.description,this.image,this.executable], (err,result) =>{
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
        let sql = "SELECT *, DATE_FORMAT(publication, '%Y-%m-%d') as publication FROM Games WHERE id = ?";

        connection.query(sql, [this.id], (err,result) =>{
            if (err) throw err;
                return callback(result);
        })
    }

    Update = (connection) => {
        let sql = "UPDATE Games SET title = ?, developer = ?, price = ?, description = ?, image = ?, executable = ? WHERE id = ?";

        connection.query(sql, [this.title, this.developer, this.price, this.description, this.image, this.executable, this.id], (err,result) =>{
            if (err) throw err;
        })
    }
}