module.exports =

  device:
    entities: [
      {
        rel: ['http://api.yetu.me/rels/component']

        links: [
          {
            rel: ['self']
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/thermostat'
          }
        ]

        properties:
          capabilities: ['SETABLE']
          name: 'Thermostat'
          'SETABLE-value': 22.0
          id: 'thermostat'
          type: 'THERMOSTAT'

        actions: [
          {
            name: 'get-SETABLE-value'
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/thermostat/actions/SETABLE-value'
            method: 'GET'
          }
          {
            method: 'PUT'
            name: 'set-SETABLE-value'
            fields: [
              {
                name: 'value'
                type: 'number'
              }
            ]
            type: 'application/json'
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/thermostat/actions/SETABLE-value'
          }
        ]

        class: ['component']
      }

      {
        rel: ['http://api.yetu.me/rels/component']

        links: [
          {
            rel: ['self']
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/humidity'
          }
        ]

        properties:
          capabilities: ['MEASUREMENT']
          name: 'Sensor2'
          'MEASUREMENT-measurement': 35
          id: 'humidity'
          type: 'SENSOR'

        actions: [
          {
            name: 'get-MEASUREMENT-measurement'
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/humidity/actions/MEASUREMENT-measurement'
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
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/temperature'
          }
        ]
        properties:
          capabilities: ['MEASUREMENT']
          name: 'Sensor'
          'MEASUREMENT-measurement': 24.0
          id: 'temperature'
          type: 'SENSOR'

        actions: [
          {
            name: 'get-MEASUREMENT-measurement'
            href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149/components/temperature/actions/MEASUREMENT-measurement'
            method: 'GET'
          }
        ]
        class: ['component']
      }
    ]

    rel: ['http://api.yetu.me/rels/thing']
    links: [
      {
        rel: ['self']
        href: 'https://household-https.prod.yetu.me/things/0af194e6-ca4a-40ad-927d-d2d37e52e149'
      }
    ]

    properties:
      name: 'Nest Thermostat'
      displayType: 'THERMOSTAT'
      tags: []
      id: '0af194e6-ca4a-40ad-927d-d2d37e52e149'
      mainComponentId: 'thermostat'
      manufacturer: null

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
