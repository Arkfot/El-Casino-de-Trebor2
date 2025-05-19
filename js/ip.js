async function obtenerCodigoUsuario() {
  let userCode = localStorage.getItem("user_code");

  // 💡 Paso 1: limpiar restos de sistemas antiguos
  const oldUuid = localStorage.getItem("user_id");
  const oldNum = localStorage.getItem("user_id_num");

  if (!userCode && (oldUuid || oldNum)) {
    console.log("🧹 Limpiando ID antiguo...");

    // Borrar claves antiguas
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_id_num");

    // Forzar creación de nuevo código
    userCode = null;
  }

  // ✅ Paso 2: validar código actual en la base de datos
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

  // 🆕 Paso 3: generar nuevo código si no existe o es inválido
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

  // Mostrar el código final
  document.getElementById("user_code").textContent = userCode;
}

obtenerCodigoUsuario();
