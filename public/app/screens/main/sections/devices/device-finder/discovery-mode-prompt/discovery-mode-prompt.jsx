var React = require('react');
var styleMixin = require('mixins/style-mixin');
var Button = require('common/components/controls/button');

var DiscoveryModePrompt = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    return (
      <div className='discovery-mode-prompt row'>
        <div className='row fixed-height-1'>
          <div className='column small-5 discovery-mode-prompt-caption'>
            <span className='discovery-mode-prompt__caption'>Select device discovery mode</span>
          </div>
        </div>
        <div className='row fixed-height-4'>
          {
            this.props.buttons.map(function mapButtonToComponent (button) {
              return this.button(button.image, button.text, button.onClick);
            }.bind(this))
          }
        </div>
      </div>
    );
  },

  button: function button (image, text, onClick) {
    return (
      <div className='discovery-mode-prompt__button-wrapper column small-4 end text-center'>
        <Button className='discovery-mode-prompt__button' onClick={onClick}>
          <div className={'discovery-mode-prompt__button-image ' + image} />
          <span className='discovery-mode-prompt__button-text'>{ text }</span>
        </Button>
      </div>
    );
  }
});

module.exports = DiscoveryModePrompt;
