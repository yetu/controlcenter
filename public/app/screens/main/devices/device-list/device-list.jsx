'use strict';

var React = require("react");
var Device = require('./device');
var Room = require('./room');

var DeviceList = React.createClass({

	render: function () {
		return (
				<Room />
		)
	}
});

module.exports = DeviceList;