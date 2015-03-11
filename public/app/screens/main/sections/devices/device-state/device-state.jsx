var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');
var stateEnum = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected'
};

var DeviceState = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],


  render: function render () {
    return (
        <div className="cc-device-state">
          <div className={'cc-device-state__image ' + this.getStateImageClass()}/>
          <div className="cc-device-state__text">{this.getConnectedText()}</div>
        </div>
    );
  },

  getStateImageClass: function getStateImageClass () {
    var name = 'cc-device-state__image-';
    if (this.props.device.state === stateEnum.CONNECTED) {
      return name + stateEnum.CONNECTED;
    } else {
      return name + stateEnum.DISCONNECTED;
    }
  },

  getConnectedText: function getConnectedText () {
    if (this.props.device.state === stateEnum.CONNECTED) {
      return 'Connected';
    } else {
      return 'Disconnected';
    }
  }
});

module.exports = DeviceState;
