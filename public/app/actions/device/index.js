var Reflux = require('reflux'),
  deviceDiscovery = require('./addDevice');

var deviceActions = Reflux.createActions({
  addDevice: {children: ['completed', 'failed']},
  removeDevice: {children: ['completed', 'failed']}
});

deviceActions.addDevice.listen(function listener () {
  var self = this;
  deviceDiscovery.startDiscovery()
    .subscribe(function onNext (next) {
      self.completed(next);
    }, function onError (error) {
      self.failed(error);
    });
});

deviceActions.removeDevice.listen(function listener () {
  deviceDiscovery.cancelDiscovery();
});

module.exports = deviceActions;
