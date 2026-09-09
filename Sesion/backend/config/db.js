const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NAZAREOgood7",
    database: "colegio_fatima"
});

conexion.connect((error) => {
    if (error) {
        console.log("Error al conectar:", error);
        return;
    }

    console.log("✅ Conexión exitosa a MySQL");
});

module.exports = conexion;