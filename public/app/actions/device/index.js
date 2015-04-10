var Reflux = require('reflux');

var deviceActions = Reflux.createActions([
  'fetchList',
  'fetchOne',
  'fetchGateway'
]);

module.exports = deviceActions;
