var householdProxyUrl = '/household';
var anchor = document.createElement('a');

var Helpers = {
  stripHostname: function stripHostname (url) {
    anchor.href = url;
    return anchor.pathname;
  },

  toHouseholdUrl: function toHouseholdUrl (url) {
    return householdProxyUrl + Helpers.stripHostname(url);
  }
};

module.exports = Helpers;
