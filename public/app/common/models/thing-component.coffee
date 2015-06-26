_ = require 'lodash'

class ThingComponent
  constructor: ({ @properties, actions }) ->
    actions = _.indexBy actions, 'name'

    @actions = {}
    for capabilityName, capability of @properties.capabilities
      for propertyName, property of capability
        for operation in ['get', 'set']
          @actions[capabilityName] or= {}
          action = @actions[capabilityName]
          action[propertyName] or= {}
          property = action[propertyName]
          property[operation] = actions["#{operation}-#{capabilityName}-#{propertyName}"]

  get: (capabilityName) ->
    capability = @properties.capabilities[capabilityName]
    [propertyName] = Object.keys capability
    capability[propertyName]

module.exports = ThingComponent
