var React = require('react');
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('./controls/switch');

var Device = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    return (
      <div className="cc-device__row">
        <div className="cc-device__title-column">{this.props.device.title}</div>
        <div className="cc-device__type-column">{this.props.device.type}</div>
        <div className="cc-device__control-column">{this.control()}</div>
        <div className={'cc-device__state-image-column ' + this.stateImageClass()}>&nbsp;</div>
        <div className="cc-device__state-text-column">{this.connectedText()}</div>
      </div>
    );
  },

  control: function control () {
    return (
      <SwitchControl device={this.props.device} />
    );
  },

  stateImageClass: function setImageClass () {
    var name = 'cc-device__state-img-';
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
