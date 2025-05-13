const TIEMPO_EXPIRACION = 5 * 60 * 60 * 1000; // 5 horas
const ultimoAcceso = localStorage.getItem("ultimoAcceso");

if (!ultimoAcceso || (Date.now() - parseInt(ultimoAcceso) > TIEMPO_EXPIRACION)) {
  window.location.href = "index.html";
}