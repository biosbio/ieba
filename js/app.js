(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('.has-dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          var menu = a.parentElement.querySelector('.dropdown-menu');
          if (menu) menu.classList.toggle('open');
        }
      });
    });
    nav.addEventListener('click', function (e) {
      if (window.innerWidth <= 860 && e.target.closest('a:not(.has-dropdown > a)')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    if (!track) return;
    var step = function () {
      var first = track.querySelector('*');
      return first ? first.getBoundingClientRect().width + 20 : 320;
    };
    var prev = root.querySelector('.carousel-prev');
    var next = root.querySelector('.carousel-next');
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  });

  document.querySelectorAll('[data-carousel-auto]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    if (!track) return;
    var originals = Array.prototype.slice.call(track.querySelectorAll('[data-slide]'));
    if (!originals.length) return;
    originals.forEach(function (el) {
      var clone = el.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      track.appendChild(clone);
    });
    var count = originals.length;
    var index = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;
    function stepWidth() {
      var gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      return originals[0].getBoundingClientRect().width + gap;
    }
    function apply(animate) {
      track.style.transition = animate ? 'transform 0.7s ease' : 'none';
      track.style.transform = 'translateX(-' + (index * stepWidth()) + 'px)';
    }
    function goNext() { index += 1; apply(true); }
    function goPrev() { index = index <= 0 ? count - 1 : index - 1; apply(true); }
    track.addEventListener('transitionend', function () {
      if (index >= count) { index = 0; apply(false); void track.offsetWidth; }
      else if (index < 0) { index = count - 1; apply(false); void track.offsetWidth; }
    });
    var prev = root.querySelector('.carousel-prev');
    var next = root.querySelector('.carousel-next');
    if (prev) prev.addEventListener('click', goPrev);
    if (next) next.addEventListener('click', goNext);
    function start() { if (timer || reduce) return; timer = window.setInterval(goNext, 3200); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () { if (document.hidden) { stop(); } else { start(); } });
    start();
  });

  var lightbox = document.getElementById('lightbox');
  var lbTitle = document.getElementById('lightbox-title');
  var lbVisual = document.getElementById('lightbox-visual');
  if (lightbox) {
    document.querySelectorAll('[data-gallery-item]').forEach(function (item) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      function open() {
        if (lbTitle) lbTitle.textContent = item.getAttribute('data-title') || 'Fotografia';
        if (lbVisual) {
          lbVisual.className = 'lightbox-visual ' + (item.getAttribute('data-tone') || '');
          lbVisual.textContent = item.getAttribute('data-title') || 'Fotografia da IEBA';
        }
        lightbox.classList.add('open');
      }
      item.addEventListener('click', open);
      item.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    function close() { lightbox.classList.remove('open'); }
    var lbClose = document.getElementById('lightbox-close');
    if (lbClose) lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var value = btn.getAttribute('data-filter');
        document.querySelectorAll('[data-filter-item]').forEach(function (item) {
          var show = value === 'all' || (item.getAttribute('data-filter-item') || '').split(' ').indexOf(value) !== -1;
          item.classList.toggle('hide', !show);
        });
      });
    });
  }

  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var msg = form.querySelector('.form-msg');
      if (msg) {
        msg.className = 'form-msg ok';
        msg.textContent = 'Formulário preparado. O envio real será ativado após a configuração do Firebase e das regras de segurança.';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  });

  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });

  var backTop = document.getElementById('back-top');
  if (backTop) {
    var onScroll = function () { backTop.classList.toggle('show', window.scrollY > 500); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
