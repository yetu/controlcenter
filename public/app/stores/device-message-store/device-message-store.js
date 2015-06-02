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

  onPushMessage: function onPushMessage (message) {
    this.message = message;
    this.trigger(this.message);
  }
});

module.exports = DeviceMessageStore;
