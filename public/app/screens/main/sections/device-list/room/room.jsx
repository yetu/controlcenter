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
      <div className='cc-room '>
        <div className='row fixed-height'>
          <div className='columns small-14 padded-left'>
            <h3 className='cc-room__header'>{this.props.room.title}</h3>
          </div>
        </div>
        {devices}
      </div>
    );
  }
});

module.exports = Room;
