var Reflux = require('reflux');

var deviceActions = Reflux.createActions([
  'addDevice',
  'removeDevice'
]);

module.exports = deviceActions;
