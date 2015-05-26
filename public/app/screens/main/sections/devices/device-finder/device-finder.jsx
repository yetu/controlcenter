var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var cx = require('classname');

var DeviceFinderDialog = require('./device-finder-dialog');
var DiscoveryModePrompt = require('./discovery-mode-prompt');

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
    var dialog = (this.dialogForActivityMap()[this.state.activity] || _.noop)();
    var promptVisible = !dialog && this.state.discoveryModePromptVisible;

    return (
      <div className='cc-device-finder'>
        <div className={'row fixed-height-' + (promptVisible ? '2' : '3')}>
          <div className={'column ' + (promptVisible ? 'content-align-bottom' : '')}>
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
      <Button onClick={this.showDiscoveryModePrompt}>
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

  showDiscoveryModePrompt: function showDiscoveryModePrompt () {
    this.setState({ discoveryModePromptVisible: true });
  },

  redirectToNestLogin: function redirectToNestLogin (event) {
    event.preventDefault();
    var nestConfig = window.yetu.config.nest;
    // TODO: Pass a generated state argument (generate it in backend, that also validates it on back redirect?)
    var state = 'STATE';
    window.location.replace(nestConfig.loginUrl + '?client_id=' + nestConfig.clientId + '&state=' + state);
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
