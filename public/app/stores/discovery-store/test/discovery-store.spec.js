var deviceDiscovery = require('servcies/devices/discovery-service');

var discoveryStore = require('../discovery-store');

describe('UserData Store', function () {

  describe('init', function () {
    it('defines discoveryData', function () {
      discoveryStore.init();
      expect(discoveryStore.discoveryData).toBeDefined();
    });

    it('defines discoveryData which has model and error fields', function () {
      discoveryStore.init();
      expect(discoveryStore.discoveryData.model).toEqual({});
      expect(discoveryStore.discoveryData.error).toEqual({});
    });
  });

  describe('getInitialState', function () {
    it('returns initial model', function () {
      expect(discoveryStore.getInitialState()).toEqual(discoveryStore.discoveryData);
    });
  });

  describe('onAddDevice', function () {

    it('calls Device Discovery service', function () {
      var spy = sinon.spy(deviceDiscovery, 'startDiscovery');
      discoveryStore.onAddDevice();
      expect(spy.called).toBe(true);
    });
  });
});
