const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const source = fs.readFileSync(path.join(game, 'draw_num_pers.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');
const functionSource = source.match(/function velocidadMapaPorEstado\(incrementoNivel\) \{[\s\S]*?\n\}/)?.[0];

assert.ok(functionSource, 'falta el control de velocidad por estado');

function velocidad(estadoJuego, incrementoNivel) {
  const context = {
    ESTADOS: { JUGANDO: 'PLAY' },
    estadoJuego,
    velocidadGeneral: estadoJuego === 'PLAY' ? 3.5 : 0,
    incrementoNivel,
    result: null
  };
  vm.runInNewContext(`${functionSource}; result = velocidadMapaPorEstado(incrementoNivel);`, context);
  return context.result;
}

assert.equal(velocidad('PLAY', 0), 3.5);
assert.equal(velocidad('PLAY', 4), 7.5);
assert.equal(velocidad('PLAY', 8), 11.5);
for (const estado of ['PAUSED', 'LEVEL_COMPLETE', 'VICTORY', 'GAME_OVER']) {
  assert.equal(velocidad(estado, 0), 0);
  assert.equal(velocidad(estado, 4), 0);
  assert.equal(velocidad(estado, 8), 0);
}

assert.match(html, /draw_num_pers\.js\?v=20260815-freezemap1/);
console.log('OK: todos los mapas se detienen fuera del estado PLAY');
