var Reflux = require('reflux');

var roomActions = Reflux.createActions([
  'addDevice',
  'removeDevice',
  // room actions
  'addRoom',
  'removeRoom'
]);

var fetchRoomsAction = Reflux.createAction({ asyncResult: true });
fetchRoomsAction.listen(function listener () {

  var rooms = [
    {
      title: 'Living room',
      devices: [
        {
          id: '0',
          title: 'yetu Home Gateway',
          type: 'Home Gateway',
          state: 'connected',
          description: 'test description'
        },
        {
          id: '1',
          title: 'Nest',
          type: 'Thermostat',
          state: 'not conn.',
          description: 'test description'
        }
      ]
    },
    {
      title: 'Bed room',
      devices: [
        {
          id: '2',
          title: 'Nest',
          type: 'Thermostat',
          state: 'connected',
          description: 'test description'
        }
      ]
    },
    {
      title: 'Bath room',
      devices: []
    }
  ];

  this.completed(rooms);
});


roomActions.fetchRooms = fetchRoomsAction;
module.exports = roomActions;
