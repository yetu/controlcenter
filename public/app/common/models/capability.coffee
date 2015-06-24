# refer to
# https://github.com/yetu/thing-specification/blob/master/src/main/resources/ThingSpecification.xmi

Capability =
  COLORABLE:   'colorable'
  SWITCHABLE:  'switchable'
  MEASUREMENT: 'measurement'
  SETTABLE:    'setable'

  # get capability by component type
Capability.byComponentType =
  SOCKET:      Capability.SWITCHABLE
  LAMP:        Capability.SWITCHABLE
  METER:       Capability.MEASUREMENT
  SENSOR:      Capability.MEASUREMENT
  BATTERY:     Capability.SETTABLE
  WEBSERVICE:  Capability.SETTABLE

  THERMOSTAT:  Capability.SETTABLE

Capability.propertyOf =
  "#{Capability.COLORABLE}":   'color'
  "#{Capability.SWITCHABLE}":  'on'
  "#{Capability.MEASUREMENT}": 'measurement'
  "#{Capability.SETTABLE}":    'value'

module.exports = Capability
