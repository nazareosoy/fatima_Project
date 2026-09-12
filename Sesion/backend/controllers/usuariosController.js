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

    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password || !rol) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    usuariosModel.obtenerRolPorNombre(rol, (errorRol, resultadoRol) => {

        if (errorRol) {
            return res.status(500).json({
                mensaje: "Error al consultar el rol",
                error: errorRol
            });
        }

        if (resultadoRol.length === 0) {
            return res.status(400).json({
                mensaje: "El rol seleccionado no existe"
            });
        }

        const nuevoUsuario = {
            nombre,
            correo,
            password,
            rol,
            rol_id: resultadoRol[0].id
        };

        usuariosModel.crearUsuario(nuevoUsuario, (error, resultado) => {

            if (error) {

                if (error.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        mensaje: "El correo ya está registrado"
                    });
                }

                return res.status(500).json({
                    mensaje: "Error al crear usuario",
                    error
                });
            }

            res.status(201).json({
                mensaje: "Usuario creado correctamente",
                id: resultado.insertId,
                rol_id: nuevoUsuario.rol_id
            });

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

}; const actualizarUsuario = (req, res) => {

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