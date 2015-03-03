'use strict';

var React = require('react');
var Device = require('screens/main/devices/device/index');

require('./style.scss');

var Room = React.createClass({
    render: function () {
        var devices = this.props.room.devices.map(function(device, i) {
            return (
                <Device device={device} key={i} />
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
