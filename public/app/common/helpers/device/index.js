var _ = require('lodash');

var Helpers = {

  getAlterEgoComponent: function getAlterEgoComponent (device) {
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
    return component.properties.capabilities[0].toLowerCase();
  },

  // TODO: ideally this should be retrieved from the model
  propertyByCapability: {
    switchable: 'on',
    settable: 'setValue'
  },

  getActionForProperty: function getActionForProperty (component, propertyName, operation) {
    return component.actions[operation + '-' + propertyName];
  }

};


module.exports = Helpers;
