let recursosCargaTotales = 0;
let recursosCargaCompletados = 0;
let registrandoRecursosCarga = false;

function actualizarProgresoCarga() {
  const porcentaje = recursosCargaTotales === 0
    ? 0
    : Math.min(100, Math.round((recursosCargaCompletados / recursosCargaTotales) * 100));
  const pantalla = document.getElementById('p5_loading');
  const barra = pantalla && pantalla.querySelector('.numbo-loading__barra');
  const texto = pantalla && pantalla.querySelector('.numbo-loading__porcentaje');

  if (pantalla) pantalla.style.setProperty('--numbo-progreso', `${porcentaje}%`);
  if (barra) barra.setAttribute('aria-valuenow', String(porcentaje));
  if (texto) texto.textContent = `${porcentaje}%`;
}

function registrarRecursoCarga(cargar, argumentos) {
  if (!registrandoRecursosCarga) return cargar(...argumentos);

  recursosCargaTotales++;
  actualizarProgresoCarga();

  const parametros = [...argumentos];
  const exitoOriginal = parametros[1];
  const errorOriginal = parametros[2];
  let finalizado = false;

  const completar = () => {
    if (finalizado) return;
    finalizado = true;
    recursosCargaCompletados++;
    actualizarProgresoCarga();
  };

  parametros[1] = (...valores) => {
    completar();
    if (typeof exitoOriginal === 'function') exitoOriginal(...valores);
  };
  parametros[2] = (...valores) => {
    completar();
    if (typeof errorOriginal === 'function') errorOriginal(...valores);
  };

  return cargar(...parametros);
}

const preloadSinProgreso = preload;
preload = function preloadConProgreso() {
  const cargarImagenSinProgreso = loadImage;
  const cargarAudioSinProgreso = loadSound;
  recursosCargaTotales = 0;
  recursosCargaCompletados = 0;
  loadImage = function cargarImagenConProgreso(...argumentos) {
    return registrarRecursoCarga(cargarImagenSinProgreso, argumentos);
  };
  loadSound = function cargarAudioConProgreso(...argumentos) {
    return registrarRecursoCarga(cargarAudioSinProgreso, argumentos);
  };

  registrandoRecursosCarga = true;
  actualizarProgresoCarga();
  try {
    preloadSinProgreso();
  } finally {
    registrandoRecursosCarga = false;
    loadImage = cargarImagenSinProgreso;
    loadSound = cargarAudioSinProgreso;
    actualizarProgresoCarga();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {actualizarProgresoCarga};
}
