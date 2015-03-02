'use strict';

var React = require('react');
var DeviceList = require('./device-list');


var DeviceRegion = React.createClass({
	render: function () {
		return (
			<div>
				<h2>My devices</h2>
				<a className="button" href="#">+ Add device</a>
				<DeviceList/>
			</div>
		);
	}
});

module.exports = DeviceRegion;