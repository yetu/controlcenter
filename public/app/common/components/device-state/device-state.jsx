var React = require('react');

var DeviceStateIcon = require('./device-state-icon');
var DeviceStateText = require('./device-state-text');

var styleMixin = require('mixins/style-mixin');

var DeviceState = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <div className='cc-device-state'>
        <DeviceStateIcon connected={this.props.connected} />
        <DeviceStateText connected={this.props.connected} />
      </div>
    );
  }
});

module.exports = DeviceState;
