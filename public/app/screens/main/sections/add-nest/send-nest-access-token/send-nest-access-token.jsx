var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var deviceListStore = require('stores/device-list');
var devicesService = require('services/devices/devices-service');

var Actions = {
  RETRIEVING_DEVICES: 'RETRIEVING_DEVICES',
  NEST_SERVICE_NOT_FOUND: 'NEST_SERVICE_NOT_FOUND',
  SENDING_AUTH_TOKEN: 'SENDING_AUTH_TOKEN',
  SEND_AUTH_TOKEN_SUCCESS: 'SEND_AUTH_TOKEN_SUCCESS',
  SEND_AUTH_TOKEN_FAILURE: 'SEND_AUTH_TOKEN_FAILURE'
};

var SendNestAccessToken = React.createClass({
  mixins: [
    Reflux.connect(deviceListStore)
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function getInitialState () {
    return {
      accessToken: this.context.router.getCurrentParams().accessToken,
      action: Actions.RETRIEVING_DEVICES
    };
  },

  componentDidMount: function componentDidMount () {
    this.listenTo(deviceListStore, this.onDeviceListStoreUpdate);
  },

  render: function render () {
    return (
      <span>{ this.messageForAction(this.state.action) }</span>
    );
  },

  setAction: function setAction (action) {
    if (this.state.action === action) {
      return;
    }
    switch (action) {
      case Actions.NEST_SERVICE_NOT_FOUND:
      case Actions.SEND_AUTH_TOKEN_SUCCESS:
      case Actions.SEND_AUTH_TOKEN_FAILURE:
        this.props.onComplete();
    }
    this.setState( { action: action });
  },

  messageForAction: function messageForAction (action) {
    // TODO: i18n
    switch (action) {
      case Actions.RETRIEVING_DEVICES:
      case Actions.SENDING_AUTH_TOKEN:
        return 'Connecting your nest account to your gateway...';
      case Actions.NEST_SERVICE_NOT_FOUND:
        return 'Gateway does not provide a nest webservice';
      case Actions.SEND_AUTH_TOKEN_FAILURE:
        return 'Cannot connect your nest account to your gateway';
      case Actions.SEND_AUTH_TOKEN_SUCCESS:
        return 'Your nest account is now connected to your gateway';
      default:
        return 'An unexpected error occurred';
    }
  },

  onDeviceListStoreUpdate: function onDeviceListStoreUpdate () {
    // Look for nest web service among all things
    var nestService = _.find(this.state.devices, function isNestWebservice (device) {
      // TODO: Use a more sophisticated way to identify the nest webservice device
      // TODO: Share logic with filter that flags device as hidden
      return device.properties.name.toLowerCase().indexOf('nest account') > -1;
    });
    // Set nest access token as the service's property
    if (nestService) {
      var action = nestService.actions['set-SETABLE-value'];
      devicesService
        .invokeDeviceAction(action, { value: this.state.accessToken })
        .subscribe(
          function onSuccess () {
            this.setAction( Actions.SEND_AUTH_TOKEN_SUCCESS );
          }.bind(this),
          function onError () {
            this.setAction( Actions.SEND_AUTH_TOKEN_FAILURE );
          }.bind(this));
    } else {
      this.setAction( Actions.NEST_SERVICE_NOT_FOUND );
    }
  }
});

module.exports = SendNestAccessToken;
