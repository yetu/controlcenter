'use strict';

var React = require('react');
//How to we communicate subling components
var Device = require('../device');

var Room = React.createClass({
	render: function () {
		return (
			<div>
				<h3>Hello</h3>
        <Device />
			</div>
		);
	}
});

module.exports = Room;
