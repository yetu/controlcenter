var Reflux = require('reflux'),
  _ = require('lodash');

var deviceActions = require('../../actions/device');
var discoveryStore = require('stores/discovery-store');

var deviceStore = Reflux.createStore({
  init: function init () {
    this.listenTo(discoveryStore, this.onDiscoveryUpdate);
    this.listenTo(deviceActions.fetchList, this.onFetchList);

    this.deviceList = {
      model: {},
      error: {}
    };
  },

  getInitialState: function getInitialState () {
    return this.deviceList;
  },

  onDiscoveryUpdate: function onDisoveryUpdate (discoveryData) {
    this.onFetchList();
  },

  onFetchList: function onFetchList () {
    console.log('onFetchList  Service call here...');
  },

  updateModel: function updateModel (model) {
    this.deviceList = {
      model: model
    };
    this.trigger(this.userData);
  },

  updateError: function updateError (error) {
    this.deviceList = {
      error: error
    };

    this.trigger(this.deviceList);
  }
});

module.exports = deviceStore;
