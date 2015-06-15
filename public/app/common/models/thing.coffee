_ = require 'lodash'

Capability     = require './capability'
ThingComponent = require './thing-component'

class Thing

  constructor: ({entities, links, @properties}) ->
    @components = entities.map (entity) -> new ThingComponent entity

    link = _.find links, (link) -> link.rel[0] is 'self'
    @url = link.href

    @alterEgoComponent = _.find @components, (component) =>
      component.properties.id is @properties.mainComponentId

    alterEgoType = @alterEgoComponent.properties.type
    @primaryCapability = Capability.byComponentType[alterEgoType]

module.exports = Thing
