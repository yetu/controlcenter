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
        <div className='main-screen__top-row -visible-for-small-only'>
          {navigation}
        </div>
        <div className='main-screen__content-row'>
          <div className='main-screen__sidebar-column -hidden-for-small'>
            {navigation}
          </div>
          <div className='main-screen__content-column'>
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MainScreen;
