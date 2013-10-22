'use strict';

angular.module('homepageApp')
  .controller('BasecampAuthCtrl', function ($routeParams, $location, Basecamp)  {
    
    Basecamp.validateToken($routeParams.accesstoken, $routeParams.refreshtoken)
      .then(function () {
        $location.path('/');
      });

  });
