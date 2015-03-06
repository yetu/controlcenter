var React = require('react');
var DeviceFinderDialog = require('./device-finder-dialog');
var styleMixin = require('mixins/style-mixin');

var DeviceFinder = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  getInitialState: function getInitialState() {
    return {
      activity: null // Enum: null, searching, noDevices
    }
  },

  render: function render() {
    var findingDevicesDialog = this.dialog();
    var button = this.state.activity ? null : this.button();
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
      case 'searching':
        return this.searchDialog();
      case 'noDevices':
        return this.noResultsDialog();
    }
    return null;
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
      setTimeout(
        function() {
          if (this.state.activity==='searching') this.setState({activity:'noDevices'})
        }.bind(this),
        3000);
    },

  stopSearching: function stopSearching() {
    this.setState({activity: null});
  },

  closeDialog: function closeDialog() {
    this.setState({activity: null});
  }
});

module.exports = DeviceFinder;
