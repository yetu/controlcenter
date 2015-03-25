var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');

var DeviceState = require('common/components/device-state');
var Button = require('common/components/controls/button');
var Icon = require('common/components/icon');
var SwitchControl = require('common/components/controls/switch');

var DeviceDetail = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Router.State
  ],

  getInitialState: function getInitialState () {
    return {
      device: {},
      selectedRoom: {},
      rooms: []
    };
  },

  getRoomSelectOptions: function getRoomSelectOptions () {
    return this.state.rooms.map(function mapper (room, i) {
      return (
        <option key={i} value={room.id}>{room.title}</option>
      );
    });
  },

  onRoomChange: function onRoomChange (e) {
    this.setState({selectedRoom: e.target.value});
  },

  onDescriptionChange: function onDescriptionChange (e) {
    var device = this.state.device;
    device.description = e.target.value;
    this.setState({device: device});
  },

  onSave: function onSave () {
    console.log('Room:', this.state.selectedRoom);
    console.log('Description:', this.state.device.description);
    // TODO: implement saving changes
  },

  render: function render () {
    return (

      <div className='cc-device-details grid-14 padded'>
        <div className='cc-settings__header row fixed-height-3'>
          <Link className='cc-device-details__closeButton' to='devices'>
            <Icon type='close' size='small' />
          </Link>
          <div className='columns'>
            <h2>{ this.state.device.name }</h2>
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>Controls</h5>
          </div>
          <div className='columns medium-10'>
            <SwitchControl device={ this.state.device } />
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>Description</h5>
          </div>
          <div className='columns medium-4'>
            <input
              type='text' className='cc-device-details__input'
              value={ this.state.device.description } onChange={ this.onDescriptionChange }>
            </input>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>Room</h5>
          </div>
          <div className='columns medium-4'>
            <select className='cc-device-details__select'
              defaultValue={ this.state.selectedRoom.title } onChange={ this.onRoomChange }>
              { this.getRoomSelectOptions() }
            </select>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h3 className='bold'>Access rights</h3>
          </div>
          <div className='columns medium-10'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>Playback control</h5>
          </div>
          <div className='columns medium-4'>
            <select className='cc-device-details__select'></select>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>Configuration</h5>
          </div>
          <div className='columns medium-4'>
            <select className='cc-device-details__select'></select>
          </div>
          <div className='columns medium-6'></div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h3 className='bold'>Device details</h3>
          </div>
          <div className='columns medium-10'>
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>Type</h5>
          </div>
          <div className='columns medium-10'>
            { this.state.device.type }
          </div>
        </div>

        <div className='row fixed-height-1'>
          <div className='columns medium-4'>
            <h5>ID</h5>
          </div>
          <div className='columns medium-4'>
            { this.state.device.id }
          </div>
          <div className='columns medium-3'></div>
          <div className='columns medium-3'>
            <DeviceState device={ this.state.device }/>
          </div>
        </div>

        <div className='row fixed-height-2'>
          <div className='columns medium-4'>
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

module.exports = DeviceDetail;
