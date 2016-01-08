angular.module('starter')

.service('SuperleagueApi', function($q, $http, SERVER_API_URL, AuthService) {
  function doPost(url, extra_data) {
    return $q(function(resolve, reject) {
      $http({
        url: url + '.json',
        method: 'POST',
        data: extra_data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        }).success(function (data, status, headers, config) {
          resolve(data);
        }).error(function (data, status, headers, config) {
          if (data.message) {
            msg = data.message;
          } else {
            msg = 'Something went wrong. Please try again.'
          }
          reject(msg);
        });
     });
  };

  function doGet(url, params) {
    return $q(function(resolve, reject) {
      $http({
        url: url + '.json',
        method: 'GET',
        params: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      }).success(function (data, status, headers, config) {
        resolve(data);
      }).error(function (data, status, headers, config) {
        if (data.message) {
          msg = data.message;
        } else {
          msg = 'Something went wrong. Please try again.'
        }
        reject(msg);
      });
    });
  }

  function getUserId() {
    return AuthService.userDetails().player_nickname;
  }

  return {
    home: function(args) {
      url = SERVER_API_URL + '/users/' + getUserId() + '/home';
      params = args;
      return doGet(url, params)
    },
    my_seasons: function() {
      url = SERVER_API_URL + '/seasons/my_seasons';
      params = {};
      return doGet(url, params)
    }
  }

})