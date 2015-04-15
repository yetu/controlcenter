var Reflux = require('reflux');

var deviceActions = Reflux.createActions([
  'fetchList',
  'fetchOne',
  'fetchGateway',
  'invokeAction'
]);

module.exports = deviceActions;
