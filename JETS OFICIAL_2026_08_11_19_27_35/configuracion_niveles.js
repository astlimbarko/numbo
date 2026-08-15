const FPS_OBJETIVO = 60;
const ANCHO_LOGICO_JUEGO = 600;
const ANCHO_MAXIMO_OPERACION = 270;

const CONFIGURACION_NIVELES = Object.freeze({
  1: Object.freeze({
    velocidadOperacion: 6,
    intervaloOperacion: 90,
    velocidadMapa: 3.5,
    velocidadPersonaje: 6
  }),
  2: Object.freeze({
    velocidadOperacion: 7,
    intervaloOperacion: 90,
    velocidadMapa: 7.5,
    velocidadPersonaje: 6
  }),
  3: Object.freeze({
    velocidadOperacion: 8,
    intervaloOperacion: 65,
    velocidadMapa: 11.5,
    velocidadPersonaje: 8
  })
});

function obtenerConfiguracionNivel(nivelActual) {
  return CONFIGURACION_NIVELES[nivelActual] || CONFIGURACION_NIVELES[1];
}

function medirEquilibrioNivel(nivelActual) {
  const config = obtenerConfiguracionNivel(nivelActual);
  const fotogramasVisibles = (ANCHO_LOGICO_JUEGO + ANCHO_MAXIMO_OPERACION) / config.velocidadOperacion;
  return {
    segundosEntreOperaciones: config.intervaloOperacion / FPS_OBJETIVO,
    segundosVisibles: fotogramasVisibles / FPS_OBJETIVO,
    segundosEntreCorrectasEstimado: config.intervaloOperacion / FPS_OBJETIVO / 0.5,
    maximoSimultaneoEstimado: Math.ceil(fotogramasVisibles / config.intervaloOperacion)
  };
}

if (typeof module !== 'undefined' && module.exports) module.exports = {CONFIGURACION_NIVELES, obtenerConfiguracionNivel, medirEquilibrioNivel};
