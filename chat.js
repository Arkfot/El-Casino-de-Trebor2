document.getElementById("chat-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const message = document.getElementById("message").value;

  fetch("send_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: "message=" + encodeURIComponent(message)
  }).then(() => {
    document.getElementById("message").value = "";
    loadMessages();
  });
});

function loadMessages() {
  fetch("get_messages.php")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("messages");
      container.innerHTML = data.map(msg => `<div>${msg.content}</div>`).join("");
      container.scrollTop = container.scrollHeight;
    });
}

setInterval(loadMessages, 2000);
loadMessages();

let puedeCambiarNombre = false; // ámbito global

// 1) Obtiene o genera el código de usuario
async function obtenerCodigoUsuario() {
  let userCode = localStorage.getItem("user_code");
  const oldUuid = localStorage.getItem("user_id");
  const oldNum  = localStorage.getItem("user_id_num");

  // Limpia IDs antiguos si existen
  if (!userCode && (oldUuid || oldNum)) {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_id_num");
    userCode = null;
  }

  // Si ya hay código, lo valida
  if (userCode) {
    try {
      const res = await fetch(`generar_usuario_nuevo.php?check_code=${userCode}`);
      const valid = await res.text();
      if (valid !== "VALIDO") {
        localStorage.removeItem("user_code");
        userCode = null;
      }
    } catch {
      // ignorar
    }
  }

  // Si no hay código, lo genera
  if (!userCode) {
    try {
      const res = await fetch("generar_usuario_nuevo.php");
      userCode = await res.text();
      localStorage.setItem("user_code", userCode);
    } catch {
      userCode = "ERROR";
    }
  }

  document.getElementById("user_code").textContent = userCode;
}

// 2) Carga el nombre público y decide si mostrar botón
async function cargarNombrePublico() {
  const code = localStorage.getItem("user_code");
  if (!code) return;

  try {
    const res = await fetch(`nombre_publico.php?code=${code}`);
    const data = await res.json();
    console.log("🧪 nombre_publico.php respondió:", data);

    document.getElementById("nombre_publico").textContent =
      data.nombre_publico || "(anónimo)";

    puedeCambiarNombre = data.puede_cambiar;

    const btn = document.getElementById("btn-editar-nombre");
    btn.style.display = puedeCambiarNombre ? "inline-block" : "none";
  } catch (err) {
    console.error("Error al cargar nombre público:", err);
  }
}

// 3) Muestra el formulario si está permitido
function mostrarFormularioNombre() {
  if (!puedeCambiarNombre) {
    alert("⏳ Aún no puedes cambiar tu nombre (espera 1.5 semanas).");
    return;
  }
  document.getElementById("form-nombre").style.display = "block";
}

// 4) Envía el nuevo nombre al servidor
async function guardarNuevoNombre(event) {
  event.preventDefault();
  const input = document.getElementById("nuevo_nombre");
  const nuevoNombre = input.value.trim();
  const code = localStorage.getItem("user_code");

  if (nuevoNombre.length < 2 || nuevoNombre.length > 50) {
    alert("El nombre debe tener entre 2 y 50 caracteres.");
    return;
  }

  try {
    const res = await fetch("nombre_publico.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, nuevoNombre })
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById("form-nombre").style.display = "none";
      input.value = "";
      cargarNombrePublico(); // refresca el botón y el nombre
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error("Error al guardar nuevo nombre:", err);
    alert("❌ Error al cambiar el nombre.");
  }
}

// ——— Arranque ———
obtenerCodigoUsuario()
  .then(cargarNombrePublico)
  .catch(console.error);
