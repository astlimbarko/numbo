const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const state = fs.readFileSync(path.join(game, 'estado_juego.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');
const functionSource = state.match(/function obtenerNivelInicial\(\) \{[\s\S]*?\n\}/)?.[0];

assert.ok(functionSource, 'falta el lector del nivel de prueba');

function obtenerNivel(search) {
  const context = {
    window: { location: { search } },
    URLSearchParams,
    result: null
  };
  vm.runInNewContext(`${functionSource}; result = obtenerNivelInicial();`, context);
  return context.result;
}

assert.equal(obtenerNivel(''), 1);
assert.equal(obtenerNivel('?testLevel=1'), 1);
assert.equal(obtenerNivel('?testLevel=2'), 2);
assert.equal(obtenerNivel('?testLevel=3'), 3);
assert.equal(obtenerNivel('?testLevel=4'), 1);
assert.equal(obtenerNivel('?testLevel=texto'), 1);

assert.match(state, /const aciertosPrevios = \(nivel - 1\) \* 10/);
assert.match(state, /Objetivos1 = nivel === 1/);
assert.match(state, /Objetivos2 = nivel <= 2/);
assert.match(html, /estado_juego\.js\?v=20260815-testlevel1/);

console.log('OK: testLevel abre niveles 1-3 y conserva el inicio normal');
