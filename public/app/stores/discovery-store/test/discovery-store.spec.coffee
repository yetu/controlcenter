discoveryService = require 'services/devices/discovery-service'
discoveryStore   = require '../discovery-store'

describe 'Discovery Store', ->

  describe 'getInitialState', ->
    it 'returns an empty object', ->
      discoveryStore.getInitialState().should.deep.equal {}

  describe 'onStartDiscovery', ->
    it 'calls discovery service\'s `discover` method', ->
      spy = sinon.spy discoveryService, 'discover'
      do discoveryStore.onStartDiscovery
      spy.should.have.been.called
