'use strict';

angular.module('homepageApp')
  .controller('GoogleAccountCtrl', function ($routeParams, $location, Google) {

    Google.validateToken($routeParams.accesstoken)
      .then(function () {
        $location.path('/');
      });
  });
