var Reflux = require('reflux'),
  deviceDiscovery = require('servcies/devices/discovery-service'),
  userDataActions = require('actions/discovery');

var DiscoveryStore = Reflux.createStore({

  listenables: userDataActions,

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
      self.updateError(error)
    });
  },

  onRemoveDevice: function cancelDiscovery () {
    deviceDiscovery.cancelDiscovery();
  },

  updateModel: function updateModel (model) {
    this.discoveryData = {
      model: model
    };
    this.trigger(this.userData);
  },

  updateError: function updateError (error) {
    this.discoveryData = {
      error: error
    };

    this.trigger(this.discoveryData);
  }
});

module.exports = DiscoveryStore;
