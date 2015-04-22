var React = require('react');

var ErrorMessage = React.createClass({

  render: function render () {
    return (<span>{this.props.message}</span>);
  }
});

module.exports = ErrorMessage;
