const assert = require('node:assert/strict');
const {
  calcularResultado,
  generarOperacionMatematica
} = require('../JETS OFICIAL_2026_08_11_19_27_35/motor_matematico.js');

assert.equal(calcularResultado(2, '+', 3), 5);
assert.equal(calcularResultado(2, '-', 3), -1);
assert.equal(calcularResultado(4, '×', 3), 12);
assert.equal(calcularResultado(12, '÷', 3), 4);
assert.throws(() => calcularResultado(1, '?', 1), /Operador no soportado/);

const rangos = {
  1: [4, 20],
  2: [-6, 13],
  3: [2, 22]
};

for (const nivel of [1, 2, 3]) {
  const [minimo, maximo] = rangos[nivel];
  for (let prueba = 0; prueba < 1000; prueba++) {
    let objetivo = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    if (nivel === 3 && objetivo % 2 !== 0) objetivo++;

    const correcta = generarOperacionMatematica(objetivo, nivel, true);
    const incorrecta = generarOperacionMatematica(objetivo, nivel, false);

    assert.equal(correcta.resultado, objetivo, `${correcta.texto} debería dar ${objetivo}`);
    assert.equal(correcta.esCorrecta, true);
    assert.notEqual(incorrecta.resultado, objetivo, `${incorrecta.texto} no debería dar ${objetivo}`);
    assert.equal(incorrecta.esCorrecta, false);
    assert.equal(Number.isFinite(correcta.resultado), true);
    assert.equal(Number.isFinite(incorrecta.resultado), true);
    if (correcta.operador === '÷') assert.notEqual(correcta.num2, 0);
    if (incorrecta.operador === '÷') assert.notEqual(incorrecta.num2, 0);
  }
}

console.log('OK: 6.000 operaciones matemáticas verificadas');
