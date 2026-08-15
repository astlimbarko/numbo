const assert = require('node:assert/strict');
const {
  calcularResultado,
  generarOperacionMatematica,
  elegirFamiliaOperacionNivel3,
  elegirOperadorPorNivel,
  operacionTieneOperandosGrandes,
  conservarOperacionGrande
} = require('../JETS OFICIAL_2026_08_11_19_27_35/motor_matematico.js');

const MULTIPLICACION = '\u00d7';
const DIVISION = '\u00f7';

assert.equal(calcularResultado(2, '+', 3), 5);
assert.equal(calcularResultado(2, '-', 3), -1);
assert.equal(calcularResultado(4, MULTIPLICACION, 3), 12);
assert.equal(calcularResultado(12, DIVISION, 3), 4);
assert.throws(() => calcularResultado(1, '?', 1), /Operador no soportado/);
assert.equal(elegirFamiliaOperacionNivel3(0), 'sumaResta');
assert.equal(elegirFamiliaOperacionNivel3(0.6499), 'sumaResta');
assert.equal(elegirFamiliaOperacionNivel3(0.65), 'multiDiv');
assert.equal(elegirFamiliaOperacionNivel3(0.99), 'multiDiv');
assert.equal(elegirOperadorPorNivel(1, 0.99), '+');
assert.equal(elegirOperadorPorNivel(2, 0.5499), '+');
assert.equal(elegirOperadorPorNivel(2, 0.55), '-');
assert.equal(elegirOperadorPorNivel(3, 0.3499), '+');
assert.equal(elegirOperadorPorNivel(3, 0.35), '-');
assert.equal(elegirOperadorPorNivel(3, 0.65), MULTIPLICACION);
assert.equal(elegirOperadorPorNivel(3, 0.85), DIVISION);

assert.equal(operacionTieneOperandosGrandes({num1: 99, num2: -99}), false);
assert.equal(operacionTieneOperandosGrandes({num1: 100, num2: 2}), true);
assert.equal(operacionTieneOperandosGrandes({num1: 2, num2: -100}), true);
assert.equal(conservarOperacionGrande(0), true);
assert.equal(conservarOperacionGrande(0.7499), true);
assert.equal(conservarOperacionGrande(0.75), false);
assert.equal(conservarOperacionGrande(0.99), false);

const rangos = {1: [4, 20], 2: [-6, 13], 3: [2, 22]};
const familiasNivel3 = new Set();

for (const nivel of [1, 2, 3]) {
  const [minimo, maximo] = rangos[nivel];
  for (let prueba = 0; prueba < 1000; prueba++) {
    let objetivo = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    if (nivel === 3 && objetivo % 2 !== 0) objetivo++;
    const correcta = generarOperacionMatematica(objetivo, nivel, true);
    const incorrecta = generarOperacionMatematica(objetivo, nivel, false);
    if (nivel === 3) familiasNivel3.add(['+', '-'].includes(correcta.operador) ? 'sumaResta' : 'multiDiv');
    assert.equal(correcta.resultado, objetivo, `${correcta.texto} deberia dar ${objetivo}`);
    assert.equal(correcta.esCorrecta, true);
    assert.notEqual(incorrecta.resultado, objetivo, `${incorrecta.texto} no deberia dar ${objetivo}`);
    assert.equal(incorrecta.esCorrecta, false);
    assert.equal(Number.isFinite(correcta.resultado), true);
    assert.equal(Number.isFinite(incorrecta.resultado), true);
    if (correcta.operador === DIVISION) assert.notEqual(correcta.num2, 0);
    if (incorrecta.operador === DIVISION) assert.notEqual(incorrecta.num2, 0);
  }
}

assert.deepEqual([...familiasNivel3].sort(), ['multiDiv', 'sumaResta']);
console.log('OK: 6.000 operaciones matematicas verificadas');
