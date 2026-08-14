const fs = require('node:fs');
const assert = require('node:assert/strict');

const css = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/style.css', 'utf8');
const index = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');
const nginx = fs.readFileSync('nginx.conf', 'utf8');
const sketch = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/sketch.js', 'utf8');
const p5 = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/p5.js', 'utf8');

assert.match(sketch, /createCanvas\(600,\s*400\)/, 'la resolución lógica debe ser 600 × 400');
assert.match(css, /aspect-ratio:\s*3\s*\/\s*2/, 'falta la proporción visual 3:2');
assert.match(css, /place-items:\s*center/, 'el canvas debe permanecer centrado');
assert.match(css, /background:\s*#111/, 'faltan las barras oscuras de compensación');
assert.match(css, /width:\s*min\(100vw,\s*150vh\)/, 'el ancho no conserva la proporción');
assert.match(css, /height:\s*min\(100vh,\s*66\.6667vw\)/, 'el alto no conserva la proporción');

assert.match(p5, /canvas\.getBoundingClientRect\(\)/, 'p5 no consulta el tamaño visual del canvas');
assert.match(css, /html:fullscreen/, 'falta el estilo reforzado de pantalla completa');
assert.match(index, /style\.css\?v=/, 'el CSS no tiene versión para invalidar caché');
assert.match(nginx, /no-store, no-cache, must-revalidate/, 'Nginx conserva CSS o JavaScript antiguos');
assert.match(index, /barra_sup\.js\?v=/, 'barra_sup.js puede quedar mezclado con una versión anterior');
assert.match(index, /estado_juego\.js\?v=/, 'estado_juego.js puede quedar mezclado con una versión anterior');
assert.match(p5, /canvas\.scrollWidth\s*\/\s*w/, 'p5 no calcula la escala horizontal del mouse');
assert.match(p5, /canvas\.scrollHeight\s*\/\s*h/, 'p5 no calcula la escala vertical del mouse');
assert.match(p5, /\(evt\.clientX\s*-\s*rect\.left\)\s*\/\s*sx/, 'mouseX no se adapta al escalado');
assert.match(p5, /\(evt\.clientY\s*-\s*rect\.top\)\s*\/\s*sy/, 'mouseY no se adapta al escalado');

console.log('OK: resolución 600 × 400, proporción 3:2, centrado y mouse adaptable verificados');
