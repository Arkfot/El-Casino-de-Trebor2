document.addEventListener("DOMContentLoaded", () => {
  const TIEMPO_EXPIRACION = 30 * 1000; // ⏱️ 30 segundos; // 5 horas
  const ultimoAcceso = localStorage.getItem("ultimoAcceso");
  console.log("ultimo acceso:", ultimoAcceso);
  console.log("diferencia:", Date.now() - parseInt(ultimoAcceso));

  if (!ultimoAcceso || (Date.now() - parseInt(ultimoAcceso) > TIEMPO_EXPIRACION)) {
    window.location.href = "/index.html";
  }
});