var React = require('react/addons');
var TU = React.addons.TestUtils;

module.exports = {

  byClass: function getByClass (parent, cl) {
    return TU.scryRenderedDOMComponentsWithClass(parent, cl);
  },

  byType: function getByType (parent, type) {
    return TU.scryRenderedComponentsWithType(parent, type);
  },

  isRendered: function isRendered (parent, type) {
    return this.byType(parent, type).length > 0;
  },

  click: function click (instance) {
    TU.Simulate.click(instance.getDOMNode());
  }
};
