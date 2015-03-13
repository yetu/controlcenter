var Rx = require('rx'),
  qwest = require('qwest');

var startDiscoveryUrl = 'http://householdmockapi000.yetudev.com:8080/gateway/discoveries';
var gatewayStatusUrl = 'http://householdmockapi000.yetudev.com:8080/gateway';

var subject = new Rx.Subject();
var $pollInterval = Rx.Observable
  .interval(200)
  .takeUntil(subject);

module.exports = {

  startDiscovery: function startDiscovery () {
    var $startDeviceDiscovery = Rx.Observable
      .fromPromise(qwest.post(startDiscoveryUrl, {}));

    var $fetchDiscoverySession = Rx.Observable
      .fromPromise(qwest.get(gatewayStatusUrl))
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
        return Rx.Observable.fromPromise(qwest.get(url));
      }).flatMap(function flatMap (item) {
        return Rx.Observable.create(function create (observer) {
          if (item.properties.state === 'FINISHED') {
            observer.onNext(item);
            observer.onCompleted();
          } else if (item.properties.state === 'EXPIRED') {
            observer.onError(item);
          }
        });
      });
  },

  cancelDiscovery: function cancelDiscovery () {
    return subject.onError('Canceled subscription');
  }
};
