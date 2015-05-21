var React = require('react');
var styleMixin = require('mixins/style-mixin');
var Button = require('common/components/controls/button');

var DiscoveryModePrompt = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  render: function render () {
    return (
      <div className='discovery-mode-prompt'>
        <div className='row fixed-height-1'>
          <div className='column small-8'>
            <span>Select device discovery mode</span>
          </div>
        </div>
        <div className='row fixed-height-4'>
          { this.button('flashlight', 'Scan for devices in your network') }
          { this.button('nest', 'Manually add device/service') }
        </div>
      </div>
    );
  },

  button: function button (image, text, onClick) {
    return (
      <div className='column small-4 end text-center'>
        <Button className='discovery-mode-prompt__button' onClick={onClick}>
          <div className={'discovery-mode-prompt__' + image} />
          { text }
        </Button>
      </div>
    );
  }
});

module.exports = DiscoveryModePrompt;
