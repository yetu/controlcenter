var React = require('react');
var Reflux = require('reflux');

var deviceMessageStore = require('stores/device-message-store');

var styleMixin = require('mixins/style-mixin');
var cx = require('classname');

var Message = React.createClass({

  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(deviceMessageStore, 'message')
  ],

  render: function render () {
    if (!this.state.message) {
      return null;
    }
    var level = this.state.message.level;
    var classes = cx({
      'cc-message': true,
      'info': level === deviceMessageStore.Levels.INFO,
      'warning': level === deviceMessageStore.Levels.WARNING,
      'error': level === deviceMessageStore.Levels.ERROR
    });
    return (<div className={classes}>{this.state.message.text}</div>);
  }
});

module.exports = Message;
