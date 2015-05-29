var React = require('react');
var Reflux = require('reflux');
var styleMixin = require('mixins/style-mixin');
var _ = require('lodash');

var deviceListStore = require('stores/device-list');

var Device = require('./device');
var Gateway = require('./gateway');

var Room = React.createClass({

  mixins: [
    Reflux.connect(deviceListStore),
    styleMixin(require('./style.scss'))
  ],

  render: function render () {
    var devices = _(this.state.devices)
      .reject((device) => device.hidden)
      .map((device, i) => <Device device={device} key={i}/>)
      .value();

    return (
      <div className='cc-room'>
        <div className='row fixed-height-1 group-header'>
          <div className='column small-14 quarter-padded-left'>
            <h3 className='align-text-top'>{this.props.title}</h3>
          </div>
        </div>
        <Gateway/>

        {devices}
      </div>
    );
  }
});

module.exports = Room;
