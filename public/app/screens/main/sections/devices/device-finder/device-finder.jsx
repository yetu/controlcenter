var React = require('react');
var DeviceFinderDialog = require('./device-finder-dialog');
var styleMixin = require('mixins/style-mixin');

var DeviceFinder = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  getInitialState: function getInitialState() {
    return {
      activity: 'searching' // null
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

  findDevices: function findDevices() {
    this.setState({activity: 'searching'});
  },

  button: function () {
    return <a className='cc-device-finder__button' href='#' onClick={this.findDevices}>+ Add device</a>;
  },

  dialog: function dialog() {
    switch (this.state.activity) {
      case 'searching':
        return this.searchDialog();
      case 'noResults':
        return this.noResultsDialog();
    }
    return null;
  },

  searchDialog: function () {
    var status = <span>Spinner Spinner Spinner</span>;
    return <DeviceFinderDialog
      status={status}
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      actionText='Stop'
      action={null} />;
  },

  noResultsDialog: function () {
    var status = <div>No devices found</div>;
    return <DeviceFinderDialog
      status={status}
      title='Searching for new devices'
      description='Please make sure that all devices are in discovery mode'
      actionText='Stop'
      action={null} />;
  }
});

module.exports = DeviceFinder;
