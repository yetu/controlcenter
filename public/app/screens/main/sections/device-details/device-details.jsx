var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');

var deviceListStore = require('stores/device-list');
var roomStore = require('stores/room');

var DeviceState = require('common/components/device-state');
var Button = require('common/components/controls/button');
var Icon = require('common/components/icon');
var SwitchControl = require('common/components/controls/switch');

var DeviceDetails = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(deviceListStore, 'deviceList'),
    Reflux.connect(roomStore, 'rooms'),
    Router.State
  ],

  getRoomSelectOptions: function getRoomSelectOptions () {
    return this.state.rooms.map(function mapper (room, i) {
      return (
        <option key={i} value={room.id}>{ room.title }</option>
      );
    });
  },

  onRoomChange: function onRoomChange (e) {
    this.setState({ selectedRoom: e.target.value });
  },

  onDescriptionChange: function onDescriptionChange (e) {
    var device = this.state.device;
    device.description = e.target.value;
    this.setState({ device: device });
  },

  onSave: function onSave () {
    console.log('Room:', this.state.selectedRoom);
    console.log('Description:', this.state.device.description);
    // TODO: implement saving changes
  },

  render: function render () {
    var deviceId = this.context.getCurrentParams().deviceId;
    var device = this.state.deviceList.deviceById[deviceId];

    return (

      <div className='cc-device-details grid-16'>
        <div className='cc-settings__header row fixed-height-3'>
          <Link className='cc-device-details__closeButton' to='devices'>
            <Icon type='close' size='small' />
          </Link>
          <div className='columns padded-left'>
            <h2>{ device.name }</h2>
          </div>
        </div>

        <div className='row fixed-height-1 alternate-dark'>
          <div className='columns medium-4 padded-left'>
            <h5>Controls</h5>
          </div>
          <div className='columns medium-10'>
            <SwitchControl device={ device } />
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Description</h5>
          </div>
          <div className='columns medium-4'>
            <input
              type='text' className='cc-device-details__input'
              value={ device.description } onChange={ this.onDescriptionChange }>
            </input>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Room</h5>
          </div>
          <div className='columns medium-4'>
            <select className='cc-device-details__select'
              defaultValue={ this.state.rooms[0] } onChange={ this.onRoomChange }>
              { this.getRoomSelectOptions() }
            </select>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1 alternate-dark'>
          <div className='columns medium-4 padded-left'>
            <h3 className='bold'>Access rights</h3>
          </div>
          <div className='columns medium-10'></div>
        </div>

        <div className='row fixed-height-1 alternate-dark'>
          <div className='columns medium-4 padded-left'>
            <h5>Playback control</h5>
          </div>
          <div className='columns medium-4'>
            <select className='cc-device-details__select'></select>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1 alternate-dark'>
          <div className='columns medium-4 padded-left'>
            <h5>Configuration</h5>
          </div>
          <div className='columns medium-4'>
            <select className='cc-device-details__select'></select>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h3 className='bold'>Device details</h3>
          </div>
          <div className='columns medium-10'>
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>Type</h5>
          </div>
          <div className='columns medium-10'>
            { device.type }
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4 padded-left'>
            <h5>ID</h5>
          </div>
          <div className='columns medium-4'>
            { device.id }
          </div>
          <div className='columns medium-3'></div>
          <div className='columns medium-3'>
            <DeviceState device={ device }/>
          </div>
        </div>

        <div className='row fixed-height-2'>
          <div className='columns medium-4 padded-left'>
            <Button onClick={ this.onSave }>
              Save changes
            </Button>
          </div>
          <div className='columns medium-10'>
            <Button secondary='true'>
              Delete this device
            </Button>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = DeviceDetails;
