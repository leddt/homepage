'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope) {
    $scope.calendar = {
      config: {
        
      },
      events: [
        "https://www.google.com/calendar/feeds/thibault.david%40gmail.com/public/basic"
        //"https://www.google.com/calendar/feeds/thibault.david%40gmail.com/private-793258c7e9f2f65a5bf33a76ead11cbb/basic"
      ]
    }
  });
