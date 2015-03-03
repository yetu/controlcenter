'use strict';
var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Navigation = require('common/regions/navigation');
var navigationStore = require('stores/navigation')

var style = require("./style.scss");

var MainScreen = React.createClass({
    
    getInitialState: function() {
        return {
            navItems: navigationStore.getItems()
        }
    },

	render: function () {
		return (
			<div className="main-screen row">
				<div className="main-screen__navigation column small-5 ">
					<Navigation items={this.state.navItems}/>
				</div>
				<div className="main-screen__content column small-15">
					<RouteHandler/>
				</div>
			</div>
		)
	}
});

module.exports = {
	MainScreen: MainScreen,
	DevicesRegion: require('./devices'),
	SettingsRegion: require('./settings')
};
