'use strict';

var React = require('react');

var Device = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="small-4 column">
                    {this.props.device.title}
                </div>
                <div className="small-4 column">
                    {this.props.device.type}
                </div>
                <div className="small-2 column">
                    Controller
                </div>
                <div className="small-2 column">
                    {this.props.device.connected ? 'connected' : 'not conn.'}
                </div>
            </div>
        );
    }
});

module.exports = Device;