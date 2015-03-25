var Reflux = require('reflux');

var roomActions = require('actions/room');

var roomStore = Reflux.createStore({
  listenables: [roomActions],

  getInitialState: function getInitialState () {
    return {
      rooms: [
        {
          title: 'Living room',
          devices: ['0', '1']
        },
        {
          title: 'Bed room',
          devices: ['2']
        },
        {
          title: 'Bath room',
          devices: []
        }
      ]
    };
  },

  onFetchRoomsCompleted: function onFetchRoomsCompleted (rooms) {
    this.updateRooms(rooms);
  },

  onCreateRoom: function onCreateRoom () {

  },

  updateRooms: function updateRooms (rooms) {
    // Trigger rooms update to all listening controller views
    this.trigger(rooms);
  }
});

module.exports = roomStore;
