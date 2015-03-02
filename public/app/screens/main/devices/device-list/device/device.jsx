'use strict';
var React = require('react');

var Device = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="small-4 column">
					Stub device
				</div>
				<div className="small-4 column">
					Stub device
				</div>
				<div className="small-2 column">
					Controller
				</div>
				<div className="small-2 column">
					Device
				</div>
			</div>
		);
	}
});

module.exports = Device;