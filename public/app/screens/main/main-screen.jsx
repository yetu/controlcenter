var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Navigation = require('./navigation');
var navigationStore = require('stores/navigation');
var styleMixin = require('mixins/style-mixin');

var MainScreen = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  getInitialState: function getInitialState () {
    return {
      navItems: navigationStore.getItems()
    };
  },

  render: function render () {
    var navigation = <Navigation
      items={this.state.navItems}
      orientation='medium-vertical small-horizontal'/>;

    return (
      <div className='main-screen'>
        <div className='main-screen__top-navigation'>
          {navigation}
        </div>
        <div className='main-screen__body'>
          <div className='main-screen__body-side-navigation'>
            {navigation}
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
