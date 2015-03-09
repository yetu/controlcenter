var React = require('react');
var styleMixin = require('mixins/style-mixin');

var SwitchControl = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  getInitialState: function getInitialState () {
    return { checked: this.props.checked || false };
  },

  render: function render () {
    return (
      <div
        className={
          'cc-switch-control ' +
          (this.state.checked ? 'cc-switch-control__on' : 'cc-switch-control__off')
        }
        onClick={this.toggle} />
    );
  },

  toggle: function toggle () {
    this.setState({ checked: !this.state.checked });
  }

});

module.exports = SwitchControl;
