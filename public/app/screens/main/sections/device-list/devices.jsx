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
    styleMixin(require('./style.scss')),
    Reflux.connect(roomStore, 'rooms')
  ],

  render: function render () {
    return (
      <div className='cc-devices grid-14 padded'>
        <div className='row fixed-height-3'>
          <div className='columns'>
            <DeviceFinder />
          </div>
        </div>
        {
          this.state.rooms.map((room) =>
            <Room title={ room.title } />
          )
        }
      </div>
    );
  },

  handleAddRoom: function handleAddRoom () {
    roomActions.createRoom();
  }
});

module.exports = DevicesSection;
