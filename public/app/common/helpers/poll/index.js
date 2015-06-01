function Poll (options) {

  this.options = options;
  this.options.predicate = this.options.predicate || function truthSayer () { return true; };

  this.promise = new Promise((resolve, reject) => {

    var request = () => {
      fetch(this.options.url, { credentials: 'include' })
        .then(successHandler, errorHandler);
    };

    var successHandler = (response) => {
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

    var errorHandler = (response) => {
      reject(response);
    };

    request();
  });
}

Poll.prototype.cancel = function cancel () {
  window.clearTimeout(this.timeoutId);
};

module.exports = Poll;
