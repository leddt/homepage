'use strict';

describe('Controller: GoogleaccountCtrl', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));

  var GoogleaccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoogleaccountCtrl = $controller('GoogleaccountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
