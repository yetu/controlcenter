var Rx = require('rx'),
  _ = require('lodash');

require('whatwg-fetch');

var SessionState = require('./discovery-session-state.js');

var startDiscoveryUrl = 'http://householdmockapi000.yetudev.com:8080/gateway/discoveries';
var gatewayStatusUrl = 'http://householdmockapi000.yetudev.com:8080/gateway';
var POLLING_INTERVAL = 1000;

function extractSessionUrl (data) {
  return data.entities[0].href;
}

function handleError (observer, discoveryStatus, subject) {
  observer.onError(discoveryStatus);
  subject.onNext('Finished');
}

function handleFinishedState (observer, discoveryStatus, subject) {
  observer.onNext(discoveryStatus);
  observer.onCompleted();

  subject.onNext('Finished');
}

var statesMap = {
  [SessionState.EXPIRED]: handleError.bind(this),
  [SessionState.FINISHED]: handleFinishedState.bind(this)
};

function handleDiscoveryStatus (discoveryStatus, subject) {
  return function create (observer) {
    var func = statesMap[discoveryStatus.properties.state] || _.noop;
    return func(observer, discoveryStatus, subject);
  };
}

module.exports = {

  startDiscovery: function startDiscovery () {
    var subject = new Rx.Subject();

    var $startDeviceDiscovery = Rx.Observable
      .fromPromise(
      fetch(startDiscoveryUrl, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }));

    var $pollInterval = Rx.Observable
      .interval(POLLING_INTERVAL)
      .takeUntil(subject);

    var $fetchDiscoverySession = Rx.Observable
      .fromPromise(fetch(gatewayStatusUrl))
      .map(extractSessionUrl);

    var $discoverySession = $startDeviceDiscovery.flatMap(function flatMap () {
      console.log('Fetched sicovery session');
      return $fetchDiscoverySession;
    });

    return Rx.Observable.combineLatest($discoverySession, $pollInterval,
      (discoveryUrl) => {
        return discoveryUrl;
      }).flatMap((discoveryUrl) => {
        return Rx.Observable.fromPromise(
          fetch(discoveryUrl));
      }).flatMap((discoveryStatus) => {
        return Rx.Observable.create(handleDiscoveryStatus(discoveryStatus, subject));
      });
  }
};
