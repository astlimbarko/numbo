const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');

const carpeta = 'JETS OFICIAL_2026_08_11_19_27_35/sonidos';
const limites = {
  'sonidoCreditos.mp3': 2100000,
  'sonidoFondo.mp3': 1600000,
  'sonidoMapa1.mp3': 2000000,
  'sonidoMapa2.mp3': 2500000,
  'sonidoMapa3.mp3': 2000000
};

for (const [archivo, limite] of Object.entries(limites)) {
  const ruta = path.join(carpeta, archivo);
  assert.ok(fs.existsSync(ruta), `falta ${archivo}`);
  assert.ok(fs.statSync(ruta).size <= limite, `${archivo} dejó de estar optimizado`);
}

const temporales = fs.readdirSync(carpeta).filter((archivo) => archivo.includes('.optimized.'));
assert.deepEqual(temporales, [], 'quedaron copias temporales de audio');

console.log('OK: músicas optimizadas y sin copias temporales verificadas');
