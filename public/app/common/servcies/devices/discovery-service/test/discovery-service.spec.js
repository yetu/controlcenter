var deviceService = require('../discovery-service');
var qwest = require('qwest'),
  promiseHelper = require('helpers/promise');

var SessionState = require('../discovery-session-state.js');
var mock = require('./discovery-service.mock.js');

var apiHost = 'http://householdmockapi000.yetudev.com:8080';

describe('Device discovery service', function () {

  describe('startDiscovery', function () {
    var postStub;
    var getStub;

    beforeEach(function () {
      postStub = sinon.stub(qwest, 'post');
      getStub = sinon.stub(qwest, 'get');
    });

    afterEach(function () {

      postStub.restore();
      getStub.restore();
    });

    it('resolves subscription with finished state when device has been discovered', function (done) {
      // start device discovery
      postStub.withArgs(apiHost + '/gateway/discoveries', {})
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      getStub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.when(mock.addDevice.gatewayResponse));

      // responce for polling discovery session
      var discoverySessionUrl = mock.addDevice.gatewayResponse.entities[0].href;
      getStub.withArgs(discoverySessionUrl).onFirstCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateRequested))
        .onSecondCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateCreated));

      // responce for polling discovery session
      getStub.withArgs(discoverySessionUrl)
        .returns(promiseHelper.when(mock.addDevice.sessionStateFinished));

      deviceService.startDiscovery().subscribe(function onNext (next) {
        expect(next.properties.state).toEqual(SessionState.FINISHED);
        done();
      });
    });


    it('resolves subscription with an error when discovery session has expired', function (done) {
      // start device discovery
      postStub.withArgs(apiHost + '/gateway/discoveries', {})
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      getStub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.when(mock.addDevice.gatewayResponse));

      // responce for polling discovery session
      var discoverySessionUrl = mock.addDevice.gatewayResponse.entities[0].href;
      getStub.withArgs(discoverySessionUrl).onFirstCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateRequested))
        .onSecondCall()
        .returns(promiseHelper.when(mock.addDevice.sessionStateCreated));


      // responce for polling discovery session
      getStub.withArgs(discoverySessionUrl)
        .returns(promiseHelper.when(mock.addDevice.sessionStateExpired));

      deviceService.startDiscovery().subscribeOnError(function onError (error) {
        expect(error).toBeDefined();
        done();
      });
    });


    it('resolves subscription with an error when failed to start discovery', function (done) {
      postStub.withArgs(apiHost + '/gateway/discoveries', {})
        .returns(promiseHelper.fail(new Error('error')));

      deviceService.startDiscovery().subscribeOnError(function onError (error) {
        expect(error).toBeDefined();
        done();
      });
    });

    it('resolves subscription with an error when failed to start discovery', function (done) {
      // start device discovery
      postStub.withArgs(apiHost + '/gateway/discoveries', {})
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      getStub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.fail(new Error('commention error')));

      deviceService.startDiscovery().subscribeOnError(function onError (error) {
        expect(error).toBeDefined();
        done();
      });
    });
  });
});
