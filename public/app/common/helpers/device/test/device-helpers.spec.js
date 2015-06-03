var DeviceHelpers = require('../');

describe('DeviceHelpers', function () {

  describe('.augmentDevice()', function () {
    it('flags nest webservice as hidden', function () {
      var nestWebservice = {
        properties: { name: 'nest account', displayType: 'nest' },
        actions: [],
        components: [ { properties: { type: 'nest', capabilities: [ { } ] } } ],
        links: [{ rel: ['self'] }]
      };
      var device = DeviceHelpers.augmentDevice(nestWebservice);
      expect(device.hidden).toBeTruthy();
    });
  });
});
