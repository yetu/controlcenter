var Rx = require('rx'),
  qwest = require('qwest');

var SessionState = require('./discovery-session-state.js');

var startDiscoveryUrl = 'http://householdmockapi000.yetudev.com:8080/gateway/discoveries';
var gatewayStatusUrl = 'http://householdmockapi000.yetudev.com:8080/gateway';


module.exports = {

  startDiscovery: function startDiscovery () {
    var subject = new Rx.Subject();

    var $startDeviceDiscovery = Rx.Observable
      .fromPromise(qwest.post(startDiscoveryUrl, {}));

    var $pollInterval = Rx.Observable
      .interval(200)
      .takeUntil(subject);

    var $fetchDiscoverySession = Rx.Observable
      .fromPromise(qwest.get(gatewayStatusUrl, null, {responseType: 'json'}))
      .map(function extractSessionUrl (data) {
        return data.entities[0].href;
      });

    var $discoverySession = $startDeviceDiscovery.flatMap(function flatMap () {
      return $fetchDiscoverySession;
    });

    return Rx.Observable.combineLatest($discoverySession, $pollInterval,
      function combine (url) {
        return url;
      }).flatMap(function flatMap (url) {
        return Rx.Observable.fromPromise(qwest.get(url, null, {responseType: 'json'}));
      }).flatMap(function flatMap (item) {
        return Rx.Observable.create(function create (observer) {
          if (item.properties.state === SessionState.EXPIRED) {
            observer.onError(item);
            subject.onNext('Finished');
          } else if (item.properties.state === SessionState.FINISHED) {
            observer.onNext(item);
            observer.onCompleted();

            subject.onNext('Finished');
          }
        });
      });
  }
};
