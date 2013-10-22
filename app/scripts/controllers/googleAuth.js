'use strict';

angular.module('homepageApp')
  .controller('GoogleAuthCtrl', function ($routeParams, $location, Google) {

    Google.validateToken($routeParams.accesstoken)
      .then(function () {
        $location.path('/');
      });

  });
