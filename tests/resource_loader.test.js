const fs = require('node:fs');
const assert = require('node:assert/strict');

const sketch = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/sketch.js', 'utf8');
const loader = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/resource_loader.js', 'utf8');
const state = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/estado_juego.js', 'utf8');
const html = fs.readFileSync('JETS OFICIAL_2026_08_11_19_27_35/index.html', 'utf8');

const preload = sketch.match(/function preload\(\)\s*\{([\s\S]*?)\n\}/)[1];
assert.match(preload, /sonidoFondo\.mp3/, 'el menú no precarga su música');
assert.match(preload, /scmenu\.png/, 'el menú no precarga su fondo');
assert.doesNotMatch(preload, /sonidoMapa[123]|maps\/mapa|numbiRun|barra_superior/, 'la entrada todavía carga recursos del juego');
assert.match(loader, /cargarRecursosParaNivel/, 'falta el cargador por nivel');
assert.match(loader, /recursosCargados\.niveles/, 'no se evita descargar dos veces un nivel');
assert.match(loader, /cargasNivelActivas\[numeroNivel\]/, 'las solicitudes simultáneas pueden duplicar una descarga');
assert.match(loader, /precargarNivelesSiguientes/, 'falta la precarga en segundo plano');
assert.match(loader, /\{enSegundoPlano: true\}/, 'la precarga altera la pantalla visible');
assert.match(state, /programarPrecargaNiveles\(1\)/, 'los niveles siguientes no se preparan al comenzar');
assert.match(state, /ESTADOS\.CARGANDO/, 'falta un estado seguro durante la carga');
assert.match(state, /await cargarRecursosParaNivel\(1\)/, 'Jugar no espera los recursos del nivel 1');
assert.match(state, /await cargarRecursosParaNivel\(siguienteNivel\)/, 'el cambio de nivel no espera sus recursos');
assert.match(html, /resource_loader\.js\?v=/, 'el cargador no está incluido en el juego');

console.log('OK: menú inicial ligero y carga segura por nivel verificados');
