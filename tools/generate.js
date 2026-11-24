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
function write(rel, html) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
  console.log('  . ' + rel);
}

function linkItem(href, label, key, active) {
  return '<a href="' + href + '"' + (key === active ? ' class="active" aria-current="page"' : '') + '>' + e(label) + '</a>';
}

function navHTML(active) {
  const ministryLinks = C.ministries.map(function (m) {
    return linkItem(m.slug + '.html', m.short, m.slug, active);
  }).join('');
  const fieldLinks = C.missionFields.map(function (f) {
    return linkItem('campo-' + f.slug + '.html', f.name, 'campo-' + f.slug, active);
  }).join('');
  return `
  <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">☰</button>
  <nav aria-label="Navegação principal">
    <ul class="main-nav" id="main-nav">
      ${linkItem('index.html', 'Início', 'inicio', active)}
      ${linkItem('sobre.html', 'Sobre', 'sobre', active)}
      ${linkItem('eventos.html', 'Eventos', 'eventos', active)}
      ${linkItem('atividades.html', 'Atividades', 'atividades', active)}
      <li class="has-dropdown">
        ${linkItem('jovens.html', 'Ministérios', 'ministerios', active)} <span class="caret" aria-hidden="true">▾</span>
        <ul class="dropdown-menu">
          <li class="dd-title">Nossos ministérios</li>
          ${ministryLinks}
        </ul>
      </li>
      <li class="has-dropdown">
        ${linkItem('campos-missionarios.html', 'Campos Missionários', 'campos', active)} <span class="caret" aria-hidden="true">▾</span>
        <ul class="dropdown-menu">
          <li class="dd-title">Igrejas filiais e campos</li>
          ${fieldLinks}
        </ul>
      </li>
      ${linkItem('projetos-sociais.html', 'Projetos', 'projetos', active)}
      ${linkItem('midia.html', 'Mídia', 'midia', active)}
      ${linkItem('pedidos-oracao.html', 'Oração', 'pedidos', active)}
      ${linkItem('doacoes.html', 'Doações', 'doacoes', active)}
      ${linkItem('contactos.html', 'Contactos', 'contactos', active)}
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
          <p class="footer-note">Site em construção — conteúdos provisórios a confirmar pela igreja.</p>
        </div>
        <div>
          <h4>Navegação</h4>
          <ul>
            <li><a href="sobre.html">Sobre a IEBA</a></li>
            <li><a href="eventos.html">Eventos</a></li>
            <li><a href="atividades.html">Atividades</a></li>
            <li><a href="projetos-sociais.html">Projetos sociais</a></li>
            <li><a href="midia.html">Mídia</a></li>
            <li><a href="campos-missionarios.html">Campos missionários</a></li>
          </ul>
        </div>
        <div>
          <h4>Ministérios</h4>
          <ul>
            ${C.ministries.map(function (m) { return '<li><a href="' + m.slug + '.html">' + e(m.short) + '</a></li>'; }).join('')}
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul class="footer-contact">
            <li><span class="ico">📍</span><span>${e(S.address)}, ${e(S.city)}, ${e(S.country)}</span></li>
            <li><span class="ico">☎</span><a href="${a(S.phoneLink)}">${e(S.phone)}</a></li>
            <li><span class="ico">✉</span><span>${e(S.email)}</span></li>
          </ul>
          <h4 style="margin-top:1.25rem">Redes sociais</h4>
          <ul>${socialHTML()}</ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year">2026</span> ${e(S.name)}. Todos os direitos reservados.</span>
        <span>Conteúdos públicos sujeitos a aprovação da administração da IEBA.</span>
      </div>
    </div>
  </footer>`;
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
  <link rel="stylesheet" href="css/responsive.css">
  ${jsonld}
</head>
<body>
  <div class="provisional-banner"><strong>Aviso:</strong> versão inicial do site. Alguns conteúdos são provisórios e serão confirmados pela igreja.</div>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="index.html" aria-label="${a(S.name)} — início">
        <img src="assets/logo/logo.jpg" alt="Logótipo provisório da IEBA">
        <span class="brand-text"><span class="brand-name">${e(S.name)}</span><span class="brand-sub">${e(S.shortName)} · Bissau</span></span>
      </a>
      ${navHTML(o.active)}
    </div>
  </header>
  <main id="conteudo">
    ${o.content}
  </main>
  ${o.noFooter ? '' : footerHTML()}
  <button class="back-top" id="back-top" type="button" aria-label="Voltar ao topo">↑</button>
  ${o.lightbox ? `<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Visualizador de imagem">
    <button class="lightbox-close" id="lightbox-close" type="button" aria-label="Fechar">×</button>
    <div class="lightbox-inner"><div class="lightbox-visual" id="lightbox-visual"></div><h3 id="lightbox-title" style="color:#fff;margin-top:1rem"></h3></div>
  </div>` : ''}
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

function pageHero(title, subtitle, eyebrow, variant) {
  return '<section class="page-hero ' + (variant || '') + '"><div class="wrap"><span class="eyebrow">' + e(eyebrow || 'IEBA') + '</span><h1>' + e(title) + '</h1><p>' + e(subtitle) + '</p></div></section>';
}

function sectionHead(title, sub, eyebrow) {
  return '<div class="section-head">' + (eyebrow ? '<span class="eyebrow">' + e(eyebrow) + '</span>' : '') + '<h2>' + e(title) + '</h2>' + (sub ? '<p>' + e(sub) + '</p>' : '') + '</div>';
}

function eventCard(ev) {
  return `<article class="card">
    <div class="thumb ${ev.thumb || ''}"><span class="thumb-label">${e(ev.ministry)}</span><span class="thumb-icon">✦</span></div>
    <div class="card-body">
      <span class="badge badge-${ev.status === 'Planeado' ? 'warn' : 'green'}">${e(ev.status)}</span>
      <h3 class="card-title" style="margin-top:0.75rem">${e(ev.title)}</h3>
      <p style="font-size:0.9rem;color:var(--muted)">${e(ev.description)}</p>
      <p style="font-size:0.85rem;margin-bottom:0"><strong>📅</strong> ${e(ev.date)} · ${e(ev.time)}<br><strong>📍</strong> ${e(ev.location)}</p>
    </div>
  </article>`;
}

function serviceTable() {
  return `<div class="table-wrap"><table class="schedule-table">
    <thead><tr><th>Dia</th><th>Hora</th><th>Atividade</th><th>Ministério</th><th>Descrição</th></tr></thead>
    <tbody>${C.services.map(function (s) {
      return '<tr><td class="day">' + e(s.day) + '</td><td class="time">' + e(s.time) + '</td><td>' + e(s.name) + '</td><td>' + e(s.ministry) + '</td><td>' + e(s.description) + '</td></tr>';
    }).join('')}</tbody>
  </table></div>`;
}

function ministryCard(m) {
  return `<article class="card">
    <div class="thumb ${m.colorTheme || ''}"><span class="thumb-label">${e(m.short)}</span><span class="thumb-icon">✦</span></div>
    <div class="card-body"><h3 class="card-title">${e(m.name)}</h3><p style="font-size:0.9rem;color:var(--muted)">${e(m.tagline)}</p></div>
    <div class="card-footer"><a class="card-link" href="${m.slug}.html">Conhecer o ministério →</a></div>
  </article>`;
}

function ministryPage(m, variant, theme) {
  const related = C.events.filter(function (x) { return x.ministry === m.short || x.ministry === m.name; }).slice(0, 4);
  const content = `
    ${crumb([['Início', 'index.html'], ['Ministérios', 'jovens.html'], [m.short]])}
    ${pageHero(m.name, m.tagline, 'Ministério IEBA', variant)}
    <section class="section">
      <div class="wrap">
        <div class="grid grid-2" style="align-items:start">
          <div>
            <span class="eyebrow">Apresentação</span>
            <h2>Somos ${e(m.name)}</h2>
            <p class="lead">${e(m.description)}</p>
            ${m.verse ? '<blockquote class="quote">' + e(m.verse) + '</blockquote>' : ''}
            <div class="note note-info"><strong>Nota:</strong> ${e(m.note)}</div>
          </div>
          <div>
            <div class="card">
              <div class="card-body">
                <h3>Informações do ministério</h3>
                <ul class="contact-list">
                  <li><span class="ico">✉</span><div><strong>Contacto</strong><span>${e(m.email || 'A confirmar')}</span></div></li>
                  ${m.facebook ? '<li><span class="ico">f</span><div><strong>Rede social</strong><span>' + e(m.facebook) + '</span></div></li>' : ''}
                  <li><span class="ico">◷</span><div><strong>Fuso horário</strong><span>${e(S.timezone)}</span></div></li>
                </ul>
                ${m.link ? '<a class="btn btn-blue btn-block" href="' + m.link + '">Enviar pedido de oração</a>' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="wrap">
        ${sectionHead('Objetivos e atividades', 'O que fazemos e para que servimos')}
        <div class="grid grid-2">
          <div class="card"><div class="card-body"><h3>Objetivos</h3><ul class="list-check">${m.objectives.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul></div></div>
          <div class="card"><div class="card-body"><h3>Atividades</h3><ul class="list-check">${m.activities.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('')}</ul></div></div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        ${sectionHead('Programação', 'Horários regulares deste ministério')}
        <div class="table-wrap"><table class="schedule-table"><thead><tr><th>Quando</th><th>Atividade</th></tr></thead><tbody>
          ${m.schedule.map(function (x) { var p = x.split(': '); return '<tr><td class="day">' + e(p[0]) + '</td><td>' + e(p.length > 1 ? p.slice(1).join(': ') : x) + '</td></tr>'; }).join('')}
        </tbody></table></div>
      </div>
    </section>
    ${related.length ? `<section class="section section-alt"><div class="wrap">${sectionHead('Atividades relacionadas', 'Eventos ligados a este ministério')}<div class="grid grid-auto">${related.map(eventCard).join('')}</div></div></section>` : ''}
    <section class="section"><div class="wrap"><div class="cta-band">
      <div><h2>Quer saber mais?</h2><p>Fale connosco ou envie um pedido de oração. A sua mensagem será encaminhada para a administração.</p></div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap"><a class="btn btn-primary" href="contactos.html">Contactar</a><a class="btn btn-outline" href="pedidos-oracao.html">Pedido de oração</a></div>
    </div></div></section>`;
  return layout({ title: m.name, desc: m.tagline, active: m.slug, content: content });
}

function fieldPage(f) {
  const content = `
    ${crumb([['Início', 'index.html'], ['Campos Missionários', 'campos-missionarios.html'], [f.name]])}
    ${pageHero(f.name, f.tagline + ' da IEBA. Informações, atividades e necessidades do campo.', 'Igrejas filiais e campos missionários', 'variant-teal')}
    <section class="section"><div class="wrap">
      <div class="grid grid-2" style="align-items:start">
        <div>
          <span class="eyebrow">Apresentação</span><h2>O trabalho em ${e(f.name)}</h2>
          <p class="lead">${e(f.description)}</p>
          <div class="note note-info"><strong>Conteúdo a confirmar:</strong> história, data de início, responsável local e localização oficial devem ser fornecidos pela igreja antes da publicação definitiva.</div>
        </div>
        <div class="card"><div class="card-body">
          <h3>Resumo do campo</h3>
          <div class="fact-grid">
            <div class="fact"><strong>${e(f.status)}</strong><span>Estado</span></div>
            <div class="fact"><strong>${e(f.tagline)}</strong><span>Tipo</span></div>
          </div>
          <p style="margin-top:1.25rem;font-size:0.9rem;color:var(--muted)">Todas as publicações deste campo passam pela revisão e aprovação do administrador geral antes de ficarem visíveis publicamente.</p>
        </div></div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="wrap">${sectionHead('Notícias e atualizações', 'Acontecimentos recentes e relatórios do campo')}
      <div class="grid grid-3">
        ${['Visita missionária e encontro com a comunidade', 'Culto especial e evangelização', 'Relatório de atividades do campo'].map(function (t, i) {
          return '<article class="card card-plain"><div class="card-body"><span class="badge badge-blue">' + e(f.name) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(t) + '</h3><p style="font-size:0.9rem;color:var(--muted)">Publicação de exemplo. Substituir por notícia real aprovada pelo administrador.</p><p class="text-muted" style="font-size:0.8rem;margin:0">Conteúdo provisório · ' + (i + 1) + '</p></div></article>';
        }).join('')}
      </div>
    </div></section>
    <section class="section"><div class="wrap">${sectionHead('Fotografias e vídeos', 'Galeria do campo missionário')}
      <div class="gallery-grid">
        ${['Culto no campo', 'Encontro de jovens', 'Evangelização', 'Comunidade local', 'Visita missionária', 'Atividade de formação'].map(function (t, i) {
          const tones = ['', 'thumb-teal', 'thumb-gold', 'thumb-blue', 'thumb-plum', 'thumb-teal'];
          return '<div class="gallery-item ' + tones[i] + '" data-gallery-item data-title="' + a(t) + ' — ' + a(f.name) + '"><span>' + e(t) + '</span></div>';
        }).join('')}
      </div>
      <div class="video-grid" style="margin-top:1.5rem">
        <div class="video-box"><div class="play">▶</div><strong>Vídeos do campo ${e(f.name)}</strong><small>Espaço reservado para vídeos do YouTube aprovados</small></div>
        <div class="video-box"><div class="play">▶</div><strong>Testemunhos</strong><small>Publicar apenas com autorização das pessoas envolvidas</small></div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="wrap">${sectionHead('Projetos e necessidades', 'Como apoiar o trabalho missionário')}
      <div class="grid grid-2">
        <div class="card"><div class="card-body"><h3>Projetos em desenvolvimento</h3><p style="color:var(--muted)">Espaço reservado para os projetos aprovados do campo ${e(f.name)}.</p></div></div>
        <div class="card"><div class="card-body"><h3>Necessidades atuais</h3><p style="color:var(--muted)">Meios de transporte, materiais de evangelização e formação de líderes locais. Confirmar com a administração.</p></div></div>
      </div>
      <div style="text-align:center;margin-top:2rem"><a class="btn btn-primary" href="doacoes.html">Apoiar missões</a></div>
    </div></section>`;
  return layout({ title: f.name + ' — Campos Missionários', desc: f.description, active: 'campo-' + f.slug, content: content, lightbox: true });
}

console.log('A gerar páginas...');

write('index.html', layout({
  title: 'Início',
  active: 'inicio',
  jsonld: {
    '@context': 'https://schema.org', '@type': 'Church', name: S.name, image: 'assets/logo/logo.jpg',
    address: { '@type': 'PostalAddress', streetAddress: S.address, addressLocality: S.city, addressCountry: 'GW' },
    telephone: S.phone, sameAs: [S.facebook]
  },
  content: `
  <section class="hero"><div class="wrap hero-inner">
    <div>
      <span class="eyebrow">Bem-vindo à IEBA</span>
      <h1>Uma comunidade de fé, esperança e serviço em Bissau</h1>
      <p>A Igreja Evangélica de Bairro D'Ajuda acolhe pessoas de todas as idades para ouvir a Palavra de Deus, orar juntas e servir a comunidade. Ficamos situados no Bairro de Ajuda, atrás da Escola Attadamun.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="pedidos-oracao.html">Pedir oração</a>
        <a class="btn btn-outline" href="sobre.html">Conhecer a igreja</a>
      </div>
    </div>
    <aside class="hero-card" aria-label="Informações rápidas">
      <h3>Encontre-nos</h3>
      <div class="hc-row"><span>📍</span><span>${e(S.address)}, ${e(S.city)}</span></div>
      <div class="hc-row"><span>☎</span><span>${e(S.phone)}</span></div>
      <div class="hc-row"><span>◷</span><span>Culto geral: domingo, 10h30</span></div>
      <div class="hc-row"><span>f</span><span>1,8 mil seguidores no Facebook</span></div>
    </aside>
  </div></section>
  <section class="section"><div class="wrap">
    ${sectionHead('A nossa igreja', 'Conheça a IEBA', 'Somos uma comunidade evangélica em Bissau')}
    <div class="grid grid-3">
      <div class="card"><div class="card-body"><div class="icon-box">📖</div><h3 class="card-title">A Palavra de Deus</h3><p>O ensino bíblico é o centro da nossa vida: escola dominical, discipulado e estudo bíblico semanal.</p></div></div>
      <div class="card"><div class="card-body"><div class="icon-box">🙏</div><h3 class="card-title">Oração</h3><p>Oramos juntos nos cultos e acompanhamos com confidencialidade cada pedido recebido.</p></div></div>
      <div class="card"><div class="card-body"><div class="icon-box">🤝</div><h3 class="card-title">Serviço</h3><p>Estamos presentes na comunidade através dos ministérios, projetos sociais e campos missionários.</p></div></div>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Atividades em destaque', 'A programação regular da igreja')}
    <div class="carousel" data-carousel>
      <button class="carousel-btn carousel-prev" type="button" aria-label="Anterior">‹</button>
      <div class="carousel-track">${C.events.map(eventCard).join('')}</div>
      <button class="carousel-btn carousel-next" type="button" aria-label="Seguinte">›</button>
    </div>
    <div style="text-align:center;margin-top:1rem"><a class="btn btn-outline-dark" href="eventos.html">Ver todos os eventos</a></div>
  </div></section>
  <section class="section"><div class="wrap">${sectionHead('Horários dos cultos', 'Encontros regulares — fuso horário ' + S.timezone)}
    ${serviceTable()}
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Nossos ministérios', 'Cada ministério com o seu espaço e identidade')}
    <div class="grid grid-3">${C.ministries.slice(0, 6).map(ministryCard).join('')}</div>
    <div style="text-align:center;margin-top:1.5rem"><a class="btn btn-outline-dark" href="jovens.html">Explorar ministérios</a></div>
  </div></section>
  <section class="section"><div class="wrap">${sectionHead('Igrejas filiais e campos missionários', 'O trabalho da IEBA para além da sede')}
    <div class="grid grid-4">${C.missionFields.map(function (f) {
      return '<a class="card" href="campo-' + f.slug + '.html" style="color:inherit;text-decoration:none"><div class="thumb ' + (f.colorTheme || '') + '"><span class="thumb-label">' + e(f.name) + '</span></div><div class="card-body"><h3 class="card-title">' + e(f.name) + '</h3><p style="font-size:0.88rem;color:var(--muted)">' + e(f.tagline) + '</p></div></a>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Notícias e comunicados', 'O que andamos a partilhar')}
    <div class="grid grid-3">${C.news.map(function (n) {
      return '<article class="card"><div class="card-body"><span class="badge badge-blue">' + e(n.source) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(n.title) + '</h3><p style="font-size:0.9rem;color:var(--muted)">' + e(n.text) + '</p><p class="text-muted" style="font-size:0.8rem;margin:0">' + e(n.date) + '</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">${sectionHead('Projetos sociais', 'Onde o evangelho se torna serviço')}
    <div class="grid grid-3">${C.projects.slice(0, 3).map(function (p) {
      return '<article class="card"><div class="card-body"><span class="badge ' + (p.status === 'Em curso' ? 'badge-green' : 'badge-warn') + '">' + e(p.status) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(p.name) + '</h3><p style="font-size:0.9rem;color:var(--muted)">' + e(p.description) + '</p></div></article>';
    }).join('')}</div>
    <div style="text-align:center;margin-top:1.5rem"><a class="btn btn-outline-dark" href="projetos-sociais.html">Ver todos os projetos</a></div>
  </div></section>
  <section class="section section-soft"><div class="wrap">${sectionHead('Mídia', 'Fotografias e vídeos da nossa comunidade')}
    <div class="gallery-grid">
      ${['Culto dominical', 'Juventude', 'Sal da Terra', 'Louvor', 'Crianças', 'Missões'].map(function (t, i) {
        const tones = ['', 'thumb-blue', 'thumb-gold', 'thumb-plum', 'thumb-teal', 'thumb-blue'];
        return '<a class="gallery-item ' + tones[i] + '" href="midia.html"><span>' + e(t) + '</span></a>';
      }).join('')}
    </div>
  </div></section>
  <section class="section"><div class="wrap"><div class="cta-band">
    <div><h2>Estamos aqui para si</h2><p>Envie um pedido de oração, fale connosco ou contribua para o trabalho da igreja.</p></div>
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap"><a class="btn btn-primary" href="pedidos-oracao.html">Pedido de oração</a><a class="btn btn-outline" href="doacoes.html">Doar</a><a class="btn btn-outline" href="contactos.html">Contactos</a></div>
  </div></div></section>`
}));

write('sobre.html', layout({
  title: 'Sobre a IEBA', active: 'sobre',
  content: `
  ${crumb([['Início', 'index.html'], ['Sobre']])}
  ${pageHero('Sobre a IEBA', 'Identidade, missão, visão e valores da Igreja Evangélica de Bairro D\'Ajuda', 'A nossa identidade')}
  <section class="section"><div class="wrap"><div class="grid grid-2" style="align-items:start">
    <div><span class="eyebrow">História</span><h2>A nossa história</h2>
      <p>A Igreja Evangélica de Bairro D'Ajuda (IEBA) é uma comunidade cristã situada no Bairro de Ajuda, em Bissau, Guiné-Bissau — atrás da Escola Attadamun.</p>
      <p>Ao longo dos anos, a igreja tem crescido através do ensino bíblico, da oração, do louvor e do serviço, reunindo pessoas de diferentes gerações. A Juventude Evangélica de Bairro de Ajuda e a Organização Missionária Sal da Terra Guiné-Bissau são expressões vivas desse trabalho.</p>
      <div class="note"><strong>Informação provisória:</strong> ano de fundação, nomes da liderança e marcos históricos oficiais ainda não foram fornecidos. Este texto será substituído assim que a igreja confirmar os dados.</div>
    </div>
    <div class="card"><div class="card-body"><h3>Ficha institucional</h3>
      <ul class="contact-list">
        <li><span class="ico">⛪</span><div><strong>Denominação</strong><span>Igreja evangélica</span></div></li>
        <li><span class="ico">📍</span><div><strong>Sede</strong><span>${e(S.address)}, ${e(S.city)}, ${e(S.country)}</span></div></li>
        <li><span class="ico">☎</span><div><strong>Telefone</strong><span>${e(S.phone)}</span></div></li>
        <li><span class="ico">🌍</span><div><strong>Fuso horário</strong><span>${e(S.timezone)}</span></div></li>
        <li><span class="ico">f</span><div><strong>Presença online</strong><span>1,8 mil seguidores no Facebook</span></div></li>
      </ul>
    </div></div>
  </div></div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Missão e visão', 'O que nos move')}
    <div class="grid grid-2">
      <div class="card"><div class="card-body"><div class="icon-box">🎯</div><h3>Nossa missão</h3><p>Anunciar o evangelho de Jesus Cristo, formar discípulos e servir a comunidade, com fidelidade à Palavra de Deus e em comunhão com as igrejas filiais e campos missionários.</p></div></div>
      <div class="card"><div class="card-body"><div class="icon-box">👁</div><h3>Nossa visão</h3><p>Ser uma comunidade evangélica acolhedora, firme na fé e relevante na sociedade, crescendo em todas as gerações e em cada localidade onde Deus nos coloca.</p></div></div>
    </div>
    <div class="note note-info"><strong>Nota:</strong> Missão e visão são propostas provisórias, redigidas a partir das atividades conhecidas da igreja. Confirmar ou substituir pelo texto oficial.</div>
  </div></section>
  <section class="section"><div class="wrap">${sectionHead('Valores', 'O que nos guia')}
    <div class="grid grid-4">
      ${[['Palavra de Deus', '📖'], ['Oração', '🙏'], ['Comunhão', '🤝'], ['Serviço', '💛']].map(function (v) {
        return '<div class="card card-plain"><div class="card-body" style="text-align:center"><div class="icon-box" style="margin:0 auto 1rem">' + v[1] + '</div><h3>' + e(v[0]) + '</h3><p style="font-size:0.9rem;color:var(--muted)">Valor proposto para confirmação pela liderança da IEBA.</p></div></div>';
      }).join('')}
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Liderança e ministérios', 'Quem faz o trabalho')}
    <p class="text-center text-muted">Os nomes e cargos da liderança serão publicados após autorização. Abaixo, as áreas de serviço já identificadas a partir das atividades da igreja.</p>
    <div class="grid grid-3">${C.ministries.slice(0, 6).map(ministryCard).join('')}</div>
  </div></section>`
}));

write('eventos.html', layout({
  title: 'Eventos', active: 'eventos',
  content: `
  ${crumb([['Início', 'index.html'], ['Eventos']])}
  ${pageHero('Eventos', 'Encontros, cultos e atividades da IEBA — até 20 publicações aprovadas, ordenadas pela data de publicação.', 'Programação', 'variant-gold')}
  <section class="section"><div class="wrap">
    <div class="note note-info"><strong>Regra de publicação:</strong> somente o administrador geral pode aprovar e destacar eventos. As datas abaixo são de realização; a data de publicação é gerida no painel administrativo.</div>
    ${sectionHead('Próximos eventos e encontros regulares', 'A programação da nossa igreja')}
    <div class="carousel" data-carousel>
      <button class="carousel-btn carousel-prev" type="button" aria-label="Anterior">‹</button>
      <div class="carousel-track">${C.events.map(eventCard).join('')}</div>
      <button class="carousel-btn carousel-next" type="button" aria-label="Seguinte">›</button>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Todos os eventos', 'Lista completa por data de realização')}
    <div class="grid grid-3">${C.events.map(eventCard).join('')}</div>
  </div></section>`
}));

write('atividades.html', layout({
  title: 'Atividades', active: 'atividades',
  content: `
  ${crumb([['Início', 'index.html'], ['Atividades']])}
  ${pageHero('Atividades', 'Cultos, estudos, ensaios, formação e ações de serviço da IEBA', 'Vida da igreja', 'variant-teal')}
  <section class="section"><div class="wrap">${sectionHead('O que acontece na IEBA', 'Atividades gerais, com ligação aos ministérios e eventos')}
    <div class="grid grid-3">${C.services.map(function (s) {
      return '<article class="card"><div class="card-body"><span class="badge badge-blue">' + e(s.day) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(s.name) + '</h3><p style="font-size:0.9rem;color:var(--muted)">' + e(s.description) + '</p><p style="font-size:0.85rem;margin:0"><strong>◷</strong> ' + e(s.time) + ' · <strong>👥</strong> ' + e(s.ministry) + '</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Formação e serviço', 'Aulas de agropecuária e segurança alimentar')}
    <div class="card"><div class="card-body">
      <p>A IEBA desenvolve também aulas de agropecuária, estudo de criação de animais domésticos e orientações para conservar alimentos sem frigorífico. Para mais informações, entre em contacto com <strong>${e(S.contactAgriculture)}</strong>.</p>
      <a class="btn btn-outline-dark" href="contactos.html">Pedir informações</a>
    </div></div>
  </div></section>`
}));

const ministryVariants = {
  jovens: ['', ''], mulheres: ['variant-plum', ''], meninas: ['variant-plum', 'thumb-plum'],
  'sal-da-terra': ['variant-gold', 'thumb-gold'], criancas: ['variant-teal', 'thumb-teal'],
  missoes: ['', 'thumb-teal'], 'ministerio-oracao': ['', 'thumb-blue']
};
C.ministries.forEach(function (m) {
  const v = ministryVariants[m.slug] || ['', ''];
  m.colorTheme = v[1];
  write(m.slug + '.html', ministryPage(m, v[0], v[1]));
});

write('projetos-sociais.html', layout({
  title: 'Projetos Sociais', active: 'projetos',
  content: `
  ${crumb([['Início', 'index.html'], ['Projetos sociais']])}
  ${pageHero('Projetos Sociais', 'Projetos da IEBA com impacto na comunidade e apoio aos campos missionários', 'Serviço e solidariedade', 'variant-teal')}
  <section class="section"><div class="wrap">
    <div class="note"><strong>Publicação:</strong> os projetos são publicados pelo administrador geral. Os dados de apoio e doações são confirmados pela igreja antes de qualquer publicação.</div>
    ${sectionHead('Projetos em curso e planeados', 'Cada projeto apresenta objetivos, beneficiários e necessidades')}
    <div class="grid grid-2">${C.projects.map(function (p) {
      return '<article class="card"><div class="card-body"><span class="badge ' + (p.status === 'Em curso' ? 'badge-green' : 'badge-warn') + '">' + e(p.status) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(p.name) + '</h3><p>' + e(p.description) + '</p><p style="font-size:0.9rem"><strong>Beneficiários:</strong> ' + e(p.beneficiaries) + '</p><p style="font-size:0.9rem"><strong>Necessidades:</strong> ' + e(p.needs) + '</p></div><div class="card-footer"><a class="card-link" href="doacoes.html">Apoiar este projeto →</a></div></article>';
    }).join('')}</div>
  </div></section>`
}));

write('midia.html', layout({
  title: 'Mídia', active: 'midia', lightbox: true,
  content: `
  ${crumb([['Início', 'index.html'], ['Mídia']])}
  ${pageHero('Mídia', 'Fotografias, álbuns e vídeos das atividades da IEBA', 'A nossa galeria', 'variant-blue')}
  <section class="section"><div class="wrap">
    <div class="filter-bar" role="group" aria-label="Filtrar mídia">
      <button class="filter-btn active" type="button" data-filter="all">Tudo</button>
      <button class="filter-btn" type="button" data-filter="fotos">Fotografias</button>
      <button class="filter-btn" type="button" data-filter="videos">Vídeos</button>
      <button class="filter-btn" type="button" data-filter="jovens">Jovens</button>
      <button class="filter-btn" type="button" data-filter="missoes">Missões</button>
    </div>
    ${sectionHead('Álbuns e fotografias', 'Imagens provisórias — substituir por fotografias oficiais autorizadas')}
    <div class="gallery-grid">
      ${[['Culto dominical', 'fotos', ''], ['Juventude Evangélica', 'fotos jovens', 'thumb-blue'], ['Sal da Terra', 'fotos jovens', 'thumb-gold'], ['Culto das Senhoras', 'fotos', 'thumb-plum'], ['Escola Dominical', 'fotos', 'thumb-teal'], ['Visita missionária', 'fotos missoes', 'thumb-blue'], ['Ensaio do louvor', 'fotos', ''], ['Comunidade', 'fotos', 'thumb-teal']].map(function (g) {
        return '<div class="gallery-item ' + g[2] + '" data-gallery-item data-filter-item="' + a(g[1]) + '" data-title="' + a(g[0]) + '"><span>' + e(g[0]) + '</span></div>';
      }).join('')}
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Vídeos', 'Espaço para vídeos do YouTube incorporados via iframe autorizado')}
    <div class="video-grid">
      <div class="video-box" data-filter-item="videos"><div class="play">▶</div><strong>Cultos da IEBA</strong><small>Aguardando vídeos oficiais</small></div>
      <div class="video-box" data-filter-item="videos"><div class="play">▶</div><strong>Atividades dos ministérios</strong><small>Aguardando vídeos oficiais</small></div>
      <div class="video-box" data-filter-item="videos missoes"><div class="play">▶</div><strong>Campos missionários</strong><small>Aguardando vídeos oficiais</small></div>
    </div>
    <div class="note note-info" style="margin-top:1.5rem"><strong>Privacidade:</strong> fotografias de menores só são publicadas com autorização dos responsáveis legais. Nunca incorporar URLs de vídeo não autorizadas.</div>
  </div></section>`
}));

write('pedidos-oracao.html', layout({
  title: 'Pedidos de Oração', active: 'pedidos', noindex: true,
  desc: 'Envie um pedido de oração confidencial à IEBA.',
  content: `
  ${crumb([['Início', 'index.html'], ['Pedidos de oração']])}
  ${pageHero('Pedidos de Oração', 'Envie o seu pedido com confidencialidade. Será recebido pelo Ministério de Oração.', 'Ministério de Oração', 'variant-teal')}
  <section class="section"><div class="wrap">
    <div class="grid grid-2" style="align-items:start">
      <div>
        <p class="lead">"Orai uns pelos outros, para que sejais curados." (Tiago 5:16)</p>
        <p>O Ministério de Oração da IEBA recebe e acompanha cada pedido. O seu pedido não será publicado no site e só pode ser consultado pelo administrador geral e pelo Ministério de Oração.</p>
        <div class="note"><strong>Confidencialidade:</strong> se solicitar tratamento confidencial, o pedido não será partilhado com outros ministérios. Nunca expomos o conteúdo de pedidos em registos técnicos.</div>
        <h3>Como funciona</h3>
        <ol><li>Recebido — o pedido entra na área privada.</li><li>Em acompanhamento — o Ministério de Oração intercede.</li><li>Concluído — após o acompanhamento.</li><li>Arquivado — conforme a política de retenção.</li></ol>
      </div>
      <form class="form-card" data-demo-form novalidate>
        <h3>Enviar pedido</h3>
        <div class="field"><label for="pr-name">Nome <span class="text-muted">(opcional)</span></label><input id="pr-name" name="nome" type="text" autocomplete="name"></div>
        <div class="field"><label for="pr-contact">Email ou telefone <span class="text-muted">(opcional)</span></label><input id="pr-contact" name="contacto" type="text"><span class="hint">Apenas se desejar ser contactado.</span></div>
        <div class="field"><label for="pr-text">Pedido de oração <span class="req">*</span></label><textarea id="pr-text" name="pedido" required></textarea></div>
        <div class="field"><label class="checkbox"><input type="checkbox" name="confidencial" checked> <span>Tratar este pedido de forma confidencial</span></label></div>
        <div class="field"><label class="checkbox"><input type="checkbox" name="consentimento" required> <span>Autorizo o tratamento dos meus dados para este fim <span class="req">*</span></span></label></div>
        <button class="btn btn-blue btn-block" type="submit">Enviar pedido</button>
        <div class="form-msg" role="status"></div>
        <p class="form-note">O envio real será ativado com a configuração do Firebase e das regras de segurança. Não envie dados bancários ou informações sensíveis por este formulário.</p>
      </form>
    </div>
  </div></section>`
}));

write('contactos.html', layout({
  title: 'Contactos', active: 'contactos',
  content: `
  ${crumb([['Início', 'index.html'], ['Contactos']])}
  ${pageHero('Contactos', 'Fale connosco. Estamos no Bairro de Ajuda, atrás da Escola Attadamun, em Bissau.', 'Vamos conversar')}
  <section class="section"><div class="wrap contact-grid">
    <form class="form-card" data-demo-form novalidate>
      <h3>Enviar mensagem</h3>
      <div class="field"><label for="ct-name">Nome <span class="req">*</span></label><input id="ct-name" name="nome" required autocomplete="name"></div>
      <div class="field"><label for="ct-email">Email <span class="req">*</span></label><input id="ct-email" name="email" type="email" required autocomplete="email"></div>
      <div class="field"><label for="ct-phone">Telefone <span class="text-muted">(opcional)</span></label><input id="ct-phone" name="telefone" type="tel" autocomplete="tel"></div>
      <div class="field"><label for="ct-subject">Assunto <span class="req">*</span></label><input id="ct-subject" name="assunto" required></div>
      <div class="field"><label for="ct-msg">Mensagem <span class="req">*</span></label><textarea id="ct-msg" name="mensagem" required></textarea></div>
      <div class="field"><label class="checkbox"><input type="checkbox" name="privacidade" required> <span>Autorizo o tratamento dos meus dados para resposta a esta mensagem <span class="req">*</span></span></label></div>
      <button class="btn btn-blue btn-block" type="submit">Enviar mensagem</button>
      <div class="form-msg" role="status"></div>
      <p class="form-note">As mensagens serão encaminhadas para a administração da IEBA.</p>
    </form>
    <div>
      <h2>Informações oficiais</h2>
      <ul class="contact-list">
        <li><span class="ico">📍</span><div><strong>Morada</strong><span>${e(S.address)}, ${e(S.city)}, ${e(S.country)}</span></div></li>
        <li><span class="ico">☎</span><div><strong>Telefone</strong><span><a href="${a(S.phoneLink)}">${e(S.phone)}</a></span></div></li>
        <li><span class="ico">✉</span><div><strong>Email geral</strong><span>${e(S.email)}</span></div></li>
        <li><span class="ico">👥</span><div><strong>Juventude</strong><span>${e(S.emailYouth)}</span></div></li>
        <li><span class="ico">🧂</span><div><strong>Sal da Terra</strong><span>${e(S.emailSal)}</span></div></li>
        <li><span class="ico">🌱</span><div><strong>Agropecuária</strong><span>Contacto: ${e(S.contactAgriculture)}</span></div></li>
      </ul>
      <h3>Redes sociais</h3>
      <ul class="contact-list">${socialHTML()}</ul>
      <h3>Onde estamos</h3>
      <div class="map-box"><div><strong>Mapa</strong><p>O mapa será incorporado quando a localização oficial for confirmada.</p><small>${e(S.address)}, ${e(S.city)}</small></div></div>
    </div>
  </div></section>`
}));

write('doacoes.html', layout({
  title: 'Doações', active: 'doacoes',
  content: `
  ${crumb([['Início', 'index.html'], ['Doações']])}
  ${pageHero('Doações', 'Apoie o trabalho da IEBA. Todas as informações financeiras oficiais serão confirmadas pela igreja.', 'Contribuir', 'variant-gold')}
  <section class="section"><div class="wrap">
    <div class="note"><strong>Importante:</strong> não existem dados bancários publicados nesta versão. A igreja deve fornecer e confirmar contas, meios de pagamento móvel e instruções antes de qualquer publicação. Nunca são inventadas chaves ou contas.</div>
    ${sectionHead('Modalidade A — Doações tradicionais', 'Transferência bancária e pagamento móvel')}
    <div class="grid grid-3">
      <div class="card"><div class="card-body"><h3>Dados bancários</h3><p class="text-muted">A confirmar pela igreja. Espaço reservado para banco, agência, conta e IBAN oficiais.</p></div></div>
      <div class="card"><div class="card-body"><h3>Pagamento móvel</h3><p class="text-muted">A confirmar pela igreja. Espaço reservado para os números e operadores oficiais.</p></div></div>
      <div class="card"><div class="card-body"><h3>Confirmação</h3><p class="text-muted">Após a transferência, envie o comprovativo através da página de contactos para registo administrativo.</p></div></div>
    </div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Modalidade B — Doações online', 'Integração com prestador de pagamentos confiável')}
    <div class="grid grid-2">
      <div class="card"><div class="card-body">
        <h3>Como funcionará</h3>
        <ol><li>Escolha do valor e da finalidade.</li><li>Seleção do projeto ou campanha.</li><li>Encaminhamento para pagamento seguro.</li><li>Confirmação autenticada pelo prestador (webhook).</li><li>Registo e histórico administrativo.</li></ol>
        <p class="text-muted" style="font-size:0.9rem">A integração depende de um prestador adequado à Guiné-Bissau e dos meios oficiais da igreja. A confirmação não será baseada apenas no regresso do utilizador à página de sucesso.</p>
      </div></div>
      <div class="card"><div class="card-body">
        <h3>Simulação de escolha</h3>
        <form data-demo-form novalidate>
          <div class="field"><label for="d-value">Valor</label><select id="d-value"><option>5 000 FCFA</option><option>10 000 FCFA</option><option>20 000 FCFA</option><option>Outro valor</option></select></div>
          <div class="field"><label for="d-purpose">Finalidade</label><select id="d-purpose"><option>Sustentação geral</option><option>Missões</option><option>Projetos sociais</option></select></div>
          <button class="btn btn-primary" type="submit">Continuar</button>
          <div class="form-msg" role="status"></div>
        </form>
        <p class="form-note"><strong>Segurança:</strong> a IEBA nunca armazena dados completos de cartões bancários.</p>
      </div></div>
    </div>
  </div></section>`
}));

write('campos-missionarios.html', layout({
  title: 'Igrejas Filiais e Campos Missionários', active: 'campos',
  content: `
  ${crumb([['Início', 'index.html'], ['Campos missionários']])}
  ${pageHero('Igrejas Filiais e Campos Missionários', 'Acompanhe o trabalho da IEBA em Tchangue, Sahara, Rucuto e Ilhas', 'Expansão do evangelho', 'variant-teal')}
  <section class="section"><div class="wrap">${sectionHead('Os nossos campos', 'Cada campo tem página própria, com notícias, galeria, vídeos e projetos')}
    <div class="grid grid-4">${C.missionFields.map(function (f, i) {
      const tones = ['', 'thumb-teal', 'thumb-gold', 'thumb-blue'];
      return '<a class="card field-card" href="campo-' + f.slug + '.html" style="color:inherit;text-decoration:none"><div class="thumb ' + tones[i] + '"><span class="thumb-label">' + e(f.name) + '</span><span class="thumb-icon">✦</span></div><div class="card-body"><span class="badge badge-green">' + e(f.status) + '</span><h3 class="card-title" style="margin-top:0.75rem">' + e(f.name) + '</h3><p style="font-size:0.88rem;color:var(--muted)">' + e(f.description) + '</p></div><div class="card-footer"><span class="card-link">Ver página do campo →</span></div></a>';
    }).join('')}</div>
  </div></section>
  <section class="section section-alt"><div class="wrap">${sectionHead('Atualizações recentes', 'Publicações dos quatro campos, identificadas pela origem')}
    <div class="grid grid-2">${C.missionFields.map(function (f) {
      return '<article class="card card-plain"><div class="card-body"><span class="badge badge-blue">' + e(f.name) + '</span><h3 class="card-title" style="margin-top:0.75rem">Atualização do campo de ' + e(f.name) + '</h3><p style="font-size:0.9rem;color:var(--muted)">Publicação de exemplo — substituir por conteúdo aprovado pelo administrador geral.</p></div></article>';
    }).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap"><div class="note note-info"><strong>Gestão:</strong> responsáveis autorizados podem submeter conteúdos apenas do seu campo, mas nenhuma publicação fica visível sem aprovação do administrador geral.</div></div></section>`
}));

C.missionFields.forEach(function (f) { write('campo-' + f.slug + '.html', fieldPage(f)); });

const adminPages = [
  ['login.html', 'Acesso ao painel', 'Administração'],
  ['dashboard.html', 'Painel geral', 'Administração'],
  ['eventos.html', 'Gerir eventos', 'Administração'],
  ['cultos.html', 'Gerir cultos e horários', 'Administração'],
  ['ministerios.html', 'Gerir ministérios', 'Administração'],
  ['atividades.html', 'Gerir atividades', 'Administração'],
  ['midia.html', 'Gerir mídia', 'Administração'],
  ['projetos-sociais.html', 'Gerir projetos sociais', 'Administração'],
  ['pedidos-oracao.html', 'Pedidos de oração', 'Administração'],
  ['contactos.html', 'Mensagens recebidas', 'Administração'],
  ['doacoes.html', 'Doações', 'Administração'],
  ['utilizadores.html', 'Utilizadores e permissões', 'Administração'],
  ['auditoria.html', 'Auditoria', 'Administração'],
  ['configuracoes.html', 'Configurações', 'Administração']
];
adminPages.forEach(function (p) {
  const isLogin = p[0] === 'login.html';
  const content = `
  ${pageHero(p[1], 'Área privada da IEBA. O acesso real será ativado com Firebase Authentication, App Check e regras de segurança.', 'Painel administrativo')}
  <section class="section"><div class="wrap">
    <div class="note"><strong>Área protegida:</strong> esta página é um espaço reservado. Não indexar, não expor dados e não publicar sem aprovação do administrador geral.</div>
    ${isLogin ? `<form class="form-card" data-demo-form novalidate style="max-width:440px;margin:0 auto">
      <h3>Iniciar sessão</h3>
      <div class="field"><label for="ad-email">Email</label><input id="ad-email" type="email" required></div>
      <div class="field"><label for="ad-pass">Palavra-passe</label><input id="ad-pass" type="password" required></div>
      <button class="btn btn-blue btn-block" type="submit">Entrar</button>
      <div class="form-msg" role="status"></div>
      <p class="form-note">MFA obrigatório para o administrador geral. A autenticação real depende da configuração do Firebase.</p>
    </form>` : `<div class="card"><div class="card-body"><h3>${e(p[1])}</h3><p class="text-muted">Funcionalidade a implementar na Fase 4 (Administração), conforme a especificação. Aqui serão geridos os dados com permissões reais verificadas no Firebase.</p><a class="btn btn-outline-dark" href="dashboard.html">Ir para o painel</a></div></div>`}
  </div></section>`;
  write('admin/' + p[0], layout({ title: p[1], desc: 'Área administrativa privada da IEBA', active: '', noindex: true, noFooter: false, content: content }));
});

const logoSource = path.join(ROOT, 'logo.jpg');
const logoDest = path.join(ROOT, 'assets', 'logo', 'logo.jpg');
if (fs.existsSync(logoSource) && !fs.existsSync(logoDest)) {
  fs.copyFileSync(logoSource, logoDest);
  console.log('  . assets/logo/logo.jpg');
}

console.log('Concluído.');
