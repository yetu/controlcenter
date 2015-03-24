var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var $ = require('helpers/test');
var DeviceFinder = require('../device-finder.jsx');
var DeviceFinderDialog = require('../device-finder-dialog');
var Button = require('common/components/controls/button');

describe('DeviceFinder', function () {

  beforeEach(function () {
    jasmine.addMatchers($.jasmineMatchers);
  });

  fit('initially only shows a button', function () {
    var deviceFinder = TestUtils.renderIntoDocument(
      <DeviceFinder />
    );

    var button = $(deviceFinder).byType(Button);
    var dialog = $(deviceFinder).byType(DeviceFinderDialog);

    expect(button).toBeRendered();
    expect(dialog).not.toBeRendered();
  });

  it('hides the search button and shows the search dialog when the search button is clicked', function () {
    var deviceFinder = TestUtils.renderIntoDocument(
      <DeviceFinder />
    );

    $(deviceFinder).byType(Button).click();

    var button = $(deviceFinder).byType(Button);
    var dialog = $(deviceFinder).byType(DeviceFinderDialog);

    expect(button).not.toBeRendered();
    expect(dialog).toBeRendered();

  });
});
