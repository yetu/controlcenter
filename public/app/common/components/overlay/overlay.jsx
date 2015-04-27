var React = require('react');
var cx = require('classname');
var styleMixin = require('mixins/style-mixin');

var Overlay = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  getInitialState: function getInitialState () {
    return { visible: this.props.visible || false };
  },

  render: function render () {
    return (<div className={this.className()}>{this.props.children}</div>);
  },

  className: function className () {
    return cx({
      'cc-overlay': true,
      'hide': !this.state.visible
    });
  },

  show: function show () {
    this.setState({ visible: true });
  },

  hide: function hide () {
    this.setState({ visible: false });
  }

});

module.exports = Overlay;
