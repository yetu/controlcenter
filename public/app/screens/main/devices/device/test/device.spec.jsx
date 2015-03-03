var Device = require('screens/main/devices/device/device.jsx');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils;

describe('Device', function () {
   describe('method', function () {
	   it('does something', function () {
           var deviceProps = {title: "manfred"};
		   var deviceElement = TestUtils.renderIntoDocument(
			   <Device device={deviceProps} />
		   );
		   expect(deviceElement.state).toEqual(null);
	   });
   });
});