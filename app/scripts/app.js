'use strict';

angular.module('homepageApp', ['xml'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      // I don't like these routes, but I can't figure out a proper way to do this right now.
      .when('/state=google&access_token=:accesstoken&token_type=:tokentype&expires_in=:expiresin', {
        template: '<span>Adding account...</span>',
        controller: 'GoogleAuthCtrl'
      })
      .when('/access_token=:accesstoken&expires_in=:expiresin&refresh_token=:refreshtoken&state=basecamp', {
        template: '<span>Adding account...</span>',
        controller: 'BasecampAuthCtrl'
      })

      /*.otherwise({
        redirectTo: '/'
      })*/;
  });