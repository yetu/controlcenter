var React = require('react');
var Reflux = require('reflux');
var styleMixin = require('mixins/style-mixin');

var userDataStore = require('stores/user-data');
var userDataActions = require('actions/user-data');

var UserInfo = React.createClass({

  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.listenTo(userDataStore, 'onUserDataChanged')
  ],

  getInitialState: function getInitialState () {
    return {
      model: {},
      error: {}
    };
  },

  componentWillMount: function componentWillMount () {
    userDataActions.fetchUserData();
  },

  onUserDataChanged: function onUserDataChanged (userData) {
    if (userData.model) {
      this.setState({
        model: userData.model
      });
    } else if (userData.error) {
      // TODO we can add more error handling login for the component
      this.setState({
        error: userData.error
      });
    }
  },

  render: function render () {
    return (
      <div className='cc-user-info grid-14'>
        <div className='cc-user-info-item row fixed-height-1'>
          <div className='cc-user-info-item__label columns medium-4'>
            <span className='cc-user-info-item__label-text'>
              Password
            </span>
          </div>

          <div className='cc-user-info-item__value columns medium-10'>
            <span className='cc-user-info-item__value-text'>
              .............
            </span>
          </div>
        </div>

        <div className='cc-user-info-item row fixed-height-1'>
          <div className='cc-user-info-item__label columns medium-4'>
            <span className='cc-user-info-item__label-text'>
              Email
            </span>
          </div>

          <div className='cc-user-info-item__value columns medium-10'>
            <span className='cc-user-info-item__value-text'>
              {this.state.model.email}
            </span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserInfo;
