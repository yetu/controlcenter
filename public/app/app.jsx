/*
var testpage=require('./testpage.jade')();
var css=require('style!./test.scss');
document.write(testpage);
*/

var React = require('react');
var ControlCenter = require('./components/controlcenter/controlCenter.jsx');

React.render(<ControlCenter />, document.body);
