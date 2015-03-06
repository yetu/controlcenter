var React = require('react');
var styleMixin = require('mixins/style-mixin');

var DeviceFinderDialog = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    return (
      <div className="cc-device-finder-dialog">
        <div className="cc-device-finder-dialog__status">
          <div>
            {this.props.status}
          </div>
        </div>
        <div className="cc-device-finder-dialog__text">
          <div>
            <div className="cc-device-finder-dialog__text-title">{this.props.title}</div>
            <div className="cc-device-finder-dialog__text-description">{this.props.description}</div>
          </div>
        </div>
        <div className="cc-device-finder-dialog__action">
          <a className="cc-device-finder-dialog__action-button" href="#" onClick={this.props.action}>{this.props.actionText}</a>
        </div>
      </div>
    );
  }
});

module.exports = DeviceFinderDialog;
