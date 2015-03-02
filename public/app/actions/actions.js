'use strict';
var Reflux = require('reflux');

var actions = Reflux.createActions([
	// user actions
	'addDevice',
	'removeDevice',
	//room actions
	'addRoom',
	'removeRoom',
	//settings actions
	'changePassword'
]);

module.exports = actions;