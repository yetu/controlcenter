'use strict';

var React = require('react'),
	Router = require('react-router'),
	styles = require("./style.scss"),
	NavigationItem = require("./nav-item");

var Link = Router.Link;

var Navigation = React.createClass({

	render: function () {
		return (
			<div className="cc_navigation">
				<ul className="cc_navigation__list">
					<li>
						<Link to="devices">Dashboard</Link>
					</li>
					<li>
						<Link to="settings">Dashboard</Link>
					</li>

				</ul>
			</div>
		);
	}
});

module.exports = Navigation;