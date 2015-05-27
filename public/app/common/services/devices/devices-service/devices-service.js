var Rx = require('rx');
require('whatwg-fetch');


// TODO pass params with fetch
var householdBaseUrl = '/household';
var thingsUrl = householdBaseUrl + '/things?thingAs=representation&componentAs=representation';
var thingUrl = householdBaseUrl + '/things';

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
      .fromPromise(fetch(thingsUrl, { credentials: 'include' }).then(extractJson))
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return Rx.Observable.fromPromise(
      fetch(action.href, requestOptions)
        .then(extractJson)
    );
  }

};
