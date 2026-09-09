const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

// Obtener todos los usuarios
router.get("/", usuariosController.listarUsuarios);

// Crear un usuario
router.post("/", usuariosController.agregarUsuario);
// agregar usuario
router.put("/:id", usuariosController.actualizarUsuario);
// elimar usuario
router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;