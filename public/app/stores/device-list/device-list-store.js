var Reflux = require('reflux'),
  _ = require('lodash');

var deviceActions = require('actions/device');
var devicesService = require('servcies/devices/devices-service');
var discoveryStore = require('stores/discovery-store');

var deviceStore = Reflux.createStore({
  init: function init () {
    this.listenTo(discoveryStore, this.onDiscoveryUpdate);
    this.listenTo(deviceActions.fetchList, this.onFetchList);

    this.deviceList = {
      model: [],
      error: null
    };
    this.onFetchList();
  },

  getInitialState: function getInitialState () {
    return this.deviceList;
  },

  onDiscoveryUpdate: function onDisoveryUpdate () {
    this.onFetchList();
  },

  onFetchList: function onFetchList () {
    var self = this;
    devicesService.fetchDeviceList().subscribe(function onNext (next) {
      self.updateModel(next);
    }, function onError (error) {
      self.updateError(error);
    });
  },

  updateModel: function updateModel (model) {
    this.deviceList = {
      model: model
    };
    this.trigger(this.deviceList);
  },

  updateError: function updateError (error) {
    this.deviceList = {
      error: error
    };

    this.trigger(this.deviceList);
  }
});

module.exports = deviceStore;
