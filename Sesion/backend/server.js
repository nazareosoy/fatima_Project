const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const usuariosRoutes = require("./routes/usuariosRoutes");
const loginRoutes = require("./routes/loginRoutes");
const estudiantesRoutes = require("./routes/estudiantesRoutes");
const docentesRoutes = require("./routes/docentesRoutes");
const cursosRoutes = require("./routes/cursosRoutes");
const matriculasRoutes = require("./routes/matriculasRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuariosRoutes);
app.use("/estudiantes", estudiantesRoutes);
app.use("/login", loginRoutes);
app.use("/docentes", docentesRoutes);
app.use("/cursos", cursosRoutes);
app.use("/matriculas", matriculasRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor del Colegio Nuestra Señora de Fátima funcionando correctamente 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});