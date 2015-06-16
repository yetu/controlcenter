React            = require 'react'

DeviceStatusIcon = require './device-status-icon'
DeviceStatusText = require './device-status-text'

styleMixin       = require 'mixins/style-mixin'

DeviceStatus = React.createClass
  mixins: [styleMixin require('./style.scss')]

  render: ->
      <div className='cc-device-status'>
        <DeviceStatusIcon status={@props.status} />
        <DeviceStatusText status={@props.status} />
      </div>

module.exports = DeviceStatus

