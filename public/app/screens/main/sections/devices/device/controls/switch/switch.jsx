'use strict';
var React = require('react');
var StyleMixin = require('mixins/style-mixin');

var SwitchControl = React.createClass({
  mixins: [StyleMixin(require('./style.scss'))],

  getInitialState() {
    return {checked: this.props.checked || false};
  },

  render: function () {
    return (
      <div className="cc-switch-control" onClick={this.toggle}>
        <div className={'cc-switch-control__button cc-switch-control__off ' + (this.state.checked ? '' : 'cc-switch-control__checked')}>Off</div>
        <div className={'cc-switch-control__button cc-switch-control__on ' + (this.state.checked ? 'cc-switch-control__checked' : '')}>On</div>
      </div>
    );
  },

  toggle: function () {
    this.setState({checked: !this.state.checked});
  }

});

module.exports = SwitchControl;
