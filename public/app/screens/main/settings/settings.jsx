'use strict';

var React = require('react');

var SettingsPage = React.createClass({
  render: function () {
    return (
      <div>
        <h2>My settings</h2>
        <div className="row">
          <div className="small-3 column">First name</div>
          <div className="small-5 column end">
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="small-3 column">Last name</div>
          <div className="small-5 column end">
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="small-3 column">Password</div>
          <div className="small-5 column">
            <input type="password" />
          </div>
          <div className="small-3 column end">Edit</div>
        </div>
        <div className="row">
          <div className="small-3 column">Email address</div>
          <div className="small-5 column end">
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="small-3 column">Registration date</div>
          <div className="small-5 column end">15.09.2014</div>
        </div>
        <div className="row">
          <div className="small-3 column">Image</div>
          <div className="small-5 column end">Image</div>
        </div>
        <a className="button" href="#">Save changes</a>
      </div>
    );
  }
});

module.exports = SettingsPage;