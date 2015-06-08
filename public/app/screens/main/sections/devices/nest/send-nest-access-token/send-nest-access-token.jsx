var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Poll = require('helpers/poll');

var deviceListStore = require('stores/device-list');
var devicesService = require('services/devices/devices-service');
var deviceMessageActions = require('actions/device-message-actions');
var deviceActions = require('actions/device');

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
      accessToken: this.context.router.getCurrentParams().accessToken
    };
  },

  componentDidMount: function componentDidMount () {
    this.setAction(Actions.RETRIEVING_DEVICES);
    this.listenTo(deviceListStore, this.onDeviceListStoreUpdate);
  },

  render: function render () {
    return null;
  },

  setAction: function setAction (action) {
    deviceMessageActions.pushMessage(this.messageTextForAction(action), this.messageLevelForAction(action));
  },

  messageTextForAction: function messageTextForAction (action) {
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
        return 'Please wait while all your nest devices are added';
      default:
        return 'An unexpected error occurred';
    }
  },

  messageLevelForAction: function messageLevelForAction (action) {
    switch (action) {
      case Actions.NEST_SERVICE_NOT_FOUND:
      case Actions.SEND_AUTH_TOKEN_FAILURE:
        return deviceMessageActions.Levels.ERROR;
      default:
        return deviceMessageActions.Levels.INFO;
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
      this.setAction(Actions.SENDING_AUTH_TOKEN);
      var action = nestService.actions['set-SETABLE-value'];
      devicesService
        .invokeDeviceAction(action, { value: this.state.accessToken })
        .subscribe(
          function onSuccess () {
            this.setAction( Actions.SEND_AUTH_TOKEN_SUCCESS );
            this.pollForNestDevices();
          }.bind(this),
          function onError () {
            this.setAction( Actions.SEND_AUTH_TOKEN_FAILURE );
          }.bind(this));
    } else {
      this.setAction( Actions.NEST_SERVICE_NOT_FOUND );
    }
  },

  pollForNestDevices: function pollForNestDevices () {
    var isWithoutNestDevices = function isWithoutNestDevices (things) {
      return !_(things.entities).some(function isNestDevice (thing) {
        return thing.properties.name.match(/^Nest /) && (thing.properties.displayType !== 'WEBSERVICE');
      }, false);
    };

    var poll = new Poll({
      url: '/household/things?thingAs=representation&componentAs=representation',
      predicate: isWithoutNestDevices,
      interval: 1000
    });
    poll.promise.then(() => {
      deviceMessageActions.clearMessage();
      this.context.router.transitionTo('devices');
    });
  }
});

module.exports = SendNestAccessToken;
