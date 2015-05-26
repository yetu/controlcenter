var Rx = require('rx');
require('whatwg-fetch');

var authToken = window.yetu && window.yetu.authToken;

var transformGatewayResponse = function transformGatewayResponse (resp) {
  var result = resp || {};
  return result.properties || {};
};

var extractJson = function extractJson (response) {
  return response.json();
};

var gatewayInfoUrl = 'https://household-https000.dev.yetu.me/gateway';
module.exports = {
  fetchGatewayInfo: function fetchGatewayInfo () {
    // we can enable polling here
    return Rx.Observable
      .fromPromise(fetch(gatewayInfoUrl, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(extractJson))
      .map(transformGatewayResponse);
  }
};
