var deviceActions = require('../index');
var qwest = require('qwest'),
  promiseHelper = require('utils/promise');


var mock = require('./device-actions.mock.js');

var apiHost = 'http://householdmockapi000.yetudev.com:8080';

describe('device actions', function () {

  describe('addDevice', function () {
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

    it('calls "completed" child action when device has been discovered', function (done) {
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

      deviceActions.addDevice.completed.listen(function () {
        done();
      });

      deviceActions.addDevice();
    });


    it('calls "failed" child action when discovery session was expired', function (done) {
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

      deviceActions.addDevice.failed.listen(function () {
        done();
      });

      deviceActions.addDevice();
    });


    it('calls "failed" child action when failed to start discovery', function (done) {
      postStub.withArgs(apiHost + '/gateway/discoveries', {})
        .returns(promiseHelper.fail(new Error('error')));

      deviceActions.addDevice.failed.listen(function () {
        done();
      });

      deviceActions.addDevice();
    });

    it('calls "failed" child action when failed to start discovery', function (done) {
      // start device discovery
      postStub.withArgs(apiHost + '/gateway/discoveries', {})
        .returns(promiseHelper.when(mock.addDevice.sessionCreatedResponse));

      // get gateway status
      getStub.withArgs(apiHost + '/gateway')
        .returns(promiseHelper.fail(new Error('commention error')));

      deviceActions.addDevice.failed.listen(function () {
        done();
      });

      deviceActions.addDevice();
    });
  });
});
