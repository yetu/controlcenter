var React = require('react');
var styleMixin = require('mixins/style-mixin');

var SliderControl = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  getInitialState: function getInitialState () {
    return {
      value: this.props.value || 0,
      min: this.props.min || 0,
      max: this.props.max || 100
    };
  },

  render: function render () {
    return (
      <div className="cc-slider-control">
        <input
          className="cc-slider-control__input"
          type="range"
          min={this.state.min}
          max={this.state.max}
          step="1"
          value={this.state.value}
          onChange={this.onChange} />
      </div>
    );
  },

  onChange: function onChange (e) {
    this.setState({ value: e.target.value });
  }
});

module.exports = SliderControl;
