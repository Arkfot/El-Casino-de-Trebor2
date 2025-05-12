const params = new URLSearchParams(window.location.search);
const urlJuego = params.get("juego");

if (urlJuego) {
  document.getElementById("iframe-juego").src = decodeURIComponent(urlJuego);
} else {
  document.getElementById("iframe-juego").outerHTML = "<p>❌ No se ha especificado ningún juego.</p>";
}