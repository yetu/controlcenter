React           = require 'react'
Reflux          = require 'reflux'

styleMixin      = require 'mixins/style-mixin'

userDataStore   = require 'stores/user-data'
userDataActions = require 'actions/user-data'

UserInfo = React.createClass

  mixins: [
    styleMixin require('./style.scss')
    Reflux.listenTo userDataStore, 'onUserDataChanged'
  ]

  getInitialState: ->
    model: {}
    error: {}

  componentWillMount: ->
    do userDataActions.fetchUserData

  onUserDataChanged: (userData) ->
    if userData.model?
      this.setState model:userData.model
    else if userData.error?
      # TODO we can add more error handling login for the component
      this.setState error:userData.error

  render: ->
    emailRow = @row 'Email',
      (<span className='cc-user-info-item__value-text'>
        {@state.model.email}
      </span>)

    registrationDateRow = @row 'Registration date',
      (<span className='cc-user-info-item__value-text'>
        {@state.model.registrationDate}
      </span>)

    passwordRow = @row 'Password',
      (<a href={window.yetu.config.authChangePasswordURL} target='_blank'>Change password</a>)

    <div className='cc-user-info grid-14'>
      {emailRow}
      {registrationDateRow}
      {passwordRow}
    </div>

  row: (label, value) ->
      <div className='cc-user-info-item row fixed-height-1'>
        <div className='cc-user-info-item__label columns medium-4'>
            <span className='cc-user-info-item__label-text'>
              {label}
            </span>
        </div>
        <div className='cc-user-info-item__value columns medium-10'>
          {value}
        </div>
      </div>

module.exports = UserInfo
