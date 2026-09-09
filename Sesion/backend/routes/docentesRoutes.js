const express = require("express");
const router = express.Router();

const docentesController = require("../controllers/docentesController");

// Obtener todos los docentes
router.get("/", docentesController.listarDocentes);

// Crear docente
router.post("/", docentesController.agregarDocente);

// Actualizar docente
router.put("/:id", docentesController.actualizarDocente);

// Eliminar docente
router.delete("/:id", docentesController.eliminarDocente);

module.exports = router;