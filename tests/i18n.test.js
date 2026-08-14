const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const codigo = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/i18n.js', 'utf8');
const almacenamiento = {};
const contexto = {
  localStorage: {
    getItem(clave) { return almacenamiento[clave] || null; },
    setItem(clave, valor) { almacenamiento[clave] = valor; }
  },
  document: {documentElement: {lang: ''}},
  menuOne: 3,
  module: {exports: {}}
};

vm.createContext(contexto);
vm.runInContext(codigo, contexto);

assert.equal(vm.runInContext("traducir('jugar')", contexto), 'Jugar');
assert.equal(vm.runInContext("seleccionarIdioma('Quechua')", contexto), true);
assert.equal(vm.runInContext("traducir('jugar')", contexto), 'Pukllay');
assert.equal(almacenamiento['numbo.idioma'], 'qu');
assert.equal(contexto.document.documentElement.lang, 'qu');
assert.equal(contexto.menuOne, 2);
assert.equal(vm.runInContext("traducir('completasteNivel', {nivel: 2})", contexto), '2 pata tukusqa');
assert.equal(vm.runInContext("seleccionarIdioma('desconocido')", contexto), false);

for (const idioma of Object.keys(contexto.module.exports.IDIOMAS_NUMBO)) {
  assert.ok(contexto.module.exports.TRADUCCIONES_NUMBO[idioma], `falta catálogo ${idioma}`);
  for (const clave of ['jugar', 'instrucciones', 'controles', 'objetivo', 'retornar']) {
    assert.ok(contexto.module.exports.TRADUCCIONES_NUMBO[idioma][clave], `falta ${clave} en ${idioma}`);
  }
}

console.log('OK: selección, persistencia, idioma HTML y traducciones verificadas');
