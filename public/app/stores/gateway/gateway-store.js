var Reflux = require('reflux');
var _ = require('lodash');

var ConfigHelpers = require('helpers/config');
var deviceActions = require('actions/device');
var gatewayService = require('services/devices/gateway-service');

module.exports = Reflux.createStore({
  init: function init () {
    this.listenTo(deviceActions.fetchGateway, this.onFetchGateway);
    this.onFetchGateway();
  },

  createModel: function createModel (data) {
    return _.assign(data, {
      setupAppUrl: ConfigHelpers.getSetupAppUrl()
    });
  },

  getInitialState: function getInitialState () {
    // fetch gateway status on each page view
    // as we don't have polling
    this.onFetchGateway();
    return {
      model: this.createModel({})
    };
  },

  onFetchGateway: function onFetchGateway () {
    gatewayService.fetchGatewayInfo()
      .subscribe(this.updateModel, this.updateError);
  },

  updateModel: function updateModel (gatewayData) {
    var model = this.createModel(gatewayData);
    this.trigger({
      model: model
    });
  },

  updateError: function updateError (error) {
    this.trigger({
      error: error
    });
  }
});
