const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const game = path.join(__dirname, '..', 'JETS OFICIAL_2026_08_11_19_27_35');
const state = fs.readFileSync(path.join(game, 'estado_juego.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');

assert.match(state, /function dibujarPanelResultado\(esVictoria\)/);
assert.match(state, /dibujarPanelResultado\(true\)/, 'victoria no usa el panel profesional');
assert.match(state, /dibujarPanelResultado\(false\)/, 'derrota no usa el panel profesional');
assert.match(state, /dibujarDatoResultado\(traducir\('aciertos'\)/);
assert.match(state, /dibujarDatoResultado\(traducir\('incorrectas'\)/);
assert.match(state, /dibujarDatoResultado\(traducir\('puntaje'\)/);
assert.match(state, /dibujarBotonPausa\(textoPrincipal, 180, 235, 240, 42, true\)/);
assert.match(state, /dibujarBotonPausa\(traducir\('volverMenu'\), 180, 285, 240, 42, false\)/);
assert.match(state, /mouseX >= 180 && mouseX <= 420 && mouseY >= 235 && mouseY <= 277/);
assert.match(state, /mouseX >= 180 && mouseX <= 420 && mouseY >= 285 && mouseY <= 327/);
assert.match(html, /estado_juego\.js\?v=[^"']+/);

console.log('OK: victoria y derrota comparten estetica profesional y conservan sus clics');
