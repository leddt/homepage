'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $http, xmlFilter, Storage, Google, Gmail, Basecamp) {
    $scope.calendars = [
      {src:'thibault.david@gmail.com', color: '#2952A3'},
      {src:'2g5hhq1d0nk373earfrnlb37k8@group.calendar.google.com', color: '#B1365F'},
      {src:'david.thibault@sigmund.ca', color: '#8C500B'}
    ];

    $scope.addGoogleAccount = Google.newAccount;
    $scope.resetGoogleAccounts = function() {
      Storage.set("google_accounts", {});
    }

    $scope.addBasecampAccount = Basecamp.newAccount;

    $scope.inboxes = [];

    var accounts = Google.getAccounts();
    for (var id in accounts) {
      var a = accounts[id];

      if (new Date() > new Date(a.expires)) {
        Google.refreshAccount(a);
      } else {
        Gmail.getUnreadInboxDetails(a)
          .then(function(details) {
            $scope.inboxes.push(details);
          });
      }
    }

    $scope.todoaccounts = [];
    var bc_accounts = Basecamp.getAccounts();
    for (var id in bc_accounts) {
      // todo: refresh expired accounts

      Basecamp.getTodos(bc_accounts[id])
        .then(function (todos) {
          $scope.todoaccounts.push(todos);
        });
    }
  });
