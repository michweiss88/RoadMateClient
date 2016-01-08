angular.module('starter')

.service('AuthService', function($q, $http, USER_DATA_KEYS, SERVER_API_URL) {
  var token, phoneNumber;
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
    window.localStorage.setItem(USER_DATA_KEYS.phoneNumber, data["phone_number"]);
    authenticateUserAndUseData();
  }
 
  // Setting the user details
  function authenticateUserAndUseData() {
    token = window.localStorage.getItem(USER_DATA_KEYS.token);
    phoneNumber = window.localStorage.getItem(USER_DATA_KEYS.phoneNumber);
    isAuthenticated = true;
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  } 
 
  function destroyUserCredentials() {
    token = undefined;
    phoneNumber = undefined;
    isAuthenticated = false
    window.localStorage.removeItem(USER_DATA_KEYS.token);
    window.localStorage.removeItem(USER_DATA_KEYS.phoneNumber);
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
  }
 
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

  var signup = function(deviceDetails, phoneNumber) {
    return $q(function(resolve, reject) {
      $http({
        url: SERVER_API_URL + '/users.json',
        method: 'POST',
        data: { device_details: deviceDetails, phone_number: phoneNumber },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' ,'X-SALT-AUTH': 'ndn23ROADm'},
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
    logout: logout,
    signup: signup,
    isAuthenticated: function() { return isAuthenticated; },
    userDetails: function() {
      return {
        phoneNumber: phoneNumber
      }
    }
  };
})


