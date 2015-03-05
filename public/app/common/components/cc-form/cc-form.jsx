'use strict';

var React = require("react");
var StyleMixin = require('mixins/style-mixin');
var t = require('tcomb-form');
var Form = t.form.Form;

var options = {
  templates: {
    textbox: require('./ccTextInput.jsx')
  }
};

var CCForm = React.createClass({
  mixins: [StyleMixin(require('./style.scss'))],

  getInitialState: function () {
    return {};
  },

  render: function () {
    return (
      <div className="cc-settings-form">
        <Form rel="form" type={this.props.type} options={options} value={this.state.value} />
      </div>
    )
  }
});


module.exports = CCForm;
