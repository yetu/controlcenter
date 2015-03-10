var Reflux = require('reflux');
var reqwest = require('reqwest');

var userDataActions = require('actions/user-data');

var SettingsStore = Reflux.createStore({

  listenables: userDataActions,

  init: function init () {
    this.userData = {
      model: {},
      error: {}
    };
  },

  onSaveUserData: function onSaveUserData () {
    var self = this;

    function onSaved (data) {
      self.updateModel(data);
    }

    function onError (error) {
      self.updateError(error);
    }

    return reqwest({
      url: '/profile',
      type: 'json',
      method: 'get'
    }).then(onSaved, onError);
  },

  onUpdateUserData: function onUpdateUserData (userData) {
    this.updateModel(userData);
  },

  onFetchUserData: function onFetchUserData () {
    var self = this;

    function onUserData (userData) {
      self.updateModel(userData);
    }

    function onError (error) {
      console.error('Error on fetching', error);
      self.updateError(error);
    }

    return reqwest({
      url: '/profile',
      type: 'json',
      method: 'get'
    }).then(onUserData, onError);
  },

  updateModel: function updateModel (model) {
    this.userData = {
      model: model
    };

    this.trigger(this.userData);
  },

  updateError: function updateError (error) {
    this.userData = {
      error: error
    };

    this.trigger(this.userData);
  }
});

module.exports = SettingsStore;
