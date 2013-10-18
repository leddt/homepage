'use strict';

describe('Service: gmail', function () {

  // load the service's module
  beforeEach(module('homepageApp'));

  // instantiate service
  var gmail;
  beforeEach(inject(function (_gmail_) {
    gmail = _gmail_;
  }));

  it('should do something', function () {
    expect(!!gmail).toBe(true);
  });

});
