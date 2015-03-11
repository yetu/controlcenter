var React = require('react');

var styleMixin = require('mixins/style-mixin');

var UserForm = require('./user-form');
var UserAvatar = require('./user-avatar');
var UserInfo = require('./user-info');

var userDataActions = require('actions/user-data');

var SettingsPage = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  submitForm: function submitForm () {
    userDataActions.saveUserData();
  },

  render: function render () {
    return (
      <div className='cc-settings'>
        <div className='cc-settings__section'>
          <div className='cc-settings__section-form'>
            <UserForm />
          </div>
          <div className='cc-settings__section-avatar'>
            <UserAvatar />
          </div>
        </div>

        <div className='cc-settings__divider'></div>

        <div className='cc-settings__section'>
          <div className='cc-settings__section-info'>
            <UserInfo />
          </div>
        </div>

        <a className='cc-settings__save' href='#' onClick={this.submitForm}>
          Save changes
        </a>
      </div>
    );
  }
});

module.exports = SettingsPage;
