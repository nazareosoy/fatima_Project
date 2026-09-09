const db = require("../config/db");

// Obtener todas las matrículas
const obtenerMatriculas = (callback) => {

    const sql = "SELECT * FROM matriculas";

    db.query(sql, (error, resultados) => {

        if (error) return callback(error);

        callback(null, resultados);

    });

};

// Crear matrícula
const crearMatricula = (matricula, callback) => {

    const sql = `
        INSERT INTO matriculas
        (estudiante_id, curso_id, fecha, estado)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [

        matricula.estudiante_id,
        matricula.curso_id,
        matricula.fecha,
        matricula.estado

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Actualizar matrícula
const actualizarMatricula = (id, matricula, callback) => {

    const sql = `
        UPDATE matriculas
        SET
            estudiante_id=?,
            curso_id=?,
            fecha=?,
            estado=?
        WHERE id=?
    `;

    db.query(sql, [

        matricula.estudiante_id,
        matricula.curso_id,
        matricula.fecha,
        matricula.estado,
        id

    ], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

// Eliminar matrícula
const eliminarMatricula = (id, callback) => {

    const sql = "DELETE FROM matriculas WHERE id=?";

    db.query(sql, [id], (error, resultado) => {

        if (error) return callback(error);

        callback(null, resultado);

    });

};

module.exports = {

    obtenerMatriculas,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula

};