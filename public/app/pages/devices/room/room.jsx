'use strict';

var React = require('react');

var Device = require('pages/devices/device/device.jsx');

var Room = React.createClass({
	render: function () {
		return (
			<div>
				<h3>{this.props.room.title}</h3>
        {this.props.room.devices.map(function (device, i) {
	        return (
		        <Device device={device} key={i} />
	        )
        }, this)}
			</div>
		);
	}
});

module.exports = Room;
