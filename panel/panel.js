const API_URL = "http://localhost:3000";
const contenido = document.getElementById("contenido");

let idEditar = null;

function escapeHtml(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function mostrarError(error) {
    console.error(error);
    alert("No se pudo completar la operación. Verifica que el backend esté ejecutándose en http://localhost:3000.");
}

function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem("usuarioSesion")) || null;
    } catch {
        return null;
    }
}

function mostrarInicio() {
    const sesion = obtenerSesion();
    const nombre = sesion?.nombre ? escapeHtml(sesion.nombre) : "usuario";
    const rol = sesion?.rol ? escapeHtml(sesion.rol) : "";

    contenido.innerHTML = `
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Desde aquí podrás administrar todo el sistema del Colegio Nuestra Señora de Fátima.</p>
        ${sesion ? `<p><strong>Sesión:</strong> ${nombre}${rol ? ` — ${rol}` : ""}</p>` : ""}
    `;
}

async function obtenerDatos(endpoint) {
    const respuesta = await fetch(`${API_URL}${endpoint}`);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "Error en la API");
    }

    return datos;
}

async function enviarDatos(endpoint, metodo, cuerpo = null) {
    const opciones = { method: metodo };

    if (cuerpo !== null) {
        opciones.headers = { "Content-Type": "application/json" };
        opciones.body = JSON.stringify(cuerpo);
    }

    const respuesta = await fetch(`${API_URL}${endpoint}`, opciones);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "Error en la API");
    }

    return datos;
}

// ==========================
// USUARIOS
// ==========================
document.getElementById("btnUsuarios").addEventListener("click", async (e) => {
    e.preventDefault();
    idEditar = null;

    contenido.innerHTML = `
        <h1>Gestión de Usuarios</h1>
        <form id="formUsuario">
            <input type="text" id="nombre" placeholder="Nombre" required><br><br>
            <input type="email" id="correo" placeholder="Correo" required><br><br>
            <input type="password" id="password" placeholder="Contraseña" required><br><br>
            <select id="rol">
                <option>Administrador</option>
                <option>Docente</option>
                <option>Estudiante</option>
            </select>
            <br><br>
            <button type="submit" id="btnGuardar">Guardar Usuario</button>
        </form>
        <hr>
        <table border="1" width="100%">
            <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead>
            <tbody id="tablaUsuarios"></tbody>
        </table>
    `;

    document.getElementById("formUsuario").addEventListener("submit", guardarUsuario);
    await cargarUsuarios();
});

async function cargarUsuarios() {
    try {
        const usuarios = await obtenerDatos("/usuarios");
        const tabla = document.getElementById("tablaUsuarios");
        if (!tabla) return;

        tabla.innerHTML = usuarios.map(usuario => `
            <tr>
                <td>${escapeHtml(usuario.id)}</td>
                <td>${escapeHtml(usuario.nombre)}</td>
                <td>${escapeHtml(usuario.correo)}</td>
                <td>${escapeHtml(usuario.rol)}</td>
                <td>
                    <button type="button" onclick="editarUsuario(${Number(usuario.id)})">✏️</button>
                    <button type="button" onclick="eliminarUsuario(${Number(usuario.id)})">🗑️</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        mostrarError(error);
    }
}

async function guardarUsuario(e) {
    e.preventDefault();

    const cuerpo = {
        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        password: document.getElementById("password").value,
        rol: document.getElementById("rol").value
    };

    try {
        const endpoint = idEditar === null ? "/usuarios" : `/usuarios/${idEditar}`;
        const metodo = idEditar === null ? "POST" : "PUT";
        const datos = await enviarDatos(endpoint, metodo, cuerpo);

        alert(datos.mensaje);
        idEditar = null;
        document.getElementById("formUsuario").reset();
        document.getElementById("btnGuardar").innerText = "Guardar Usuario";
        await cargarUsuarios();
    } catch (error) {
        mostrarError(error);
    }
}

async function editarUsuario(id) {
    try {
        const usuarios = await obtenerDatos("/usuarios");
        const usuario = usuarios.find(u => Number(u.id) === Number(id));

        if (!usuario) {
            alert("Usuario no encontrado");
            return;
        }

        document.getElementById("nombre").value = usuario.nombre || "";
        document.getElementById("correo").value = usuario.correo || "";
        document.getElementById("password").value = usuario.password || "";
        document.getElementById("rol").value = usuario.rol || "Estudiante";
        idEditar = id;
        document.getElementById("btnGuardar").innerText = "Actualizar Usuario";
    } catch (error) {
        mostrarError(error);
    }
}

async function eliminarUsuario(id) {
    if (!confirm("¿Deseas eliminar este usuario?")) return;

    try {
        const datos = await enviarDatos(`/usuarios/${id}`, "DELETE");
        alert(datos.mensaje);
        await cargarUsuarios();
    } catch (error) {
        mostrarError(error);
    }
}

// ==========================
// ESTUDIANTES
// ==========================
document.getElementById("btnEstudiantes").addEventListener("click", async (e) => {
    e.preventDefault();
    idEditar = null;

    contenido.innerHTML = `
        <h1>Gestión de Estudiantes</h1>
        <form id="formEstudiante">
            <input type="text" id="nombreEst" placeholder="Nombre" required><br><br>
            <input type="text" id="apellidoEst" placeholder="Apellido" required><br><br>
            <input type="text" id="documentoEst" placeholder="Documento" required><br><br>
            <input type="email" id="correoEst" placeholder="Correo"><br><br>
            <input type="text" id="telefonoEst" placeholder="Teléfono"><br><br>
            <input type="text" id="cursoEst" placeholder="Curso"><br><br>
            <button type="submit" id="btnGuardarEstudiante">Guardar Estudiante</button>
        </form>
        <hr>
        <table border="1" width="100%">
            <thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Documento</th><th>Correo</th><th>Curso</th><th>Acciones</th></tr></thead>
            <tbody id="tablaEstudiantes"></tbody>
        </table>
    `;

    document.getElementById("formEstudiante").addEventListener("submit", guardarEstudiante);
    await cargarEstudiantes();
});

async function cargarEstudiantes() {
    try {
        const estudiantes = await obtenerDatos("/estudiantes");
        const tabla = document.getElementById("tablaEstudiantes");
        if (!tabla) return;

        tabla.innerHTML = estudiantes.map(estudiante => `
            <tr>
                <td>${escapeHtml(estudiante.id)}</td>
                <td>${escapeHtml(estudiante.nombre)}</td>
                <td>${escapeHtml(estudiante.apellido)}</td>
                <td>${escapeHtml(estudiante.documento)}</td>
                <td>${escapeHtml(estudiante.correo)}</td>
                <td>${escapeHtml(estudiante.curso)}</td>
                <td>
                    <button type="button" onclick="editarEstudiante(${Number(estudiante.id)})">✏️</button>
                    <button type="button" onclick="eliminarEstudiante(${Number(estudiante.id)})">🗑️</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        mostrarError(error);
    }
}

async function guardarEstudiante(e) {
    e.preventDefault();

    const cuerpo = {
        nombre: document.getElementById("nombreEst").value.trim(),
        apellido: document.getElementById("apellidoEst").value.trim(),
        documento: document.getElementById("documentoEst").value.trim(),
        correo: document.getElementById("correoEst").value.trim(),
        telefono: document.getElementById("telefonoEst").value.trim(),
        curso: document.getElementById("cursoEst").value.trim()
    };

    try {
        const endpoint = idEditar === null ? "/estudiantes" : `/estudiantes/${idEditar}`;
        const metodo = idEditar === null ? "POST" : "PUT";
        const datos = await enviarDatos(endpoint, metodo, cuerpo);
        alert(datos.mensaje);
        idEditar = null;
        document.getElementById("formEstudiante").reset();
        document.getElementById("btnGuardarEstudiante").innerText = "Guardar Estudiante";
        await cargarEstudiantes();
    } catch (error) {
        mostrarError(error);
    }
}

async function editarEstudiante(id) {
    try {
        const estudiantes = await obtenerDatos("/estudiantes");
        const estudiante = estudiantes.find(item => Number(item.id) === Number(id));
        if (!estudiante) return alert("Estudiante no encontrado");

        document.getElementById("nombreEst").value = estudiante.nombre || "";
        document.getElementById("apellidoEst").value = estudiante.apellido || "";
        document.getElementById("documentoEst").value = estudiante.documento || "";
        document.getElementById("correoEst").value = estudiante.correo || "";
        document.getElementById("telefonoEst").value = estudiante.telefono || "";
        document.getElementById("cursoEst").value = estudiante.curso || "";
        idEditar = id;
        document.getElementById("btnGuardarEstudiante").innerText = "Actualizar Estudiante";
    } catch (error) {
        mostrarError(error);
    }
}

async function eliminarEstudiante(id) {
    if (!confirm("¿Deseas eliminar este estudiante?")) return;
    try {
        const datos = await enviarDatos(`/estudiantes/${id}`, "DELETE");
        alert(datos.mensaje);
        await cargarEstudiantes();
    } catch (error) {
        mostrarError(error);
    }
}

// ==========================
// DOCENTES
// ==========================
document.getElementById("btnDocentes").addEventListener("click", async (e) => {
    e.preventDefault();
    idEditar = null;

    contenido.innerHTML = `
        <h1>Gestión de Docentes</h1>
        <form id="formDocente">
            <input type="text" id="nombreDoc" placeholder="Nombre" required><br><br>
            <input type="text" id="apellidoDoc" placeholder="Apellido" required><br><br>
            <input type="text" id="documentoDoc" placeholder="Documento" required><br><br>
            <input type="text" id="especialidadDoc" placeholder="Especialidad"><br><br>
            <input type="email" id="correoDoc" placeholder="Correo"><br><br>
            <input type="text" id="telefonoDoc" placeholder="Teléfono"><br><br>
            <button type="submit" id="btnGuardarDocente">Guardar Docente</button>
        </form>
        <hr>
        <table border="1" width="100%">
            <thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Documento</th><th>Especialidad</th><th>Correo</th><th>Acciones</th></tr></thead>
            <tbody id="tablaDocentes"></tbody>
        </table>
    `;

    document.getElementById("formDocente").addEventListener("submit", guardarDocente);
    await cargarDocentes();
});

async function cargarDocentes() {
    try {
        const docentes = await obtenerDatos("/docentes");
        const tabla = document.getElementById("tablaDocentes");
        if (!tabla) return;

        tabla.innerHTML = docentes.map(docente => `
            <tr>
                <td>${escapeHtml(docente.id)}</td>
                <td>${escapeHtml(docente.nombre)}</td>
                <td>${escapeHtml(docente.apellido)}</td>
                <td>${escapeHtml(docente.documento)}</td>
                <td>${escapeHtml(docente.especialidad)}</td>
                <td>${escapeHtml(docente.correo)}</td>
                <td>
                    <button type="button" onclick="editarDocente(${Number(docente.id)})">✏️</button>
                    <button type="button" onclick="eliminarDocente(${Number(docente.id)})">🗑️</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        mostrarError(error);
    }
}

async function guardarDocente(e) {
    e.preventDefault();

    const cuerpo = {
        nombre: document.getElementById("nombreDoc").value.trim(),
        apellido: document.getElementById("apellidoDoc").value.trim(),
        documento: document.getElementById("documentoDoc").value.trim(),
        especialidad: document.getElementById("especialidadDoc").value.trim(),
        correo: document.getElementById("correoDoc").value.trim(),
        telefono: document.getElementById("telefonoDoc").value.trim()
    };

    try {
        const endpoint = idEditar === null ? "/docentes" : `/docentes/${idEditar}`;
        const metodo = idEditar === null ? "POST" : "PUT";
        const datos = await enviarDatos(endpoint, metodo, cuerpo);
        alert(datos.mensaje);
        idEditar = null;
        document.getElementById("formDocente").reset();
        document.getElementById("btnGuardarDocente").innerText = "Guardar Docente";
        await cargarDocentes();
    } catch (error) {
        mostrarError(error);
    }
}

async function editarDocente(id) {
    try {
        const docentes = await obtenerDatos("/docentes");
        const docente = docentes.find(item => Number(item.id) === Number(id));
        if (!docente) return alert("Docente no encontrado");

        document.getElementById("nombreDoc").value = docente.nombre || "";
        document.getElementById("apellidoDoc").value = docente.apellido || "";
        document.getElementById("documentoDoc").value = docente.documento || "";
        document.getElementById("especialidadDoc").value = docente.especialidad || "";
        document.getElementById("correoDoc").value = docente.correo || "";
        document.getElementById("telefonoDoc").value = docente.telefono || "";
        idEditar = id;
        document.getElementById("btnGuardarDocente").innerText = "Actualizar Docente";
    } catch (error) {
        mostrarError(error);
    }
}

async function eliminarDocente(id) {
    if (!confirm("¿Deseas eliminar este docente?")) return;
    try {
        const datos = await enviarDatos(`/docentes/${id}`, "DELETE");
        alert(datos.mensaje);
        await cargarDocentes();
    } catch (error) {
        mostrarError(error);
    }
}

// ==========================
// CURSOS
// ==========================
document.getElementById("btnCursos").addEventListener("click", async (e) => {
    e.preventDefault();
    idEditar = null;

    contenido.innerHTML = `
        <h1>Gestión de Cursos</h1>
        <form id="formCurso">
            <input type="text" id="nombreCurso" placeholder="Nombre del curso" required><br><br>
            <input type="text" id="gradoCurso" placeholder="Grado" required><br><br>
            <input type="text" id="jornadaCurso" placeholder="Jornada" required><br><br>
            <input type="text" id="descripcionCurso" placeholder="Descripción"><br><br>
            <button type="submit" id="btnGuardarCurso">Guardar Curso</button>
        </form>
        <hr>
        <table border="1" width="100%">
            <thead><tr><th>ID</th><th>Nombre</th><th>Grado</th><th>Jornada</th><th>Descripción</th><th>Acciones</th></tr></thead>
            <tbody id="tablaCursos"></tbody>
        </table>
    `;

    document.getElementById("formCurso").addEventListener("submit", guardarCurso);
    await cargarCursos();
});

async function cargarCursos() {
    try {
        const cursos = await obtenerDatos("/cursos");
        const tabla = document.getElementById("tablaCursos");
        if (!tabla) return;

        tabla.innerHTML = cursos.map(curso => `
            <tr>
                <td>${escapeHtml(curso.id)}</td>
                <td>${escapeHtml(curso.nombre)}</td>
                <td>${escapeHtml(curso.grado)}</td>
                <td>${escapeHtml(curso.jornada)}</td>
                <td>${escapeHtml(curso.descripcion)}</td>
                <td>
                    <button type="button" onclick="editarCurso(${Number(curso.id)})">✏️</button>
                    <button type="button" onclick="eliminarCurso(${Number(curso.id)})">🗑️</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        mostrarError(error);
    }
}

async function guardarCurso(e) {
    e.preventDefault();

    const cuerpo = {
        nombre: document.getElementById("nombreCurso").value.trim(),
        grado: document.getElementById("gradoCurso").value.trim(),
        jornada: document.getElementById("jornadaCurso").value.trim(),
        descripcion: document.getElementById("descripcionCurso").value.trim()
    };

    try {
        const endpoint = idEditar === null ? "/cursos" : `/cursos/${idEditar}`;
        const metodo = idEditar === null ? "POST" : "PUT";
        const datos = await enviarDatos(endpoint, metodo, cuerpo);
        alert(datos.mensaje);
        idEditar = null;
        document.getElementById("formCurso").reset();
        document.getElementById("btnGuardarCurso").innerText = "Guardar Curso";
        await cargarCursos();
    } catch (error) {
        mostrarError(error);
    }
}

async function editarCurso(id) {
    try {
        const cursos = await obtenerDatos("/cursos");
        const curso = cursos.find(item => Number(item.id) === Number(id));
        if (!curso) return alert("Curso no encontrado");

        document.getElementById("nombreCurso").value = curso.nombre || "";
        document.getElementById("gradoCurso").value = curso.grado || "";
        document.getElementById("jornadaCurso").value = curso.jornada || "";
        document.getElementById("descripcionCurso").value = curso.descripcion || "";
        idEditar = id;
        document.getElementById("btnGuardarCurso").innerText = "Actualizar Curso";
    } catch (error) {
        mostrarError(error);
    }
}

async function eliminarCurso(id) {
    if (!confirm("¿Deseas eliminar este curso?")) return;
    try {
        const datos = await enviarDatos(`/cursos/${id}`, "DELETE");
        alert(datos.mensaje);
        await cargarCursos();
    } catch (error) {
        mostrarError(error);
    }
}

// ==========================
// MATRÍCULAS
// ==========================
document.getElementById("btnMatriculas").addEventListener("click", async (e) => {
    e.preventDefault();
    idEditar = null;

    contenido.innerHTML = `
        <h1>Gestión de Matrículas</h1>
        <form id="formMatricula">
            <input type="number" id="estudianteId" placeholder="ID del estudiante" min="1" required><br><br>
            <input type="number" id="cursoId" placeholder="ID del curso" min="1" required><br><br>
            <input type="date" id="fechaMatricula" required><br><br>
            <select id="estadoMatricula">
                <option>Activa</option>
                <option>Inactiva</option>
                <option>Cancelada</option>
            </select>
            <br><br>
            <button type="submit" id="btnGuardarMatricula">Guardar Matrícula</button>
        </form>
        <hr>
        <table border="1" width="100%">
            <thead><tr><th>ID</th><th>Estudiante</th><th>Curso</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody id="tablaMatriculas"></tbody>
        </table>
    `;

    document.getElementById("formMatricula").addEventListener("submit", guardarMatricula);
    await cargarMatriculas();
});

function formatearFecha(fecha) {
    if (!fecha) return "";
    const valor = String(fecha).slice(0, 10);
    return valor;
}

async function cargarMatriculas() {
    try {
        const matriculas = await obtenerDatos("/matriculas");
        const tabla = document.getElementById("tablaMatriculas");
        if (!tabla) return;

        tabla.innerHTML = matriculas.map(matricula => `
            <tr>
                <td>${escapeHtml(matricula.id)}</td>
                <td>${escapeHtml(matricula.estudiante_id)}</td>
                <td>${escapeHtml(matricula.curso_id)}</td>
                <td>${escapeHtml(formatearFecha(matricula.fecha))}</td>
                <td>${escapeHtml(matricula.estado)}</td>
                <td>
                    <button type="button" onclick="editarMatricula(${Number(matricula.id)})">✏️</button>
                    <button type="button" onclick="eliminarMatricula(${Number(matricula.id)})">🗑️</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        mostrarError(error);
    }
}

async function guardarMatricula(e) {
    e.preventDefault();

    const cuerpo = {
        estudiante_id: Number(document.getElementById("estudianteId").value),
        curso_id: Number(document.getElementById("cursoId").value),
        fecha: document.getElementById("fechaMatricula").value,
        estado: document.getElementById("estadoMatricula").value
    };

    try {
        const endpoint = idEditar === null ? "/matriculas" : `/matriculas/${idEditar}`;
        const metodo = idEditar === null ? "POST" : "PUT";
        const datos = await enviarDatos(endpoint, metodo, cuerpo);
        alert(datos.mensaje);
        idEditar = null;
        document.getElementById("formMatricula").reset();
        document.getElementById("btnGuardarMatricula").innerText = "Guardar Matrícula";
        await cargarMatriculas();
    } catch (error) {
        mostrarError(error);
    }
}

async function editarMatricula(id) {
    try {
        const matriculas = await obtenerDatos("/matriculas");
        const matricula = matriculas.find(item => Number(item.id) === Number(id));
        if (!matricula) return alert("Matrícula no encontrada");

        document.getElementById("estudianteId").value = matricula.estudiante_id || "";
        document.getElementById("cursoId").value = matricula.curso_id || "";
        document.getElementById("fechaMatricula").value = formatearFecha(matricula.fecha);
        document.getElementById("estadoMatricula").value = matricula.estado || "Activa";
        idEditar = id;
        document.getElementById("btnGuardarMatricula").innerText = "Actualizar Matrícula";
    } catch (error) {
        mostrarError(error);
    }
}

async function eliminarMatricula(id) {
    if (!confirm("¿Deseas eliminar esta matrícula?")) return;
    try {
        const datos = await enviarDatos(`/matriculas/${id}`, "DELETE");
        alert(datos.mensaje);
        await cargarMatriculas();
    } catch (error) {
        mostrarError(error);
    }
}

// ==========================
// CERRAR SESIÓN
// ==========================
document.getElementById("btnCerrarSesion").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioSesion");
    window.location.href = "../Sesion/InicioDeSesion.html";
});

// Inicio del panel
mostrarInicio();

// Hacemos accesibles estas funciones a los botones inline de las tablas.
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;
window.editarEstudiante = editarEstudiante;
window.eliminarEstudiante = eliminarEstudiante;
window.editarDocente = editarDocente;
window.eliminarDocente = eliminarDocente;
window.editarCurso = editarCurso;
window.eliminarCurso = eliminarCurso;
window.editarMatricula = editarMatricula;
window.eliminarMatricula = eliminarMatricula;
