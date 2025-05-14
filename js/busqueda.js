// Ocultar sugerencias si se hace clic fuera
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('buscador');
  input.addEventListener('input', (e) => {
    if (e.target.value.trim() === '') {
      document.getElementById('sugerencias').innerHTML = '';
    }
    buscarJuegos(); // <- Importante
  });
});
function buscarJuegos() {

  const input = document.getElementById('buscador');
  const filtro = input.value.toLowerCase().trim();
  const juegos = Array.from(document.getElementsByClassName('juego'));
  const categorias = document.getElementById('categorias');
  const titulosCategoria = document.getElementsByClassName('titulo-categoria');
  const contenedores = Array.from(document.getElementsByClassName('zona-juegos'));
  const sugerenciasLista = document.getElementById('sugerencias');

  sugerenciasLista.innerHTML = '';

  const mostrarCategorias = filtro === '';
  categorias.style.display = mostrarCategorias ? 'block' : 'none';
  for (let titulo of titulosCategoria) {
    titulo.style.display = mostrarCategorias ? 'block' : 'none';
  }

  if (mostrarCategorias) {
    juegos.forEach(juego => juego.style.display = '');
    contenedores.forEach(c => c.style.display = '');
    return;
  }

  const resultados = juegos
    .map(juego => {
      const h3 = juego.querySelector('h3');
      const texto = h3 ? h3.textContent.toLowerCase() : '';
      let relevancia = -1;
      if (texto.startsWith(filtro)) relevancia = 2;
      else if (texto.includes(filtro)) relevancia = 1;
      return { juego, texto, relevancia };
    })
    .filter(({ relevancia }) => relevancia > 0)
    .sort((a, b) => b.relevancia - a.relevancia);

  // Mostrar sugerencias sin duplicados
  const unicos = new Set();
  resultados.slice(0, 10).forEach(({ texto }) => {
    if (!unicos.has(texto)) {
      const li = document.createElement('li');
      li.textContent = texto;
      li.onclick = () => {
        input.value = texto;
        sugerenciasLista.innerHTML = '';
        buscarJuegos();
      };
      sugerenciasLista.appendChild(li);
      unicos.add(texto);
    }
  });

  // Ocultar todos los juegos y contenedores
  juegos.forEach(juego => juego.style.display = 'none');
  contenedores.forEach(contenedor => contenedor.style.display = 'none');

  // Mostrar solo un juego por título
  const mostrados = new Set();
  resultados.forEach(({ juego, texto }) => {
    if (!mostrados.has(texto)) {
      juego.style.display = '';
      const contenedor = juego.closest('.zona-juegos');
      if (contenedor) {
        contenedor.style.display = '';
        contenedor.appendChild(juego);
      }
      mostrados.add(texto);
    }
  });
}

// Soporte para flechas y enter
document.addEventListener('keydown', function (e) {
  const sugerencias = document.querySelectorAll('#sugerencias li');
  if (sugerencias.length === 0) return;

  let index = Array.from(sugerencias).findIndex(li => li.classList.contains('seleccionado'));

  if (e.key === 'Escape') {
    document.getElementById('sugerencias').innerHTML = '';
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (index >= 0) sugerencias[index].classList.remove('seleccionado');
    index = (index + 1) % sugerencias.length;
    sugerencias[index].classList.add('seleccionado');
    sugerencias[index].scrollIntoView({ block: 'nearest' });
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (index >= 0) sugerencias[index].classList.remove('seleccionado');
    index = (index - 1 + sugerencias.length) % sugerencias.length;
    sugerencias[index].classList.add('seleccionado');
    sugerencias[index].scrollIntoView({ block: 'nearest' });
  }

  if (e.key === 'Enter') {
  e.preventDefault(); // <-- Añade esto
  if (index === -1) {
    sugerencias[0].click();
  } else {
    sugerencias[index].click();
  }
}
});
