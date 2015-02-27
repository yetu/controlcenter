'use strict';

var React = require('react');
var DevicesPage = require('../devices/devicespage/devicesPage.jsx');
var SettingsPage = require('../settings/settingspage/settingsPage.jsx');
var Navigation = require('../navigation/navigation.jsx');

var ControlCenter = React.createClass({
    getInitialState: function() {
        var deviceRooms = [
            {title: 'Home', devices: [
                {title: 'yetu Home Gateway', type: 'Home Gateway', connected: true},
                {title: 'Nest', type: 'Thermostat', connected: true}
            ]},
            {title: 'Living room', devices: [
                {title: 'Nest', type: 'Thermostat', connected: false}
            ]},
            {title: 'Bed room', devices: []}
        ];

        var addRoom = function() {
            deviceRooms.push({title: 'New room', devices: []});
            // TODO: This doesn't integrate well with the component lifecycle. shouldn't we call #setProps instead?
            // TODO: Use Flux pattern
            this.forceUpdate();
        };

        var navigationItems = [
            {title: 'My devices', page: DevicesPage, props: {rooms: deviceRooms, addRoom: addRoom}},
            {title: 'My settings', page: SettingsPage}
        ];
        
        return {
            navigationItems: navigationItems,
            selectedNavigationItem: 0
        }
    },
    
    onItemSelected: function(index) {
        this.setState({selectedNavigationItem: index});
    },

    render: function() {
        var navigationItem = this.state.navigationItems[this.state.selectedNavigationItem];
        var page = React.createElement(navigationItem.page, navigationItem.props);
            
        return (
            <span>
                <div className="row">
                    <div className="small-4 column">
                        <h1>Control Center</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="small-4 column">
                        <Navigation items={this.state.navigationItems} selectedIndex={0} onItemSelected={this.onItemSelected} className="hide-for-small" />
                    </div>
                    <div className="small-8 column">
                        {page}
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ControlCenter;
