document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const passwordInput = document.getElementById("passwordInput");
  const errorMsg = document.getElementById("error-msg");
  const contraseñaCorrecta = "1234";
  const tiempoExpiracion = 30 * 1000; // ⏱️ 30 segundos // 5 horas
  const ultimoAcceso = localStorage.getItem("ultimoAcceso");

  // ✅ Solo redirigir si hay acceso válido
  if (ultimoAcceso && (Date.now() - parseInt(ultimoAcceso) < tiempoExpiracion)) {
    window.location.href = "/juegos.html";
    return;
  }

  // ❌ NO guardar tiempo aquí (¡esto causaba el error!)

  // ✅ Guardar tiempo SOLO si la contraseña es correcta
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (passwordInput.value === contraseñaCorrecta) {
      localStorage.setItem("ultimoAcceso", Date.now());
      window.location.href = "juegos.html";
    } else {
      errorMsg.textContent = "Contraseña incorrecta";
      setTimeout(() => {
        errorMsg.textContent = "";
      }, 3000);
    }
  });
});