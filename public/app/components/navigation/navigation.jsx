'use strict';

var React = require('react');

var Navigation = React.createClass({
    getInitialState: function() {
        return {
            selectedIndex: this.props.selectedIndex
        }
    },

    handleItemClick: function(index) {
        if (this.state.selectedIndex !== index) {
            this.setState({selectedIndex: index});
            this.props.onItemSelected(index);
        }
    },

    render: function() {
        var items = this.props.items.map(function(item, i) {
            return (
                <li className={this.state.selectedIndex === i ? 'selected' : ''} key={i}>
                    <a href="#" onClick={this.handleItemClick.bind(this, i)}>{item.title}</a>
                </li>
            );
        }, this);
        
        return (
            <div>
                <ul className="side-nav">
                    {items}
                </ul>
            </div>
        );
    }
});

module.exports = Navigation;