var React = require('react');

var styleMixin = require('mixins/style-mixin');

var UserForm = require('./user-form');
var UserAvatar = require('./user-avatar');
var UserInfo = require('./user-info');

var Button = require('common/components/controls/button');
var Header = require('common/components/header');

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
      <div className='cc-settings grid-14 padded'>
        <Header></Header>
        <div className='cc-settings__section'>
          <div className='cc-settings__section-form row'>
            <div className='columns medium-8 padded-left'>
              <UserForm />
            </div>
            <div className='columns medium-6'>
              <UserAvatar />
            </div>
          </div>
        </div>

        <div className='cc-settings__divider row fixed-height-1'></div>

        <div className='cc-settings__section row'>
          <div className='cc-settings__section-info'>
            <UserInfo />
          </div>
        </div>

        <div className='row fixed-height-1'></div>

        <Button onClick={ this.submitForm }>
          Save changes
        </Button>
      </div>
    );
  }
});

module.exports = SettingsPage;
