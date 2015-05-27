var _ = require('lodash');

var Helpers = {

  getAlterEgoComponent: function getAlterEgoComponent (device) {
    if (device.properties.displayType === 'LAMP') {
      return _.find(device.components, (component) =>
        component.properties.type === 'SOCKET'
      );
    }

    return _.find(device.components, (component) =>
      component.properties.type === device.properties.displayType
    );
  },

  augmentDevice: function augmentDevice (device) {
    var alterEgoComponent = Helpers.getAlterEgoComponent(device);
    var deviceActions = _.indexBy(alterEgoComponent.actions, 'name');
    var primaryCapability = Helpers.getPrimaryCapability(alterEgoComponent);
    return {
      properties: device.properties,
      alterEgoComponent: alterEgoComponent,
      actions: deviceActions,
      primaryCapability: primaryCapability
    };
  },

  getPrimaryCapability: function getPrimaryCapability (component) {
    return component.properties.capabilities[0];
  },

  // TODO: ideally this should be retrieved from the model
  propertyByCapability: {
    SWITCHABLE: 'SWITCHABLE-on',
    SETTABLE: 'setValue'
  },

  getActionForCapability: function getActionForCapability (component, capability, operation) {
    var actionName = operation + '-' + Helpers.propertyByCapability[capability];
    return _.find(component.actions, 'name', actionName);
  }

};


module.exports = Helpers;
