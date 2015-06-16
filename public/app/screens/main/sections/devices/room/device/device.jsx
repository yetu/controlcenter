var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');

var DeviceActionControl = require('common/components/device-action-control');
var DeviceStatusIcon = require('common/components/device-status/device-status-icon');
var DeviceStatusText = require('common/components/device-status/device-status-text');

var Device = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {

    var properties = this.props.device.properties;

    // Should have been a separate grid-14 but we live in a cruel world...
    // TODO: Use a better strategy to shorten display name
    return (
      <div className='cc-device row fixed-height-1'>
        <div className='cc-device__title columns small-4 quarter-padded-left'>
          <Link to='device' params={{ deviceId: properties.id }}>
            <h4>{ properties.name.substr(0, 20) }</h4>
          </Link>
        </div>
        <div className='cc-device__type columns small-4 text-center'>
          <h4 className='subheader'>{properties.type}</h4>
        </div>
        <div className='cc-device__control columns small-3 text-left'>
          <DeviceActionControl device={ this.props.device } />
        </div>
        <div className='cc-device__status columns small-1 text-center'>
          <DeviceStatusIcon status={ this.props.device.properties.status } />
        </div>
        <div className='cc-device__status columns small-2 text-center'>
          <DeviceStatusText status={ this.props.device.properties.status } />
        </div>
      </div>
    );
  }


});

module.exports = Device;
