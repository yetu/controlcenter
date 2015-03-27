var React = require('react');
var styleMixin = require('mixins/style-mixin');
var TForm = require('tcomb-form').form.Form;

var options = {
  templates: {
    textbox: require('./text-input.jsx')
  }
};

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
    return (
      <div className='cc-form grid-14'>
        <TForm ref='form' onChange={this.onChange} type={this.props.type} options={options} value={this.props.value} />
      </div>
    );
  }
});


module.exports = Form;
