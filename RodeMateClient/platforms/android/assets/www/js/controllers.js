angular.module('starter.controllers', [])

.controller('StartCtrl', function ($scope, $cordovaDevice) {
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
})


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
