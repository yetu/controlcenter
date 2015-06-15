ThingMock = require './thing.mock'
ThingComponent = require '../thing-component'

describe 'ThingComponent', ->

  component = null

  beforeEach ->
    component = new ThingComponent(do ThingMock.FibaroWallplug.getAlterEgoComponent)

  describe 'constructor', ->
    it 'creates an actions map using capability and property as keys', ->
      expect(component.actions).toEqual
        SWITCHABLE:
          on:
            get:
              name: 'get-SWITCHABLE-on'
              href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/SWITCHABLE-on'
              method: 'GET'
            set:
              name: 'set-SWITCHABLE-on'
              method: 'PUT'
              fields: [
                {
                  name: 'value'
                  type: 'checkbox'
                }
              ]
              type: 'application/json'
              href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/SWITCHABLE-on'

  describe 'get', ->
    it 'gets a property by capability name', ->
      property = component.get 'SWITCHABLE'
      expect(property).toEqual
        value: false
        unit: 'BOOLEAN'
        symbol: null



