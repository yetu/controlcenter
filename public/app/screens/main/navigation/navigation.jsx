var React = require('react'),
  cx = require('classname'),
  Router = require('react-router'),
  Link = Router.Link,
  styleMixin = require('mixins/style-mixin');

var Navigation = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],
  render: function render () {
    var items = this.props.items.map(function mapper (item, i) {

      var classNames = cx({
        'cc_navigation__link': true,
        'item': true,
        // also mark link as active, if subpath of link is opened
        'active': this.props.path.indexOf('/' + item.linkTo) === 0
      });


      var icon = this.props.orientation === 'vertical' ?
        <i className={'cc_navigation__linkImage ' + 'icon-' + item.image}></i> :
        null;

      return (
        <Link to={item.linkTo} key={i} className={classNames}>
          {icon}
          <label className='cc_navigation__linkLabel'>{item.title}</label>
        </Link>
      );

    }.bind(this));

    // TODO: Adjust the two-up class according to Foundation icon bar conventions (three-up, four-up, ...)
    return (
      // Adjust the two-up class according to Foundation icon bar conventions (three-up, four-up, ...)
      <div className={'cc_navigation icon-bar two-up' + ' ' + this.props.orientation}>
        {items}
      </div>
    );
  }
});

module.exports = Navigation;
