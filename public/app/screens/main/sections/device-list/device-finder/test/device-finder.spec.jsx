var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var VDOM = require('helpers/test');
var DeviceFinder = require('../device-finder.jsx');
var DeviceFinderDialog = require('../device-finder-dialog');
var Button = require('common/components/controls/button');

describe('DeviceFinder', function () {
  it('initially only shows a button', function () {
    var deviceFinder = TestUtils.renderIntoDocument(
      <DeviceFinder />
    );

    expect(VDOM.isRendered(deviceFinder, Button)).toBe(true);
    expect(VDOM.isRendered(deviceFinder, DeviceFinderDialog)).toBe(false);
  });

  it('hides the search button and shows the search dialog when the search button is clicked', function () {
    var deviceFinder = TestUtils.renderIntoDocument(
      <DeviceFinder />
    );

    VDOM.click(VDOM.byType(deviceFinder, Button)[0]);

    expect(VDOM.isRendered(deviceFinder, Button)).toBe(false);
    expect(VDOM.isRendered(deviceFinder, DeviceFinderDialog)).toBe(true);

  });
});
