var React = require("react");
var Reflux = require("reflux");
var StyleMixin = require('mixins/style-mixin');
var t = require('tcomb-form');

var CCForm = require('common/components/cc-form');

var userDataStore = require('stores/user-data');
var settingsActions = require('actions/user-data');


var ControlCenterUser = t.struct({
  firstName: t.Str,
  lastName: t.Str
});

var UserForm = React.createClass({
  mixins: [
    StyleMixin(require('./style.scss')),
    Reflux.listenTo(userDataStore, 'onUserDataChanged')
  ],

  onUserDataChanged: function (userData) {
    if (userData.error != null && userData.model) {
      this.setState(userData.model);
    }
  },

  getInitialState: function () {
    return {}
  },

  componentWillMount: function () {
    settingsActions.fetchUserData();
  },

  onValidChange: function (value) {
    settingsActions.updateUserData(value);
    console.log('Valid value', value);
  },

  render: function () {
    return (
      <CCForm type={ControlCenterUser} onValidChange={this.onValidChange} value={this.state}/>
    )
  }
});

module.exports = UserForm;
