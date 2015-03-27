var React = require('react');

var Icon = require('common/components/icon');

var styleMixin = require('mixins/style-mixin');

var DeviceState = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <div className='cc-device-state'>
        <Icon type='connected' />
        <span className='cc-device-state__text'>Connected</span>
      </div>
    );
  }

  // TODO implement connected disconnected switchers
  // we don't have data in model for now
});

module.exports = DeviceState;
