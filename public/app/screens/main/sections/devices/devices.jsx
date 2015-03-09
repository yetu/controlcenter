var React = require('react');
var Reflux = require('reflux');
var Room = require('./room');
var DeviceDetail = require('./device-detail/deviceDetail');

var roomStore = require('stores/room');
var roomActions = require('actions/room');

var styleMixin = require('mixins/style-mixin');

// TODO: Rename to DevicesSection
var DeviceRegion = React.createClass({
  mixins: [
    Reflux.connect(roomStore, 'rooms'),
    styleMixin(require('./style.scss'))
  ],

  getInitialState: function getInitialState () {
    return {
      rooms: roomStore.getRooms(),
      page: 'devices'
    };
  },

  allDevices: function allDevices() {
      var rooms = this.state.rooms.map(function mapper (room, i) {
        return (
          <Room room={room} key={i} onDeviceClick={this.openDeviceDetailPage}/>
        );
      }.bind(this));
      return (
        <div className='cc-devices'>
          <h2 className='cc-devices__title'>My devices</h2>
          <a className='cc-devices__button' href='#'>+ Add device</a>
            {rooms}
          <a className='cc-devices__button' href='#' onClick={this.handleAddRoom}>+ Add room</a>
        </div>
      );
  },

  deviceDetail: function deviceDetail() {
      return (
        <DeviceDetail/>
      )
  },

  render: function render () {
    var page = this.page();
    return(
      <div>{{page}}</div>
    )
  },

  page: function page(){
    switch (this.state.page) {
      case 'devices':
        return this.allDevices();
      case 'deviceDetail':
        return this.deviceDetail();
    }
    return null;
  },

  openDeviceDetailPage: function openDeviceDetailPage (){
    this.setState({page:"deviceDetail"});
  },

  handleAddRoom: function handleAddRoom () {
    roomActions.createRoom();
  }
});

module.exports = DeviceRegion;
