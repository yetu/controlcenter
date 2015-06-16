var React = require('react');

var Icon = require('common/components/icon');

var DeviceStatusIcon = React.createClass({

  render: function render () {
    return (
      <Icon type={this.props.status} />
    );
  }

});

module.exports = DeviceStatusIcon;
