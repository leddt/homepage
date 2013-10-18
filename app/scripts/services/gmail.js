'use strict';

angular.module('homepageApp')
  .service('Gmail', function Gmail($http, Google, proxifyFilter, xmlFilter) {

    function getUnreadInboxDetails(account) {
      return $http.get(proxifyFilter("https://mail.google.com/mail/feed/atom"), {
        headers: {
          "Authorization": "Bearer " + account.access_token
        }
      }).then(function(response) {
        var feed = xmlFilter(response.data);

        return {
          email: account.email,
          unreadCount: parseInt(feed.find("fullcount").text())
        }
      })
    }

    // api
    this.getUnreadInboxDetails = getUnreadInboxDetails;
  });
