const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const numbi = fs.readFileSync(path.join(game, 'numbi.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');

assert.match(numbi, /function dibujarSombraNumbi\(\)/, 'falta la función de sombra');
assert.match(numbi, /ellipse\(posX \+ ancho_sp \/ 2, posYInicial \+ 73, 44, 10\)/, 'la sombra debe seguir X y permanecer fija en el suelo');
assert.doesNotMatch(numbi, /ellipse\(posX \+ ancho_sp \/ 2, posY \+ 73/, 'la sombra no debe saltar con Numbi');
assert.ok(
  numbi.indexOf('dibujarSombraNumbi();') < numbi.indexOf('image(imgs[indice]'),
  'la sombra debe dibujarse detrás del personaje'
);
assert.match(html, /numbi\.js\?v=20260815-wind3/, 'el navegador debe descargar la nueva versión');
console.log('OK: sombra de Numbi fija en el suelo y detrás del personaje');
