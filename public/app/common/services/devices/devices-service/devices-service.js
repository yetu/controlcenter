require('whatwg-fetch');

var UrlHelpers = require('helpers/url');
var Poll = require('helpers/poll');

// TODO pass params with fetch
var householdBaseUrl = '/household';
var thingsUrl = householdBaseUrl + '/things?thingAs=representation&componentAs=representation';
var thingUrl = householdBaseUrl + '/things';

// TODO add device control actions here (change room, remove adjust)
module.exports = {

  fetchDeviceList: function fetchDeviceList () {
    return fetch(thingsUrl, { credentials: 'include' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.entities;
      });
  },

  fetchDeviceById: function fetchDeviceById (deviceId) {
    return fetch(thingUrl + '/' + deviceId + '?componentAs=representation', { credentials: 'include' })
      .then((response) => {
        return response.json();
      });
  },

  deleteDevice: function deleteDevice (device) {
    var POLLING_INTERVAL = 1000;

    var deviceUrl = UrlHelpers.toHouseholdUrl(device.url);

    return new Promise((resolve, reject) => {
      fetch(deviceUrl, { credentials: 'include', method: 'DELETE' })
        .then(() => {
          // Wait for Household API to remove the device entity
          // and, consequently, the promise to be rejected
          var poll = new Poll({
            url: deviceUrl,
            interval: POLLING_INTERVAL
          });
          poll.promise.catch(() => {
            resolve();
          });
        });
    });
  },

  invokeDeviceAction: function invokeDeviceAction (action, data) {
    var requestOptions = {
      method: action.method,
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(householdBaseUrl + UrlHelpers.stripHostname(action.href), requestOptions)
      .then((response) => {
        return response.json();
      });
  },

  updateProperties: function updateProperties (device, data) {
    var deviceUrl = UrlHelpers.toHouseholdUrl(device.url);
    var requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return fetch(deviceUrl + '/properties', requestOptions);
  }

};
