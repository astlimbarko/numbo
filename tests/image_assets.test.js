const fs = require('node:fs');
const assert = require('node:assert/strict');

const ruta = 'JETS OFICIAL_2026_08_11_19_27_35/img/barra_superior/copa.png';
const archivo = fs.readFileSync(ruta);

assert.equal(archivo.subarray(1, 4).toString('ascii'), 'PNG', 'la copa dejó de ser PNG');
assert.equal(archivo.readUInt32BE(16), 168, 'la copa no tiene el ancho optimizado');
assert.equal(archivo.readUInt32BE(20), 128, 'la copa no tiene el alto optimizado');
assert.ok(archivo.length < 50000, 'la copa volvió a tener un tamaño excesivo');

console.log('OK: copa PNG de 168 × 128 y menos de 50 KB verificada');
