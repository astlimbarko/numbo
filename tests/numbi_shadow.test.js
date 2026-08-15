const fs = require('node:fs');
const assert = require('node:assert/strict');

const numbi = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/numbi.js', 'utf8');
const estado = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/estado_juego.js', 'utf8');
const html = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');

const sombra = numbi.match(/function dibujarSombraNumbi\(\)\s*\{([\s\S]*?)\n\}/)[1];
assert.match(sombra, /posX\s*\+\s*ancho_sp\s*\/\s*2/, 'la sombra no sigue horizontalmente a Numbi');
assert.match(sombra, /posYInicial\s*\+\s*77/, 'la sombra no está anclada al suelo');
assert.doesNotMatch(sombra, /\bposY\b/, 'la sombra sube junto con el personaje');
assert.ok((sombra.match(/ellipse\(/g) || []).length >= 3, 'la sombra no tiene bordes suaves por capas');
assert.match(numbi, /function drawNumbi[\s\S]*dibujarSombraNumbi\(\)[\s\S]*image\(/, 'la sombra no se dibuja detrás del personaje');
assert.match(estado, /function dibujarNumbiEstatico[\s\S]*dibujarSombraNumbi\(\)/, 'la sombra desaparece en pausa');
assert.match(html, /numbi\.js\?v=20260815-1/, 'el navegador puede conservar Numbi sin sombra');

console.log('OK: sombra suave, fija al suelo y detrás de Numbi verificada');
