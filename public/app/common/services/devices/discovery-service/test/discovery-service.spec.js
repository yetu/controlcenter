var discoveryService = require('../discovery-service'),
    promiseHelper = require('helpers/promise');

require('whatwg-fetch');

var SessionState = require('../discovery-session-state.js');
var UrlHelpers = require('helpers/url');
var mock = require('./discovery-service.mock.js');

var householdApiUrl = '/household';

describe('Device discovery service', function () {

  describe('startDiscovery', function () {
    var stub;

    beforeEach(function () {
      stub = sinon.stub(window, 'fetch');
    });

    afterEach(function () {
      stub.restore();
    });

    it('stops when device discovery session is complete', function (done) {
      this.timeout(10000);
      // start device discovery
      stub.withArgs(householdApiUrl + '/gateway/discoveries', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      })
        .returns(promiseHelper.resolveWith(mock.discoverySession.sessionCreatedResponse));

      // get gateway status
      stub.withArgs(householdApiUrl + '/gateway', { credentials: 'include' })
        .returns(promiseHelper.resolveWith(
          promiseHelper.jsonResponse(mock.discoverySession.gatewayResponse)
        ));

      // response for polling discovery session
      var discoverySessionUrl = UrlHelpers.toHouseholdUrl(
        mock.discoverySession.gatewayResponse.entities[0].href
      );
      stub.withArgs(discoverySessionUrl, { credentials: 'include' })
        .onFirstCall()
        .returns(
          promiseHelper.resolveWith(
            promiseHelper.jsonResponse(mock.discoverySession.sessionStateRequested)
          )
        )
        .onSecondCall()
        .returns(
          promiseHelper.resolveWith(
            promiseHelper.jsonResponse(mock.discoverySession.sessionStateCreated)
          )
        );

      // response for polling discovery session
      stub.withArgs(discoverySessionUrl, { credentials: 'include' })
        .returns(
          promiseHelper.resolveWith(
            promiseHelper.jsonResponse(mock.discoverySession.sessionStateStopped)
          )
        );

      discoveryService.discover().then(function next (state) {
        state.should.equal(SessionState.STOPPED);
        done();
      });
    });

  });
});
