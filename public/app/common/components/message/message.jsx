var React = require('react');

var Message = React.createClass({

  render: function render () {
    return (<span>{this.props.message}</span>);
  }
});

module.exports = Message;
