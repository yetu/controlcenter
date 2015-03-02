'use strict';

var React = require('react');
var Room = require('./room');

// TODO: Rename to DevicesSection
var DeviceRegion = React.createClass({
    getInitialState: function() {
        return {
            // TODO: Get from store, react on store changes
            rooms: [
                {title: "Living room", devices: []},
                {title: "Bed room", devices: []}
            ]
        }
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
            </div>
        );
    }
});

module.exports = DeviceRegion;