var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Reflux = require('reflux');

var Room = require('./room');
var DeviceFinder = require('./device-finder');
var ErrorMessage = require('common/components/error-message');
var Message = require('common/components/message');

var roomStore = require('stores/room');
var gatewayStore = require('stores/gateway');

var styleMixin = require('mixins/style-mixin');

var DevicesSection = React.createClass({

  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(roomStore, 'rooms'),
    Reflux.connect(gatewayStore, 'gateway')
  ],

  render: function render () {
    return (
      <div className='cc-devices grid-14 padded'>
        {this.state.gateway.error
          ? this.gatewayNotFoundErrorMessage()
          : [ <DeviceFinder />, this.message(), this.rooms() ]
        }
        <RouteHandler />
      </div>
    );
  },

  gatewayNotFoundErrorMessage: function gatewayNotFoundErrorMessage () {
    return (
      <div className='row fixed-height-3'>
        <div className='columns'>
          <ErrorMessage message='No Gateway found' />
        </div>
      </div>
    );
  },

  message: function message () {
    return (
      <div className='row fixed-height-1' ref='message'>
        <div className='column'>
          <Message message='This is the message' />
        </div>
      </div>
    );
  },

  rooms: function rooms () {
    return this.state.rooms.map((room, index) =>
        <Room title={room.title} key={index} />
    );
  }
});

module.exports = DevicesSection;
