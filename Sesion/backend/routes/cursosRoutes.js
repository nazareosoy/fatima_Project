const express = require("express");

const router = express.Router();

const cursosController = require("../controllers/cursosController");

router.get("/", cursosController.listarCursos);

router.post("/", cursosController.agregarCurso);

router.put("/:id", cursosController.actualizarCurso);

router.delete("/:id", cursosController.eliminarCurso);

module.exports = router;