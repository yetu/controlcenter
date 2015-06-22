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
      userDataStore.should.have.property('userData');
    });

    it('init userData has model and error fields', function () {
      userDataStore.init();
      userDataStore.userData.model.should.deep.equal({});
      userDataStore.userData.error.should.deep.equal({});
    });
  });

  describe('onSaveUserData', function () {

    it('handles request errors and updates error', function (done) {
      var error = {error: 'error'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.fail(error));
      userDataActions.saveUserData.trigger();

      setTimeout(function () {
        userDataStore.userData.error.should.deep.equal(error);
        stub.restore();
        done();
      }, 0);
    });

    it('handles successful response and updates model', function (done) {
      var content = {message: 'testMessage'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.resolveWith(content));

      userDataActions.saveUserData.trigger();

      setTimeout(function () {
        userDataStore.userData.model.should.deep.equal(content);
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
        userDataStore.userData.error.should.deep.equal(error);
        stub.restore();
        done();
      }, 0);
    });

    it('handles successful response and updates model', function (done) {
      var content = {message: 'testMessage'};
      var stub = sinon.stub(window, 'fetch')
        .returns(PromiseHelper.resolveWith(content));

      userDataActions.fetchUserData.trigger();

      setTimeout(function () {
        userDataStore.userData.model.should.deep.equal(content);
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
      spyUpdateModel.should.have.been.called;
    });
  });

  describe('updateModel', function () {
    it('updates userData model', function () {
      var content = {test: 'stubdata'};
      userDataStore.updateModel(content);
      userDataStore.userData.model.should.deep.equal(content);
    });
  });

  describe('updateError', function () {
    it('updates userData error', function () {
      var error = {errorInfo: 'some error info'};
      userDataStore.updateError(error);
      userDataStore.userData.error.should.deep.equal(error);
    });
  });
});
