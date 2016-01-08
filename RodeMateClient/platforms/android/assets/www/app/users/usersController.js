angular.module('starter.controllers')

.controller('SignupController', function ($scope, $state, $cordovaDevice) {

    $scope.signUp = function (phoneNumber) {
        if (phoneNumber) {
            SharedMethods.showLoader();
            AuthService.signup(deviceDetails, phoneNumber).then(function (authenticated_msg) {
                $state.go('tab.account');
                SharedMethods.closeLoader();
            }, function (error_message) {
                SharedMethods.closeLoader();
                SharedMethods.alertPopup('Sign Up', error_message)
            });
        };
    }

    $scope.deviceDetails = {};

    document.addEventListener("deviceready", function () {
        $scope.deviceDetails.Cordova = $cordovaDevice.getCordova();
        $scope.deviceDetails.Model = $cordovaDevice.getModel();
        $scope.deviceDetails.Platform = $cordovaDevice.getPlatform();
        $scope.deviceDetails.IMEI = $cordovaDevice.getUUID();
        $scope.deviceDetails.Version = $cordovaDevice.getVersion();
    }, false);
}) 