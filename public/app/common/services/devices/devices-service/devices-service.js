var Rx = require('rx');
require('whatwg-fetch');


// TODO pass params with fetch
var thingsUrl = 'http://householdmockapi000.yetudev.com:8080/things?itr=true&istr=true';

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

// For now it's only for things from Household API
var $deviceList = Rx.Observable
  .fromPromise(fetch(thingsUrl).then(extractJson));

// TODO add device control actions here (change room, remove adjust)
module.exports = {

  fetchDeviceList: function fetchDeviceList () {
    return $deviceList
      .flatMap(extractThings)
      .bufferWithCount(MAX_DEVICES);
  },

  invokeDeviceAction: function doDeviceAction (action, data) {
    var requestOptions = {
      method: action.method,
      body: JSON.stringify(data)
    };
    return Rx.Observable.fromPromise(
      fetch(action.href, requestOptions)
        .then(extractJson)
    );
  }

};
