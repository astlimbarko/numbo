const DURACION_CAIDA_PINTURA = 1050;
const DURACION_TOTAL_TRANSICION = 1500;
const ESPERA_PRIMERA_OPERACION = 650;
const CANTIDAD_FRANJAS_PINTURA = 22;

let capturaNivelAnterior = null;
let franjasPintura = [];
let inicioTransicionNivel = 0;
let nivelMostradoEnTransicion = 1;

function crearFranjasPintura() {
  const franjas = [];
  const anchoBase = width / CANTIDAD_FRANJAS_PINTURA;
  for (let indiceFranja = 0; indiceFranja < CANTIDAD_FRANJAS_PINTURA; indiceFranja++) {
    const onda = (Math.sin(indiceFranja * 1.37) + 1) / 2;
    franjas.push({
      x: Math.floor(indiceFranja * anchoBase),
      ancho: Math.ceil(anchoBase) + 1,
      retraso: 40 + onda * 210 + random(-25, 25),
      recorrido: height + 80 + random(0, 70),
      estiramiento: random(8, 34)
    });
  }
  return franjas;
}

function iniciarTransicionNivel() {
  if (estadoJuego === ESTADOS.TRANSICION_NIVEL || nivel >= 3) return;

  capturaNivelAnterior = get(0, 0, width, height);
  franjasPintura = crearFranjasPintura();
  inicioTransicionNivel = millis();
  obstaculos.length = 0;
  pasar_nivel = false;
  nivel_bandera = true;
  nivel++;
  nivelMostradoEnTransicion = nivel;
  mision = mision_general();
  cambiarEstado(ESTADOS.TRANSICION_NIVEL);
}

function progresoSuavizado(valor) {
  const limitado = Math.max(0, Math.min(1, valor));
  return limitado * limitado * limitado;
}

function dibujarMapaNuevoDetenido() {
  velocidadGeneral = 0;
  dibujarNivelActual();
  barra_sup();
}

function dibujarFranjaPintura(franja, tiempoTranscurrido) {
  if (!capturaNivelAnterior) return;
  const duracionFranja = DURACION_CAIDA_PINTURA - franja.retraso;
  const progreso = progresoSuavizado((tiempoTranscurrido - franja.retraso) / duracionFranja);
  const desplazamientoY = progreso * franja.recorrido;
  const estiramiento = Math.sin(progreso * Math.PI) * franja.estiramiento;

  image(
    capturaNivelAnterior,
    franja.x,
    desplazamientoY,
    franja.ancho,
    height + estiramiento,
    franja.x,
    0,
    franja.ancho,
    height
  );

  if (progreso > 0.08 && progreso < 0.92) {
    noStroke();
    fill(82, 32, 132, 150);
    const gotaY = desplazamientoY + height + estiramiento - 3;
    ellipse(franja.x + franja.ancho / 2, gotaY, Math.max(5, franja.ancho * 0.7), 10 + franja.estiramiento * 0.35);
  }
}

function dibujarTituloNivel(tiempoTranscurrido) {
  if (tiempoTranscurrido < 620 || tiempoTranscurrido > 1400) return;
  const entrada = Math.min(1, (tiempoTranscurrido - 620) / 180);
  const salida = Math.min(1, (1400 - tiempoTranscurrido) / 180);
  const alpha = 255 * Math.max(0, Math.min(entrada, salida));
  push();
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(44);
  stroke(55, 24, 100, alpha);
  strokeWeight(8);
  fill(255, 211, 54, alpha);
  text(`${traducir('nivel').toUpperCase()} ${nivelMostradoEnTransicion}`, width / 2, height / 2);
  pop();
}

function finalizarTransicionNivel() {
  capturaNivelAnterior = null;
  franjasPintura.length = 0;
  operacionesSuspendidasHasta = millis() + ESPERA_PRIMERA_OPERACION;
  cambiarEstado(ESTADOS.JUGANDO);
}

function dibujarTransicionNivel() {
  const tiempoTranscurrido = millis() - inicioTransicionNivel;
  dibujarMapaNuevoDetenido();
  franjasPintura.forEach((franja) => dibujarFranjaPintura(franja, tiempoTranscurrido));
  dibujarTituloNivel(tiempoTranscurrido);
  if (tiempoTranscurrido >= DURACION_TOTAL_TRANSICION) finalizarTransicionNivel();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    progresoSuavizado,
    DURACION_CAIDA_PINTURA,
    DURACION_TOTAL_TRANSICION,
    ESPERA_PRIMERA_OPERACION,
    CANTIDAD_FRANJAS_PINTURA
  };
}
