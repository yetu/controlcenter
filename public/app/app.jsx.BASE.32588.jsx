'use strict';

var React = require('react');

var Reflux = require("reflux");

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;


//Pages
var DevicesPage = require('pages/devices');
var SettingsPage = require('pages/settings');
var Navigation = require('./components/navigation/navigation.jsx');

var deviceRooms = [
	{
		title: 'Home', devices: [
		{title: 'yetu Home Gateway', type: 'Home Gateway', connected: true},
		{title: 'Nest', type: 'Thermostat', connected: true}
	]
	},
	{
		title: 'Living room', devices: [
		{title: 'Nest', type: 'Thermostat', connected: false}
	]
	},
	{title: 'Bed room', devices: []}
];


var ControlCenter = React.createClass({

	mixins: [
		Reflux.listenTo(userStore, 'onStoreUpdate'),
		Reflux.listenTo(actions.showOverlay, 'showOverlay'),
		Reflux.listenTo(actions.goToPost, 'goToPost')
	],

	getInitialState: function () {

	},
	render: function () {

	}
});


var routes = (
	<Route handler={ ReactNews }>
		<Route name="post" path="/post/:postId" handler={ SinglePost } />
		<Route name="profile" path="user/:username" handler={ Profile } />
		<Route name="posts" path="/posts/:pageNum" handler={ Posts } ignoreScrollBehavior />
		<Route name="404" path="/404" handler={ UhOh } />
		<DefaultRoute name="home" handler={ Posts } />
	</Route>
);

Router.run(routes, function(Handler, state) {
	React.render(<Handler params={ state.params } />, document.getElementById('app'));
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
