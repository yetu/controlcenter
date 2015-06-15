var Reflux = require('reflux');
var _ = require('lodash');

var DeviceActions = require('actions/device');
var DevicesService = require('services/devices/devices-service');
var discoveryStore = require('stores/discovery-store');

var Thing = require('models/thing');

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
    var things = _.map(devices, (data) => new Thing(data))
      .sort(function comparator (firstDevice, secondDevice) {
        var result = firstDevice.properties.name.localeCompare(secondDevice.properties.name);
        if (result === 0) {
          return firstDevice.properties.id.localeCompare(secondDevice.properties.id);
        }
        return result;
      });
    return {
      devices: things,
      deviceById: _.indexBy(things, (device) => device.properties.id),
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
      .then(
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
