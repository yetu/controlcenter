discoveryService = require '../discovery-service'
promiseHelper    = require 'helpers/promise'

require 'whatwg-fetch'

SessionState = require '../discovery-session-state.js'
UrlHelpers   = require 'helpers/url'
mock         = require './discovery-service.mock'

householdApiUrl = '/household'

describe 'Device discovery service', ->

  describe 'startDiscovery', ->
    stub = null

    beforeEach ->
      stub = sinon.stub window, 'fetch'

    afterEach ->
      do stub.restore

    it 'stops when device discovery session is complete', (done) ->
      @timeout 10000
      # start device discovery
      stub.withArgs("#{householdApiUrl}/gateway/discoveries",
        {
          credentials: 'include'
          method:      'POST'
          headers:     { 'Content-Type': 'application/json' }
          body:        '{}'
        })
        .returns(promiseHelper.resolveWith mock.discoverySession.sessionCreatedResponse)

      # get gateway status
      stub.withArgs "#{householdApiUrl}/gateway", credentials:'include'
        .returns(promiseHelper.resolveWith(
          promiseHelper.jsonResponse mock.discoverySession.gatewayResponse
        ))

      # response for polling discovery session
      discoverySessionUrl = UrlHelpers.toHouseholdUrl \
        mock.discoverySession.gatewayResponse.entities[0].href

      stub.withArgs discoverySessionUrl, credentials:'include'
        .onFirstCall()
        .returns(
          promiseHelper.resolveWith(
            promiseHelper.jsonResponse mock.discoverySession.sessionStateRequested
          )
        )
        .onSecondCall()
        .returns(
          promiseHelper.resolveWith(
            promiseHelper.jsonResponse mock.discoverySession.sessionStateCreated
          )
        )

      # response for polling discovery session
      stub.withArgs discoverySessionUrl, credentials:'include'
        .returns(
          promiseHelper.resolveWith(
            promiseHelper.jsonResponse mock.discoverySession.sessionStateStopped
          )
        )

      discoveryService.discover().then (state) ->
        state.should.equal SessionState.STOPPED
        do done


