var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('common/components/controls/switch');
var SliderControl = require('common/components/controls/slider');
var DeviceState = require('common/components/device-state');

var Device = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    // Should have been a separate grid-14 but we live in a cruel world...
    return (
      <div className="cc-device row">
        <div className="cc-device__title">
          <Link to="device" params={{deviceId: this.props.device.id}}>
            { this.props.device.name }
          </Link>
        </div>
        <div className="cc-device__type">{ this.props.device.displayType }</div>
        <div className="cc-device__control">
          <SwitchControl device={ this.props.device } />
        </div>
        <div className="cc-device__state">
          <DeviceState device={ this.props.device }/>
        </div>
      </div>
    );
  }


});

module.exports = Device;
