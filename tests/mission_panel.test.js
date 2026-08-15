const fs = require('node:fs');
const assert = require('node:assert/strict');

const panel = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/barra_sup.js', 'utf8');
const html = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');

assert.match(panel, /function dibujarPanelMision/, 'falta el componente profesional de misión');
assert.match(panel, /text\('MISIÓN',/, 'falta el rótulo dorado MISIÓN');
assert.match(panel, /fill\(255\);[\s\S]*text\('HALLAR',/, 'HALLAR no usa letras blancas');
assert.doesNotMatch(panel, /image\(hallar_m,/, 'el panel todavía depende del texto rasterizado');
assert.match(panel, /rect\(xPanel[^;]*radioPanel/, 'falta el contenedor morado redondeado');
assert.match(panel, /fill\(255, 211, 54\)/, 'falta la tarjeta amarilla del objetivo');
assert.match(panel, /text\(mision,/, 'el número objetivo no es dinámico');
assert.doesNotMatch(panel, /ellipse\(centroX/, 'continúa el círculo anterior');
assert.match(html, /barra_sup\.js\?v=20260815-2/, 'el navegador puede conservar las letras anteriores');
assert.doesNotMatch(panel, /image\(hallar_m,\s*0,\s*0\)/, 'continúa el encabezado antiguo sin panel');

console.log('OK: panel MISIÓN/HALLAR, tarjeta amarilla y objetivo dinámico verificados');
