var React = require('react');
var Reflux = require('reflux');
var Device = require('./device');

var deviceListStore = require('stores/device-list');
require('./style.scss');

var Room = React.createClass({

  mixins: [
    Reflux.listenTo(deviceListStore, 'onDeviceListUpdate')
  ],

  getInitialState: function getInitialState () {
    return deviceListStore.getInitialState();
  },

  onDeviceListUpdate: function onDeviceListUpdate (devices) {
    if (devices.model) {
      this.setState({
        model: devices.model
      });
    }
  },

  render: function render () {
    var devices = this.state.model.map(function mapper (device, i) {
      return (
        <Device device={device} key={i}/>
      );
    });

    return (
      <div>
        <h2>Yetu room</h2>
        {devices}
      </div>
    );
  }
});

module.exports = Room;
