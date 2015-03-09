var React = require('react');
require('reflux');

// if style! is used here, it will attach the style to DOM automatically
require('style!./project-setup/all.scss');

require('./actions');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

var MainScreen = require('./screens/main');
var DevicesRegion = require('./screens/main/sections/devices');
var SettingsRegion = require('./screens/main/sections/settings');

var routes = (
  <Route path='/' handler={MainScreen}>
    <Route name='settings' handler={SettingsRegion}/>
    <Route name='devices' handler={DevicesRegion}/>
    <Redirect from='/' to='devices'/>
  </Route>
);

Router.run(routes, function runner (Handler, state) {
  React.render(<Handler params={state.params} />, document.body);
});
