var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DeviceFinder = require('../device-finder.jsx');
var DeviceFinderDialog = require('../device-finder-dialog');

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

function getSearchButton (deviceFinder) {
  var buttons = TestUtils.scryRenderedDOMComponentsWithClass(deviceFinder, 'cc-device-finder__button');
  if (buttons.length > 1) {
    throw new Error('There should not be more than one button');
  }
  return buttons.length > 0 ? buttons[0] : null;
}

function getDialog (deviceFinder) {
  var dialogs = TestUtils.scryRenderedComponentsWithType(deviceFinder, DeviceFinderDialog);
  if (dialogs.length > 1) {
    throw new Error('There should not be more than one dialog');
  }
  return dialogs.length > 0 ? dialogs[0] : null;
}
