const fs = require('node:fs');
const assert = require('node:assert/strict');

const path = require('node:path');

const menu = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/menu.js', 'utf8');
const audio = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/audio_manager.js', 'utf8');

assert.match(menu, /opcionMenuHoverActual !== opcionMenuHoverAnterior/, 'el hover puede repetirse en cada fotograma');
assert.match(menu, /if \(overText\) opcionMenuHoverActual = identificador/, 'las opciones no registran el hover');
assert.match(menu, /reproducirSonidoHoverMenu\(\)/, 'el menú no solicita el sonido');
assert.match(audio, /!audioDesbloqueado \|\| audioSilenciado/, 'el hover no respeta bloqueo o silencio');
assert.match(audio, /sonidoHoverMenu\.play\(\)/, 'falta reproducir el WAV de navegación');
assert.match(audio, /sonidoHoverMenu\.setVolume\(0\.65\)/, 'el WAV no tiene volumen audible');
assert.equal(fs.existsSync(path.join('JETS OFICIAL_2026_08_11_19_27_35', 'sonidos', 'menu-hover.wav')), true, 'falta menu-hover.wav');
assert.equal(fs.existsSync(path.join('JETS OFICIAL_2026_08_11_19_27_35', 'sonidos', 'pausa-brillo.wav')), true, 'falta pausa-brillo.wav');
assert.match(audio, /estadoJuego === ESTADOS\.PAUSA[\s\S]*reproducirSonidoPausa\(\)/, 'la pausa no solicita su efecto brillante');
assert.ok(fs.statSync(path.join('JETS OFICIAL_2026_08_11_19_27_35', 'sonidos', 'menu-hover.wav')).size < 12000, 'el WAV de hover es demasiado pesado');

console.log('OK: hover único, breve y respetuoso del silencio verificado');
