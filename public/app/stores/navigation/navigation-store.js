var React = require('react');
var Reflux = require('reflux');

var _items = [
  {title: "My devices", linkTo: "devices"},
  {title: "My settings", linkTo: "settings"}
];

var navigationStore = Reflux.createStore({
  getItems: function () {
    // We don't want callers to modify this array, thus we return a fresh copy
    return _items.slice();
  }
});

module.exports = navigationStore;
