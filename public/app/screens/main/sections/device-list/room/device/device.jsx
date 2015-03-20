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
      <div className='cc-device row fixed-height'>
        <div className='cc-device__title columns small-4 padded-left'>
          <Link to='device' params={{deviceId: this.props.device.id}}>
            <h5>{this.props.device.title}</h5>
          </Link>
        </div>
        <div className='cc-device__type columns small-4 text-center'>
          <h5 className='subheader'>{this.props.device.type}</h5>
        </div>
        <div className='cc-device__control columns small-3 text-center'>{this.getControl()}</div>
        <div className='cc-device__state columns small-3 padded-left'>
          <DeviceState device={this.props.device}/>
        </div>
      </div>
    );
  },

  getControl: function getControl () {
    var control;
    switch (this.props.device.type) {
      case 'Home Gateway':
        control = SwitchControl;
        break;
      case 'Thermostat':
        control = SliderControl;
        break;
    }
    return control
      ? React.createElement(control, { device: this.props.device })
      : (<div>Unknown type</div>);
  }
});

module.exports = Device;
