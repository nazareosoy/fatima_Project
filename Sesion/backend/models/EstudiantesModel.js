const db = require("../config/db");

// Obtener estudiantes
const obtenerEstudiantes = (callback) => {

    const sql = "SELECT * FROM estudiantes";

    db.query(sql, (error, resultados) => {

        if (error) return callback(error);

        callback(null, resultados);

    });

};

// Crear estudiante
const crearEstudiante = (estudiante, callback) => {

    const sql = `
        INSERT INTO estudiantes
        (nombre, apellido, documento, correo, telefono, curso)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        estudiante.nombre,
        estudiante.apellido,
        estudiante.documento,
        estudiante.correo,
        estudiante.telefono,
        estudiante.curso

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Actualizar estudiante
const actualizarEstudiante = (id, estudiante, callback) => {

    const sql = `
        UPDATE estudiantes
        SET
            nombre=?,
            apellido=?,
            documento=?,
            correo=?,
            telefono=?,
            curso=?
        WHERE id=?
    `;

    db.query(sql, [

        estudiante.nombre,
        estudiante.apellido,
        estudiante.documento,
        estudiante.correo,
        estudiante.telefono,
        estudiante.curso,
        id

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Eliminar estudiante
const eliminarEstudiante = (id, callback) => {

    const sql = "DELETE FROM estudiantes WHERE id=?";

    db.query(sql, [id], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

module.exports = {

    obtenerEstudiantes,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante

};