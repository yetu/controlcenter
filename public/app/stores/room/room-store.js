var Reflux = require('reflux');

var roomActions = require('actions/room');

var roomStore = Reflux.createStore({
  listenables: [roomActions],

  getInitialState: function getInitialState () {
    // default room as we don't have them
    return [
      {
        title: 'Home',
        devices: []
      }
    ];
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
