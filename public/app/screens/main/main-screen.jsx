'use strict';
var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Navigation = require('common/regions/navigation');
var style = require("./style.scss");

var MainScreen = React.createClass({
    
    getInitialState: function() {
        return {
            navItems: [
                {title: "My devices", linkTo: "devices"},
                {title: "My settings", linkTo: "settings"}
            ]
        }
    },

	render: function () {
		return (
			<div className="main-screen">
				<div className="main-screen__navigation">
					<Navigation items={this.state.navItems}/>
				</div>
				<div className="main-screen__content">
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


