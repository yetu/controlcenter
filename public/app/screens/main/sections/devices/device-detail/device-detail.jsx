var React = require('react');

require('./style.scss');

var DeviceDetail = React.createClass({
  render: function render () {

    return (
      <div>
        <h1>{this.props.device.title}</h1>
      </div>
    );
  }
});

module.exports = DeviceDetail;
