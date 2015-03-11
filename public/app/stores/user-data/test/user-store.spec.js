var React = require('react/addons'),
// Reflux = require('reflux'),
  userDataActions = require('actions/user-data');

var TestUtils = React.addons.TestUtils;
var userDataStore = require('../user-store');

describe('UserData Store', function () {

  var xhr, server;
  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    xhr.restore();
    server.restore();
  });

  describe('init', function () {
    it('init userData', function () {
      userDataStore.init();
      TestUtils.isElementOfType();
      expect(userDataStore.userData).toBeDefined();
    });

    it('init userData has model and error fields', function () {
      userDataStore.init();
      expect(userDataStore.userData.model).toEqual({});
      expect(userDataStore.userData.error).toEqual({});
    });
  });

  describe('onSaveUserData', function () {

    it('handles request errors and updates error', function () {
      var status = 401;
      server.respondWith('GET', '/profile', [
        status,
        {'Content-Type': 'application/json'}, ''
      ]);

      userDataActions.saveUserData.trigger();
      server.respond();

      expect(userDataStore.userData.error.status).toEqual(status);
    });

    it('handles successful response and updates model', function () {
      var content = {message: 'testMessage'};
      server.respondWith('GET', '/profile', [
        200, {'Content-Type': 'application/json'}, JSON.stringify(content)
      ]);

      userDataActions.saveUserData.trigger();
      server.respond();

      expect(userDataStore.userData.model).toEqual(content);
    });
  });

  describe('onFetchUserData', function () {

    it('handles request errors and updates error', function () {
      var status = 401;
      server.respondWith('GET', '/profile', [
        status,
        {'Content-Type': 'application/json'}, ''
      ]);

      userDataActions.fetchUserData.trigger();
      server.respond();

      expect(userDataStore.userData.error.status).toEqual(status);
    });

    it('handles successful response and updates model', function () {
      var content = {message: 'testMessage'};
      server.respondWith('GET', '/profile', [
        200, {'Content-Type': 'application/json'}, JSON.stringify(content)
      ]);

      userDataActions.fetchUserData.trigger();
      server.respond();

      expect(userDataStore.userData.model).toEqual(content);
    });
  });


  describe('onUpdateUserData', function () {
    it('calls userModel with arguments received from action', function () {
      var content = {test: 'stubdata'};
      var spyUpdateModel = sinon.spy(userDataStore, 'updateModel');
      userDataActions.updateUserData.trigger(content);
      expect(spyUpdateModel.called).toBe(true);
    });
  });

  describe('updateModel', function () {
    it('updates userData model', function () {
      var content = {test: 'stubdata'};
      userDataStore.updateModel(content);
      expect(userDataStore.userData.model).toEqual(content);
    });
  });


  describe('updateError', function () {
    it('updates userData error', function () {
      var error = {errorInfo: 'some error info'};
      userDataStore.updateError(error);
      expect(userDataStore.userData.error).toEqual(error);
    });
  });
});
