document.addEventListener("DOMContentLoaded", () => {
  const TIEMPO_EXPIRACION = 5 * 60 * 60 * 1000;  // 5 horas
  const ultimoAcceso = localStorage.getItem("ultimoAcceso");
  console.log("ultimo acceso:", ultimoAcceso);
  console.log("diferencia:", Date.now() - parseInt(ultimoAcceso));

  if (!ultimoAcceso || (Date.now() - parseInt(ultimoAcceso) > TIEMPO_EXPIRACION)) {
    window.location.href = "/index.html";
  }
});