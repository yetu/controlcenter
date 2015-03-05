var React = require('react');

var Device = React.createClass({
  render: function render () {
    return (
        <div>
            <h3>{this.props.device.title}</h3>
        </div>
    );
  }
});

module.exports = Device;
