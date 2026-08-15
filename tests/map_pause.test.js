const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {obtenerConfiguracionNivel} = require('../JETS OFICIAL_2026_08_11_19_27_35/configuracion_niveles.js');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const source = fs.readFileSync(path.join(game, 'draw_num_pers.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');
const functionSource = source.match(/function velocidadMapaPorEstado\(nivelActual\) \{[\s\S]*?\n\}/)?.[0];

assert.ok(functionSource, 'falta el control de velocidad por estado');

function velocidad(estadoJuego, nivelActual) {
  const context = {
    ESTADOS: { JUGANDO: 'PLAY' },
    estadoJuego,
    obtenerConfiguracionNivel,
    nivelActual,
    result: null
  };
  vm.runInNewContext(`${functionSource}; result = velocidadMapaPorEstado(nivelActual);`, context);
  return context.result;
}

assert.equal(velocidad('PLAY', 1), 3.5);
assert.equal(velocidad('PLAY', 2), 7.5);
assert.equal(velocidad('PLAY', 3), 11.5);
for (const estado of ['PAUSED', 'LEVEL_COMPLETE', 'VICTORY', 'GAME_OVER']) {
  assert.equal(velocidad(estado, 1), 0);
  assert.equal(velocidad(estado, 2), 0);
  assert.equal(velocidad(estado, 3), 0);
}

assert.match(html, /draw_num_pers\.js\?v=[^"']+/);
console.log('OK: todos los mapas se detienen fuera del estado PLAY');
