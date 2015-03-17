var Reflux = require('reflux');

var deviceActions = Reflux.createActions([
  'fetchList',
  'fetchOne'
]);

module.exports = deviceActions;
