module.exports =
  discoverySession:
    sessionCreatedResponse: {}

    gatewayResponse:
      class: ['gateway']

      properties:
        gatewayId: '859dd0f6-4a37-486f-8998-066d1c3d1caa'
        online: true

      entities: [
        {
          rel: ['http://api.yetu.me/rels/gateway/discoverysession']
          href: 'https://householdmockapi-dev.yetu.me/' +
          'gateway/discoveries/4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        }
      ]

      actions: [
        {
          name: 'create-device-discovery-session'
          href: 'https://householdmockapi-dev.yetu.me/gateway/discoveries'
          method: 'POST'
        }
        {
          name: 'create-device-removal-session'
          href: 'https://householdmockapi-dev.yetu.me/gateway/removals'
          method: 'POST'
        }
      ]

      links: [
        {
          rel: ['self']
          href: 'https://householdmockapi-dev.yetu.me/gateway'
        }
      ]

    sessionStateRequested:
      class: [
        'session'
        'discovery'
      ]

      properties:
        sessionId: '4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        state: 'REQUESTED'

      links: [
        {
          rel: ['self']
          href: 'https://household-https.prod.yetu.me/gateway/discoveries/4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        }
      ]

    sessionStateCreated:
      class: [
        'session'
        'discovery'
      ]

      properties: {
        sessionId: '4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        state: 'CREATED'
      }

      links: [
        {
          rel: ['self']
          href: 'https://household-https.prod.yetu.me/gateway/discoveries/4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        }
      ]

    sessionStateStopped:
      class: [
        'session'
        'discovery'
      ]

      properties:
        sessionId: '4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        state: 'STOPPED'

      links: [
        {
          rel: ['self']
          href: 'https://household-https.prod.yetu.me/gateway/discoveries/4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        },
        {
          rel: ['http://yetu.com/rels/gateway/session/discovery/thing']
          href: 'https://household-https.prod.yetu.me/things/bd8fbbb7-50e3-42cc-a00b-e55082249347'
        }
      ]

    sessionStateExpired:
      class: [
        'session',
        'discovery'
      ]

      properties:
        sessionId: '4d7f590e-c40d-11e4-8dfc-aa07a5b093db',
        state: 'EXPIRED'

      links: [
        {
          rel: ['self'],
          href: 'https://household-https.prod.yetu.me/gateway/discoveries/4d7f590e-c40d-11e4-8dfc-aa07a5b093db'
        }
        {
          rel: ['http://yetu.com/rels/gateway/session/discovery/thing'],
          href: 'https://household-https.prod.yetu.me/things/bd8fbbb7-50e3-42cc-a00b-e55082249347'
        }
      ]

    thingResponse:
      class: ['thing']

      properties:
        id: 'bf8976f8-a9d9-4fde-9cfe-f3c623fe9977'
        name: 'Fibaro wall plug'
        manufacturer: 'Fibaro'
        displayType: 'socket'
        reachable: 'true'
        lastCommunication: '2015-03-04T12:43:20+00:00'
        installationTime: '2015-02-12T09:32:09+00:00'

      entities: [
        {
          rel: ['http://yetu.me/rels/subthing']
          href: 'https://householdmockapi-dev.yetu.me/things/' +
          'bf8976f8-a9d9-4fde-9cfe-f3c623fe9977/subthings/f6e1fc58-e1f2-482a-8f82-9354755f0e99',
          class: ['subthing']
        }
      ]

      links: [
        {
          rel: ['self']
          href: 'https://householdmockapi-dev.yetu.me/things/bf8976f8-a9d9-4fde-9cfe-f3c623fe9977'
        }
        {
          rel: ['next']
          href: 'https://householdmockapi-dev.yetu.me/things/95c12117-adb0-42c9-92bc-d0aef5f07639'
        }
      ]

