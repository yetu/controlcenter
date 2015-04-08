var React = require('react');

var Icon = require('common/components/icon');

var styleMixin = require('mixins/style-mixin');

var DeviceState = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <div className='cc-device-state'>

        <Icon type={this.props.connected ? 'connected' : 'disconnected'}/>
        <span className='cc-device-state__text'>{
          this.props.connected
            ? 'Connected'
            : 'Disconnected'
        }
        </span>
      </div>
    );
  }

});

module.exports = DeviceState;
