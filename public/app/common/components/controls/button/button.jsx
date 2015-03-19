var React = require('react');
var Pure = require('react/addons').addons.PureRenderMixin;
var cx = require('react/lib/cx');
var styleMixin = require('mixins/style-mixin');

module.exports = React.createClass({
  mixins: [styleMixin(require('./style.scss')), Pure],

  render: function renderButton () {

    var className = cx({
      'cc-button': true,
      secondary: this.props.secondary,
      [this.props.size]: this.props.size ? true : false
    });

    return (
      <a className={ className } href='#' onClick={this.props.onClick}> { this.props.children }</a>
    );
  }

});
