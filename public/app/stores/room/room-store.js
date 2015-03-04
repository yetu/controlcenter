var React = require('react');
var Reflux = require('reflux');

var roomActions = require('actions/room');

var _rooms = [
    {title: 'Living room', devices: [
        {title: 'yetu Home Gateway', type: 'Home Gateway', state: 'connected'},
        {title: 'Nest', type: 'Thermostat', state: 'not conn.'}
    ]},
    {title: 'Bed room', devices: [
        {title: 'Nest', type: 'Thermostat', state: 'connected'}
    ]},
    {title: 'Bath room', devices: []}
];

var roomStore = Reflux.createStore({
  listenables: [roomActions],

  getRooms: function () {
    // We don't want callers to modify this array, thus we return a fresh copy
    return _rooms.slice();
  },

  onCreateRoom: function () {
    var room = {
      title: 'New room',
      devices: []
    };
    this.updateRooms(_rooms.concat(room));
  },

  updateRooms: function (rooms) {
    _rooms = rooms;
    // Trigger rooms update to all listening controller views
    this.trigger(rooms);
  }
});

module.exports = roomStore;
