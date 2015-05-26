var Rx = require('rx');
require('whatwg-fetch');


// TODO pass params with fetch
var householdBaseUrl = 'https://household-https000.dev.yetu.me';
var thingsUrl = householdBaseUrl + '/things?thingAs=representation&componentAs=representation';
var thingUrl = householdBaseUrl + '/things';
var authToken = window.yetu && window.yetu.authToken;

var MAX_DEVICES = 100; // allow to add up to 100 devices

function extractJson (resp) {
  return resp.json();
}

function composeThing (thing) {
  return {
    properties: thing.properties,
    components: thing.entities
  };
}

function extractThings (sirenResponse) {
  var things = sirenResponse.entities || [];
  return things.map(composeThing);
}

function initDeviceStreamById (deviceId) {
  return Rx.Observable
    .fromPromise(fetch(thingUrl + '/' + deviceId + '?thingAs=representation').then(extractJson));
}

// TODO add device control actions here (change room, remove adjust)
module.exports = {

  fetchDeviceList: function fetchDeviceList () {
    return Rx.Observable
      .fromPromise(fetch(thingsUrl, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }).then(extractJson))
      .flatMap(extractThings)
      .bufferWithCount(MAX_DEVICES);
  },

  fetchDeviceById: function fetchDeviceById (deviceId) {
    return initDeviceStreamById(deviceId)
      .map(composeThing);
  },

  invokeDeviceAction: function invokeDeviceAction (action, data) {
    var requestOptions = {
      method: action.method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      }
    };
    return Rx.Observable.fromPromise(
      fetch(action.href, requestOptions)
        .then(extractJson)
    );
  }

};
