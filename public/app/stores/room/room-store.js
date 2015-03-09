var Reflux = require('reflux');

var roomActions = require('actions/room');

var _rooms = [
  {
    title: 'Living room',
    devices: [
      { title: 'yetu Home Gateway', type: 'Home Gateway', state: 'connected', description:'test description' },
      { title: 'Nest', type: 'Thermostat', state: 'not conn.', description:'test description' }
    ]
  },
  {
    title: 'Bed room',
    devices: [
      { title: 'Nest', type: 'Thermostat', state: 'connected', description:'test description' }
    ]
  },
  {
    title: 'Bath room',
    devices: []
  }
];

var roomStore = Reflux.createStore({
  listenables: [ roomActions ],

  getRooms: function getRooms () {
    // We don't want callers to modify this array, thus we return a fresh copy
    return _rooms.slice();
  },

  onCreateRoom: function onCreateRoom () {
    var room = {
      title: 'New room',
      devices: []
    };
    this.updateRooms(_rooms.concat(room));
  },

  updateRooms: function updateRooms (rooms) {
    _rooms = rooms;
    // Trigger rooms update to all listening controller views
    this.trigger(rooms);
  }
});

module.exports = roomStore;
