'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope) {
    $scope.calendars = [
      {src:'thibault.david@gmail.com', color: '#2952A3'},
      {src:'2g5hhq1d0nk373earfrnlb37k8@group.calendar.google.com', color: '#B1365F'},
      {src:'david.thibault@sigmund.ca', color: '#8C500B'}
    ];
  });
