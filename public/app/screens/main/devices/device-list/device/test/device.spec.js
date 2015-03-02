var Device = require('../device.jsx');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils;

describe('Device', function () {
   describe('method', function () {
	   it('does something', function () {
		   var DeviceElement = TestUtils.renderIntoDocument(
			   <Device />
		   );
		   expect(DeviceElement.state).toEqual({a:5});
	   });
   });
});