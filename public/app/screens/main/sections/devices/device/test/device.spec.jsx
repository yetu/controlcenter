var Device = require('../device.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Device', function () {
  describe('method', function () {
    // TODO: Currently failing because Decvice uses Link that doesn't have a context in the test environment
    xit('does something', function () {
      var deviceProps = { title: 'manfred' };
      var deviceElement = TestUtils.renderIntoDocument(
        <Device device={deviceProps} />
      );
      expect(deviceElement.state).toequal(null);
    });
  });
});
