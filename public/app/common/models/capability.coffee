Capability =

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

module.exports = Capability
