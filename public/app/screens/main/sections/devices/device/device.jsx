var React = require('react');
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('./controls/switch');
var SliderControl = require('./controls/slider');

var Device = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    return (
      <div className="cc-device">
        <div className="cc-device__title">{this.props.device.title}</div>
        <div className="cc-device__type">{this.props.device.type}</div>
        <div className="cc-device__control">{this.control()}</div>
        <div className={'cc-device__state-image ' + this.stateImageClass()}>&nbsp;</div>
        <div className="cc-device__state-text">{this.connectedText()}</div>
      </div>
    );
  },

  control: function control () {
    var control;
    switch (this.props.device.type) {
      case 'Home Gateway':
        control = SwitchControl;
        break;
      case 'Thermostat':
        control = SliderControl;
        break;
    }
    return control ? React.createElement(control, {device: this.props.device}) : (<div>Unknown type</div>);
  },

  stateImageClass: function stateImageClass () {
    var name = 'cc-device__state-image-';
    if (this.props.device.state === 'connected') {
      return name + 'connected';
    } else {
      return name + 'disconnected';
    }
  },

  connectedText: function connectedText () {
    if (this.props.device.state === 'connected') {
      return 'Connected';
    } else {
      return 'Disconnected';
    }
  }
});

module.exports = Device;
