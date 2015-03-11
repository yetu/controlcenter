var React = require('react');
var Reflux = require('reflux');
var Room = require('./room');
var DeviceFinder = require('./device-finder');

var roomStore = require('stores/room');
var roomActions = require('actions/room');

var styleMixin = require('mixins/style-mixin');

// TODO: Rename to DevicesSection
var DeviceRegion = React.createClass({
  mixins: [
    Reflux.connect(roomStore, 'rooms'),
    styleMixin(require('./style.scss'))
  ],

  getInitialState: function getInitialState () {
    return { rooms: roomStore.getRooms() };
  },

  render: function render () {
    var rooms = this.state.rooms.map(function mapper (room, i) {
      return (
        <Room room={room} key={i} />
      );
    });
    return (
      <div className='cc-devices'>
        <h2 className='cc-devices__title'>My devices</h2>
        <DeviceFinder />
        {rooms}
        <a className='cc-devices__button' href='#' onClick={this.handleAddRoom}>+ Add room</a>
      </div>
    );
  },

  handleAddRoom: function handleAddRoom () {
    roomActions.createRoom();
  }
});

module.exports = DeviceRegion;
