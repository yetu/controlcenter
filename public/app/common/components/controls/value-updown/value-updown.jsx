var React = require('react');
var styleMixin = require('mixins/style-mixin');

var ValueUpDown = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  getInitialState: function getInitialState () {
    var min = this.props.min || 0;
    var max = this.props.max || 100;
    var step = this.props.step || 1;
    var unit = this.props.unit || '';
    return {
      min: min,
      max: max,
      step: step,
      value: this.props.value || min,
      unit: unit
    };
  },

  render: function render () {
    return (
      <div className='cc-value-updown'>
        <div className='cc-value-updown__buttons'>
          <div ref='down' className='cc-value-updown__down' onClick={this.onDownClick}>&nbsp;</div>
          <div ref='up' className='cc-value-updown__up' onClick={this.onUpClick}>&nbsp;</div>
        </div>
        <h4 className='cc-value-updown__value'>{this.state.value}&nbsp;{this.state.unit}</h4>
      </div>
    );
  },

  onDownClick: function onDownClick () {
    this.setState({ value: Math.max(this.state.value - this.state.step, this.state.min) }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  },

  onUpClick: function onUpClick () {
    this.setState({ value: Math.min(this.state.value + this.state.step, this.state.max) }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }
});

module.exports = ValueUpDown;
