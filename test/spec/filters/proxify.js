'use strict';

describe('Filter: proxify', function () {

  // load the filter's module
  beforeEach(module('homepageApp'));

  // initialize a new instance of the filter before each test
  var proxify;
  beforeEach(inject(function ($filter) {
    proxify = $filter('proxify');
  }));

  it('should return the input prefixed with "proxify filter:"', function () {
    var text = 'angularjs';
    expect(proxify(text)).toBe('proxify filter: ' + text);
  });

});
