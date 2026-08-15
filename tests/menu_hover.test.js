const fs = require('node:fs');
const assert = require('node:assert/strict');

const menu = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/menu.js', 'utf8');
const audio = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/audio_manager.js', 'utf8');

assert.match(menu, /opcionMenuHoverActual !== opcionMenuHoverAnterior/, 'el hover puede repetirse en cada fotograma');
assert.match(menu, /if \(overText\) opcionMenuHoverActual = identificador/, 'las opciones no registran el hover');
assert.match(menu, /reproducirSonidoHoverMenu\(\)/, 'el menú no solicita el sonido');
assert.match(audio, /!audioDesbloqueado \|\| audioSilenciado/, 'el hover no respeta bloqueo o silencio');
assert.match(audio, /createOscillator\(\)/, 'falta el tono breve de navegación');
assert.match(audio, /ahora \+ 0\.075/, 'el sonido de navegación es demasiado largo');

console.log('OK: hover único, breve y respetuoso del silencio verificado');
