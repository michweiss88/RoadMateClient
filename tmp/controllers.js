angular.module('starter.controllers', [])

.controller('ContactsCtrl', function($scope,$cordovaContacts) {

  $scope.phoneContacts = [];
  $scope.contacts = [];

  $scope.getContacts = function() {
   
     function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.contacts.push(contact);
      }
      $scope.loadMoreContacts();
    };

    function onError(contactError) {
      alert(contactError);
    };

    var options = {};
    options.multiple = true;

    $cordovaContacts.find(options).then(onSuccess, onError);
  };
  $scope.loadMoreContacts = function()
  {
    var len = $scope.phoneContacts.length;
    for (var i = 0; i < 10; i++) {
      $scope.$apply(function(){
        var contact = $scope.contacts[len + i];
        $scope.phoneContacts.push(contact);
      });
    };
  }
document.addEventListener("deviceready", $scope.getContacts, false);
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
