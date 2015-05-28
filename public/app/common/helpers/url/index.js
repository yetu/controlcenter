var anchor = document.createElement('a');

var Helpers = {
  stripHostname: function stripHostname (url) {
    anchor.href = url;
    return anchor.pathname;
  }
};

module.exports = Helpers;
