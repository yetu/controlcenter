var Reflux = require('reflux');

var deviceMessageActions = Reflux.createActions([
  'pushMessage'
]);

// TODO: Is it a good place to define levels?
// TODO: ...Emitters of these actions however always include this file, so it makes sense to also provide levels
deviceMessageActions.Levels = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
};

module.exports = deviceMessageActions;
