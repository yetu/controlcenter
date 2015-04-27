var React = require('react');
var Reflux = require('reflux');

var Room = require('./room');
var DeviceFinder = require('./device-finder');
var ErrorMessage = require('common/components/error-message');

var roomStore = require('stores/room');
var gatewayStore = require('stores/gateway');

var styleMixin = require('mixins/style-mixin');

var DevicesSection = React.createClass({

  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(roomStore, 'rooms'),
    Reflux.connect(gatewayStore, 'gateway')
  ],

  header: function header () {
    return (
      !this.state.gateway.error
        ? <DeviceFinder />
        : <ErrorMessage message='No Gateway found' />
    );
  },

  content: function content () {
    if (!this.state.gateway.error) {
      return this.state.rooms.map((room, index) =>
        <Room title={room.title} key={index} />
      );
    }
  },

  render: function render () {
    return (
      <div className='cc-devices grid-14 padded'>
        <div className='row fixed-height-3'>
          <div className='columns'>
            { this.header() }
          </div>
        </div>
        { this.content() }
      </div>
    );
  }

});

module.exports = DevicesSection;
