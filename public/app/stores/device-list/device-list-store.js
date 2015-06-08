var Reflux = require('reflux');
var _ = require('lodash');

var DeviceActions = require('actions/device');
var DevicesService = require('services/devices/devices-service');
var discoveryStore = require('stores/discovery-store');

var DeviceHelpers = require('helpers/device');

var deviceStore = Reflux.createStore({

  init: function init () {
    this.listenTo(discoveryStore, this.onDiscoveryStateChange);
    this.listenTo(DeviceActions.fetchList, this.onFetchList);
    this.listenTo(DeviceActions.invokeAction, this.onInvokeAction);
    this.listenTo(DeviceActions.delete, this.onDelete);

    this.deviceList = this.createModel([]);
  },

  getInitialState: function getInitialState () {
    if (!this.initialStateRequested) {
      this.initialStateRequested = true;
      this.onFetchList();
    }
    return this.deviceList;
  },

  createModel: function createModel (devices) {
    var augmentedDevices = _.map(devices, DeviceHelpers.augmentDevice);
    return {
      devices: augmentedDevices,
      deviceById: _.indexBy(augmentedDevices, (device) => device.properties.id),
      error: null
    };
  },

  onDiscoveryStateChange: function onDiscoveryStateChange () {
    this.onFetchList();
  },

  onFetchList: function onFetchList () {
    DevicesService.fetchDeviceList().then(this.updateModel, this.updateError);
  },

  onInvokeAction: function doAction (action, data) {
    DevicesService.invokeDeviceAction(action, data)
      .subscribe(
        () => {},
        () => {}
      );
  },

  onDelete: function onDelete (device) {
    DevicesService
      .deleteDevice(device)
      .then(this.onFetchList);
  },

  updateModel: function updateModel (devices) {
    this.deviceList = this.createModel(devices);
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
