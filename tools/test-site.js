const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
let failures = 0;
function check(name, ok, detail) {
  console.log((ok ? 'OK  ' : 'FALHA ') + name + (detail ? ' — ' + detail : ''));
  if (!ok) { failures++; }
}
function walk(dir, ext, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') { walk(p, ext, out); }
    } else if (entry.name.endsWith(ext)) { out.push(p); }
  });
  return out;
}

console.log('\n=== 1. CSS ===');
['style.css', 'components.css', 'layouts.css', 'responsive.css', 'admin.css', 'print.css'].forEach(function (name) {
  const file = path.join(ROOT, 'css', name);
  if (!fs.existsSync(file)) { check('css/' + name + ' existe', false); return; }
  const s = fs.readFileSync(file, 'utf8');
  const open = (s.match(/{/g) || []).length;
  const close = (s.match(/}/g) || []).length;
  const co = (s.match(/\/\*/g) || []).length;
  const cl = (s.match(/\*\//g) || []).length;
  check('css/' + name + ' balanceado', open === close && co === cl, open + '/' + close + ' chaves, ' + co + '/' + cl + ' comentarios');
});

console.log('\n=== 2. JavaScript ===');
walk(path.join(ROOT, 'js'), '.js', []).concat(walk(path.join(ROOT, 'tools'), '.js', []), [path.join(ROOT, 'firebase', 'config.js'), path.join(ROOT, 'firebase', 'firebase-config.example.js')]).forEach(function (file) {
  try { execFileSync(process.execPath, ['--check', file], { stdio: 'ignore' }); check(path.relative(ROOT, file), true); }
  catch (e) { check(path.relative(ROOT, file), false); }
});

console.log('\n=== 3. HTML / links internos ===');
const htmls = walk(ROOT, '.html', []);
let broken = [];
htmls.forEach(function (file) {
  const html = fs.readFileSync(file, 'utf8');
  const refs = html.match(/(?:href|src)="([^"]+)"/g) || [];
  refs.forEach(function (r) {
    const value = r.match(/"([^"]+)"/)[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(value)) { return; }
    const target = path.resolve(path.dirname(file), value.split(/[?#]/)[0]);
    if (!fs.existsSync(target)) { broken.push(path.relative(ROOT, file) + ' -> ' + value); }
  });
});
check('todos os links internos existem (' + htmls.length + ' paginas)', broken.length === 0, broken.slice(0, 5).join(' | '));

console.log('\n=== 4. Conteudo publico ===');
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
check('sem aviso de versao inicial', !/Aviso: versão inicial|provisóri/.test(index));
check('carrossel de eventos automatico', (index.match(/data-carousel-auto/g) || []).length >= 2);
check('2 carrosséis (eventos + noticias)', (index.match(/data-carousel-auto/g) || []).length === 2);
check('Firebase config incluido', index.includes('firebase/config.js'));

console.log('\n=== 5. Admin ===');
const admin = walk(path.join(ROOT, 'admin'), '.html', []);
check('15 paginas admin', admin.length === 15, String(admin.length));
check('todas noindex', admin.every(function (f) { return fs.readFileSync(f, 'utf8').includes('noindex, nofollow'); }));
check('dashboard com realizacao', fs.readFileSync(path.join(ROOT, 'admin', 'dashboard.html'), 'utf8').includes('Nível de realização'));
check('edicao de utilizadores', fs.readFileSync(path.join(ROOT, 'admin', 'utilizadores.html'), 'utf8').includes('modal-user-edit'));
check('comunicados com destaque', fs.readFileSync(path.join(ROOT, 'admin', 'comunicados.html'), 'utf8').includes('Destacar na página inicial'));

console.log('\n=== 6. Firebase ===');
check('config.js presente', fs.existsSync(path.join(ROOT, 'firebase', 'config.js')));
check('regras deploymentadas (ficheiro)' , fs.existsSync(path.join(ROOT, 'firebase', 'firestore.rules')));
check('firebase.json presente', fs.existsSync(path.join(ROOT, 'firebase.json')));

console.log('\n=== 7. PDFs ===');
const pdfs = walk(path.join(ROOT, 'assets', 'pdfs'), '.pdf', []);
check('4 PDFs', pdfs.length === 4, String(pdfs.length));
check('PDFs validos', pdfs.every(function (f) { return fs.readFileSync(f).slice(0, 5).toString() === '%PDF-'; }));

console.log('\n=== RESULTADO: ' + (failures ? failures + ' FALHA(S)' : 'TUDO OK') + ' ===');
process.exit(failures ? 1 : 0);
