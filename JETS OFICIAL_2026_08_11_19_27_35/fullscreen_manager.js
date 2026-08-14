const CONTROL_PANTALLA_COMPLETA = Object.freeze({x: 485, y: 10, ancho: 48, alto: 42});

function pantallaCompletaActiva() {
  return Boolean(document.fullscreenElement);
}

function controlPantallaCompletaVisible() {
  return estadoJuego === ESTADOS.MENU || estadoJuego === ESTADOS.PAUSA;
}

function mouseSobrePantallaCompleta() {
  const {x, y, ancho, alto} = CONTROL_PANTALLA_COMPLETA;
  return mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto;
}

async function alternarPantallaCompleta() {
  try {
    if (pantallaCompletaActiva()) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
    return true;
  } catch (error) {
    console.warn('No se pudo cambiar el modo de pantalla completa.', error);
    return false;
  }
}

function dibujarEsquinaExpandir(x, y, dx, dy) {
  line(x, y, x + dx * 8, y);
  line(x, y, x, y + dy * 8);
}

function dibujarControlPantallaCompleta() {
  const {x, y, ancho, alto} = CONTROL_PANTALLA_COMPLETA;
  const encima = mouseSobrePantallaCompleta();
  const contraer = pantallaCompletaActiva();

  push();
  stroke(30);
  strokeWeight(1);
  fill(encima ? color(255, 255, 255, 230) : color(255, 255, 255, 185));
  rect(x, y, ancho, alto, 10);

  noFill();
  stroke(45);
  strokeWeight(3);
  if (!contraer) {
    dibujarEsquinaExpandir(x + 12, y + 11, 1, 1);
    dibujarEsquinaExpandir(x + ancho - 12, y + 11, -1, 1);
    dibujarEsquinaExpandir(x + 12, y + alto - 11, 1, -1);
    dibujarEsquinaExpandir(x + ancho - 12, y + alto - 11, -1, -1);
  } else {
    dibujarEsquinaExpandir(x + 20, y + 19, -1, -1);
    dibujarEsquinaExpandir(x + ancho - 20, y + 19, 1, -1);
    dibujarEsquinaExpandir(x + 20, y + alto - 19, -1, 1);
    dibujarEsquinaExpandir(x + ancho - 20, y + alto - 19, 1, 1);
  }
  pop();
}

const dibujarSinPantallaCompleta = draw;
draw = function dibujarConPantallaCompleta() {
  dibujarSinPantallaCompleta();
  if (controlPantallaCompletaVisible()) dibujarControlPantallaCompleta();
};

const mousePressedSinPantallaCompleta = mousePressed;
mousePressed = function mousePressedConPantallaCompleta() {
  if (controlPantallaCompletaVisible() && mouseSobrePantallaCompleta()) {
    alternarPantallaCompleta();
    return false;
  }
  return mousePressedSinPantallaCompleta();
};

const keyPressedSinPantallaCompleta = keyPressed;
keyPressed = function keyPressedConPantallaCompleta(evento) {
  if (keyCode === ESCAPE && pantallaCompletaActiva()) {
    document.exitFullscreen();
    return false;
  }
  if (keyCode === 122 || (keyCode === ENTER && evento && evento.altKey)) {
    alternarPantallaCompleta();
    return false;
  }
  return keyPressedSinPantallaCompleta(evento);
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {CONTROL_PANTALLA_COMPLETA};
}
