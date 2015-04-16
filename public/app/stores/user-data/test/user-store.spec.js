var React = require('react/addons'),
  PromiseHelper = require('helpers/promise'),
  userDataActions = require('actions/user-data');

var TestUtils = React.addons.TestUtils;
var userDataStore = require('../user-store');

describe('UserData Store', function () {

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

    it('handles request errors and updates error', function (done) {
      var error = {error: 'error'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.fail(error));
      userDataActions.saveUserData.trigger();

      setTimeout(function () {
        expect(userDataStore.userData.error).toEqual(error);
        stub.restore();
        done();
      }, 0);
    });

    it('handles successful response and updates model', function (done) {
      var content = {message: 'testMessage'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.when(content));

      userDataActions.saveUserData.trigger();

      setTimeout(function () {
        expect(userDataStore.userData.model).toEqual(content);
        stub.restore();
        done();
      }, 0);
    });
  });

  describe('onFetchUserData', function () {

    it('handles request errors and updates error', function (done) {
      var error = {error: 'someError'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.fail(error));

      userDataActions.fetchUserData.trigger();
      setTimeout(function () {
        expect(userDataStore.userData.error).toEqual(error);
        stub.restore();
        done();
      }, 0);
    });

    it('handles successful response and updates model', function (done) {
      var content = {message: 'testMessage'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.when(content));

      userDataActions.fetchUserData.trigger();

      setTimeout(function () {
        expect(userDataStore.userData.model).toEqual(content);
        stub.restore();
        done();
      }, 0);
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
