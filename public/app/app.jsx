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
var SendNestAccessToken = require('./screens/main/sections/devices/nest/send-nest-access-token');
var NestFailure = require('./screens/main/sections/devices/nest/nest-failure');
var SettingsRegion = require('./screens/main/sections/settings');

var routes = (
  <Route path='/' handler={MainScreen}>
    <Route name='settings' path='settings' handler={SettingsRegion}/>
    <Route name='devices' path='devices' handler={DeviceListSection}>
      <Route name='add-nest-success' path='add/nest/success/:accessToken' handler={SendNestAccessToken}/>
      <Route name='add-nest-failure' path='add/nest/failure/:error' handler={NestFailure}/>
    </Route>
    <Route name='gateway' path='devices/gateway' handler={GatewayDetailsSection}/>
    <Route name='device' path='devices/:deviceId' handler={DeviceDetailsSection}/>
    <Redirect from='/' to='devices'/>
  </Route>
);

Router.run(routes, (Handler, state) =>
  React.render(<Handler {...state} />, document.body)
);
