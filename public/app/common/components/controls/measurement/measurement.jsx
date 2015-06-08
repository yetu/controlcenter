var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var styleMixin = require('mixins/style-mixin');

var Measurement = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    PureRenderMixin
  ],

  getDefaultProps: function getDefaultProps () {
    return { value: 0 };
  },

  render: function render () {
    return (
      <div className='cc-measurement-control'>
        {this.props.value}
      </div>
    );
  }
});

module.exports = Measurement;
