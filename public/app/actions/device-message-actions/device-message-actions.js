var Reflux = require('reflux');

var deviceMessageActions = Reflux.createActions([
  'pushMessage',
  'clearMessage'
]);

deviceMessageActions.Levels = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
};

module.exports = deviceMessageActions;
