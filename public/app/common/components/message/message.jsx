var React = require('react');
var Reflux = require('reflux');

var deviceMessageStore = require('stores/device-message-store');

var styleMixin = require('mixins/style-mixin');

var Message = React.createClass({

  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(deviceMessageStore, 'message')
  ],

  render: function render () {
    return (<span>{this.state.message}</span>);
  }
});

module.exports = Message;
