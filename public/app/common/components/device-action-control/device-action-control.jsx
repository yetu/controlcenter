var React = require('react');
var Reflux = require('reflux');

var DeviceActions = require('actions/device');
var Capability = require('models/capability');

/* Controls */
var Switch = require('common/components/controls/switch');
var Lock = require('common/components/controls/lock');
var ValueUpDown = require('common/components/controls/value-updown');
var Measurement = require('common/components/controls/measurement');

var DeviceActionControl = React.createClass({

  controlByCapability: {
    [Capability.LOCKABLE]: Lock,
    // TODO: Fix typo "set<t>able" in household API (4 fixes total!)
    [Capability.SETTABLE]: ValueUpDown,
    [Capability.MEASUREMENT]: Measurement,
    [Capability.SWITCHABLE]: Switch
  },

  controlStateToActionData: {
    [Capability.SWITCHABLE]: (state) => state.checked,
    [Capability.LOCKABLE]: (state) => state.checked,
    // TODO: Fix typo "set<t>able" in household API (4 fixes total!)
    [Capability.SETTABLE]: (state) => state.value
  },

  getControlProps: function getControlState (device) {
    var capability = device.primaryCapability;
    var property = device.alterEgoComponent.get(capability);
    return {
      value: property.value,
      unit: property.symbol,
      onChange: this.invokeValueChangeAction
    };
  },

  invokeValueChangeAction: function invokeValueChangeAction (state) {
    var device = this.props.device;
    var capability = device.primaryCapability;
    var transform = this.controlStateToActionData[capability];
    var data = { value: transform(state) };
    var alterEgoComponent = device.alterEgoComponent;
    var capabilityProperty = Capability.propertyOf[capability];
    var action = alterEgoComponent.actions[capability][capabilityProperty].set;
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
