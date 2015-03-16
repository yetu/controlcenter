var React = require('react');
require('reflux');

// if style! is used here, it will attach the style to DOM automatically
require('style!./project-setup/all.scss');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

var MainScreen = require('./screens/main');
var DeviceListSection = require('./screens/main/sections/device-list');
var DeviceDetailsSection = require('./screens/main/sections/device-details');
var SettingsRegion = require('./screens/main/sections/settings');

var routes = (
  <Route path='/' handler={MainScreen}>
    <Route name='settings' path='settings' handler={SettingsRegion}/>
    <Route name='devices' path='devices' handler={DeviceListSection}/>
    <Route name='device' path='devices/:deviceId' handler={DeviceDetailsSection}/>
    <Redirect from='/' to='devices'/>
  </Route>
);

Router.run(routes, function runner (Handler, state) {
  React.render(<Handler params={state.params} />, document.body);
});
