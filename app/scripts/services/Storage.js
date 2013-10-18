'use strict';

angular.module('homepageApp')
  .service('Storage', function Storage() {
    this.get = function(key) {
      var val = localStorage[key];
      if (val) return JSON.parse(val);
    }
    this.set = function(key, val) {
      if (val) localStorage[key] = JSON.stringify(val);
      else localStorage[key] = null;
    }
  });
