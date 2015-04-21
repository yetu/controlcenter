var _ = require('lodash');
var React = require('react');

module.exports = function RouterStubComponent (Component, props) {
  function RouterStub () {
  }

  // Assign all possible methods to RouterStub
  _.assign(RouterStub, {
    makePath: _.noop,
    makeHref: _.noop,
    transitionTo: _.noop,
    replaceWith: _.noop,
    goBack: _.noop,
    getCurrentPath: _.noop,
    getCurrentRoutes: _.noop,
    getCurrentPathname: _.noop,
    getCurrentParams: _.noop,
    getCurrentQuery: _.noop,
    isActive: _.noop,
    getRouteAtDepth: _.noop,
    setRouteComponentAtDepth: _.noop
  });

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number
    },

    getChildContext: function getChildContext () {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    },

    render: function render () {
      return (<Component {...props} />);
    }
  });
};
