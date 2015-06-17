var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');

var deviceActions = require('actions/device');

var deviceDetailsStore = require('stores/device-details');
var roomStore = require('stores/room');

var DeviceStatus = require('common/components/device-status');
var Button = require('common/components/controls/button');
var Icon = require('common/components/icon');
var Overlay = require('common/components/overlay');
var Dialog = require('common/components/dialog');

var DeviceActionControl = require('common/components/device-action-control');

var DeviceDetails = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(deviceDetailsStore, 'device'),
    Reflux.connect(roomStore, 'rooms')
  ],

  // TODO: Replace w/ ES6 notion, see https://github.com/rackt/react-router/blob/master/docs/api/RouterContext.md
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function componentDidMount () {
    var deviceId = this.props.params.deviceId;
    deviceActions.fetchDeviceById(deviceId);
  },

  render: function render () {
    var device = this.state.device.model || {};
    var deviceProperties = device.properties || {};

    return (
      <div className='cc-device-details grid-16'>
        <div className='cc-settings__header row fixed-height-3'>
          <div className='columns padded-left'>
            <h2 className='bold'>{ deviceProperties.name }</h2>
          </div>
          <Link className='cc-device-details__closeButton' to='devices'>
            <Icon type='close' size='small'/>
          </Link>
        </div>

        <Overlay ref='deleteDialog'>
          <Dialog title='Do you want to remove this device from your device list?' buttons={this.deleteDialogButtons()}>
            <div className='row'>
              <div className='column'>
                {/* TODO: List here other devices that would be affected by removal */}
              </div>
            </div>
          </Dialog>
        </Overlay>

        <div className='row fixed-height-1 alternate-dark'>
          <div className='columns medium-4 padded-left'>
            <h5>Controls</h5>
          </div>
          <div className='columns medium-12'>
            <DeviceActionControl device={ device }/>
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h3 className='uppercase bold'>Device details</h3>
          </div>
          <div className='columns medium-12'>
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Type</h5>
          </div>
          <div className='columns medium-12'>
            { deviceProperties.displayType }
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>ID</h5>
          </div>
          <div className='columns medium-8'>
            { deviceProperties.id }
          </div>
          <div className='columns medium-4'>
            <DeviceStatus status={ deviceProperties.status }/>
          </div>
        </div>

        <div className='row fixed-height-2'>
          <div className='columns medium-4 padded-left'>
            <Button onClick={ this.onSave }>
              Save changes
            </Button>
          </div>
          <div className='columns medium-10'>
            <Button secondary='true' onClick={this.onDeleteClick}>
              Delete this device
            </Button>
          </div>
        </div>
      </div>
    );
  },

  onSave: function onSave () {
    // TODO: Implement change save
    this.context.router.transitionTo('devices');
  },

  onDeleteClick: function onDeleteClick () {
    this.refs.deleteDialog.show();
  },

  deleteDialogButtons: function deleteDialogButtons () {
    return [
      ['Remove', this.onDeleteDialogConfirm],
      ['Cancel', this.onDeleteDialogCancel]
    ];
  },

  onDeleteDialogCancel: function onDeleteDialogCancel () {
    this.refs.deleteDialog.hide();
  },

  onDeleteDialogConfirm: function onDeleteDialogCancel () {
    deviceActions.delete(this.state.device.model);
    this.context.router.transitionTo('devices');
  }
});

module.exports = DeviceDetails;
