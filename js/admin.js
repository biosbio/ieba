(function () {
  'use strict';

  var SESSION_KEY = 'ieba_session';
  var COLLECTIONS = {
    eventos: 'events', atividades: 'activities', comunicados: 'announcements',
    utilizadores: 'users', midia: 'media',
    notificacoes: 'notifications', subscritores: 'subscribers',
    pedidos: 'prayerRequests'
  };
  var LOCAL_KEYS = {};
  Object.keys(COLLECTIONS).forEach(function (k) { LOCAL_KEYS[COLLECTIONS[k]] = k; });

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch (err) { return null; }
  }
  function initials(name) {
    return String(name || 'IEBA').trim().split(/\s+/).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join('');
  }
  function fbReady() {
    var fb = window.IEBAFirebase;
    return !!(fb && fb.enabled && fb.data && fb.auth && fb.auth.currentUser);
  }
  function reloadLater(message) {
    showToast(message || 'Alterações guardadas com sucesso.');
    window.setTimeout(function () { window.location.reload(); }, 700);
  }

  var toast = document.getElementById('admin-toast');
  function showToast(message) {
    if (!toast) { return; }
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  var isLogin = document.body.classList.contains('login-body');
  if (!isLogin) {
    var session = getSession();
    if (!session) { window.location.href = 'login.html'; return; }
    var current = document.body.getAttribute('data-admin-page');
    if (session.role !== 'admin' && current && session.pages && session.pages.indexOf(current) === -1) {
      window.location.href = 'dashboard.html'; return;
    }
    if (session.role !== 'admin') {
      document.querySelectorAll('.admin-nav a[data-page]').forEach(function (a) {
        if (!session.pages || session.pages.indexOf(a.getAttribute('data-page')) === -1) { a.style.display = 'none'; }
      });
    }
    var avatar = document.getElementById('admin-user-initials');
    if (avatar) {
      avatar.textContent = initials(session.name || (session.role === 'admin' ? 'Administrador Geral' : 'Responsável'));
      avatar.title = (session.name || 'Utilizador') + (session.role === 'admin' ? ' — Administrador geral' : ' — Responsável');
    }
  }

  var sidebar = document.getElementById('sidebar');
  var menuBtn = document.querySelector('[data-admin-menu]');
  if (sidebar && menuBtn) {
    menuBtn.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 900 && sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) && !menuBtn.contains(e.target)) { sidebar.classList.remove('open'); }
    });
  }

  var PAGE_COLLECTION = {
    dashboard: 'events', eventos: 'events', cultos: 'services', ministerios: 'ministries',
    atividades: 'activities', midia: 'media', projetos: 'projects', pedidos: 'prayerRequests',
    contactos: 'contactMessages', doacoes: 'donations', utilizadores: 'users',
    auditoria: 'auditLogs', configuracoes: 'siteSettings', comunicados: 'announcements',
    notificacoes: 'notifications'
  };

  document.querySelectorAll('[data-generic-edit]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById('modal-generic');
      if (!modal) { return; }
      var row = btn.closest('tr');
      var cells = row ? row.querySelectorAll('td') : [];
      var titleCell = cells.length ? cells[0].querySelector('.strong') : null;
      var title = titleCell ? titleCell.textContent.trim() : (cells.length ? cells[0].textContent.trim() : 'Registo');
      var description = cells.length > 1 ? cells[1].textContent.trim().slice(0, 200) : '';
      modal.querySelector('[name="title"]').value = title;
      modal.querySelector('[name="description"]').value = description;
      var page = document.body.getAttribute('data-admin-page');
      var collection = PAGE_COLLECTION[page] || 'misc';
      var form = modal.querySelector('form');
      form.setAttribute('data-store-key', collection);
      form.setAttribute('data-store-mode', 'add');
      modal.removeAttribute('data-edit-id');
      modal.classList.add('open');
    });
  });

  document.querySelectorAll('[data-generic-remove]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('tr');
      var cells = row ? row.querySelectorAll('td') : [];
      var strong = cells.length ? cells[0].querySelector('.strong') : null;
      var title = strong ? strong.textContent.trim() : '';
      if (!window.confirm('Remover "' + title + '"?')) { return; }
      var page = document.body.getAttribute('data-admin-page');
      var collection = PAGE_COLLECTION[page] || 'misc';
      if (fbReady() && IEBAFirebase.data) {
        IEBAFirebase.data.list(collection).then(function (items) {
          var found = items.filter(function (x) { return (x.title || x.name) === title; })[0];
          if (found) { return IEBAFirebase.data.remove(collection, found.id).then(function () { reloadLater('Registo removido.'); }); }
          showToast('Registo de exemplo — não existe na base de dados.');
        }).catch(function () { showToast('Erro ao remover.'); });
      } else { showToast('Registo de exemplo.'); }
    });
  });

  var search = document.querySelector('[data-admin-search]');
  if (search) {
    search.addEventListener('input', function () {
      var term = search.value.toLowerCase().trim();
      document.querySelectorAll('[data-search-row]').forEach(function (row) {
        row.classList.toggle('hide-row', term !== '' && row.textContent.toLowerCase().indexOf(term) === -1);
      });
    });
  }

  document.querySelectorAll('.a-filterbar button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.a-card');
      group.querySelectorAll('.a-filterbar button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var value = btn.getAttribute('data-admin-filter');
      group.querySelectorAll('[data-status]').forEach(function (row) {
        row.classList.toggle('hide-row', value !== 'all' && row.getAttribute('data-status') !== value);
      });
    });
  });

  document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById(btn.getAttribute('data-modal-open'));
      if (modal) { modal.classList.add('open'); }
    });
  });
  document.querySelectorAll('.a-modal').forEach(function (modal) {
    var close = function () { modal.classList.remove('open'); };
    var x = modal.querySelector('.a-modal-close');
    if (x) { x.addEventListener('click', close); }
    modal.addEventListener('click', function (e) { if (e.target === modal) { close(); } });
    modal.querySelectorAll('[data-modal-cancel]').forEach(function (b) { b.addEventListener('click', close); });
  });

  function collectForm(form) {
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) { return; }
      var count = 0;
      Array.prototype.forEach.call(form.elements, function (x) { if (x.name === el.name) { count++; } });
      if (count > 1) {
        if (el.checked) { (data[el.name] = data[el.name] || []).push(el.value); }
        else if (!data[el.name]) { data[el.name] = []; }
      } else if (el.type === 'checkbox') { data[el.name] = el.checked; }
      else { data[el.name] = el.value; }
    });
    return data;
  }

  function fillModal(modal, item) {
    Object.keys(item).forEach(function (key) {
      var el = modal.querySelector('[name="' + key + '"]');
      if (!el) { return; }
      if (el.type === 'checkbox') { el.checked = !!item[key]; }
      else { el.value = item[key] == null ? '' : item[key]; }
    });
    if (item.pages) {
      modal.querySelectorAll('[name="pages"]').forEach(function (cb) {
        cb.checked = item.pages.indexOf(cb.value) !== -1;
      });
    }
  }

  function processForm(form) {
      if (form.classList.contains('login-form')) {
        var email = form.querySelector('#login-email').value.trim().toLowerCase();
        var pass = form.querySelector('#login-pass').value;
        function finish(next) {
          if (!next) { showToast('Credenciais inválidas.'); return; }
          localStorage.setItem(SESSION_KEY, JSON.stringify(next));
          window.location.href = 'dashboard.html';
        }
        function localLogin() {
          if (!window.IEBAStore) { finish(null); return; }
          var users = IEBAStore.all('utilizadores');
          for (var i = 0; i < users.length; i++) {
            if (String(users[i].email || '').toLowerCase() === email && users[i].password === pass) {
              finish({ role: users[i].role || 'responsavel', name: users[i].name, email: users[i].email, pages: users[i].pages || [] });
              return;
            }
          }
          finish(null);
        }
        if (window.IEBAFirebase && IEBAFirebase.enabled && IEBAFirebase.sdk) {
          IEBAFirebase.sdk.auth.signInWithEmailAndPassword(IEBAFirebase.auth, email, pass)
            .then(function (cred) { return IEBAFirebase.data.get('users', cred.user.uid); })
            .then(function (doc) {
              if (!doc || (doc.role !== 'admin' && doc.role !== 'leader')) { throw new Error('sem permissao'); }
              finish({ role: doc.role, name: doc.name || email, email: email, pages: doc.pages || [] });
            })
            .catch(function () { localLogin(); });
          return;
        }
        localLogin();
        return;
      }

      var modal = form.closest('.a-modal');
      var storeKey = form.getAttribute('data-store-key');
      if (!storeKey) {
        if (modal) { modal.classList.remove('open'); }
        showToast('Alterações guardadas com sucesso.');
        form.reset();
        return;
      }

      var mode = form.getAttribute('data-store-mode');
      var editId = modal ? modal.getAttribute('data-edit-id') : null;
      var payload = collectForm(form);
      var collection = COLLECTIONS[storeKey] || storeKey;

      if (fbReady()) {
        payload.status = 'published';
        payload.createdBy = IEBAFirebase.auth.currentUser.uid;
        if (!payload.createdAt) { payload.createdAt = new Date().toISOString(); }
        var operation = (mode === 'edit' && editId)
          ? IEBAFirebase.data.update(collection, editId, payload)
          : IEBAFirebase.data.add(collection, payload);
        operation.then(function () {
          if (modal) { modal.classList.remove('open'); modal.removeAttribute('data-edit-id'); }
          reloadLater('Guardado no Firestore com sucesso.');
        }).catch(function (err) {
          showToast('Erro ao guardar: ' + (err && err.message ? err.message.slice(0, 60) : 'desconhecido'));
        });
        return;
      }

      if (mode === 'edit' && editId && IEBAStore) {
        IEBAStore.update(storeKey, editId, payload);
      } else if (IEBAStore) {
        IEBAStore.add(storeKey, payload);
      }
      if (modal) { modal.classList.remove('open'); modal.removeAttribute('data-edit-id'); }
      reloadLater();
  }

  document.querySelectorAll('[data-admin-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (window.IEBA_FIREBASE_CONFIG && !(window.IEBAFirebase && IEBAFirebase.enabled)) {
        var handled = false;
        var timer = null;
        function go() {
          if (handled) { return; }
          handled = true;
          if (timer) { window.clearTimeout(timer); }
          var modal = form.closest('.a-modal');
          if (!document.contains(form) || (modal && !modal.classList.contains('open'))) { return; }
          processForm(form);
        }
        window.addEventListener('ieba:firebase-ready', go, { once: true });
        timer = window.setTimeout(go, 5000);
        showToast('A ligar ao serviço de dados...');
        return;
      }
      processForm(form);
    });
  });

  document.querySelectorAll('[data-toast]').forEach(function (btn) {
    btn.addEventListener('click', function () { showToast(btn.getAttribute('data-toast')); });
  });

  var year = document.getElementById('admin-year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  var PLAN_KEY = 'ieba_plano_progresso';
  function planState() {
    try { return JSON.parse(localStorage.getItem(PLAN_KEY) || '{}'); } catch (err) { return {}; }
  }
  function refreshPlans() {
    var state = planState();
    var totalDone = 0, totalQuarters = 0;
    document.querySelectorAll('[data-plan-dept]').forEach(function (dept) {
      var slug = dept.getAttribute('data-plan-dept');
      var quarters = dept.querySelectorAll('[data-plan-quarter]');
      var done = 0;
      quarters.forEach(function (q) {
        var key = slug + '_' + q.getAttribute('data-plan-quarter');
        var status = state[key] || q.getAttribute('data-default-status');
        var badge = q.querySelector('.a-badge');
        if (badge) { badge.textContent = status; badge.className = 'a-badge ' + (status === 'Concluído' ? 'green' : status === 'Em curso' ? 'gold' : 'gray'); }
        if (status === 'Concluído') { done++; }
      });
      if (!quarters.length) { return; }
      var pct = Math.round(done / quarters.length * 100);
      var label = dept.querySelector('[data-plan-pct]');
      var bar = dept.querySelector('.a-progress span');
      if (label) { label.textContent = pct + '%'; }
      if (bar) { bar.style.width = pct + '%'; }
      totalDone += done; totalQuarters += quarters.length;
      var line = document.querySelector('[data-dept-bar="' + slug + '"]');
      if (line) {
        var lb = line.querySelector('.a-progress span');
        var lp = line.querySelector('[data-dept-pct]');
        if (lb) { lb.style.width = pct + '%'; }
        if (lp) { lp.textContent = pct + '%'; }
      }
    });
    if (totalQuarters) {
      var overall = Math.round(totalDone / totalQuarters * 100);
      var ol = document.getElementById('plan-overall');
      var ring = document.getElementById('plan-overall-ring');
      if (ol) { ol.textContent = overall + '%'; }
      if (ring) { ring.style.background = 'conic-gradient(var(--a-accent) ' + overall + '%, #E9EEF1 0)'; }
    }
  }
  refreshPlans();
  document.querySelectorAll('[data-plan-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var state = planState();
      var badge = btn.closest('.a-plan-quarter').querySelector('.a-badge');
      var current = badge ? badge.textContent : 'Pendente';
      state[btn.getAttribute('data-plan-toggle')] = current === 'Concluído' ? 'Pendente' : 'Concluído';
      localStorage.setItem(PLAN_KEY, JSON.stringify(state));
      showToast('Estado do trimestre atualizado.');
      refreshPlans();
    });
  });

  function openEdit(kind, modalId, id) {
    var modal = document.getElementById(modalId);
    if (!modal) { return; }
    function apply(item) {
      if (!item) { showToast('Registo não encontrado.'); return; }
      fillModal(modal, item);
      modal.setAttribute('data-edit-id', id);
      modal.classList.add('open');
    }
    if (fbReady()) {
      IEBAFirebase.data.get(COLLECTIONS[kind] || kind, id).then(apply).catch(function () { apply(null); });
    } else if (window.IEBAStore) {
      apply(IEBAStore.find(kind, id));
    }
  }

  window.IEBAAdmin = {
    editEvent: function (id) { openEdit('eventos', 'modal-evento-edit', id); },
    editAtividade: function (id) { openEdit('atividades', 'modal-atividade-edit', id); },
    editComunicado: function (id) { openEdit('comunicados', 'modal-comunicado-edit', id); },
    editUser: function (id) { openEdit('utilizadores', 'modal-user-edit', id); },
    editMidia: function (id) { openEdit('midia', 'modal-midia-edit', id); },
    openPrayer: function (id) { openEdit('pedidos', 'modal-pedido', id); },
    toggleFeatured: function (collection, id, current) {
      function done() { reloadLater('Destaque atualizado.'); }
      if (fbReady()) { IEBAFirebase.data.update(collection, id, { featured: !current }).then(done).catch(function () { showToast('Erro ao atualizar.'); }); }
      else { IEBAStore.update(LOCAL_KEYS[collection] || collection, id, { featured: !current }); done(); }
    },
    toggleVisible: function (collection, id, current) {
      function done() { reloadLater('Visibilidade atualizada.'); }
      if (fbReady()) { IEBAFirebase.data.update(collection, id, { visible: !current }).then(done).catch(function () { showToast('Erro ao atualizar.'); }); }
      else { IEBAStore.update(LOCAL_KEYS[collection] || collection, id, { visible: !current }); done(); }
    },
    removeItem: function (collection, id) {
      function done() { reloadLater('Registo removido.'); }
      if (fbReady()) { IEBAFirebase.data.remove(collection, id).then(done).catch(function () { showToast('Erro ao remover.'); }); }
      else { IEBAStore.remove(LOCAL_KEYS[collection] || collection, id); done(); }
    }
  };

  document.querySelectorAll('[data-logout]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.confirm('Terminar a sessão?')) {
        if (window.IEBAFirebase && IEBAFirebase.enabled && IEBAFirebase.sdk) { IEBAFirebase.auth.signOut(); }
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
      }
    });
  });
})();
