const cursosModel = require("../models/CursosModel");

// Listar cursos
const listarCursos = (req, res) => {

    cursosModel.obtenerCursos((error, cursos) => {

        if (error)
            return res.status(500).json(error);

        res.json(cursos);

    });

};

// Agregar curso
const agregarCurso = (req, res) => {

    cursosModel.crearCurso(req.body, (error, resultado) => {

        if (error)
            return res.status(500).json(error);

        res.json({
            mensaje: "Curso creado correctamente",
            id: resultado.insertId
        });

    });

};

// Actualizar curso
const actualizarCurso = (req, res) => {

    cursosModel.actualizarCurso(req.params.id, req.body, (error) => {

        if (error)
            return res.status(500).json(error);

        res.json({
            mensaje: "Curso actualizado correctamente"
        });

    });

};

// Eliminar curso
const eliminarCurso = (req, res) => {

    cursosModel.eliminarCurso(req.params.id, (error) => {

        if (error)
            return res.status(500).json(error);

        res.json({
            mensaje: "Curso eliminado correctamente"
        });

    });

};

module.exports = {

    listarCursos,
    agregarCurso,
    actualizarCurso,
    eliminarCurso

};