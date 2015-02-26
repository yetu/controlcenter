'use strict';

var React = require('react');

var Navigation = React.createClass({
    getInitialState: function() {
        return {
            selectedIndex: 0
        }
    },

    handleItemClick: function(index) {
        this.setState({selectedIndex: index});
    },

    render: function() {
        return (
            <div>
                <ul className="side-nav">
                {this.props.items.map(function(item, i) {
                    return (
                        <li className={this.state.selectedIndex === i ? 'selected' : ''} key={i}>
                            <a href="#" onClick={this.handleItemClick.bind(this, i)}>{item.title}</a>
                        </li>
                    );
                }, this)}
                </ul>
            </div>
        );
    },

    componentDidMount: function() {
        this.handleItemClick(this.state.selectedIndex);
    },

    componentDidUpdate: function() {
        var item = this.props.items[this.state.selectedIndex];
        React.render(React.createElement(item.page, item.props), document.getElementById('page'));
    }
});

module.exports = Navigation;