'use strict';

var React = require('react');
var Reflux = require('reflux');
var Room = require('./room');

var roomStore = require('stores/room');
var roomActions = require('../../../actions/room');

// TODO: Rename to DevicesSection
var DeviceRegion = React.createClass({
    mixins: [Reflux.connect(roomStore, "rooms")],
    
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
            <div>
                <h2>My devices</h2>
                <a className="button" href="#">+ Add device</a>
                {rooms}
                <a className="button" href="#" onClick={this.handleAddRoom}>+ Add room</a>
            </div>
        );
    },
    
    handleAddRoom: function() {
        roomActions.createRoom();
    }
});

module.exports = DeviceRegion;