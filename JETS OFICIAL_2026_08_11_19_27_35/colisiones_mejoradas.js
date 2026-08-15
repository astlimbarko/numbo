const HITBOX_PERSONAJE_RADIO = 26;
const HITBOX_OPERACION_ALTO = 70;
const TAMANO_OPERACION_NORMAL = 56;
const TAMANO_OPERACION_MINIMO = 40;
const ANCHO_OPERACION_MAXIMO = 270;
const SEPARACION_OPERACION = 11;
const COLOR_OPERANDO_1 = [19, 181, 210];
const COLOR_OPERADOR = [218, 44, 67];
const COLOR_OPERANDO_2 = [92, 196, 28];

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

function formatearParteOperacion(valor) {
  return Number(valor) < 0 ? `(${valor})` : String(valor);
}

function partesDeObstaculo(obstaculo) {
  if (obstaculo.num1 !== undefined && obstaculo.operador && obstaculo.num2 !== undefined) {
    return [formatearParteOperacion(obstaculo.num1), obstaculo.operador, formatearParteOperacion(obstaculo.num2)];
  }
  return obstaculo.texto.split(' ');
}

function medirOperacion(partes) {
  textSize(TAMANO_OPERACION_NORMAL);
  let anchos = partes.map((parte) => textWidth(parte));
  let anchoTotal = anchos.reduce((total, ancho) => total + ancho, 0) + SEPARACION_OPERACION * 2;
  if (anchoTotal > ANCHO_OPERACION_MAXIMO) {
    const tamanoAdaptado = Math.max(
      TAMANO_OPERACION_MINIMO,
      TAMANO_OPERACION_NORMAL * ANCHO_OPERACION_MAXIMO / anchoTotal
    );
    textSize(tamanoAdaptado);
    anchos = partes.map((parte) => textWidth(parte));
    anchoTotal = anchos.reduce((total, ancho) => total + ancho, 0) + SEPARACION_OPERACION * 2;
  }
  return {anchos, anchoTotal};
}

function dibujarSimboloOperacion(simbolo, x, y, relleno) {
  stroke(18, 14, 25, 145);
  strokeWeight(9);
  fill(18, 14, 25, 145);
  text(simbolo, x + 5, y + 6);

  stroke(255);
  strokeWeight(10);
  fill(relleno[0], relleno[1], relleno[2]);
  text(simbolo, x, y);

  stroke(24, 20, 31);
  strokeWeight(2);
  fill(relleno[0], relleno[1], relleno[2]);
  text(simbolo, x, y);
}

function mostrarObstaculo(obstaculo) {
  push();
  textFont('Arial Black');
  textAlign(LEFT, CENTER);

  const partes = partesDeObstaculo(obstaculo);
  const num1 = partes[0];
  const operador = partes[1];
  const num2 = partes[2];
  const medida = medirOperacion(partes);
  const [anchoNum1, anchoOperador] = medida.anchos;
  const anchoTotal = medida.anchoTotal;

  obstaculo.hitbox = {
    x: obstaculo.x + anchoTotal / 2,
    y: obstaculo.y,
    w: anchoTotal + 12,
    h: HITBOX_OPERACION_ALTO
  };

  const operadorX = obstaculo.x + anchoNum1 + SEPARACION_OPERACION;
  const num2X = operadorX + anchoOperador + SEPARACION_OPERACION;
  dibujarSimboloOperacion(num1, obstaculo.x, obstaculo.y, COLOR_OPERANDO_1);
  dibujarSimboloOperacion(operador, operadorX, obstaculo.y, COLOR_OPERADOR);
  dibujarSimboloOperacion(num2, num2X, obstaculo.y, COLOR_OPERANDO_2);
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
