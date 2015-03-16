var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ReactTestUtils = {
  getComponentsWithClass: function getComponentsWithClass (parent, className) {
    return TestUtils.scryRenderedDOMComponentsWithClass(parent, className);
  },

  getComponentWithClass: function getComponentWithClass (parent, className) {
    var components = this.getComponentsWithClass(parent, className);
    if (components.length > 1) {
      throw new Error('There should not be more than one component of class "' + className + '"');
    }
    return components.length > 0 ? components[0] : null;
  },

  getComponentsWithType: function getComponentsWithType (parent, type) {
    return TestUtils.scryRenderedComponentsWithType(parent, type);
  },

  getComponentWithType: function getComponentWithType (parent, type) {
    var components = this.getComponentsWithType(parent, type);
    if (components.length > 1) {
      throw new Error('There should not be more than one component of type "' + type + '"');
    }
    return components.length > 0 ? components[0] : null;
  }
};

module.exports = ReactTestUtils;
