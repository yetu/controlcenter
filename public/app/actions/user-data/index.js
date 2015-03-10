var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'saveUserData', // Submits userdata to server
  'updateUserData', // Update user data in the store
  'fetchUserData' // Fetches user data,
]);
