'use strict';

var React = require("react");
var StyleMixin = require('mixins/style-mixin');

var UserAvatar = React.createClass({
  mixins: [StyleMixin(require('./style.scss'))],
  render: function () {
    return (
      <div className="cc-user-avatar">
        <div className="cc-user-avatar__image-content">
          <img className="cc-user-avatar__image" src="http://placehold.it/80x80"/>
        </div>
        <div className="cc-user-avatar__button-content">
          <span className="cc-user-avatar__button">Change picture</span>
        </div>
      </div>
    )
  }
});


module.exports = UserAvatar;
