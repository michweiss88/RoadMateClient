angular.module('starter.controllers')

.controller('ApplicationController', function ($scope, GPS_CONFIG, $cordovaGeolocation) {


    var watchOptions = {
        timeout: GPS_CONFIG.GpsInterval,
        enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    $scope.GeoServiceWatch = watch;
    watch.then(
      null,
      function (err) {
          // error
      },
      function (position) {
          var lat = position.coords.latitude
          var long = position.coords.longitude
          $scope.speed = position.coords.speed;
          //console.log($scope.speed)
      });
    $scope.StopGoeService = function()
    {
        $scope.GeoServiceWatch.clearWatch();
    }
   // watch.clearWatch();
    //$cordovaGeolocation.clearWatch(watch)
    //  .then(
    //  function (result) {
    //      // success
    //  }, function (error) {
    //      // error
    //  });
});
