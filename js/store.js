window.IEBAStore = {
  prefix: 'ieba_',
  key: function (name) { return this.prefix + name; },
  all: function (name) {
    try { return JSON.parse(localStorage.getItem(this.key(name)) || '[]'); }
    catch (err) { return []; }
  },
  add: function (name, item) {
    var items = this.all(name);
    item.id = item.id || ('local_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));
    item.createdAt = new Date().toISOString();
    items.unshift(item);
    localStorage.setItem(this.key(name), JSON.stringify(items));
    return item;
  },
  update: function (name, id, patch) {
    var items = this.all(name).map(function (item) {
      if (item.id === id) {
        Object.keys(patch).forEach(function (key) { item[key] = patch[key]; });
        item.updatedAt = new Date().toISOString();
      }
      return item;
    });
    localStorage.setItem(this.key(name), JSON.stringify(items));
    return items;
  },
  find: function (name, id) {
    return this.all(name).filter(function (item) { return item.id === id; })[0] || null;
  },
  remove: function (name, id) {
    var items = this.all(name).filter(function (x) { return x.id !== id; });
    localStorage.setItem(this.key(name), JSON.stringify(items));
  }
};
