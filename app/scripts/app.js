'use strict';

angular.module('homepageApp', ['xml'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/access_token=:accesstoken&token_type=:tokentype&expires_in=:expiresin', {
        controller: "GoogleAccountCtrl",
        template: "<span>Adding account...</span>"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
