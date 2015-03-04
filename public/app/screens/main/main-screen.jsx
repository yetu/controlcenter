var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Navigation = require('./navigation');
var navigationStore = require('stores/navigation');
var StyleMixin = require('mixins/style-mixin');

var style = require("./style.scss");

var MainScreen = React.createClass({
  mixins: [StyleMixin(require('./style.scss'))],

  getInitialState: function () {
    return {
      navItems: navigationStore.getItems()
    }
  },

  render: function () {
    var navigation = <Navigation items={this.state.navItems} orientation="medium-vertical small-horizontal"/>;

    return (
      <div className="main-screen">
        <div className="main-screen__top-row main-screen--visible-for-small-only">
          {navigation}
        </div>
        <div className="main-screen__content-row">
          <div className="main-screen__sidebar-column main-screen--hidden-for-small">
            {navigation}
          </div>
          <div className="main-screen__content-column">
            <RouteHandler/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = MainScreen;
