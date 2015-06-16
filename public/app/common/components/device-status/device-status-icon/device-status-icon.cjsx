React = require 'react'
Icon  = require 'common/components/icon'

DeviceStatusIcon = React.createClass
  render: ->
      <Icon type={@props.status} />

module.exports = DeviceStatusIcon
