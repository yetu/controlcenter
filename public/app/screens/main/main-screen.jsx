'use strict';
var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Navigation = require('./navigation');
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
      <div className="main-screen">
        <div className="row visible-for-small-only">
          <Navigation items={this.state.navItems}/>
        </div>
        <div className="row">
          <div className="main-screen__navigation column medium-5 hide-for-small-only">
            <Navigation items={this.state.navItems}/>
          </div>
          <div className="main-screen__content column medium-15 small-20">
            <RouteHandler/>
          </div>
        </div>
			</div>
		)
	}
});

module.exports = MainScreen;
