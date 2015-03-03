'use strict';

var Reflux = require("reflux");

var settingsStore = Reflux.createState({

  init: function () {

  },

  changeSettings: function () {
    console.log('BOOM!!');
  }
});

module.exports = settingsStore;