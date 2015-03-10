var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var styleMixin = require('mixins/style-mixin');
var roomStore = require('stores/room');

var DeviceDetail = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Router.State],


  getInitialState: function getInitialState () {
    var device = roomStore.getDevice(this.getParams().deviceId);
    return {
      device: device,
      rooms: roomStore.getRooms(),
      selectedRoom: roomStore.getRoomFromDevice(device)
    };
  },

  getRoomDropDown: function createRoomDropDown () {

    var rooms = this.state.rooms.map(function mapper (room, i) {
      return (
        <option key={i} value={room.id}>{room.title}</option>
      );
    });
    return rooms;

  },

  onRoomChange: function roomChange (e) {
    this.setState({selectedRoom: e.target.value});
  },
  onDescriptionChange: function descriptionChange (e) {
    var device = this.state.device;
    device.description = e.target.value;
    this.setState({device: device});
  },

  saveChanges: function saveChanges () {
    console.log('Room:', this.state.selectedRoom);
    console.log('Description:', this.state.device.description);
    // TODO: implement saving changes
  },

  render: function render () {
    return (
      <div className="cc-device-detail">
        <div className="cc-device-detail__headers cc__row">
          <Link className="cc-device-detail__close-button" to="devices"></Link>
          <h2 className="cc-device-detail__title">{this.state.device.title}</h2>
        </div>
        <div className="cc-device-detail__controls cc__row">
          <div className="cc-device-detail__labels">
            <label className="cc-device-detail__lbl">Controls</label>
          </div>
          <div className="cc-device-detail__values">
            TODO: Here the controls have to placed!
          </div>
        </div>
        <div className="cc-device-detail__properties cc__row">
          <div className="cc-device-detail__labels">
            <label htmlFor="cc-device-detail_desc" className="cc-device-detail__lbl">Description</label>
            <label htmlFor="cc-device-detail_room" className="cc-device-detail__lbl">Room</label>
          </div>
          <div className="cc-device-detail__values">
            <input type="text" id="cc-device-detail__desc" className="cc-device-detail__value"
              value={this.state.device.description} onChange={this.onDescriptionChange}></input>
            <select id="cc-device-detail__room" className="cc-device-detail__value"
              defaultValue={this.state.selectedRoom.title} onChange={this.onRoomChange}>
              {this.getRoomDropDown()}
            </select>
          </div>
        </div>
        <div className="cc-device-detail__accessrights cc__row">
          <h2>Access rights</h2>
        </div>
        <div className="cc-device-detail__details cc__row">
          <h2>Device Details</h2>
          <div className="cc-device-detail__labels">
            <label htmlFor="cc-device-detail_type" className="cc-device-detail__lbl">Type</label>
            <label htmlFor="cc-device-detail_id" className="cc-device-detail__lbl">ID</label>
          </div>
          <div className="cc-device-detail__values">
            <div id="cc-device-detail__type" className="cc-device-detail__value">{this.state.device.type}</div>
            <div id="cc-device-detail__id" className="cc-device-detail__value">{this.state.device.id}</div>
          </div>
        </div>
        <div className="cc-device-detail__buttons cc__row">
          <div className="cc-device-detail__left-btn">
            <a className="cc-device-detail__save-button" onClick={this.saveChanges}>Save changes</a>
          </div>
          <div className="cc-device-detail__right-btn">
            <a className="cc-device-detail__delete-button">Delete device</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DeviceDetail;
