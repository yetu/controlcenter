var discoveryService = require('services/devices/discovery-service');
var discoveryStore = require('../discovery-store');

describe('Discovery Store', function () {

  describe('getInitialState', function () {
    it('returns an empty object', function () {
      discoveryStore.getInitialState().should.deep.equal({});
    });
  });

  describe('onStartDiscovery', function () {
    it('calls discovery service\'s `discover` method', function () {
      var spy = sinon.spy(discoveryService, 'discover');
      discoveryStore.onStartDiscovery();
      spy.should.have.been.called;
    });
  });
});
