var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');
var roomStore = require('stores/room');
var DeviceState = require('../device-state');

var DeviceDetail = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Router.State
  ],

  getInitialState: function getInitialState () {
    var device = roomStore.getDevice(this.getParams().deviceId);
    return {
      device: device,
      rooms: roomStore.getRooms(),
      selectedRoom: roomStore.getRoomFromDevice(device)
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
      <div className="cc-device-detail">
        <div className="cc-device-detail__headers">
          <Link className="cc-device-detail__close-button" to="devices"></Link>
          <h2 className="cc-device-detail__title">{this.state.device.title}</h2>
        </div>
        <div className="cc-device-detail__controls">
          <div className="cc-device-detail__controls-label">
            Controls
          </div>
          <div className="cc-device-detail__controls-values">
            TODO: Place device controls here
          </div>
        </div>
        <div className="cc-device-detail__properties">
          <div className="cc-device-detail__properties-row">
            <div className="cc-device-detail__properties-row-label">
              <label htmlFor="cc-device-detail__desc">Description</label>
            </div>
            <div className="cc-device-detail__properties-row-value">
              <input
                type="text" id="cc-device-detail__desc" className="cc-device-detail__properties-row-value-description"
                value={this.state.device.description} onChange={this.onDescriptionChange}></input>
            </div>
          </div>
          <div className="cc-device-detail__properties-row">
            <div className="cc-device-detail__properties-row-label">
              <label htmlFor="cc-device-detail__room">Room</label>
            </div>
            <div className="cc-device-detail__properties-row-value">
              <select id="cc-device-detail__room" className="cc-device-detail__properties-row-value-room"
                defaultValue={this.state.selectedRoom.title} onChange={this.onRoomChange}>
                {this.getRoomSelectOptions()}
              </select>
            </div>
          </div>
        </div>
        <div className="cc-device-detail__access-rights">
          <h2>Access rights</h2>
          <div className="cc-device-detail__access-rights-row">
          </div>
        </div>
        <div className="cc-device-detail__details">
          <h2>Device Details</h2>
          <div className="cc-device-detail__details-row">
            <div className="cc-device-detail__properties-row-label">
              <label htmlFor="cc-device-detail_type">Type</label>
            </div>
            <div className="cc-device-detail__properties-row-value">
              <span id="cc-device-detail__type">{this.state.device.type}</span>
            </div>
          </div>
          <div className="cc-device-detail__details-row">
            <div className="cc-device-detail__properties-row-label">
              <label htmlFor="cc-device-detail_id">ID</label>
            </div>
            <div className="cc-device-detail__properties-row-value">
              <span id="cc-device-detail__id">{this.state.device.id}</span>
            </div>
          </div>
          <div className="cc-device-detail__details-device-state">
            <DeviceState device={this.state.device}/>
          </div>
        </div>
        <div className="cc-device-detail__buttons">
          <div className="cc-device-detail__save">
            <a className="cc-device-detail__save-button" onClick={this.onSave}>Save changes</a>
          </div>
          <div className="cc-device-detail__delete">
            <a className="cc-device-detail__delete-button">Delete device</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DeviceDetail;
