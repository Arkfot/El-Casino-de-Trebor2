  async function obtenerCodigoUsuario() {
    let userCode = localStorage.getItem("user_code");

    if (!userCode) {
      try {
        const res = await fetch("generar_usuario.php");
        if (!res.ok) throw new Error("Error al generar código");

        userCode = await res.text();
        localStorage.setItem("user_code", userCode);
      } catch (err) {
        console.error("No se pudo obtener el código:", err);
      }
    }

    document.getElementById("user_code").textContent = userCode;
  }

  obtenerCodigoUsuario();