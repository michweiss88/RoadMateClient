angular.module('starter')

.service('AuthService', function($q, $http, USER_DATA_KEYS, SERVER_API_URL) {
  var user_email, token, player_image_url, player_first_name, player_last_name, player_nickname;
  var isAuthenticated = false;
  
  // Loading the user details, if exists, into the service variables for later use
  function loadUserCredentials() {
    var token = window.localStorage.getItem(USER_DATA_KEYS.token);
    if (token) {
      authenticateUserAndUseData();
    }
  }
  
  // Saving the data so the users won't need to sign in again.
  function storeUserData(data) {
    window.localStorage.setItem(USER_DATA_KEYS.token, data["token"]);
    window.localStorage.setItem(USER_DATA_KEYS.email, data["user_email"]);
    window.localStorage.setItem(USER_DATA_KEYS.player_image, data["player_image"]);
    window.localStorage.setItem(USER_DATA_KEYS.player_first_name, data["player_first_name"]);
    window.localStorage.setItem(USER_DATA_KEYS.player_last_name, data["player_last_name"]);
    window.localStorage.setItem(USER_DATA_KEYS.player_nickname, data["player_nickname"]);
    authenticateUserAndUseData();
  }
 
  // Setting the user details
  function authenticateUserAndUseData() {
    token = window.localStorage.getItem(USER_DATA_KEYS.token);
    user_email = window.localStorage.getItem(USER_DATA_KEYS.email);
    player_image_url = window.localStorage.getItem(USER_DATA_KEYS.player_image);
    player_first_name = window.localStorage.getItem(USER_DATA_KEYS.player_first_name);
    player_last_name = window.localStorage.getItem(USER_DATA_KEYS.player_last_name);
    player_nickname = window.localStorage.getItem(USER_DATA_KEYS.player_nickname);
    isAuthenticated = true;
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
    $http.defaults.headers.common['X-User-Email'] = user_email;
  }
 
  function destroyUserCredentials() {
    token = undefined;
    user_email = undefined;
    player_image_url = undefined;
    isAuthenticated = false
    window.localStorage.removeItem(USER_DATA_KEYS.token);
    window.localStorage.removeItem(USER_DATA_KEYS.email);
    window.localStorage.removeItem(USER_DATA_KEYS.player_image);
    window.localStorage.removeItem(USER_DATA_KEYS.player_first_name);
    window.localStorage.removeItem(USER_DATA_KEYS.player_last_name);
    window.localStorage.removeItem(USER_DATA_KEYS.player_nickname);
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    $http.defaults.headers.common['X-User-Email'] = undefined;
  }
 
  var login = function(email, password) {
    return $q(function(resolve, reject) {
      $http({
        url: SERVER_API_URL + '/tokens.json',
        method: 'POST',
        data: {email: email, password: password},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      }).success(function(data, status, headers, config) {
        storeUserData(data);
        resolve('Login success.');
      }).
      error(function(data, status, headers, config) {
        reject(data.message);
      });
    });
  };
 
  var logout = function() {
    return $q(function(resolve, reject) {
      $http({
        url: SERVER_API_URL + '/tokens/' + token + '.json',
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      }).success(function(data, status, headers, config) {
        destroyUserCredentials();
        resolve('Logout success.');
      }).
      error(function(data, status, headers, config) {
        destroyUserCredentials();
        resolve('Logout success.');
      });
    });
  };

  var signup = function(user_data, player_data) {
    return $q(function(resolve, reject) {
      $http({
        url: SERVER_API_URL + '/users.json',
        method: 'POST',
        data: {user: user_data, player: player_data},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' ,'X-SALT-AUTH': 'orSu342E'},
      }).success(function(data, status, headers, config) {
        storeUserData(data);
        resolve('Signup success.');
      }).
      error(function(data, status, headers, config) {
        reject(data.message);
      });
    });
  };

  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    signup: signup,
    isAuthenticated: function() { return isAuthenticated; },
    userDetails: function() {
      return {
        user_email: user_email,
        player_image_url: player_image_url,
        player_first_name: player_first_name,
        player_last_name: player_last_name,
        player_nickname: player_nickname
      }
    }
  };
})


