var React = require('react');

var Icon = require('common/components/icon');

var styleMixin = require('mixins/style-mixin');

var DeviceStateText = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <span className='cc-device-state-text'>{
        this.props.connected
          ? 'Connected'
          : 'Disconnected'
      }
      </span>
    );
  }

});

module.exports = DeviceStateText;
