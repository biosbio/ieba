const fs = require('fs');
const path = require('path');
const C = require('./content.js');

const ROOT = path.join(__dirname, '..');
const S = C.site;

function e(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function a(v) { return e(v).replace(/"/g, '&quot;'); }
const ROUTE_RULES = [
  [/^evento-.*\.html$/, 'eventos'],
  [/^noticia-.*\.html$/, 'comunicacao'],
  [/^campo-.*\.html$/, 'campos'],
  [/^(jovens|mulheres|meninas|sal-da-terra|criancas|missoes|ministerio-oracao)\.html$/, 'ministerios'],
  [/^plano-.*\.html$/, 'planeamento'],
  [/^(eventos|atividades|liturgia)\.html$/, 'eventos'],
  [/^campos-missionarios\.html$/, 'campos'],
  [/^(noticias|pedidos-oracao|contactos|notificacoes)\.html$/, 'comunicacao'],
  [/^projetos-sociais\.html$/, 'projetos'],
  [/^midia\.html$/, 'midia'],
  [/^doacoes\.html$/, 'financeiro'],
  [/^sobre\.html$/, 'institucional']
];

function routeFor(rel) {
  if (rel.startsWith('admin/')) return rel;
  const name = path.posix.basename(rel);
  for (const rule of ROUTE_RULES) {
    if (rule[0].test(name)) return path.posix.join(rule[1], name);
  }
  return rel;
}

function rewriteLinks(html, destRel) {
  if (destRel.startsWith('admin/')) return html;
  const fromDir = path.posix.dirname(destRel);
  const prefix = fromDir === '.' ? '' : fromDir.split('/').map(function () { return '../'; }).join('');
  return html
    .replace(/(href|src)="([^"]+\.html)"/g, function (m, attr, target) {
      const clean = target.split(/[?#]/)[0];
      const dest = routeFor(path.posix.basename(clean));
      const rel = path.posix.relative(fromDir === '.' ? '' : fromDir, dest);
      const suffix = target.slice(clean.length);
      return attr + '="' + rel + suffix + '"';
    })
    .replace(/(href|src)="((?:css|js|assets|firebase)\/[^"]+)"/g, function (m, attr, target) {
      return attr + '="' + prefix + target + '"';
    });
}

function write(rel, html) {
  const dest = routeFor(rel);
  const file = path.join(ROOT, dest);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, rewriteLinks(html, dest), 'utf8');
  console.log('  . ' + dest);
}

function linkItem(href, label, key, active) {
  return '<a href="' + href + '"' + (key === active ? ' class="active" aria-current="page"' : '') + '>' + e(label) + '</a>';
}

function navHTML(active) {
  const ministryLinks = C.ministries.map(function (m) { return linkItem(m.slug + '.html', m.short, m.slug, active); }).join('');
  const fieldLinks = C.missionFields.map(function (f) { return linkItem('campo-' + f.slug + '.html', f.name, 'campo-' + f.slug, active); }).join('');
  return `
  <nav aria-label="Navegação principal">
    <ul class="main-nav" id="main-nav">
      ${linkItem('index.html', 'Início', 'inicio', active)}
      ${linkItem('sobre.html', 'Sobre', 'sobre', active)}
      ${linkItem('eventos.html', 'Eventos', 'eventos', active)}
      <li class="has-dropdown">
        ${linkItem('plano-geral.html', 'Plano Geral', 'plano', active)} <span class="caret" aria-hidden="true">▾</span>
        <ul class="dropdown-menu">
          <li class="dd-title">Plano Geral da IEBA</li>
          <li><a href="plano-geral.html">Plano geral da igreja</a></li>
          <li><a href="plano-departamentos.html">Planos dos departamentos</a></li>
          <li><a href="plano-direcao.html">Plano da direção</a></li>
          <li><a href="liturgia.html">Liturgia dos cultos</a></li>
        </ul>
      </li>
      <li class="has-dropdown">
        ${linkItem('jovens.html', 'Ministérios', 'ministerios', active)} <span class="caret" aria-hidden="true">▾</span>
        <ul class="dropdown-menu"><li class="dd-title">Nossos ministérios</li>${ministryLinks}</ul>
      </li>
      <li class="has-dropdown">
        ${linkItem('campos-missionarios.html', 'Campos Missionários', 'campos', active)} <span class="caret" aria-hidden="true">▾</span>
        <ul class="dropdown-menu"><li class="dd-title">Igrejas filiais e campos</li>${fieldLinks}</ul>
      </li>
      ${linkItem('projetos-sociais.html', 'Projetos', 'projetos', active)}
      ${linkItem('midia.html', 'Mídia', 'midia', active)}
    </ul>
  </nav>`;
}

function socialHTML() {
  return `
    <li><a href="${a(S.facebook)}" target="_blank" rel="noopener noreferrer">Facebook da IEBA ↗</a></li>
    <li><a href="${a(S.facebookYouth)}" target="_blank" rel="noopener noreferrer">Juventude Evangélica ↗</a></li>
    <li><a href="${a(S.facebookSal)}" target="_blank" rel="noopener noreferrer">Sal da Terra GB ↗</a></li>`;
}

function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="assets/logo/logo.jpg" alt="Logótipo da IEBA">
            <div><strong>${e(S.name)}</strong><small>${e(S.shortName)}</small></div>
          </div>
          <p style="font-size:0.9rem">${e(S.tagline)}. Uma comunidade cristã acolhedora em Bissau, Guiné-Bissau.</p>
        </div>
        <div><h4>Navegação</h4><ul>
          <li><a href="sobre.html">Sobre a IEBA</a></li><li><a href="eventos.html">Eventos</a></li>
          <li><a href="atividades.html">Atividades</a></li><li><a href="noticias.html">Notícias</a></li><li><a href="notificacoes.html">Notificações</a></li>
          <li><a href="pedidos-oracao.html">Pedidos de oração</a></li><li><a href="doacoes.html">Doações</a></li><li><a href="contactos.html">Contactos</a></li>
          <li><a href="plano-geral.html">Plano geral</a></li>
          <li><a href="plano-departamentos.html">Planos dos departamentos</a></li><li><a href="plano-direcao.html">Plano da direção</a></li>
          <li><a href="liturgia.html">Liturgia dos cultos</a></li>
          <li><a href="projetos-sociais.html">Projetos sociais</a></li>
          <li><a href="midia.html">Mídia</a></li><li><a href="campos-missionarios.html">Campos missionários</a></li>
        </ul></div>
        <div><h4>Ministérios</h4><ul>
          ${C.ministries.map(function (m) { return '<li><a href="' + m.slug + '.html">' + e(m.short) + '</a></li>'; }).join('')}
        </ul></div>
        <div>
          <h4>Contacto</h4>
          <ul class="footer-contact">
            <li><span class="ico">📍</span><span>${e(S.address)}, ${e(S.city)}, ${e(S.country)}</span></li>
            <li><span class="ico">☎</span><a href="${a(S.phoneLink)}">${e(S.phone)}</a></li>
            <li><span class="ico">✉</span><span>${e(S.email)}</span></li>
          </ul>
          <h4 style="margin-top:1.25rem">Redes sociais</h4><ul>${socialHTML()}</ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year">2026</span> ${e(S.name)}. Todos os direitos reservados.</span>
        <span>Conteúdos públicos sujeitos a aprovação da administração da IEBA.</span>
      </div>
    </div>
  </footer>`;
}

function cleanContent(html) {
  return html
    .replace(/<div class="note[^>]*>[^\n]*?<\/div>/g, function (m) {
      return /provisóri|provisória|A confirmar|a confirmar|exemplo|Aguardando|em construção|Substituir|substituir/.test(m) ? '' : m;
    })
    .replace(/Logótipo provisório da IEBA/g, 'Logótipo da IEBA')
    .replace(/Imagens provisórias — substituir por fotografias oficiais autorizadas\./g, 'Fotografias das atividades da IEBA.')
    .replace(/Publicação de exemplo[^<]*/g, 'Publicação da IEBA')
    .replace(/Aguardando vídeos oficiais/g, 'Vídeos da IEBA')
    .replace(/Aguardando vídeos aprovados/g, 'Vídeos da IEBA')
    .replace(/Espaço reservado para os projetos aprovados do campo[^<]*/g, 'Projetos do campo')
    .replace(/Espaço reservado[^<]*/g, 'Informações disponíveis');
}

function layout(o) {
  const title = o.title ? o.title + ' | ' + S.shortName : S.name + ' | ' + S.shortName;
  const desc = o.desc || S.description;
  const jsonld = o.jsonld ? '<script type="application/ld+json">' + JSON.stringify(o.jsonld) + '</script>' : '';
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(title)}</title>
  <meta name="description" content="${a(desc)}">
  <meta name="robots" content="${o.noindex ? 'noindex, nofollow' : 'index, follow'}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${a(title)}">
  <meta property="og:description" content="${a(desc)}">
  <meta property="og:image" content="assets/logo/logo.jpg">
  <link rel="icon" href="assets/logo/logo.jpg">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/responsive.css">
  <link rel="stylesheet" href="css/print.css" media="print">
  ${jsonld}
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <div class="header-top">
        <a class="brand" href="index.html" aria-label="${a(S.name)} — início">
          <img src="assets/logo/logo.jpg" alt="Logótipo da IEBA">
          <span class="brand-text"><span class="brand-name">${e(S.name)}</span><span class="brand-sub">${e(S.shortName)} · Bissau</span></span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">☰</button>
      </div>
      <div class="header-nav">${navHTML(o.active)}</div>
    </div>
  </header>
  <main id="conteudo">${cleanContent(o.content)}</main>
  ${footerHTML()}
  <button class="back-top" id="back-top" type="button" aria-label="Voltar ao topo">↑</button>
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Visualizador de imagem">
    <button class="lightbox-close" id="lightbox-close" type="button" aria-label="Fechar">×</button>
    <div class="lightbox-inner"><div class="lightbox-visual" id="lightbox-visual"></div><h3 id="lightbox-title" style="color:#fff;margin-top:1rem"></h3></div>
  </div>
  <script src="firebase/config.js"></script>
  <script src="js/firebase.js"></script>
  <script src="js/store.js" defer></script>
  <script src="js/dynamic-content.js" defer></script>
  <script src="js/app.js" defer></script>
</body>
</html>`;
}

function crumb(items) {
  return '<div class="wrap"><nav class="breadcrumb" aria-label="Caminho">' +
    items.map(function (it, i) {
      return (i ? '<span class="sep">/</span>' : '') + (it[1] ? '<a href="' + a(it[1]) + '">' + e(it[0]) + '</a>' : '<span aria-current="page">' + e(it[0]) + '</span>');
    }).join('') + '</nav></div>';
}

function heroBand(o) {
  return `<section class="page-hero ${o.variant || ''} ${o.diagonal ? 'diagonal' : ''}">
    <div class="wrap">
      ${o.icon ? '<div class="hero-icon" aria-hidden="true">' + e(o.icon) + '</div>' : ''}
      <span class="eyebrow">${e(o.eyebrow || 'IEBA')}</span>
      <h1>${e(o.title)}</h1>
      <p>${e(o.sub || '')}</p>
    </div>
  </section>`;
}

function heroVerse(verse, cite, eyebrow, tone) {
  return `<section class="verse-band ${tone || ''}"><div class="wrap">
    <span class="eyebrow">${e(eyebrow)}</span>
    <blockquote>${e(verse)}</blockquote>
    <cite>${e(cite)}</cite>
  </div></section>`;
}

function sectionHead(title, sub, eyebrow) {
  return '<div class="section-head">' + (eyebrow ? '<span class="eyebrow">' + e(eyebrow) + '</span>' : '') + '<h2>' + e(title) + '</h2>' + (sub ? '<p>' + e(sub) + '</p>' : '') + '</div>';
}

function statusBadge(status) {
  if (status === 'A realizar') return 'badge-blue';
  if (status === 'Realizado') return 'badge-green';
  if (status === 'Cancelado') return 'badge-gray';
  if (status === 'Arquivado') return 'badge-gray';
  return 'badge-warn';
}

function eventCard(ev) {
  return `<a class="card" href="evento-${a(ev.id)}.html" style="color:inherit;text-decoration:none" data-slide>
    <div class="thumb ${ev.thumb || ''}"><span class="thumb-label">${e(ev.ministry)}</span><span class="thumb-icon">✦</span></div>
    <div class="card-body">
      <span class="badge ${statusBadge(ev.status)}">${e(ev.status)}</span>
      <h3 class="card-title" style="margin-top:0.75rem">${e(ev.title)}</h3>
      <p style="font-size:0.9rem;color:var(--muted)">${e(ev.description)}</p>
      <p style="font-size:0.85rem;margin-bottom:0"><strong>📅</strong> ${e(ev.date)} · ${e(ev.time)}<br><strong>📍</strong> ${e(ev.location)}</p>
    </div>
  </a>`;
}

function newsCard(n) {
  return `<a class="card" href="noticia-${a(n.id)}.html" style="color:inherit;text-decoration:none" data-slide>
    <div class="thumb ${n.tone || 'thumb-blue'}"><span class="thumb-label">${e(n.source)}</span><span class="thumb-icon">✦</span></div>
    <div class="card-body">
      <span class="badge badge-blue">${e(n.date)}</span>
      <h3 class="card-title" style="margin-top:0.75rem">${e(n.title)}</h3>
      <p style="font-size:0.9rem;color:var(--muted)">${e(n.text)}</p>
    </div>
  </a>`;
}

function ministryCard(m) {
  return `<article class="card">
    <div class="thumb ${m.colorTheme || ''}"><span class="thumb-label">${e(m.short)}</span><span class="thumb-icon">✦</span></div>
    <div class="card-body"><h3 class="card-title">${e(m.name)}</h3><p style="font-size:0.9rem;color:var(--muted)">${e(m.tagline)}</p></div>
    <div class="card-footer"><a class="card-link" href="${m.slug}.html">Conhecer o ministério →</a></div>
  </article>`;
}

function serviceTable() {
  return `<div class="table-wrap"><table class="schedule-table">
    <thead><tr><th>Dia</th><th>Hora</th><th>Atividade</th><th>Ministério</th><th>Descrição</th></tr></thead>
    <tbody>${C.services.map(function (s) {
      return '<tr><td class="day">' + e(s.day) + '</td><td class="time">' + e(s.time) + '</td><td>' + e(s.name) + '</td><td>' + e(s.ministry) + '</td><td>' + e(s.description) + '</td></tr>';
    }).join('')}</tbody></table></div>`;
}

function galleryTiles(items) {
  return items.map(function (g, i) {
    const tones = ['', 'thumb-blue', 'thumb-gold', 'thumb-plum', 'thumb-teal', 'thumb-blue', '', 'thumb-teal'];
    return '<div class="gallery-item ' + tones[i % tones.length] + '" data-gallery-item data-title="' + a(g) + '"><span>' + e(g) + '</span></div>';
  }).join('');
}

function ministryExtra(slug) {
  const d = C.ministryDetails[slug];
  return `
  <section class="section section-alt"><div class="wrap">
    <div class="ly-editorial" style="grid-template-columns:200px minmax(0,1fr)">
      <aside class="ly-rail"><div class="ly-rail-card"><h3>Histórico</h3><p style="font-size:0.88rem">${e(d.history)}</p></div></aside>
      <article class="ly-article"><h2>Histórico e desenvolvimento</h2><p>${e(d.history)}</p>
        <div class="note note-info"><strong>Conteúdo provisório:</strong> datas e marcos oficiais a confirmar pela liderança do ministério.</div>
      </article>
    </div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>Próximos eventos</h2>
    <p class="lead">Atividades a realizar, sujeitas a aprovação da administração geral.</p>
    <div class="grid grid-3" style="margin-top:2rem">${d.upcoming.map(function (u) {
      return '<article class="card program-card"><div class="period">' + e(u.when) + '</div><div class="card-body"><h3 class="theme">' + e(u.name) + '</h3><p>' + e(u.note) + '</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Eventos realizados</h2>
    <div class="timeline" style="margin-top:2rem">${d.past.map(function (p) {
      return '<div class="timeline-item"><span class="timeline-date">' + e(p.when) + '</span><h3>' + e(p.name) + '</h3><p>' + e(p.note) + '</p></div>';
    }).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>Plano anual</h2>
    <div class="program-grid" style="margin-top:2rem">${d.annualPlan.map(function (pl) {
      return '<article class="card program-card"><div class="period">' + e(pl.period) + '</div><div class="card-body"><h3 class="theme">' + e(pl.theme) + '</h3><p>' + e(pl.actions) + '</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Fotografias</h2>
    <p class="text-muted">Imagens provisórias — substituir por fotografias oficiais autorizadas.</p>
    <div class="mosaic" style="margin-top:1.5rem">${galleryTiles(d.gallery)}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>Vídeos</h2>
    <div class="video-grid">
      <div class="video-box"><div class="play">▶</div><strong>Encontros do ministério</strong><small>Aguardando vídeos oficiais</small></div>
      <div class="video-box"><div class="play">▶</div><strong>Testemunhos</strong><small>Só com autorização das pessoas envolvidas</small></div>
    </div>
  </div></section>`;
}

const featuredEvents = C.events.filter(function (ev) { return ev.featured; })
  .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

fs.readdirSync(ROOT).filter(function (f) {
  return f.endsWith('.html') && f !== 'index.html';
}).forEach(function (f) { fs.unlinkSync(path.join(ROOT, f)); });

console.log('A gerar páginas com layouts diversificados...');

/* ---------------- INÍCIO ---------------- */
write('index.html', layout({
  title: 'Início', active: 'inicio',
  jsonld: { '@context': 'https://schema.org', '@type': 'Church', name: S.name, image: 'assets/logo/logo.jpg', address: { '@type': 'PostalAddress', streetAddress: S.address, addressLocality: S.city, addressCountry: 'GW' }, telephone: S.phone, sameAs: [S.facebook] },
  content: `
  <section class="hero"><div class="wrap hero-inner">
    <div>
      <span class="eyebrow">Bem-vindo à IEBA</span>
      <h1>Uma comunidade de fé, esperança e serviço em Bissau</h1>
      <p>A Igreja Evangélica de Bairro D'Ajuda acolhe pessoas de todas as idades para ouvir a Palavra de Deus, orar juntas e servir a comunidade. Ficamos situados no Bairro de Ajuda, atrás da Escola Attadamun.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="pedidos-oracao.html">Pedir oração</a><a class="btn btn-outline" href="sobre.html">Conhecer a igreja</a></div>
    </div>
    <aside class="hero-card" aria-label="Informações rápidas">
      <h3>Encontre-nos</h3>
      <div class="hc-row"><span>📍</span><span>${e(S.address)}, ${e(S.city)}</span></div>
      <div class="hc-row"><span>☎</span><span>${e(S.phone)}</span></div>
      <div class="hc-row"><span>◷</span><span>Culto geral: domingo, 10h30</span></div>
      <div class="hc-row"><span>f</span><span>1,8 mil seguidores no Facebook</span></div>
    </aside>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Eventos em destaque', 'Escolhidos pelo administrador geral — clique para ver o evento completo')}
    <div class="note note-info"><strong>Destaques:</strong> somente o administrador geral pode marcar, ordenar e retirar eventos desta secção. Os destaques atuais são provisórios, até à ativação do painel administrativo.</div>
    <div class="carousel" data-carousel-auto>
      <button class="carousel-btn carousel-prev" type="button" aria-label="Evento anterior">‹</button>
      <div class="carousel-track auto" data-store-carousel="eventos">${featuredEvents.map(eventCard).join('')}</div>
      <button class="carousel-btn carousel-next" type="button" aria-label="Evento seguinte">›</button>
    </div>
    <div style="text-align:center;margin-top:1rem"><a class="btn btn-outline-dark" href="eventos.html">Ver todos os eventos</a></div>
  </div></section>
  <section class="section"><div class="wrap">${sectionHead('Notícias e comunicados', 'Todas as notícias ativas, por ordem de cadastro — clique para ler')}
    <div class="note note-info"><strong>Gestão:</strong> as notícias passam automaticamente neste carrossel. O administrador geral pode retirar qualquer notícia desta apresentação sem a eliminar.</div>
    <div class="carousel" data-carousel-auto>
      <button class="carousel-btn carousel-prev" type="button" aria-label="Notícia anterior">‹</button>
      <div class="carousel-track auto" data-store-carousel="comunicados">${C.news.filter(function (n) { return n.active; }).map(newsCard).join('')}</div>
      <button class="carousel-btn carousel-next" type="button" aria-label="Notícia seguinte">›</button>
    </div>
    <div style="text-align:center;margin-top:1rem"><a class="btn btn-outline-dark" href="noticias.html">Ver todas as notícias</a></div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Atividades da semana', 'Um olhar sobre a rotina regular — de segunda a domingo')}
    <div class="grid grid-3">${[C.services[3], C.services[7], C.services[8]].map(function (s) {
      return '<div class="card"><div class="card-body"><span class="badge badge-blue">' + e(s.day) + ' · ' + e(s.time) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(s.name) + '</h3><p style="font-size:0.88rem;color:var(--muted);margin:0">' + e(s.description) + '</p></div></div>';
    }).join('')}</div>
    <div style="text-align:center;margin-top:1.5rem"><a class="btn btn-outline-dark" href="atividades.html">Ver todas as atividades</a></div>
  </div></section>
  <section class="section"><div class="wrap">${sectionHead('Explore a IEBA', 'Atalhos para as áreas do site')}
    <div class="grid grid-3">${[
      ['⛪', 'Sobre a IEBA', 'História, missão, visão e direção', 'sobre.html'],
      ['👥', 'Ministérios', 'Juventude, mulheres, crianças e mais', 'jovens.html'],
      ['📋', 'Plano Geral', 'Planos dos departamentos e da direção', 'plano-geral.html'],
      ['🌍', 'Campos Missionários', 'Tchangue, Sahara, Rucuto e Ilhas', 'campos-missionarios.html'],
      ['🤝', 'Projetos Sociais', 'Ações de serviço e apoio', 'projetos-sociais.html'],
      ['📷', 'Mídia', 'Fotografias e vídeos da igreja', 'midia.html']
    ].map(function (x) {
      return '<a class="card card-plain" href="' + x[3] + '" style="color:inherit;text-decoration:none"><div class="card-body" style="display:flex;gap:1rem;align-items:flex-start"><div class="icon-box" style="margin:0;flex:0 0 auto">' + x[0] + '</div><div><h3 class="card-title">' + e(x[1]) + '</h3><p style="font-size:0.88rem;color:var(--muted);margin:0">' + e(x[2]) + '</p></div></div></a>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap"><div class="cta-band">
    <div><h2>Estamos aqui para si</h2><p>Envie um pedido de oração, fale connosco ou contribua para o trabalho da igreja.</p></div>
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap"><a class="btn btn-primary" href="pedidos-oracao.html">Pedido de oração</a><a class="btn btn-outline" href="doacoes.html">Doar</a><a class="btn btn-outline" href="contactos.html">Contactos</a></div>
  </div></div></section>`
}));

/* ---------------- SOBRE — layout editorial ---------------- */
write('sobre.html', layout({
  title: 'Sobre a IEBA', active: 'sobre',
  content: `
  ${crumb([['Início', 'index.html'], ['Sobre']])}
  ${heroBand({ title: 'Sobre a IEBA', sub: 'Identidade, missão, visão e valores da Igreja Evangélica de Bairro D\'Ajuda', eyebrow: 'A nossa identidade', icon: '⛪', diagonal: true })}
  <section class="section"><div class="wrap ly-editorial">
    <aside class="ly-rail"><div class="ly-rail-card">
      <h3>Nesta página</h3>
      <ol><li><a href="#historia">História</a></li><li><a href="#identidade">Identidade</a></li><li><a href="#missao">Missão e visão</a></li><li><a href="#valores">Valores</a></li><li><a href="#lideranca">Liderança</a></li><li><a href="#direcao">Direção da igreja</a></li></ol>
    </div></aside>
    <article class="ly-article">
      <h2 id="historia">A nossa história</h2>
      <p>A Igreja Evangélica de Bairro D'Ajuda (IEBA) é uma comunidade cristã situada no Bairro de Ajuda, em Bissau, Guiné-Bissau — atrás da Escola Attadamun. Ao longo dos anos, a igreja tem crescido através do ensino bíblico, da oração, do louvor e do serviço, reunindo pessoas de diferentes gerações.</p>
      <p>A Juventude Evangélica de Bairro de Ajuda e a Organização Missionária Sal da Terra Guiné-Bissau são expressões vivas desse trabalho, com identidade e atividades próprias.</p>
      <div class="note"><strong>Informação provisória:</strong> ano de fundação, nomes da liderança e marcos históricos oficiais ainda não foram fornecidos.</div>
      <h2 id="identidade">Identidade institucional</h2>
      <p>Somos uma igreja evangélica de Bissau, com presença nas redes sociais e trabalho junto das famílias da comunidade. A nossa sede funciona como ponto de encontro para cultos, formação e ações de solidariedade.</p>
      <h2 id="missao">Missão e visão</h2>
      <p>Anunciar o evangelho de Jesus Cristo, formar discípulos e servir a comunidade, com fidelidade à Palavra de Deus e em comunhão com as igrejas filiais e campos missionários. Queremos ser uma comunidade acolhedora, firme na fé e relevante na sociedade.</p>
      <div class="note note-info"><strong>Nota:</strong> redação provisória, confirmar ou substituir pelo texto oficial da igreja.</div>
      <h2 id="valores">Valores</h2>
      <div class="grid grid-4">${[['Palavra', '📖'], ['Oração', '🙏'], ['Comunhão', '🤝'], ['Serviço', '💛']].map(function (v) {
        return '<div class="card card-plain"><div class="card-body" style="text-align:center"><div class="icon-box" style="margin:0 auto 1rem">' + v[1] + '</div><h3>' + e(v[0]) + '</h3><p style="font-size:0.85rem;color:var(--muted)">A confirmar</p></div></div>';
      }).join('')}</div>
      <h2 id="lideranca">Liderança e Direção da Igreja</h2>
      <p>${e(C.churchLeadership.intro)}</p>
      <h3 id="direcao">Direção da IEBA</h3>
      <div class="table-wrap"><table class="schedule-table"><thead><tr><th>Função</th><th>Atribuições</th></tr></thead><tbody>
        ${C.churchLeadership.roles.map(function (r) { return '<tr><td class="day">' + e(r.role) + '</td><td>' + e(r.duty) + '</td></tr>'; }).join('')}
      </tbody></table></div>
      <div class="note note-info"><strong>Conselho da igreja:</strong> ${e(C.churchLeadership.council)}</div>
      <h3>Áreas de serviço ministerial</h3>
      <div class="grid grid-2">${C.ministries.slice(0, 4).map(function (m) {
        return '<div class="card card-plain"><div class="card-body"><h3>' + e(m.name) + '</h3><p style="font-size:0.88rem;color:var(--muted)">' + e(m.tagline) + '</p></div></div>';
      }).join('')}</div>
      <div class="note"><strong>Conteúdo provisório:</strong> ${e(C.churchLeadership.note)}</div>
      <a class="btn btn-outline-dark" href="plano-direcao.html">Ver Plano da Direção →</a>
    </article>
  </div></section>`
}));

/* ---------------- EVENTOS — ações programadas nos planos ---------------- */
write('eventos.html', layout({
  title: 'Eventos', active: 'eventos',
  content: `
  ${crumb([['Início', 'index.html'], ['Eventos']])}
  ${heroBand({ title: 'Eventos', eyebrow: 'Agenda de eventos', icon: '📅', variant: 'variant-gold' })}
  <section class="section"><div class="wrap">${sectionHead('Eventos em destaque', 'Selecionados pelo administrador geral — clique para ver o evento completo')}
    <div class="note note-info"><strong>Destaques:</strong> somente o administrador geral pode marcar, ordenar e retirar eventos desta secção. Os destaques atuais são provisórios, até à ativação do painel administrativo.</div>
    <div class="carousel" data-carousel-auto>
      <button class="carousel-btn carousel-prev" type="button" aria-label="Evento anterior">‹</button>
      <div class="carousel-track auto" data-store-carousel="eventos">${featuredEvents.map(eventCard).join('')}</div>
      <button class="carousel-btn carousel-next" type="button" aria-label="Evento seguinte">›</button>
    </div>
  </div></section>
  <section class="section section-alt" id="agenda"><div class="wrap">
    ${sectionHead('Agenda de eventos', 'Eventos a realizar, realizados, cancelados e arquivados')}
    <div class="filter-bar" role="group" aria-label="Filtrar eventos por estado">
      <button class="filter-btn active" type="button" data-filter="all">Todos</button>
      <button class="filter-btn" type="button" data-filter="a-realizar">A realizar</button>
      <button class="filter-btn" type="button" data-filter="realizado">Realizado</button>
      <button class="filter-btn" type="button" data-filter="cancelado">Cancelado</button>
      <button class="filter-btn" type="button" data-filter="arquivado">Arquivado</button>
    </div>
    <ul class="agenda">${C.events.map(function (ev) {
      var slug = ev.status.toLowerCase().replace(/ /g, '-');
      return '<li data-filter-item="' + a(slug) + '"><span class="ag-day">' + e(ev.date) + '</span><span class="ag-name">' + e(ev.title) + '<small>' + e(ev.ministry) + ' · ' + e(ev.location) + '</small></span><span class="ag-time">' + e(ev.status) + '</span></li>';
    }).join('')}</ul>
    <div class="note note-info"><strong>Regra:</strong> eventos e destaques são aprovados pelo administrador geral. A data de publicação é distinta da data de realização.</div>
  </div></section>
  <section class="section" data-store-section><div class="wrap">
    <h2>Eventos adicionados pelo painel</h2>
    <div data-store-render="eventos"></div>
  </div></section>`
}));

/* ---------------- ATIVIDADES — bento ---------------- */
write('atividades.html', layout({
  title: 'Atividades', active: 'atividades',
  content: `
  ${crumb([['Início', 'index.html'], ['Atividades']])}
  ${heroBand({ title: 'Atividades', sub: 'Os encontros regulares de segunda a domingo — a rotina semanal da IEBA. Ações programadas nos planos estão na página Eventos.', eyebrow: 'Rotina semanal', icon: '✦', variant: 'variant-teal', diagonal: true })}
  <section class="section"><div class="wrap">
    <div class="note note-info"><strong>Não confundir:</strong> Atividades são os encontros que acontecem todas as semanas, de segunda a domingo. <a href="eventos.html">Eventos</a> são as ações programadas nos planos, com data e estado próprios.</div>
    <div class="bento">
      <article class="card bento-feature card-body">
        <span class="badge badge-gold">Destaque</span>
        <h2 style="margin-top:1rem">Culto Geral de Domingo</h2>
        <p>O ponto de encontro de toda a congregação: louvor, Palavra de Deus, oração e comunhão. Das 10h30 às 12h30, na sede da IEBA.</p>
        <div style="margin-top:auto"><a class="btn btn-outline" href="#semana">Ver a semana completa →</a></div>
      </article>
      ${C.services.slice(0, 7).map(function (s) {
        return '<article class="card"><div class="card-body"><span class="badge badge-blue">' + e(s.day) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(s.name) + '</h3><p style="font-size:0.88rem;color:var(--muted)">' + e(s.description) + '</p><p style="font-size:0.82rem;color:var(--gold);font-weight:700;margin:0">' + e(s.time) + '</p></div></article>';
      }).join('')}
    </div>
  </div></section>
  <section class="section section-alt" id="semana"><div class="wrap">
    <h2>Programação completa da semana</h2>
    ${serviceTable()}
    <div class="note"><strong>Formação e serviço:</strong> as aulas de agropecuária e conservação de alimentos são ações programadas, não atividades semanais. Consulte a página de eventos e fale com <strong>${e(S.contactAgriculture)}</strong> para informações.</div>
  </div></section>
  <section class="section" data-store-section><div class="wrap">
    <h2>Atividades adicionadas pelo painel</h2>
    <div data-store-render="atividades"></div>
  </div></section>`
}));

/* ---------------- JOVENS ---------------- */
write('jovens.html', layout({
  title: 'Juventude Evangélica', active: 'jovens',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Juventude']])}
  ${heroBand({ title: 'Juventude Evangélica', sub: 'Jovens que amam a Deus e servem a comunidade — Bairro de Ajuda, Bissau.', eyebrow: 'Ministério IEBA', icon: '👥', variant: 'variant-gold' })}
  <section class="section"><div class="wrap">
    <div class="stat-row">
      <div class="stat"><strong>679</strong><span>seguidores na página oficial</span></div>
      <div class="stat"><strong>Dom</strong><span>16h30 – 18h · encontro semanal</span></div>
      <div class="stat"><strong>∞</strong><span>líderes em formação</span></div>
    </div>
    <div class="grid grid-2" style="align-items:start">
      <div><h2>Somos a Juventude da IEBA</h2>
        <p class="lead">Esta é a página oficial da Juventude da Igreja Evangélica de Bairro de Ajuda, Guiné-Bissau. Reunimos jovens para ouvir a Palavra, orar, louvar e servir.</p>
        <p>Ao longo dos anos, novos líderes têm sido formados e encorajados a servir, com compromisso e alegria.</p>
        <div class="note note-info"><strong>Contacto:</strong> ${e(S.emailYouth)} · ${e(S.facebookYouth)}</div>
      </div>
      <div class="card"><div class="card-body"><h3>Objetivos</h3><ul class="list-check">${C.ministries[0].objectives.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul></div></div>
    </div>
  </div></section>
  ${heroVerse('Não te deixes vencer pelo mal, mas vence o mal com o bem.', 'Romanos 12:21', 'Versículo da juventude', 'blue')}
  <section class="section"><div class="wrap">${sectionHead('Atividades semanais', 'Quando nos encontramos, de segunda a domingo')}
    <ul class="agenda">${C.ministries[0].schedule.map(function (x) {
      var p = x.split(': ');
      return '<li><span class="ag-day">' + e(p[0]) + '</span><span class="ag-name">' + e(p.length > 1 ? p.slice(1).join(': ') : x) + '</span><span class="ag-time">→</span></li>';
    }).join('')}</ul>
  </div></section>
  ${ministryExtra('jovens')}`
}));

/* ---------------- MULHERES — faixa de versículo (plum) ---------------- */
write('mulheres.html', layout({
  title: 'Ministério das Mulheres', active: 'mulheres',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Mulheres']])}
  ${heroVerse('A mulher virtuosa... a sua boca fala do que é cheio de sabedoria, e a lei da bondade está na sua língua.', 'Provérbios 31:26', 'Ministério das Mulheres', 'plum')}
  <section class="section"><div class="wrap" style="max-width:820px;text-align:center">
    <span class="sticker plum">Culto de mindjeris</span>
    <h2 style="margin-top:1.25rem">Mulheres de fé que se apoiam e servem</h2>
    <p class="lead">O Ministério das Mulheres da IEBA reúne as irmãs da congregação para culto, oração, formação e companheirismo. É um espaço de acolhimento, encorajamento e crescimento espiritual para as mulheres da igreja e das famílias da comunidade.</p>
    <div class="grid grid-2" style="margin-top:2.5rem;text-align:left">
      <div class="card"><div class="card-body"><h3>Objetivos</h3><ul class="list-check">${C.ministries[1].objectives.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul></div></div>
      <div class="card"><div class="card-body"><h3>Atividades</h3><ul class="list-check">${C.ministries[1].activities.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul></div></div>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <div class="spotlight">
      <div class="spotlight-date" style="background:#8e4b6e;color:#fff"><strong>SEX</strong><span>17h – 20h</span></div>
      <div class="spotlight-body"><h2>Culto das Senhoras</h2><p>Encontro semanal das mulheres da igreja, com louvor, oração e formação bíblica. Aberto a todas as mulheres interessadas.</p></div>
    </div>
  </div></section>
  ${ministryExtra('mulheres')}`
}));

/* ---------------- MENINAS — playful ---------------- */
write('meninas.html', layout({
  title: 'Ministério das Meninas', active: 'meninas',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Meninas']])}
  ${heroBand({ title: 'Ministério das Meninas', sub: 'Crescer com Deus, uma geração de cada vez', eyebrow: 'Ministério IEBA', icon: '🌸', variant: 'variant-plum' })}
  <section class="section ly-playful"><div class="wrap">
    <div style="text-align:center"><span class="sticker">Bem-vindas!</span><span class="sticker teal">Amigas de Deus</span><span class="sticker plum">Crescendo juntas</span></div>
    <div class="grid grid-3" style="margin-top:2rem">
      ${C.ministries[2].objectives.map(function (o, i) {
        return '<article class="card"><div class="thumb ' + ['', 'thumb-teal', 'thumb-plum'][i] + '"><span class="thumb-label">' + ['📖', '🎨', '💛'][i] + '</span></div><div class="card-body"><h3 class="card-title">' + e(o) + '</h3></div></article>';
      }).join('')}
    </div>
    <div class="grid grid-2" style="margin-top:1.5rem">
      <div class="card"><div class="card-body"><h3>Atividades</h3><ul class="list-check">${C.ministries[2].activities.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul></div></div>
      <div class="card"><div class="card-body"><h3>Quando</h3><p><strong>Domingo, 09h – 10h</strong><br>Escola Dominical, na sede da IEBA.</p><div class="note note-info">${e(C.ministries[2].note)}</div></div></div>
    </div>
  </div></section>
  ${ministryExtra('meninas')}`
}));

/* ---------------- SAL DA TERRA — versículo central ---------------- */
write('sal-da-terra.html', layout({
  title: 'Sal da Terra', active: 'sal-da-terra',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Sal da Terra']])}
  ${heroVerse('Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar?', 'Mateus 5:13', 'Organização Missionária Sal da Terra Guiné-Bissau', '')}
  <section class="section"><div class="wrap">
    <div class="grid grid-2" style="align-items:start">
      <div><span class="badge badge-gold">7 aos 27 anos</span>
        <h2 style="margin-top:1rem">Adolescentes e jovens a ser sal da terra</h2>
        <p class="lead">A Organização Missionária Sal da Terra Guiné-Bissau é uma organização de adolescentes e jovens dos 7 aos 27 anos, ligada à IEBA.</p>
        <p>O grupo reúne-se ao sábado e desenvolve atividades de formação cristã, evangelização e serviço missionário.</p>
        <div class="note"><strong>Atenção:</strong> não presumir que todos os participantes possuem a mesma função ou responsabilidade.</div>
        <p style="font-size:0.9rem"><strong>Contacto:</strong> ${e(S.emailSal)} · <a href="${a(S.facebookSal)}" target="_blank" rel="noopener noreferrer">facebook.com/stguinebissau ↗</a></p>
      </div>
      <div class="card"><div class="card-body"><h3>Objetivos e atividades</h3>
        <ul class="list-check">${C.ministries[3].objectives.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul>
        <hr><ul class="list-check">${C.ministries[3].activities.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul>
      </div></div>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <div class="spotlight"><div class="spotlight-date"><strong>SÁB</strong><span>16h – 17h</span></div>
      <div class="spotlight-body"><h2>Encontro semanal</h2><p>O espaço de formação, louvor e comunhão do Sal da Terra, na sede da IEBA.</p></div></div>
  </div></section>
  ${ministryExtra('sal-da-terra')}`
}));

/* ---------------- CRIANÇAS — playful ---------------- */
write('criancas.html', layout({
  title: 'Ministério das Crianças', active: 'criancas',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Crianças']])}
  ${heroBand({ title: 'Ministério das Crianças', sub: 'Acolher e ensinar as crianças no amor de Deus', eyebrow: 'Ministério IEBA', icon: '🧒', variant: 'variant-teal' })}
  <section class="section ly-playful"><div class="wrap">
    <div style="text-align:center"><span class="sticker teal">Escola Dominical</span><span class="sticker">Domingo, 09h</span></div>
    <div class="cmd-grid grid grid-3" style="margin-top:2rem">
      ${C.ministries[4].objectives.map(function (o, i) {
        return '<article class="card"><div class="thumb ' + ['thumb-teal', 'thumb-gold', 'thumb-blue'][i] + '"><span class="thumb-label">' + ['✏️', '🎵', '🙏'][i] + '</span></div><div class="card-body"><h3 class="card-title">' + e(o) + '</h3></div></article>';
      }).join('')}
    </div>
    <div class="note note-info" style="margin-top:2rem"><strong>Proteção de menores:</strong> ${e(C.ministries[4].note)}</div>
  </div></section>
  ${ministryExtra('criancas')}`
}));

/* ---------------- MISSÕES — linhas horizontais ---------------- */
write('missoes.html', layout({
  title: 'Ministério de Missões', active: 'missoes',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Missões']])}
  ${heroBand({ title: 'Ministério de Missões', sub: 'Levando o evangelho a cada localidade: Tchangue, Sahara, Rucuto e Ilhas.', eyebrow: 'Expansão do evangelho', icon: '🌍', diagonal: true })}
  <section class="section"><div class="wrap">
    <h2>Campos acompanhados</h2>
    <p class="lead">O Ministério de Missões coordena o trabalho evangelístico e o acompanhamento das igrejas filiais e campos missionários da IEBA.</p>
    <div style="margin-top:2rem">
      ${C.missionFields.map(function (f) {
        return '<a class="field-row" href="campo-' + f.slug + '.html" style="--accent:' + f.color + '"><span class="bar"></span><div><h3>' + e(f.name) + '</h3><p>' + e(f.tagline) + '</p></div><div><p>' + e(f.description) + '</p></div><span class="row-action">Ver campo →</span></a>';
      }).join('')}
    </div>
  </div></section>
  <section class="section section-primary"><div class="wrap" style="text-align:center">
    <h2>Visitas missionárias e evangelização</h2>
    <p>Promovemos visitas, cultos, discipulado, formação de líderes locais e projetos de apoio às comunidades.</p>
    <a class="btn btn-primary" href="campos-missionarios.html">Explorar os campos</a>
  </div></section>
  ${ministryExtra('missoes')}`
}));

/* ---------------- MINISTÉRIO DE ORAÇÃO — versículo + split ---------------- */
write('ministerio-oracao.html', layout({
  title: 'Ministério de Oração', active: 'ministerio-oracao',
  content: `
  ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], ['Oração']])}
  ${heroVerse('Orai uns pelos outros, para que sejais curados. A oração da fé salvará o doente.', 'Tiago 5:16', 'Ministério de Oração', 'teal')}
  <section class="section"><div class="wrap split-panel">
    <div class="panel-side">
      <h2>Oração é o fundamento de tudo</h2>
      <p>O Ministério de Oração dedica-se à intercessão pela igreja, pelas famílias, pela cidade e pelo país. Recebe e acompanha os pedidos enviados através do formulário público.</p>
      <ul class="list-check">
        <li>Momento de orações no culto de domingo (10h – 10h30)</li>
        <li>Intercessão e acompanhamento confidencial</li>
        <li>Encontros de oração quando agendados</li>
      </ul>
      <div class="note" style="background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.3);color:#fff"><strong>Confidencialidade:</strong> só o administrador geral e o Ministério de Oração consultam os pedidos.</div>
    </div>
    <div class="panel-main">
      <h3>Tem um pedido?</h3>
      <p class="text-muted">Envie o seu pedido de forma segura. Não será publicado no site.</p>
      <a class="btn btn-blue btn-block" href="pedidos-oracao.html">Enviar pedido de oração</a>
      <a class="btn btn-outline-dark btn-block" href="contactos.html" style="margin-top:0.75rem">Falar com a igreja</a>
      <hr>
      <h3>Objetivos</h3>
      <ul class="list-check">${C.ministries[6].objectives.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul>
    </div>
  </div></section>
  ${ministryExtra('ministerio-oracao')}`
}));

/* ---------------- PROJETOS — cartões com progresso ---------------- */
write('projetos-sociais.html', layout({
  title: 'Projetos Sociais', active: 'projetos',
  content: `
  ${crumb([['Início', 'index.html'], ['Projetos sociais']])}
  ${heroBand({ title: 'Projetos Sociais', sub: 'Onde o evangelho se torna serviço concreto na comunidade.', eyebrow: 'Serviço e solidariedade', icon: '🤝', variant: 'variant-teal' })}
  <section class="section"><div class="wrap">
    <div class="note"><strong>Publicação:</strong> os projetos são publicados pelo administrador geral. Dados de apoio e doações são confirmados pela igreja antes de qualquer publicação.</div>
    <div class="grid grid-2">
      ${C.projects.map(function (p, i) {
        var pct = p.status === 'Em curso' ? 60 : 10;
        return `<article class="card project-card"><div class="card-body"><div class="project-top"><h3 class="card-title">${e(p.name)}</h3><span class="badge ${p.status === 'Em curso' ? 'badge-green' : 'badge-warn'}">${e(p.status)}</span></div>
          <p>${e(p.description)}</p>
          <div class="progress-line"><span style="width:${pct}%"></span></div>
          <div class="project-meta"><span><strong>Beneficiários:</strong> ${e(p.beneficiaries)}</span><span><strong>Necessidades:</strong> ${e(p.needs)}</span></div>
        </div><div class="card-footer"><a class="card-link" href="doacoes.html">Apoiar este projeto →</a></div></article>`;
      }).join('')}
    </div>
  </div></section>`
}));

/* ---------------- MÍDIA — mosaico ---------------- */
write('midia.html', layout({
  title: 'Mídia', active: 'midia', lightbox: true,
  content: `
  ${crumb([['Início', 'index.html'], ['Mídia']])}
  ${heroBand({ title: 'Mídia', sub: 'Fotografias, álbuns e vídeos das atividades da IEBA.', eyebrow: 'A nossa galeria', icon: '📷', variant: 'variant-blue' })}
  <section class="section"><div class="wrap">
    <div class="filter-bar" role="group" aria-label="Filtrar mídia">
      <button class="filter-btn active" type="button" data-filter="all">Tudo</button>
      <button class="filter-btn" type="button" data-filter="fotos">Fotografias</button>
      <button class="filter-btn" type="button" data-filter="videos">Vídeos</button>
      <button class="filter-btn" type="button" data-filter="jovens">Jovens</button>
      <button class="filter-btn" type="button" data-filter="missoes">Missões</button>
    </div>
    <div class="mosaic">
      ${[['Culto dominical', 'fotos'], ['Juventude Evangélica', 'fotos jovens'], ['Sal da Terra', 'fotos jovens'], ['Culto das Senhoras', 'fotos'], ['Escola Dominical', 'fotos'], ['Visita missionária', 'fotos missoes'], ['Ensaio do louvor', 'fotos'], ['Comunidade', 'fotos']].map(function (g) {
        return '<div class="gallery-item" data-gallery-item data-filter-item="' + a(g[1]) + '" data-title="' + a(g[0]) + '"><span>' + e(g[0]) + '</span></div>';
      }).join('')}
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Vídeos</h2>
    <div class="video-grid">
      <div class="video-box" data-filter-item="videos"><div class="play">▶</div><strong>Cultos da IEBA</strong><small>Aguardando vídeos oficiais</small></div>
      <div class="video-box" data-filter-item="videos"><div class="play">▶</div><strong>Atividades dos ministérios</strong><small>Aguardando vídeos oficiais</small></div>
      <div class="video-box" data-filter-item="videos missoes"><div class="play">▶</div><strong>Campos missionários</strong><small>Aguardando vídeos oficiais</small></div>
    </div>
    <div class="note note-info"><strong>Privacidade:</strong> fotografias de menores só com autorização dos responsáveis legais. Nunca incorporar URLs de vídeo não autorizadas.</div>
  </div></section>
  <section class="section section-alt" data-store-section><div class="wrap">
    <h2>Mídia publicada pelo painel</h2>
    <div data-store-render="midia"></div>
  </div></section>`
}));

/* ---------------- NOTIFICAÇÕES / SUBSCRIÇÃO ---------------- */
write('notificacoes.html', layout({
  title: 'Receber Notificações', active: 'notificacoes',
  desc: 'Subscreva novidades, eventos e lembretes de atividades da IEBA.',
  content: `
  ${crumb([['Início', 'index.html'], ['Notificações']])}
  ${heroBand({ title: 'Receber Notificações', sub: 'Fique a par das novidades da igreja, dos eventos e dos lembretes de atividades.', eyebrow: 'Novidades e alertas', icon: '🔔', variant: 'variant-blue' })}
  <section class="section"><div class="wrap split-panel">
    <div class="panel-side">
      <h2>O que vai receber</h2>
      <ul class="list-check">
        <li><strong>Novidades:</strong> comunicados e notícias da IEBA.</li>
        <li><strong>Eventos:</strong> ações programadas nos planos.</li>
        <li><strong>Lembretes:</strong> avisos das atividades semanais.</li>
      </ul>
      <p>Escolha o canal pretendido: email, mensagem para o telemóvel ou ambos. Pode alterar ou cancelar a subscrição a qualquer momento.</p>
      <div class="note" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.3);color:#fff"><strong>Privacidade:</strong> os seus dados são usados apenas para envio das notificações solicitadas.</div>
    </div>
    <div class="panel-main">
      <form data-subscribe-form novalidate>
        <h3>Cadastrar subscrição</h3>
        <div class="field"><label for="sub-name">Nome <span class="text-muted">(opcional)</span></label><input id="sub-name" name="name" type="text"></div>
        <div class="field"><label for="sub-email">Email</label><input id="sub-email" name="email" type="email" required></div>
        <div class="field"><label for="sub-phone">Telemóvel <span class="text-muted">(opcional)</span></label><input id="sub-phone" name="phone" type="tel"></div>
        <div class="field"><label for="sub-channel">Canal preferido</label><select id="sub-channel" name="channel"><option value="email">Email</option><option value="sms">Mensagem (SMS)</option><option value="ambos">Email e SMS</option></select></div>
        <div class="field"><label>Temas</label>
          <label class="checkbox"><input type="checkbox" name="topics" value="novidades" checked> Novidades e comunicados</label>
          <label class="checkbox"><input type="checkbox" name="topics" value="eventos" checked> Eventos programados</label>
          <label class="checkbox"><input type="checkbox" name="topics" value="lembretes" checked> Lembretes de atividades</label>
        </div>
        <div class="field"><label class="checkbox"><input type="checkbox" name="consent" required> Autorizo o tratamento dos meus dados para receber notificações <span class="req">*</span></label></div>
        <button class="btn btn-blue btn-block" type="submit">Subscrever notificações</button>
        <div class="form-msg" role="status"></div>
        <p class="form-note">O envio efetivo depende da integração do prestador de mensagens; a subscrição fica registada no sistema.</p>
      </form>
    </div>
  </div></section>`
}));

/* ---------------- PEDIDOS DE ORAÇÃO — split panel ---------------- */
write('pedidos-oracao.html', layout({
  title: 'Pedidos de Oração', active: 'pedidos', noindex: true,
  desc: 'Envie um pedido de oração confidencial à IEBA.',
  content: `
  ${crumb([['Início', 'index.html'], ['Pedidos de oração']])}
  ${heroBand({ title: 'Pedidos de Oração', sub: 'Envie o seu pedido com confidencialidade.', eyebrow: 'Ministério de Oração', icon: '🙏', variant: 'variant-teal' })}
  <section class="section"><div class="wrap split-panel">
    <div class="panel-side">
      <h2>Estamos a orar consigo</h2>
      <p>O Ministério de Oração da IEBA recebe e acompanha cada pedido. O seu pedido não será publicado no site.</p>
      <ul class="list-check"><li>Recebido</li><li>Em acompanhamento</li><li>Concluído</li><li>Arquivado</li></ul>
      <div class="note" style="background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.3);color:#fff"><strong>Confidencialidade:</strong> não expomos o conteúdo de pedidos em registos técnicos.</div>
    </div>
    <div class="panel-main">
      <form data-prayer-form novalidate>
        <h3>Enviar pedido</h3>
        <div class="field"><label for="pr-name">Nome <span class="text-muted">(opcional)</span></label><input id="pr-name" name="nome" type="text"></div>
        <div class="field"><label for="pr-contact">Email ou telefone <span class="text-muted">(opcional)</span></label><input id="pr-contact" name="contacto" type="text"></div>
        <div class="field"><label for="pr-text">Pedido de oração <span class="req">*</span></label><textarea id="pr-text" name="pedido" required></textarea></div>
        <div class="field"><label class="checkbox"><input type="checkbox" name="confidencial" checked> <span>Tratar confidencialmente</span></label></div>
        <div class="field"><label class="checkbox"><input type="checkbox" name="consentimento" required> <span>Autorizo o tratamento dos meus dados <span class="req">*</span></span></label></div>
        <button class="btn btn-blue btn-block" type="submit">Enviar pedido</button>
        <div class="form-msg" role="status"></div>
        <p class="form-note">Envio real ativado após configuração do Firebase.</p>
      </form>
    </div>
  </div></section>`
}));

/* ---------------- CONTACTOS — split invertido ---------------- */
write('contactos.html', layout({
  title: 'Contactos', active: 'contactos',
  content: `
  ${crumb([['Início', 'index.html'], ['Contactos']])}
  ${heroBand({ title: 'Contactos', sub: 'Fale connosco. Estamos no Bairro de Ajuda, atrás da Escola Attadamun.', eyebrow: 'Vamos conversar', icon: '✉', diagonal: true })}
  <section class="section"><div class="wrap split-panel">
    <div class="panel-side">
      <h2>Informações oficiais</h2>
      <ul class="contact-list" style="margin-top:1.5rem">
        <li><span class="ico">📍</span><div><strong>Morada</strong><span>${e(S.address)}, ${e(S.city)}, ${e(S.country)}</span></div></li>
        <li><span class="ico">☎</span><div><strong>Telefone</strong><span><a href="${a(S.phoneLink)}" style="color:#fff">${e(S.phone)}</a></span></div></li>
        <li><span class="ico">✉</span><div><strong>Email geral</strong><span>${e(S.email)}</span></div></li>
        <li><span class="ico">👥</span><div><strong>Juventude</strong><span>${e(S.emailYouth)}</span></div></li>
        <li><span class="ico">🧂</span><div><strong>Sal da Terra</strong><span>${e(S.emailSal)}</span></div></li>
        <li><span class="ico">🌱</span><div><strong>Agropecuária</strong><span>${e(S.contactAgriculture)}</span></div></li>
      </ul>
      <h3 style="margin-top:1.5rem">Redes sociais</h3><ul>{social}</ul>
    </div>
    <div class="panel-main">
      <form data-demo-form novalidate>
        <h3>Enviar mensagem</h3>
        <div class="field"><label for="ct-name">Nome <span class="req">*</span></label><input id="ct-name" required></div>
        <div class="field"><label for="ct-email">Email <span class="req">*</span></label><input id="ct-email" type="email" required></div>
        <div class="field"><label for="ct-phone">Telefone <span class="text-muted">(opcional)</span></label><input id="ct-phone" type="tel"></div>
        <div class="field"><label for="ct-subject">Assunto <span class="req">*</span></label><input id="ct-subject" required></div>
        <div class="field"><label for="ct-msg">Mensagem <span class="req">*</span></label><textarea id="ct-msg" required></textarea></div>
        <div class="field"><label class="checkbox"><input type="checkbox" required> <span>Autorizo o tratamento dos meus dados <span class="req">*</span></span></label></div>
        <button class="btn btn-blue btn-block" type="submit">Enviar mensagem</button>
        <div class="form-msg" role="status"></div>
      </form>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Onde estamos</h2>
    <div class="map-box"><div><strong>Mapa</strong><p>Será incorporado quando a localização oficial for confirmada.</p><small>${e(S.address)}, ${e(S.city)}</small></div></div>
  </div></section>`
  .replace('{social}', socialHTML())
}));

/* ---------------- DOAÇÕES — split dourado ---------------- */
write('doacoes.html', layout({
  title: 'Doações', active: 'doacoes',
  content: `
  ${crumb([['Início', 'index.html'], ['Doações']])}
  ${heroBand({ title: 'Doações', sub: 'Apoie o trabalho da IEBA. Dados oficiais serão confirmados pela igreja.', eyebrow: 'Contribuir', icon: '💛', variant: 'variant-gold' })}
  <section class="section"><div class="wrap">
    <div class="note"><strong>Importante:</strong> não existem dados bancários publicados nesta versão. Nunca são inventadas chaves ou contas.</div>
    <div class="split-panel gold">
      <div class="panel-side">
        <h2>Modalidade A — Doações tradicionais</h2>
        <p>Transferência bancária e pagamento móvel, com dados confirmados pela igreja.</p>
        <ul class="list-check"><li>Dados bancários oficiais</li><li>Meios de pagamento móvel</li><li>Confirmação por comprovativo</li></ul>
        <a class="btn btn-primary" href="contactos.html">Pedir dados oficiais</a>
      </div>
      <div class="panel-main">
        <h3>Modalidade B — Doações online</h3>
        <p class="text-muted">Preparação para integração com prestador confiável, com confirmação autenticada por webhook.</p>
        <form data-demo-form novalidate>
          <div class="field"><label for="d-value">Valor</label><select id="d-value"><option>5 000 FCFA</option><option>10 000 FCFA</option><option>20 000 FCFA</option><option>Outro valor</option></select></div>
          <div class="field"><label for="d-purpose">Finalidade</label><select id="d-purpose"><option>Sustentação geral</option><option>Missões</option><option>Projetos sociais</option></select></div>
          <button class="btn btn-blue" type="submit">Continuar</button><div class="form-msg" role="status"></div>
        </form>
        <p class="form-note">A IEBA nunca armazena dados completos de cartões bancários.</p>
      </div>
    </div>
  </div></section>`
}));

/* ---------------- CAMPOS MISSIONÁRIOS — linhas + atualizações ---------------- */
write('campos-missionarios.html', layout({
  title: 'Igrejas Filiais e Campos Missionários', active: 'campos',
  content: `
  ${crumb([['Início', 'index.html'], ['Campos missionários']])}
  ${heroBand({ title: 'Igrejas Filiais e Campos Missionários', sub: 'Acompanhe o trabalho da IEBA em Tchangue, Sahara, Rucuto e Ilhas.', eyebrow: 'Expansão do evangelho', icon: '🌍', variant: 'variant-teal' })}
  <section class="section"><div class="wrap">
    <h2>Os nossos campos</h2>
    <p class="lead">Cada campo tem página própria, com notícias, galeria, vídeos e projetos.</p>
    <div style="margin-top:2rem">
      ${C.missionFields.map(function (f) {
        return '<a class="field-row" href="campo-' + f.slug + '.html" style="--accent:' + f.color + '"><span class="bar"></span><div><h3>' + e(f.name) + '</h3><p>' + e(f.tagline) + '</p></div><div><p>' + e(f.description) + '</p></div><span class="row-action">Abrir →</span></a>';
      }).join('')}
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Atualizações recentes</h2>
    <div class="grid grid-2">${C.missionFields.map(function (f) {
      return '<article class="card card-plain"><div class="card-body"><span class="badge badge-blue">' + e(f.name) + '</span><h3 class="card-title" style="margin-top:0.75rem">Atualização do campo de ' + e(f.name) + '</h3><p style="font-size:0.9rem;color:var(--muted)">Publicação de exemplo — substituir por conteúdo aprovado.</p></div></article>';
    }).join('')}</div>
    <div class="note note-info"><strong>Gestão:</strong> nenhuma publicação fica visível sem aprovação do administrador geral.</div>
  </div></section>`
}));

/* ---------------- PÁGINAS DE CAMPO — estrutura própria ---------------- */
C.missionFields.forEach(function (f, idx) {
  write('campo-' + f.slug + '.html', layout({
    title: f.name + ' — Campos Missionários', desc: f.description, active: 'campo-' + f.slug, lightbox: true,
    content: `
    ${crumb([['Início', 'index.html'], ['Campos Missionários', 'campos-missionarios.html'], [f.name]])}
    ${heroBand({ title: f.name, sub: f.tagline + ' da IEBA. Notícias, atividades, fotografias e necessidades.', eyebrow: 'Campo missionário', icon: ['🏡', '🌾', '🌱', '🏝️'][idx], variant: 'variant-teal' })}
    <section class="section"><div class="wrap">
      <div class="grid grid-2" style="align-items:start">
        <article class="ly-article"><h2>O trabalho em ${e(f.name)}</h2><p>${e(f.description)}</p>
          <div class="note note-info"><strong>A confirmar:</strong> história, data de início, responsável local e localização oficial.</div>
        </article>
        <div class="card"><div class="card-body"><h3>Resumo</h3>
          <div class="fact-grid"><div class="fact"><strong>${e(f.status)}</strong><span>Estado</span></div><div class="fact"><strong>${e(f.tagline)}</strong><span>Tipo</span></div></div>
          <p style="margin-top:1.25rem;font-size:0.9rem;color:var(--muted)">Toda a publicação passa pela revisão e aprovação do administrador geral.</p>
        </div></div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="wrap"><h2>Atualizações do campo</h2>
      <ul class="agenda">${['Visita missionária e encontro com a comunidade', 'Culto especial e evangelização', 'Relatório de atividades'].map(function (t) {
        return '<li><span class="ag-day">' + e(f.name) + '</span><span class="ag-name">' + e(t) + '<small>Publicação de exemplo</small></span><span class="ag-time">→</span></li>';
      }).join('')}</ul>
    </div></section>
    <section class="section"><div class="wrap"><h2>Galeria</h2>
      <div class="mosaic">${galleryTiles(['Culto no campo', 'Encontro de jovens', 'Evangelização', 'Comunidade local', 'Visita missionária', 'Formação', 'Louvor', 'Crianças'])}</div>
      <div class="video-grid" style="margin-top:1.5rem">
        <div class="video-box"><div class="play">▶</div><strong>Vídeos de ${e(f.name)}</strong><small>Aguardando vídeos aprovados</small></div>
        <div class="video-box"><div class="play">▶</div><strong>Testemunhos</strong><small>Só com autorização</small></div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="wrap"><h2>Projetos e necessidades</h2>
      <div class="grid grid-2">
        <div class="card"><div class="card-body"><h3>Projetos</h3><p class="text-muted">Espaço reservado aos projetos aprovados do campo ${e(f.name)}.</p></div></div>
        <div class="card"><div class="card-body"><h3>Necessidades</h3><p class="text-muted">Meios de transporte, materiais de evangelização e formação de líderes. Confirmar com a administração.</p></div></div>
      </div>
      <div style="text-align:center;margin-top:2rem"><a class="btn btn-primary" href="doacoes.html">Apoiar missões</a></div>
    </div></section>`
  }));
});

/* ---------------- PLANO GERAL DA IGREJA (compila todos os planos) ---------------- */
write('plano-geral.html', layout({
  title: 'Plano Geral da IEBA', active: 'plano',
  content: `
  ${crumb([['Início', 'index.html'], ['Plano geral']])}
  ${heroBand({ title: 'Plano Geral da IEBA', sub: C.generalProgram.intro, eyebrow: C.generalProgram.period, icon: '📋', diagonal: true })}
  <section class="section"><div class="wrap">
    <div class="doc-toolbar">
      <span class="doc-label">Documento oficial da IEBA — compilação dos planos</span>
      <button class="btn btn-blue btn-sm" type="button" data-print>🖨 Imprimir / Guardar PDF</button>
      <a class="btn btn-outline-dark btn-sm" href="assets/pdfs/plano-geral.pdf" download>⬇ Descarregar PDF</a>
    </div>
    <h2>Documentos que compõem o Plano Geral</h2>
    <div class="grid grid-4" style="margin-top:1.5rem">
      <a class="card" href="plano-departamentos.html" style="color:inherit;text-decoration:none"><div class="card-body"><div class="icon-box">🗂️</div><h3 class="card-title">Planos dos Departamentos</h3><p style="font-size:0.88rem;color:var(--muted)">Planos anuais de cada ministério e organização.</p></div><div class="card-footer"><span class="card-link">Abrir →</span></div></a>
      <a class="card" href="plano-direcao.html" style="color:inherit;text-decoration:none"><div class="card-body"><div class="icon-box">🧭</div><h3 class="card-title">Plano da Direção</h3><p style="font-size:0.88rem;color:var(--muted)">Prioridades, metas e governação da igreja.</p></div><div class="card-footer"><span class="card-link">Abrir →</span></div></a>
      <a class="card" href="liturgia.html" style="color:inherit;text-decoration:none"><div class="card-body"><div class="icon-box">📖</div><h3 class="card-title">Liturgia dos Cultos</h3><p style="font-size:0.88rem;color:var(--muted)">Ordem de serviço dos encontros regulares.</p></div><div class="card-footer"><span class="card-link">Abrir →</span></div></a>
      <a class="card" href="campos-missionarios.html" style="color:inherit;text-decoration:none"><div class="card-body"><div class="icon-box">🌍</div><h3 class="card-title">Planos Missionários</h3><p style="font-size:0.88rem;color:var(--muted)">Atividades e necessidades dos quatro campos.</p></div><div class="card-footer"><span class="card-link">Abrir →</span></div></a>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Síntese dos planos dos departamentos</h2>
    <p class="lead">Cada ministério mantém o seu plano anual próprio. Abaixo, o resumo do primeiro trimestre de cada um.</p>
    <div class="grid grid-2" style="margin-top:2rem">${C.ministries.map(function (m) {
      return '<article class="card card-plain"><div class="card-body"><span class="badge badge-blue">' + e(m.short) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(C.ministryDetails[m.slug].annualPlan[0].theme) + '</h3><p style="font-size:0.88rem;color:var(--muted)">' + e(C.ministryDetails[m.slug].annualPlan[0].actions) + '</p><a class="card-link" href="plano-departamentos.html">Ver plano completo →</a></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>Plano da direção — resumo</h2>
    <div class="grid grid-2">${C.directionPlan.priorities.map(function (p) {
      return '<div class="card card-plain"><div class="card-body"><h3>' + e(p.title) + '</h3><p style="font-size:0.9rem;color:var(--muted)">' + e(p.text) + '</p></div></div>';
    }).join('')}</div>
    <div style="text-align:center;margin-top:1.5rem"><a class="btn btn-outline-dark" href="plano-direcao.html">Ver plano da direção completo</a></div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Ênfases por período</h2>
    <div class="program-grid">${C.generalProgram.blocks.map(function (b) {
      return '<article class="card program-card"><div class="period">' + e(b.period) + '</div><div class="card-body"><h3 class="theme">' + e(b.theme) + '</h3><p>' + e(b.focus) + '</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>Atividades semanais (segunda a domingo)</h2>${serviceTable()}
    <div class="note note-info" style="margin-top:1.5rem"><strong>Atualização:</strong> o Plano Geral é compilado a partir dos planos aprovados e publicado pelo administrador geral. O PDF é gerado a partir desta página.</div>
    <ul class="list-check">${C.generalProgram.notes.map(function (n) { return '<li>' + e(n) + '</li>'; }).join('')}</ul>
  </div></section>`
}));

/* ---------------- PLANOS DOS DEPARTAMENTOS ---------------- */
write('plano-departamentos.html', layout({
  title: 'Planos dos Departamentos', active: 'plano',
  content: `
  ${crumb([['Início', 'index.html'], ['Plano geral', 'plano-geral.html'], ['Planos dos departamentos']])}
  ${heroBand({ title: 'Planos dos Departamentos', sub: 'Os planos anuais específicos de cada ministério e organização da IEBA.', eyebrow: 'Parte do Plano Geral', icon: '🗂️', variant: 'variant-teal' })}
  <section class="section"><div class="wrap">
    <div class="doc-toolbar">
      <span class="doc-label">Documento oficial da IEBA</span>
      <button class="btn btn-blue btn-sm" type="button" data-print>🖨 Imprimir / Guardar PDF</button>
      <a class="btn btn-outline-dark btn-sm" href="assets/pdfs/plano-departamentos.pdf" download>⬇ Descarregar PDF</a>
    </div>
    <p class="lead">Cada departamento tem o seu plano próprio, com objetivos, atividades, programação e responsáveis. Os conteúdos abaixo são mantidos de forma independente e publicados após aprovação do administrador geral.</p>
    <div class="dept-accordion" style="margin-top:2rem">
      ${C.ministries.map(function (m) {
        return `<details><summary>${e(m.name)} <span class="badge badge-blue">${e(m.short)}</span></summary>
          <div class="dept-body">
            <h4>Apresentação</h4><p>${e(m.description)}</p>
            <h4>Objetivos</h4><ul class="list-check">${m.objectives.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul>
            <h4>Atividades</h4><ul class="list-check">${m.activities.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul>
            <h4>Atividades semanais</h4><ul class="list-check">${m.schedule.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul>
            <h4>Plano anual</h4><ul class="list-check">${C.ministryDetails[m.slug].annualPlan.map(function (pl) { return '<li><strong>' + e(pl.period) + ':</strong> ' + e(pl.theme) + ' — ' + e(pl.actions) + '</li>'; }).join('')}</ul>
            <h4>Contacto</h4><p>${e(m.email || 'A confirmar')}${m.facebook ? ' · ' + e(m.facebook) : ''}</p>
            <div class="note note-info">${e(m.note)}</div>
            <a class="btn btn-outline-dark btn-sm" href="${m.slug}.html">Ver página do ministério →</a>
          </div>
        </details>`;
      }).join('')}
    </div>
    <div class="note"><strong>Gestão:</strong> os responsáveis submetem alterações ao plano do seu departamento, mas não publicam diretamente no site.</div>
  </div></section>`
}));

/* ---------------- PLANO DA DIREÇÃO ---------------- */
write('plano-direcao.html', layout({
  title: 'Plano da Direção', active: 'plano',
  content: `
  ${crumb([['Início', 'index.html'], ['Plano geral', 'plano-geral.html'], ['Plano da direção']])}
  ${heroBand({ title: 'Plano da Direção', sub: C.directionPlan.intro, eyebrow: 'Coordenação e governação', icon: '🧭', diagonal: true })}
  <section class="section"><div class="wrap">
    <div class="doc-toolbar">
      <span class="doc-label">Documento oficial da IEBA</span>
      <button class="btn btn-blue btn-sm" type="button" data-print>🖨 Imprimir / Guardar PDF</button>
      <a class="btn btn-outline-dark btn-sm" href="assets/pdfs/plano-direcao.pdf" download>⬇ Descarregar PDF</a>
    </div>
    <h2>Prioridades</h2>
    <div class="grid grid-2" style="margin-top:1.5rem">${C.directionPlan.priorities.map(function (p, i) {
      return '<article class="card program-card"><div class="period">Prioridade ' + (i + 1) + '</div><div class="card-body"><h3 class="theme">' + e(p.title) + '</h3><p>' + e(p.text) + '</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap">
    <h2>Objetivos gerais</h2>
    <ul class="list-check">${C.directionPlan.goals.map(function (g) { return '<li>' + e(g) + '</li>'; }).join('')}</ul>
    <ul class="list-check">${C.directionPlan.notes.map(function (n) { return '<li>' + e(n) + '</li>'; }).join('')}</ul>
    <div class="note note-info"><strong>Aprovação:</strong> este plano faz parte do Plano Geral e depende da confirmação da direção da igreja.</div>
  </div></section>`
}));

/* ---------------- LITURGIA DOS CULTOS ---------------- */
write('liturgia.html', layout({
  title: 'Liturgia dos Cultos', active: 'plano',
  content: `
  ${crumb([['Início', 'index.html'], ['Plano geral', 'plano-geral.html'], ['Liturgia dos cultos']])}
  ${heroBand({ title: 'Liturgia dos Cultos', sub: 'Ordem dos cultos e encontros da IEBA, para orientar a congregação e os responsáveis.', eyebrow: 'Ordem de serviço', icon: '📖', variant: 'variant-gold' })}
  <section class="section"><div class="wrap">
    <div class="doc-toolbar">
      <span class="doc-label">Documento oficial da IEBA</span>
      <button class="btn btn-blue btn-sm" type="button" data-print>🖨 Imprimir / Guardar PDF</button>
      <a class="btn btn-outline-dark btn-sm" href="assets/pdfs/liturgia.pdf" download>⬇ Descarregar PDF</a>
    </div>
    ${C.liturgies.map(function (l) {
      return `<article class="card" style="margin-bottom:1.5rem"><div class="card-body">
        <div class="project-top"><h2 style="margin:0">${e(l.name)}</h2><span class="badge badge-gold">${e(l.when)}</span></div>
        <p class="text-muted">${e(l.note)}</p>
        <ol class="liturgy-steps" style="margin-top:1.75rem">${l.steps.map(function (s) {
          return '<li><h3>' + e(s.title) + '</h3><p>' + e(s.text) + '</p></li>';
        }).join('')}</ol>
      </div></article>`;
    }).join('')}
    <div class="note note-info"><strong>Aprovação:</strong> a liturgia definitiva deve ser confirmada pela liderança da igreja antes de ser considerada oficial.</div>
  </div></section>`
}));

/* ---------------- TODAS AS NOTÍCIAS ---------------- */
write('noticias.html', layout({
  title: 'Notícias e Comunicados', active: 'noticias',
  content: `
  ${crumb([['Início', 'index.html'], ['Notícias']])}
  ${heroBand({ title: 'Notícias e Comunicados', sub: 'Todas as notícias ativas da IEBA, por ordem de cadastro.', eyebrow: 'Informação da igreja', icon: '📰', variant: 'variant-blue' })}
  <section class="section"><div class="wrap">
    <div class="note note-info"><strong>Gestão:</strong> o administrador geral pode retirar uma notícia da apresentação pública sem a eliminar.</div>
    <div class="grid grid-3">${C.news.filter(function (n) { return n.active; }).map(newsCard).join('')}</div>
  </div></section>
  <section class="section section-alt" data-store-section><div class="wrap">
    <h2>Comunicados publicados pelo painel</h2>
    <div data-store-render="comunicados"></div>
  </div></section>`
}));

/* ---------------- PÁGINAS INDIVIDUAIS DE NOTÍCIAS ---------------- */
C.news.forEach(function (n) {
  write('noticia-' + n.id + '.html', layout({
    title: n.title, active: 'noticias', desc: n.text,
    content: `
    ${crumb([['Início', 'index.html'], ['Notícias', 'noticias.html'], [n.title]])}
    ${heroBand({ title: n.title, sub: n.source + ' · ' + n.date, eyebrow: 'Notícia / comunicado', icon: '📰', variant: 'variant-blue' })}
    <section class="section"><div class="wrap">
      <div class="grid grid-2" style="align-items:start">
        <article class="ly-article"><h2>${e(n.title)}</h2><p class="lead">${e(n.text)}</p>
          <p>Este comunicado está publicado no site institucional da IEBA. Informações adicionais serão incluídas após confirmação e aprovação da administração.</p>
          <a class="btn btn-outline-dark" href="noticias.html">← Todas as notícias</a>
        </article>
        <div class="card"><div class="card-body"><h3>Dados da publicação</h3>
          <ul class="contact-list">
            <li><span class="ico">📅</span><div><strong>Data</strong><span>${e(n.date)}</span></div></li>
            <li><span class="ico">📌</span><div><strong>Origem</strong><span>${e(n.source)}</span></div></li>
            <li><span class="ico">👁️</span><div><strong>Estado</strong><span>${n.active ? 'Ativa — visível no site' : 'Retirada pelo administrador'}</span></div></li>
          </ul>
          <a class="btn btn-blue btn-block" href="contactos.html">Pedir mais informações</a>
        </div></div>
      </div>
    </div></section>`
  }));
});

/* ---------------- PÁGINAS INDIVIDUAIS DE EVENTOS ---------------- */
C.events.forEach(function (ev) {
  write('evento-' + ev.id + '.html', layout({
    title: ev.title, active: 'eventos',
    desc: ev.description,
    content: `
    ${crumb([['Início', 'index.html'], ['Eventos', 'eventos.html'], [ev.title]])}
    ${heroBand({ title: ev.title, sub: ev.description, eyebrow: ev.ministry + ' · ' + ev.status, icon: '📅', variant: 'variant-gold' })}
    <section class="section"><div class="wrap">
      <div class="grid grid-2" style="align-items:start">
        <article class="ly-article">
          <h2>Sobre o evento</h2>
          <p>${e(ev.description)}</p>
          ${ev.featured ? '<div class="note note-info"><strong>Em destaque:</strong> este evento foi selecionado pelo administrador geral para a página inicial.</div>' : ''}
          <h2>Liturgia</h2>
          <p>Consulte a ordem de serviço prevista para este encontro.</p>
          <a class="btn btn-outline-dark" href="liturgia.html">Ver liturgia dos cultos →</a>
        </article>
        <div class="card"><div class="card-body">
          <h3>Detalhes</h3>
          <ul class="contact-list">
            <li><span class="ico">📅</span><div><strong>Data de realização</strong><span>${e(ev.date)}</span></div></li>
            <li><span class="ico">🗓️</span><div><strong>Data de publicação</strong><span>${e(ev.published || 'A confirmar')}</span></div></li>
            <li><span class="ico">◷</span><div><strong>Horário</strong><span>${e(ev.time)}</span></div></li>
            <li><span class="ico">📍</span><div><strong>Local</strong><span>${e(ev.location)}</span></div></li>
            <li><span class="ico">👥</span><div><strong>Organização</strong><span>${e(ev.ministry)}</span></div></li>
            <li><span class="ico">🏷️</span><div><strong>Estado</strong><span>${e(ev.status)}</span></div></li>
          </ul>
          <a class="btn btn-blue btn-block" href="contactos.html">Pedir informações</a>
        </div></div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="wrap">
      <div class="cta-band"><div><h2>Participar</h2><p>Todos são bem-vindos. Para mais informações, fale connosco.</p></div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap"><a class="btn btn-primary" href="contactos.html">Contactar</a><a class="btn btn-outline" href="eventos.html">Outros eventos</a></div>
      </div>
    </div></section>`
  }));
});

/* ---------------- ADMIN — painel completo ---------------- */
const adminNav = [
  { group: 'GERAL', items: [['dashboard.html', '▦', 'Painel geral', 'dashboard']] },
  { group: 'CONTEÚDO', items: [
    ['eventos.html', '📅', 'Eventos', 'eventos'], ['cultos.html', '◷', 'Cultos e horários', 'cultos'],
    ['ministerios.html', '👥', 'Ministérios', 'ministerios'], ['atividades.html', '✦', 'Atividades', 'atividades'],
    ['midia.html', '📷', 'Mídia', 'midia'], ['projetos-sociais.html', '🤝', 'Projetos sociais', 'projetos']
  ] },
  { group: 'COMUNICAÇÃO', items: [
    ['comunicados.html', '📢', 'Comunicados', 'comunicados'],
    ['notificacoes.html', '🔔', 'Notificações', 'notificacoes'],
    ['pedidos-oracao.html', '🙏', 'Pedidos de oração', 'pedidos'], ['contactos.html', '✉', 'Mensagens', 'contactos']
  ] },
  { group: 'SISTEMA', items: [
    ['doacoes.html', '💛', 'Doações', 'doacoes'], ['utilizadores.html', '🔐', 'Utilizadores', 'utilizadores'],
    ['auditoria.html', '📋', 'Auditoria', 'auditoria'], ['configuracoes.html', '⚙', 'Configurações', 'configuracoes']
  ] }
];

function adminNavHTML(active) {
  return adminNav.map(function (g) {
    return '<p class="nav-label">' + e(g.group) + '</p>' + g.items.map(function (it) {
      return '<a href="' + it[0] + '" data-page="' + a(it[3]) + '"' + (it[3] === active ? ' class="active"' : '') + '><span class="ico">' + it[1] + '</span>' + e(it[2]) + '</a>';
    }).join('');
  }).join('');
}

function adminPage(key, title, subtitle, body) {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(title)} | IEBA Admin</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="../assets/logo/logo.jpg">
  <link rel="stylesheet" href="../css/admin.css">
</head>
<body class="admin-body" data-admin-page="${a(key)}">
  <aside class="admin-sidebar" id="sidebar">
    <div class="admin-brand"><img src="../assets/logo/logo.jpg" alt="IEBA"><div><strong>IEBA</strong><small>Painel administrativo</small></div></div>
    <nav class="admin-nav" aria-label="Menu administrativo">${adminNavHTML(key)}</nav>
    <div class="admin-sidebar-footer"><strong>IEBA</strong> · Bissau, Guiné-Bissau<br>Sessão segura · <span id="admin-year">2026</span></div>
  </aside>
  <div class="admin-main">
    <header class="admin-topbar">
      <button class="admin-menu-btn" type="button" data-admin-menu aria-label="Abrir menu">☰</button>
      <div class="admin-page-title"><h1>${e(title)}</h1><p>${e(subtitle)}</p></div>
      <div class="admin-top-actions">
        <input class="admin-search" type="search" data-admin-search placeholder="Pesquisar na página..." aria-label="Pesquisar">
        <button class="admin-icon-btn" type="button" data-toast="3 notificações por ler" aria-label="Notificações">🔔<span class="dot"></span></button>
        <div class="admin-avatar" id="admin-user-initials" title="Utilizador atual">AG</div>
        <a class="admin-logout" href="login.html" data-logout title="Terminar sessão"><span>⏻</span> Sair</a>
      </div>
    </header>
    <main class="admin-content">${body}</main>
  </div>
  <div class="a-modal" id="modal-generic"><div class="a-modal-box">
    <div class="a-modal-head"><h3>Editar registo</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form><div class="a-modal-body">
      <div class="a-field"><label>Título / Nome</label><input name="title" required></div>
      <div class="a-field"><label>Descrição</label><textarea name="description"></textarea></div>
      <div class="a-field"><label>Estado</label><input name="status" value="Publicado"></div>
      <div class="a-field"><label class="checkbox"><input type="checkbox" name="featured"> Destacar na página inicial</label></div>
    </div><div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Cancelar</button><button class="a-btn a-btn-gold" type="submit">Guardar alterações</button></div></form>
  </div></div>
  <div class="admin-toast" id="admin-toast" role="status"></div>
  <script src="../firebase/config.js"></script>
  <script src="../js/firebase.js"></script>
  <script src="../js/store.js" defer></script>
  <script src="../js/dynamic-content.js" defer></script>
  <script src="../js/admin.js" defer></script>
</body>
</html>`;
}

function aBadge(status) {
  const map = { 'A realizar': 'blue', 'Publicado': 'green', 'Realizado': 'green', 'Aprovado': 'green', 'Ativo': 'green',
    'Pendente': 'gold', 'Em curso': 'gold', 'Rascunho': 'gray', 'Cancelado': 'red', 'Rejeitado': 'red', 'Arquivado': 'gray' };
  return '<span class="a-badge ' + (map[status] || 'gray') + '">' + e(status) + '</span>';
}

function aTable(headers, rows) {
  return '<div class="table-wrap"><table class="a-table"><thead><tr>' + headers.map(function (h) { return '<th>' + e(h) + '</th>'; }).join('') +
    '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
}

function aStats(items) {
  return '<div class="a-stats">' + items.map(function (s) {
    var inner = '<div class="stat-top"><span class="label">' + e(s.label) + '</span><span class="stat-ico">' + s.icon + '</span></div>' +
      '<div class="value">' + e(s.value) + '</div><div class="trend' + (s.down ? ' down' : '') + '">' + e(s.trend) + '</div>' +
      (s.link ? '<span class="stat-link">Abrir →</span>' : '');
    return s.link
      ? '<a class="a-stat a-stat-link" href="' + a(s.link) + '">' + inner + '</a>'
      : '<div class="a-stat">' + inner + '</div>';
  }).join('') + '</div>';
}

function aModal(id, title, fields, storeKey) {
  return `<div class="a-modal" id="${id}"><div class="a-modal-box">
    <div class="a-modal-head"><h3>${e(title)}</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form${storeKey ? ' data-store-key="' + a(storeKey) + '"' : ''}><div class="a-modal-body">${fields.map(function (f) {
      return '<div class="a-field"><label>' + e(f[0]) + '</label><input name="' + a(f[3] || f[0]) + '" type="' + (f[2] || 'text') + '" placeholder="' + a(f[1]) + '"></div>';
    }).join('')}</div>
    <div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Cancelar</button><button class="a-btn a-btn-gold" type="submit">Guardar</button></div>
    </form></div></div>`;
}

function aUserModal(mode) {
  var editing = mode === 'edit';
  var modalId = editing ? 'modal-user-edit' : 'modal-user';
  var title = editing ? 'Editar responsável' : 'Cadastrar responsável';
  var submit = editing ? 'Guardar alterações' : 'Cadastrar responsável';
  var pageOptions = adminNav.map(function (g) {
    return '<div class="a-page-group"><strong>' + e(g.group) + '</strong><div class="a-page-grid">' +
      g.items.map(function (it) {
        return '<label class="checkbox"><input type="checkbox" name="pages" value="' + a(it[3]) + '"> ' + e(it[2]) + '</label>';
      }).join('') + '</div></div>';
  }).join('');
  return `<div class="a-modal" id="${modalId}"><div class="a-modal-box" style="max-width:620px">
    <div class="a-modal-head"><h3>${title}</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form data-store-key="utilizadores" data-store-mode="${editing ? 'edit' : 'add'}"><div class="a-modal-body">
      <input type="hidden" name="role" value="responsavel">
      <div class="a-field"><label>Nome completo</label><input name="name" placeholder="Nome do responsável" required></div>
      <div class="a-field"><label>Email</label><input name="email" type="email" placeholder="responsavel@ieba.gw" required></div>
      <div class="a-field"><label>Palavra-passe</label><input name="password" type="text" placeholder="Senha de acesso" required></div>
      <div class="a-field"><label>Páginas autorizadas</label>${pageOptions}</div>
    </div><div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Cancelar</button><button class="a-btn a-btn-gold" type="submit">${submit}</button></div></form>
  </div></div>`;
}

function aPlanProgress() {
  var defaults = ['Concluído', 'Concluído', 'Em curso', 'Pendente'];
  return `<div class="a-card" id="planos" style="margin-top:1.5rem"><div class="a-card-head"><div>
    <h2>Execução dos planos anuais</h2><p>Percentagem de atividades previstas realizadas — expanda por departamento para ver cada trimestre</p>
    </div></div><div class="a-card-body">
    ${C.ministries.map(function (m, idx) {
      return `<details class="a-plan-dept" data-plan-dept="${a(m.slug)}">
        <summary><span class="a-plan-name">${e(m.name)}</span><span class="a-badge gold" data-plan-pct>50%</span></summary>
        <div class="a-plan-inner"><div class="a-progress"><span style="width:50%"></span></div>
          <div class="a-grid" style="gap:.5rem;margin-top:1rem">
          ${C.ministryDetails[m.slug].annualPlan.map(function (pl, qi) {
            var status = defaults[qi] || 'Pendente';
            return `<div class="a-plan-quarter" data-plan-quarter="${qi}" data-default-status="${a(status)}">
              <div><strong>${e(pl.period)} — ${e(pl.theme)}</strong><span class="sub">${e(pl.actions)}</span></div>
              <div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap">
                <span class="a-badge ${status === 'Concluído' ? 'green' : status === 'Em curso' ? 'gold' : 'gray'}">${e(status)}</span>
                <button class="a-btn a-btn-ghost a-btn-sm" type="button" data-plan-toggle="${a(m.slug + '_' + qi)}">Alternar</button>
              </div></div>`;
          }).join('')}
          </div>
        </div></details>`;
    }).join('')}
  </div></div>`;
}

function aPrayerModal() {
  return `<div class="a-modal" id="modal-pedido"><div class="a-modal-box">
    <div class="a-modal-head"><h3>Pedido de oração</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form data-store-key="pedidos" data-store-mode="edit"><div class="a-modal-body">
      <div class="a-field"><label>Nome</label><input name="name"></div>
      <div class="a-field"><label>Contacto</label><input name="contact"></div>
      <div class="a-field"><label>Pedido</label><textarea name="request"></textarea></div>
      <div class="a-field"><label>Estado</label><select name="status"><option>Recebido</option><option>Em acompanhamento</option><option>Concluído</option><option>Arquivado</option></select></div>
      <div class="a-field"><label class="checkbox"><input type="checkbox" name="confidential"> Confidencial</label></div>
    </div><div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Fechar</button><button class="a-btn a-btn-gold" type="submit">Guardar</button></div></form>
  </div></div>`;
}

function aContentModal(kind, mode) {
  var editing = mode === 'edit';
  var id = 'modal-' + kind + (editing ? '-edit' : '');
  var titles = { evento: 'evento', comunicado: 'comunicado', atividade: 'atividade' };
  var title = (editing ? 'Editar ' : 'Novo ') + titles[kind];
  var submit = editing ? 'Guardar alterações' : 'Publicar';
  var fields = {
    evento: [
      ['Título', 'title', 'text', 'Nome do evento'],
      ['Data', 'date', 'text', 'DD/MM/AAAA'],
      ['Horário', 'time', 'text', '10h30 – 12h30'],
      ['Local', 'location', 'text', 'Sede da IEBA'],
      ['Ministério', 'ministry', 'text', 'IEBA'],
      ['Descrição', 'description', 'textarea', 'Descrição do evento']
    ],
    comunicado: [
      ['Título', 'title', 'text', 'Título do comunicado'],
      ['Data', 'date', 'text', 'DD/MM/AAAA'],
      ['Texto', 'text', 'textarea', 'Conteúdo do comunicado']
    ],
    atividade: [
      ['Atividade', 'name', 'text', 'Nome da atividade'],
      ['Dia', 'day', 'text', 'Domingo'],
      ['Horário', 'time', 'text', '09h – 10h'],
      ['Ministério', 'ministry', 'text', 'IEBA']
    ],
    midia: [
      ['Título', 'title', 'text', 'Nome da fotografia ou vídeo'],
      ['Álbum / Evento', 'album', 'text', 'Ex.: Culto dominical'],
      ['Descrição', 'description', 'textarea', 'Legenda da mídia']
    ]
  }[kind];
  var body = fields.map(function (f) {
    if (f[2] === 'textarea') {
      return '<div class="a-field"><label>' + e(f[0]) + '</label><textarea name="' + a(f[1]) + '" placeholder="' + a(f[3]) + '" required></textarea></div>';
    }
    return '<div class="a-field"><label>' + e(f[0]) + '</label><input name="' + a(f[1]) + '" type="text" placeholder="' + a(f[3]) + '" required></div>';
  }).join('');
  var featured = kind === 'comunicado'
    ? '<div class="a-field"><label class="checkbox"><input type="checkbox" name="featured" checked> Destacar nas notícias e na página inicial</label></div>'
    : '<div class="a-field"><label class="checkbox"><input type="checkbox" name="featured"> Destacar na página inicial</label></div>';
  var key = { evento: 'eventos', comunicado: 'comunicados', atividade: 'atividades', midia: 'midia' }[kind];
  return `<div class="a-modal" id="${id}"><div class="a-modal-box" style="max-width:620px">
    <div class="a-modal-head"><h3>${title}</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form data-store-key="${key}" data-store-mode="${editing ? 'edit' : 'add'}"><div class="a-modal-body">
      ${body}${featured}
    </div><div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Cancelar</button><button class="a-btn a-btn-gold" type="submit">${submit}</button></div></form>
  </div></div>`;
}

function aComunicadoModal() {
  return `<div class="a-modal" id="modal-comunicado"><div class="a-modal-box">
    <div class="a-modal-head"><h3>Novo comunicado</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form data-store-key="comunicados"><div class="a-modal-body">
      <div class="a-field"><label>Título</label><input name="title" placeholder="Título do comunicado" required></div>
      <div class="a-field"><label>Data</label><input name="date" placeholder="Ex.: 24 de novembro de 2026"></div>
      <div class="a-field"><label>Texto</label><textarea name="text" placeholder="Conteúdo do comunicado" required></textarea></div>
      <div class="a-field"><label class="checkbox"><input type="checkbox" name="featured" checked> Destacar na página inicial e nas notícias</label></div>
    </div><div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Cancelar</button><button class="a-btn a-btn-gold" type="submit">Publicar comunicado</button></div></form>
  </div></div>`;
}

function aActions(label) {
  return '<div class="a-actions"><button class="a-btn a-btn-ghost a-btn-sm" type="button" data-generic-edit title="Editar" aria-label="Editar">✏️</button>' +
    '<button class="a-btn a-btn-primary a-btn-sm" type="button" data-toast="' + a(label) + ' publicado">Publicar</button>' +
    '<button class="a-btn a-btn-danger a-btn-sm" type="button" data-generic-remove title="Remover" aria-label="Remover">🗑</button></div>';
}

write('admin/login.html', `<!DOCTYPE html>
<html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Acesso ao painel | IEBA Admin</title><meta name="robots" content="noindex, nofollow">
<link rel="icon" href="../assets/logo/logo.jpg"><link rel="stylesheet" href="../css/admin.css"></head>
<body class="login-body">
  <section class="login-brandpanel">
    <div class="login-logo"><img src="../assets/logo/logo.jpg" alt="IEBA"><div><strong>Igreja Evangélica de Bairro D'Ajuda</strong><small>IEBA · Bissau</small></div></div>
    <div class="login-message"><h1>Bem-vindo ao painel administrativo.</h1><p>Gira os conteúdos do site, acompanhe as submissões dos ministérios e mantenha a informação da igreja atualizada.</p></div>
    <div class="login-foot">© <span id="admin-year">2026</span> IEBA · Acesso restrito a utilizadores autorizados</div>
  </section>
  <section class="login-formpanel">
    <form class="login-form" data-admin-form>
      <h2>Iniciar sessão</h2><p>Introduza as suas credenciais para continuar.</p>
      <div class="a-field"><label for="login-email">Email</label><input id="login-email" type="email" placeholder="nome@ieba.gw" required></div>
      <div class="a-field"><label for="login-pass">Palavra-passe</label><input id="login-pass" type="password" placeholder="••••••••" required></div>
      <button class="a-btn a-btn-primary" type="submit">Entrar no painel</button>
      <div class="login-links"><a href="#" data-toast="Ligação de recuperação enviada">Esqueci a palavra-passe</a><a href="../index.html">← Voltar ao site</a></div>
      <p class="login-note">A autenticação é protegida por verificação em dois passos e regras de acesso por perfil.</p>
    </form>
  </section>
  <div class="a-modal" id="modal-generic"><div class="a-modal-box">
    <div class="a-modal-head"><h3>Editar registo</h3><button class="a-modal-close" type="button" aria-label="Fechar">×</button></div>
    <form data-admin-form><div class="a-modal-body">
      <div class="a-field"><label>Título / Nome</label><input name="title" required></div>
      <div class="a-field"><label>Descrição</label><textarea name="description"></textarea></div>
      <div class="a-field"><label>Estado</label><input name="status" value="Publicado"></div>
      <div class="a-field"><label class="checkbox"><input type="checkbox" name="featured"> Destacar na página inicial</label></div>
    </div><div class="a-modal-foot"><button class="a-btn a-btn-ghost" type="button" data-modal-cancel>Cancelar</button><button class="a-btn a-btn-gold" type="submit">Guardar alterações</button></div></form>
  </div></div>
  <div class="admin-toast" id="admin-toast" role="status"></div>
  <script src="../firebase/config.js"></script>
  <script src="../js/firebase.js"></script>
  <script src="../js/store.js" defer></script>
  <script src="../js/dynamic-content.js" defer></script>
  <script src="../js/admin.js" defer></script>
</body></html>`);

const upcoming = C.events.filter(function (x) { return x.status === 'A realizar'; });

const adminBodies = {
  dashboard: () => `
    ${aStats([
      { label: 'Eventos ativos', value: String(upcoming.length).padStart(2,'0'), trend: '4 por realizar', icon: '📅', link: 'eventos.html' },
      { label: 'Pedidos de oração', value: '12', trend: '3 novos hoje', icon: '🙏', link: 'pedidos-oracao.html' },
      { label: 'Mensagens', value: '05', trend: '2 por responder', icon: '✉', link: 'contactos.html' },
      { label: 'Peças de mídia', value: '128', trend: '+12 este mês', icon: '📷', link: 'midia.html' }
    ])}
    <div class="a-grid a-grid-2">
      <div class="a-card"><div class="a-card-head"><div><h2>Nível de realização</h2><p>Execução global e por departamento dos planos anuais</p></div></div>
        <div class="a-card-body">
          <div class="a-overview">
            <div class="a-ring" id="plan-overall-ring"><div class="a-ring-inner"><strong id="plan-overall">50%</strong><span>Realização geral</span></div></div>
            <div class="a-overview-list">
              ${C.ministries.slice(0, 4).map(function (m) {
                return '<div class="a-dept-line" data-dept-bar="' + a(m.slug) + '"><span>' + e(m.short) + '</span><div class="a-progress"><span style="width:50%"></span></div><strong data-dept-pct>50%</strong></div>';
              }).join('')}
              <a class="a-btn a-btn-ghost a-btn-sm" href="#planos" style="margin-top:.5rem">Ver todos os departamentos ↓</a>
            </div>
          </div>
        </div></div>
      <div class="a-card"><div class="a-card-head"><div><h2>Ações rápidas</h2><p>Atalhos mais utilizados</p></div></div>
        <div class="a-card-body"><div class="a-actions" style="gap:.7rem">
          <button class="a-btn a-btn-gold" data-modal-open="modal-evento">+ Novo evento</button>
          <button class="a-btn a-btn-primary" data-toast="Aprovações abertas">Aprovar conteúdos</button>
          <a class="a-btn a-btn-ghost" href="midia.html">Adicionar mídia</a>
          <a class="a-btn a-btn-ghost" href="utilizadores.html">Gerir equipa</a>
        </div>
        <hr style="border:0;border-top:1px solid var(--a-line);margin:1.5rem 0">
        <h3 style="font-size:.9rem;margin:0 0 .8rem">Aprovações pendentes</h3>
        <p style="font-size:.82rem;color:var(--a-muted)">3 submissões de ministérios aguardam revisão do administrador geral.</p>
        <a class="a-btn a-btn-ghost a-btn-sm" href="pedidos-oracao.html">Ver pedidos</a>
      </div></div>
    </div>
    <div class="a-card" style="margin-top:1.5rem"><div class="a-card-head"><div><h2>Próximos eventos</h2><p>Ações programadas nos planos da igreja</p></div><a class="a-btn a-btn-ghost a-btn-sm" href="eventos.html">Ver todos</a></div>
      ${aTable(['Evento','Data','Ministério','Estado','Ações'], upcoming.slice(0,5).map(function (ev) {
        return '<tr data-search-row><td><span class="strong">' + e(ev.title) + '</span><span class="sub">' + e(ev.location) + '</span></td><td>' + e(ev.date) + '</td><td>' + e(ev.ministry) + '</td><td>' + aBadge(ev.status) + '</td><td>' + aActions('Evento') + '</td></tr>';
      }))}
    </div>${aPlanProgress()}${aContentModal('evento')}${aContentModal('evento','edit')}`,

  eventos: () => `
    ${aStats([{label:'Total de eventos',value:String(C.events.length).padStart(2,'0'),trend:'Todos os estados',icon:'📅'},{label:'A realizar',value:String(upcoming.length).padStart(2,'0'),trend:'Próximos',icon:'⏳'},{label:'Em destaque',value:String(C.events.filter(x=>x.featured).length).padStart(2,'0'),trend:'Página inicial',icon:'⭐'},{label:'Realizados',value:String(C.events.filter(x=>x.status==='Realizado').length).padStart(2,'0'),trend:'Histórico',icon:'✓'}])}
    <div class="a-card"><div class="a-card-head"><div><h2>Gestão de eventos</h2><p>Aprove as publicações e escolha os destaques da página inicial</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-evento">+ Novo evento</button></div>
      <div class="a-card-body"><div class="a-filterbar"><button class="active" data-admin-filter="all">Todos</button><button data-admin-filter="A realizar">A realizar</button><button data-admin-filter="Realizado">Realizado</button><button data-admin-filter="Cancelado">Cancelado</button><button data-admin-filter="Arquivado">Arquivado</button></div>
      ${aTable(['Evento','Realização','Publicação','Ministério','Estado','Ações'], C.events.map(function (ev) {
        return '<tr data-search-row data-status="' + a(ev.status) + '"><td><span class="strong">' + e(ev.title) + '</span><span class="sub">' + e(ev.location) + '</span></td><td>' + e(ev.date) + '</td><td>' + e(ev.published || '—') + '</td><td>' + e(ev.ministry) + '</td><td>' + aBadge(ev.status) + '</td><td>' + aActions('Evento') + '</td></tr>';
      }))}</div><div data-store-render-admin="eventos"></div></div>${aContentModal('evento')}${aContentModal('evento','edit')}`,

  cultos: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Cultos e horários</h2><p>Programação regular de segunda a domingo · Fuso horário Africa/Bissau</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-culto">+ Novo horário</button></div>
      <div class="a-card-body">${aTable(['Dia','Horário','Atividade','Ministério','Estado','Ações'], C.services.map(function (s) {
        return '<tr data-search-row><td><span class="strong">' + e(s.day) + '</span></td><td>' + e(s.time) + '</td><td>' + e(s.name) + '<span class="sub">' + e(s.description) + '</span></td><td>' + e(s.ministry) + '</td><td>' + aBadge('Ativo') + '</td><td>' + aActions('Horário') + '</td></tr>';
      }))}</div></div>${aModal('modal-culto','Novo horário',[['Atividade','Nome do culto'],['Dia','Domingo'],['Horário','09h – 10h'],['Local','Sede da IEBA']])}`,

  ministerios: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Ministérios</h2><p>Cada ministério mantém conteúdos independentes e submete alterações para aprovação</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-ministerio">+ Novo ministério</button></div>
      <div class="a-card-body">${aTable(['Ministério','Identidade','Atividades','Responsável','Estado','Ações'], C.ministries.map(function (m) {
        return '<tr data-search-row><td><span class="a-avatar-sm">' + e(m.short.charAt(0)) + '</span><span class="strong">' + e(m.name) + '</span></td><td>' + e(m.tagline) + '</td><td>' + m.activities.length + '</td><td>A definir</td><td>' + aBadge('Ativo') + '</td><td>' + aActions('Ministério') + '</td></tr>';
      }))}</div></div>${aModal('modal-ministerio','Novo ministério',[['Nome','Nome do ministério'],['Identidade','Frase curta'],['Email','contacto@ieba.gw']])}`,

  atividades: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Atividades semanais</h2><p>Encontros regulares de segunda a domingo — distintos dos eventos programados</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-atividade">+ Nova atividade</button></div>
      <div class="a-card-body">${aTable(['Dia','Atividade','Horário','Ministério','Estado','Ações'], C.services.map(function (s) {
        return '<tr data-search-row><td><span class="strong">' + e(s.day) + '</span></td><td>' + e(s.name) + '</td><td>' + e(s.time) + '</td><td>' + e(s.ministry) + '</td><td>' + aBadge('Ativo') + '</td><td>' + aActions('Atividade') + '</td></tr>';
      }))}</div><div data-store-render-admin="atividades"></div></div>${aContentModal('atividade')}${aContentModal('atividade','edit')}`,

  midia: () => `
    ${aStats([{label:'Fotografias',value:'128',trend:'+12 este mês',icon:'📷'},{label:'Álbuns',value:'14',trend:'Por evento',icon:'🗂️'},{label:'Vídeos',value:'23',trend:'YouTube',icon:'▶'},{label:'Armazenamento',value:'62%',trend:'Quota do Cloudinary',icon:'☁️'}])}
    <div class="a-card"><div class="a-card-head"><div><h2>Biblioteca de mídia</h2><p>Fotografias e vídeos organizados por álbum — edite, oculte ou remova cada item</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-midia">+ Adicionar mídia</button></div>
      <div class="a-card-body"><div class="grid grid-4">${['Culto dominical','Juventude','Sal da Terra','Missões','Louvor','Crianças','Senhoras','Comunidade'].map(function (t, i) {
        return '<article class="card"><div class="thumb ' + ['','thumb-blue','thumb-gold','thumb-teal','thumb-plum'][i%5] + '"><span class="thumb-label" style="font-size:1rem">' + e(t) + '</span></div><div class="card-body" style="padding:1rem"><span class="strong">' + e(t) + '</span><span class="sub" style="display:block;color:var(--a-muted);font-size:.74rem">' + (i+3) + ' ficheiros</span></div></article>';
      }).join('')}</div>
      <div data-store-render-admin="midia"></div>
      </div></div>${aContentModal('midia')}${aContentModal('midia','edit')}`,

  projetos: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Projetos sociais</h2><p>Acompanhe objetivos, beneficiários e necessidades de apoio</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-projeto">+ Novo projeto</button></div>
      <div class="a-card-body">${aTable(['Projeto','Beneficiários',' Estado','Progresso','Ações'], C.projects.map(function (p) {
        var pct = p.status === 'Em curso' ? 62 : 18;
        return '<tr data-search-row><td><span class="strong">' + e(p.name) + '</span><span class="sub">' + e(p.needs) + '</span></td><td>' + e(p.beneficiaries) + '</td><td>' + aBadge(p.status) + '</td><td><div class="a-progress" style="max-width:120px"><span style="width:' + pct + '%"></span></div><span class="sub">' + pct + '%</span></td><td>' + aActions('Projeto') + '</td></tr>';
      }))}</div></div>${aModal('modal-projeto','Novo projeto',[['Nome','Nome do projeto'],['Beneficiários','Quem beneficia'],['Objetivo','O que se pretende']])}`,

  notificacoes: () => `
    ${aStats([{label:'Subscritores',value:'—',trend:'Cadastros ativos',icon:'👥'},{label:'Notificações enviadas',value:'—',trend:'Registo no sistema',icon:'🔔'},{label:'Preferência email',value:'—',trend:'Canal principal',icon:'✉'},{label:'Lembretes',value:'—',trend:'Atividades',icon:'⏰'}])}
    <div class="a-grid a-grid-2">
      <div class="a-card"><div class="a-card-head"><div><h2>Enviar notificação</h2><p>Novidades, eventos ou lembretes para os subscritores</p></div></div>
        <div class="a-card-body">
          <form data-admin-form data-store-key="notificacoes"><div class="a-field"><label>Título</label><input name="title" placeholder="Título da notificação" required></div>
            <div class="a-field"><label>Mensagem</label><textarea name="message" placeholder="Conteúdo da mensagem" required></textarea></div>
            <div class="a-field"><label>Tema</label><select name="topic"><option value="novidades">Novidades</option><option value="eventos">Eventos</option><option value="lembretes">Lembretes</option></select></div>
            <button class="a-btn a-btn-gold" type="submit">Registar e enviar</button></form>
        </div></div>
      <div class="a-card"><div class="a-card-head"><div><h2>Subscritores</h2><p>Quem recebe novidades e lembretes</p></div></div>
        <div class="a-card-body"><div data-store-render-admin="subscritores"></div></div></div>
    </div>`,

  comunicados: () => `
    ${aStats([{label:'Comunicados publicados',value:String(C.news.length).padStart(2,'0'),trend:'No site',icon:'📢'},{label:'Em destaque',value:String(C.news.filter(function(n){return n.active;}).length).padStart(2,'0'),trend:'Carrossel da inicial',icon:'⭐'},{label:'Publicados no mês',value:'04',trend:'Atualizado',icon:'📰'},{label:'Aprovações',value:'02',trend:'Pendentes',icon:'⏳'}])}
    <div class="a-card"><div class="a-card-head"><div><h2>Comunicados e notícias</h2><p>Publique comunicados e escolha os que devem aparecer em destaque na página inicial</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-comunicado">+ Novo comunicado</button></div>
      <div class="a-card-body">
      ${aTable(['Título','Origem','Data','Destaque','Estado','Ações'], C.news.map(function (n) {
        return '<tr data-search-row><td><span class="strong">' + e(n.title) + '</span><span class="sub">' + e(n.text.slice(0, 70)) + '...</span></td><td>' + e(n.source) + '</td><td>' + e(n.date) + '</td><td>' + (n.active ? aBadge('Publicado') : aBadge('Rascunho')) + '</td><td>' + aBadge(n.active ? 'Publicado' : 'Pendente') + '</td><td>' + aActions('Comunicado') + '</td></tr>';
      }))}
      <div data-store-render-admin-comunicados></div>
      </div></div>${aContentModal('comunicado')}${aContentModal('comunicado','edit')}`,

  pedidos: () => `
    ${aStats([{label:'Pedidos recebidos',value:'12',trend:'Hoje',icon:'🙏'},{label:'Em acompanhamento',value:'05',trend:'Ministério de Oração',icon:'⏳'},{label:'Concluídos',value:'38',trend:'Este mês',icon:'✓'},{label:'Confidenciais',value:'09',trend:'Acesso restrito',icon:'🔒'}])}
    <div class="a-card"><div class="a-card-head"><div><h2>Pedidos de oração</h2><p>Acesso restrito ao administrador geral e ao Ministério de Oração</p></div></div>
      <div class="a-card-body"><div class="a-filterbar"><button class="active" data-admin-filter="all">Todos</button><button data-admin-filter="Recebido">Recebido</button><button data-admin-filter="Em acompanhamento">Em acompanhamento</button><button data-admin-filter="Concluído">Concluído</button></div>
      ${aTable(['Ref.','Nome','Pedido','Estado','Privacidade','Ações'], [
        ['PR-1042','Ana C.','Oração pela família','Recebido','Confidencial'],
        ['PR-1041','—','Oração pelo trabalho','Em acompanhamento','Anónimo'],
        ['PR-1040','João M.','Saúde','Concluído','Identificado'],
        ['PR-1039','—','Culto de domingo','Recebido','Anónimo'],
        ['PR-1038','Maria S.','Estudos','Em acompanhamento','Confidencial']
      ].map(function (r) {
        return '<tr data-search-row data-status="' + a(r[3]) + '"><td><span class="strong">' + e(r[0]) + '</span></td><td>' + e(r[1]) + '</td><td>' + e(r[2]) + '</td><td>' + aBadge(r[3]) + '</td><td>' + aBadge(r[4] === 'Confidencial' ? 'Pendente' : r[4]) + '</td><td><span class="a-badge gray">Exemplo</span></td></tr>';
      }))}</div><div data-store-render-admin="pedidos"></div></div>${aPrayerModal()}`,

  contactos: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Mensagens recebidas</h2><p>Formulário de contacto do site institucional</p></div></div>
      <div class="a-card-body">${aTable(['Remetente','Assunto','Mensagem','Data','Estado','Ações'], [
        ['Joaquim Correia','Agropecuária','Informações sobre as aulas','Hoje','Pendente'],
        ['Visitante','Culto','Horário do culto de domingo','Ontem','Respondido'],
        ['Ana Costa','Missões','Apoio aos campos','12/11','Pendente'],
        ['Carlos M.','Pedido de contacto','Pedido de visita','10/11','Respondido']
      ].map(function (r) {
        return '<tr data-search-row data-status="' + a(r[4]) + '"><td><span class="a-avatar-sm">' + e(r[0].charAt(0)) + '</span><span class="strong">' + e(r[0]) + '</span></td><td>' + e(r[1]) + '</td><td>' + e(r[2]) + '</td><td>' + e(r[3]) + '</td><td>' + aBadge(r[4]) + '</td><td><button class="a-btn a-btn-ghost a-btn-sm" data-toast="Mensagem aberta">Responder</button></td></tr>';
      }))}</div></div>`,

  doacoes: () => `
    ${aStats([{label:'Contribuições no mês',value:'48',trend:'+8 vs. mês anterior',icon:'💛'},{label:'Total arrecadado',value:'1,2M',trend:'FCFA',icon:'💰'},{label:'Projetos apoiados',value:'03',trend:'Em curso',icon:'🤝'},{label:'Doações online',value:'12',trend:'Webhook confirmado',icon:'🌐'}])}
    <div class="a-card"><div class="a-card-head"><div><h2>Registo de contribuições</h2><p>Modalidades tradicional e online — confirmação autenticada pelo prestador</p></div></div>
      <div class="a-card-body">${aTable(['Referência','Nome','Modalidade','Finalidade','Valor','Estado'], [
        ['D-2026-018','Anónimo','Online','Missões','20 000 FCFA','Confirmado'],
        ['D-2026-017','Família S.','Tradicional','Sustentação','50 000 FCFA','Confirmado'],
        ['D-2026-016','Anónimo','Online','Projetos sociais','10 000 FCFA','Pendente'],
        ['D-2026-015','Grupo Jovem','Tradicional','Louvor','35 000 FCFA','Confirmado']
      ].map(function (r) {
        return '<tr data-search-row><td><span class="strong">' + e(r[0]) + '</span></td><td>' + e(r[1]) + '</td><td>' + e(r[2]) + '</td><td>' + e(r[3]) + '</td><td>' + e(r[4]) + '</td><td>' + aBadge(r[5] === 'Confirmado' ? 'Publicado' : 'Pendente') + '</td></tr>';
      }))}</div></div>`,

  utilizadores: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Utilizadores e permissões</h2><p>Perfis: administrador geral e responsável de ministério</p></div><button class="a-btn a-btn-gold" data-modal-open="modal-user">+ Convidar utilizador</button></div>
      <div class="a-card-body">${aTable(['Nome','Email','Perfil','Âmbito','Estado','Ações'], [
        ['Administrador Geral','admin@ieba.gw','Administrador geral','Todo o site','Ativo'],
        ['Responsável Juventude',S.emailYouth,'Responsável de ministério','Juventude','Ativo'],
        ['Responsável Sal da Terra',S.emailSal,'Responsável de ministério','Sal da Terra','Ativo'],
        ['Responsável Missões','missoes@ieba.gw','Responsável de ministério','Missões','Pendente']
      ].map(function (r) {
        return '<tr data-search-row><td><span class="a-avatar-sm">' + e(r[0].charAt(0)) + '</span><span class="strong">' + e(r[0]) + '</span></td><td>' + e(r[1]) + '</td><td>' + e(r[2]) + '</td><td>' + e(r[3]) + '</td><td>' + aBadge(r[4]) + '</td><td>' + aActions('Utilizador') + '</td></tr>';
      }))}</div><div data-store-render-admin="utilizadores"></div></div>${aUserModal()}${aUserModal('edit')}`,

  auditoria: () => `
    <div class="a-card"><div class="a-card-head"><div><h2>Registo de auditoria</h2><p>Ações administrativas relevantes, sem conteúdos sensíveis</p></div></div>
      <div class="a-card-body">${aTable(['Data','Utilizador','Ação','Recurso','Resultado'], [
        ['24/11 09:42','Admin Geral','Aprovou evento','Culto Especial de Evangelização','Sucesso'],
        ['24/11 08:15','Admin Geral','Removeu destaque','Notícia antiga','Sucesso'],
        ['23/11 17:30','Resp. Juventude','Submeteu atividade','Encontro de juventude','Pendente'],
        ['23/11 14:02','Admin Geral','Alterou permissões','Utilizador #18','Sucesso'],
        ['22/11 11:20','Admin Geral','Publicou página','Plano Geral da IEBA','Sucesso']
      ].map(function (r) {
        return '<tr data-search-row><td>' + e(r[0]) + '</td><td>' + e(r[1]) + '</td><td>' + e(r[2]) + '</td><td>' + e(r[3]) + '</td><td>' + aBadge(r[4] === 'Sucesso' ? 'Publicado' : 'Pendente') + '</td></tr>';
      }))}</div></div>`,

  configuracoes: () => `
    <div class="a-grid a-grid-2">
      <div class="a-card"><div class="a-card-head"><h2>Identidade institucional</h2></div><div class="a-card-body">
        <div class="a-field"><label>Nome da igreja</label><input value="${a(S.name)}"></div>
        <div class="a-field"><label>Morada</label><input value="${a(S.address)}, ${a(S.city)}"></div>
        <div class="a-field"><label>Telefone</label><input value="${a(S.phone)}"></div>
        <div class="a-field"><label>Fuso horário</label><input value="${a(S.timezone)}"></div>
        <button class="a-btn a-btn-gold" data-toast="Configurações guardadas">Guardar alterações</button>
      </div></div>
      <div class="a-card"><div class="a-card-head"><h2>Segurança e integrações</h2></div><div class="a-card-body">
        <div class="a-field"><label>Autenticação em dois passos</label><input value="Obrigatória para administradores" readonly></div>
        <div class="a-field"><label>App Check</label><input value="Ativo" readonly></div>
        <div class="a-field"><label>Cloudinary</label><input value="Configurado" readonly></div>
        <div class="a-field"><label>Prestador de pagamentos</label><input value="Por configurar" readonly></div>
        <button class="a-btn a-btn-primary" data-toast="Estado das integrações verificado">Verificar estado</button>
      </div></div>
    </div>`
};

const adminMeta = {
  dashboard: ['Painel geral','Visão geral da atividade da IEBA'],
  eventos: ['Eventos','Ações programadas nos planos da igreja'],
  cultos: ['Cultos e horários','Programação regular de segunda a domingo'],
  ministerios: ['Ministérios','Estrutura e responsáveis dos ministérios'],
  atividades: ['Atividades','Encontros regulares da igreja'],
  midia: ['Mídia','Fotografias, álbuns e vídeos'],
  projetos: ['Projetos sociais','Projetos e necessidades de apoio'],
  notificacoes: ['Notificações','Subscritores e envio de alertas'],
  comunicados: ['Comunicados','Publicações e destaques do site'],
  pedidos: ['Pedidos de oração','Área confidencial do Ministério de Oração'],
  contactos: ['Mensagens','Contactos recebidos através do site'],
  doacoes: ['Doações','Contribuições e confirmações'],
  utilizadores: ['Utilizadores','Perfis, permissões e acessos'],
  auditoria: ['Auditoria','Histórico de ações administrativas'],
  configuracoes: ['Configurações','Identidade, segurança e integrações']
};

const adminFileNames = { projetos: 'projetos-sociais', pedidos: 'pedidos-oracao' };
Object.keys(adminBodies).forEach(function (key) {
  write('admin/' + (adminFileNames[key] || key) + '.html', adminPage(key, adminMeta[key][0], adminMeta[key][1], adminBodies[key]()));
});

const logoSource = path.join(ROOT, 'logo.jpg');
const logoDest = path.join(ROOT, 'assets', 'logo', 'logo.jpg');
if (fs.existsSync(logoSource) && !fs.existsSync(logoDest)) { fs.copyFileSync(logoSource, logoDest); }

console.log('Concluído.');
