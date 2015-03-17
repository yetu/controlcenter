var Reflux = require('reflux'),
  _ = require('lodash'),
  deviceDiscovery = require('services/devices/discovery-service');

var roomStore = require('stores/room');

var deviceStore = Reflux.createStore({
  init: function init () {
    this.listenTo(roomStore, this.update);
  },

  getInitialState: function getInitialState () {
    return {

    };
  },

  onStartDiscovery: function startDiscovery () {
    deviceDiscovery.startDiscovery().subscribe(function onNext () {

    }, function onError () {

    });
  },

  onCancelDiscovery: function cancelDiscovery () {
    deviceDiscovery.cancelDiscovery();
  },

  createDeviceByIdMap: function createDeviceByIdMap (rooms) {
    var devices = _.reduce(rooms, function reducer (acc, room) {
      return acc.concat(room.devices);
    }, []);
    return _.indexBy(devices, 'id');
  },

  createRoomByDeviceIdMap: function createRoomByDeviceIdMap (rooms) {
    return _.reduce(rooms, function roomReducer (acc, room) {
      _.forEach(room.devices, function deviceIterator (device) {
        acc[device.id] = room;
      });
      return acc;
    }, {});
  },

  update: function update (rooms) {

    var data = {
      rooms: rooms,
      deviceById: this.createDeviceByIdMap(rooms),
      roomByDeviceId: this.createRoomByDeviceIdMap(rooms)
    };

    this.trigger(data);
  }
});

module.exports = deviceStore;
