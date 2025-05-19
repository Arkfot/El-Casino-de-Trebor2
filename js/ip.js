let puedeCambiarNombre = false; // ✅ Declarada en el ámbito global
async function guardarNuevoNombre(event) {
  event.preventDefault();

  const nuevoNombre = document.getElementById("nuevo_nombre").value.trim();
  const code = localStorage.getItem("user_code");

  if (!nuevoNombre || nuevoNombre.length < 2 || nuevoNombre.length > 50) {
    alert("El nombre debe tener entre 2 y 50 caracteres.");
    return;
  }

  try {
    const res = await fetch("nombre_publico.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: code,
        nuevoNombre: nuevoNombre
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Nombre cambiado exitosamente.");
      document.getElementById("form-nombre").style.display = "none";
      cargarNombrePublico(); // Recargar el nombre mostrado
    } else {
      alert("No se pudo cambiar el nombre: " + data.message);
    }
  } catch (err) {
    console.error("Error al guardar nuevo nombre:", err);
    alert("Hubo un error al intentar cambiar el nombre.");
  }
}

async function obtenerCodigoUsuario() {
  let userCode = localStorage.getItem("user_code");

  const oldUuid = localStorage.getItem("user_id");
  const oldNum = localStorage.getItem("user_id_num");

  if (!userCode && (oldUuid || oldNum)) {
    console.log("🧹 Limpiando ID antiguo...");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_id_num");
    userCode = null;
  }

  if (userCode) {
    try {
      const res = await fetch(`generar_usuario_nuevo.php?check_code=${userCode}`);
      const validacion = await res.text();

      if (validacion !== "VALIDO") {
        console.warn("⚠️ Código inválido. Generando nuevo...");
        localStorage.removeItem("user_code");
        userCode = null;
      }
    } catch (err) {
      console.error("🚫 Error al validar el código:", err);
    }
  }

  if (!userCode) {
    try {
      const res = await fetch("generar_usuario_nuevo.php");
      if (!res.ok) throw new Error("Error al generar código");

      userCode = await res.text();
      localStorage.setItem("user_code", userCode);
    } catch (err) {
      console.error("🚨 No se pudo generar un nuevo código:", err);
      userCode = "ERROR";
    }
  }

  document.getElementById("user_code").textContent = userCode;
}

async function cargarNombrePublico() {
  const data = await res.json();
  console.log("🧪 Datos de nombre_publico.php:", data);

  const code = localStorage.getItem("user_code");
  if (!code) return;

  try {
    const res = await fetch(`nombre_publico.php?code=${code}`);
    const data = await res.json();

    const nombreSpan = document.getElementById("nombre_publico");
    const botonCambiar = document.querySelector("#user-public-info button");

    nombreSpan.textContent = data.nombre_publico || "(anónimo)";
    puedeCambiarNombre = data.puede_cambiar; // 👈 Esto ya modifica la global

    if (puedeCambiarNombre) {
      botonCambiar.style.display = "inline-block";
    } else {
      botonCambiar.style.display = "none";
    }
  } catch (err) {
    console.error("Error al cargar nombre público:", err);
  }
}

function mostrarFormularioNombre() {
  if (!puedeCambiarNombre) {
    alert("⏳ Aún no puedes cambiar tu nombre. Espera hasta que pase una semana y media desde el último cambio.");
    return;
  }

  document.getElementById("form-nombre").style.display = "block";
}

// ⚡ Ejecutar
obtenerCodigoUsuario().then(cargarNombrePublico);
