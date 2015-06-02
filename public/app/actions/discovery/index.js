var Reflux = require('reflux');

var discoveryActions = Reflux.createActions([
  'startDiscovery',
  'stopDiscovery',
  'removeDevice'
]);

module.exports = discoveryActions;
