var React = require('react');
var styleMixin = require('mixins/style-mixin');

var AddNest = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  getInitialState: function getInitialState () {
    return {
      token: this.props.params.token
    };
  },

  componentDidMount: function componentDidMount () {
    // TODO: Send token to gateway backend if we don't do it in the backend
  },

  render: function render () {
    return (
      <span>Nest token: { this.state.token }</span>
    );
  }
});

module.exports = AddNest;
