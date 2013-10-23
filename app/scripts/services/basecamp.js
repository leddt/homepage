'use strict';

angular.module('homepageApp')
  .service('Basecamp', function Basecamp($location, $http, proxifyFilter, xmlFilter, Storage) {
    
    var client_id = 'db749a654d9ee6c3db1e7b1fc0235d5ef5f20c29';

    function getAccounts() {
      return Storage.get("basecamp_accounts") || {};
    }

    function setAccount(account) {
      var accounts = getAccounts();

      if (accounts[account.id]) {
        for (var prop in account) {
          accounts[account.id][prop] = account[prop];
        }
      } else {
        accounts[account.id] = account;
      }

      Storage.set("basecamp_accounts", accounts);
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
      return $http.get(proxifyFilter('https://launchpad.37signals.com/authorization.json?access_token=' + accessToken))
        .then(function (response) {
          for (var i = 0; i < response.data.accounts.length; i++) {
            var account = response.data.accounts[i];
            if (account.product != "basecamp") continue;

            account.access_token = accessToken;
            account.refresh_token = refreshToken;
            account.expires_at = response.data.expires_at;
            account.identity = response.data.identity;

            setAccount(account);
          }
        });
    }

    function getProjects(account) {
      return $http.get(proxifyFilter(account.href + "/projects.xml?access_token=" + encodeURIComponent(account.access_token)))
        .then(function (response) {
          var results = {};
          var xml = xmlFilter(response.data);
          var projects = xml.find("project");
          
          for (var i = 0; i < projects.length; i++) {
            var project = angular.element(projects[i]);
            var id = angular.element(project.find("id")[0]).text();
            var name = angular.element(project.find("name")[0]).text();
            results[id] = name;
          }

          return results;
        });
    }

    function getTodos(account) {
      var projects;
      return getProjects(account)
        .then(function (p) {
          projects = p;
          return p;
        })
        .then(function() { return $http.get(proxifyFilter(account.href + "/todo_lists.xml?access_token=" + encodeURIComponent(account.access_token))); })
        .then(function (response) {
          var xml = xmlFilter(response.data);

          var count = 0;
          var results = [];
          var lists = xml.find("todo-list");
          for (var i = 0; i < lists.length; i++) {
            var list = angular.element(lists[i]);

            var l = {
              project: projects[list.find("project-id").text()],
              name: list.find("name").text(),
              items: []
            }

            var items = list.find("todo-item");
            for (var j = 0; j < items.length; j++) {
              var item = angular.element(items[j]);
              l.items.push({
                name: item.find("content").text()
              });
              count++;
            }

            results.push(l);
          }

          return {
            account: account.name,
            totalCount: count,
            lists: results
          }
        });
    }

    // api
    this.getAccounts = getAccounts;
    this.newAccount = newAccount;
    this.validateToken = validateToken;
    this.getTodos = getTodos;
  });
