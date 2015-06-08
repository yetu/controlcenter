var _ = require('lodash');
require('whatwg-fetch');

var UrlHelpers = require('helpers/url');
var Poll = require('helpers/poll');

var DiscoverySessionState = require('./discovery-session-state.js');

var discoveriesUrl = '/household/gateway/discoveries';
var gatewayUrl = '/household/gateway';

var POLLING_INTERVAL = 1000;

var isSessionInProgress = (session) => {
  var terminalStates = [
    DiscoverySessionState.STOPPED,
    DiscoverySessionState.EXPIRED,
    DiscoverySessionState.FAILED
  ];
  return terminalStates.indexOf(session.properties.state) === -1;
};

var getDiscoverySession = function getDiscoverySession (data) {
  return _.find(
    data.entities,
    (entity) => {
      return entity.rel[0] === 'http://api.yetu.me/rels/gateway/discoverysession';
    }
  );
};

var sessionPoll;

module.exports = {

  discover: function discover () {
    return new Promise((resolve, reject) => {
      fetch(discoveriesUrl, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      })
        .then(function queryGateway () {
          fetch(gatewayUrl, { credentials: 'include' })
            .then(function pollSession (response) {
              response.json().then((data) => {
                var discoverySession = getDiscoverySession(data);

                sessionPoll = new Poll({
                  url: UrlHelpers.toHouseholdUrl(discoverySession.href),
                  predicate: isSessionInProgress,
                  interval: POLLING_INTERVAL
                });

                sessionPoll
                  .promise
                  .then((session) => {
                    resolve(session.properties.state);
                  });
              });
            });
        });
    });
  },

  stopDiscovery: function stopDiscovery () {
    sessionPoll.cancel();
  }

};
