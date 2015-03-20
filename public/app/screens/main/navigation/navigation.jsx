var React = require('react'),
  cx = require('react/lib/cx'),
  Router = require('react-router'),
  State = Router.State,
  Link = Router.Link,
  styleMixin = require('mixins/style-mixin');

var Navigation = React.createClass({
  mixins: [styleMixin(require('./style.scss')), State],
  render: function render () {
    var items = this.props.items.map(function mapper (item, i) {

      var classNames = cx({
        'cc_navigation__link': true,
        'item': true,
        // also mark link as active, if subpath of link is opened
        'active': this.getPath().indexOf('/' + item.linkTo) === 0
      });

      return (
        <Link to={item.linkTo} key={i} className={classNames}>
          <i className={'cc_navigation__linkImage' + ' show-for-landscape ' + 'icon-' + item.image}></i>
          <label className="cc_navigation__linkLabel">{item.title}</label>
        </Link>
      );

    }.bind(this));

    // Adjust the two-up class according to Foundation icon bar conventions (three-up, four-up, ...)
    return (
      <div className={'cc_navigation icon-bar two-up' + ' ' + this.props.orientation}>
        {items}
      </div>
    );
  }
});

module.exports = Navigation;
