var React = require('react');
var styleMixin = require('mixins/style-mixin');
var Button = require('common/components/controls/button');

var UserAvatar = React.createClass({
  mixins: [
    styleMixin(require('./style.scss'))
  ],
  render: function render () {
    return (
      <div className='cc-user-avatar grid-14'>
        <div className='row fixed-height-2'>
          <div className='cc-user-avatar__image-content columns small-7 text-center'>
            <img className='cc-user-avatar__image' src='http://placehold.it/80x80'/>
          </div>
          <div className='cc-user-avatar__button-content columns small-7'>
            <div className='cc-user-avatar__button-container'>
              <Button size='tiny'>Change picture</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = UserAvatar;
