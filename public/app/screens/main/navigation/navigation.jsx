'use strict';

var React = require('react'),
  Link = require('react-router').Link,
  StyleMixin = require('mixins/style-mixin');

var Navigation = React.createClass({
  mixins: [StyleMixin(require("./style.scss"))],
  render: function () {
    var items = this.props.items.map(function (item, i) {
      return (
        <li>
          <Link to={item.linkTo} key={i} className="cc_navigation__link">{item.title}</Link>
        </li>
      );
    });

    return (
      <div className="cc_navigation">
        <ul className="cc_navigation__list">
                    {items}
        </ul>
      </div>
    );
  }
});

module.exports = Navigation;