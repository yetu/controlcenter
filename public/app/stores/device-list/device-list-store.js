var Reflux = require('reflux');
var _ = require('lodash');

var deviceActions = require('actions/device');
var devicesService = require('services/devices/devices-service');
var discoveryStore = require('stores/discovery-store');

var deviceStore = Reflux.createStore({
  init: function init () {
    this.listenTo(discoveryStore, this.onDiscoveryUpdate);
    this.listenTo(deviceActions.fetchList, this.onFetchList);

    var devices = [
      {
        id: '0',
        name: 'yetu Home Gateway',
        type: 'Home Gateway',
        state: 'connected',
        description: 'test description'
      },
      {
        id: '1',
        name: 'Nest',
        type: 'Thermostat',
        state: 'not conn.',
        description: 'test description'
      },
      {
        id: '2',
        name: 'Nest',
        type: 'Thermostat',
        state: 'connected',
        description: 'test description'
      }
    ];

    this.deviceList = {
      devices: devices,
      deviceById: _.indexBy(devices, 'id'),
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
    devicesService.fetchDeviceList()
      .subscribe(self.updateModel.bind(self),
      self.updateError.bind(self));
  },

  updateModel: function updateModel (devices) {
    this.deviceList = {
      devices: devices,
      deviceById: _.indexBy(devices, 'id'),
      error: null
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
