var React = require('react');
var Reflux = require('reflux');
var DeviceFinderDialog = require('./device-finder-dialog');

var deviceDiscoveryStore = require('stores/discovery-store');
var deviceDiscoveryActions = require('actions/discovery');
var styleMixin = require('mixins/style-mixin');

var DeviceFinderActivity = {
  CLOSED: 'closed',
  SEARCHING: 'searching',
  NO_DEVICES: 'noDevices',
  DEVICE_FOUND: 'deviceFound'
};

var DeviceFinder = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.listenTo(deviceDiscoveryStore, 'onDiscoveryChange')
  ],

  getInitialState: function getInitialState () {
    return {
      activity: DeviceFinderActivity.CLOSED
    };
  },

  onDiscoveryChange: function onDiscoveryChange (discoveryData) {
    if (discoveryData.model) {
      this.setState({
        activity: DeviceFinderActivity.DEVICE_FOUND
      });
    } else if (discoveryData.error) {
      this.setState({
        activity: DeviceFinderActivity.NO_DEVICES
      });
    }
  },

  render: function render () {
    var findingDevicesDialog = this.getDialog();
    var button = this.state.activity === DeviceFinderActivity.CLOSED ? this.getButton() : null;

    return (
      <div className='cc-device-finder'>
        { findingDevicesDialog }
        { button }
      </div>
    );
  },

  getButton: function getButton () {
    return <a className='cc-device-finder__button' href='#' onClick={this.startSearching}>+ Add device</a>;
  },

  getDialog: function getDialog () {
    var dialogToRender = null; // no jsx markup dy default

    if (this.state.activity === DeviceFinderActivity.SEARCHING) {
      dialogToRender = this.getSearchDialog();
    } else if (this.state.activity === DeviceFinderActivity.NO_DEVICES) {
      dialogToRender = this.getNoResultsDialog();
    } else if (this.state.activity === DeviceFinderActivity.DEVICE_FOUND) {
      dialogToRender = this.getDeviceFoundDialog();
    }

    return dialogToRender;
  },

  getSearchDialog: function getSearchDialog () {
    var status = <div className='cc-device-finder__spinner'/>;

    return <DeviceFinderDialog
      status={status}
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      actionText='Stop'
      action={this.stopSearching} />;
  },

  getNoResultsDialog: function getNoResultsDialog () {
    var status = <div className='cc-device-finder__status-warning'>No devices found</div>;

    return <DeviceFinderDialog
      status={status}
      showSeparator='true'
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      closeAction={this.closeDialog}
      actionText='Try again'
      action={this.startSearching} />;
  },

  getDeviceFoundDialog: function getNoResultsDialog () {
    var status = <div className='cc-device-finder__status-warning'>Device found!</div>;

    return <DeviceFinderDialog
      status={status}
      showSeparator='true'
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      closeAction={this.closeDialog}
      actionText='Ok'
      action={this.showFoundDeviceInfo} />;
  },

  startSearching: function startSearching () {
    this.setState({activity: DeviceFinderActivity.SEARCHING});
    deviceDiscoveryActions.addDevice();
  },

  showFoundDeviceInfo: function showFoundDeviceInfo () {

  },

  stopSearching: function stopSearching () {
    deviceDiscoveryActions.stopDiscovery();
    this.closeDialog();
  },

  closeDialog: function closeDialog () {
    this.setState({activity: DeviceFinderActivity.NONE});
  }
});

module.exports = DeviceFinder;
