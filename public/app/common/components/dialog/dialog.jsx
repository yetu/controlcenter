var React = require('react');

var styleMixin = require('mixins/style-mixin');

var Button = require('common/components/controls/button')

var TITLE = 0,
    ONCLICK = 1;

var Dialog = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  render: function render () {

    return (
      <div className='cc-dialog'>
        <header className='cc-dialog__header text-center'>{this.props.title}</header>
        <div className='cc-dialog__content'>
          {this.props.children}
        </div>
        <div className='cc-dialog__buttons text-center'>
          {this.props.buttons.map((button, index) => {
            return (<Button onClick={button[ONCLICK]} key={index}>{button[TITLE]}</Button>);
          })}
        </div>
      </div>
    );
  }
});

module.exports = Dialog;
