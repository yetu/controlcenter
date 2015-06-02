var Reflux = require('reflux');
var deviceMessageActions = require('actions/device-message-actions');

var DeviceMessageStore = Reflux.createStore({

  listenables: deviceMessageActions,

  init: function init () {
    this.message = null;
  },

  getInitialState: function getInitialState () {
    return {
      message: this.message
    };
  },

  onPushMessage: function onPushMessage (text, level) {
    this.message = {
      text: text,
      level: level || deviceMessageActions.Levels.INFO
    };
    this.trigger(this.message);
  }
});

DeviceMessageStore.Levels = deviceMessageActions.Levels;

module.exports = DeviceMessageStore;
