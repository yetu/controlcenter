module.exports = {

  when: function when (value) {
    return new Promise(function promise (resolve) {
      resolve(value);
    });
  },

  fail: function fail (error) {
    return new Promise(function promise (resolve, reject) {
      reject(error);
    });
  }
};
