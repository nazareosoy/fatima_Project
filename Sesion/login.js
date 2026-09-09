console.log("LOGIN.JS CARGADO");
const API_URL = "http://localhost:3000";

const formulario = document.getElementById("loginForm");

if (formulario) {
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;

        if (!correo || !password) {
            alert("Por favor, completa el correo y la contraseña.");
            return;
        }

        try {
            const respuesta = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo, password })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.mensaje || "Correo o contraseña incorrectos.");
                return;
            }

            // Guardamos únicamente los datos necesarios para mostrar
            // información básica en el panel durante esta sesión local.
            localStorage.setItem("usuarioSesion", JSON.stringify({
                nombre: datos.nombre,
                rol: datos.rol
            }));

            console.log("Redirigiendo al panel...");
            window.location.href = "../panel/panel.html";
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:3000.");
        }
    });
}

// ===============================
// REGISTRO DE USUARIOS
// ===============================

const abrirRegistro = document.getElementById("abrirRegistro");
const modalRegistro = document.getElementById("modalRegistro");
const cerrarRegistro = document.getElementById("cerrarRegistro");
const formularioRegistro = document.getElementById("formularioRegistro");

console.log("ENLACE REGISTRO:", abrirRegistro);
console.log("MODAL REGISTRO:", modalRegistro);
console.log("FORMULARIO REGISTRO:", formularioRegistro);


// Abrir formulario de registro
if (abrirRegistro) {

    abrirRegistro.addEventListener("click", (e) => {

        e.preventDefault();

        console.log("CLICK EN REGÍSTRATE");

        modalRegistro.classList.add("activo");

    });

}


// Cerrar formulario de registro
if (cerrarRegistro) {

    cerrarRegistro.addEventListener("click", () => {

        modalRegistro.classList.remove("activo");

    });

}


// Registrar usuario
if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nombre =
            document.getElementById("registroNombre").value.trim();

        const correo =
            document.getElementById("registroCorreo").value.trim();

        const password =
            document.getElementById("registroPassword").value;

        const confirmarPassword =
            document.getElementById("registroConfirmarPassword").value;

        const rol =
            document.getElementById("registroRol").value;


        if (!nombre || !correo || !password || !confirmarPassword) {

            alert("Por favor, completa todos los campos.");

            return;

        }


        if (password !== confirmarPassword) {

            alert("Las contraseñas no coinciden.");

            return;

        }
        console.log("Enviando usuario al backend...");

        try {

            const respuesta = await fetch(`${API_URL}/usuarios`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nombre,
                    correo,
                    password,
                    rol
                })

            });


            const datos = await respuesta.json();

            console.log("Respuesta del servidor:", datos);

            if (!respuesta.ok) {

                alert(datos.mensaje || "No fue posible registrar el usuario.");

                return;

            }


            alert("Usuario registrado correctamente.");

            formularioRegistro.reset();

            modalRegistro.classList.remove("activo");


        } catch (error) {

            console.error("Error al registrar usuario:", error);

            alert(
                "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
            );

        }

    });

}