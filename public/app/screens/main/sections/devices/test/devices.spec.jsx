var Devices = require('../devices.jsx');
var React = require('react/addons');

var stubRouterContext = require('helpers/router-stub');
var WrappedDevices = stubRouterContext(Devices);


var $ = require('helpers/test');

var ErrorMessage = require('common/components/error-message');
var Room = require('../room');

describe('DevicesSection', function () {

  beforeEach(function () {
    jasmine.addMatchers($.jasmineMatchers);
  });

  xit('displays only an error message when gateway store fails', function () {
    var devices = React.render(<WrappedDevices />, document.createElement('div'));
    var errorMessage = $(devices).byType(ErrorMessage);

    var room = $(devices).byType(Room);
    expect(errorMessage).not.toBeRendered();
    expect(room).toBeRendered();
  });
});
