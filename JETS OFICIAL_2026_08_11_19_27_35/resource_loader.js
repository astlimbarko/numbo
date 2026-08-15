const recursosCargados = {
  comunes: false,
  niveles: {1: false, 2: false, 3: false}
};

const cargasNivelActivas = {1: null, 2: null, 3: null};
let temporizadorPrecarga = null;
let mensajeCargaRecursos = '';
let errorCargaRecursos = '';

function cargarImagen(ruta, asignar) {
  return new Promise((resolve, reject) => {
    loadImage(ruta, (imagen) => {
      asignar(imagen);
      resolve(imagen);
    }, () => reject(new Error(`No se pudo cargar ${ruta}`)));
  });
}

function cargarAudio(ruta, asignar) {
  return new Promise((resolve, reject) => {
    loadSound(ruta, (audio) => {
      asignar(audio);
      resolve(audio);
    }, () => reject(new Error(`No se pudo cargar ${ruta}`)));
  });
}

async function cargarRecursosComunes() {
  if (recursosCargados.comunes) return;

  await Promise.all([
    cargarAudio('sonidos/correct.mp3', (valor) => { sonidoCorrecto = valor; }),
    cargarAudio('sonidos/fallo.mp3', (valor) => { sonidoIncorrecto = valor; }),
    cargarAudio('sonidos/ganaste.mp3', (valor) => { sonidoGanaste = valor; }),
    cargarImagen('img/barra_superior/corazon.png', (valor) => { corazonImg = valor; }),
    cargarImagen('img/barra_superior/copa.png', (valor) => { copa = valor; }),
    cargarImagen('img/barra_superior/mision.png', (valor) => { hallar_m = valor; }),
    cargarImagen('img/num.png', (valor) => { numberImg = valor; }),
    cargarImagen('img/numbiRun.png', (valor) => { kind = valor; })
  ]);

  imgs.length = 0;
  setupNumbi();
  recursosCargados.comunes = true;
  aplicarSilencio();
}

function cargarRecursosMapa1() {
  return Promise.all([
    cargarAudio('sonidos/sonidoMapa1.mp3', (valor) => { sonidoMapa1 = valor; }),
    cargarImagen('img/maps/mapa1/back_0.png', (valor) => { fondo = valor; }),
    cargarImagen('img/maps/mapa1/nube1.png', (valor) => { nube1 = valor; }),
    cargarImagen('img/maps/mapa1/mont1.png', (valor) => { mont1 = valor; }),
    cargarImagen('img/maps/mapa1/mont2.png', (valor) => { mont2 = valor; }),
    cargarImagen('img/maps/mapa1/mont3.png', (valor) => { mont3 = valor; }),
    cargarImagen('img/maps/mapa1/mont4.png', (valor) => { mont4 = valor; }),
    cargarImagen('img/maps/mapa1/cartel.png', (valor) => { cartel = valor; }),
    cargarImagen('img/maps/mapa1/bosque1.png', (valor) => { bosque = valor; }),
    cargarImagen('img/maps/mapa1/suelo.png', (valor) => { piso = valor; })
  ]);
}

function cargarRecursosMapa2() {
  return Promise.all([
    cargarAudio('sonidos/sonidoMapa2.mp3', (valor) => { sonidoMapa2 = valor; }),
    cargarImagen('img/maps/mapa2/fondo.png', (valor) => { fondo2 = valor; }),
    cargarImagen('img/maps/mapa2/silueta_ciudad.png', (valor) => { siluetaCiudad = valor; }),
    cargarImagen('img/maps/mapa2/piedras.png', (valor) => { piedras = valor; }),
    cargarImagen('img/maps/mapa2/ciudad.png', (valor) => { ciudad = valor; }),
    cargarImagen('img/maps/mapa2/suelo.png', (valor) => { suelo2 = valor; })
  ]);
}

function cargarRecursosMapa3() {
  return Promise.all([
    cargarAudio('sonidos/sonidoMapa3.mp3', (valor) => { sonidoMapa3 = valor; }),
    cargarImagen('img/maps/mapa3/fondo.png', (valor) => { fondo3 = valor; }),
    cargarImagen('img/maps/mapa3/arboles1.png', (valor) => { arboles1 = valor; }),
    cargarImagen('img/maps/mapa3/arboles2.png', (valor) => { arboles2 = valor; }),
    cargarImagen('img/maps/mapa3/suelo1.png', (valor) => { piso1 = valor; }),
    cargarImagen('img/maps/mapa3/suelo2.png', (valor) => { piso2 = valor; }),
    cargarImagen('img/maps/mapa3/arboles3.png', (valor) => { arboles3 = valor; }),
    cargarImagen('img/maps/mapa3/mont1.png', (valor) => { monta1 = valor; }),
    cargarImagen('img/maps/mapa3/mont2.png', (valor) => { monta2 = valor; }),
    cargarImagen('img/maps/mapa3/mont3.png', (valor) => { monta3 = valor; }),
    cargarImagen('img/maps/mapa3/nubes1.png', (valor) => { nubes = valor; }),
    cargarImagen('img/maps/mapa3/nubes2.png', (valor) => { nubes2 = valor; })
  ]);
}

async function cargarRecursosParaNivel(numeroNivel, opciones = {}) {
  if (recursosCargados.niveles[numeroNivel]) return;
  if (cargasNivelActivas[numeroNivel]) return cargasNivelActivas[numeroNivel];

  if (!opciones.enSegundoPlano) {
    mensajeCargaRecursos = `Preparando nivel ${numeroNivel}`;
    errorCargaRecursos = '';
  }

  cargasNivelActivas[numeroNivel] = (async () => {
    await cargarRecursosComunes();
    if (numeroNivel === 1) await cargarRecursosMapa1();
    else if (numeroNivel === 2) await cargarRecursosMapa2();
    else await cargarRecursosMapa3();
    recursosCargados.niveles[numeroNivel] = true;
    aplicarSilencio();
  })();

  try {
    await cargasNivelActivas[numeroNivel];
  } finally {
    cargasNivelActivas[numeroNivel] = null;
  }
}

async function precargarNivelesSiguientes(nivelActual) {
  for (let numeroNivel = nivelActual + 1; numeroNivel <= 3; numeroNivel++) {
    try {
      await cargarRecursosParaNivel(numeroNivel, {enSegundoPlano: true});
    } catch (error) {
      console.warn(`No se pudo precargar el nivel ${numeroNivel}`, error);
    }
  }
}

function programarPrecargaNiveles(nivelActual) {
  if (temporizadorPrecarga !== null) return;
  temporizadorPrecarga = setTimeout(() => {
    temporizadorPrecarga = null;
    precargarNivelesSiguientes(nivelActual);
  }, 800);
}

function dibujarCargaRecursos() {
  if (imgMenu) image(imgMenu, 0, 0, width, height);
  else background(117, 214, 160);

  fill(255, 255, 255, 235);
  stroke(77, 35, 180);
  strokeWeight(4);
  rect(130, 115, 340, 170, 22);
  noStroke();
  fill(77, 35, 180);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(29);
  text('NUMBO', width / 2, 155);
  textFont('Arial');
  textSize(19);
  const puntos = '.'.repeat((floor(frameCount / 18) % 3) + 1);
  text(`${mensajeCargaRecursos}${puntos}`, width / 2, 205);
  textSize(14);
  fill(65);
  text('Esto solo ocurrirá la primera vez', width / 2, 245);
}
