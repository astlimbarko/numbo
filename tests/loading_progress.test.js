const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');
const css = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/style.css', 'utf8');
const progress = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/loading_progress.js', 'utf8');

assert.match(html, /class="numbo-loading__porcentaje">0%/, 'falta el porcentaje visible');
assert.match(html, /role="progressbar"/, 'la barra no informa su función');
assert.match(html, /loading_progress\.js\?v=/, 'el controlador de progreso no está incluido');
assert.match(css, /--numbo-progreso/, 'la barra no usa el porcentaje real');
assert.doesNotMatch(css, /numbo-progreso 900ms/, 'la barra todavía usa la animación decorativa');
assert.match(progress, /recursosCargaCompletados\s*\/\s*recursosCargaTotales/, 'el porcentaje no se calcula con recursos reales');
assert.match(progress, /loadImage\s*=\s*function cargarImagenConProgreso/, 'las imágenes no se contabilizan');
assert.match(progress, /loadSound\s*=\s*function cargarAudioConProgreso/, 'los audios no se contabilizan');
assert.match(progress, /aria-valuenow/, 'el progreso accesible no se actualiza');

console.log('OK: porcentaje real de imágenes y audios verificado');
