var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');

var gatewayStore = require('stores/gateway');

var DeviceState = require('common/components/device-state');
var Button = require('common/components/controls/button');
var Icon = require('common/components/icon');

var DeviceDetails = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(gatewayStore, 'gateway')
  ],

  onSave: function onSave () {
    console.log('Save button clicked!!!');
  },

  render: function render () {
    var gateway = this.state.gateway.model;
    return (

      <div className='cc-device-details grid-16'>
        <div className='cc-settings__header row fixed-height-3'>
          <div className='columns padded-left'>
            <h2 className='bold'>Yetu Home Gateway</h2>
          </div>
          <Link className='cc-device-details__closeButton' to='devices'>
            <Icon type='close' size='small' />
          </Link>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Get setup app</h5>
          </div>
          <div className='columns medium-4'>
            <a className='link' href='#'>Download setup app</a>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h3 className='uppercase bold'>Device details</h3>
          </div>
          <div className='columns medium-10'>
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Gateway Id</h5>
          </div>
          <div className='columns medium-6'>
            { gateway.gatewayId }
          </div>
          <div className='columns medium-3'>
            <DeviceState connected={ gateway.online }/>
          </div>
        </div>

        <div className='row fixed-height-2'>
          <div className='columns medium-4 padded-left'>
            <Button onClick={ this.onSave }>
              Save changes
            </Button>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = DeviceDetails;
