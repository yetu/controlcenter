var React = require('react');
var Reflux = require('reflux');
var styleMixin = require('mixins/style-mixin');
var _ = require('lodash');

var deviceListStore = require('stores/device-list');
var deviceActions = require('actions/device');

var Device = require('./device');
var Gateway = require('./gateway');

var Room = React.createClass({

  mixins: [
    Reflux.connect(deviceListStore),
    styleMixin(require('./style.scss'))
  ],

  componentDidMount: function componentDidMount () {
    var REFETCH_INTERVAL = 2000;

    // Refetch devices every some seconds as long as we have no push messages
    this.refetchIntervalId = window.setInterval(() => {
      deviceActions.fetchList();
    }, REFETCH_INTERVAL);
  },

  componentWillUnmount: function componentWillUnmount () {
    // Stop refetching devices
    window.clearInterval(this.refetchIntervalId);
  },

  isNestWebservice: function isNestWebservice (device) {
    // TODO: Use a more sophisticated way to identify the nest webservice device
    return device.properties.name.toLowerCase().indexOf('nest account') > -1;
  },

  render: function render () {
    var devices = _(this.state.devices)
      .reject((device) => this.isNestWebservice(device))
      .map((device, i) => <Device device={device} key={i}/>)
      .value();

    return (
      <div className='cc-room'>
        <div className='row fixed-height-1 group-header'>
          <div className='column small-14 quarter-padded-left'>
            <h3 className='align-text-top uppercase'>{this.props.title}</h3>
          </div>
        </div>
        <Gateway/>

        {devices}
      </div>
    );
  }
});

module.exports = Room;
