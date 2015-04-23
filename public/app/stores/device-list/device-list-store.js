var Reflux = require('reflux');
var _ = require('lodash');

var DeviceActions = require('actions/device');
var DevicesService = require('services/devices/devices-service');
var discoveryStore = require('stores/discovery-store');

var DeviceHelpers = require('helpers/device');

var deviceStore = Reflux.createStore({

  init: function init () {
    this.listenTo(discoveryStore, this.onDiscoveryUpdate);
    this.listenTo(DeviceActions.fetchList, this.onFetchList);
    this.listenTo(DeviceActions.invokeAction, this.onInvokeAction);

    this.deviceList = this.createModel([]);
  },

  getInitialState: function getInitialState () {
    if (!this.initialStateRequested) {
      this.initialStateRequested = true;
      this.onFetchList();
    }
    return this.deviceList;
  },

  augmentDevice: function augmentDevice (device) {
    var alterEgoComponent = DeviceHelpers.getAlterEgoComponent(device);
    var deviceActions = _.indexBy(alterEgoComponent.actions, 'name');
    var primaryCapability = DeviceHelpers.getPrimaryCapability(alterEgoComponent);
    return {
      properties: device.properties,
      alterEgoComponent: alterEgoComponent,
      actions: deviceActions,
      primaryCapability: primaryCapability
    };
  },

  createModel: function createModel (devices) {
    var augmentedDevices = _.map(devices, this.augmentDevice);
    return {
      devices: augmentedDevices,
      deviceById: _.indexBy(augmentedDevices, (device) => device.properties.id),
      error: null
    };
  },

  onDiscoveryUpdate: function onDiscoveryUpdate () {
    this.onFetchList();
  },

  onFetchList: function onFetchList () {
    DevicesService.fetchDeviceList().subscribe(this.updateModel, this.updateError);
  },

  onInvokeAction: function doAction (action, data) {
    DevicesService.invokeDeviceAction(action, data)
      .subscribe(
        () => {},
        () => {}
      );
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
