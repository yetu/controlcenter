'use strict';

var React = require('react');
var Room = require('components/room');
var DevicesPage = React.createClass({
	render: function() {
		return (
			<div>
				<h2>My devices</h2>
				<a className="button" href="#">+ Add device</a>
        {this.props.rooms.map(function(room, i) {
	        return (
		        <Room room={room} key={i} />
	        );
        }, this)}
				<a className="button" href="#" onClick={this.props.addRoom}>+ Add room</a>
			</div>
		);
	}
});

module.exports = DevicesPage;