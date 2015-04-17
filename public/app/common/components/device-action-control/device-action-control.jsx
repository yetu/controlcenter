var React = require('react');
var Reflux = require('reflux');

var DeviceActions = require('actions/device');
var DeviceHelpers = require('helpers/device');

/* Controls */
var Switch = require('common/components/controls/switch');
var Slider = require('common/components/controls/slider');

var DeviceActionControl = React.createClass({

  controlByCapability: {
    switchable: Switch,
    settable: Slider
  },

  controlStateToActionData: {
    switchable: (state) => state.checked,
    settable: (state) => state.value
  },

  getControlProps: function getControlState (device) {
    var capability = device.primaryCapability;
    var property = DeviceHelpers.propertyByCapability[capability];
    var value = device.alterEgoComponent.properties[property];
    return { value: value, channel: this.generateAction };
  },

  generateAction: function generateActionData (state) {
    var device = this.props.device;
    var capability = device.primaryCapability;
    var transform = this.controlStateToActionData[capability];
    var property = DeviceHelpers.propertyByCapability[capability];
    var data = { [property]: transform(state) };
    var action = DeviceHelpers.getActionForProperty(device, property, 'set');
    DeviceActions.invokeAction(action, data);
  },

  render: function render () {
    var device = this.props.device;

    var result = null;
    if (device && device.alterEgoComponent) {
      result = React.createElement(
        this.controlByCapability[device.primaryCapability],
        this.getControlProps(device)
      );
    }
    return result;
  }
});

module.exports = DeviceActionControl;
