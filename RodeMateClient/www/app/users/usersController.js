angular.module('starter.controllers')

.controller('SignupController', function ($scope, $state, $cordovaDevice) {
    console.log("Signup...");

    $scope.deviceDetails = {
        Model:  null,
        Platform: null,
        UUID: null,
        Version: null,
        Cordova: null
    }

    document.addEventListener("deviceready", function () {

        $scope.deviceDetails.Cordova = $cordovaDevice.getCordova();

        $scope.deviceDetails.Model = $cordovaDevice.getModel();

        $scope.deviceDetails.Platform = $cordovaDevice.getPlatform();

        $scope.deviceDetails.UUID = $cordovaDevice.getUUID();

        $scope.deviceDetails.Version = $cordovaDevice.getVersion();

    }, false);

    $scope.goToContactsView = function () {
        $state.go('tab.account');
    }
}) 