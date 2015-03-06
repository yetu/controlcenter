var React = require('react');
var Reflux = require('reflux');
var reqwest = require("reqwest");

var userDataActions = require('actions/user-data');

var SettingsStore = Reflux.createStore({

  listenables: userDataActions,

  init: function () {
    this.userData = {
      model: {},
      error: {}
    };
  },

  onSaveUserData: function () {
    var self = this;
    function onSaved(data) {
      self.updateModel(data);
    }

    function onError(error) {
      self.updateModel({}, error)
    }

    return reqwest({
      url: '/profile',
      type: 'json',
      method: 'get'
    }).then(onSaved, onError);
  },

  onUpdateUserData: function (userData) {
    this.updateModel(userData);
  },

  onFetchUserData: function () {
    var self = this;
    function onUserData(userData) {
      self.updateModel(userData);
    }

    function onError(error) {
      console.error('Error on fetching', error);
      self.updateModel({}, error);
    }

    return reqwest({
      url: '/profile',
      type: 'json',
      method: 'get'
    }).then(onUserData, onError);
  },

  updateModel: function (model, error) {
    var self = this;
    this.userData = {
      model: model,
      error: error || {}
    };

    this.trigger(self.userData);
  }
});

module.exports = SettingsStore;
