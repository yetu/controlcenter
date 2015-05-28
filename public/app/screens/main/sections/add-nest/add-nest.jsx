var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var styleMixin = require('mixins/style-mixin');

var AddNest = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  getInitialState: function getInitialState () {
    return {
      devicesButtonVisible: false
    };
  },

  render: function render () {
    return (
      <div className='grid-14 padded'>
        <div className='row fixed-height-3'>
          <div className='column'>
            <h3 className='align-text-top'>Connect nest account</h3>
          </div>
        </div>
        <div className='row fixed-height-1'>
          <div className='column'>
            <RouteHandler onComplete={this.onComplete}/>
          </div>
        </div>
        <div className='row fixed-height-1'>
          <div className='column'>
            { this.state.devicesButtonVisible && <Link to='devices'>Show devices</Link> }
          </div>
        </div>
      </div>
    );
  },

  onComplete: function onComplete () {
    if (!this.state.devicesButtonVisible) {
      this.setState({ devicesButtonVisible: true });
    }
  }
});

module.exports = AddNest;
