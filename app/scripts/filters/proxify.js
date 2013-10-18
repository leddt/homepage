'use strict';

angular.module('homepageApp')
  .filter('proxify', function () {
    return function (input) {
      return "/proxy.js?url=" + encodeURIComponent(input);
    };
  });
