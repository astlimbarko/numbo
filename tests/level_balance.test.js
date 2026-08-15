const assert = require('node:assert/strict');
const {CONFIGURACION_NIVELES, medirEquilibrioNivel} = require('../JETS OFICIAL_2026_08_11_19_27_35/configuracion_niveles.js');

assert.deepEqual(CONFIGURACION_NIVELES[1], {
  velocidadOperacion: 6, intervaloOperacion: 90, velocidadMapa: 3.5, velocidadPersonaje: 6
});
assert.deepEqual(CONFIGURACION_NIVELES[2], {
  velocidadOperacion: 7, intervaloOperacion: 90, velocidadMapa: 7.5, velocidadPersonaje: 6
});
assert.deepEqual(CONFIGURACION_NIVELES[3], {
  velocidadOperacion: 8, intervaloOperacion: 65, velocidadMapa: 11.5, velocidadPersonaje: 8
});

for (const nivel of [1, 2, 3]) {
  const medicion = medirEquilibrioNivel(nivel);
  assert.ok(medicion.segundosVisibles >= 1.8, `nivel ${nivel}: lectura insuficiente`);
  assert.ok(medicion.maximoSimultaneoEstimado <= 2, `nivel ${nivel}: demasiadas operaciones simultaneas`);
  assert.ok(medicion.segundosEntreCorrectasEstimado <= 3, `nivel ${nivel}: pocas oportunidades correctas`);
}

assert.ok(CONFIGURACION_NIVELES[2].velocidadOperacion > CONFIGURACION_NIVELES[1].velocidadOperacion);
assert.ok(CONFIGURACION_NIVELES[3].velocidadOperacion > CONFIGURACION_NIVELES[2].velocidadOperacion);
assert.ok(CONFIGURACION_NIVELES[2].velocidadMapa > CONFIGURACION_NIVELES[1].velocidadMapa);
assert.ok(CONFIGURACION_NIVELES[3].velocidadMapa > CONFIGURACION_NIVELES[2].velocidadMapa);
assert.ok(CONFIGURACION_NIVELES[3].velocidadPersonaje > CONFIGURACION_NIVELES[2].velocidadPersonaje);

const resumen = [1, 2, 3].map((nivel) => ({
  nivel,
  ...medirEquilibrioNivel(nivel)
}));
assert.deepEqual(resumen.map((dato) => dato.maximoSimultaneoEstimado), [2, 2, 2]);
assert.deepEqual(resumen.map((dato) => dato.segundosEntreCorrectasEstimado), [3, 3, 65 / 60 / 0.5]);

console.log('OK: equilibrio final medido para velocidad, lectura, simultaneidad y frecuencia correcta');
