var Reflux = require('reflux');
var Rx = require('rx');
var $ = require('jquery');

var deviceActions = Reflux.createActions({
  addDevice: { asyncResult: true },
  removeDevice: { asyncResult: true }
});

deviceActions.addDevice.listen(function listener () {
  var self = this;

  // var checkSessionState = function (sessionUrl) {
  //   debugger;

  //  return Rx.Observable.fromPromise(
  //     $.ajax({
  //       url: sessionUrl,
  //       method: 'GET',
  //       dataType: 'json'
  //     })
  //     .promise()
  //   );
  // }
  $.ajax({
     url: 'http://householdmockapi000.yetudev.com:8080/gateway/discoveries',
     method: 'POST',
     dataType: 'json'
   })
   .done(function(d){
      console.log(d);
   })

  // var $startDiscovery = Rx.Observable.fromPromise(function(){
  //   debugger;
  //   return $.ajax({
  //     url: 'http://householdmockapi000.yetudev.com:8080/gateway/discoveries',
  //     method: 'POST',
  //     dataType: 'json'
  //   })
  //   .promise()
  // })

  // var $discoverySessionUrl = Rx.Observable.fromPromise(
  //   $.ajax({
  //     url: 'http://householdmockapi000.yetudev.com:8080/gateway',
  //     method: 'GET',
  //     dataType: 'json'
  //   })
  //   .promise()
  // ).map(function (data) {
  //   debugger;
  //   return data.entities[0].href });


  // var $session = $startDiscovery.flatMap(function  (statusCode) {
  //   return $discoverySessionUrl;
  // })
  // .tap(function(data){
  //   console.log('hello',data)
  // })

  // var $pollingInterval = Rx.Observable
  // .interval(500).flatMap(function  (i) {
  //   debugger;
  //   return i;
  // })

  // Rx.Observable.combineLatest($pollingInterval, $session, function(interval, url){
  //     return checkSessionState(url);
  // })
  // .tap(function(data){
  //   console.log('data',data)
  // })
  // .doOnNext(function(next){
  //   console.log('next',next);
  //   self.completed();
  // })
  // .doOnError(function  (error) {
  //   console.error('Error', error);
  // });

});

module.exports = deviceActions;
