let audioDesbloqueado = false;
let audioSilenciado = localStorage.getItem('numbo.audio.silenciado') === 'true';
let pistaActual = null;
let mostrarAudioHasta = 0;
let iconoSpeaker;

const preloadSinControlAudio = preload;
preload = function preloadConControlAudio() {
  preloadSinControlAudio();
  iconoSpeaker = loadImage('img/speaker.webp');
};

function nombrePistaParaEstado(estado, nivelActual) {
  if (estado === ESTADOS.MENU) return 'menu';
  if (estado === ESTADOS.JUGANDO || estado === ESTADOS.PAUSA || estado === ESTADOS.NIVEL_COMPLETADO) {
    return `nivel${Math.max(1, Math.min(3, nivelActual))}`;
  }
  return null;
}

function obtenerPista(nombre) {
  if (nombre === 'menu') return sonidoFondo;
  if (nombre === 'nivel1') return sonidoMapa1;
  if (nombre === 'nivel2') return sonidoMapa2;
  if (nombre === 'nivel3') return sonidoMapa3;
  return null;
}

function todasLasPistas() {
  return [sonidoFondo, sonidoMapa1, sonidoMapa2, sonidoMapa3].filter(Boolean);
}

function aplicarSilencio() {
  todasLasPistas().forEach((pista) => pista.setVolume(audioSilenciado ? 0 : 0.3));
  [sonidoCorrecto, sonidoIncorrecto, sonidoGanaste]
    .filter(Boolean)
    .forEach((efecto) => efecto.setVolume(audioSilenciado ? 0 : 1));
}
  if (sonidoHoverMenu) sonidoHoverMenu.setVolume(audioSilenciado ? 0 : 0.65);
  if (sonidoPausa) sonidoPausa.setVolume(audioSilenciado ? 0 : 0.8);

function alternarSilencio() {
  audioSilenciado = !audioSilenciado;
  localStorage.setItem('numbo.audio.silenciado', String(audioSilenciado));
  mostrarAudioHasta = frameCount + 90;
  aplicarSilencio();
}

function detenerTodasLasPistas() {
  todasLasPistas().forEach((pista) => {
    if (pista.isPlaying() || (pista.isPaused && pista.isPaused())) pista.stop();
  });
  pistaActual = null;
}

function iniciarPista(pista) {
  if (!audioDesbloqueado || !pista) return;
  if (pistaActual && pistaActual !== pista) pistaActual.stop();
  pistaActual = pista;
  pista.setVolume(audioSilenciado ? 0 : 0.3);
  if (!pista.isPlaying()) pista.loop();
}

function pausarPistaActual() {
  if (pistaActual && pistaActual.isPlaying()) pistaActual.pause();
}

function reanudarPistaActual() {
  if (!audioDesbloqueado || !pistaActual) return;
  if (pistaActual.isPaused && pistaActual.isPaused()) pistaActual.play();
  else if (!pistaActual.isPlaying()) pistaActual.loop();
}

function detenerEfectosDeJuego() {
  [sonidoCorrecto, sonidoIncorrecto].filter(Boolean).forEach((efecto) => {
    if (efecto.isPlaying()) efecto.stop();
  });
}

function sincronizarMusica(estadoAnterior, nuevoEstado) {
  if (!audioDesbloqueado || estadoAnterior === nuevoEstado) return;

  if (nuevoEstado === ESTADOS.PAUSA || nuevoEstado === ESTADOS.NIVEL_COMPLETADO) {
    detenerEfectosDeJuego();
    pausarPistaActual();
    return;
  }

  if (nuevoEstado === ESTADOS.VICTORIA || nuevoEstado === ESTADOS.DERROTA) {
    detenerTodasLasPistas();
    return;
  }

  if (estadoAnterior === ESTADOS.PAUSA && nuevoEstado === ESTADOS.JUGANDO) {
    reanudarPistaActual();
    return;
  }

  const nombre = nombrePistaParaEstado(nuevoEstado, nivel);
  const siguientePista = obtenerPista(nombre);
  if (siguientePista !== pistaActual) {
    detenerTodasLasPistas();
    iniciarPista(siguientePista);
  } else {
    reanudarPistaActual();
  }
}

function reproducirSonidoHoverMenu() {
  if (!audioDesbloqueado || audioSilenciado || !sonidoHoverMenu) return;
  if (sonidoHoverMenu.isPlaying()) sonidoHoverMenu.stop();
  sonidoHoverMenu.setVolume(0.65);
  sonidoHoverMenu.play();
}

function reproducirSonidoPausa() {
  if (!audioDesbloqueado || audioSilenciado || !sonidoPausa) return;
  if (sonidoPausa.isPlaying()) sonidoPausa.stop();
  sonidoPausa.setVolume(0.8);
  sonidoPausa.play();
}

function desbloquearAudio() {
  if (audioDesbloqueado) return;
  audioDesbloqueado = true;
  aplicarSilencio();

  if (typeof userStartAudio === 'function') {
    const inicio = userStartAudio();
    if (inicio && typeof inicio.then === 'function') {
      inicio.then(() => iniciarPista(obtenerPista(nombrePistaParaEstado(estadoJuego, nivel))));
      return;
    }
  }
  iniciarPista(obtenerPista(nombrePistaParaEstado(estadoJuego, nivel)));
}

function playSound(sonido) {
  if (!audioDesbloqueado || !sonido) return;
  iniciarPista(sonido);
}

function stopSound(sonido) {
  if (!sonido || sonido === pistaActual) return;
  if (sonido.isPlaying() || (sonido.isPaused && sonido.isPaused())) sonido.stop();
}

function dibujarPantallaInicioAudio() {
  fill(20, 20, 45, 225);
  noStroke();
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(30);
  text('NUMBO', width / 2, height / 2 - 45);
  textFont('Arial');
  textSize(21);
  text('Haz clic o presiona una tecla para comenzar', width / 2, height / 2 + 15);
  textSize(15);
  text('El sonido comenzará después de tu interacción', width / 2, height / 2 + 52);
}

function controlAudioVisible() {
  const encima = mouseX >= 540 && mouseX <= 590 && mouseY >= 10 && mouseY <= 52;
  return audioSilenciado || estadoJuego === ESTADOS.MENU || estadoJuego === ESTADOS.PAUSA || frameCount <= mostrarAudioHasta || encima;
}

function dibujarControlAudio() {
  const encima = mouseX >= 540 && mouseX <= 590 && mouseY >= 10 && mouseY <= 52;
  push();
  stroke(30);
  strokeWeight(1);
  fill(encima ? color(255, 255, 255, 230) : color(255, 255, 255, 185));
  rect(540, 10, 50, 42, 10);

  image(iconoSpeaker, 550, 17, 30, 28);
  if (audioSilenciado || estadoJuego === ESTADOS.PAUSA) {
    stroke(210, 35, 35);
    strokeWeight(4);
    line(549, 16, 581, 46);
  }
  pop();
}

const cambiarEstadoSinAudio = cambiarEstado;
cambiarEstado = function cambiarEstadoConAudio(nuevoEstado) {
  const estadoAnterior = estadoJuego;
  cambiarEstadoSinAudio(nuevoEstado);
  sincronizarMusica(estadoAnterior, estadoJuego);
  if (estadoAnterior !== estadoJuego && estadoJuego === ESTADOS.PAUSA) {
    reproducirSonidoPausa();
  }
};

const dibujarSinControlAudio = draw;
draw = function dibujarConControlAudio() {
  dibujarSinControlAudio();
  if (controlAudioVisible()) dibujarControlAudio();
};

const mousePressedSinAudio = mousePressed;
mousePressed = function mousePressedConAudio() {
  if (!audioDesbloqueado) {
    desbloquearAudio();
  }
  if (controlAudioVisible() && mouseX >= 540 && mouseX <= 590 && mouseY >= 10 && mouseY <= 52) {
    alternarSilencio();
  }
  return mousePressedSinAudio();
};

const keyPressedSinAudio = keyPressed;
keyPressed = function keyPressedConAudio() {
  if (!audioDesbloqueado) {
    desbloquearAudio();
    return false;
  }
  if (key === 'm' || key === 'M') {
    alternarSilencio();
    return false;
  }
  return keyPressedSinAudio();
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {nombrePistaParaEstado};
}
