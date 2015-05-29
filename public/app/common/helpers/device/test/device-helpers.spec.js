var DeviceHelpers = require('../');

describe('DeviceHelpers', function () {

  describe('.augmentDevice()', function () {
    it('flags nest webservice as hidden', function () {
      var nestWebservice = {
        properties: { name: 'WEBSERVICE oauth', displayType: 'nest' },
        actions: [],
        components: [ { properties: { type: 'nest', capabilities: [ { } ] } } ]
      };
      var device = DeviceHelpers.augmentDevice(nestWebservice);
      expect(device.hidden).toBeTruthy();
    });
  });
});
