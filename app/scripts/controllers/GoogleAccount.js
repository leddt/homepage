'use strict';

angular.module('homepageApp')
  .controller('GoogleAccountCtrl', function ($http, $routeParams, $location, Storage) {
    $http.jsonp("https://www.googleapis.com/oauth2/v1/tokeninfo?callback=JSON_CALLBACK&access_token=" + $routeParams.accesstoken)
      .success(function(data) {
        if (data.audience == "165163675817.apps.googleusercontent.com") {
          var accounts = Storage.get("google_accounts") || {};

          accounts[data.user_id] = {
            access_token: $routeParams.accesstoken
          };

          Storage.set("google_accounts", accounts);
        }
        
        $location.path('/');
      });
  });
