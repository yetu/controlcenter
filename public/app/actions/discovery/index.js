var Reflux = require('reflux');

var discoveryActions = Reflux.createActions([
  'addDevice',
  'removeDevice'
]);

module.exports = discoveryActions;
