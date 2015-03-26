var Reflux = require('reflux');

var roomActions = require('actions/room');

var roomStore = Reflux.createStore({
  listenables: [roomActions],

  getInitialState: function getInitialState () {
    return [
      {
        title: 'Living room',
        devices: [
          {
            id: '0',
            name: 'yetu Home Gateway',
            type: 'Home Gateway',
            state: 'connected',
            description: 'test description'
          },
          {
            id: '1',
            name: 'Nest',
            type: 'Thermostat',
            state: 'not conn.',
            description: 'test description'
          }
        ]
      },
      {
        title: 'Bed room',
        devices: [
          {
            id: '2',
            title: 'Nest',
            type: 'Thermostat',
            state: 'connected',
            description: 'test description'
          }
        ]
      },
      {
        title: 'Bath room',
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
