var Reflux = require('reflux');
var _ = require('lodash');

var DeviceActions = require('actions/device');
var DevicesService = require('services/devices/devices-service');

var DeviceHelpers = require('helpers/device');

var deviceListStore = require('stores/device-list');
var deviceDetailsStore = Reflux.createStore({

  init: function init () {
    this.listenTo(DeviceActions.fetchDeviceById, this.onFetchDeviceById);
    this.listenTo(DeviceActions.invokeAction, this.onInvokeAction);
    this.listenTo(deviceListStore, this.onDeviceListStoreUpdate);

    this.device = this.createModel();
  },

  getInitialState: function getInitialState () {
    return this.device;
  },

  createModel: function createModel (device) {
    return {
      model: device || null,
      error: null
    };
  },

  onDeviceListStoreUpdate: function onDeviceListStoreUpdate (data) {
    this.deviceById = data.deviceById;
  },

  onFetchDeviceById: function onFetchDeviceById (deviceId) {
    if (this.deviceById && this.deviceById[deviceId]) {
      this.updateModel(this.deviceById[deviceId]);
    } else {
      DevicesService
        .fetchDeviceById(deviceId)
        .subscribe(this.augmentAndUpdateDevice, this.updateError);
    }
  },

  augmentAndUpdateDevice: function augmentAndUpdateDevice (device) {
    this.updateModel(DeviceHelpers.augmentDevice(device));
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
