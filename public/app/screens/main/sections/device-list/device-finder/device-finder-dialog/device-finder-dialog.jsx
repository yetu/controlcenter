var React = require('react');
var styleMixin = require('mixins/style-mixin');

var DeviceFinderDialog = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    var closeButton = this.props.closeAction
      ? <a className='cc-device-finder-dialog__close-button' href='#' onClick={this.props.closeAction}></a>
      : null;

    return (
      <div className='cc-device-finder-dialog'>
        <div className={'cc-device-finder-dialog__status ' + (this.props.showSeparator
            ? 'cc-device-finder-dialog__status-separator'
            : '')}>
          <div className='cc-device-finder-dialog__status-content'>
            {this.props.status}
          </div>
        </div>
        <div className='cc-device-finder-dialog__text'>
          <div>
            <h3>{this.props.title}</h3>
            <div className='cc-device-finder-dialog__text-description'>{this.props.description}</div>
          </div>
        </div>
        <div className='cc-device-finder-dialog__action'>
          <a className='cc-device-finder-dialog__action-button' href='#' onClick={this.props.action}>
            {this.props.actionText}
          </a>
        </div>
        {closeButton}
      </div>
    );
  }
});

module.exports = DeviceFinderDialog;
