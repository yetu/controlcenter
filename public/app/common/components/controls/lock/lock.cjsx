React = require 'react'
styleMixin = require 'mixins/style-mixin'
cx = require 'classname'

module.exports = React.createClass
  mixins: [ styleMixin require('./style.scss') ]

  getInitialState: ->
    checked: @props.value or no

  componentWillReceiveProps: (nextProps) ->
    @setState checked: nextProps.value or no

  render: ->

    className = cx \
      'cc-lock-control',
      if @state.checked
        'cc-lock-control__locked'
      else
        'cc-lock-control__unlocked'

      <div className=className onClick=@toggle />

  toggle: ->
    @setState checked: not @state.checked, =>
      @props.onChange this.state
