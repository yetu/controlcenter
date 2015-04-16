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
    var backButton =
      <a href={window.yetu.config.homescreenURL}>
        <div className='main-screen__back'>&nbsp;</div>
      </a>;
    return (
      <div className='main-screen grid-22'>
        <div className='main-screen__top grid-14 visible-for-small-only'>
          <div className='row'>
            <div className='column small-1'>
              {backButton}
            </div>
            <div className='column small-13'>
              <h1>Control Center</h1>
            </div>
          </div>
          <div className='row'>
            <div className='column small-13 small-offset-1'>
              <Navigation {...this.props} items={this.state.navItems} orientation='horizontal'/>
            </div>
          </div>
        </div>
        <div className='main-screen__body'>
          <div className='main-screen__body-left hide-for-small-only'>
            <div className='row fixed-height-3 text-center'>
              <div className='columns'>
                {backButton}
                <h1>Control Center</h1>
              </div>
            </div>
            <div className='main-screen__nav'>
              <Navigation {...this.props} items={this.state.navItems} orientation='vertical'/>
            </div>
          </div>
          <div className='main-screen__body-content'>
            <RouteHandler {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MainScreen;
