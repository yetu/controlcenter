var React = require('react');

var styleMixin = require('mixins/style-mixin');

var UserForm = require('./user-form');
var UserAvatar = require('./user-avatar');
var UserInfo = require('./user-info');

var Button = require('common/components/controls/button');

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
        <div className='cc-settings__header row fixed-height-3 hide-for-small'>
          <div className='columns'></div>
        </div>
        <div className='cc-settings__section'>
          <div className='cc-settings__section-form row'>
            <div className='columns medium-8 quarter-padded-left'>
              <UserForm />
            </div>
            <div className='columns medium-6'>
              {/*
              <UserAvatar />
              */}
            </div>
          </div>
        </div>

        <div className='cc-settings__section row'>
          <div className='cc-settings__section-info columns quarter-padded-left'>
            <UserInfo />
          </div>
        </div>

        <div className='row fixed-height-1'></div>

        <div className='row small-text-center medium-text-left'>
          <Button onClick={ this.submitForm }>
            Save changes
          </Button>
        </div>
      </div>
    );
  }
});

module.exports = SettingsPage;
