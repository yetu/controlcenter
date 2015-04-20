var React = require('react');
var Reflux = require('reflux');

var Link = require('react-router').Link;
var DeviceStateIcon = require('common/components/device-state/device-state-icon');
var DeviceStateText = require('common/components/device-state/device-state-text');


var gatewayStore = require('stores/gateway');

module.exports = React.createClass({

  mixins: [
    Reflux.connect(gatewayStore, 'gateway')
  ],

  render: function render () {
    return (
      <div className='cc-gateway row fixed-height-1'>
        <div className='cc-device__title columns small-11 quarter-padded-left'>
          {
            this.state.gateway.model.gatewayId
            ? this.showGatewayTemplate()
            : this.showLoadingTemplate()
          }
        </div>
        <div className='cc-device__state columns small-1 text-center'>
          <DeviceStateIcon connected={ this.state.gateway.model.online } />
        </div>
        <div className='cc-device__state columns small-2 text-center'>
          <DeviceStateText connected={ this.state.gateway.model.online } />
        </div>
      </div>
    );
  },

  showLoadingTemplate: function showLoadingTemplate () {
    return <h4>Loading</h4>;
  },

  showGatewayTemplate: function showLoadingTemplate () {
    return <Link to='gateway'>
      <h4>Home gateway</h4>
    </Link>;
  }

});
