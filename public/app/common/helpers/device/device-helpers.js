var _ = require('lodash');

var hiddenDeviceFilters = [
  function isNestWebservice (device) {
    // TODO: Use a more sophisticated way to identify the nest webservice device
    return device.properties.name === 'WEBSERVICE oauth';
  }
];

var Helpers = {

  augmentDevice: function augmentDevice (device) {
    var alterEgoComponent = Helpers.getAlterEgoComponent(device);
    var deviceActions = _.indexBy(alterEgoComponent.actions, 'name');
    var primaryCapability = Helpers.getPrimaryCapability(alterEgoComponent);
    var hidden = Helpers.isHiddenDevice(device);
    return {
      properties: device.properties,
      alterEgoComponent: alterEgoComponent,
      actions: deviceActions,
      primaryCapability: primaryCapability,
      hidden: hidden
    };
  },

  getAlterEgoComponent: function getAlterEgoComponent (device) {
    // TODO: remove this ugly hack when mainComponentId is there
    if (device.properties.displayType === 'LAMP') {
      return _.find(device.components, (component) =>
        component.properties.type === 'SOCKET'
      );
    }

    return _.find(device.components, (component) =>
      component.properties.type === device.properties.displayType
    );
  },

  getPrimaryCapability: function getPrimaryCapability (component) {
    return component.properties.capabilities[0];
  },

  isHiddenDevice: function isHiddenDevice (device) {
    return _.reduce(hiddenDeviceFilters, (rejected, isHidden) => rejected || isHidden(device), false);
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
