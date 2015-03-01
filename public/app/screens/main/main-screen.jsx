'use strict';
var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DevicesRegion = require('./devices');
var SettingsRegion = require('./settings');

var Navigation = require('common/regions/navigation');
var MainScreen = React.createClass({

	render: function () {
		return (
			<div className="main-wrapper">
				<Navigation/>
				<RouteHandler/>
			</div>
		)
	}
});

module.exports = {
	MainScreen : MainScreen,
	DevicesRegion : DevicesRegion,
	SettingsRegion : SettingsRegion
};


