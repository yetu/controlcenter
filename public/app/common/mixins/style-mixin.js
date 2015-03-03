module.exports = function(styles) {
  return {
    componentWillMount: function() {
      styles.use();
    },
    componentWillUnmount: function() {
      styles.unuse();
    }
  }
};