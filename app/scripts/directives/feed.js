'use strict';

angular.module('homepageApp')
  .directive('feed', function (FeedService) {
    return {
      templateUrl: '/views/directives/feed.html',
      restrict: 'E',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var count = parseInt(attrs.count || "10");
        
        FeedService.parseFeed(attrs.url).then(function(response) {
          var feed = response.data.responseData.feed;

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
           
        });
      }
    };
  });
