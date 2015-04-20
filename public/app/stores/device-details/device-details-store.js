var Reflux = require('reflux');
var _ = require('lodash');

var DeviceActions = require('actions/device');
var DevicesService = require('services/devices/devices-service');

var DeviceHelpers = require('helpers/device');

var deviceDetailsStore = Reflux.createStore({

  init: function init () {
    this.listenTo(DeviceActions.fetchDeviceById, this.onFetchDeviceById);
    this.listenTo(DeviceActions.invokeAction, this.onInvokeAction);

    this.device = this.createModel();
  },

  getInitialState: function getInitialState () {
    return this.device;
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

  createModel: function createModel (device) {
    return {
      model: device ? this.augmentDevice(device) : null,
      error: null
    };
  },

  onFetchDeviceById: function onFetchDeviceById (deviceId) {
    DevicesService.fetchDeviceById(deviceId).subscribe(this.updateModel, this.updateError);
  },

  onInvokeAction: function doAction (action, data) {
    DevicesService.invokeDeviceAction(action, data)
      .subscribe(
        () => {},
        () => {}
      );
  },

  updateModel: function updateModel (device) {
    this.device = this.createModel(device);
    this.trigger(this.device);
  },

  updateError: function updateError (error) {
    this.device = {
      error: error
    };
    this.trigger(this.device);
  }
});

module.exports = deviceDetailsStore;
