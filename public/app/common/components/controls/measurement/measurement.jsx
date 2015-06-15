var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var styleMixin = require('mixins/style-mixin');

var Measurement = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    PureRenderMixin
  ],

  getDefaultProps: function getDefaultProps () {
    return { value: 0, symbol: null };
  },

  render: function render () {
    var value = this.props.value;
    var unit = this.props.unit;
    return (
      <div className='cc-measurement-control'>
        {value === null ? null : value.toString()}
        {unit}
      </div>
    );
  }
});

module.exports = Measurement;
