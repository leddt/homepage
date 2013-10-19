'use strict';

angular.module('homepageApp')
  .directive('gcal', function () {
    return {
      template: '<iframe square src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTz=0&amp;showCalendars=0&amp;bgcolor=%23fafafa&amp;wkst=1&amp;{{calendarParameters}}ctz=America%2FNew_York" style=" border-width:0 " width="{{width}}" height="{{height}}" frameborder="0" scrolling="no"></iframe>',
      restrict: 'E',
      scope: {
        calendars: '=',
        width: '@', 
        height: '@'
      },
      link: function postLink(scope, element, attrs) {
        var params = '';
        for (var i = 0; i < scope.calendars.length; i++) {
          var c = scope.calendars[i];
          params += 'src=' + encodeURIComponent(c.src) + '&color=' + encodeURIComponent(c.color) + '&';
        }

        scope.calendarParameters = params;
      }
    };
  });
