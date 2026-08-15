const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');
const source = fs.readFileSync(path.join(game, 'colisiones_mejoradas.js'), 'utf8');
const config = fs.readFileSync(path.join(game, 'configuracion_niveles.js'), 'utf8');
const html = fs.readFileSync(path.join(game, 'index.html'), 'utf8');
const configSource = config;
const functionSource = source.match(/function obtenerVelocidadNumbi\(\) \{[\s\S]*?\n\}/)?.[0];

assert.ok(configSource, 'falta la configuración de velocidad de Numbi');
assert.ok(functionSource, 'falta el selector de velocidad por nivel');

function velocidad(nivel) {
  const context = { nivel, result: null };
  vm.runInNewContext(`${configSource} ${functionSource}; result = obtenerVelocidadNumbi();`, context);
  return context.result;
}

assert.equal(velocidad(1), 6);
assert.equal(velocidad(2), 6);
assert.equal(velocidad(3), 8);
assert.equal(velocidad(99), 6);
assert.match(source, /posX \+ velocidadActual/);
assert.match(source, /posX - velocidadActual/);
assert.match(html, /colisiones_mejoradas\.js\?v=[^"']+/);

console.log('OK: Numbi conserva velocidad 6 y acelera a 8 en el nivel 3');
