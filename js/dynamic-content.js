(function () {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderPublic() {
    var host = document.querySelector('[data-store-render]');
    if (!host || !window.IEBAStore) return;
    var key = host.getAttribute('data-store-render');
    var items = IEBAStore.all(key);
    if (!items.length) {
      var section = host.closest('[data-store-section]');
      if (section) section.classList.add('hide');
      return;
    }
    host.innerHTML = '<div class="grid grid-3">' + items.map(function (item) {
      var title = item.name || item.title || item.atividade || 'Registo';
      var when = item.day || item.date || '';
      var time = item.time || '';
      var ministry = item.ministry || '';
      return '<article class="card"><div class="card-body">' +
        '<span class="badge badge-green">Publicado pelo painel</span>' +
        '<h3 class="card-title" style="margin-top:.75rem">' + esc(title) + '</h3>' +
        (when || time ? '<p style="font-size:.86rem;color:var(--gold);font-weight:700;margin-bottom:.4rem">' + esc(when) + (time ? ' · ' + esc(time) : '') + '</p>' : '') +
        (ministry ? '<p style="font-size:.84rem;color:var(--muted);margin:0">' + esc(ministry) + '</p>' : '') +
        '</div></article>';
    }).join('') + '</div>';
  }

  function renderAdmin() {
    var host = document.querySelector('[data-store-render-admin]');
    if (!host || !window.IEBAStore) return;
    var key = host.getAttribute('data-store-render-admin');
    var items = IEBAStore.all(key);
    if (!items.length) return;
    host.innerHTML = '<div class="a-grid" style="gap:.75rem;margin-top:1.25rem">' + items.map(function (item) {
      var title = item.name || item.title || item.atividade || 'Registo';
      var detail = key === 'utilizadores'
        ? esc(item.email || '') + ' · ' + (item.pages && item.pages.length ? item.pages.length + ' página(s) autorizada(s)' : 'Sem páginas autorizadas')
        : esc(item.day || item.date || '') + ' ' + esc(item.time || '') + ' · ' + esc(item.ministry || '');
      return '<div style="display:flex;align-items:center;gap:1rem;padding:.85rem 1rem;border:1px solid var(--a-line);border-radius:9px;background:#FBFCFD">' +
        '<span class="a-avatar-sm">' + esc(title.charAt(0).toUpperCase()) + '</span>' +
        '<div style="flex:1"><span class="strong">' + esc(title) + '</span>' +
        '<span class="sub">' + detail + '</span></div>' +
        '<span class="a-badge ' + (key === 'utilizadores' ? 'blue' : 'green') + '">' + (key === 'utilizadores' ? 'Responsável' : 'Ativo') + '</span>' +
        (key === 'utilizadores' ? '<button class="a-btn a-btn-ghost a-btn-sm" type="button" data-edit-user="' + esc(item.id) + '">Editar</button>' : '') +
        '<button class="a-btn a-btn-danger a-btn-sm" type="button" data-store-remove="' + esc(item.id) + '">Remover</button></div>';
    }).join('') + '</div>';
    host.querySelectorAll('[data-edit-user]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.IEBAAdmin && window.IEBAAdmin.editUser) {
          window.IEBAAdmin.editUser(btn.getAttribute('data-edit-user'));
        }
      });
    });
    host.querySelectorAll('[data-store-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        IEBAStore.remove(key, btn.getAttribute('data-store-remove'));
        window.location.reload();
      });
    });
  }

  function renderAdminComunicados() {
    var host = document.querySelector('[data-store-render-admin-comunicados]');
    if (!host || !window.IEBAStore) return;
    var items = IEBAStore.all('comunicados');
    if (!items.length) return;
    host.innerHTML = items.map(function (item) {
      return '<div style="display:flex;align-items:center;gap:1rem;padding:.85rem 1rem;border:1px solid var(--a-line);border-radius:9px;background:#FBFCFD;margin-top:.75rem">' +
        '<span class="a-avatar-sm">📢</span><div style="flex:1"><span class="strong">' + esc(item.title || 'Comunicado') + '</span>' +
        '<span class="sub">' + esc(item.date || '') + ' · ' + esc(String(item.text || '').slice(0, 70)) + '</span></div>' +
        (item.featured ? '<span class="a-badge gold">Destaque</span>' : '') +
        '<button class="a-btn a-btn-danger a-btn-sm" type="button" data-comunicado-remove="' + esc(item.id) + '">Remover</button></div>';
    }).join('');
    host.querySelectorAll('[data-comunicado-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        IEBAStore.remove('comunicados', btn.getAttribute('data-comunicado-remove'));
        window.location.reload();
      });
    });
  }

  function renderStoreCarousel() {
    var track = document.querySelector('[data-store-carousel="comunicados"]');
    if (!track || !window.IEBAStore) return;
    var items = IEBAStore.all('comunicados').filter(function (x) { return x.featured !== false; });
    if (!items.length) return;
    var cards = items.map(function (item) {
      return '<a class="card" href="comunicacao/noticias.html" style="color:inherit;text-decoration:none" data-slide>' +
        '<div class="thumb thumb-gold"><span class="thumb-label">Comunicado</span><span class="thumb-icon">✦</span></div>' +
        '<div class="card-body"><span class="badge badge-gold">Destaque</span>' +
        '<h3 class="card-title" style="margin-top:.75rem">' + esc(item.title || 'Comunicado') + '</h3>' +
        '<p style="font-size:.9rem;color:var(--muted)">' + esc(String(item.text || '').slice(0, 140)) + '</p>' +
        '<p style="font-size:.82rem;color:var(--gold);font-weight:700;margin:0">' + esc(item.date || '') + '</p></div></a>';
    }).join('');
    track.insertAdjacentHTML('afterbegin', cards);
  }

  renderPublic();
  renderAdmin();
  renderAdminComunicados();
  renderStoreCarousel();
})();
