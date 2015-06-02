var React = require('react');

var deviceMessageActions = require('actions/device-message-actions');

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
    // TODO: Map this.state.error to error message
    deviceMessageActions.pushMessage('Failed to connect with your nest account');
  },

  render: function render () {
    return null;
  }
});

module.exports = SendNestAccessToken;
