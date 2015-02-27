'use strict';

var React = require('react');
//How to we communicate subling components
var Device = require('../device');

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
