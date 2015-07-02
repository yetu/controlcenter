React             = require 'react'
{PureRenderMixin} = require('react/addons').addons
cx                = require 'classname'
styleMixin        = require 'mixins/style-mixin'

module.exports = React.createClass

  mixins: [
    styleMixin require('./style.scss')
    PureRenderMixin
  ]

  render: ->
    className = cx
      'cc-button':                     true,
      secondary:                       this.props.secondary,
      "#{this.props.size}":            @props.size?
      "#{this.props.className or ''}": true

    <a className={ className } href='#' onClick={this.onClick}> { this.props.children }</a>

  onClick: (event) ->
    do event.preventDefault
    do @props.onClick

