var Reflux = require('reflux');

var deviceActions = Reflux.createActions([
  'fetchList',
  'fetchDeviceById',
  'fetchGateway',
  'invokeAction',
  'delete'
]);

module.exports = deviceActions;
