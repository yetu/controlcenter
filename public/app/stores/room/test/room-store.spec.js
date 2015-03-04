var React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

var roomStore = require('../room-store.js');

describe('RoomStore', function () {
  describe('onCreateRoom', function () {
    it('adds a new room to the store', function () {
      var roomsBefore = roomStore.getRooms();
      roomStore.onCreateRoom();
      var roomsAfter = roomStore.getRooms();

      expect(roomsAfter.length).toEqual(roomsBefore.length + 1);

      var createdRoom = roomsAfter[roomsAfter.length - 1];
      expect(createdRoom.title).toBeDefined();
      expect(createdRoom.devices.length).toEqual(0);
    });
  });
});