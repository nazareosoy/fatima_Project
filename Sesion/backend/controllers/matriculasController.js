const matriculasModel = require("../models/MatriculasModel");

// Listar matrículas
const listarMatriculas = (req, res) => {

    matriculasModel.obtenerMatriculas((error, matriculas) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener matrículas",
                error
            });
        }

        res.json(matriculas);

    });

};

// Agregar matrícula
const agregarMatricula = (req, res) => {

    const matricula = {

        estudiante_id: req.body.estudiante_id,
        curso_id: req.body.curso_id,
        fecha: req.body.fecha,
        estado: req.body.estado

    };

    matriculasModel.crearMatricula(matricula, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al crear matrícula",
                error
            });
        }

        res.json({
            mensaje: "Matrícula creada correctamente",
            id: resultado.insertId
        });

    });

};

// Actualizar matrícula
const actualizarMatricula = (req, res) => {

    const id = req.params.id;

    const matricula = {

        estudiante_id: req.body.estudiante_id,
        curso_id: req.body.curso_id,
        fecha: req.body.fecha,
        estado: req.body.estado

    };

    matriculasModel.actualizarMatricula(id, matricula, (error) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al actualizar matrícula",
                error
            });
        }

        res.json({
            mensaje: "Matrícula actualizada correctamente"
        });

    });

};

// Eliminar matrícula
const eliminarMatricula = (req, res) => {

    const id = req.params.id;

    matriculasModel.eliminarMatricula(id, (error) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar matrícula",
                error
            });
        }

        res.json({
            mensaje: "Matrícula eliminada correctamente"
        });

    });

};

module.exports = {

    listarMatriculas,
    agregarMatricula,
    actualizarMatricula,
    eliminarMatricula

};