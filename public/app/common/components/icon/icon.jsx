var React = require('react');
var Pure = require('react/addons').addons.PureRenderMixin;
var cx = require('classname');
var styleMixin = require('mixins/style-mixin');

module.exports = React.createClass({
  mixins: [styleMixin(require('./style.scss')), Pure],

  getIconTypeClass: function getIconTypeClass () {
    return this.props.type
      ? 'cc-icon-' + this.props.type
      : '';
  },

  render: function renderButton () {

    var className = cx({
      'cc-icon': true,
      [this.props.size || '']: true,
      [this.getIconTypeClass()]: true
    });

    return (
      <span className={ className }></span>
    );
  }

});
