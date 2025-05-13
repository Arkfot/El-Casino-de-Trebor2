document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const passwordInput = document.getElementById("passwordInput");
  const errorMsg = document.getElementById("error-msg");
  const contraseñaCorrecta = "1234";
  const tiempoExpiracion = 5 * 60 * 60 * 1000; // ⏱️ 5 horas en milisegundos
  const ultimoAcceso = localStorage.getItem("ultimoAcceso");

  // Si la contraseña sigue siendo válida, redirigir automáticamente
  if (ultimoAcceso && (Date.now() - parseInt(ultimoAcceso) < tiempoExpiracion)) {
    window.location.href = "juegos.html";
    return;
  }

  // Al enviar el formulario
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