const bcrypt = require("bcrypt")
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "password",
    database: 'database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//método para verificar se a API está funcionando.

const home = (req, res) => {

    try {

        res.status(200).send({
            "messsage": "Api Funcionando!"
        })

    } catch (err) {
        res.status(200).send({
            "messsage": "Algo está errado",
            err
        })
    }

}

//método para criar usuários no banco de dados.

const createUser = async (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const name = req.body.name
    const email = req.body.email

    pool.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {

        if (err) {
            res.send(err);
        }

        if (result.length == 0) {
            pool.query(
                "INSERT INTO users (name,email,password) VALUES (?, ?, ?)",
                [name, email, hashedPassword], (err, result) => {
                    if (err) {
                        res.send(err);
                    }

                    res.status(200).send({
                        "messsage": "usuario cadastrado com sucesso",
                        email,
                    })
                }
            );
        } else {
            res.status(400).send({
                "messsage": "Este usuário já existe",
            });
        }
    });
}

//método para criar produtos no banco de dados.

const createProductor = async (req, res) => {

    const name = req.body.name
    const descr = req.body.descr
    const price = req.body.price

    pool.query("SELECT * FROM produtos WHERE name = ?", [name], (err, result) => {

        if (err) {
            res.send(err);
        }

        if (result.length == 0) {
            pool.query(
                "INSERT INTO produtos (name, descr, price) VALUES (?, ?, ?)",
                [name, descr, price], (errr, results) => {
                    if (errr) {
                        res.send(err);
                    }

                    const id  = results.insertId

                    res.status(200).send({
                        "messsage": "Produto criado com sucesso!",
                        produto: {
                            id,
                            name,
                            descr,
                            price
                        }
                    })
                }
            );
        } else {
            res.status(400).send({
                "messsage": "O produto já existe",
            });
        }
    });
}

//método para consultar produtos no banco de dados.

const getAll = async (req, res) => {

    pool.query("SELECT * FROM produtos ", (err, result) => {

        if (err) {
            res.send(err);

        } else {
            res.status(200).send(result);
        }
    });

}

//método para atualizar produtos no banco de dados.

const updateProductor = async (req, res) => {

    const id = req.body.id
    const name = req.body.name
    const descr = req.body.descr
    const price = req.body.price

    pool.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {

        if (err) {
            res.send(err);
        }

        if (result.length != 0) {
            pool.query("UPDATE produtos SET name = ?, descr = ?, price = ? WHERE idprodutos = ?", [name, descr, price, id], (err, result) => {
                    if (err) {
                        res.send(err);
                    }

                    res.status(200).send({
                        "messsage": "Produto editado com sucesso!",
                        produto: {
                            name,
                            descr,
                            price
                        }
                    })
                }
            );
        } else {
            res.status(400).send({
                "messsage": "id do produto produto não existe",
            });
        }
    });
}


//método para deletar produtos no banco de dados.

const deleteById = async (req, res) => {

    const id = req.params.id

    pool.query("SELECT * FROM produtos WHERE idprodutos = ?", [id], (err, result) => {

        if (err) {
            res.send(err);
        }

        if (result.length != 0) {
            pool.query("DELETE FROM produtos WHERE idprodutos = ?", [id], (err, result) => {
                    if (err) {
                        res.send(err);
                    }

                    res.status(200).send({
                        "messsage": "Produto excluido com sucesso!",
                    })
                }
            );
        } else {
            res.status(400).send({
                "messsage": "id do produto produto não existe",
            });
        }
    });
}


module.exports = {
    home,
    createUser,
    createProductor,
    updateProductor,
    getAll,
    deleteById
}