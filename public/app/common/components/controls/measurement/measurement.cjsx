React             = require 'react'
{PureRenderMixin} = require('react/addons').addons
styleMixin        = require 'mixins/style-mixin'

Measurement = React.createClass
  mixins: [
    styleMixin require('./style.scss')
    PureRenderMixin
  ]

  getDefaultProps: ->
    value: 0
    unit: null

  render: ->
    value = @props.value
    unit = @props.unit
    <div className='cc-measurement-control'>
      {if value isnt null then "#{do value.toString} #{unit}"}
    </div>

module.exports = Measurement
