var DeviceActions = require('../index');
var Reflux = require('reflux');
var _ = require('lodash');

var mock = require('./device-actions.mock.js');

var apiHost = 'http://householdmockapi000.yetudev.com:8080';

describe('device actions', function () {

  var xhr, server;
  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    xhr.restore();
    server.restore();
  });

  describe('addDevice', function () {
    it('calls its "completed" child action when device has been discovered', function (done) {

      server.respondWith('POST', apiHost + '/gateway/discoveries', [
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(mock.addDevice.sessionCreatedResponse)
      ]);
      DeviceActions.addDevice.listen(function () {
        server.respond();
      });


      // server.respondWith('GET', apiHost + '/gateway', [
      //   200,
      //   {'Content-Type': 'application/json'},
      //   JSON.stringify(mock.addDevice.gatewayResponse)
      // ]);
      // server.respond();

      // var discoverySessionUrl = mock.addDevice.gatewayResponse.entities[0].href;

      // server.respondWith('GET', discoverySessionUrl, [
      //   200,
      //   {'Content-Type': 'application/json'},
      //   JSON.stringify(mock.addDevice.sessionStateRequested)
      // ]);
      // server.respond();

      // server.respondWith('GET', discoverySessionUrl, [
      //   200,
      //   {'Content-Type': 'application/json'},
      //   JSON.stringify(mock.addDevice.sessionStateCreated)
      // ]);
      // server.respond();

      // server.respondWith('GET', discoverySessionUrl, [
      //   200,
      //   {'Content-Type': 'application/json'},
      //   JSON.stringify(mock.addDevice.sessionStateFinished)
      // ]);
      // server.respond();

      // var thingUrl = mock.addDevice.sessionStateFinished.links[1].href;

      // server.respondWith('GET', thingUrl, [
      //   200,
      //   {'Content-Type': 'application/json'},
      //   JSON.stringify(mock.addDevice.thingResponse)
      // ]);
      // server.respond();

      // DeviceActions.addDevice.completed.listen(function (device) {
      //   expect(obj).toEqual(mock.addDevice.thingResponse);
      //   done();
      // });

    });

    it('calls its "failed" child action when an error has occured', function () {
      var testData = { error: 'x__x' }
      DeviceActions.addDevice.failed.listen(function (obj) {
        expect(obj).toEqual(testData);
        done();
      });

      DeviceActions.addDevice(testData);
    });

  });

});
