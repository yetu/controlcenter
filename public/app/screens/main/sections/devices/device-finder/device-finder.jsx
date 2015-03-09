var React = require('react');
var DeviceFinderDialog = require('./device-finder-dialog');
var styleMixin = require('mixins/style-mixin');

var DeviceFinderActivity = {
  NONE: 'none',
  SEARCHING: 'searching',
  NO_DEVICES: 'noDevices'
}

var DeviceFinder = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  getInitialState: function getInitialState() {
    return {
      activity: DeviceFinderActivity.NONE
    }
  },

  render: function render() {
    var findingDevicesDialog = this.dialog();
    var button = this.state.activity === DeviceFinderActivity.NONE ? this.button() : null;
    return (
      <div className="cc-device-finder">
        { findingDevicesDialog }
        { button }
      </div>
    );
  },

  button: function () {
    return <a className='cc-device-finder__button' href='#' onClick={this.startSearching}>+ Add device</a>;
  },

  dialog: function dialog() {
    switch (this.state.activity) {
      case DeviceFinderActivity.SEARCHING:
        return this.searchDialog();
      case DeviceFinderActivity.NO_DEVICES:
        return this.noResultsDialog();
      default:
        return null;
    }
  },

  searchDialog: function () {
    var status = <div className='cc-device-finder__spinner'/>;
    return <DeviceFinderDialog
      status={status}
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      actionText='Stop'
      action={this.stopSearching} />;
  },

  noResultsDialog: function () {
    var status = <div className="cc-device-finder__status-warning">No devices found</div>;
    return <DeviceFinderDialog
      status={status}
      showSeparator='true'
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      closeAction={this.closeDialog}
      actionText='Try again'
      action={this.startSearching} />;
  },

  startSearching: function startSearching() {
      this.setState({activity: 'searching'});

      // TODO: Remove mock up code as soon as backend logic is used
      var displayNoDevicesDialog = function displayNoDevicesDialog() {
        if (this.state.activity===DeviceFinderActivity.SEARCHING) {
          this.setState({activity:'noDevices'})
        }
      }.bind(this);

      setTimeout(displayNoDevicesDialog, 3000);
    },

  stopSearching: function stopSearching() {
    // TODO: stop search here
    this.closeDialog();
  },

  closeDialog: function closeDialog() {
    this.setState({activity: DeviceFinderActivity.NONE});
  }
});

module.exports = DeviceFinder;
