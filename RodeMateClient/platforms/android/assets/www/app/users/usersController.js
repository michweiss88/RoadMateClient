angular.module('starter.controllers')

.controller('SignupController', function ($scope, $state, $cordovaDevice,$cordovaContacts,$cordovaFile, AuthService, SharedMethods, CONTACTS_CONFIG) {

    $scope.signUp = function (phoneNumber) {
        $state.go('tab.contacts');
        return;
        if (phoneNumber) {
            SharedMethods.showLoader();
            AuthService.signup($scope.deviceDetails, phoneNumber).then(function (authenticated_msg) {
                $state.go('tab.contacts');
                SharedMethods.closeLoader();
            }, function (error_message) {
                SharedMethods.closeLoader();
                SharedMethods.alertPopup('Sign Up', error_message)
            });
        }
        else
        {
            SharedMethods.alertPopup('Sign Up', "You have to write your phone number, to sign up.")
        }
    }

    SaveAllContacts = function () {
        $cordovaContacts.find().then(function (allContacts) {
            var _allContacts = allContacts;
            $cordovaFile.checkFile(cordova.file.applicationStorageDirectory, CONTACTS_CONFIG.fileName)
            .then(function (success) {
                SharedMethods.alertPopup('Contacts', "contacts has been saved...")
            }, function (error) {
                $cordovaFile.createFile(cordova.file.dataapplicationStorageDirectory, CONTACTS_CONFIG.fileName, true);
                $cordovaFile.writeFile(cordova.file.dataDirectory, CONTACTS_CONFIG.fileName, _allContacts, true);
            })
        })
    }
    $scope.phoneNumber = undefined;
    
    $scope.deviceDetails = {};

    document.addEventListener("deviceready", function () {
       
        SaveAllContacts();

        $scope.deviceDetails.Cordova = $cordovaDevice.getCordova();
        $scope.deviceDetails.Model = $cordovaDevice.getModel();
        $scope.deviceDetails.Platform = $cordovaDevice.getPlatform();
        $scope.deviceDetails.IMEI = $cordovaDevice.getUUID();
        $scope.deviceDetails.Version = $cordovaDevice.getVersion();
    });
}) 