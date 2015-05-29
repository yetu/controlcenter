var Reflux = require('reflux'),
  discoveryService = require('services/devices/discovery-service'),
  discoveryActions = require('actions/discovery');

var DiscoveryStore = Reflux.createStore({

  listenables: discoveryActions,

  getInitialState: function getInitialState () {
    return {};
  },

  update: function update (state, error) {
    this.trigger({ state, error });
  },

  onStartDiscovery: function onStartDiscovery () {
    discoveryService
      .discover()
      .then((state) => {
        this.update(state);
      });
  },

  onStopDiscovery: function onStopDiscovery () {
    discoveryService.stopDiscovery();
  }

});

module.exports = DiscoveryStore;
