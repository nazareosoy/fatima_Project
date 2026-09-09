const express = require("express");
const router = express.Router();

const estudiantesController = require("../controllers/estudiantesController");

// Obtener todos los estudiantes
router.get("/", estudiantesController.listarEstudiantes);

// Crear estudiante
router.post("/", estudiantesController.agregarEstudiante);

// Actualizar estudiante
router.put("/:id", estudiantesController.actualizarEstudiante);

// Eliminar estudiante
router.delete("/:id", estudiantesController.eliminarEstudiante);

module.exports = router;