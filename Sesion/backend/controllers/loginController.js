const db = require("../config/db");

const iniciarSesion = (req, res) => {

    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";

    db.query(sql, [correo, password], (error, resultado) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error del servidor"
            });
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        res.json({
            mensaje: "Inicio de sesión correcto",
            nombre: resultado[0].nombre,
            rol: resultado[0].rol
        });

    });

};

module.exports = {
    iniciarSesion
};