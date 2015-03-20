var React = require('react/addons');
var TU = React.addons.TestUtils;

/**
 * Reactjs vdom tree traversal monad.
 */
function $ (root, val) {
  return new $.prototype.Init(root, val || []);
}

$.prototype = {
  Init: function vdomInit (root, value) {
    if (root instanceof $) {
      this.root = root.root;
    } else {
      this.root = root;
    }
    this.value = value;
  },

  get: function vdomGet (idx) {
    return this.value[idx];
  },

  byClass: function vdomGetByClass (cl) {
    var val = TU.scryRenderedDOMComponentsWithClass(this.root, cl);
    return $(this, val);
  },

  byType: function vdomGetByType (type) {
    var val = TU.scryRenderedComponentsWithType(this.root, type);
    return $(this, val);
  },

  isRendered: function vdomIsRendered () {
    return this.value.length > 0;
  }
};

$.prototype.Init.prototype = $.prototype;

/**
 * Delegate all simulation handlers, e.g. 'click', 'dblClick', etc.
 *
 * @param idx - the index of the target component, e.g. $(root).byType(Button).click(1)
 */

Object.keys(TU.Simulate).map((method) => {
  $.prototype[method] = function dynamicMethod (idx) {
    idx = idx || 0;
    TU.Simulate[method](this.value[idx].getDOMNode());
  };
});


$.jasmineMatchers = {
  toBeRendered: function toBeRenderedMatcher (util, customEqualityTesters) {
    return {
      compare: function renderedMatcherCompare (actual, expected) {
        var result = {};

        if (actual.isRendered()) {
          result.pass = true;
          result.message = 'Expected component to be rendered';
        } else {
          result.pass = false;
          result.message = 'Expected component to be rendered, but it was not found in VDOM';
        }
        return result;
      }
    };
  }
};

module.exports = $;
