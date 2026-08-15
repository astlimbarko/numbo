const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {CONFIGURACION_NIVELES} = require('../JETS OFICIAL_2026_08_11_19_27_35/configuracion_niveles.js');

const game = path.join(__dirname, '..', 'JETS OFICIAL_2026_08_11_19_27_35');
const maps = fs.readFileSync(path.join(game, 'maps.js'), 'utf8');
const state = fs.readFileSync(path.join(game, 'estado_juego.js'), 'utf8');
const collisions = fs.readFileSync(path.join(game, 'colisiones_mejoradas.js'), 'utf8');
const transition = fs.readFileSync(path.join(game, 'transicion_nivel.js'), 'utf8');

const primerPlano = [
  CONFIGURACION_NIVELES[1].velocidadMapa * 1.4,
  CONFIGURACION_NIVELES[2].velocidadMapa * 1.2,
  CONFIGURACION_NIVELES[3].velocidadMapa * 0.8
];
assert.ok(primerPlano[1] > primerPlano[0], 'el primer plano del nivel 2 no supera al nivel 1');
assert.ok(primerPlano[2] > primerPlano[1], 'el primer plano del nivel 3 no supera al nivel 2');

assert.match(maps, /nubes_x - nubes\.width/);
assert.match(maps, /nubes2_x - nubes2\.width/);
assert.match(maps, /nubes_x >= nubes\.width/);
assert.match(maps, /nubes2_x >= nubes2\.width/);

assert.match(collisions, /Acertadas >= 10 && Objetivos1/);
assert.match(collisions, /Acertadas >= 20 && Objetivos2/);
assert.match(collisions, /Acertadas >= 30 && Objetivos3/);
assert.match(state, /nivel === 1 && nivel_completado1/);
assert.match(state, /nivel === 2 && nivel_completado2/);
assert.match(state, /nivel_completado3\) cambiarEstado\(ESTADOS\.VICTORIA\)/);
assert.match(transition, /obstaculos\.length = 0/);
assert.match(transition, /nivel\+\+/);
assert.match(transition, /cambiarEstado\(ESTADOS\.TRANSICION_NIVEL\)/);

console.log('OK: parallax continuo, progresion 10/20/30, transiciones y victoria verificados');
