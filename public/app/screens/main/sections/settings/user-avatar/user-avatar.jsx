var React = require('react');
var styleMixin = require('mixins/style-mixin');
var Button = require('common/components/controls/button');

var UserAvatar = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],
  render: function render () {
    return (
      <div className='cc-user-avatar'>
        <div className='cc-user-avatar__image-content'>
          <img className='cc-user-avatar__image' src='http://placehold.it/80x80'/>
        </div>
        <div className='cc-user-avatar__button-content'>
          <Button size='tiny'>Change picture</Button>
        </div>
      </div>
    );
  }
});


module.exports = UserAvatar;
