var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');

var DeviceActionControl = require('common/components/device-action-control');
var DeviceState = require('common/components/device-state');

var Device = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {

    var properties = this.props.device.properties;

    // Should have been a separate grid-14 but we live in a cruel world...
    return (
      <div className='cc-device row fixed-height-1'>
        <div className='cc-device__title columns small-4 quarter-padded-left'>
          <Link to='device' params={{ deviceId: properties.id }}>
            <h4>{ properties.name }</h4>
          </Link>
        </div>
        <div className='cc-device__type columns small-4 text-center'>
          <h4 className='subheader'>{properties.type}</h4>
        </div>
        <div className='cc-device__control columns small-3 text-left'>
          <DeviceActionControl device={ this.props.device } />
        </div>
        <div className='cc-device__state columns small-3 quarter-padded-left'>
          <DeviceState device={ this.props.device }/>
        </div>
      </div>
    );
  }


});

module.exports = Device;
