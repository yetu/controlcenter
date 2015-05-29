module.exports = {

  resolveWith: function resolveWith (value) {
    return new Promise(function executor (resolve) {
      resolve(value);
    });
  },

  // mimics Fetch API response object
  jsonResponse: function jsonResponse (value) {
    return {
      json: function json () {
        return new Promise(function executor (resolve) {
          resolve(value);
        });
      }
    };
  },

  fail: function fail (error) {
    return new Promise(function executor (resolve, reject) {
      reject(error);
    });
  }
};
