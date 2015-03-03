'use strict';

var React = require('react');
var Reflux = require("reflux");

var appStyle = require('./project-setup/all.scss');

var actions = require("./actions");

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var Link = Router.Link;

var MainScreen = require('./screens/main').MainScreen;
var DevicesRegion = require('./screens/main').DevicesRegion;
var SettingsRegion = require('./screens/main').SettingsRegion;

var ControlCenter = React.createClass({
    render: function () {
        return (
            <RouteHandler/>
        )
    }
});

var routes = (
    <Route path="/" handler={ControlCenter}>
        <Route name="main" handler={MainScreen}>
            <Route name="settings" handler={SettingsRegion}/>
            <Route name="devices" handler={DevicesRegion}/>
            <Redirect from="/" to="devices"/>
        </Route>
        <Redirect from="/" to="main"/>
    </Route>
);

Router.run(routes, function (Handler, state) {
    React.render(<Handler params={state.params} />, document.body);
});
