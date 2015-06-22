var ValueUpDown = require('../value-updown.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('ValueUpDown', function () {
  it('has a default initial state', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} />
    );
    valueUpDown.state.should.have.property('value');
    valueUpDown.state.should.have.property('min');
    valueUpDown.state.should.have.property('max');
    valueUpDown.state.should.have.property('step');
  });

  it('takes properties as its initial state', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={1} />
    );
    valueUpDown.state.value.should.equal(10);
    valueUpDown.state.min.should.equal(0);
    valueUpDown.state.max.should.equal(20);
    valueUpDown.state.step.should.equal(1);
  });

  it('increases value when up button is pressed', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.up);
    valueUpDown.state.value.should.equal(11);
  });

  it('decreases value when down button is pressed', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.down);
    valueUpDown.state.value.should.equal(9);
  });

  it('increases value using step size', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={3} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.up);
    valueUpDown.state.value.should.equal(13);
  });

  it('decreases value using step size', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={10} min={0} max={20} step={3} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.down);
    valueUpDown.state.value.should.equal(7);
  });

  it('does not increase value when max is already reached', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={20} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.up);
    valueUpDown.state.value.should.equal(20);
  });

  it('does not decrease value when min is already reached', function () {
    var valueUpDown = TestUtils.renderIntoDocument(
      <ValueUpDown device={{}} value={0} min={0} max={20} step={1} />
    );
    TestUtils.Simulate.click(valueUpDown.refs.down);
    valueUpDown.state.value.should.equal(0);
  });
});
