var React = require('react');
var Reflux = require('reflux');
var styleMixin = require('mixins/style-mixin');

var userDataStore = require('stores/user-data');

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
      <div className='cc-user-info'>
        <div className='cc-user-info-item'>
          <div className='cc-user-info-item__label'>
            <span className='cc-user-info-item__label-text'>
              Password
            </span>
          </div>

          <div className='cc-user-info-item__value'>
            <span className='cc-user-info-item__value-text'>
              .............
            </span>
          </div>
        </div>

        <div className='cc-user-info-item'>
          <div className='cc-user-info-item__label'>
            <span className='cc-user-info-item__label-text'>
              Email
            </span>
          </div>

          <div className='cc-user-info-item__value'>
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
