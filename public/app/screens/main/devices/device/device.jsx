'use strict';
var React = require('react');

var Device = React.createClass({
	getInitialState : function(){
	    return {a:5};
	},

	render: function() {
		return (
			<div>
                <h3>{this.props.device.title}</h3>
			</div>
		);
	}
});

module.exports = Device;