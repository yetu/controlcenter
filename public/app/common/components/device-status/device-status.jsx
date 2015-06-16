var React = require('react');

var DeviceStatusIcon = require('./device-status-icon');
var DeviceStatusText = require('./device-status-text');

var styleMixin = require('mixins/style-mixin');

var DeviceStatus = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <div className='cc-device-status'>
        <DeviceStatusIcon status={this.props.status} />
        <DeviceStatusText status={this.props.status} />
      </div>
    );
  }
});

module.exports = DeviceStatus;
