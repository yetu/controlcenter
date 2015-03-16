var Reflux = require('reflux');

var _items = [
  { title: 'Devices', image: 'devices', linkTo: 'devices' },
  { title: 'Settings', image: 'settings', linkTo: 'settings' }
];

var navigationStore = Reflux.createStore({
  getItems: function getItems () {
    // We don't want callers to modify this array, thus we return a fresh copy
    return _items.slice();
  }
});

module.exports = navigationStore;
