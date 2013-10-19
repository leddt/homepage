'use strict';

angular.module('homepageApp')
  .directive('square', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        function makeSquare() {
          var w = element.width();
          var h = element.height();
          if (w != h) {
            element.height(w);
          }
        }

        $timeout(makeSquare);
        $(window).on("resize", makeSquare);
      }
    };
  });
