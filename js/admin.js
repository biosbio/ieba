(function () {
  'use strict';

  var SESSION_KEY = 'ieba_session';

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch (err) { return null; }
  }

  function initials(name) {
    return String(name || 'IEBA').trim().split(/\s+/).slice(0, 2).map(function (p) {
      return p.charAt(0).toUpperCase();
    }).join('');
  }

  var toast = document.getElementById('admin-toast');
  function showToast(message) {
    if (!toast) return;
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
      window.location.href = 'dashboard.html';
      return;
    }

    if (session.role !== 'admin') {
      document.querySelectorAll('.admin-nav a[data-page]').forEach(function (a) {
        if (!session.pages || session.pages.indexOf(a.getAttribute('data-page')) === -1) {
          a.style.display = 'none';
        }
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
          !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

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
      if (modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('.a-modal').forEach(function (modal) {
    var close = function () { modal.classList.remove('open'); };
    var x = modal.querySelector('.a-modal-close');
    if (x) x.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    modal.querySelectorAll('[data-modal-cancel]').forEach(function (b) { b.addEventListener('click', close); });
  });

  function collectForm(form) {
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      var count = 0;
      Array.prototype.forEach.call(form.elements, function (x) { if (x.name === el.name) { count++; } });
      if (count > 1) {
        if (el.checked) { (data[el.name] = data[el.name] || []).push(el.value); }
        else if (!data[el.name]) { data[el.name] = []; }
      } else if (el.type === 'checkbox') {
        data[el.name] = el.checked;
      } else {
        data[el.name] = el.value;
      }
    });
    return data;
  }

  document.querySelectorAll('[data-admin-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (form.classList.contains('login-form')) {
        var email = form.querySelector('#login-email').value.trim().toLowerCase();
        var pass = form.querySelector('#login-pass').value;

        function finish(next) {
          if (!next) { showToast('Credenciais inválidas. Verifique o email e a palavra-passe.'); return; }
          localStorage.setItem(SESSION_KEY, JSON.stringify(next));
          window.location.href = 'dashboard.html';
        }
        function localLogin() {
          var next = null;
          if (window.IEBAStore) {
            var users = IEBAStore.all('utilizadores');
            for (var i = 0; i < users.length; i++) {
              var u = users[i];
              if (String(u.email || '').toLowerCase() === email && u.password === pass) {
                next = { role: u.role || 'responsavel', name: u.name, email: u.email, pages: u.pages || [] };
                break;
              }
            }
          }
          finish(next);
        }

        var fb = window.IEBAFirebase;
        if (fb && fb.enabled && fb.sdk) {
          fb.sdk.auth.signInWithEmailAndPassword(fb.auth, email, pass)
            .then(function (cred) {
              return fb.sdk.firestore.getDoc(fb.sdk.firestore.doc(fb.db, 'users', cred.user.uid));
            })
            .then(function (snap) {
              var d = snap.data() || {};
              finish({ role: d.role || 'leader', name: d.name || email, email: email, pages: d.pages || [] });
            })
            .catch(function () { localLogin(); });
          return;
        }
        localLogin();
        return;
      }

      var modal = form.closest('.a-modal');
      var storeKey = form.getAttribute('data-store-key');
      if (storeKey && window.IEBAStore) {
        var editId = modal ? modal.getAttribute('data-edit-id') : null;
        if (storeKey === 'utilizadores' && editId && IEBAStore.update) {
          IEBAStore.update('utilizadores', editId, collectForm(form));
          modal.removeAttribute('data-edit-id');
        } else {
          IEBAStore.add(storeKey, collectForm(form));
        }
        if (modal) modal.classList.remove('open');
        showToast('Registo guardado com sucesso.');
        window.setTimeout(function () { window.location.reload(); }, 600);
        return;
      }
      if (modal) modal.classList.remove('open');
      showToast('Alterações guardadas com sucesso.');
      form.reset();
    });
  });

  document.querySelectorAll('[data-toast]').forEach(function (btn) {
    btn.addEventListener('click', function () { showToast(btn.getAttribute('data-toast')); });
  });

  var year = document.getElementById('admin-year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('.a-bar').forEach(function (bar) {
    var target = bar.getAttribute('data-height') || '50%';
    window.setTimeout(function () { bar.style.height = target; }, 120);
  });

  var PLAN_KEY = 'ieba_plano_progresso';
  function planState() {
    try { return JSON.parse(localStorage.getItem(PLAN_KEY) || '{}'); }
    catch (err) { return {}; }
  }
  function refreshPlans() {
    var state = planState();
    var totalDone = 0;
    var totalQuarters = 0;
    document.querySelectorAll('[data-plan-dept]').forEach(function (dept) {
      var slug = dept.getAttribute('data-plan-dept');
      var quarters = dept.querySelectorAll('[data-plan-quarter]');
      var done = 0;
      quarters.forEach(function (q) {
        var key = slug + '_' + q.getAttribute('data-plan-quarter');
        var status = state[key] || q.getAttribute('data-default-status');
        var badge = q.querySelector('.a-badge');
        if (badge) {
          badge.textContent = status;
          badge.className = 'a-badge ' + (status === 'Concluído' ? 'green' : status === 'Em curso' ? 'gold' : 'gray');
        }
        if (status === 'Concluído') { done++; }
      });
      if (!quarters.length) { return; }
      var pct = Math.round(done / quarters.length * 100);
      var label = dept.querySelector('[data-plan-pct]');
      var bar = dept.querySelector('.a-progress span');
      if (label) { label.textContent = pct + '%'; }
      if (bar) { bar.style.width = pct + '%'; }
      totalDone += done;
      totalQuarters += quarters.length;

      var deptLine = document.querySelector('[data-dept-bar="' + slug + '"]');
      if (deptLine) {
        var deptBar = deptLine.querySelector('.a-progress span');
        var deptPct = deptLine.querySelector('[data-dept-pct]');
        if (deptBar) { deptBar.style.width = pct + '%'; }
        if (deptPct) { deptPct.textContent = pct + '%'; }
      }
    });

    if (totalQuarters) {
      var overall = Math.round(totalDone / totalQuarters * 100);
      var overallLabel = document.getElementById('plan-overall');
      var ring = document.getElementById('plan-overall-ring');
      if (overallLabel) { overallLabel.textContent = overall + '%'; }
      if (ring) { ring.style.background = 'conic-gradient(var(--a-accent) ' + overall + '%, #E9EEF1 0)'; }
    }
  }
  refreshPlans();
  document.querySelectorAll('[data-plan-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var state = planState();
      var quarter = btn.closest('.a-plan-quarter');
      var badge = quarter.querySelector('.a-badge');
      var current = badge ? badge.textContent : 'Pendente';
      state[btn.getAttribute('data-plan-toggle')] = current === 'Concluído' ? 'Pendente' : 'Concluído';
      localStorage.setItem(PLAN_KEY, JSON.stringify(state));
      showToast('Estado do trimestre atualizado.');
      refreshPlans();
    });
  });

  window.IEBAAdmin = {
    editUser: function (id) {
      if (!window.IEBAStore) { return; }
      var user = IEBAStore.find('utilizadores', id);
      var modal = document.getElementById('modal-user-edit');
      if (!user || !modal) { return; }
      modal.querySelector('[name="name"]').value = user.name || '';
      modal.querySelector('[name="email"]').value = user.email || '';
      modal.querySelector('[name="password"]').value = user.password || '';
      modal.querySelectorAll('[name="pages"]').forEach(function (cb) {
        cb.checked = (user.pages || []).indexOf(cb.value) !== -1;
      });
      modal.setAttribute('data-edit-id', id);
      modal.classList.add('open');
    }
  };

  document.querySelectorAll('[data-logout]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.confirm('Terminar a sessão do painel administrativo?')) {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
      }
    });
  });
})();
