var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');

var gatewayService = require('services/devices/gateway-service');
var gatewayStore = require('stores/gateway');

var DeviceStatus = require('common/components/device-status');
var Button = require('common/components/controls/button');
var Icon = require('common/components/icon');
var Overlay = require('common/components/overlay');
var Dialog = require('common/components/dialog');

var DeviceDetails = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(gatewayStore, 'gateway')
  ],

  // TODO: Replace w/ ES6 notion, see https://github.com/rackt/react-router/blob/master/docs/api/RouterContext.md
  contextTypes: {
    router: React.PropTypes.func
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

        <Overlay ref='resetDialog'>
          <Dialog title='Do you want to delete your gateway?' buttons={this.resetDialogButtons()}>
          </Dialog>
        </Overlay>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Get setup app</h5>
          </div>
          <div className='columns medium-4'>
            <a className='link' href={gateway.setupAppUrl}>Download setup app</a>
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
            <DeviceStatus status={ gateway.online ? 'connected' : 'disconnected' }/>
          </div>
        </div>

        <div className='row fixed-height-2'>
          <div className='columns medium-4 padded-left'>
            <Button onClick={ this.save }>
              Save changes
            </Button>
          </div>
          <div className='columns medium-10'>
            <Button secondary='true' onClick={this.showResetDialog}>
              Reset my gateway
            </Button>
          </div>
        </div>

      </div>
    );
  },

  save: function onSave () {
  },

  showResetDialog: function showResetDialog () {
    this.refs.resetDialog.show();
  },

  resetDialogButtons: function resetDialogButtons () {
    return [
      ['Delete', this.reset],
      ['Cancel', this.hideResetDialog]
    ];
  },

  hideResetDialog: function hideResetDialog () {
    this.refs.resetDialog.hide();
  },

  reset: function reset () {
    gatewayService.resetGateway().then(() => {
      this.context.router.transitionTo('/');
    });
  }

});

module.exports = DeviceDetails;
