var React = require('react');
var Reflux = require('reflux');
var styleMixin = require('mixins/style-mixin');

var deviceListStore = require('stores/device-list');

var Device = require('./device');
var Gateway = require('./gateway');

var Room = React.createClass({

  mixins: [
    Reflux.connect(deviceListStore),
    styleMixin(require('./style.scss'))
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
