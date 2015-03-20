var React = require('react');
var Reflux = require('reflux');

var Room = require('./room');
var DeviceFinder = require('./device-finder');
var Button = require('common/components/controls/button');

var roomStore = require('stores/room');
var roomActions = require('actions/room');

var styleMixin = require('mixins/style-mixin');

var DevicesSection = React.createClass({
  mixins: [
    Reflux.connect(roomStore, 'rooms'),
    styleMixin(require('./style.scss'))
  ],

  componentWillMount: function componentWillMount () {
    roomActions.fetchRooms();
  },

  render: function render () {
    var rooms = this.state.rooms.map(function mapper (room, i) {
      return (
        <Room room={room} key={i} />
      );
    });

    return (
      <div className='cc-devices grid-14 padded'>
        <DeviceFinder />
        {rooms}
        <div className='row fixed-height'/>
        <Button onClick={ this.handleAddRoom }> + Add Room </Button>
      </div>
    );
  },

  handleAddRoom: function handleAddRoom () {
    roomActions.createRoom();
  }
});

module.exports = DevicesSection;
