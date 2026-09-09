const db = require("../config/db");

// Obtener cursos
const obtenerCursos = (callback) => {

    const sql = "SELECT * FROM cursos";

    db.query(sql, (error, resultados) => {

        if (error) return callback(error);

        callback(null, resultados);

    });

};

// Crear curso
const crearCurso = (curso, callback) => {

    const sql = `
        INSERT INTO cursos
        (nombre, grado, jornada, descripcion)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [

        curso.nombre,
        curso.grado,
        curso.jornada,
        curso.descripcion

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Actualizar curso
const actualizarCurso = (id, curso, callback) => {

    const sql = `
        UPDATE cursos
        SET
            nombre=?,
            grado=?,
            jornada=?,
            descripcion=?
        WHERE id=?
    `;

    db.query(sql, [

        curso.nombre,
        curso.grado,
        curso.jornada,
        curso.descripcion,
        id

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Eliminar curso
const eliminarCurso = (id, callback) => {

    const sql = "DELETE FROM cursos WHERE id=?";

    db.query(sql, [id], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

module.exports = {

    obtenerCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso

};