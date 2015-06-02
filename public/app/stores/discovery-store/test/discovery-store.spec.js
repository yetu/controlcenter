var discoveryService = require('services/devices/discovery-service');
var discoveryStore = require('../discovery-store');

describe('Discovery Store', function () {

  describe('getInitialState', function () {
    it('returns an empty object', function () {
      expect(discoveryStore.getInitialState()).toEqual({});
    });
  });

  describe('onStartDiscovery', function () {
    it('calls discovery service\'s `discover` method', function () {
      var spy = sinon.spy(discoveryService, 'discover');
      discoveryStore.onStartDiscovery();
      expect(spy.called).toBe(true);
    });
  });
});
