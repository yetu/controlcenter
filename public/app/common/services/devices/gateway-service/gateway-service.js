require('whatwg-fetch');

var transformGatewayResponse = function transformGatewayResponse (resp) {
  var result = resp || {};
  return result.properties || {};
};

var gatewayInfoUrl = '/household/gateway';
module.exports = {
  fetchGatewayInfo: function fetchGatewayInfo () {
    return fetch(gatewayInfoUrl, { credentials: 'include' })
      .then(function getJson (response) {
        return response.json();
      })
      .then(transformGatewayResponse);
  }
};
