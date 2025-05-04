document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const passwordInput = document.getElementById("passwordInput");
  const errorMsg = document.getElementById("error-msg");
  const contraseñaCorrecta = "1234";

  form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que recargue la página

      if (passwordInput.value === contraseñaCorrecta) {
          window.location.href = "../pagina.html";
      } else errorMsg.textContent = "Contraseña incorrecta";
      
      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        errorMsg.textContent = "";
      }, 3000);
  });
});