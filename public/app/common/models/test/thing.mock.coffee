Capability = require '../capability'

module.exports =

  FibaroWallplug:
    entities: [
      {
        rel: ['http://api.yetu.me/rels/component']

        links: [
          {
            rel: ['self'],
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led'
          }
        ]

        properties:
          id: 'led'
          name: 'Lamp'
          type: 'LAMP'
          capabilities:
            switchable:
              on:
                value: null
                unit: 'BOOLEAN'
                symbol: null
            colorable:
              color:
                value: null
                unit: 'HSBCOLOR'
                symbol: null

        actions: [
          {
            name: 'get-switchable-on'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/switchable-on'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-switchable-on'
            fields: [
              {
                name: 'value'
                type: 'checkbox'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/switchable-on'
          }
          {
            name: 'get-colorable-color'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/colorable-color'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-colorable-color'
            fields: [
              {
                name: 'value'
                type: 'color'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/colorable-color'
          }
        ]
        class: ['component']
      }

      {
        rel: ['http://api.yetu.me/rels/component']

        links: [
          {
            rel: ['self']
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/power'
          }
        ]

        properties:
          id: 'power'
          name: 'Sensor'
          type: 'SENSOR'
          capabilities:
            measurement:
              measurement:
                value: null
                unit: 'WATT'
                symbol: 'W'

        actions: [
          {
            name: 'get-measurement-measurement'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/power/actions/measurement-measurement'
            method: 'GET'
          }
        ]

        class: ['component']
      }

      {
        rel: ['http://api.yetu.me/rels/component']

        links: [
          {
            rel: ['self']
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket'
          }
        ]

        properties:
          id: 'socket'
          name: 'Socket'
          type: 'SOCKET'
          capabilities:
            switchable:
              on:
                value: false
                unit: 'BOOLEAN'
                symbol: null

        actions: [
          {
            name: 'get-switchable-on'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/switchable-on'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-switchable-on'
            fields: [
              {
                name: 'value'
                type: 'checkbox'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/switchable-on'
          }
        ]
        class: ['component']
      }
    ]

    rel: ['http://api.yetu.me/rels/thing']

    links: [
      {
        rel: ['self']
        href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba'
      }
    ]

    properties:
      name: 'Fibaro Wallplug'
      displayType: 'SOCKET'
      tags: []
      id: '79802756-46a7-4e8f-b3f5-6bfd22a2c5ba'
      mainComponentId: 'socket'
      status: 'unknown'
      manufacturer: null

    class: ['thing']

    getAlterEgoComponent: ->
      # socket
      @entities[2]

    getPrimaryCapability: ->
      # socket --> switchable
      Capability.SWITCHABLE

    getUrl: ->
      @links[0].href

  nestWebservice:
    properties:
      name: 'nest account'
      displayType: 'nest'
      mainComponentId: 'main'
    entities: [
      {
        actions: [
          {
            name: 'get-setable-value'
            href: 'https://household-https.prod.yetu.me/things/be770898-bb11-4b65-be95-7fe468be5734/components/webservice/actions/setable-value'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-setable-value'
            fields: [
              {
                name: 'value'
                type: 'text'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.prod.yetu.me/things/be770898-bb11-4b65-be95-7fe468be5734/components/webservice/actions/setable-value'
          }
        ]
        properties:
          type: 'nest',
          capabilities: [{}]
          id: 'main'
      }
    ]
    links: [{ rel: ['self'] }]
