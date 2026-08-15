const assert = require('node:assert/strict');
const fs = require('node:fs');
const transicion = require('../JETS OFICIAL_2026_08_11_19_27_35/transicion_nivel.js');

assert.equal(transicion.CANTIDAD_FRANJAS_PINTURA, 22);
assert.equal(transicion.DURACION_TOTAL_TRANSICION, 1500);
assert.equal(transicion.ESPERA_PRIMERA_OPERACION, 650);
assert.equal(transicion.progresoSuavizado(-1), 0);
assert.equal(transicion.progresoSuavizado(0), 0);
assert.equal(transicion.progresoSuavizado(0.5), 0.125);
assert.equal(transicion.progresoSuavizado(1), 1);
assert.equal(transicion.progresoSuavizado(2), 1);

const estado = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/estado_juego.js', 'utf8');
const numeros = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/NrosAleatorios/Principal.js', 'utf8');
const audio = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/audio_manager.js', 'utf8');
const html = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');
const source = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/transicion_nivel.js', 'utf8');

assert.match(estado, /TRANSICION_NIVEL: 'LEVEL_TRANSITION'/);
assert.match(estado, /iniciarTransicionNivel\(\)/);
assert.doesNotMatch(estado, /pasar_nivel = true;[\s\S]{0,80}cambiarEstado\(ESTADOS\.NIVEL_COMPLETADO\)/);
assert.match(numeros, /millis\(\) >= operacionesSuspendidasHasta/);
assert.match(audio, /ESTADOS\.TRANSICION_NIVEL/);
const posicionTransicion = estado.indexOf('if (estadoJuego === ESTADOS.TRANSICION_NIVEL)');
const posicionMenu = estado.indexOf('if (estadoJuego === ESTADOS.MENU)');
assert.ok(posicionTransicion >= 0 && posicionTransicion < posicionMenu, 'la transición no tiene prioridad en draw');
assert.match(html, /transicion_nivel\.js\?v=20260815-transition1/);
assert.match(source, /capturaNivelAnterior = get\(0, 0, width, height\)/);
assert.match(source, /obstaculos\.length = 0/);
assert.match(source, /nivel\+\+/);
assert.match(source, /cambiarEstado\(ESTADOS\.JUGANDO\)/);
assert.doesNotMatch(source, /drawingContext|filter\s*\(|loadImage|createGraphics/);

console.log('OK: transicion automatica de pintura, audio nuevo y operaciones suspendidas verificados');
