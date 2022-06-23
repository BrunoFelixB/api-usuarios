const bcrypt = require("bcrypt")
const mysql = require("mysql2")
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "password",
    database: 'database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//método para fazer login no banco de dados.

const login = (req, res) => {

    const email = req.body.email
    const password = req.body.password

    pool.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {

        if (err) {
            res.send(err)
        }

        if (result.length > 0) {

            const validPassword = bcrypt.compareSync(password, result[0].password)

            if (!validPassword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }

            const { idusers, name, email } = result[0]

            const token = jwt.sign({ name: result[0].password }, SECRET)

            res.status(200).send({
                user: {
                    idusers,
                    name,
                    email
                },
                message: "Login autorizado",
                token
            })

        } else {
            res.send({
                message: "úsuario ou senha incorretos",
                email
            })
        }

    })

}

//método para verificar o Token.

const checkToken = (req, res, next) => {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Acesso Negado!",
      });
    }

    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (e) {
      return res.status(500).json({
        message: "Por favor insira um token válido!",
      });
    }
}


module.exports = {
    login,
    checkToken
}