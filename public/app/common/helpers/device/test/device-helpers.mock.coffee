module.exports =

  device:
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
            SWITCHABLE:
              on:
                value: null
                unit: 'BOOLEAN'
                symbol: null
            COLORABLE:
              color:
                value: null
                unit: 'HSBCOLOR'
                symbol: null

        actions: [
          {
            name: 'get-SWITCHABLE-on'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/SWITCHABLE-on'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-SWITCHABLE-on'
            fields: [
              {
                name: 'value'
                type: 'checkbox'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/SWITCHABLE-on'
          }
          {
            name: 'get-COLORABLE-color'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/COLORABLE-color'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-COLORABLE-color'
            fields: [
              {
                name: 'value'
                type: 'color'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/led/actions/COLORABLE-color'
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
            MEASUREMENT:
              measurement:
                value: null
                unit: 'WATT'
                symbol: 'W'

        actions: [
          {
            name: 'get-MEASUREMENT-measurement'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/power/actions/MEASUREMENT-measurement'
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
            SWITCHABLE:
              on:
                value: false
                unit: 'BOOLEAN'
                symbol: null

        actions: [
          {
            name: 'get-SWITCHABLE-on'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/SWITCHABLE-on'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-SWITCHABLE-on'
            fields: [
              {
                name: 'value'
                type: 'checkbox'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/SWITCHABLE-on'
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

  # mock the device service transformation
  extractProperties: (device) ->
    properties: device.properties
    links: device.links
    components: device.entities

  nestWebservice:
    properties:
      name: 'nest account'
      displayType: 'nest'
      mainComponentId: 'main'
    entities: [
      {
        actions: [
          {
            name: 'get-SETABLE-value'
            href: 'https://household-https.prod.yetu.me/things/be770898-bb11-4b65-be95-7fe468be5734/components/webservice/actions/SETABLE-value'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-SETABLE-value'
            fields: [
              {
                name: 'value'
                type: 'text'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.prod.yetu.me/things/be770898-bb11-4b65-be95-7fe468be5734/components/webservice/actions/SETABLE-value'
          }
        ]
        properties:
          type: 'nest',
          capabilities: [{}]
          id: 'main'
      }
    ]
    links: [{ rel: ['self'] }]
