var Reflux = require('reflux');

var roomActions = Reflux.createActions([
  'createRoom' // Adds a new, empty room to the list
]);

module.exports = roomActions;
