const HITBOX_PERSONAJE_RADIO = 26;
const HITBOX_OPERACION_ALTO = 56;

const VELOCIDAD_NUMBI_POR_NIVEL = Object.freeze({ 1: 6, 2: 6, 3: 8 });

function obtenerVelocidadNumbi() {
  return VELOCIDAD_NUMBI_POR_NIVEL[nivel] || VELOCIDAD_NUMBI_POR_NIVEL[1];
}

function detectarColisionRectCirculo(rectangulo, circulo) {
  const mitadAncho = Math.max(0, rectangulo.w) / 2;
  const mitadAlto = Math.max(0, rectangulo.h) / 2;
  const puntoCercanoX = Math.max(
    rectangulo.x - mitadAncho,
    Math.min(circulo.x, rectangulo.x + mitadAncho)
  );
  const puntoCercanoY = Math.max(
    rectangulo.y - mitadAlto,
    Math.min(circulo.y, rectangulo.y + mitadAlto)
  );
  const distanciaX = circulo.x - puntoCercanoX;
  const distanciaY = circulo.y - puntoCercanoY;
  return distanciaX * distanciaX + distanciaY * distanciaY <= circulo.radio * circulo.radio;
}

function detectarColision(obstaculo, centroX, centroY, radio) {
  if (!obstaculo || !obstaculo.hitbox) return false;
  return detectarColisionRectCirculo(obstaculo.hitbox, {
    x: centroX,
    y: centroY,
    radio
  });
}

function hitboxSP() {
  radioHitbox = HITBOX_PERSONAJE_RADIO;
}

function moveCharacter() {
  const limiteDerecho = width - ancho_sp;
  const velocidadActual = obtenerVelocidadNumbi();
  if (moverDerecha && !moverIzquierda) posX = Math.min(limiteDerecho, posX + velocidadActual);
  if (moverIzquierda && !moverDerecha) posX = Math.max(0, posX - velocidadActual);
}

function mostrarObstaculo(obstaculo) {
  push();
  textSize(50);
  textFont('Arial');
  strokeWeight(5);
  stroke(0, 0, 0, 100);
  textAlign(LEFT, CENTER);

  const partes = obstaculo.texto.split(' ');
  const num1 = partes[0];
  const operador = partes[1];
  const num2 = partes[2];
  const separacion = 10;
  const anchoNum1 = textWidth(num1);
  const anchoOperador = textWidth(operador);
  const anchoNum2 = textWidth(num2);
  const anchoTotal = anchoNum1 + anchoOperador + anchoNum2 + separacion * 2;

  obstaculo.hitbox = {
    x: obstaculo.x + anchoTotal / 2,
    y: obstaculo.y,
    w: anchoTotal,
    h: HITBOX_OPERACION_ALTO
  };

  const operadorX = obstaculo.x + anchoNum1 + separacion;
  const num2X = operadorX + anchoOperador + separacion;

  fill(obstaculo.colorNum1);
  text(num1, obstaculo.x, obstaculo.y);
  fill(0, 50);
  text(num1, obstaculo.x + 5, obstaculo.y + 5);

  fill(obstaculo.colorOperador);
  text(operador, operadorX, obstaculo.y);
  fill(0, 50);
  text(operador, operadorX + 5, obstaculo.y + 5);

  fill(obstaculo.colorNum2);
  text(num2, num2X, obstaculo.y);
  fill(0, 50);
  text(num2, num2X + 5, obstaculo.y + 5);
  pop();
}

function aplicarProgresoDeNivel() {
  if (Acertadas >= 10 && Objetivos1) {
    Objetivos1 = false;
    nivel_completado1 = true;
    vidas++;
  }
  if (Acertadas >= 20 && Objetivos2) {
    Objetivos2 = false;
    nivel_completado2 = true;
    vidas++;
  }
  if (Acertadas >= 30 && Objetivos3) {
    Objetivos3 = false;
    nivel_completado3 = true;
  }
  if (vidas <= 0) juego_perdido = true;
}

function comprobarColisiones() {
  const centroPersonajeX = posX + ancho_sp / 2;
  const centroPersonajeY = posY + 40;

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    const obstaculo = obstaculos[i];
    if (obstaculo.colisionada) continue;
    if (!detectarColision(obstaculo, centroPersonajeX, centroPersonajeY, radioHitbox)) continue;

    obstaculo.colisionada = true;
    if (obstaculo.resultado === mision) {
      Acertadas++;
      mision = mision_general();
      sonidoCorrecto.play();
      colorEfecto = color(0, 255, 0, 100);
    } else {
      Incorrectas++;
      vidas--;
      sonidoIncorrecto.play();
      colorEfecto = color(255, 0, 0, 100);
    }
    obstaculos.splice(i, 1);
    contadorEfecto = duracionEfecto;
  }

  if (contadorEfecto > 0) {
    if (Math.floor(frameCount / 6) % 3 !== 0) background(colorEfecto);
    contadorEfecto--;
  }

  aplicarProgresoDeNivel();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    detectarColisionRectCirculo,
    HITBOX_PERSONAJE_RADIO,
    HITBOX_OPERACION_ALTO
  };
}
