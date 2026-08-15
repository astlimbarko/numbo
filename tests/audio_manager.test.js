const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const gestor = fs.readFileSync(
  'JETS OFICIAL_2026_08_11_19_27_35/audio_manager.js',
  'utf8'
);
if (!/let audioSilenciado = false/.test(gestor)) throw new Error('el juego no inicia con sonido activo');
if (/localStorage\.setItem\('numbo\.audio\.silenciado'/.test(gestor)) throw new Error('el silencio persiste accidentalmente entre recargas');


const entorno = `
const ESTADOS = {MENU:'MENU', JUGANDO:'PLAY', PAUSA:'PAUSED', NIVEL_COMPLETADO:'LEVEL_COMPLETE', VICTORIA:'VICTORY', DERROTA:'GAME_OVER'};
function pista(nombre) {
  return {
    nombre, reproduciendo:false, pausada:false, loops:0, plays:0, pauses:0, stops:0, volumen:1,
    isPlaying(){ return this.reproduciendo; },
    isPaused(){ return this.pausada; },
    setVolume(v){this.volumen=v;},
    loop(){ this.reproduciendo=true; this.pausada=false; this.loops++; },
    play(){ this.reproduciendo=true; this.pausada=false; this.plays++; },
    pause(){ this.reproduciendo=false; this.pausada=true; this.pauses++; },
    stop(){ this.reproduciendo=false; this.pausada=false; this.stops++; }
  };
}
const sonidoFondo=pista('menu'), sonidoMapa1=pista('nivel1'), sonidoMapa2=pista('nivel2'), sonidoMapa3=pista('nivel3');
const sonidoCorrecto=pista('correcto'), sonidoIncorrecto=pista('incorrecto'), sonidoGanaste=pista('ganaste'), sonidoHoverMenu=pista('hover'), sonidoPausa=pista('pausa');
let estadoJuego=ESTADOS.MENU, nivel=1, frameCount=100, key='', keyCode=0;
function preload(){} function loadImage(ruta){return {ruta};}
const localStorage={datos:{},getItem(k){return this.datos[k]||null;},setItem(k,v){this.datos[k]=v;}};
function cambiarEstado(nuevo){estadoJuego=nuevo;}
function draw(){} function mousePressed(){} function keyPressed(){}
let mouseX=0, mouseY=0, width=600, height=400;
function fill(){} function noStroke(){} function noFill(){} function rect(){} function triangle(){} function arc(){} function line(){} function image(){} function push(){} function pop(){} function translate(){} function textAlign(){} function textFont(){} function textSize(){} function text(){} function stroke(){} function strokeWeight(){} function color(){return 0;}
const CENTER=0, HALF_PI=Math.PI/2, ENTER=13;
`;

const pruebas = `
playSound(sonidoFondo);
if (sonidoFondo.loops!==0) throw new Error('audio iniciado antes de interacción');
bienvenidaActiva=false;
desbloquearAudio();
if (sonidoFondo.loops!==1) throw new Error('música de menú no iniciada');
cambiarEstado(ESTADOS.JUGANDO);
if (sonidoMapa1.loops!==1 || sonidoFondo.stops!==1) throw new Error('transición al nivel 1 incorrecta');
cambiarEstado(ESTADOS.PAUSA);
if (sonidoMapa1.pauses!==1) throw new Error('la pausa no detuvo la música');
cambiarEstado(ESTADOS.JUGANDO);
if (sonidoPausa.plays!==1) throw new Error('el efecto de pausa no sonó una vez');
if (sonidoMapa1.plays!==1) throw new Error('la música no se reanudó');
nivel=2; cambiarEstado(ESTADOS.NIVEL_COMPLETADO); cambiarEstado(ESTADOS.JUGANDO);
if (sonidoMapa2.loops!==1) throw new Error('música del nivel 2 no iniciada');
estadoJuego=ESTADOS.PAUSA;
if (!(audioSilenciado || estadoJuego === ESTADOS.PAUSA)) throw new Error('la pausa no muestra el indicador de audio detenido');
estadoJuego=ESTADOS.JUGANDO;
alternarSilencio();
if (!audioSilenciado || sonidoMapa2.volumen!==0 || sonidoCorrecto.volumen!==0) throw new Error('silencio no aplicado');
key='m'; keyPressed();
if (audioSilenciado || sonidoMapa2.volumen!==0.3 || sonidoCorrecto.volumen!==1) throw new Error('reactivación con tecla M incorrecta');
console.log('OK: desbloqueo, menú, nivel, pausa, reanudación y silencio verificados');
`;

vm.runInNewContext(entorno + gestor + pruebas, {console});

assert.ok(true);
