var React = require('react');
var styleMixin = require('mixins/style-mixin');
var roomStore = require('stores/room');

var DeviceDetail = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  getInitialState: function getInitialState () {
    return {
      rooms: roomStore.getRooms(),
      selectedRoom: this.props.room
    };
  },

  createRoomDropDown: function(){
    var rooms = this.state.rooms.map(function mapper (room, i) {
        var option;
        if(room.title===this.state.selectedRoom){
          option = <option selected key={i} value={room.title}>{room.title}</option>
        }
        else {
          option = <option key={i} value={room.title}>{room.title}</option>
        }
        return (
          option
        );
    }.bind(this));
    return rooms;

  },

  render: function render () {
    return (
      <div className="cc-device-detail">
        <div className="cc-device-detail__headers cc-device-detail__row">
          <a className="cc-device-detail__close-button" onClick={this.props.onCloseClick}></a>
          <h2 className="cc-device-detail__title">{this.props.device.title}</h2>
        </div>
        <div className="cc-device-detail__controls cc-device-detail__row">
          <div className="cc-device-detail__labels">
            <label className="cc-device-detail__lbl">Controls</label>
          </div>
          <div className="cc-device-detail__values">
            TODO: Here the controls have to placed!
          </div>
        </div>
        <div className="cc-device-detail__properties cc-device-detail__row">
          <div className="cc-device-detail__labels">
            <label htmlFor="cc-device-detail_desc" className="cc-device-detail__lbl">Description</label>
            <label htmlFor="cc-device-detail_room" className="cc-device-detail__lbl">Room</label>
          </div>
          <div className="cc-device-detail__values">
            <div id="cc-device-detail__desc" className="cc-device-detail__value">{this.props.device.description}</div>
            <select id="cc-device-detail__room" className="cc-device-detail__value">
              {this.createRoomDropDown()}
            </select>
          </div>
        </div>
        <div className="cc-device-detail__accessrights cc-device-detail__row">
          <h2>Access rights</h2>
        </div>
        <div className="cc-device-detail__details cc-device-detail__row">
          <h2>Device Details</h2>
          <div className="cc-device-detail__labels">
            <label htmlFor="cc-device-detail_type" className="cc-device-detail__lbl">Type</label>
            <label htmlFor="cc-device-detail_id" className="cc-device-detail__lbl">ID</label>
          </div>
          <div className="cc-device-detail__values">
            <div id="cc-device-detail__type" className="cc-device-detail__value">{this.props.device.type}</div>
            <div id="cc-device-detail__id" className="cc-device-detail__value">{this.props.device.id}</div>
          </div>
        </div>
        <div className="cc-device-detail__buttons cc-device-detail__row">
          <div className="cc-device-detail__left-btn">
            <a className="cc-device-detail__save-button">Save changes</a>
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
