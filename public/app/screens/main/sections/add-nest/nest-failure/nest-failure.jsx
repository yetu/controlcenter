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
    this.props.onComplete();
  },

  render: function render () {
    return (
      <span>Cannot connect to nest API</span>
    );
  }
});

module.exports = SendNestAccessToken;
