var Rx = require('rx');
require('whatwg-fetch');

var UrlHelpers = require('helpers/url');
var Poll = require('helpers/poll');

// TODO pass params with fetch
var householdBaseUrl = '/household';
var thingsUrl = householdBaseUrl + '/things?thingAs=representation&componentAs=representation';
var thingUrl = householdBaseUrl + '/things';

function extractJson (resp) {
  return resp.json();
}

function composeThing (thing) {
  return {
    properties: thing.properties,
    components: thing.entities,
    links: thing.links
  };
}

function extractThings (data) {
  var things = data.entities || [];
  return things.map(composeThing);
}

function initDeviceStreamById (deviceId) {
  return Rx.Observable
    .fromPromise(
      fetch(thingUrl + '/' + deviceId + '?componentAs=representation', { credentials: 'include' })
        .then(extractJson));
}

// TODO add device control actions here (change room, remove adjust)
module.exports = {

  fetchDeviceList: function fetchDeviceList () {
    return new Promise((resolve, reject) => {
      fetch(thingsUrl, { credentials: 'include' })
        .then((response) => {
          response.json().then((data) => {
            resolve(extractThings(data));
          });
        })
        .catch(reject);
    });
  },

  fetchDeviceById: function fetchDeviceById (deviceId) {
    return initDeviceStreamById(deviceId)
      .map(composeThing);
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

    return Rx.Observable.fromPromise(
      fetch(householdBaseUrl + UrlHelpers.stripHostname(action.href), requestOptions)
        .then(extractJson)
    );
  }

};
