var Rx = require('rx'),
  _ = require('lodash'),
  qwest = require('qwest');

var thingsUrl = 'http://householdmockapi000.yetudev.com:8080/things';
var MAX_DEVICES = 100; // allow to add up to 100 devices

function extractProperties (sirenData) {
  sirenData = sirenData || {};
  return sirenData.properties;
}

function extractThingsUrls (sirenThingsUrls) {
  sirenThingsUrls = sirenThingsUrls || [];

  function filterNullValues (item) {
    return item !== null && item.href !== null;
  }

  function extractHref (item) {
    return item.href;
  }

  var urls = sirenThingsUrls.entities
    .filter(filterNullValues)
    .map(extractHref);

  // create observable from array of urls
  return Rx.Observable.from(urls);
}

function deviceInfo (deviceUrl) {
  return Rx.Observable.fromPromise(
    qwest.get(deviceUrl, null, {responseType: 'json'})
  ).map(extractProperties);
}

// For now it's only for things from Household API
var $deviceList = Rx.Observable.fromPromise(qwest.get(thingsUrl, null, {responseType: 'json'}));

// TODO add device control actions here (change room, remove adjust)
module.exports = {
  fetchDeviceInfo: deviceInfo,

  fetchDeviceList: function fetchDeviceList () {
    return $deviceList.flatMap(extractThingsUrls)
      .flatMap(deviceInfo)
      .bufferWithCount(MAX_DEVICES);
  }
};
