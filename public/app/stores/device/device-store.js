var Reflux = require('reflux');

var deviceActions = require('../../actions/device');
var discoveryStore = require('stores/discovery-store');

var deviceStore = Reflux.createStore({
  init: function init () {
    this.listenTo(deviceActions.fetchOne, this.onFetchDeviceInfo);

    this.deviceInfo = {
      model: {
        devices: []
      },
      error: {}
    };
  },

  getInitialState: function getInitialState () {
    return this.deviceInfo;
  },

  onFetchDeviceInfo: function onFetchDeviceInfo () {
    console.log('Service call here');
  },

  updateModel: function updateModel (model) {
    this.deviceInfo = {
      model: model
    };
    this.trigger(this.userData);
  },

  updateError: function updateError (error) {
    this.deviceInfo = {
      error: error
    };

    this.trigger(this.deviceInfo);
  }
});

module.exports = deviceStore;
