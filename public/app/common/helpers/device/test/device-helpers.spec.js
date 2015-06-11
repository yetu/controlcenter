var _ = require('lodash');
var DeviceHelpers = require('../');
var mock = require('./device-helpers.mock');

describe('DeviceHelpers', function () {

  var device = mock.extractProperties(mock.device);
  var nestWebservice = mock.extractProperties(mock.nestWebservice);

  describe('augmentDevice', function () {
    it('extracts device properties, actions and url', function () {
      var augmentedDevice = DeviceHelpers.augmentDevice(device);
      var alterEgoComponent = DeviceHelpers.getAlterEgoComponent(device);
      expect(augmentedDevice.properties).toEqual(device.properties);
      expect(augmentedDevice.actions).toEqual(_.indexBy(alterEgoComponent.actions, 'name'));
      expect(augmentedDevice.url).toEqual(DeviceHelpers.getDeviceUrl(device));
    });

    it('includes the alter ego component and primary capability', function () {
      var augmentedDevice = DeviceHelpers.augmentDevice(device);
      var alterEgoComponent = DeviceHelpers.getAlterEgoComponent(device);
      expect(augmentedDevice.alterEgoComponent).toEqual(alterEgoComponent);
      expect(augmentedDevice.primaryCapability).toEqual(DeviceHelpers.getPrimaryCapability(alterEgoComponent));
    });

    it('flags nest webservice as hidden', function () {
      var nestService = DeviceHelpers.augmentDevice(nestWebservice);
      expect(nestService.hidden).toEqual(true);
    });

    it('does not flag regular device as hidden', function () {
      var augmentedDevice = DeviceHelpers.augmentDevice(device);
      expect(augmentedDevice.hidden).toEqual(false);
    });
  });

  describe('getAlterEgoComponent', function () {
    it('returns a component belonging to a device if its id matches mainComponentId', function () {
      var alterEgoComponent = DeviceHelpers.getAlterEgoComponent(device);
      expect(alterEgoComponent).toEqual(device.components[0]);
    });
  });

  describe('getPrimaryCapability', function () {
    it('returns components\'s first capability', function () {
      var alterEgoComponent = DeviceHelpers.getAlterEgoComponent(device);
      var primaryCapability = DeviceHelpers.getPrimaryCapability(alterEgoComponent);
      expect(primaryCapability).toEqual(alterEgoComponent.properties.capabilities[0]);
    });
  });

  describe('getDeviceUrl', function () {
    it('returns full device url', function () {
      var url = DeviceHelpers.getDeviceUrl(device);
      expect(url).toEqual(device.links[0].href);
    });
  });

  describe('isHiddenDevice', function () {
    it('returns a boolean value depending on whether "nest acccount" is in device\'s name property', function () {
      var isHidden = DeviceHelpers.isHiddenDevice(device);
      expect(isHidden).toEqual(false);
      isHidden = DeviceHelpers.isHiddenDevice(nestWebservice);
      expect(isHidden).toEqual(true);
    });
  });

  describe('getActionForCapability', function () {
    it('maps a device capability to an action name using dashes as separators', function () {
      var component = DeviceHelpers.getAlterEgoComponent(device);
      var capability = DeviceHelpers.getPrimaryCapability(component);
      expect(DeviceHelpers.getActionForCapability(component, capability, 'set'))
        .toEqual(component.actions[1]);
    });
  });

});
