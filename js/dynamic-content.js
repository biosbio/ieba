(function () {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var COLLECTIONS = {
    eventos: 'events',
    atividades: 'activities',
    comunicados: 'announcements',
    utilizadores: 'users',
    midia: 'media',
    notificacoes: 'notifications',
    subscritores: 'subscribers',
    pedidos: 'prayerRequests'
  };

  function loadItems(key) {
    var fb = window.IEBAFirebase;
    var collection = COLLECTIONS[key] || key;
    if (fb && fb.enabled && fb.data && fb.auth && fb.auth.currentUser) {
      return fb.data.list(collection).catch(function () { return window.IEBAStore ? IEBAStore.all(key) : []; });
    }
    return Promise.resolve(window.IEBAStore ? IEBAStore.all(key) : []);
  }

  function titleOf(item, key) {
    if (key === 'eventos') { return item.title || 'Evento'; }
    if (key === 'atividades') { return item.name || item.title || 'Atividade'; }
    if (key === 'comunicados') { return item.title || 'Comunicado'; }
    if (key === 'utilizadores') { return item.name || 'Utilizador'; }
    if (key === 'midia') { return item.title || 'Mídia'; }
    if (key === 'subscritores') { return item.name || item.email || 'Subscritor'; }
    if (key === 'notificacoes') { return item.title || 'Notificação'; }
    if (key === 'pedidos') { return item.name || 'Pedido anónimo'; }
    return item.title || item.name || 'Registo';
  }

  function detailOf(item, key) {
    if (key === 'eventos') { return [item.date, item.time, item.location, item.ministry].filter(Boolean).map(esc).join(' · '); }
    if (key === 'atividades') { return [item.day, item.time, item.ministry].filter(Boolean).map(esc).join(' · '); }
    if (key === 'comunicados') { return [item.date, String(item.text || '').slice(0, 70)].filter(Boolean).map(esc).join(' · '); }
    if (key === 'utilizadores') { return esc(item.email || '') + ' · ' + ((item.pages && item.pages.length) ? item.pages.length + ' página(s)' : 'Sem páginas'); }
    if (key === 'midia') { return [item.album, item.description].filter(Boolean).map(esc).join(' · '); }
    if (key === 'subscritores') { return [item.email, item.phone, item.channel, (item.topics || []).join(', ')].filter(Boolean).map(esc).join(' · '); }
    if (key === 'notificacoes') { return [item.topic, item.message].filter(Boolean).map(esc).join(' · '); }
    if (key === 'pedidos') { return [item.status, String(item.request || '').slice(0, 60)].filter(Boolean).map(esc).join(' · '); }
    return '';
  }

  function renderPublic() {
    document.querySelectorAll('[data-store-render]').forEach(function (host) {
      var key = host.getAttribute('data-store-render');
      loadItems(key).then(function (items) {
        items = items.filter(function (x) { return x.visible !== false; });
        if (!items.length) {
          var section = host.closest('[data-store-section]');
          if (section) { section.classList.add('hide'); }
          return;
        }
        host.innerHTML = '<div class="grid grid-3">' + items.map(function (item) {
          return '<article class="card"><div class="card-body">' +
            '<span class="badge badge-green">Publicado pelo painel</span>' +
            (item.featured ? ' <span class="badge badge-gold">Destaque</span>' : '') +
            '<h3 class="card-title" style="margin-top:.75rem">' + esc(titleOf(item, key)) + '</h3>' +
            '<p style="font-size:.86rem;color:var(--muted);margin:0">' + detailOf(item, key) + '</p>' +
            '</div></article>';
        }).join('') + '</div>';
      });
    });
  }

  function renderCarousel() {
    document.querySelectorAll('[data-store-carousel]').forEach(function (track) {
      var key = track.getAttribute('data-store-carousel');
      loadItems(key).then(function (items) {
        var featured = items.filter(function (x) { return x.featured === true; });
        if (!featured.length) { return; }
        var cards = featured.map(function (item) {
          var isEvent = key === 'eventos';
          return '<a class="card" href="' + (isEvent ? 'eventos.html' : 'noticias.html') + '" style="color:inherit;text-decoration:none" data-slide>' +
            '<div class="thumb ' + (isEvent ? 'thumb-gold' : 'thumb-blue') + '"><span class="thumb-label">' + (isEvent ? 'Evento' : 'Comunicado') + '</span><span class="thumb-icon">✦</span></div>' +
            '<div class="card-body"><span class="badge badge-gold">Destaque</span>' +
            '<h3 class="card-title" style="margin-top:.75rem">' + esc(titleOf(item, key)) + '</h3>' +
            '<p style="font-size:.9rem;color:var(--muted)">' + esc(String(item.description || item.text || '').slice(0, 130)) + '</p>' +
            '<p style="font-size:.82rem;color:var(--gold);font-weight:700;margin:0">' + esc(item.date || '') + '</p>' +
            '</div></a>';
        }).join('');
        track.insertAdjacentHTML('afterbegin', cards);
      });
    });
  }

  function adminRow(item, key) {
    var editFn = { eventos: 'editEvent', atividades: 'editAtividade', comunicados: 'editComunicado', utilizadores: 'editUser', midia: 'editMidia', pedidos: 'openPrayer' }[key];
    var collection = COLLECTIONS[key] || key;
    return '<div style="display:flex;align-items:center;gap:.8rem;padding:.85rem 1rem;border:1px solid var(--a-line);border-radius:9px;background:#FBFCFD;margin-top:.7rem">' +
      '<span class="a-avatar-sm">' + esc(titleOf(item, key).charAt(0).toUpperCase()) + '</span>' +
      '<div style="flex:1;min-width:0"><span class="strong">' + esc(titleOf(item, key)) + '</span>' +
      '<span class="sub">' + detailOf(item, key) + '</span></div>' +
      (key === 'eventos' || key === 'comunicados' ? '<button class="a-btn a-btn-ghost a-btn-sm" type="button" data-feature="' + esc(item.id) + '" data-collection="' + esc(collection) + '" data-featured="' + (item.featured ? '1' : '0') + '">' + (item.featured ? '★ Destaque' : '☆ Destacar') + '</button>' : '') +
      (key === 'midia' ? '<button class="a-btn a-btn-ghost a-btn-sm" type="button" data-visible="' + esc(item.id) + '" data-collection="' + esc(collection) + '" data-is-visible="' + (item.visible !== false ? '1' : '0') + '">' + (item.visible !== false ? '👁 Visível' : '🚫 Oculto') + '</button>' : '') +
      (editFn ? '<button class="a-btn a-btn-ghost a-btn-sm" type="button" data-edit-item="' + esc(item.id) + '" data-edit-key="' + esc(key) + '" title="Editar" aria-label="Editar">✏️</button>' : '') +
      '<button class="a-btn a-btn-danger a-btn-sm" type="button" data-remove-item="' + esc(item.id) + '" data-collection="' + esc(collection) + '">Remover</button>' +
      '</div>';
  }

  function wireAdminButtons(host) {
    host.querySelectorAll('[data-edit-item]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fn = { eventos: 'editEvent', atividades: 'editAtividade', comunicados: 'editComunicado', utilizadores: 'editUser', midia: 'editMidia', pedidos: 'openPrayer' }[btn.getAttribute('data-edit-key')];
        if (window.IEBAAdmin && fn && window.IEBAAdmin[fn]) { window.IEBAAdmin[fn](btn.getAttribute('data-edit-item')); }
      });
    });
    host.querySelectorAll('[data-feature]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.IEBAAdmin && window.IEBAAdmin.toggleFeatured) {
          window.IEBAAdmin.toggleFeatured(btn.getAttribute('data-collection'), btn.getAttribute('data-feature'), btn.getAttribute('data-featured') === '1');
        }
      });
    });
    host.querySelectorAll('[data-visible]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.IEBAAdmin && window.IEBAAdmin.toggleVisible) {
          window.IEBAAdmin.toggleVisible(btn.getAttribute('data-collection'), btn.getAttribute('data-visible'), btn.getAttribute('data-is-visible') === '1');
        }
      });
    });
    host.querySelectorAll('[data-remove-item]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.confirm('Remover este registo?') && window.IEBAAdmin && window.IEBAAdmin.removeItem) {
          window.IEBAAdmin.removeItem(btn.getAttribute('data-collection'), btn.getAttribute('data-remove-item'));
        }
      });
    });
  }

  function renderAdmin() {
    var hosts = [];
    document.querySelectorAll('[data-store-render-admin]').forEach(function (h) { hosts.push([h, h.getAttribute('data-store-render-admin')]); });
    var extra = document.querySelector('[data-store-render-admin-comunicados]');
    if (extra) { hosts.push([extra, 'comunicados']); }

    hosts.forEach(function (pair) {
      var host = pair[0], key = pair[1];
      loadItems(key).then(function (items) {
        if (!items.length) { return; }
        host.innerHTML = items.map(function (item) { return adminRow(item, key); }).join('');
        wireAdminButtons(host);
      });
    });
  }

  renderPublic();
  renderCarousel();
  renderAdmin();
})();
