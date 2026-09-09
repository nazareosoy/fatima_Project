const db = require("../config/db");

// Obtener todos los docentes
const obtenerDocentes = (callback) => {

    const sql = "SELECT * FROM docentes";

    db.query(sql, (error, resultados) => {

        if (error) return callback(error);

        callback(null, resultados);

    });

};

// Crear docente
const crearDocente = (docente, callback) => {

    const sql = `
        INSERT INTO docentes
        (nombre, apellido, documento, especialidad, correo, telefono)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        docente.nombre,
        docente.apellido,
        docente.documento,
        docente.especialidad,
        docente.correo,
        docente.telefono

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Actualizar docente
const actualizarDocente = (id, docente, callback) => {

    const sql = `
        UPDATE docentes
        SET
            nombre=?,
            apellido=?,
            documento=?,
            especialidad=?,
            correo=?,
            telefono=?
        WHERE id=?
    `;

    db.query(sql, [

        docente.nombre,
        docente.apellido,
        docente.documento,
        docente.especialidad,
        docente.correo,
        docente.telefono,
        id

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Eliminar docente
const eliminarDocente = (id, callback) => {

    const sql = "DELETE FROM docentes WHERE id=?";

    db.query(sql, [id], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

module.exports = {

    obtenerDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente

};