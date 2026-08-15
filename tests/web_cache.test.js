const fs = require('node:fs');
const assert = require('node:assert/strict');

const nginx = fs.readFileSync('nginx.conf', 'utf8');

assert.match(nginx, /gzip\s+on;/, 'la compresión gzip no está activa');
assert.match(nginx, /gzip_vary\s+on;/, 'falta informar la variación por compresión');
assert.match(nginx, /gzip_types[^;]*text\/css[^;]*application\/javascript/, 'CSS o JavaScript no se comprimen');
assert.match(nginx, /location\s+~\*\s+\\\.html\$\s*\{[^}]*no-cache, must-revalidate/s, 'el HTML no se revalida');
assert.match(nginx, /location\s+~\*\s+\\\.\(\?:css\|js\)\$\s*\{[^}]*expires\s+7d/s, 'CSS y JavaScript no tienen caché');
assert.match(nginx, /location\s+~\*[^\{]*png[^\{]*mp3[^\{]*\{[^}]*expires\s+7d/s, 'imágenes o audio no tienen caché moderada');

console.log('OK: compresión, revalidación HTML y caché de recursos verificadas');
