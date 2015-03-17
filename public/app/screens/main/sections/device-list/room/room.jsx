var React = require('react');
var Device = require('./device');

require('./style.scss');

var Room = React.createClass({

  render: function render () {
    var devices = this.props.room.devices.map(function mapper (device, i) {
      return (
        <Device device={device} key={i}/>
      );
    });

    return (
      <div>
        <h2>{this.props.room.title}</h2>
        {devices}
      </div>
    );
  }
});

module.exports = Room;
