/* ============================================================
   IEBA — js/firebase.js
   Inicialização opcional do Firebase (plano Spark).

   Só ativa quando firebase/config.js define window.IEBA_FIREBASE_CONFIG.
   Sem configuração, o site continua a funcionar com o modo local
   (localStorage) para demonstração.
   ============================================================ */
(function () {
  'use strict';

  window.IEBAFirebase = { enabled: false, auth: null, db: null, app: null };

  var config = window.IEBA_FIREBASE_CONFIG;
  if (!config || !config.apiKey || config.apiKey.indexOf('SUBSTITUIR') !== -1) { return; }

  var base = 'https://www.gstatic.com/firebasejs/11.6.0/';
  Promise.all([
    import(base + 'firebase-app.js'),
    import(base + 'firebase-auth.js'),
    import(base + 'firebase-firestore.js'),
    import(base + 'firebase-app-check.js')
  ]).then(function (mods) {
    var app = mods[0].initializeApp(config);
    var auth = mods[1].getAuth(app);
    var db = mods[2].getFirestore(app);
    window.IEBAFirebase = { enabled: true, app: app, auth: auth, db: db, appCheck: mods[3], sdk: { auth: mods[1], firestore: mods[2] } };
    window.dispatchEvent(new CustomEvent('ieba:firebase-ready'));
  }).catch(function (err) {
    console.warn('Firebase não inicializado:', err);
  });
})();
