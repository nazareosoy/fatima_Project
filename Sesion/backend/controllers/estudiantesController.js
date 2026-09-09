const estudiantesModel = require("../models/EstudiantesModel");

// Listar estudiantes
const listarEstudiantes = (req, res) => {

    estudiantesModel.obtenerEstudiantes((error, estudiantes) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al obtener estudiantes",
                error
            });

        }

        res.json(estudiantes);

    });

};

// Agregar estudiante
const agregarEstudiante = (req, res) => {

    const estudiante = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.curso

    };

    estudiantesModel.crearEstudiante(estudiante, (error, resultado) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al crear estudiante",
                error
            });

        }

        res.json({

            mensaje: "Estudiante creado correctamente",
            id: resultado.insertId

        });

    });

};

// Actualizar estudiante
const actualizarEstudiante = (req, res) => {

    const id = req.params.id;

    const estudiante = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.curso

    };

    estudiantesModel.actualizarEstudiante(id, estudiante, (error) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al actualizar estudiante",
                error
            });

        }

        res.json({
            mensaje: "Estudiante actualizado correctamente"
        });

    });

};

// Eliminar estudiante
const eliminarEstudiante = (req, res) => {

    const id = req.params.id;

    estudiantesModel.eliminarEstudiante(id, (error) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al eliminar estudiante",
                error
            });

        }

        res.json({
            mensaje: "Estudiante eliminado correctamente"
        });

    });

};

module.exports = {

    listarEstudiantes,
    agregarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante

};