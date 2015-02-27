'use strict';

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DevicesRegion = require('./devices');
var SettingsRegion = require('./settings');

var Navigation = require('common/regions/navigation');
var MainScreen = React.createClass({

	mixins: [],

	render: function () {
		return (
			<div class="main-wrapper">
				<Navigation/>
				// Subroute handler for main screen
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


