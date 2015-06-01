var React = require('react');
var Pure = require('react/addons').addons.PureRenderMixin;
var cx = require('classname');
var styleMixin = require('mixins/style-mixin');

module.exports = React.createClass({
  mixins: [styleMixin(require('./style.scss')), Pure],

  render: function renderButton () {

    var className = cx({
      'cc-button': true,
      secondary: this.props.secondary,
      [this.props.size]: this.props.size ? true : false,
      [this.props.className || ''] : true
    });

    return (
      <a className={ className } href='#' onClick={this.onClick}> { this.props.children }</a>
    );
  },

  onClick: function onClick (e) {
    e.preventDefault();
    this.props.onClick();
  }

});
