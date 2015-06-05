var React = require('react');

var styleMixin = require('mixins/style-mixin');

var Button = require('common/components/controls/button');

var TITLE = 0,
    ONCLICK = 1;

var Dialog = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],

  render: function render () {

    return (
      <div className='cc-dialog grid-14 padded'>
        <div className='row fixed-height-1'>
          <div className='column'><h3>{this.props.title}</h3></div>
        </div>
        <div>
          {this.props.children}
        </div>
        <div className='row fixed-height-3 vertical-align-center'>
          {this.props.buttons.map((button, index) => {
            return (
              <div className={'column small-3 ' + (index === this.props.buttons.length - 1 ? 'end' : '')}>
                <Button onClick={button[ONCLICK]} key={index}>{button[TITLE]}</Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = Dialog;
