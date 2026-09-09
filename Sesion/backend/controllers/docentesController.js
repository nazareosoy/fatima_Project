const docentesModel = require("../models/DocentesModel");

// Listar docentes
const listarDocentes = (req, res) => {

    docentesModel.obtenerDocentes((error, docentes) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al obtener docentes",
                error
            });

        }

        res.json(docentes);

    });

};

// Agregar docente
const agregarDocente = (req, res) => {

    const docente = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        especialidad: req.body.especialidad,
        correo: req.body.correo,
        telefono: req.body.telefono

    };

    docentesModel.crearDocente(docente, (error, resultado) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al crear docente",
                error
            });

        }

        res.json({

            mensaje: "Docente creado correctamente",
            id: resultado.insertId

        });

    });

};

// Actualizar docente
const actualizarDocente = (req, res) => {

    const id = req.params.id;

    const docente = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        especialidad: req.body.especialidad,
        correo: req.body.correo,
        telefono: req.body.telefono

    };

    docentesModel.actualizarDocente(id, docente, (error) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al actualizar docente",
                error
            });

        }

        res.json({
            mensaje: "Docente actualizado correctamente"
        });

    });

};

// Eliminar docente
const eliminarDocente = (req, res) => {

    const id = req.params.id;

    docentesModel.eliminarDocente(id, (error) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al eliminar docente",
                error
            });

        }

        res.json({
            mensaje: "Docente eliminado correctamente"
        });

    });

};

module.exports = {

    listarDocentes,
    agregarDocente,
    actualizarDocente,
    eliminarDocente

};