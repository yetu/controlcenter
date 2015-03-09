var React = require('react');
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('./controls/switch');
var SliderControl = require('./controls/slider');

var Device = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    return (
      <div className="cc-device">
        <a className="cc-device__title" onClick={this.props.onDeviceClick}>{this.props.device.title}</a>
        <div className="cc-device__type">{this.props.device.type}</div>
        <div className="cc-device__control">{this.getControl()}</div>
        <div className={'cc-device__state-image ' + this.getStateImageClass()}/>
        <div className="cc-device__state-text">{this.getConnectedText()}</div>
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
  },

  getStateImageClass: function getStateImageClass () {
    var name = 'cc-device__state-image-';
    if (this.props.device.state === 'connected') {
      return name + 'connected';
    } else {
      return name + 'disconnected';
    }
  },

  getConnectedText: function getConnectedText () {
    if (this.props.device.state === 'connected') {
      return 'Connected';
    } else {
      return 'Disconnected';
    }
  }
});

module.exports = Device;
