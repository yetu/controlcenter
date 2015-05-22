var React = require('react');
var styleMixin = require('mixins/style-mixin');

var AddNest = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  getInitialState: function getInitialState () {
    return {
      successState: this.props.params.state
    };
  },

  componentDidMount: function componentDidMount () {
    // TODO: Send token to gateway backend if we don't do it in the backend
  },

  render: function render () {
    return (
      <span>Retrieved nest access token: { this.state.successState }</span>
    );
  }
});

module.exports = AddNest;
