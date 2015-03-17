var Reflux = require('reflux');

var discoveryActions = Reflux.createActions([
  'addDevice',
  'stopDiscovery',
  'removeDevice'
]);

module.exports = discoveryActions;
