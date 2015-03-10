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
var DeviceSection = require('./screens/main/sections/devices/device-detail');
var SettingsRegion = require('./screens/main/sections/settings');

var routes = (
  <Route path='/' handler={MainScreen}>
    <Route name='settings' path='settings' handler={SettingsRegion}/>
    <Route name='devices' path='devices' handler={DevicesRegion}/>
    <Route name='device' path='devices/:deviceId' handler={DeviceSection}/>
    <Redirect from='/' to='devices'/>
  </Route>
);

Router.run(routes, function runner (Handler, state) {
  React.render(<Handler params={state.params} />, document.body);
});
