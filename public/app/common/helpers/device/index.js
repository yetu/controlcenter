var _ = require('lodash');

module.exports = {

  getAlterEgoComponent: function getAlterEgoComponent (device) {
    return _.find(device.components, (component) =>
      component.properties.type === device.properties.displayType
    );
  },

  getPrimaryCapability: function getPrimaryCapability (component) {
    return component.properties.capabilities[0];
  },

  // ideally this should be retrieved from the model
  propertyByCapability: {
    switchable: 'on',
    settable: 'setValue'
  },

  getActionForProperty: function getActionForProperty (component, propertyName, operation) {
    return component.actions[operation + '-' + propertyName];
  }

};
