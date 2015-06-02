var React = require('react');
var styleMixin = require('mixins/style-mixin');

var Measurement = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  getInitialState: function getInitialState () {
    return {
      value: this.props.value || 0
    };
  },

  render: function render () {
    return (
      <div className='cc-measurement-control'>
        {this.state.value}
      </div>
    );
  }
});

module.exports = Measurement;
