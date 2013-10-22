'use strict';

angular.module('homepageApp')
  .service('Google', function Google($http, $location, Storage) {

    var client_id = "165163675817.apps.googleusercontent.com";

    function gcall(path, token) {
      return $http.jsonp("https://www.googleapis.com/" + path + "?callback=JSON_CALLBACK&alt=json&access_token=" + token);
    }

    function getAccounts() {
      return Storage.get("google_accounts") || {};
    }

    function setAccount(account) {
      var accounts = getAccounts();
      if (accounts[account.user_id]) {
        for (var prop in account) {
          accounts[account.user_id][prop] = account[prop];
        }
      } else {
        accounts[account.user_id] = account;
      }

      Storage.set("google_accounts", accounts);
    }

    function getPartialAccount(token, tokeninfo) {
      var expires = new Date();
      expires.setTime(expires.getTime() + (tokeninfo.expires_in - 60) * 1000); // 60s buffer

      return {
        user_id: tokeninfo.user_id,
        expires: expires,
        access_token: token
      };
    }

    function getFullAccount(token, tokeninfo) {
      var account = getPartialAccount(token, tokeninfo);

      return gcall("userinfo/email", token)
        .then(function(response) {
          account.email = response.data.data.email;
          return account;
        });
    }

    function validateToken(token) {
      return gcall("oauth2/v1/tokeninfo", token)
        .then(function (response) {
          if (response.data.audience != client_id)
            throw "Wrong audience";

          var a = getAccounts()[response.data.user_id];
          if (a && a.email) {
            // we already know this account, we just need the updated token
            return getPartialAccount(token, response.data);
          } else {
            // this is a new account so we need to get it's email
            return getFullAccount(token, response.data);
          }
        })
        .then(function (account) {
          setAccount(account);
          return account;
        });
    }


    var scopes = [
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ];

    var baseOAuthUrl = "https://accounts.google.com/o/oauth2/auth";
    baseOAuthUrl += "?response_type=token";
    baseOAuthUrl += "&client_id=" + client_id;
    baseOAuthUrl += "&redirect_uri=" + encodeURIComponent($location.absUrl().replace(/#.*/, ''));
    baseOAuthUrl += "&scope=" + encodeURIComponent(scopes.join(" "));
    baseOAuthUrl += "&state=google";

    function newAccount() {
      var url = baseOAuthUrl;
      url += "&approval_prompt=force";

      window.location.href = url;
    }

    function refreshAccount(account) {
      if (typeof account == "object") {
        account = account.email || account.user_id;
      }
      
      if (account.indexOf("@") < 0) {
        var a = getAccounts()[account];
        if (a) {
          account = a.email;
        }
      }

      var url = baseOAuthUrl;
      url += "&login_hint=" + encodeURIComponent(account);

      window.location.href = url;
    }

    // api
    this.getAccounts = getAccounts;
    this.validateToken = validateToken;
    this.newAccount = newAccount;
    this.refreshAccount = refreshAccount;
  });
