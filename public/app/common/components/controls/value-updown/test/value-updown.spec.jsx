var ValueUpDown = require('../value-updown.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('ValueUpDown', function () {
  it('has a default initial state', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} />
    );
    expect(valueUpDown.state.value).toBeDefined();
    expect(valueUpDown.state.min).toBeDefined();
    expect(valueUpDown.state.max).toBeDefined();
    expect(valueUpDown.state.step).toBeDefined();
  });

  it('takes properties as its initial state', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={1} />
    );
    expect(valueUpDown.state.value).toEqual(10);
    expect(valueUpDown.state.min).toEqual(0);
    expect(valueUpDown.state.max).toEqual(20);
    expect(valueUpDown.state.step).toEqual(1);
  });

  it('increases value when up button is pressed', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.up);
    expect(valueUpDown.state.value).toEqual(11);
  });

  it('decreases value when down button is pressed', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.down);
    expect(valueUpDown.state.value).toEqual(9);
  });

  it('increases value using step size', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={3} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.up);
    expect(valueUpDown.state.value).toEqual(13);
  });

  it('decreases value using step size', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={3} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.down);
    expect(valueUpDown.state.value).toEqual(7);
  });

  it('does not increase value when max is already reached', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={20} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.up);
    expect(valueUpDown.state.value).toEqual(20);
  });

  it('does not decrease value when min is already reached', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={0} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.down);
    expect(valueUpDown.state.value).toEqual(0);
  });
});
