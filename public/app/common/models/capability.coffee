# refer to
# https://github.com/yetu/thing-specification/blob/master/src/main/resources/ThingSpecification.xmi

Capability =

  COLORABLE:   'COLORABLE'
  SWITCHABLE:  'SWITCHABLE'
  MEASUREMENT: 'MEASUREMENT'
  SETABLE:     'SETABLE'

  # get capability by component type
Capability.byComponentType =
  SOCKET:      Capability.SWITCHABLE
  LAMP:        Capability.SWITCHABLE
  METER:       Capability.MEASUREMENT
  SENSOR:      Capability.MEASUREMENT
  BATTERY:     Capability.SETABLE
  WEBSERVICE:  Capability.SETABLE

  THERMOSTAT:  Capability.SETABLE

Capability.propertyOf =
  "#{Capability.COLORABLE}":   'color'
  "#{Capability.SWITCHABLE}":  'on'
  "#{Capability.MEASUREMENT}": 'measurement'
  "#{Capability.SETABLE}":     'value'

module.exports = Capability
