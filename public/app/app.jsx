var React = require('react');
require('reflux');

// if style! is used here, it will attach the style to DOM automatically
require('style!./project-setup/global-theme.scss');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

var MainScreen = require('./screens/main');
var DeviceListSection = require('./screens/main/sections/devices');
var DeviceDetailsSection = require('./screens/main/sections/device-details');
var GatewayDetailsSection = require('./screens/main/sections/gateway-details');
var AddNestSection = require('./screens/main/sections/add-nest');
var SettingsRegion = require('./screens/main/sections/settings');


var routes = (
  <Route path='/' handler={MainScreen}>
    <Route name='settings' path='settings' handler={SettingsRegion}/>
    <Route name='devices' path='devices' handler={DeviceListSection}/>
    <Route name='gateway' path='devices/gateway' handler={GatewayDetailsSection}/>
    <Route name='device' path='devices/:deviceId' handler={DeviceDetailsSection}/>
    <Route name='add-nest' path='devices/add/nest/:state' handler={AddNestSection}/>
    <Redirect from='/' to='devices'/>
  </Route>
);

Router.run(routes, (Handler, state) =>
  React.render(<Handler {...state} />, document.body)
);
