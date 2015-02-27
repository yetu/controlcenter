'use strict';

var React = require('react');
var Navigation = React.createClass({
	handleItemClick: function () {
		console.log('Handle click');
	},
	render: function () {
		return (
			<div>
				<ul className="side-nav">
          {this.props.items.map(function () {
            return (
              <li>
                <a href="#" onClick={this.handleItemClick}>Test items</a>
              </li>
            );
          }, this)}
				</ul>
			</div>
		);
	}
});

module.exports = Navigation;