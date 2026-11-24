/* ============================================================
   IEBA — js/firebase.js
   Inicialização do Firebase (plano Spark) e camada de dados.

   Só ativa quando firebase/config.js define window.IEBA_FIREBASE_CONFIG.
   Sem configuração, o site usa o modo local (localStorage).
   ============================================================ */
(function () {
  'use strict';

  window.IEBAFirebase = { enabled: false, auth: null, db: null, app: null, data: null };

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
    var fs = mods[2];

    var data = {
      list: function (collection) {
        return fs.getDocs(fs.collection(db, collection)).then(function (snap) {
          return snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
        });
      },
      add: function (collection, obj) {
        return fs.addDoc(fs.collection(db, collection), obj).then(function (ref) { return ref.id; });
      },
      update: function (collection, id, obj) {
        return fs.updateDoc(fs.doc(db, collection, id), obj);
      },
      remove: function (collection, id) {
        return fs.deleteDoc(fs.doc(db, collection, id));
      },
      get: function (collection, id) {
        return fs.getDoc(fs.doc(db, collection, id)).then(function (snap) {
          return snap.exists() ? Object.assign({ id: snap.id }, snap.data()) : null;
        });
      }
    };

    window.IEBAFirebase = {
      enabled: true, app: app, auth: auth, db: db, appCheck: mods[3], data: data,
      sdk: { auth: mods[1], firestore: mods[2] }
    };
    window.dispatchEvent(new CustomEvent('ieba:firebase-ready'));
  }).catch(function (err) {
    console.warn('Firebase não inicializado:', err);
  });
})();
