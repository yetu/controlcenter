'use strict';

var React = require('react');

var StyleMixin = require('mixins/style-mixin');

var UserForm = require("./user-form");
var UserAvatar = require("./user-avatar");

var userDataActions = require('actions/user-data');

var SettingsPage = React.createClass({
  mixins: [
    StyleMixin(require('./style.scss'))
  ],

  submitForm: function () {
    userDataActions.saveUserData();
  },

  render: function () {
    return (
      <div className="cc-settings">
        <h2 className="cc-settings__title">My settings</h2>
        <div className="cc-settings__section">
          <div className="cc-settings__section-form">
            <UserForm />
          </div>
          <div className="cc-settings__section-avatar">
            <UserAvatar />
          </div>
        </div>

        <span className="cc-settings__save" onClick={this.submitForm}>
          Save changes
        </span>
      </div>
    );
  }
});

module.exports = SettingsPage;
