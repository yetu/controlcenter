var React = require('react');
var Reflux = require('reflux');

var DeviceActions = require('actions/device');
var DeviceHelpers = require('helpers/device');

/* Controls */
var Switch = require('common/components/controls/switch');
var Slider = require('common/components/controls/slider');

var DeviceActionControl = React.createClass({

  controlByCapability: {
    SWITCHABLE: Switch,
    SETTABLE: Slider
  },

  controlStateToActionData: {
    SWITCHABLE: (state) => state.checked,
    SETTABLE: (state) => state.value
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
    var data = { value: transform(state) };
    var action = DeviceHelpers.getActionForCapability(device, capability, 'set');
    DeviceActions.invokeAction(action, data);
  },

  render: function render () {
    var device = this.props.device;

    // on initial load we need to handle missing props
    if (device && device.alterEgoComponent) {
      var control = this.controlByCapability[device.primaryCapability];
      if (control) {
        return React.createElement(
          control,
          this.getControlProps(device)
        );
      }
    }
    return null;
  }
});

module.exports = DeviceActionControl;
