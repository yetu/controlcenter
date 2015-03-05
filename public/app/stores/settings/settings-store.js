var Reflux = require('reflux');

var settingsStore = Reflux.createState({

  changeSettings: function changeSettings () {
    console.log('BOOM!!');
  }
});

module.exports = settingsStore;
