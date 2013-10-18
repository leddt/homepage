'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $http, $location, xmlFilter, Storage) {
    $scope.calendars = [
      {src:'thibault.david@gmail.com', color: '#2952A3'},
      {src:'2g5hhq1d0nk373earfrnlb37k8@group.calendar.google.com', color: '#B1365F'},
      {src:'david.thibault@sigmund.ca', color: '#8C500B'}
    ];




    var accounts = Storage.get("google_accounts") || {};
    for (var account in accounts) {
      $http.get("/proxy.js?url=" + encodeURIComponent("https://mail.google.com/mail/feed/atom"), {
        headers: {
          "Authorization": "Bearer " + accounts[account].access_token
        }
      }).then(function(response) {
        var feed = xmlFilter(response.data);
        console.log(feed.find("fullcount").text());
      });
    }

    $scope.addGoogleAccount = function() {
      var url = "https://accounts.google.com/o/oauth2/auth";
      url += "?response_type=token";
      url += "&client_id=165163675817.apps.googleusercontent.com";
      url += "&redirect_uri=http://" + encodeURIComponent($location.host()) + "/";
      url += "&scope=" + encodeURIComponent("https://mail.google.com/ https://www.googleapis.com/auth/userinfo.profile");
      url += "&approval_prompt=force";

      window.location.href = url;
    };
    $scope.resetGoogleAccounts = function() {
      Storage.set("google_accounts", {});
    }
  });
