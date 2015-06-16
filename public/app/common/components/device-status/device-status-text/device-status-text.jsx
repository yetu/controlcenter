var React = require('react');

var styleMixin = require('mixins/style-mixin');

var DeviceStatusText = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <span className='cc-device-status-text'>{this.props.status}</span>
    );
  }

});

module.exports = DeviceStatusText;
