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
      <div className='cc-room '>
        <div className='row fixed-height-1'>
          <div className='columns small-14 padded-left'>
            <h3 className='cc-room__header'>{this.props.title}</h3>
          </div>
        </div>
        {devices}
      </div>
    );
  }
});

module.exports = Room;
