'use strict';
var React = require("react");
var styles = require("./style.scss");

var NavigationItem = React.createClass({

	handleItemClick: function () {
		console.log('Handle click');
	},

	render: function () {
		return (
			<li>
				<a  onClick={this.handleItemClick}>Test items</a>
			</li>
		)
	}
});

module.exports = NavigationItem;