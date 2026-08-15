const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const maps = fs.readFileSync(path.join(game, 'maps.js'), 'utf8');
const levels = fs.readFileSync(path.join(game, 'draw_num_pers.js'), 'utf8');
const state = fs.readFileSync(path.join(game, 'estado_juego.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');

assert.match(maps, /arboles1_x -= velocidad \* 0\.8/);
assert.match(maps, /arboles2_x -= velocidad \* 0\.8/);
assert.match(maps, /piso1_x -= velocidad \* 0\.8/);
assert.match(maps, /piso2_x -= velocidad \* 0\.5/);
assert.match(maps, /arboles3_x -= velocidad \* 0\.25/);

// La dificultad lógica existente no forma parte de esta microtarea.
assert.match(levels, /velocidad = velocidadMapaPorEstado\(1\)/);
assert.match(levels, /velocidad = velocidadMapaPorEstado\(2\)/);
assert.match(levels, /velocidad = velocidadMapaPorEstado\(3\)/);
assert.match(state, /velo = configuracion\.velocidadOperacion/);
assert.match(state, /inter = configuracion\.intervaloOperacion/);
assert.match(html, /configuracion_niveles\.js\?v=[^"']+/);

console.log('OK: nivel 3 acelera visualmente sin cambiar su dificultad lógica');
