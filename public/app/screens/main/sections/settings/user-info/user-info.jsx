'use strict';

var React = require("react");
var Reflux = require("reflux");
var StyleMixin = require('mixins/style-mixin');

var userDataStore = require('stores/user-data');

var UserInfo = React.createClass({

  mixins: [
    StyleMixin(require('./style.scss')),
    Reflux.listenTo(userDataStore, 'onUserDataChanged')
  ],

  getInitialState: function () {
    return {
      model: {},
      error: {}
    };
  },

  onUserDataChanged: function (userData) {
    if (userData.model) {

      this.setState({
        model: userData.model
      })
    } else if (userData.error) {
      //TODO we can add more error handling login for the component
      this.setState({
        error: userData.error
      })
    }
  },

  render: function () {
    return (
      <div className="cc-user-info">
        <div className="cc-user-info-item">
          <div className="cc-user-info-item__label-container">
            <span className="cc-user-info-item__label">
              Password
            </span>
          </div>

          <div className="cc-user-info-item__value-container">
            <span className="cc-user-info-item__value">
              .............
            </span>
          </div>
        </div>

        <div className="cc-user-info-item">
          <div className="cc-user-info-item__label-container">
            <span className="cc-user-info-item__label">
              Email
            </span>
          </div>

          <div className="cc-user-info-item__value-container">
            <span className="cc-user-info-item__value">
              {this.state.model.email}
            </span>
          </div>
        </div>

      </div>
    )
  }
});

module.exports = UserInfo;
