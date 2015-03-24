var Reflux = require('reflux'),
  deviceDiscovery = require('services/devices/discovery-service'),
  deviceDiscoveryActions = require('actions/discovery');

var DiscoveryStore = Reflux.createStore({

  listenables: deviceDiscoveryActions,

  init: function init () {
    this.discoveryData = {
      model: {},
      error: {}
    };
  },

  getInitialState: function getInitialState () {
    return this.discoveryData;
  },

  onAddDevice: function startDiscovery () {
    var self = this;
    deviceDiscovery.startDiscovery().subscribe(function onNext (next) {
      self.updateModel(next);
    }, function onError (error) {
      console.error('Error', error);
      self.updateError(error);
    });
  },

  onStopDiscovery: function onStopDiscovery () {
    deviceDiscovery.cancelDiscovery();
  },

  updateModel: function updateModel (model) {
    this.discoveryData = {
      model: model
    };
    this.trigger(this.discoveryData);
  },

  updateError: function updateError (error) {
    this.discoveryData = {
      error: error
    };

    this.trigger(this.discoveryData);
  }
});

module.exports = DiscoveryStore;
