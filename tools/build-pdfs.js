const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'pdfs');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean);

const PAGES = [
  ['plano-geral.html', 'plano-geral.pdf'],
  ['plano-departamentos.html', 'plano-departamentos.pdf'],
  ['plano-direcao.html', 'plano-direcao.pdf'],
  ['liturgia.html', 'liturgia.pdf']
];

const chrome = CHROME_CANDIDATES.find(function (p) { return fs.existsSync(p); });
if (!chrome) {
  console.error('Chrome/Chromium não encontrado. Defina CHROME_PATH com o caminho do executável.');
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
const profile = path.join(require('os').tmpdir(), 'ieba-headless-pdf');

PAGES.forEach(function (entry) {
  const source = path.join(ROOT, entry[0]);
  const target = path.join(OUT, entry[1]);
  const uri = 'file:///' + source.replace(/\\/g, '/').replace(/ /g, '%20');
  const args = [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    '--user-data-dir=' + profile,
    '--print-to-pdf=' + target,
    uri
  ];
  const result = spawnSync(chrome, args, { encoding: 'utf8', timeout: 120000 });
  if (fs.existsSync(target)) {
    console.log('OK  ' + entry[1] + ' (' + fs.statSync(target).size + ' bytes)');
  } else {
    console.error('FALHOU ' + entry[1] + (result.stderr ? '\n' + result.stderr.slice(-400) : ''));
    process.exitCode = 1;
  }
});
