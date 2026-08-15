const assert = require('node:assert/strict');
const {
  detectarColisionRectCirculo,
  HITBOX_PERSONAJE_RADIO,
  HITBOX_OPERACION_ALTO
} = require('../JETS OFICIAL_2026_08_11_19_27_35/colisiones_mejoradas.js');

const rectangulo = {x: 100, y: 100, w: 80, h: HITBOX_OPERACION_ALTO};

assert.equal(detectarColisionRectCirculo(rectangulo, {x: 100, y: 100, radio: HITBOX_PERSONAJE_RADIO}), true);
assert.equal(detectarColisionRectCirculo(rectangulo, {x: 34, y: 100, radio: HITBOX_PERSONAJE_RADIO}), true);
assert.equal(detectarColisionRectCirculo(rectangulo, {x: 33, y: 100, radio: HITBOX_PERSONAJE_RADIO}), false);
assert.equal(detectarColisionRectCirculo(rectangulo, {x: 100, y: 39, radio: HITBOX_PERSONAJE_RADIO}), true);
assert.equal(detectarColisionRectCirculo(rectangulo, {x: 100, y: 38, radio: HITBOX_PERSONAJE_RADIO}), false);
assert.equal(detectarColisionRectCirculo(rectangulo, {x: 30, y: 30, radio: HITBOX_PERSONAJE_RADIO}), false);
assert.equal(detectarColisionRectCirculo({x: 0, y: 0, w: 0, h: 0}, {x: 0, y: 0, radio: 0}), true);

console.log('OK: colisiones centrales, bordes, salto y separación verificadas');
