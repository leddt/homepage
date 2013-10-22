'use strict';

angular.module('homepageApp')
  .service('Basecamp', function Basecamp($location, $http, proxifyFilter, Storage) {
    
    var client_id = 'db749a654d9ee6c3db1e7b1fc0235d5ef5f20c29';

    function bcall(path, token) {
      return $http.get(proxifyFilter('https://launchpad.37signals.com/' + path + '?access_token=' + token));
    }

    function newAccount() {
      var url = "https://launchpad.37signals.com/authorization/new";
      url += "?client_id=" + client_id;
      url += "&redirect_uri=" + encodeURIComponent($location.absUrl().replace(/#.*/, ''));
      url += "&type=user_agent"
      url += "&state=basecamp";

      window.location.href = url;
    }

    function validateToken(accessToken, refreshToken) {
      return bcall("authorization.json", accessToken)
        .then(function (response) {
          console.log(response.data);

          var accounts = Storage.get("basecamp_accounts") || {};

          for (var i = 0; i < response.data.accounts.length; i++) {
            var account = response.data.accounts[i];
            if (account.product != "basecamp") continue;

            account.access_token = accessToken;
            account.refresh_token = refreshToken;
            account.expires_at = response.data.expires_at;
            account.identity = response.data.identity;

            accounts[account.id] = account;
          }

          Storage.set("basecamp_accounts", accounts);
        });
    }

    // api
    this.newAccount = newAccount;
    this.validateToken = validateToken;
  });
