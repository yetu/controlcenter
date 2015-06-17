React              = require 'react'
{PureRenderMixin}  = require('react/addons').addons
cx                 = require 'classname'
styleMixin         = require 'mixins/style-mixin'

module.exports = React.createClass
  mixins: [
    styleMixin require('./style.scss')
    PureRenderMixin
  ]

  getIconTypeClass: ->
    if @props.type?
      "cc-icon-#{@props.type}"
    else
      ''

  render: ->
    className = cx
      'cc-icon':                 yes
      "#{@props.size or ''}":    yes
      "#{do @getIconTypeClass}": yes

    <span className={className}></span>
