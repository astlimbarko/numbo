const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const source = fs.readFileSync(path.join(game, 'numbi.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');

assert.match(source, /function dibujarVientoAmbienteNumbi\(\)/);
assert.match(source, /function dibujarVientoNumbi\(\)/);
assert.match(source, /nivel !== 3/);
assert.match(source, /estadoJuego !== ESTADOS\.JUGANDO/);
assert.match(source, /moverDerecha !== moverIzquierda/);
assert.match(source, /const direccion = moverDerecha \? 1 : -1/);
assert.match(source, /const y = posY \+ 18/);
assert.match(source, /stroke\(240, 253, 255/);
assert.match(source, /stroke\(45, 190, 255/);
assert.match(source, /stroke\(75, 78, 82/);
assert.match(source, /stroke\(20, 22, 25/);

const windCall = source.indexOf('dibujarVientoNumbi();');
const spriteCall = source.indexOf('image(imgs[indice]');
assert.ok(windCall >= 0 && windCall < spriteCall, 'el viento debe dibujarse detrás del sprite');
assert.match(html, /numbi\.js\?v=20260815-wind3/);

console.log('OK: viento visible solo al mover Numbi en el nivel 3');
