var Reflux = require('reflux');

var RoomActions = Reflux.createActions([
  'addDevice',
  'removeDevice',
  // room actions
  'addRoom',
  'removeRoom'
]);

module.exports = RoomActions;
