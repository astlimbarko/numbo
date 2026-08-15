const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');
const css = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/style.css', 'utf8');

assert.match(html, /id="p5_loading"[^>]*class="numbo-loading"/, 'la bienvenida no es el cargador oficial de p5');
assert.equal((html.match(/id="p5_loading"/g) || []).length, 1, 'existe más de un cargador de p5');
assert.ok(html.indexOf('id="p5_loading"') < html.indexOf('src="p5.js'), 'el cargador aparece demasiado tarde');
assert.doesNotMatch(html, />Loading\.\.\.</, 'el HTML conserva el texto Loading de p5');
assert.doesNotMatch(html, /loading_screen\.js/, 'todavía existe un segundo flujo de carga');
assert.match(html, /Preparando la aventura/, 'falta el mensaje de carga');
assert.match(css, /img\/numbiRun\.png/, 'la entrada no reutiliza el personaje');
assert.match(css, /\.numbo-loading\s*\{/, 'faltan los estilos de carga');
assert.match(css, /@keyframes numbo-correr/, 'Numbi no está animado');
assert.doesNotMatch(css, /#p5_loading\s*\{[^}]*display:\s*none/s, 'la bienvenida oficial está oculta');
assert.match(css, /prefers-reduced-motion/, 'falta respetar reducción de movimiento');

console.log('OK: p5 usa la entrada visual de Numbo como su único cargador');
