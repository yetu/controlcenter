React      = require 'react'
styleMixin = require 'mixins/style-mixin'

DeviceStatusText = React.createClass
  mixins: [styleMixin require('./style.scss')]

  render: ->
    <span className='cc-device-status-text'>{@props.status}</span>

module.exports = DeviceStatusText
