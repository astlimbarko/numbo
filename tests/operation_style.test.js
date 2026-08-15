const fs = require('node:fs');
const assert = require('node:assert/strict');

const render = fs.readFileSync(
  'JETS OFICIAL_2026_08_11_19_27_35/colisiones_mejoradas.js',
  'utf8'
);
const motor = fs.readFileSync(
  'JETS OFICIAL_2026_08_11_19_27_35/motor_matematico.js',
  'utf8'
);

assert.match(motor, /num1: operacion\.num1/);
assert.match(motor, /operador: operacion\.operador/);
assert.match(motor, /num2: operacion\.num2/);
assert.doesNotMatch(motor, /colorNum1: color\(random/);
assert.match(render, /const COLOR_OPERANDO_1 = \[19, 181, 210\]/);
assert.match(render, /const COLOR_OPERADOR = \[218, 44, 67\]/);
assert.match(render, /const COLOR_OPERANDO_2 = \[92, 196, 28\]/);
assert.match(render, /stroke\(18, 14, 25, 145\)/, 'falta la sombra');
assert.match(render, /stroke\(255\)[\s\S]*strokeWeight\(10\)/, 'falta el contorno blanco');
assert.match(render, /stroke\(24, 20, 31\)[\s\S]*strokeWeight\(2\)/, 'falta el contorno interior');
assert.match(render, /TAMANO_OPERACION_NORMAL \* ANCHO_OPERACION_MAXIMO \/ anchoTotal/, 'falta adaptar operaciones largas');
assert.doesNotMatch(render, /drawingContext|shadowBlur|filter\s*\(/, 'se añadieron efectos gráficos inestables');

console.log('OK: datos separados, paleta, sombra, contornos y tamaño adaptable verificados');
