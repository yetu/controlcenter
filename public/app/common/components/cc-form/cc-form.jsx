var React = require('react');
var styleMixin = require('mixins/style-mixin');
var t = require('tcomb-form');
var Form = t.form.Form;

var options = {
  templates: {
    textbox: require('./ccTextInput.jsx')
  }
};

var CCForm = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  onChange: function onChange (data) {
    var validValue = this.refs.form.getValue();

    // Triggers callback only on valid value changes
    if (validValue) {
      this.props.onValidChange(data);
    }
  },

  render: function render () {
    return (
      <div className='cc-form'>
        <Form ref='form' onChange={this.onChange} type={this.props.type} options={options} value={this.props.value} />
      </div>
    );
  }
});


module.exports = CCForm;
