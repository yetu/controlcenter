var React = require('react/addons'),
// Reflux = require('reflux'),
  userDataActions = require('actions/user-data');

var TestUtils = React.addons.TestUtils;
var userDataStore = require('../user-store');

describe('UserData Store', function test () {
  describe('init', function test () {
    it('init userData', function test () {
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

  describe('onSaveUserData', function test () {
    it('store is subscribed to saveUserData action', function () {
      spyOn(userDataStore, 'onSaveUserData');
      userDataActions.saveUserData.trigger();
      setTimeout(function () {
        expect(userDataStore.onSaveUserData).toHaveBeenCalled();
      }, 0);
    });
  });

  describe('onFetchUserData', function test () {
    it('store is subscribed to fetchUserData action', function () {
      spyOn(userDataStore, 'onFetchUserData');
      userDataActions.fetchUserData.trigger();
      setTimeout(function () {
        expect(userDataStore.onFetchUserData).toHaveBeenCalled();
      }, 0);
    });
  });

  describe('onUpdateUserData', function test () {
    it('store is subscribed to updateUserData action', function () {
      spyOn(userDataStore, 'onUpdateUserData');
      userDataActions.updateUserData.trigger();
      setTimeout(function () {
        expect(userDataStore.onUpdateUserData).toHaveBeenCalled();
      }, 0);
    });

    it('store is receives data from updateUserData action', function () {
      var testData = {
        a: 1,
        b: 'testValue'
      };

      userDataActions.updateUserData.trigger(testData);
      spyOn(userDataStore, 'onUpdateUserData');
      setTimeout(function () {
        expect(userDataStore.onUpdateUserData).toHaveBeenCalledWith(testData);
      }, 0);
    });


  });
});
