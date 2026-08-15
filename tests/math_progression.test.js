const assert = require('node:assert/strict');
const fs = require('node:fs');
const {generarOperacionMatematica} = require('../JETS OFICIAL_2026_08_11_19_27_35/motor_matematico.js');

const MULTIPLICACION = '\u00d7';
const DIVISION = '\u00f7';
const objetivos = {1: 12, 2: 5, 3: 16};
const muestras = 30000;

function medirNivel(nivel) {
  const conteo = {'+': 0, '-': 0, [MULTIPLICACION]: 0, [DIVISION]: 0};
  let correctas = 0;
  let sumaResta = 0;
  let sumaRestaConNegativo = 0;
  for (let i = 0; i < muestras; i++) {
    const operacion = generarOperacionMatematica(objetivos[nivel], nivel);
    conteo[operacion.operador]++;
    if (operacion.esCorrecta) correctas++;
    if (['+', '-'].includes(operacion.operador)) {
      sumaResta++;
      if (operacion.num1 < 0 || operacion.num2 < 0) sumaRestaConNegativo++;
    }
  }
  return {
    conteo,
    proporcionCorrectas: correctas / muestras,
    proporcionNegativos: sumaRestaConNegativo / sumaResta
  };
}

function entre(valor, minimo, maximo, mensaje) {
  assert.ok(valor >= minimo && valor <= maximo, `${mensaje}: ${valor}`);
}

const nivel1 = medirNivel(1);
assert.equal(nivel1.conteo['+'], muestras);
assert.equal(nivel1.conteo['-'], 0);
assert.equal(nivel1.conteo[MULTIPLICACION], 0);
assert.equal(nivel1.conteo[DIVISION], 0);
entre(nivel1.proporcionCorrectas, 0.47, 0.53, 'nivel 1 no conserva 50/50');

const nivel2 = medirNivel(2);
entre(nivel2.conteo['+'] / muestras, 0.53, 0.57, 'nivel 2 no tiene 55% sumas');
entre(nivel2.conteo['-'] / muestras, 0.43, 0.47, 'nivel 2 no tiene 45% restas');
assert.equal(nivel2.conteo[MULTIPLICACION] + nivel2.conteo[DIVISION], 0);
entre(nivel2.proporcionCorrectas, 0.47, 0.53, 'nivel 2 no conserva 50/50');
entre(nivel2.proporcionNegativos, 0.20, 0.40, 'nivel 2 no presenta negativos ocasionales');

const nivel3 = medirNivel(3);
entre(nivel3.conteo['+'] / muestras, 0.33, 0.37, 'nivel 3 no tiene 35% sumas');
entre(nivel3.conteo['-'] / muestras, 0.28, 0.32, 'nivel 3 no tiene 30% restas');
entre(nivel3.conteo[MULTIPLICACION] / muestras, 0.18, 0.22, 'nivel 3 no tiene 20% multiplicaciones');
entre(nivel3.conteo[DIVISION] / muestras, 0.13, 0.17, 'nivel 3 no tiene 15% divisiones');
entre(nivel3.proporcionCorrectas, 0.47, 0.53, 'nivel 3 no conserva 50/50');
entre(nivel3.proporcionNegativos, 0.25, 0.45, 'nivel 3 no presenta negativos ocasionales');

const colisiones = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/colisiones_mejoradas.js', 'utf8');
assert.match(colisiones, /const misionAnterior = mision/);
assert.match(colisiones, /obstaculos\.length = 0/, 'no se retiran operaciones de la mision anterior');

console.log('OK: progresion 100%; 55/45; 35/30/20/15 y respuestas 50/50 verificadas');
