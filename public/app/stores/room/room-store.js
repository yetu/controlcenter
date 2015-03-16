var Reflux = require('reflux');

var roomActions = require('actions/room');

var roomStore = Reflux.createStore({
  listenables: [roomActions],

  onFetchRoomsCompleted: function onFetchRoomsCompleted (rooms) {
    this.updateRooms(rooms);
  },

  onCreateRoom: function onCreateRoom () {
    // TODO: generate uuid
    // var room = {
    //   id: Math.random(),
    //   title: 'New room',
    //   devices: []
    // };
    // this.updateRooms(_rooms.concat(room));
  },

  updateRooms: function updateRooms (rooms) {
    // Trigger rooms update to all listening controller views
    this.trigger(rooms);
  }
});

module.exports = roomStore;
