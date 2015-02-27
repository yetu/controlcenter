'use strict';

var React = require('react');
var Reflux = require("reflux");

<<<<<<< HEAD
var appStyle = require('./project-setup/all.scss');

=======
>>>>>>> Added binding between components
var actions = require("./actions");

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var Link = Router.Link;

var MainScreen = require('./screens/main').MainScreen;
var DevicesRegion = require('./screens/main').DevicesRegion;
var SettingsRegion = require('./screens/main').SettingsRegion;

var ControlCenter = React.createClass({
	render: function () {
		return (
			<RouteHandler/>
		)
	}
});

var routes = (
<<<<<<< HEAD
	<Route path="/" handler={ControlCenter}>
		<Route name="main" handler={MainScreen}>
			<Route name="settings" handler={SettingsRegion}/>
			<DefaultRoute name="devices" handler={DevicesRegion}/>
		</Route>
		<Redirect from="/" to="main"/>
	</Route>
);

Router.run(routes, function (Handler, state) {
=======
	<Route handler={ ControlCenter }>
		<DefaultRoute name="/cc" handler={ MainScreen } >
			<Route name="devices" handler={ DevicesRegion }/>
			<Route name="settings" handler={ SettingsRegion }/>
		</DefaultRoute>
	</Route>
);

Router.run(routes, function(Handler, state) {
>>>>>>> Added binding between components
	React.render(<Handler params={ state.params } />, document.body);
});


//var addRoom = function() {
//    deviceRooms.push({title: 'New room', devices: []});
//    // TODO: This doesn't integrate well with the component lifecycle. shouldn't we call #setProps instead?
//    // TODO: Use Flux pattern
//    render();
//};
//
//var navigationItems = [
//    {title: 'My devices', page: DevicesPage, props: {rooms: deviceRooms, addRoom: addRoom}},
//    {title: 'My settings', page: SettingsPage},
//];
//
//function render() {
//    React.render(<Navigation items={navigationItems} />, document.getElementById('navigation'));
//}
//
//
//
//
//render();
//
//var deviceRooms = [
//	{
//		title: 'Home', devices: [
//		{title: 'yetu Home Gateway', type: 'Home Gateway', connected: true},
//		{title: 'Nest', type: 'Thermostat', connected: true}
//	]
//	},
//	{
//		title: 'Living room', devices: [
//		{title: 'Nest', type: 'Thermostat', connected: false}
//	]
//	},
//	{title: 'Bed room', devices: []}
//];
//

