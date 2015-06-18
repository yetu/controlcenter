require 'whatwg-fetch'

transformGatewayResponse = (response = {}) ->
  response.properties or {}

gatewayInfoUrl = '/household/gateway'
householdResetUrl = '/household/reset'

module.exports =

  fetchGatewayInfo: ->
    return fetch gatewayInfoUrl, { credentials: 'include' }
      .then (response) ->
        do response.json
      .then transformGatewayResponse

  resetGateway: ->
    return fetch householdResetUrl, { credentials: 'include', method: 'POST' }

