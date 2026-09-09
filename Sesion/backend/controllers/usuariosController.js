const usuariosModel = require("../models/usuariosModel");

// Obtener todos los usuarios
const listarUsuarios = (req, res) => {

    usuariosModel.obtenerUsuarios((error, resultados) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener usuarios",
                error
            });
        }

        res.json(resultados);

    });

};

// Crear un usuario
const agregarUsuario = (req, res) => {

    const nuevoUsuario = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        password: req.body.password,
        rol: req.body.rol
    };

    usuariosModel.crearUsuario(nuevoUsuario, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al crear usuario",
                error
            });
        }

        res.json({
            mensaje: "Usuario creado correctamente",
            id: resultado.insertId
        });

    });

};
const eliminarUsuario = (req, res) => {

    const id = req.params.id;

    usuariosModel.eliminarUsuario(id, (error) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar usuario"
            });
        }

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    });

};const actualizarUsuario = (req, res) => {

    const id = req.params.id;

    const usuario = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        password: req.body.password,
        rol: req.body.rol
    };

    usuariosModel.actualizarUsuario(id, usuario, (error) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al actualizar usuario",
                error
            });
        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    });

};
module.exports = {
       listarUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario

};