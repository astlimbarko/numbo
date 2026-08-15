const ESTADOS = Object.freeze({
  MENU: 'MENU',
  JUGANDO: 'PLAY',
  TRANSICION_NIVEL: 'LEVEL_TRANSITION',
  PAUSA: 'PAUSED',
  NIVEL_COMPLETADO: 'LEVEL_COMPLETE',
  VICTORIA: 'VICTORY',
  DERROTA: 'GAME_OVER'
});

let estadoAntesDePausa = ESTADOS.JUGANDO;
let botonPausaHoverAnterior = null;

function detenerMovimiento() {
  moverDerecha = false;
  moverIzquierda = false;
  mirarIzquierda = false;
}

function cambiarEstado(nuevoEstado) {
  if (estadoJuego === nuevoEstado) return;

  estadoJuego = nuevoEstado;
  if (nuevoEstado !== ESTADOS.JUGANDO) detenerMovimiento();

  if (nuevoEstado === ESTADOS.VICTORIA && sonidoGanaste && !sonidoGanaste.isPlaying()) {
    sonidoGanaste.play();
  }
}

function obtenerNivelInicial() {
  const parametros = new URLSearchParams(window.location.search);
  const nivelPrueba = Number.parseInt(parametros.get('testLevel'), 10);

  return [1, 2, 3].includes(nivelPrueba) ? nivelPrueba : 1;
}

function reiniciarPartida() {
  obstaculos.length = 0;
  nivel = obtenerNivelInicial();
  mision = mision_general();
  const aciertosPrevios = (nivel - 1) * 10;
  vidas = 5;
  Acertadas = aciertosPrevios;
  Incorrectas = 0;
  Objetivos1 = nivel === 1;
  Objetivos2 = nivel <= 2;
  Objetivos3 = true;
  nivel_completado1 = false;
  nivel_completado2 = false;
  nivel_completado3 = false;
  nivel_bandera = false;
  juego_perdido = false;
  pasar_nivel = false;
  contadorEfecto = 0;
  pausaActiva = false;

  posX = 80;
  posY = posYInicial;
  enElAire = false;
  velocidadSalto = 0;
  llave = 0;
  detenerMovimiento();
  inicializarMapas();
}

function iniciarPartidaNueva() {
  reiniciarPartida();
  menuOne = 1;
  cambiarEstado(ESTADOS.JUGANDO);
}

function volverAlMenu() {
  pausaActiva = false;
  menuOne = 2;
  cambiarEstado(ESTADOS.MENU);
}

function alternarPausa() {
  botonPausaHoverAnterior = null;
  if (estadoJuego === ESTADOS.JUGANDO) {
    estadoAntesDePausa = estadoJuego;
    pausaActiva = true;
    cambiarEstado(ESTADOS.PAUSA);
  } else if (estadoJuego === ESTADOS.PAUSA) {
    pausaActiva = false;
    cambiarEstado(estadoAntesDePausa);
  }
}

function avanzarNivel() {
  if (estadoJuego !== ESTADOS.NIVEL_COMPLETADO) return;

  obstaculos.length = 0;
  contadorEfecto = 0;
  pasar_nivel = false;
  nivel_bandera = true;
  nivel++;
  mision = mision_general();
  cambiarEstado(ESTADOS.JUGANDO);
}

function dibujarNivelActual() {
  velocidadGeneral = estadoJuego === ESTADOS.JUGANDO ? 3.5 : 0;

  if (nivel === 1) mapita1();
  else if (nivel === 2) mapita2();
  else mapita3();

  if (estadoJuego === ESTADOS.JUGANDO) Numbii();
  else dibujarNumbiEstatico();
}
function dibujarNumbiEstatico() {
  const cuadro = imgs[Math.min(indice, imgs.length - 1)];
  if (!cuadro) return;

  if (!mirarIzquierda) image(cuadro, posX, posY);
  else {
    push();
    scale(-1, 1);
    image(cuadro, -posX - ancho_sp, posY);
    pop();
  }
}

function actualizarNivelActual() {
  if (nivel === 1) {
    stopSound(sonidoFondo);
    playSound(sonidoMapa1);
    velo = 6;
    inter = 90;
  } else if (nivel === 2) {
    stopSound(sonidoMapa1);
    playSound(sonidoMapa2);
    velo = 7;
    inter = 90;
  } else {
    stopSound(sonidoMapa2);
    playSound(sonidoMapa3);
    velo = 8;
    inter = 65;
  }

  dibujarNivelActual();
  draw_numeros();

  if (juego_perdido || vidas <= 0) cambiarEstado(ESTADOS.DERROTA);
  else if (nivel_completado3) cambiarEstado(ESTADOS.VICTORIA);
  else if ((nivel === 1 && nivel_completado1) || (nivel === 2 && nivel_completado2)) {
    iniciarTransicionNivel();
  }
}

function dibujarBoton(texto, x, y, ancho, alto) {
  const encima = mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto;
  stroke(40);
  strokeWeight(2);
  fill(encima ? color(93, 214, 93) : color(50, 205, 50));
  rect(x, y, ancho, alto, 10);
  noStroke();
  fill(35);
  textAlign(CENTER, CENTER);
  textFont('Arial');
  textSize(18);
  text(texto, x + ancho / 2, y + alto / 2);
  return encima;
}

function dibujarPanelEstado(titulo, lineas) {
  const x = 125;
  const y = 65;
  const ancho = 350;
  const alto = 270;

  fill(255, 255, 255, 225);
  stroke(40);
  strokeWeight(2);
  rect(x, y, ancho, alto, 20);
  noStroke();
  fill(45);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(30);
  text(titulo, width / 2, y + 45);
  textFont('Arial');
  textSize(19);
  lineas.forEach((linea, indiceLinea) => text(linea, width / 2, y + 88 + indiceLinea * 28));
}

function dibujarDatoPausa(etiqueta, valor, x) {
  push();
  stroke(66, 27, 122);
  strokeWeight(3);
  fill(255, 211, 54);
  rect(x, 145, 128, 55, 11);
  noStroke();
  fill(77, 31, 135);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(11);
  text(etiqueta.toUpperCase(), x + 64, 158);
  textSize(24);
  text(valor, x + 64, 181);
  pop();
}

function ajustarTextoPausa(texto, maximo, tamanoInicial, tamanoMinimo) {
  let tamano = tamanoInicial;
  textSize(tamano);
  while (tamano > tamanoMinimo && textWidth(texto) > maximo) {
    tamano -= 1;
    textSize(tamano);
  }
}

function dibujarBotonPausa(texto, x, y, ancho, alto, principal) {
  const encima = mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto;
  push();
  stroke(55, 22, 103);
  strokeWeight(3);
  if (principal) fill(encima ? color(255, 226, 95) : color(255, 202, 44));
  else fill(encima ? color(178, 112, 239) : color(151, 75, 218));
  rect(x, y, ancho, alto, 11);
  noStroke();
  fill(principal ? color(62, 27, 112) : color(255));
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  ajustarTextoPausa(texto, ancho - 30, 17, 12);
  text(texto, x + ancho / 2, y + alto / 2 + 1);
  pop();
  return encima;
}

function dibujarPausa() {
  push();
  noStroke();
  fill(28, 13, 48, 105);
  rect(0, 0, width, height);
  stroke(57, 23, 108);
  strokeWeight(5);
  fill(104, 38, 179);
  rect(125, 64, 350, 282, 22);
  noStroke();
  fill(139, 55, 218);
  rect(142, 78, 316, 55, 15);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  ajustarTextoPausa(traducir('pausa'), 285, 29, 20);
  text(traducir('pausa'), width / 2, 105);
  dibujarDatoPausa(traducir('nivel'), nivel, 162);
  dibujarDatoPausa(traducir('aciertos'), Acertadas, 310);
  const sobreContinuar = dibujarBotonPausa(traducir('continuar'), 180, 220, 240, 42, true);
  const sobreMenu = dibujarBotonPausa(traducir('volverMenu'), 180, 275, 240, 42, false);
  const botonActual = sobreContinuar ? 'continuar' : (sobreMenu ? 'menu' : null);
  if (botonActual !== botonPausaHoverAnterior && botonActual !== null) reproducirSonidoHoverMenu();
  botonPausaHoverAnterior = botonActual;
  fill(230, 216, 252);
  noStroke();
  textFont('Arial');
  textSize(11);
  text('ENTER  /  ESC', width / 2, 331);
  pop();
}

function dibujarNivelCompletado() {
  dibujarPanelEstado(traducir('nivelCompletado'), [
    traducir('completasteNivel', {nivel}),
    `${traducir('aciertos')}: ${Acertadas}`
  ]);
  dibujarBoton(traducir('siguienteNivel'), 180, 245, 240, 50);
}

function dibujarVictoria() {
  dibujarPanelEstado(traducir('ganaste'), [
    `${traducir('aciertos')}: ${Acertadas}`,
    `${traducir('incorrectas')}: ${Incorrectas}`,
    `${traducir('puntaje')}: ${Acertadas * 1000}`
  ]);
  dibujarBoton(traducir('volverJugar'), 180, 235, 240, 42);
  dibujarBoton(traducir('volverMenu'), 180, 285, 240, 42);
}

function dibujarDerrota() {
  dibujarPanelEstado(traducir('perdiste'), [
    `${traducir('aciertos')}: ${Acertadas}`,
    `${traducir('incorrectas')}: ${Incorrectas}`,
    `${traducir('puntaje')}: ${Acertadas * 1000}`
  ]);
  dibujarBoton(traducir('reintentar'), 180, 235, 240, 42);
  dibujarBoton(traducir('volverMenu'), 180, 285, 240, 42);
}

function draw() {
  if (estadoJuego === ESTADOS.TRANSICION_NIVEL) {
    dibujarTransicionNivel();
    return;
  }

  if (estadoJuego === ESTADOS.MENU) {
    velocidadGeneral = 0;
    drawMenu();
    return;
  }

  if (estadoJuego === ESTADOS.JUGANDO) {
    actualizarNivelActual();
  } else {
    dibujarNivelActual();
  }

  barra_sup();

  if (estadoJuego === ESTADOS.PAUSA) dibujarPausa();
  else if (estadoJuego === ESTADOS.NIVEL_COMPLETADO) dibujarNivelCompletado();
  else if (estadoJuego === ESTADOS.VICTORIA) dibujarVictoria();
  else if (estadoJuego === ESTADOS.DERROTA) dibujarDerrota();
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (estadoJuego === ESTADOS.JUGANDO || estadoJuego === ESTADOS.PAUSA) alternarPausa();
    return false;
  }

  if (estadoJuego === ESTADOS.PAUSA && keyCode === ENTER) {
    alternarPausa();
    return false;
  }

  if (estadoJuego === ESTADOS.NIVEL_COMPLETADO && (key === 'f' || key === 'F' || keyCode === ENTER)) {
    avanzarNivel();
    return false;
  }

  if ((estadoJuego === ESTADOS.VICTORIA || estadoJuego === ESTADOS.DERROTA) && (key === 'r' || key === 'R')) {
    iniciarPartidaNueva();
    return false;
  }

  if (estadoJuego !== ESTADOS.JUGANDO) return false;

  if (key === 'd' || key === 'D' || keyCode === RIGHT_ARROW) {
    moverDerecha = true;
    mirarIzquierda = false;
  }
  if (key === 'a' || key === 'A' || keyCode === LEFT_ARROW) {
    moverIzquierda = true;
    mirarIzquierda = true;
  }
  if (!enElAire && (keyCode === 32 || keyCode === UP_ARROW || key === 'w' || key === 'W')) {
    enElAire = true;
    tiempoInicioSalto = millis();
    velocidadSalto = 15;
  }
  return false;
}

function mousePressed() {
  if (estadoJuego === ESTADOS.MENU) {
    checkClicks();
    return;
  }

  if (estadoJuego === ESTADOS.PAUSA) {
    if (mouseX >= 180 && mouseX <= 420 && mouseY >= 220 && mouseY <= 262) alternarPausa();
    else if (mouseX >= 180 && mouseX <= 420 && mouseY >= 275 && mouseY <= 317) volverAlMenu();
  } else if (estadoJuego === ESTADOS.NIVEL_COMPLETADO) {
    if (mouseX >= 180 && mouseX <= 420 && mouseY >= 245 && mouseY <= 295) avanzarNivel();
  } else if (estadoJuego === ESTADOS.VICTORIA || estadoJuego === ESTADOS.DERROTA) {
    if (mouseX >= 180 && mouseX <= 420 && mouseY >= 235 && mouseY <= 277) iniciarPartidaNueva();
    else if (mouseX >= 180 && mouseX <= 420 && mouseY >= 285 && mouseY <= 327) volverAlMenu();
  }
}

function iniciarJuego() {
  iniciarPartidaNueva();
}
