var React = require( 'react' ),
  cx = require( 'react/lib/cx' ),
  Router = require( 'react-router' ),
  State = Router.State,
  Link = Router.Link,
  styleMixin = require( 'mixins/style-mixin' );

var Navigation = React.createClass( {
  mixins: [styleMixin( require( './style.scss' ) ), State],
  render: function render () {
    // TODO: Use mixins instead of CSS classes
    // TODO: Pass number of elements to mixin instead of specifying class name
    var classes = 'cc_navigation icon-bar two-up ' + this.props.orientation;

    var items = this.props.items.map( function mapper ( item, i ) {
      var classNames = cx( {
        'cc_navigation__link': true,
        'item': true,
        // also mark link as active, if subpath of link is opened
        'active': this.getPath().indexOf( '/' + item.linkTo ) === 0
      } );
      return (
        <Link to={item.linkTo} key={i} className={classNames}>
          <label>{item.title}</label>
        </Link>
      );
    }.bind( this ) );

    return (
      <div className={classes}>
        {items}
      </div>
    );
  }
} );

module.exports = Navigation;
