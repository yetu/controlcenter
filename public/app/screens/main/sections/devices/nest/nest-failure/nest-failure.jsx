var React = require('react');

var SendNestAccessToken = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function getInitialState () {
    return {
      error: this.context.router.getCurrentParams().error
    };
  },

  componentDidMount: function componentDidMount () {
    // TODO: Push message to store
  },

  render: function render () {
    return null;
  }
});

module.exports = SendNestAccessToken;
