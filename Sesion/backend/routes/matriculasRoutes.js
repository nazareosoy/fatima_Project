const express = require("express");

const router = express.Router();

const matriculasController = require("../controllers/matriculasController");

router.get("/", matriculasController.listarMatriculas);

router.post("/", matriculasController.agregarMatricula);

router.put("/:id", matriculasController.actualizarMatricula);

router.delete("/:id", matriculasController.eliminarMatricula);

module.exports = router;