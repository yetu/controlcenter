var Reflux = require('reflux');

var deviceActions = require('actions/device');
var gatewayService = require('services/devices/gateway-service');

module.exports = Reflux.createStore({
  init: function init () {
    this.listenTo(deviceActions.fetchGateway, this.onFetchGateway);
    this.onFetchGateway();
  },

  getInitialState: function getInitialState () {
    // fetch gateway status on each page view
    // as we don't have polling
    this.onFetchGateway();
    return {
      model: {}
    };
  },

  onFetchGateway: function onFetchGateway () {
    var self = this;
    gatewayService.fetchGatewayInfo()
      .subscribe(self.updateModel.bind(self), self.updateError.bind(self));
  },

  updateModel: function updateModel (gateway) {
    this.trigger({
      model: gateway
    });
  },

  updateError: function updateError (error) {
    this.trigger({
      error: error
    });
  }
});
