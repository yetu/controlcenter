var Reflux = require('reflux');

var deviceActions = Reflux.createActions([
  'fetchList',
  'fetchDeviceById',
  'fetchGateway',
  'invokeAction'
]);

module.exports = deviceActions;
