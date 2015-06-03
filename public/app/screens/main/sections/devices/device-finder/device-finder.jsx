var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var cx = require('classname');

var DeviceFinderDialog = require('./device-finder-dialog');
var DiscoveryModePrompt = require('./discovery-mode-prompt');

var discoveryStore = require('stores/discovery-store');
var discoveryActions = require('actions/discovery');
var DiscoverySessionState = require('services/devices/discovery-service/discovery-session-state.js');

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
    Reflux.listenTo(discoveryStore, 'onDiscoveryStateChange')
  ],

  getInitialState: function getInitialState () {
    return {
      activity: DeviceFinderActivity.CLOSED,
      discoveryModePromptVisible: false
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate (nextProps, nextState) {
    // Implicitly hide the discovery mode prompt when search dialog has appeared
    if (nextState.discoveryModePromptVisible && nextState.activity !== DeviceFinderActivity.CLOSED) {
      this.setState({ discoveryModePromptVisible: false });
      return false;
    }
    return true;
  },

  discoverySessionStateToActivity: {
    [DiscoverySessionState.STOPPED]: DeviceFinderActivity.DEVICE_FOUND,
    [DiscoverySessionState.EXPIRED]: DeviceFinderActivity.NO_DEVICES,
    [DiscoverySessionState.FAILED]: DeviceFinderActivity.NO_DEVICES
  },

  onDiscoveryStateChange: function onDiscoveryStateChange (data) {
    this.setState({
      activity: this.discoverySessionStateToActivity[data.state]
    });
  },

  render: function render () {
    var dialog = (this.dialogForActivityMap()[this.state.activity] || _.noop)();
    var promptVisible = !dialog && this.state.discoveryModePromptVisible;

    return (
      <div className='cc-device-finder'>
        <div className={'row fixed-height-2'}>
          <div className={'column content-align-bottom'}>
            {
              dialog
                ? dialog
                : this.getButton()
            }
          </div>
        </div>
        {
          promptVisible
            ? this.getDiscoveryPrompt()
            : null
        }
      </div>
    );
  },

  getButton: function getButton () {
    return (
      <Button onClick={this.toggleDiscoveryModePromptVisibility}>
        + Add device
      </Button>
    );
  },

  getDiscoveryPrompt: function getDiscoveryPrompt () {
    var buttons = [
      { image: 'flashlight', text: 'Scan for devices in your network', onClick: this.startSearching },
      { image: 'nest', text: 'Manually add device/service', onClick: this.redirectToNestLogin }
    ];
    return <DiscoveryModePrompt buttons={buttons} />;
  },

  dialogForActivityMap: function activityMap () {
    return {
      [DeviceFinderActivity.SEARCHING]: this.getSearchDialog,
      [DeviceFinderActivity.NO_DEVICES]: this.getNoDevicesFoundDialog,
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

  getNoDevicesFoundDialog: function getNoDevicesFoundDialog () {
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

  toggleDiscoveryModePromptVisibility: function toggleDiscoveryModePromptVisibility () {
    this.setState({ discoveryModePromptVisible: !this.state.discoveryModePromptVisible });
  },

  redirectToNestLogin: function redirectToNestLogin () {
    var nestConfig = window.yetu.config.nest;
    // TODO: Pass a generated state argument (generate it in backend, that also validates it on back redirect?)
    var state = 'STATE';
    window.location.replace(nestConfig.loginUrl + '?client_id=' + nestConfig.clientId + '&state=' + state);
  },

  startSearching: function startSearching () {
    this.setState({ activity: DeviceFinderActivity.SEARCHING });
    discoveryActions.startDiscovery();
  },

  showFoundDeviceInfo: function showFoundDeviceInfo () {
    this.setState({ activity: DeviceFinderActivity.CLOSED });
  },

  stopSearching: function stopSearching () {
    this.setState({ activity: DeviceFinderActivity.CLOSED });
    this.closeDialog();
    discoveryActions.stopDiscovery();
  },

  closeDialog: function closeDialog () {
    this.setState({ activity: DeviceFinderActivity.CLOSED });
  }
});

module.exports = DeviceFinder;
