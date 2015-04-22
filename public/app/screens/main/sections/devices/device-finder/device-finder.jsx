var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var DeviceFinderDialog = require('./device-finder-dialog');

var deviceDiscoveryStore = require('stores/discovery-store');
var deviceDiscoveryActions = require('actions/discovery');
var styleMixin = require('mixins/style-mixin');
var Button = require('common/components/controls/button');

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
    var dialog = this.dialogForActivityMap()[this.state.activity] || _.noop;
    var button = this.state.activity === DeviceFinderActivity.CLOSED ? this.getButton() : null;

    return (
      <div className='cc-device-finder'>
        { dialog() }
        { button }
      </div>
    );
  },

  getButton: function getButton () {
    return (
      <Button onClick={this.startSearching}>
        + Add device
      </Button>
    );
  },

  dialogForActivityMap: function activityMap () {
    return {
      [DeviceFinderActivity.SEARCHING]: this.getSearchDialog,
      [DeviceFinderActivity.NO_DEVICES]: this.getNoResultsDialog,
      [DeviceFinderActivity.DEVICE_FOUND]: this.getDeviceFoundDialog
    };
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

  getDeviceFoundDialog: function getDeviceFoundDialog () {
    var status = <div className='cc-device-finder__status-warning'>Device found!</div>;

    return <DeviceFinderDialog
      status={status}
      showSeparator='true'
      title='TODO: Add title'
      description='TODO: Add description'
      closeAction={this.closeDialog}
      actionText='Ok'
      action={this.showFoundDeviceInfo} />;
  },

  startSearching: function startSearching () {
    this.setState({ activity: DeviceFinderActivity.SEARCHING });
    deviceDiscoveryActions.addDevice();
  },

  showFoundDeviceInfo: function showFoundDeviceInfo () {
    this.setState({ activity: DeviceFinderActivity.CLOSED });
  },

  stopSearching: function stopSearching () {
    this.setState({ activity: DeviceFinderActivity.CLOSED });
    this.closeDialog();
  },

  closeDialog: function closeDialog () {
    this.setState({ activity: DeviceFinderActivity.CLOSED });
  }
});

module.exports = DeviceFinder;