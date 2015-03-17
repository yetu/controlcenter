var Reflux = require('reflux');
var qwest = require('qwest');
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

    return qwest.get('/profile', null, {responseType: 'json'})
      .then(onSaved)
      .catch(onError);
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
      self.updateError(error);
    }

    return qwest.get('/profile', null, {responseType: 'json'})
      .then(onUserData)
      .catch(onError);
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
