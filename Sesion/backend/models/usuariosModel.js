const db = require("../config/db");

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
    const sql = "SELECT * FROM usuarios";

    db.query(sql, (error, resultados) => {
        if (error) return callback(error);
        callback(null, resultados);
    });
};

// Crear un usuario
// Crear un usuario
const crearUsuario = (usuario, callback) => {

    const sql = `
        INSERT INTO usuarios
        (nombre, correo, password, rol, rol_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            usuario.nombre,
            usuario.correo,
            usuario.password,
            usuario.rol,
            usuario.rol_id
        ],
        (error, resultado) => {

            if (error) {
                return callback(error);
            }

            callback(null, resultado);

        }
    );
};

const eliminarUsuario = (id, callback) => {
    const sql = "DELETE FROM usuarios WHERE id = ?";

    db.query(sql, [id], (error, resultado) => {
        if (error) return callback(error);
        callback(null, resultado);
    });
};
const actualizarUsuario = (id, usuario, callback) => {
    const sql = `
        UPDATE usuarios
        SET nombre = ?, correo = ?, password = ?, rol = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            usuario.nombre,
            usuario.correo,
            usuario.password,
            usuario.rol,
            id
        ],
        (error, resultado) => {
            if (error) return callback(error);
            callback(null, resultado);
        }
    );
};
// Exportar funciones
module.exports = {
    obtenerUsuarios,
    obtenerRolPorNombre,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};

// Obtener un rol por su nombre
const obtenerRolPorNombre = (nombreRol, callback) => {

    const sql = `
        SELECT id
        FROM roles
        WHERE nombre = ?
    `;

    db.query(sql, [nombreRol], (error, resultados) => {

        if (error) {
            return callback(error);
        }

        callback(null, resultados);

    });

};