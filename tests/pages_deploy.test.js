const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'deploy-pages.yml'), 'utf8');
const game = path.join(root, 'JETS OFICIAL_2026_08_11_19_27_35');

assert.ok(fs.existsSync(path.join(game, 'index.html')), 'la publicacion no contiene index.html');
assert.match(workflow, /codex\/desarrollo-numbo/);
assert.match(workflow, /permissions:[\s\S]*pages: write[\s\S]*id-token: write/);
assert.match(workflow, /actions\/configure-pages@v5/);
assert.match(workflow, /actions\/upload-pages-artifact@v4/);
assert.match(workflow, /path: '\.\/JETS OFICIAL_2026_08_11_19_27_35'/);
assert.match(workflow, /actions\/deploy-pages@v4/);

console.log('OK: GitHub Pages publica exclusivamente la carpeta ejecutable de Numbo');
