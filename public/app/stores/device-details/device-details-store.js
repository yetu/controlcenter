var Reflux = require('reflux');

var DeviceActions = require('actions/device');
var DeviceDetailsActions = require('actions/device-details');
var DevicesService = require('services/devices/devices-service');

var Thing = require('models/thing');

var deviceListStore = require('stores/device-list');
var deviceDetailsStore = Reflux.createStore({

  init: function init () {
    this.listenTo(DeviceActions.fetchDeviceById, this.onFetchDeviceById);
    this.listenTo(DeviceDetailsActions.edit, this.onDeviceDetailsEdit);
    this.listenTo(DeviceDetailsActions.save, this.onDeviceDetailsSave);
    this.listenTo(deviceListStore, this.onDeviceListStoreUpdate);

    this.device = this.createModel();
  },

  getInitialState: function getInitialState () {
    return this.device;
  },

  createModel: function createModel (device, viewmodel) {

    viewmodel = viewmodel || {
      editables: {
        name: false
      }
    };

    return {
      viewmodel: viewmodel,
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
        .then(this.augmentAndUpdateDevice, this.updateError);
    }
  },

  onDeviceDetailsEdit: function onDeviceDetailsEdit (editable) {
    var state = this.device.viewmodel.editables[editable];
    this.device.viewmodel.editables[editable] = !state;
    this.trigger(this.device);
  },

  onDeviceDetailsSave: function onDeviceDetailsSave (data) {
    var key = Object.keys(data)[0];
    this.device.model.properties[key] = data[key];
    this.trigger(this.device);
    DevicesService.updateProperties(this.device.model, data);
  },

  augmentAndUpdateDevice: function augmentAndUpdateDevice (device) {
    this.updateModel(new Thing(device));
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
