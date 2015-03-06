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

  onChange: function(data){
    var validValue = this.refs.form.getValue();

    // Triggers callback only on valid value changes
    if (validValue){
      this.props.onValidChange(data);
    }
  },

  render: function () {
    return (
      <div className="cc-form">
        <Form ref="form" onChange={this.onChange} type={this.props.type} options={options} value={this.props.value} />
      </div>
    )
  }
});


module.exports = CCForm;
