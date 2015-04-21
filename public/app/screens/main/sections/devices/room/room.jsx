var React = require('react');
var Reflux = require('reflux');
var Device = require('./device');
var Gateway = require('./gateway');

var deviceListStore = require('stores/device-list');
require('./style.scss');

var Room = React.createClass({

  mixins: [
    Reflux.connect(deviceListStore)
  ],

  render: function render () {
    var devices = this.state.devices.map(function mapper (device, i) {
      return (
        <Device device={device} key={i}/>
      );
    });

    return (
      <div className='cc-room'>
        <div className='row fixed-height-1 group-header'>
          <div className='columns small-14 quarter-padded-left'>
            <h3 className='cc-room__header'>{this.props.title}</h3>
          </div>
        </div>
        <Gateway/>

        {devices}
      </div>
    );
  }
});

module.exports = Room;
