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
        expect(thing.properties).toEqual ThingMock.FibaroWallplug.properties
        expect(thing.url).toEqual(do ThingMock.FibaroWallplug.getUrl)

      it 'creates ThingComponent instances for all thing\'s components', ->
        for component in thing.components
          expect(component).toEqual jasmine.any(ThingComponent)

      it 'adds a reference to the alter ego component, which has the same id as the thing', ->
        alterEgoComponent = new ThingComponent(do ThingMock.FibaroWallplug.getAlterEgoComponent)
        expect(thing.alterEgoComponent).toEqual alterEgoComponent

      it 'uses thing type to get primary capability', ->
        expect(thing.primaryCapability).toEqual(do ThingMock.FibaroWallplug.getPrimaryCapability)
