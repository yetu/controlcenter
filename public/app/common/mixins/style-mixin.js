module.exports = function mixin (styles) {
  return {
    componentWillMount: function componentWillMount () {
      styles.use();
    },
    componentWillUnmount: function componentWillUnmount () {
      styles.unuse();
    }
  };
};
