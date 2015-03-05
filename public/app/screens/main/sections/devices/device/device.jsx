var React = require('react');
var styleMixin = require('mixins/style-mixin');

var Device = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],
  render: function render () {
    return (
      <div className='cc-devices__device row'>
        <div className='cc-devices__device--title small-6 column'>{this.props.device.title}</div>
        <div className='cc-devices__device--type small-6 column'>{this.props.device.type}</div>
        <div className='cc-devices__device--control small-4 column'>Control</div>
        <div className='cc-devices__device--state small-4 column'>{this.props.device.state}</div>
      </div>
    );
  }
});

module.exports = Device;
