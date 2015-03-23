var React = require('react');
var styleMixin = require('mixins/style-mixin');

var DeviceState = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
        <header className='cc-header'>
          {this.props.children}
        </header>
    );
  }
});

module.exports = DeviceState;
