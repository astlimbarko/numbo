const assert = require('assert');
const fs = require('fs');
const path = require('path');

const state = fs.readFileSync(path.join(
  __dirname, '..', 'JETS OFICIAL_2026_08_11_19_27_35', 'estado_juego.js'
), 'utf8');
const audio = fs.readFileSync(path.join(
  __dirname, '..', 'JETS OFICIAL_2026_08_11_19_27_35', 'audio_manager.js'
), 'utf8');

assert.match(state, /estadoJuego === ESTADOS\.PAUSA && keyCode === ENTER[\s\S]*?alternarPausa\(\)/,
  'Enter debe continuar la partida cuando el menu de pausa esta abierto');
assert.match(state, /text\('ENTER  \/  ESC'/,
  'el panel debe mostrar las dos teclas disponibles');
assert.match(audio, /!contextoAudioListo\(\)[\s\S]*?estadoJuego === ESTADOS\.PAUSA && keyCode === ENTER[\s\S]*?keyPressedSinAudio\(evento\)/,
  'el desbloqueo de audio no debe consumir Enter durante la pausa');
assert.match(audio, /keyPressedSinAudio\(evento\)/,
  'el evento de teclado debe conservarse entre controladores');
console.log('OK: Enter continua desde pausa y ESC conserva su acceso');
