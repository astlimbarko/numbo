const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const gestor = fs.readFileSync(
  'JETS OFICIAL_2026_08_11_19_27_35/fullscreen_manager.js',
  'utf8'
);

const entorno = `
const ESTADOS={MENU:'MENU',PAUSA:'PAUSED',JUGANDO:'PLAY'};
let estadoJuego=ESTADOS.MENU, mouseX=500, mouseY=20, keyCode=0;
const ESCAPE=27, ENTER=13;
let solicitudes=0, salidas=0;
const document={
  fullscreenElement:null,
  documentElement:{requestFullscreen(){solicitudes++;document.fullscreenElement=this;return Promise.resolve();}},
  exitFullscreen(){salidas++;document.fullscreenElement=null;return Promise.resolve();}
};
function draw(){} function mousePressed(){} function keyPressed(){}
function push(){} function pop(){} function stroke(){} function strokeWeight(){} function fill(){}
function rect(){} function noFill(){} function line(){} function color(){return 0;}
`;

const pruebas = `
if (!controlPantallaCompletaVisible()) throw new Error('control oculto en menú');
if (!mouseSobrePantallaCompleta()) throw new Error('hitbox incorrecta');
alternarPantallaCompleta();
Promise.resolve().then(() => {
  if (solicitudes!==1 || !pantallaCompletaActiva()) throw new Error('no entró en pantalla completa');
  keyCode=ESCAPE; keyPressed();
  if (salidas!==1 || pantallaCompletaActiva()) throw new Error('ESC no salió de pantalla completa');
  estadoJuego=ESTADOS.JUGANDO;
  if (controlPantallaCompletaVisible()) throw new Error('control visible durante la partida');
});
`;

const contexto = {console, module:{exports:{}}};
vm.runInNewContext(entorno + gestor + pruebas, contexto);
setImmediate(() => {
  assert.equal(contexto.module.exports.CONTROL_PANTALLA_COMPLETA.ancho, 48);
  console.log('OK: botón, entrada y salida de pantalla completa verificados');
});
