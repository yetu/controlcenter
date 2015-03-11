var Reflux = require('reflux');

var roomActions = require('actions/room');

var _rooms = [
  {
    title: 'Living room',
    devices: [
      {id: '0', title: 'yetu Home Gateway', type: 'Home Gateway', state: 'connected', description: 'test description'},
      {id: '1', title: 'Nest', type: 'Thermostat', state: 'not conn.', description: 'test description'}
    ]
  },
  {
    title: 'Bed room',
    devices: [
      {id: '2', title: 'Nest', type: 'Thermostat', state: 'connected', description: 'test description'}
    ]
  },
  {
    title: 'Bath room',
    devices: []
  }
];

var roomStore = Reflux.createStore({
  listenables: [roomActions],

  getRooms: function getRooms () {
    // We don't want callers to modify this array, thus we return a fresh copy
    return _rooms.slice();
  },

  getDevice: function getDevice (id) {
    var filteredDevices = _rooms.reduce(function concatDevices (devices, room) {
      return devices.concat(room.devices);
    }, []).filter(function isDevice (device) {
      return device.id === id;
    });
    return filteredDevices[0];
  },

  getRoomFromDevice: function getRoomFromDevice (device) {
    var filteredRooms = _rooms.filter(function filterRooms (r) {
      var devices = r.devices.filter(function isDevice (d) {
        return d.id === device.id;
      });
      return devices.length > 0;
    });
    return filteredRooms[0];
  },

  onCreateRoom: function onCreateRoom () {
    // TODO: generate uuid
    var room = {
      id: Math.random(),
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
