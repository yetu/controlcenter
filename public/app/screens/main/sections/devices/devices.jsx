var React = require('react');
var Reflux = require('reflux');
var Room = require('./room');

var roomStore = require('stores/room');
var roomActions = require('actions/room');

var StyleMixin = require('mixins/style-mixin');

// TODO: Rename to DevicesSection
var DeviceRegion = React.createClass({
    mixins: [
      Reflux.connect(roomStore, "rooms"),
      StyleMixin(require('./style.scss'))
    ],

    getInitialState: function() {
        return {rooms: roomStore.getRooms()};
    },

    render: function () {
        var rooms = this.state.rooms.map(function(room, i) {
            return (
                <Room room={room} key={i} />
            );
        });
        return (
            <div className="cc-devices">
                <h2 className="cc-devices__title">My devices</h2>
                <a className="cc-devices__button" href="#">+ Add device</a>
                {rooms}
                <a className="cc-devices__button" href="#" onClick={this.handleAddRoom}>+ Add room</a>
            </div>
        );
    },

    handleAddRoom: function() {
        roomActions.createRoom();
    }
});

module.exports = DeviceRegion;
