_ = require 'lodash'

Thing = require '../thing'
ThingMock = require './thing.mock'
ThingComponent = require '../thing-component'

describe 'Thing', ->

  thing = null

  beforeEach ->
    thing = new Thing ThingMock.FibaroWallplug

  describe 'constructor', ->
      it 'extracts device properties, actions and url', ->
        thing.properties.should.deep.equal ThingMock.FibaroWallplug.properties
        thing.url.should.deep.equal(do ThingMock.FibaroWallplug.getUrl)

      it 'creates ThingComponent instances for all thing\'s components', ->
        for component in thing.components
          component.should.be.an.instanceOf ThingComponent

      it 'adds a reference to the alter ego component, which has the same id as the thing', ->
        alterEgoComponent = new ThingComponent(do ThingMock.FibaroWallplug.getAlterEgoComponent)
        thing.alterEgoComponent.should.deep.equal alterEgoComponent

      it 'uses thing type to get primary capability', ->
        thing.primaryCapability.should.deep.equal(do ThingMock.FibaroWallplug.getPrimaryCapability)
