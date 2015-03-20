var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Reflux = require('reflux');

var Navigation = require('./navigation');
var navigationStore = require('stores/navigation');
var styleMixin = require('mixins/style-mixin');

var MainScreen = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.connect(navigationStore, 'navItems')
  ],

  render: function render () {
    return (
      <div className='main-screen'>
        <div className='main-screen__top visible-for-small-only'>
          <h1>Control Center</h1>
          <Navigation items={this.state.navItems} orientation='horizontal'/>
        </div>
        <div className='main-screen__body'>
          <div className='main-screen__body-left hide-for-small-only'>
            <header className='main-screen__header'>
              <h1>Control Center</h1>
            </header>
            <div className='main-screen__nav'>
              <Navigation items={this.state.navItems} orientation='vertical'/>
            </div>
          </div>
          <div className='main-screen__body-content'>
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MainScreen;
