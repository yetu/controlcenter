'use strict';

var React = require("react");
var Device = require('./device');
var Room = require('./room');

var DeviceList = React.createClass({

	mixins: [],

	render: function () {
		return (
			this.props.rooms.map(function(room) {
				return (
					<Room room={room} />
				);
			}, this)
		)
	}
});

module.exports = DeviceList;