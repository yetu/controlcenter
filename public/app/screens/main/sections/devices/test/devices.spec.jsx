var Devices = require('../devices.jsx');
var React = require('react/addons');

var TestUtils = React.addons.TestUtils;

var $ = require('helpers/test');

var ErrorMessage = require('common/components/error-message');
var Room = require('../room');

describe('DevicesSection', function () {

  beforeEach(function () {
    jasmine.addMatchers($.jasmineMatchers);
  });

  xit('displays only an error message when gateway store fails', function () {
    var devices = TestUtils.renderIntoDocument(<Devices />);
    var errorMessage = $(devices).byType(ErrorMessage);
    var room = $(devices).byType(Room);
    expect(errorMessage).toBeRendered();
    expect(room).toBeRendered();
  });
});
