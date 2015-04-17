var React = require('react');
var styleMixin = require('mixins/style-mixin');
var TForm = require('tcomb-form').form.Form;

var Form = React.createClass({
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
    var options = {
      disabled: this.props.disabled,
      templates: {
        textbox: require('./text-input.jsx')
      }
    };

    return (
      <div className='cc-form grid-14'>
        <TForm ref='form' onChange={this.onChange} type={this.props.type} options={options} value={this.props.value} />
      </div>
    );
  }
});


module.exports = Form;
