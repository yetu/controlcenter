var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('common/components/controls/switch');
var DeviceState = require('common/components/device-state');

var Device = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    // Should have been a separate grid-14 but we live in a cruel world...
    return (
      <div className='cc-device row fixed-height-1'>
        <div className='cc-device__title columns small-4 quarter-padded-left'>
          <Link to='device' params={{ deviceId: this.props.device.id }}>
            <h4>{ this.props.device.name }</h4>
          </Link>
        </div>
        <div className='cc-device__type columns small-4 text-center'>
          <h4 className='subheader'>{this.props.device.type}</h4>
        </div>
        <div className='cc-device__control columns small-3 text-left'>
          <SwitchControl device={ this.props.device } />
        </div>
        <div className='cc-device__state columns small-3 quarter-padded-left'>
          <DeviceState device={ this.props.device }/>
        </div>
      </div>
    );
  }


});

module.exports = Device;
