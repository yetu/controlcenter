var React = require('react');
var Reflux = require('reflux');

var Room = require('./room');
var DeviceFinder = require('./device-finder');
var Button = require('common/components/controls/button');

var styleMixin = require('mixins/style-mixin');

var DevicesSection = React.createClass({

  mixins: [
    styleMixin(require('./style.scss'))
  ],

  render: function render () {
    return (
      <div className='cc-devices grid-14 padded'>
        <DeviceFinder />
        <Room title='Living Room' />
        <a className='cc-devices__button' href='#' onClick={ this.handleAddRoom }>+ Add room</a>
      </div>
    );
  }
});

module.exports = DevicesSection;
