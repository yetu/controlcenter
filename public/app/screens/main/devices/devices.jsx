'use strict';

var React = require('react');
var DeviceList = require('./device-list');


var DevicesPage = React.createClass({
	render: function () {
		return (
			<div>
				<h2>My devices</h2>
				<a className="button" href="#">+ Add device</a>
				<DeviceList/>
				<a className="button" href="#" onClick={this.props.addRoom}>+ Add room</a>
			</div>
		);
	}
});

module.exports = DevicesPage;