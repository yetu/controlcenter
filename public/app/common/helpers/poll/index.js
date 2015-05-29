function Poll (options) {
  this.options = options;
  this.promise = new Promise((resolve, reject) => {
    var request = () => {
      fetch(this.options.url, { credentials: 'include' }).then(handler);
    };
    var handler = (response) => {
      response.json().then((data) => {
        if (this.options.predicate(data)) {
          this.timeoutId = window.setTimeout(() => {
            request();
          }, this.options.interval);
        } else {
          resolve(data);
        }
      });
    };
    request();
  });
}

Poll.prototype.cancel = function cancel () {
  window.clearTimeout(this.timeoutId);
};

module.exports = Poll;
