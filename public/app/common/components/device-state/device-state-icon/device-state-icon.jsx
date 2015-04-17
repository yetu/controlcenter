var React = require('react');

var Icon = require('common/components/icon');

var DeviceStateIcon = React.createClass({

  render: function render () {
    return (
      <Icon type={this.props.connected ? 'connected' : 'disconnected'} />
    );
  }

});

module.exports = DeviceStateIcon;
