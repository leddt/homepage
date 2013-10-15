'use strict';

angular.module('homepageApp')
  .directive('feed', function (FeedService, $timeout) {
    return {
      templateUrl: '/views/directives/feed.html',
      restrict: 'E',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var count = parseInt(attrs.count || "10");
        var timeout;
        
        scope.refresh = function() {
          if (timeout) {
            $timeout.cancel(timeout);
          }

          FeedService.parseFeed(attrs.url).then(function(response) {
            var feed = response.data.responseData.feed;

            scope.lastRefresh = new Date();
            scope.title = feed.title;
            scope.link = feed.link;
            scope.items = _.chain(feed.entries)
              .take(count)
              .map(function (entry) {
                return {
                  title: entry.title,
                  link: entry.link,
                  content: (attrs.display == "snippet" ? entry.contentSnippet : entry.content),
                  tags: entry.categories,
                  date: entry.publishedDate ? new Date(entry.publishedDate) : null
                };
              })
              .value();
             
            timeout = $timeout(scope.refresh, 5 * 60 * 1000); // refresh every 5 minutes
          });
        }

        scope.refresh();
      }
    };
  });
