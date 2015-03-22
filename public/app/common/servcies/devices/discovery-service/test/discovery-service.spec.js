var deviceService = require('../discovery-service'),
  promiseHelper = require('helpers/promise');
require('whatwg-fetch');


var SessionState = require('../discovery-session-state.js');
var mock = require('./discovery-service.mock.js');

var apiHost = 'http://householdmockapi000.yetudev.com:8080';

describe('Device discovery service', function () {

  describe('startDiscovery', function () {
    var stub;

    beforeEach(function () {
      stub = sinon.stub(window, 'fetch');
    });

    afterEach(function () {
      stub.restore();
    });

    it('resolves subscription with finished state when device has been discovered', function (done) {
      // start device discovery
      stub.withArgs(apiHost + '/gateway/discoveries', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      stub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.when(mock.addDevice.gatewayResponse));

      // responce for polling discovery session
      var discoverySessionUrl = mock.addDevice.gatewayResponse.entities[0].href;
      stub.withArgs(discoverySessionUrl).onFirstCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateRequested))
        .onSecondCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateCreated));

      // responce for polling discovery session
      stub.withArgs(discoverySessionUrl)
        .returns(promiseHelper.when(mock.addDevice.sessionStateFinished));

      deviceService.startDiscovery().subscribeOnNext(function onNext (next) {
        expect(next.properties.state).toEqual(SessionState.FINISHED);
        done();
      });
    });


    it('resolves subscription with an error when discovery session has expired', function (done) {
      // start device discovery
      stub.withArgs(apiHost + '/gateway/discoveries', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      stub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.when(mock.addDevice.gatewayResponse));

      // responce for polling discovery session
      var discoverySessionUrl = mock.addDevice.gatewayResponse.entities[0].href;
      stub.withArgs(discoverySessionUrl).onFirstCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateRequested))
        .onSecondCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateCreated));


      // responce for polling discovery session
      stub.withArgs(discoverySessionUrl)
        .returns(promiseHelper.when(mock.addDevice.sessionStateExpired));

      deviceService.startDiscovery().subscribeOnError(function onError (error) {
        expect(error).toBeDefined();
        done();
      });
    });


    it('resolves subscription with an error when failed to start discovery', function (done) {
      stub.withArgs(apiHost + '/gateway/discoveries', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }).returns(promiseHelper.fail(new Error('error')));

      stub.returns(promiseHelper.fail());
      deviceService.startDiscovery().subscribeOnError(function onError (error) {
        expect(error).toBeDefined();
        done();
      });
    });

    it('resolves subscription with an error when failed to start discovery', function (done) {
      // start device discovery
      stub.withArgs(apiHost + '/gateway/discoveries', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      stub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.fail(new Error('connection error')));
      stub.returns(promiseHelper.fail());

      deviceService.startDiscovery().subscribeOnError(function onError (error) {
        expect(error).toBeDefined();
        done();
      });
    });
  });
});
