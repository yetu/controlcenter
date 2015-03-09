var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ReactTestUtils = require('test/ReactTestUtils.js');
var DeviceFinder = require('../device-finder.jsx');
var DeviceFinderDialog = require('../device-finder-dialog');

var getSearchButton;
var getDialog;

describe('DeviceFinder', function () {
  it('initially only shows a button', function () {
    var deviceFinder = TestUtils.renderIntoDocument(
      <DeviceFinder />
    );

    expect(getSearchButton(deviceFinder)).not.toBe(null);
    expect(getDialog(deviceFinder)).toBe(null);
  });

  it('hides the search button and shows the search dialog when the search button is clicked', function () {
    var deviceFinder = TestUtils.renderIntoDocument(
      <DeviceFinder />
    );

    TestUtils.SimulateNative.click(getSearchButton(deviceFinder));

    expect(getSearchButton(deviceFinder)).toBe(null);
    expect(getDialog(deviceFinder)).not.toBe(null);

  });
});

getSearchButton = function (deviceFinder) {
  return ReactTestUtils.getComponentWithClass(deviceFinder, 'cc-device-finder__button');
};

getDialog = function (deviceFinder) {
  return ReactTestUtils.getComponentWithType(deviceFinder, DeviceFinderDialog);
};
